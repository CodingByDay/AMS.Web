import { MapCreator } from '../../../../base-utils/map-creator';
import { Errors } from '@devexpress/utils/lib/errors';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { MaskedCharacterPropertiesBundle } from '../../../rich-utils/properties-bundle';
import { Chunk } from '../../chunk';
import { DocumentModel } from '../../document-model';
import { Field } from '../../fields/field';
import { AbstractNumberingList, NumberingList } from '../../numbering-lists/numbering-list';
import { Paragraph } from '../../paragraph/paragraph';
import { RichUtils } from '../../rich-utils';
import { RunType } from '../../runs/run-type';
import { ParagraphRun, SectionRun } from '../../runs/simple-runs';
import { Section } from '../../section/section';
import { SubDocumentInterval, SubDocumentPosition } from '../../sub-document';
import { Table } from '../../tables/main-structures/table';
import { TableCell } from '../../tables/main-structures/table-cell';
import { TableRow } from '../../tables/main-structures/table-row';
import { TableWidthUnit, TableWidthUnitType } from '../../tables/secondary-structures/table-units';
import { TableCellUtils } from '../../tables/table-utils';
import { BookmarksManipulator } from '../bookmarks-manipulator';
import { TablesManipulator } from '../tables/tables-manipulator';
import { isDefined } from '@devexpress/utils/lib/utils/common';
import { SubDocumentInserterOptions } from '../document/sub-document-inserter';
export class CreateRangeCopyOperation {
    constructor(subDocument, abstractNumberingListCache, numberingListCache) {
        this.newOffsetAtStartChunk = 0;
        this.additionalParagraphRunPositions = {};
        this.subDocument = subDocument;
        this.numberingListCache = numberingListCache;
        this.abstractNumberingListCache = abstractNumberingListCache;
    }
    get documentModel() {
        return this.subDocument.documentModel;
    }
    copyStyles(newDocumentModel) {
        newDocumentModel.characterStyles = ListUtils.deepCopy(this.documentModel.characterStyles);
        newDocumentModel.paragraphStyles = ListUtils.deepCopy(this.documentModel.paragraphStyles);
        newDocumentModel.numberingListStyles = ListUtils.deepCopy(this.documentModel.numberingListStyles);
        newDocumentModel.tableStyles = ListUtils.deepCopy(this.documentModel.tableStyles);
        newDocumentModel.tableCellStyles = ListUtils.deepCopy(this.documentModel.tableCellStyles);
    }
    execute(intervals) {
        const newDocumentModel = this.initNewDocumentModel();
        const newSubDocument = newDocumentModel.mainSubDocument;
        this.copyStyles(newDocumentModel);
        if (ListUtils.allOf(intervals, curr => curr.length == 0))
            throw new Error(Errors.InternalException);
        let currIntervalOffset = 0;
        for (let interval of intervals) {
            this.copyMainContent(interval, newDocumentModel, currIntervalOffset);
            currIntervalOffset += interval.length;
        }
        BookmarksManipulator.copyBookmarksFromSubDocumentTo(this.subDocument, newSubDocument, intervals);
        newSubDocument.getLastChunk().isLast = true;
        this.copyTables(newSubDocument, intervals);
        const addedUselessParagraphMarkInEnd = this.tryAppendAdditionalParagraphRunInTheEnd(newSubDocument, false);
        return new RangeCopy(newDocumentModel, addedUselessParagraphMarkInEnd, this.abstractNumberingListCache, this.numberingListCache);
    }
    copyMainContent(interval, newDocumentModel, currIntervalOffset) {
        const newSubDocument = newDocumentModel.mainSubDocument;
        const constRunIterator = this.subDocument.getConstRunIterator(interval);
        this.oldFieldStartIndex = -1;
        while (constRunIterator.moveNext()) {
            var oldCurrentRun = constRunIterator.currentRun;
            if (this.oldCurrentSection != constRunIterator.currentSection) {
                this.oldCurrentSection = constRunIterator.currentSection;
                this.newCurrentSection = this.appendNewSection(newSubDocument);
            }
            if (this.oldCurrentParagraph != oldCurrentRun.paragraph) {
                this.oldCurrentParagraph = oldCurrentRun.paragraph;
                this.newCurrentParagraph = this.appendNewParagraph(newSubDocument);
            }
            if (this.oldCurrentChunk != constRunIterator.currentChunk) {
                this.oldCurrentChunk = constRunIterator.currentChunk;
                this.newCurrentChunk = this.appendNewChunk(newSubDocument);
                this.newOffsetAtStartChunk = 0;
            }
            this.newCurrentParagraph.length += oldCurrentRun.getLength();
            this.newCurrentSection.setLength(newSubDocument, this.newCurrentSection.getLength() + oldCurrentRun.getLength());
            this.newCurrentChunk.textBuffer += this.oldCurrentChunk.getTextInChunk(oldCurrentRun.startOffset, oldCurrentRun.getLength());
            if (oldCurrentRun.getType() == RunType.FieldCodeStartRun)
                this.appendField(newSubDocument, oldCurrentRun, interval.start - currIntervalOffset);
            else if (oldCurrentRun.getType() == RunType.AnchoredTextBoxRun) {
                const newTexBoxSubDoc = this.documentModel.subDocuments[oldCurrentRun.subDocId].clone(newDocumentModel);
                const sourceTextBoxSubDocParagraphs = this.documentModel.subDocuments[oldCurrentRun.subDocId].paragraphs;
                ListUtils.forEach(newTexBoxSubDoc.paragraphs, (paragraph, index) => {
                    paragraph.numberingListIndex = CreateRangeCopyOperation.getNewNumberingListIndex(this.documentModel, sourceTextBoxSubDocParagraphs[index].numberingListIndex, newTexBoxSubDoc, this.abstractNumberingListCache, this.numberingListCache);
                });
            }
            this.newCurrentChunk.textRuns.push(oldCurrentRun.createSimularity(this.newOffsetAtStartChunk, oldCurrentRun.getLength(), this.newCurrentParagraph, newDocumentModel.stylesManager.addCharacterStyle(oldCurrentRun.characterStyle), newDocumentModel.cache.maskedCharacterPropertiesCache.getItem(oldCurrentRun.maskedCharacterProperties)));
            this.newOffsetAtStartChunk += oldCurrentRun.getLength();
        }
    }
    appendField(newSubDocument, oldCurrentRun, globalOffset) {
        let oldFieldStartIndex = this.oldFieldStartIndex;
        const oldSubDocument = this.subDocument;
        if (oldFieldStartIndex < 0) {
            const oldFieldStartCodeRunOffset = this.oldCurrentChunk.startLogPosition.value + oldCurrentRun.startOffset;
            oldFieldStartIndex = Field.normedBinaryIndexOf(oldSubDocument.fields, oldFieldStartCodeRunOffset + 1);
        }
        else
            oldFieldStartIndex++;
        const oldField = oldSubDocument.fields[oldFieldStartIndex];
        const newField = new Field(newSubDocument.positionManager, newSubDocument.fields.length, oldField.getFieldStartPosition() - globalOffset, oldField.getSeparatorPosition() - globalOffset, oldField.getFieldEndPosition() - globalOffset, oldField.showCode, oldField.getHyperlinkInfo() ? oldField.getHyperlinkInfo().clone() : undefined);
        newSubDocument.fields.push(newField);
        newField.initParent(newSubDocument.fields);
        this.oldFieldStartIndex = oldFieldStartIndex;
    }
    appendParagraphMarkInTheEnd(newSubDocument, position, sectionEnd) {
        this.newCurrentParagraph.length += 1;
        this.newCurrentSection.setLength(newSubDocument, this.newCurrentSection.getLength() + 1);
        let text = sectionEnd ? RichUtils.specialCharacters.SectionMark : RichUtils.specialCharacters.ParagraphMark;
        let runType = sectionEnd ? SectionRun : ParagraphRun;
        this.newCurrentChunk.textBuffer += text;
        this.newCurrentChunk.textRuns.push(new runType(position, this.newCurrentParagraph, new MaskedCharacterPropertiesBundle(newSubDocument.getLastRun().maskedCharacterProperties, newSubDocument.getLastRun().characterStyle)));
        this.newOffsetAtStartChunk++;
    }
    appendNewChunk(newSubDocument) {
        let newCurrentChunkAbsolutePosition = newSubDocument.chunks.length ? newSubDocument.getLastChunk().getEndPosition() : 0, newCurrentChunkPosition = newSubDocument.positionManager.registerPosition(newCurrentChunkAbsolutePosition), newCurrentChunk = new Chunk(newCurrentChunkPosition, "", false);
        newSubDocument.chunks.push(newCurrentChunk);
        return newCurrentChunk;
    }
    appendNewSection(newSubDocument) {
        this.tryAppendAdditionalParagraphRunInTheEnd(newSubDocument, true);
        let lastSection = newSubDocument.documentModel.sections[newSubDocument.documentModel.sections.length - 1];
        let newCurrentSectionAbsolutePosition = lastSection ? lastSection.getEndPosition() : 0, newCurrentSectionPosition = newSubDocument.positionManager.registerPosition(newCurrentSectionAbsolutePosition);
        let newCurrentSection = new Section(newSubDocument.documentModel, newCurrentSectionPosition, 0, this.oldCurrentSection.sectionProperties.clone());
        newSubDocument.documentModel.sections.push(newCurrentSection);
        return newCurrentSection;
    }
    copyToCore(targetStyle, oldStyle, newSubDocument) {
        targetStyle.maskedCharacterProperties = oldStyle.maskedCharacterProperties.clone();
        targetStyle.maskedParagraphProperties = oldStyle.maskedParagraphProperties.clone();
        targetStyle.tabs = oldStyle.tabs.clone();
        if (oldStyle.isInOwnList()) {
            targetStyle.numberingListIndex = CreateRangeCopyOperation.getNewNumberingListIndex(this.documentModel, oldStyle.numberingListIndex, newSubDocument, this.abstractNumberingListCache, this.numberingListCache);
        }
        else if (oldStyle.numberingListIndex == AbstractNumberingList.NoNumberingListIndex) {
            targetStyle.numberingListIndex = AbstractNumberingList.NoNumberingListIndex;
        }
    }
    copyPropertiesTo(targetStyle, oldStyle, newSubDocument) {
        this.copyToCore(targetStyle, oldStyle, newSubDocument);
        if (oldStyle.parent) {
            targetStyle.parent = newSubDocument.documentModel.stylesManager.addParagraphStyle(targetStyle.parent);
            this.copyPropertiesTo(targetStyle.parent, oldStyle.parent, newSubDocument);
        }
        if (oldStyle.nextParagraphStyle != null)
            targetStyle.nextParagraphStyle = newSubDocument.documentModel.stylesManager.addParagraphStyle(targetStyle.nextParagraphStyle);
    }
    appendNewParagraph(newSubDocument) {
        this.tryAppendAdditionalParagraphRunInTheEnd(newSubDocument, false);
        const oldCurrentParagraph = this.oldCurrentParagraph;
        const oldDocumentModel = oldCurrentParagraph.subDocument.documentModel;
        const lastParagraph = newSubDocument.paragraphs[newSubDocument.paragraphs.length - 1];
        const newCurrentParagraphAbsolutePosition = lastParagraph ? lastParagraph.getEndPosition() : 0;
        const newCurrentParagraphPosition = newSubDocument.positionManager.registerPosition(newCurrentParagraphAbsolutePosition);
        const newCurrentParagraphStyle = newSubDocument.documentModel.stylesManager.addParagraphStyle(oldCurrentParagraph.paragraphStyle);
        this.copyPropertiesTo(newCurrentParagraphStyle, oldCurrentParagraph.paragraphStyle, newSubDocument);
        const newCurrentMaskedParagraphProperties = newSubDocument.documentModel.cache.maskedParagraphPropertiesCache.getItem(oldCurrentParagraph.maskedParagraphProperties);
        const newCurrentParagraph = new Paragraph(newSubDocument, newCurrentParagraphPosition, 0, newCurrentParagraphStyle, newCurrentMaskedParagraphProperties);
        newCurrentParagraph.listLevelIndex = oldCurrentParagraph.listLevelIndex;
        newCurrentParagraph.numberingListIndex = CreateRangeCopyOperation.getNewNumberingListIndex(oldDocumentModel, oldCurrentParagraph.numberingListIndex, newSubDocument, this.abstractNumberingListCache, this.numberingListCache);
        newCurrentParagraph.tabs = oldCurrentParagraph.tabs.clone();
        newSubDocument.paragraphs.push(newCurrentParagraph);
        return newCurrentParagraph;
    }
    static getNewNumberingListIndex(oldmodel, oldNumberingListIndex, newSubDocument, abstractNumberingListCache = {}, numberingListCache = {}) {
        let newCurrentParagraphNumberingListIndex = -1;
        let newAbstractNumberingListIndex = -1;
        if (oldNumberingListIndex >= 0) {
            const oldNumberingList = oldmodel.numberingLists[oldNumberingListIndex];
            newCurrentParagraphNumberingListIndex = numberingListCache[oldNumberingList.getId()];
            if (newCurrentParagraphNumberingListIndex === undefined) {
                const oldAbstractNumberingList = oldmodel.abstractNumberingLists[oldNumberingList.abstractNumberingListIndex];
                newAbstractNumberingListIndex = abstractNumberingListCache[oldAbstractNumberingList.getId()];
                if (newAbstractNumberingListIndex === undefined) {
                    const newAbstractNumberingList = new AbstractNumberingList(newSubDocument.documentModel);
                    newAbstractNumberingList.copyFrom(oldAbstractNumberingList);
                    newAbstractNumberingListIndex = newSubDocument.documentModel.abstractNumberingLists.push(newAbstractNumberingList) - 1;
                    abstractNumberingListCache[oldAbstractNumberingList.getId()] = newAbstractNumberingListIndex;
                }
                const newNumberingList = new NumberingList(newSubDocument.documentModel, newAbstractNumberingListIndex);
                newNumberingList.copyFrom(oldNumberingList);
                newCurrentParagraphNumberingListIndex = newSubDocument.documentModel.numberingLists.push(newNumberingList) - 1;
                numberingListCache[oldNumberingList.getId()] = newCurrentParagraphNumberingListIndex;
            }
        }
        return newCurrentParagraphNumberingListIndex;
    }
    tryAppendAdditionalParagraphRunInTheEnd(newSubDocument, sectionEnd) {
        let lastChunk = newSubDocument.getLastChunk();
        if (!lastChunk)
            return false;
        let lastRun = lastChunk.textRuns[lastChunk.textRuns.length - 1];
        if (!lastRun)
            return false;
        if (!lastRun.isParagraphOrSectionRun()) {
            this.appendParagraphMarkInTheEnd(newSubDocument, lastRun.startOffset + lastRun.getLength(), sectionEnd);
            this.additionalParagraphRunPositions[lastChunk.getEndPosition() - 1] = true;
            return true;
        }
        return false;
    }
    initNewDocumentModel() {
        const newDocumentModel = new DocumentModel(this.documentModel.modelOptions, 0);
        newDocumentModel.defaultCharacterProperties = newDocumentModel.cache.maskedCharacterPropertiesCache.getItem(this.documentModel.defaultCharacterProperties);
        newDocumentModel.defaultParagraphProperties = newDocumentModel.cache.maskedParagraphPropertiesCache.getItem(this.documentModel.defaultParagraphProperties);
        newDocumentModel.defaultTableProperties = this.documentModel.defaultTableProperties.clone();
        newDocumentModel.defaultTableRowProperties = newDocumentModel.cache.tableRowPropertiesCache.getItem(this.documentModel.defaultTableRowProperties);
        newDocumentModel.defaultTableCellProperties = newDocumentModel.cache.tableCellPropertiesCache.getItem(this.documentModel.defaultTableCellProperties);
        newDocumentModel.colorProvider.officeTheme.copyFrom(this.documentModel.colorProvider.officeTheme);
        return newDocumentModel;
    }
    getNestedLevel(newSubDocument, sourceTable, nestedLevel) {
        if (sourceTable.nestedLevel > nestedLevel)
            return nestedLevel + 1;
        if (!sourceTable.parentCell)
            return 0;
        const newParentTableIndex = this.mapSourceTableIndexToTarget[sourceTable.getParentTable().index];
        return isDefined(newParentTableIndex) ? newSubDocument.tables[newParentTableIndex].nestedLevel + 1 : -1;
    }
    copyTables(newSubDocument, intervals) {
        const tables = this.subDocument.tables;
        this.mapSourceTableIndexToTarget = new MapCreator().get();
        if (!tables.length)
            return;
        const pos = intervals[0].start;
        let startTableIndex = Math.max(0, SearchUtils.normedInterpolationIndexOf(tables, t => t.getStartPosition(), pos));
        startTableIndex = Table.correctBoundTable(tables, startTableIndex, pos, (index) => --index).index;
        let nestedLevel = -1;
        let endSelectionPosition = intervals[0].end;
        let prevLength = 0;
        for (let i = startTableIndex, table; table = this.subDocument.tables[i]; i++) {
            if (table.nestedLevel != nestedLevel)
                nestedLevel = this.getNestedLevel(newSubDocument, table, nestedLevel);
            const tableStartPosition = table.getStartPosition();
            const tableInterval = table.interval;
            while (intervals.length > 0 && tableStartPosition >= intervals[0].end) {
                if (this.additionalParagraphRunPositions[intervals[0].end])
                    prevLength++;
                prevLength += intervals[0].length;
                intervals.shift();
            }
            if (!intervals.length)
                break;
            if (IntervalAlgorithms.getIntersectionNonNullLength(table.interval, intervals[0])) {
                if (intervals[0].containsInterval(tableInterval)) {
                    this.appendWholeTable(newSubDocument, table, intervals[0].start - prevLength, nestedLevel);
                }
                else {
                    let selectedCellInfos = this.getSelectedCells(table, intervals.slice(0), prevLength);
                    if (this.canCopyParticallyTable(selectedCellInfos))
                        this.appendParticallyTable(newSubDocument, selectedCellInfos, nestedLevel);
                    else
                        nestedLevel = -1;
                }
            }
            else if (tableStartPosition >= endSelectionPosition)
                break;
        }
    }
    appendWholeTable(newSubDocument, table, positionDelta, newNestedLevel) {
        let newTable = this.createTable(newSubDocument, table, newNestedLevel, positionDelta);
        newTable.preferredWidth = table.preferredWidth.clone();
        newTable.lookTypes = table.lookTypes;
        for (let i = 0, row; row = table.rows[i]; i++) {
            let newRow = new TableRow(newTable, newSubDocument.documentModel.cache.tableRowPropertiesCache.getItem(row.properties.clone()));
            newTable.rows.push(newRow);
            newRow.height = row.height.clone();
            if (row.tablePropertiesException)
                newRow.tablePropertiesException = row.tablePropertiesException.clone();
            newRow.gridBefore = row.gridBefore;
            newRow.gridAfter = row.gridAfter;
            newRow.widthAfter = row.widthAfter.clone();
            newRow.widthBefore = row.widthBefore.clone();
            for (let j = 0, cell; cell = row.cells[j]; j++) {
                let newCell = this.cloneTableCell(newSubDocument, newRow, cell);
                newCell.verticalMerging = cell.verticalMerging;
                newCell.startParagraphPosition = newSubDocument.positionManager.registerPosition(cell.startParagraphPosition.value - positionDelta);
                newCell.endParagrapPosition = newSubDocument.positionManager.registerPosition(cell.endParagrapPosition.value - positionDelta);
                newRow.cells.push(newCell);
            }
        }
    }
    appendParticallyTable(newSubDocument, selectedCellInfos, newNestedLevel) {
        let minLeftColumnIndex = Number.MAX_VALUE;
        let maxRightColumnIndex = 0;
        let table = selectedCellInfos[0][0].cell.parentRow.parentTable;
        for (let i = 0, horCells; horCells = selectedCellInfos[i]; i++) {
            let leftColumnIndex = TableCellUtils.getStartColumnIndex(horCells[0].cell);
            let rightColumnIndex = TableCellUtils.getEndColumnIndex(horCells[horCells.length - 1].cell);
            minLeftColumnIndex = Math.min(minLeftColumnIndex, leftColumnIndex);
            maxRightColumnIndex = Math.max(maxRightColumnIndex, rightColumnIndex);
        }
        let newStartPosition = selectedCellInfos[0][0].cell.startParagraphPosition.value - selectedCellInfos[0][0].positionDelta;
        let newTable = this.createTable(newSubDocument, table, newNestedLevel, newStartPosition);
        newTable.preferredWidth = TableWidthUnit.create(0, TableWidthUnitType.Auto);
        for (let i = 0, horCellInfos; horCellInfos = selectedCellInfos[i]; i++) {
            let leftColumnIndex = TableCellUtils.getStartColumnIndex(horCellInfos[0].cell);
            let rightColumnIndex = TableCellUtils.getEndColumnIndex(horCellInfos[horCellInfos.length - 1].cell);
            let row = horCellInfos[0].cell.parentRow;
            let newRow = new TableRow(newTable, newSubDocument.documentModel.cache.tableRowPropertiesCache.getItem(row.properties.clone()));
            newTable.rows.push(newRow);
            newRow.height = row.height.clone();
            newRow.gridBefore = leftColumnIndex - minLeftColumnIndex;
            newRow.gridAfter = maxRightColumnIndex - rightColumnIndex;
            for (let j = 0, cellInfo; cellInfo = horCellInfos[j]; j++) {
                let newCell = this.cloneTableCell(newSubDocument, newRow, cellInfo.cell);
                newCell.startParagraphPosition = newSubDocument.positionManager.registerPosition(cellInfo.cell.startParagraphPosition.value - cellInfo.positionDelta);
                newCell.endParagrapPosition = newSubDocument.positionManager.registerPosition(cellInfo.cell.endParagrapPosition.value - cellInfo.positionDelta);
                newRow.cells.push(newCell);
            }
        }
        TablesManipulator.normalizeCellColumnSpansWithoutHistory(newTable, true);
    }
    canCopyParticallyTable(selectedCellInfos) {
        if (selectedCellInfos.length === 0)
            return false;
        let prevRowEndPosition = selectedCellInfos[0][0].cell.parentRow.getEndPosition();
        let prevLeftColumnIndex = TableCellUtils.getStartColumnIndex(selectedCellInfos[0][0].cell);
        let prevRightColumnIndex = TableCellUtils.getEndColumnIndex(selectedCellInfos[0][selectedCellInfos[0].length - 1].cell);
        for (let i = 0, horCells; horCells = selectedCellInfos[i]; i++) {
            let prevCellEndPosition = horCells[0].cell.endParagrapPosition.value;
            for (let j = 1, cellInfo; cellInfo = horCells[j]; j++) {
                if (cellInfo.cell.startParagraphPosition.value !== prevCellEndPosition)
                    return false;
                prevCellEndPosition = cellInfo.cell.endParagrapPosition.value;
            }
            if (i > 0) {
                if (horCells[0].cell.parentRow.getStartPosition() !== prevRowEndPosition)
                    return false;
                let leftColumnIndex = TableCellUtils.getStartColumnIndex(horCells[0].cell);
                let rightColumnIndex = TableCellUtils.getEndColumnIndex(horCells[horCells.length - 1].cell);
                if (rightColumnIndex < prevLeftColumnIndex || leftColumnIndex > prevRightColumnIndex)
                    return false;
                prevRowEndPosition = horCells[0].cell.parentRow.getEndPosition();
            }
        }
        return true;
    }
    cloneTableCell(newSubDocument, newRow, sourceCell) {
        let newCell = new TableCell(newRow, newSubDocument.documentModel.cache.tableCellPropertiesCache.getItem(sourceCell.properties.clone()));
        newCell.columnSpan = sourceCell.columnSpan;
        newCell.conditionalFormatting = sourceCell.conditionalFormatting;
        newCell.preferredWidth = sourceCell.preferredWidth.clone();
        newCell.style = sourceCell.style;
        return newCell;
    }
    createTable(newSubDocument, oldTable, newNestedLevel, newDocumentStartPosition) {
        let newTableStyle = newSubDocument.documentModel.stylesManager.addTableStyle(oldTable.style);
        let newTable = new Table(oldTable.properties.clone(), newTableStyle);
        newTable.nestedLevel = newNestedLevel;
        if (newNestedLevel > 0) {
            let newStartPosition = oldTable.getStartPosition() - newDocumentStartPosition;
            newTable.parentCell = Table.getTableCellByPosition(newSubDocument.tables, newStartPosition);
        }
        newTable.index = newSubDocument.tables.push(newTable) - 1;
        this.mapSourceTableIndexToTarget[oldTable.index] = newTable.index;
        (newSubDocument.tablesByLevels[newNestedLevel] || (newSubDocument.tablesByLevels[newNestedLevel] = [])).push(newTable);
        return newTable;
    }
    getSelectedCells(table, intervals, prevLength) {
        let currentIntervalIndex = 0;
        let maxIntervalIndex = intervals.length - 1;
        let selectedCellInfos = [];
        for (let rowIndex = 0, row; row = table.rows[rowIndex]; rowIndex++) {
            let horCells = [];
            for (let cellIndex = 0, cell; cell = row.cells[cellIndex]; cellIndex++) {
                while (currentIntervalIndex <= maxIntervalIndex && intervals[currentIntervalIndex].end < cell.endParagrapPosition.value) {
                    if (this.additionalParagraphRunPositions[intervals[currentIntervalIndex].end])
                        prevLength++;
                    prevLength += intervals[currentIntervalIndex].length;
                    currentIntervalIndex++;
                }
                if (currentIntervalIndex > maxIntervalIndex)
                    break;
                if (intervals[currentIntervalIndex].containsInterval(cell.interval)) {
                    horCells.push(new TableCellInfo(cell, intervals[currentIntervalIndex].start - prevLength));
                }
            }
            if (horCells.length)
                selectedCellInfos.push(horCells);
            if (currentIntervalIndex > maxIntervalIndex)
                break;
        }
        return selectedCellInfos;
    }
}
export class RangeCopy {
    constructor(model, addedUselessParagraphMarkInEnd, abstractNumberingListCache = {}, numberingListCache = {}, pictureSizeUpdater) {
        this.model = model;
        this.addedUselessParagraphMarkInEnd = addedUselessParagraphMarkInEnd;
        this.abstractNumberingListCache = abstractNumberingListCache;
        this.numberingListCache = numberingListCache;
        this.pictureSizeUpdater = pictureSizeUpdater;
    }
    insertTo(modelManipulator, subDocPosition, overlapTableCellContent = false) {
        const sourceInterval = new FixedInterval(0, this.model.mainSubDocument.getDocumentEndPosition()
            - (this.addedUselessParagraphMarkInEnd ? 1 : 0));
        const insertOptions = new SubDocumentInserterOptions();
        insertOptions.overlapTableCellContent = overlapTableCellContent;
        insertOptions.abstractNumberingListCache = this.abstractNumberingListCache;
        insertOptions.numberingListCache = this.numberingListCache;
        insertOptions.pictureSizeUpdater = this.pictureSizeUpdater;
        return modelManipulator.subDocument.insertSubDocument(subDocPosition, new SubDocumentInterval(this.model.mainSubDocument, sourceInterval), insertOptions)
            .insetedInterval;
    }
    insertToTable(modelManipulator, insertPosition, targetTableInfo) {
        const sourceTable = this.model.mainSubDocument.tables[0];
        if (!sourceTable)
            return this.insertTo(modelManipulator, insertPosition);
        return this.overlapTableContent(modelManipulator, sourceTable, targetTableInfo);
    }
    overlapTableContent(modelManipulator, sourceTable, targetTableInfo) {
        let firstCellIndex = targetTableInfo.rawData.firstCellInfo.cellIndex;
        let lastCellIndex = targetTableInfo.rawData.lastCellInfo.cellIndex;
        let firstRowIndex = targetTableInfo.rawData.firstRowInfo.rowIndex;
        let lastRowIndex = targetTableInfo.rawData.lastRowInfo.rowIndex;
        if (firstCellIndex == lastCellIndex) {
            lastCellIndex = firstCellIndex + sourceTable.rows[0].cells.length - 1;
            if (firstRowIndex == lastRowIndex)
                lastRowIndex = firstRowIndex + sourceTable.rows.length - 1;
        }
        for (let i = firstRowIndex; i <= lastRowIndex; i++) {
            for (let j = firstCellIndex; j <= lastCellIndex; j++) {
                if (i >= targetTableInfo.table.rows.length)
                    return targetTableInfo.table.interval;
                this.overlapTableCellContent(modelManipulator, sourceTable, targetTableInfo, i, j);
            }
        }
        return targetTableInfo.table.interval;
    }
    overlapTableCellContent(modelManipulator, sourceTable, targetTableInfo, rowIndex, columnIndex) {
        const targetCell = targetTableInfo.table.rows[rowIndex].cells[columnIndex];
        if (!targetCell)
            return;
        const i = (rowIndex - targetTableInfo.rawData.firstRowInfo.rowIndex) % sourceTable.rows.length;
        const j = (columnIndex - targetTableInfo.rawData.firstCellInfo.cellIndex) % sourceTable.rows[i].cells.length;
        const sourceCell = sourceTable.rows[i].cells[j];
        const copyOperation = new CreateRangeCopyOperation(this.model.mainSubDocument, this.abstractNumberingListCache, this.numberingListCache);
        const rangeCopy = copyOperation.execute([sourceCell.interval]);
        modelManipulator.range.removeInterval(new SubDocumentInterval(modelManipulator.model.mainSubDocument, targetCell.interval), false, true);
        rangeCopy.insertTo(modelManipulator, new SubDocumentPosition(modelManipulator.model.mainSubDocument, targetCell.interval.start), true);
    }
    static create(subDocIntervals) {
        return new CreateRangeCopyOperation(subDocIntervals.subDocument, {}, {}).execute(subDocIntervals.intervals);
    }
}
class TableCellInfo {
    constructor(cell, positionDelta) {
        this.cell = cell;
        this.positionDelta = positionDelta;
    }
}
