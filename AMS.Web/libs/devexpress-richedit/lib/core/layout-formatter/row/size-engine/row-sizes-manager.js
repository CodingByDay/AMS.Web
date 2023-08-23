import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Errors } from '@devexpress/utils/lib/errors';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { LayoutBox, LayoutBoxType } from '../../../layout/main-structures/layout-boxes/layout-box';
import { LayoutNumberingListBox } from '../../../layout/main-structures/layout-boxes/layout-numbering-list-box';
import { ListNumberAlignment } from '../../../model/numbering-lists/list-level-properties';
import { ParagraphFirstLineIndent } from '../../../model/paragraph/paragraph-properties';
import { BoxWrap } from '../../box/box-wrap';
import { RowFormattingInfo } from './row-formatting-info';
import { RowHeightCalculator } from './row-height-calculator';
export class RowSizesManager {
    constructor(rowFormatter, outerHorizontalRowContentBounds, minY, rowSpacingBeforeApplier, boundsOfAnchoredOblectsOnThisColumn, isFirstRowInParagraph) {
        this.rowFormatter = rowFormatter;
        this.row = this.rowFormatter.row;
        this.row.x = outerHorizontalRowContentBounds.start;
        this.row.width = outerHorizontalRowContentBounds.length;
        this.rowStartPos = this.rowFormatter.currBox.rowOffset;
        this.heightCalculator = new RowHeightCalculator(this.rowFormatter, rowSpacingBeforeApplier);
        if (isFirstRowInParagraph && this.rowFormatter.paragraph.isInList())
            this.addNumberingListBoxes();
        const tableCell = this.rowFormatter.paragraph.getTableCell();
        this.rowFormattingInfo = new RowFormattingInfo(minY, this.heightCalculator.currState.getFullRowHeight(), outerHorizontalRowContentBounds, boundsOfAnchoredOblectsOnThisColumn, tableCell);
        this.rowFormattingInfo.calculate();
    }
    addNumberingListBoxes() {
        const paragraph = this.rowFormatter.paragraph;
        const charProp = paragraph.getNumerationCharacterProperties();
        this.row.numberingListBox = new LayoutNumberingListBox(charProp, charProp.getLayoutColorInfo(this.rowFormatter.manager.model.colorProvider), paragraph.getNumberingListTextCore(this.rowFormatter.numberingListCountersManager.calculateCounters(this.rowFormatter.result.paragraphIndex)), paragraph.getNumberingListSeparatorChar(), this.rowFormatter.manager.model.cache.mergedCharacterPropertiesCache, paragraph.getListLevel().getListLevelProperties().alignment, this.rowFormatter.manager.model.cache.fontInfoCache);
        LayoutBox.initializeWithMeasurer([new BoxWrap(this.row.numberingListBox, null)], this.rowFormatter.manager.measurer, this.rowFormatter.manager.innerClientProperties.showHiddenSymbols);
        const boxes = [this.row.numberingListBox.textBox];
        const separatorBox = this.row.numberingListBox.separatorBox;
        if (separatorBox)
            boxes.push(separatorBox);
        for (let box of boxes)
            this.heightCalculator.applyState(this.heightCalculator.getState(box));
    }
    addFullWord(boxes) {
        const wordWidth = ListUtils.accumulate(boxes, 0, (width, box) => width + box.width);
        const currIntervalEndPos = this.rowFormattingInfo.currInterval.end;
        let indexOfFreeInterval = this.rowFormattingInfo.indexOfFreeInterval(wordWidth);
        if (indexOfFreeInterval < 0)
            return new AddFullWordResult(false, wordWidth);
        const oldHeightState = this.heightCalculator.currState;
        ListUtils.forEach(boxes, (box) => this.heightCalculator.applyState(this.heightCalculator.getState(box)));
        const newHeightState = this.heightCalculator.currState;
        const newHeight = newHeightState.getFullRowHeight();
        this.rowFormattingInfo.intervals[indexOfFreeInterval].avaliableWidth -= wordWidth;
        if (newHeight != this.rowFormattingInfo.height && !this.rowFormattingInfo.canIncrementHeightTo(newHeight)) {
            this.rowFormattingInfo.height = newHeight;
            this.heightCalculator.currState = oldHeightState;
            this.restartAllRow();
            return null;
        }
        this.heightCalculator.applyState(newHeightState);
        if (this.rowFormattingInfo.currIndex != indexOfFreeInterval)
            this.finishLogicalRow(indexOfFreeInterval, currIntervalEndPos);
        let x = this.rowFormattingInfo.currInterval.startOfFreeSpace - wordWidth;
        for (let box of boxes) {
            box.x = x;
            x += box.width;
            this.row.boxes.push(box);
            this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
        }
        return new AddFullWordResult(true);
    }
    addWordByChars(boxes) {
        let isAddAtLeastOneChar = true;
        const viewsSettings = this.rowFormatter.manager.innerClientProperties.viewsSettings;
        for (let box of boxes) {
            if (this.rowFormattingInfo.currInterval.avaliableWidth >= box.width) {
                box.x = this.rowFormattingInfo.currInterval.startOfFreeSpace;
                this.rowFormattingInfo.currInterval.avaliableWidth -= box.width;
                this.row.boxes.push(box);
                this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
                this.heightCalculator.applyState(this.heightCalculator.getState(box));
            }
            else {
                const newBox = box.splitByWidth(this.rowFormatter.manager.measurer, this.rowFormattingInfo.currInterval.avaliableWidth, isAddAtLeastOneChar);
                if (newBox) {
                    newBox.x = this.rowFormattingInfo.currInterval.startOfFreeSpace;
                    this.row.boxes.push(newBox);
                    this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
                    this.heightCalculator.applyState(this.heightCalculator.getState(newBox));
                    return newBox.getEndPosition();
                }
                return box.rowOffset;
            }
            isAddAtLeastOneChar = false;
        }
        if (viewsSettings.isSimpleView)
            return boxes[boxes.length - 1].getEndPosition();
        throw new Error(Errors.InternalException);
    }
    addTabBox(box) {
        this.row.boxes.push(box);
        this.rowFormattingInfo.currInterval.avaliableWidth -= box.width;
        this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
        this.rowFormatter.setBoxInfo(true);
    }
    addBox() {
        const currIntervalEndPos = this.rowFormattingInfo.currInterval.end;
        const box = this.rowFormatter.currBox;
        const indexOfFreeInterval = this.rowFormattingInfo.indexOfFreeInterval(box.width);
        if (indexOfFreeInterval < 0) {
            if (this.row.isEmpty()) {
                if (this.rowFormattingInfo.isFloatingIntersectRow) {
                    this.rowFormattingInfo.findNextYPos();
                    this.rowFormattingInfo.currIndex = 0;
                    this.addBox();
                }
                else {
                    box.x = this.rowFormattingInfo.intervals[0].startOfFreeSpace;
                    this.rowFormattingInfo.intervals[0].avaliableWidth -= Math.min(box.width, this.rowFormattingInfo.intervals[0].avaliableWidth);
                    this.addBoxIgnoreWidth();
                }
            }
            else
                this.rowFormatter.finishRow();
            return;
        }
        this.rowFormattingInfo.intervals[indexOfFreeInterval].avaliableWidth -= box.width;
        const newHeightState = this.heightCalculator.getState(box);
        const newHeight = newHeightState.getFullRowHeight();
        if (newHeight != this.rowFormattingInfo.height && !this.rowFormattingInfo.canIncrementHeightTo(newHeight)) {
            this.rowFormattingInfo.intervals[indexOfFreeInterval].avaliableWidth += box.width;
            this.rowFormattingInfo.height = newHeight;
            this.restartAllRow();
            return;
        }
        this.rowFormattingInfo.height = newHeight;
        this.heightCalculator.applyState(newHeightState);
        if (this.rowFormattingInfo.currIndex != indexOfFreeInterval)
            this.finishLogicalRow(indexOfFreeInterval, currIntervalEndPos);
        box.x = this.rowFormattingInfo.currInterval.startOfFreeSpace - box.width;
        this.row.boxes.push(box);
        this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
        this.rowFormatter.setBoxInfo(true);
    }
    addBoxIgnoreWidth() {
        const box = this.rowFormatter.currBox;
        this.row.boxes.push(box);
        this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
        this.heightCalculator.applyState(this.heightCalculator.getState(box));
        this.rowFormatter.setBoxInfo(true);
    }
    anywayAddBox() {
        const box = this.rowFormatter.currBox;
        box.x = this.rowFormattingInfo.currInterval.startOfFreeSpace;
        this.rowFormattingInfo.currInterval.avaliableWidth -= box.width;
        if (this.rowFormattingInfo.currInterval.avaliableWidth < 0)
            this.rowFormattingInfo.currInterval.avaliableWidth = 0;
        this.row.boxes.push(box);
        this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
        this.rowFormatter.setBoxInfo(true);
    }
    restartAllRow(deleteAnchoredObjects = true) {
        this.rowFormatter.setPosition(this.rowStartPos, false, true);
        this.rowFormatter.setBoxInfo(false);
        this.rowFormattingInfo.calculate();
        this.rowFormattingInfo.currIndex = 0;
        this.rowFormatter.result.startRowFormatting(deleteAnchoredObjects);
        this.rowFormatter.wordHolder.restart();
        this.rowFormatter.tabInfo.restart();
    }
    finishLogicalRow(nextIndex, prevRowEndPos) {
        if (this.rowFormattingInfo.currInterval.isConsiderBoxes())
            this.rowFormatter.result.finishLogicalRow(prevRowEndPos);
        this.rowFormattingInfo.currIndex = nextIndex;
    }
    finishRow() {
        this.row.y = this.rowFormattingInfo.minY;
        if (this.heightCalculator.setFinalRowParams() || this.row.containsSpacesOnly() ||
            this.rowFormattingInfo.canIncrementHeightTo(this.heightCalculator.currState.getFullRowHeight())) {
            this.rowFormatter.result.finishRow();
            return true;
        }
        this.rowFormattingInfo.height = this.heightCalculator.currState.getFullRowHeight();
        this.restartAllRow();
        return false;
    }
    addNumberingBoxes() {
        return !!this.row.boxes.length || !this.row.numberingListBox || this.tryPlaceNumberingBoxes();
    }
    getTabEndPos(isFirstIteration, textBoxEndPos) {
        const customTabPos = this.rowFormatter.tabInfo.getNextCustomTabPosition(textBoxEndPos);
        if (this.rowFormatter.paragraphProps.firstLineIndentType == ParagraphFirstLineIndent.Hanging) {
            const rightBound = this.rowFormatter.paragraphHorizontalBounds.start +
                UnitConverter.twipsToPixelsF(this.rowFormatter.paragraphProps.leftIndent);
            if (customTabPos && isFirstIteration && rightBound > textBoxEndPos &&
                FixedInterval.fromPositions(textBoxEndPos, rightBound).contains(customTabPos.position))
                return customTabPos.position;
            return rightBound < textBoxEndPos ? this.rowFormatter.tabInfo.getNextDefaultTabPosition(textBoxEndPos) : rightBound;
        }
        else
            return customTabPos ? customTabPos.position : this.rowFormatter.tabInfo.getNextDefaultTabPosition(textBoxEndPos);
    }
    tryPlaceNumberingBoxes() {
        const numberingListBox = this.row.numberingListBox;
        const textBox = numberingListBox.textBox;
        const offset = this.calculateNumberingListBoxOffset(numberingListBox.alignment, textBox.width);
        const startPos = this.rowFormattingInfo.currInterval.startOfFreeSpace - offset;
        textBox.x = startPos;
        let totalWidth = textBox.width;
        let separatorWidthDependsOnIntervalIndex = false;
        const separatorBox = numberingListBox.separatorBox;
        if (separatorBox) {
            const textBoxEndPos = startPos + this.row.numberingListBox.textBox.width;
            if (separatorBox.getType() == LayoutBoxType.TabSpace) {
                const tabEndPosition = this.getTabEndPos(this.rowFormattingInfo.currIndex == 0, textBoxEndPos);
                separatorBox.width = tabEndPosition - textBoxEndPos;
                separatorWidthDependsOnIntervalIndex = true;
            }
            separatorBox.x = textBoxEndPos;
            totalWidth += separatorBox.width;
        }
        if (this.rowFormattingInfo.isFloatingIntersectRow) {
            const indexOfFreeInterval = this.rowFormattingInfo.indexOfFreeInterval(totalWidth);
            if (indexOfFreeInterval < 0) {
                this.rowFormattingInfo.findNextYPos();
                this.rowFormattingInfo.currIndex = 0;
                this.restartAllRow();
                return false;
            }
            if (this.rowFormattingInfo.currIndex != indexOfFreeInterval) {
                const currIntervalEndPos = this.rowFormattingInfo.currInterval ? this.rowFormattingInfo.currInterval.end : -1;
                if (separatorWidthDependsOnIntervalIndex) {
                    this.finishLogicalRow(this.rowFormattingInfo.currIndex + 1, currIntervalEndPos);
                    return this.tryPlaceNumberingBoxes();
                }
                else
                    this.finishLogicalRow(indexOfFreeInterval, currIntervalEndPos);
            }
        }
        this.row.x -= offset;
        this.rowFormattingInfo.currInterval.start -= offset;
        this.rowFormattingInfo.currInterval.avaliableWidth -= totalWidth;
        this.rowFormattingInfo.lastNonEmptyIntervalIndex = this.rowFormattingInfo.currIndex;
        return true;
    }
    calculateNumberingListBoxOffset(alignment, boxWidth) {
        let offset = 0;
        if (alignment == ListNumberAlignment.Center)
            offset = boxWidth / 2;
        else if (alignment == ListNumberAlignment.Right)
            offset = boxWidth;
        return offset;
    }
}
export class AddFullWordResult {
    constructor(isSuccess, requiredWidth) {
        this.isSuccess = isSuccess;
        this.requiredWidth = requiredWidth;
    }
}
