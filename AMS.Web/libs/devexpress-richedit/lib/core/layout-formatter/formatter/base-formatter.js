import { Flag } from '@devexpress/utils/lib/class/flag';
import { Constants } from '@devexpress/utils/lib/constants';
import { Errors } from '@devexpress/utils/lib/errors';
import { Point } from '@devexpress/utils/lib/geometry/point';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { EnumUtils } from '@devexpress/utils/lib/utils/enum';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { DocumentLayoutDetailsLevel } from '../../layout/document-layout-details-level';
import { LayoutPosition } from '../../layout/layout-position';
import { AnchoredObjectLevelType } from '../../layout/main-structures/layout-boxes/layout-anchored-object-box';
import { LayoutBoxType } from '../../layout/main-structures/layout-boxes/layout-box';
import { LayoutColumn } from '../../layout/main-structures/layout-column';
import { LayoutPageArea } from '../../layout/main-structures/layout-page-area';
import { LayoutRowStateFlags } from '../../layout/main-structures/layout-row';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
import { LogObjToStrLayout } from '../../rich-utils/debug/logger/layout-logger/log-obj-to-str-layout';
import { ParagraphFrameCollector } from '../changes/engine/paragraph-frame-changes-collector';
import { LayoutRowBoundsCalculator } from '../floating/layout-row-bounds-manager';
import { RowFormatter } from '../row/formatter';
import { RowFormatterResultFlag } from '../row/result';
import { RowSpacingBeforeApplier, TableRowSpacingBeforeApplier } from '../row/utils/row-spacing-before-applier';
import { AddRowToTableResult, Formatter } from '../table/formatter';
import { LayoutFormatterState } from './enums';
import { LastRowInfo } from './utils/last-row-info';
import { RestartPreparer } from './utils/restart-preparer';
export class BaseFormatter {
    constructor(manager, subDocId) {
        this.layoutRowBoundsCalculator = new LayoutRowBoundsCalculator();
        this.manager = manager;
        this.rowFormatter = new RowFormatter(manager, subDocId);
        this.state = LayoutFormatterState.PageAreaStart;
        this.stateMap = {};
        this.stateMap[LayoutFormatterState.PageAreaStart] = this.processStatePageAreaStart;
        this.stateMap[LayoutFormatterState.ColumnStart] = this.processStateColumnStart;
        this.stateMap[LayoutFormatterState.RowFormatting] = this.processStateRowFormatting;
        this.stateMap[LayoutFormatterState.ColumnEnd] = this.processStateColumnEnd;
    }
    initDocumentStart() {
        this.rowFormatter.documentStart();
        this.lastRowInfo = new LastRowInfo(this.subDocument.paragraphs);
        this.lastRowInfo.reset(this.rowFormatter);
    }
    get subDocument() {
        return this.rowFormatter.subDocument;
    }
    get currColumnHeight() {
        return this.layoutPosition.rowIndex == 0 ? 0 : this.layoutPosition.column.rows[this.layoutPosition.rowIndex - 1].bottom;
    }
    formatPageArea(pageAreaBounds, columnBounds, page) {
        Log.print(LogSource.LayoutFormatter, "formatPageArea", `pageIndex: ${page.index}`);
        this.pageAreaBounds = pageAreaBounds;
        this.columnBounds = columnBounds;
        if (!this.layoutPosition) {
            this.layoutPosition = new LayoutPosition(DocumentLayoutDetailsLevel.None);
            this.layoutPosition.page = page;
            this.layoutPosition.pageIndex = page.index;
        }
        while (this.stateMap[this.state].call(this) && this.state != LayoutFormatterState.PageAreaEnd)
            ;
    }
    processStatePageAreaStart() {
        this.manager.activeFormatter = this;
        Log.print(LogSource.LayoutFormatter, "processStatePageAreaStart", () => ` SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        this.createNextPageArea();
        if (this.subDocument.isMain())
            this.layoutPosition.page.mainSubDocumentPageAreas.push(this.layoutPosition.pageArea);
        else
            this.layoutPosition.page.otherPageAreas[this.subDocument.id] = this.layoutPosition.pageArea;
        return true;
    }
    processStateColumnStart() {
        this.manager.activeFormatter = this;
        Log.print(LogSource.LayoutFormatter, "processStateColumnStart", () => ` SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        const columnBounds = this.columnBounds[this.layoutPosition.columnIndex];
        this.createNextColumn(columnBounds);
        this.layoutPosition.pageArea.columns.push(this.layoutPosition.column);
        if (this.tableFormatter)
            this.tableFormatter.columnStart(this.layoutPosition.column);
        const bounds = new FixedInterval(this.layoutPosition.pageArea.x + columnBounds.x, columnBounds.width);
        this.layoutRowBoundsCalculator.resetByColumn(this.layoutPosition.page.anchoredObjectHolder.objects, bounds, this.subDocument.isTextBox());
        return true;
    }
    initializeTextBoxSizeForAutoFitTables() {
        const tblPos = this.rowFormatter.getNextBoxWrapInfo().info.tablePosition[0];
        if (tblPos.rowIndex == 0 && tblPos.cellIndex == 0) {
            NumberMapUtils.forEach(this.manager.anchoredObjectsManager.textBoxContextSizeCalculators, (obj) => {
                const currTblPoss = obj.wrap.info.tablePosition;
                if (currTblPoss && currTblPoss[0].table.index == tblPos.table.index)
                    obj.calculateSize(this.manager.boundsCalculator);
            });
        }
    }
    processStateRowFormatting() {
        this.manager.activeFormatter = this;
        const wrap = this.rowFormatter.getNextBoxWrapInfo();
        const startRowOffset = wrap.box.rowOffset;
        Log.print(LogSource.LayoutFormatter, "processStateRowFormatting", () => `pos:${startRowOffset}, SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        if (!this.tableFormatter && this.applyPageBreakBefore())
            return true;
        if (!this.tableFormatter && wrap.info.tablePosition) {
            this.initializeTextBoxSizeForAutoFitTables();
            this.tableFormatter = new Formatter(this.rowFormatter, wrap.info.tablePosition, this.layoutPosition.column, LayoutColumn.findSectionColumnWithMinimumWidth(this.columnBounds), new Point(0, this.getTableStartYOffsetPosition()), null, 0, null, null);
            this.tableFormatter.tableInfo.currLayoutTableColumnInfo.logicInfo.isEditable = this.tableIsEditable(this.tableFormatter.tableInfo.table);
        }
        const rowResult = this.createRow();
        if (rowResult.flags.get(RowFormatterResultFlag.NotEnoughChunks))
            return false;
        const addRowInTableResult = this.tableFormatter ?
            this.tableFormatter.addLayoutRow(rowResult, wrap.info) :
            new Flag(AddRowToTableResult.RowAdded);
        if (addRowInTableResult.get(AddRowToTableResult.RowAdded)) {
            const row = rowResult.row;
            if (this.subDocument.isMain() && !this.tableFormatter && this.cantPlaceRowOnThisColumn(row, startRowOffset))
                return true;
            this.pushRow(row, startRowOffset, rowResult.paragraphIndex);
            if (this.placeAnchorObjects(rowResult)) {
                if (this.tableFormatter) {
                    const bounds = new FixedInterval(this.layoutPosition.pageArea.x + this.layoutPosition.column.x +
                        this.layoutPosition.row.tableCellInfo.x, this.layoutPosition.row.tableCellInfo.width);
                    const obj = ListUtils.elementBy(rowResult.newAnchoredObjects, (obj) => obj.levelType == AnchoredObjectLevelType.InText);
                    this.layoutRowBoundsCalculator.addTableInTextObject(obj, bounds);
                    if (this.tableFormatter.resetCaseInTextAnchorObject(wrap.info, obj)) {
                        if (!this.layoutPosition.column.rows[0]) {
                            this.manager.floatingRestartInfoHolder.storeInfo(this.layoutPosition);
                            new RestartPreparer(this.manager).restartFromPage(this.layoutPosition.pageIndex, false, false);
                        }
                        else
                            this.state = LayoutFormatterState.ColumnEnd;
                    }
                }
                else {
                    this.manager.floatingRestartInfoHolder.storeInfo(this.layoutPosition);
                    new RestartPreparer(this.manager).restartByAnchoredObject(this.layoutPosition.page);
                    if (!this.subDocument.isMain())
                        this.state = LayoutFormatterState.PageAreaEnd;
                }
                this.isColumnOk();
                return true;
            }
            if (this.tableFormatter) {
                this.tableFormatter.actualFormatter.findNextCell(addRowInTableResult, wrap.info);
            }
        }
        if (this.tableFormatter)
            this.tableFormatter.applyResultOfTopLevelFormatters(addRowInTableResult, wrap.info);
        if (addRowInTableResult.get(AddRowToTableResult.TableFinished))
            this.tableFormatter = null;
        if (addRowInTableResult.get(AddRowToTableResult.GoToNextColumn) || this.layoutPosition.row.flags.anyOf(LayoutRowStateFlags.ColumnEnd, LayoutRowStateFlags.DocumentEnd, LayoutRowStateFlags.SectionEnd, LayoutRowStateFlags.PageEnd)) {
            this.isColumnOk();
            this.state = LayoutFormatterState.ColumnEnd;
        }
        return true;
    }
    processStateColumnEnd() {
        this.manager.activeFormatter = this;
        Log.print(LogSource.LayoutFormatter, "processStateColumnEnd", () => ` SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        const createdColumn = this.layoutPosition.column;
        createdColumn.rows.sort((a, b) => a.columnOffset - b.columnOffset);
        BaseFormatter.correctRowOffsets(createdColumn);
        if (this.tableFormatter)
            this.tableFormatter.columnEnd();
        createdColumn.tablesInfo.sort((a, b) => a.logicInfo.grid.table.index - b.logicInfo.grid.table.index);
        ListUtils.forEach(createdColumn.rows, (row, index) => {
            if (row.tableCellInfo)
                row.indexInColumn = index;
        });
        this.layoutPosition.page.anchoredObjectHolder.onColumnEnd(this);
        const lastRow = createdColumn.getLastRow();
        lastRow.flags.set(LayoutRowStateFlags.ColumnEnd, true);
        if (this.manager.innerClientProperties.viewsSettings.isSimpleView) {
            const lastAnchorBox = NumberMapUtils.max(this.layoutPosition.page.anchoredObjectHolder.objects, a => a.bottom);
            const margins = this.manager.innerClientProperties.viewsSettings.paddings;
            const pageInfo = this.manager.innerClientProperties.viewsSettings.pageVerticalInfo;
            const lastRowBottomPos = lastRow.bottom + margins.top;
            const bottomPosition = lastAnchorBox ? Math.max(lastAnchorBox.bottom, lastRowBottomPos) : lastRowBottomPos;
            const minPageContentHeight = bottomPosition + margins.bottom;
            const minVisibleAreaHeight = minPageContentHeight +
                pageInfo.topMargin + pageInfo.topPageBorderWidth + pageInfo.bottomPageBorderWidth + pageInfo.bottomMargin;
            const diff = Math.floor(Math.max(0, this.manager.controlHeightProvider.getVisibleAreaHeight(false) - minVisibleAreaHeight));
            const finalPageHeight = minPageContentHeight + diff;
            const columnHeight = finalPageHeight - margins.vertical;
            this.layoutPosition.column.height = columnHeight;
            this.layoutPosition.pageArea.height = columnHeight;
            this.layoutPosition.page.height = finalPageHeight;
        }
        createdColumn.paragraphFrames = ParagraphFrameCollector.collect(this.manager.model.colorProvider, createdColumn, this.subDocument.isMain() ?
            this.layoutPosition.page.getPosition() + this.layoutPosition.pageArea.pageOffset : 0, this.subDocument.paragraphs);
        if (lastRow.flags.anyOf(LayoutRowStateFlags.DocumentEnd, LayoutRowStateFlags.PageEnd, LayoutRowStateFlags.SectionEnd)) {
            this.layoutPosition.detailsLevel = DocumentLayoutDetailsLevel.PageArea;
            this.state = LayoutFormatterState.PageAreaEnd;
        }
        else {
            if (this.layoutPosition.columnIndex + 1 < this.columnBounds.length) {
                this.state = LayoutFormatterState.ColumnStart;
                this.layoutPosition.columnIndex++;
                this.layoutPosition.column = null;
            }
            else
                this.state = LayoutFormatterState.PageAreaEnd;
        }
        return true;
    }
    createNextPageArea() {
        const newPageArea = new LayoutPageArea(this.subDocument);
        newPageArea.setGeomerty(this.pageAreaBounds);
        newPageArea.pageOffset = this.subDocument.isMain() ? 0 : this.rowFormatter.getPosition();
        this.state = LayoutFormatterState.ColumnStart;
        this.layoutPosition.pageArea = newPageArea;
        this.layoutPosition.columnIndex = 0;
        this.layoutPosition.column = null;
        this.layoutPosition.detailsLevel = DocumentLayoutDetailsLevel.PageArea;
    }
    createNextColumn(columnBounds) {
        const newColumn = new LayoutColumn();
        newColumn.setGeomerty(columnBounds);
        newColumn.pageAreaOffset = this.layoutPosition.columnIndex == 0 || !this.subDocument.isMain() ?
            0 :
            this.rowFormatter.getPosition() - this.layoutPosition.pageArea.pageOffset - this.layoutPosition.page.getPosition();
        this.state = LayoutFormatterState.RowFormatting;
        this.layoutPosition.column = newColumn;
        this.layoutPosition.rowIndex = 0;
        this.layoutPosition.detailsLevel = DocumentLayoutDetailsLevel.Column;
    }
    pushRow(row, rowAbsStartPos, parIndex) {
        this.layoutPosition.row = row;
        this.layoutPosition.column.rows.push(row);
        this.layoutPosition.rowIndex++;
        this.lastRowInfo.setFullRowInfo(row, rowAbsStartPos, parIndex);
        BaseFormatter.correctBoxOffsets(row);
    }
    createRow() {
        const rowSpacingBeforeApplier = this.tableFormatter ?
            new TableRowSpacingBeforeApplier(this.lastRowInfo.row, this.subDocument.paragraphs, this.tableFormatter.isCurrLayoutRowIsFirstInCell, this.tableFormatter.isCurrTableCellFirstInRow, this.tableFormatter.isCurrTableRowIsFirstInTable) :
            new RowSpacingBeforeApplier(this.subDocument.documentModel.compatibilitySettings, this.lastRowInfo, this.subDocument.paragraphs, this.layoutPosition.rowIndex == 0);
        const offsetRelativeColumn = this.layoutPosition.getOffsetRelativeColumn();
        const absOffset = this.tableFormatter ?
            offsetRelativeColumn.clone().offsetByPoint(this.tableFormatter.currLayoutRowOffset) :
            this.getCurrOffsetForRow(offsetRelativeColumn);
        let minimumOfY = Constants.MIN_SAFE_INTEGER;
        if (!this.tableFormatter && this.lastRowInfo.row && this.manager.innerClientProperties.viewsSettings.isSimpleView &&
            ListUtils.unsafeAnyOf(this.lastRowInfo.row.boxes, b => EnumUtils.isAnyOf(b.getType(), LayoutBoxType.ColumnBreak, LayoutBoxType.PageBreak, LayoutBoxType.SectionMark))) {
            const lastRowBottomPos = this.lastRowInfo.row.bottom;
            let ancObj = null;
            NumberMapUtils.forEach(this.layoutPosition.page.anchoredObjectHolder.objects, obj => {
                if (!obj.isInText() && (obj.bottom > lastRowBottomPos) &&
                    (!ancObj || obj.bottom > ancObj.bottom))
                    ancObj = obj;
            });
            if (ancObj)
                minimumOfY = ancObj.bottom + 1;
        }
        const maxLayoutRowWidth = this.tableFormatter ? this.tableFormatter.currLayoutRowContentWidth : this.layoutPosition.column.width;
        this.rowFormatter.formatRow(Math.max(minimumOfY, absOffset.y), new FixedInterval(absOffset.x, maxLayoutRowWidth), rowSpacingBeforeApplier);
        const rowResult = this.rowFormatter.result;
        if (rowResult.row)
            rowResult.row.moveRectangleByPoint(offsetRelativeColumn.multiply(-1, -1));
        return rowResult;
    }
    getCurrOffsetForRow(offsetRelativeColumn) {
        const prevRow = ListUtils.last(this.layoutPosition.column.rows);
        if (!prevRow)
            return offsetRelativeColumn;
        const offset = offsetRelativeColumn.clone();
        offset.y += prevRow.tableCellInfo ?
            prevRow.tableCellInfo.parentRow.parentTable.getTopLevelColumn().bottom :
            prevRow.bottom;
        return offset;
    }
    applyPageBreakBefore() {
        const wrapInfo = this.rowFormatter.getNextBoxWrapInfo();
        if (wrapInfo && this.lastRowInfo.isNextRowFirstInParagraph() &&
            this.subDocument.paragraphs[wrapInfo.info.paragraphIndex].getParagraphMergedProperties().pageBreakBefore &&
            this.layoutPosition.rowIndex !== 0 && this.manager.innerClientProperties.viewsSettings.isPrintLayoutView) {
            this.lastRowInfo.row.flags.set(LayoutRowStateFlags.PageEnd, true);
            this.state = LayoutFormatterState.ColumnEnd;
            return true;
        }
        return false;
    }
    cantPlaceRowOnThisColumn(row, startRowPosition) {
        const lineBottom = row.y + row.lineHeight;
        if (this.layoutPosition.rowIndex != 0 && lineBottom > this.layoutPosition.column.height && row.hasEffectToPageHeight) {
            this.rowFormatter.setPosition(startRowPosition, false, !this.tableFormatter);
            this.state = LayoutFormatterState.ColumnEnd;
            return true;
        }
        return false;
    }
    tableIsEditable(table) {
        const tableInterval = FixedInterval.fromPositions(table.getStartPosition(), table.getEndPosition());
        return this.subDocument.isEditable([tableInterval]);
    }
    placeAnchorObjects(rowResult) {
        if (!rowResult.newAnchoredObjects.length)
            return false;
        let needRestartFromPageStart = false;
        ListUtils.forEach(rowResult.newAnchoredObjects, (obj) => {
            this.manager.layout.anchorObjectsPositionInfo.add(obj, obj.rowOffset);
            switch (obj.getType()) {
                case LayoutBoxType.AnchorTextBox: {
                    const textBox = obj;
                    if (textBox.internalSubDocId >= 0) {
                        this.manager.otherPageAreaFormatter.setTextBoxContent(this.layoutPosition.page, textBox);
                        this.layoutPosition.page.anchoredObjectHolder.addObject(this.manager, textBox);
                        const pageArea = this.layoutPosition.page.otherPageAreas[textBox.internalSubDocId];
                        const contentBounds = textBox.getContentBounds();
                        pageArea.x = contentBounds.x;
                        pageArea.y = contentBounds.y;
                    }
                    break;
                }
                case LayoutBoxType.AnchorPicture: {
                    this.layoutPosition.page.anchoredObjectHolder.addObject(this.manager, obj);
                    break;
                }
                default: throw new Error(Errors.InternalException);
            }
            if (obj.levelType == AnchoredObjectLevelType.InText)
                needRestartFromPageStart = true;
        });
        return needRestartFromPageStart;
    }
    getTableStartYOffsetPosition() {
        if (!this.lastRowInfo.row || !this.layoutPosition.column.rows.length)
            return 0;
        if (!this.lastRowInfo.row.tableCellInfo)
            return this.lastRowInfo.row.bottom;
        return this.lastRowInfo.row.tableCellInfo.parentRow.parentTable.getTopLevelColumn().bottom;
    }
    static correctColumnOffsets(pageArea) {
        const columns = pageArea.columns;
        if (!columns.length)
            return;
        const offsetFirstColumnFromPageArea = columns[0].pageAreaOffset;
        if (offsetFirstColumnFromPageArea != 0) {
            pageArea.pageOffset += offsetFirstColumnFromPageArea;
            for (let column of columns)
                column.pageAreaOffset -= offsetFirstColumnFromPageArea;
        }
    }
    static correctRowOffsets(column) {
        const rows = column.rows;
        if (!rows.length)
            return;
        const offsetFirstRowFromColumn = rows[0].columnOffset;
        if (offsetFirstRowFromColumn != 0) {
            column.pageAreaOffset += offsetFirstRowFromColumn;
            for (let row of rows)
                row.columnOffset -= offsetFirstRowFromColumn;
        }
    }
    static correctBoxOffsets(row) {
        const boxes = row.boxes;
        if (!boxes)
            return;
        const offsetFirstBoxFromRow = boxes[0].rowOffset;
        if (offsetFirstBoxFromRow != 0) {
            row.columnOffset += offsetFirstBoxFromRow;
            for (let box of boxes)
                box.rowOffset -= offsetFirstBoxFromRow;
        }
    }
    isColumnOk() {
        if (this.state == LayoutFormatterState.ColumnEnd && !this.layoutPosition.column.rows[0])
            throw new Error(Errors.InternalException);
    }
}
