import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { LayoutTableColumnInfo, LayoutTableInfo } from '../../../layout/table/layout-table-info';
import { TablePosition, TablePositionIndexes } from '../../../model/tables/main-structures/table';
import { TableCellPropertiesMergerMarginLeft, TableCellPropertiesMergerMarginRight } from '../../../model/tables/properties-mergers/table-cell-properties-merger';
import { TablePropertiesMergerShadingInfo } from '../../../model/tables/properties-mergers/table-properties-merger';
import { ConditionalTableStyleFormatting, TableLayoutType, TableRowAlignment } from '../../../model/tables/secondary-structures/table-base-structures';
import { TableWidthUnitType } from '../../../model/tables/secondary-structures/table-units';
import { BorderHelper } from '../borders/border-helper';
import { createGrid } from '../grid-engine/creator';
import { CellInfo } from './cell-info';
import { CellOrderHelper } from './cell-order-helper';
import { RowInfo } from './row-info';
export class TableInfo {
    constructor(rowFormatter, table, tableMaxWidth, xPosition, yOffset) {
        this.empiricalOffset = UnitConverter.inchesToPixels(0.07);
        this.minRowIndex = 0;
        this.verticalBorders = [];
        this.verticalCursorBorders = [];
        this.isThisColumnFirstInTable = true;
        this.rowFormatter = rowFormatter;
        this.model = this.rowFormatter.manager.model;
        this.maxWidth = tableMaxWidth;
        this.columnWidth = tableMaxWidth;
        this.position = new TablePosition(table, 0, 0).init();
        this.bordersHelper = new BorderHelper(this, this.model);
        this.init(xPosition, yOffset);
        this.rows = ListUtils.map(this.table.rows, (_row, rowIndex) => new RowInfo(this, rowIndex));
        this.verticalBorders = this.bordersHelper.getVerticalBorders();
        this.verticalCursorBorders = this.bordersHelper.getVerticalCursorBorders();
        for (let rowInfo of this.rows)
            rowInfo.cells = ListUtils.map(rowInfo.row.cells, (_cell, cellIndex) => new CellInfo(cellIndex, rowInfo));
        this.cellOrderHelper = new CellOrderHelper(this);
    }
    get table() { return this.position.table; }
    get tableStyle() { return this.table.style; }
    get tblProps() { return this.table.properties; }
    get defaultTblProps() { return this.model.defaultTableProperties; }
    get defaultTblRowProps() { return this.model.defaultTableRowProperties; }
    get defaultTblCellProps() { return this.model.defaultTableCellProperties; }
    get currRowInfo() { return this.rows[this.position.rowIndex]; }
    get currCellInfo() { return this.currRowInfo.cells[this.position.cellIndex]; }
    get isThisTableRowFirstInColumn() { return this.currLayoutTableColumnInfo.tableRows.length == 0; }
    get isCurrRowLastInTable() { return this.position.rowIndex == this.grid.table.rows.length - 1; }
    get currTablePositionIndexes() {
        const actCellInfo = this.currCellInfo;
        return new TablePositionIndexes(actCellInfo.rowInfo.rowIndex, actCellInfo.cellIndex);
    }
    get isSimpleView() {
        return this.rowFormatter.manager.innerClientProperties.viewsSettings.isSimpleView;
    }
    init(xPosition, yOffset) {
        let firstCellLeftMargin = 0;
        let firstCellRightMargin = 0;
        if (this.table.nestedLevel == 0 && !this.model.compatibilitySettings.matchHorizontalTableIndentsToTextEdge && !this.isSimpleView) {
            const firstRow = this.table.rows[0];
            const firstCell = firstRow.cells[0];
            firstCellLeftMargin = new TableCellPropertiesMergerMarginLeft(this.table, this.model, firstRow.tablePropertiesException)
                .getProperty(firstCell.properties, this.tableStyle, firstCell.conditionalFormatting, null)
                .asNumberNoPercentType(UnitConverter.twipsToPixels);
            firstCellRightMargin = new TableCellPropertiesMergerMarginRight(this.table, this.model, firstRow.tablePropertiesException)
                .getProperty(firstCell.properties, this.tableStyle, firstCell.conditionalFormatting, null)
                .asNumberNoPercentType(UnitConverter.twipsToPixels);
        }
        const diff = this.moveRowDownToFitTable(yOffset, this.getEstimatedTableWidth(this.table, this.maxWidth), this.maxWidth);
        this.maxWidth = this.maxWidth + (diff.xDiff ? -diff.xDiff : firstCellLeftMargin + firstCellRightMargin);
        this.grid = createGrid(this.table, this.rowFormatter.iterator, this.maxWidth, this.rowFormatter.manager.innerClientProperties);
        let tableIndent = this.table.getActualTableIndent(this.defaultTblProps);
        if (this.isSimpleView && this.table.nestedLevel == 0 && tableIndent.value < 0) {
            tableIndent = tableIndent.clone();
            tableIndent.value = 0;
        }
        const tableIndentInPixels = tableIndent.asNumberNoPercentType(UnitConverter.twipsToPixels);
        this.xPositionStart = xPosition + tableIndentInPixels + (diff.xDiff ? diff.xDiff : -firstCellLeftMargin) +
            this.getShiftHorizontalPosition(xPosition);
        this.yPositionStart = yOffset + diff.yDiff;
    }
    getShiftHorizontalPosition(xPosition) {
        const freeSpaceFromTable = this.columnWidth - this.grid.commonWidth;
        if (freeSpaceFromTable >= 0)
            return 0;
        const tableAlignment = this.table.getActualTableAlignment();
        if (tableAlignment == TableRowAlignment.Center) {
            let result = freeSpaceFromTable / 2 - xPosition;
            if (result < 0 && this.isSimpleView)
                result = 0;
            return result;
        }
        else if (tableAlignment == TableRowAlignment.Right)
            return freeSpaceFromTable - xPosition;
        return 0;
    }
    getEstimatedTableWidth(table, maxWidth) {
        const preferredWidth = table.preferredWidth;
        const minWidth = 3 * table.rows[0].getTotalCellsInRowConsiderGrid();
        if (table.properties.layoutType == TableLayoutType.Autofit && (preferredWidth.type == TableWidthUnitType.Auto || preferredWidth.type == TableWidthUnitType.Nil))
            return minWidth;
        else
            return Math.min(table.preferredWidth ? table.preferredWidth.asNumber(maxWidth, UnitConverter.twipsToPixels) : minWidth, maxWidth);
    }
    getRelationByColumnY(lp, absY) {
        return absY - lp.pageArea.y - lp.column.y;
    }
    getRelationByColumnX(lp, absX) {
        return absX - lp.pageArea.x - lp.column.x;
    }
    moveRowDownToFitTable(yOffset, getEstimatedTableWidth, maxAvalibleWidth) {
        const lp = this.rowFormatter.manager.activeFormatter.layoutPosition;
        let xDiff = 0;
        let currentYOffset = yOffset;
        const expectedTableHeight = Math.min(this.rowFormatter.iterator.getWrap(false).box.height * this.table.rows.length, lp.column.bottom - currentYOffset);
        const maxYOffset = lp.column.bottom - expectedTableHeight - this.empiricalOffset;
        if (this.table.nestedLevel == 0 && lp.pageArea.subDocument.isMain()) {
            const anchoredObjects = [];
            NumberMapUtils.forEach(lp.page.anchoredObjectHolder.objects, (ancObj) => {
                var _a;
                if (ancObj.isInText() && yOffset <= this.getRelationByColumnY(lp, ancObj.y + ancObj.height)
                    && ((_a = ancObj.parentCell) === null || _a === void 0 ? void 0 : _a.parentRow.parentTable) !== this.table)
                    return anchoredObjects.push(ancObj);
            });
            anchoredObjects.sort((a, b) => a.y - b.y);
            const suitableAnchorObjectWidth = maxAvalibleWidth - getEstimatedTableWidth;
            xDiff = this.getXDiff(anchoredObjects, currentYOffset, lp, expectedTableHeight);
            for (let i = 0; i < anchoredObjects.length && xDiff > suitableAnchorObjectWidth; i++) {
                const ancObj = anchoredObjects[i];
                const nextYPos = this.getRelationByColumnY(lp, ancObj.y + ancObj.height) + this.empiricalOffset;
                if (maxYOffset < nextYPos) {
                    xDiff = 0;
                    break;
                }
                currentYOffset = nextYPos;
                xDiff = this.getXDiff(anchoredObjects, currentYOffset, lp, expectedTableHeight);
            }
        }
        return { xDiff: xDiff, yDiff: currentYOffset - yOffset };
    }
    getXDiff(anchoredObjects, yOffset, lp, expectedTableHeight) {
        let xDiff = 0;
        anchoredObjects.forEach((ancObj) => {
            if (ancObj.isInText() && IntervalAlgorithms.getIntersectionNonNullLength(new FixedInterval(this.getRelationByColumnY(lp, ancObj.y), ancObj.height), new FixedInterval(yOffset, expectedTableHeight))) {
                xDiff = Math.max(xDiff, this.getRelationByColumnX(lp, ancObj.right) + this.empiricalOffset);
            }
        });
        return xDiff;
    }
    initLayoutInfo(yPos, parentCell, column) {
        this.currColumnHorizontalBorders = [];
        const logicInfo = this.currLayoutTableColumnInfo ?
            this.currLayoutTableColumnInfo.logicInfo :
            new LayoutTableInfo(new TablePropertiesMergerShadingInfo()
                .getProperty(this.tblProps, this.tableStyle, ConditionalTableStyleFormatting.WholeTable, this.defaultTblProps)
                .getActualColor(this.model.colorProvider), this.grid);
        this.currLayoutTableColumnInfo = new LayoutTableColumnInfo(parentCell, logicInfo, new Rectangle(this.xPositionStart, yPos, this.grid.commonWidth, 0));
        this.rows[this.minRowIndex].initLayoutInfo(true, column);
    }
}
