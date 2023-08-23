import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Errors } from '@devexpress/utils/lib/errors';
import { EnumUtils } from '@devexpress/utils/lib/utils/enum';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { MathUtils } from '@devexpress/utils/lib/utils/math';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { LayoutBoxType } from '../../layout/main-structures/layout-boxes/layout-box';
import { TabLeaderType } from '../../layout/main-structures/layout-boxes/layout-tab-space-box';
import { TabAlign } from '../../model/paragraph/paragraph';
import { ParagraphFirstLineIndent } from '../../model/paragraph/paragraph-properties';
import { TabInfo } from '../../model/paragraph/paragraph-style';
import { NumberUtils } from '../formatter/utils/number-utils';
import { BoxAligner } from './utils/box-aligner';
export class RowTabInfo {
    constructor(rowFormatter, paragraphHorizontalBoundsStart) {
        this.rowFormatter = rowFormatter;
        this.paragraphHorizontalBoundsStart = paragraphHorizontalBoundsStart;
        const tabsInfo = this.rowFormatter.paragraph.getTabs();
        this.defaultTabStop = UnitConverter.twipsToPixelsF(tabsInfo.defaultTabStop);
        this.tabPositions = tabsInfo.positions;
        for (let tabPosition of this.tabPositions)
            tabPosition.position = UnitConverter.twipsToPixelsF(tabPosition.position);
        if (this.rowFormatter.paragraphProps.firstLineIndentType == ParagraphFirstLineIndent.Hanging && !this.rowFormatter.paragraph.isInList()) {
            const pos = UnitConverter.twipsToPixelsF(this.rowFormatter.paragraphProps.leftIndent);
            const ind = Math.max(0, SearchUtils.normedInterpolationIndexOf(this.tabPositions, (t) => t.position, pos));
            const tab = this.tabPositions[ind];
            const oldTabPos = tab ? tab.position : Number.MAX_VALUE;
            if (oldTabPos != pos)
                this.tabPositions.splice(pos > oldTabPos ? ind + 1 : ind, 0, new TabInfo(pos, TabAlign.Left, TabLeaderType.None, false, false));
        }
        for (let pos of this.tabPositions)
            pos.position += this.paragraphHorizontalBoundsStart;
        this.restart();
    }
    get row() {
        return this.rowFormatter.row;
    }
    get currIntervalOrLastNonEmpty() {
        const currInterval = this.rowFormatter.rowSizesManager.rowFormattingInfo.currInterval;
        return currInterval ? currInterval : this.rowFormatter.rowSizesManager.rowFormattingInfo.lastNonEmptyInterval;
    }
    get currInterval() { return this.rowFormatter.rowSizesManager.rowFormattingInfo.currInterval; }
    restart() {
        this.lastTabPosition = null;
        this.lastTabBoxIndex = -1;
    }
    shiftBoxesAfterLastTab() {
        if (!this.lastTabPosition || EnumUtils.isAnyOf(this.lastTabPosition.alignment, TabAlign.Left, TabAlign.Numbering))
            return;
        const prevTabBox = this.row.boxes[this.lastTabBoxIndex];
        const prevTabNewWidth = this.calculateActualTabWidth(prevTabBox);
        if (prevTabNewWidth > 0) {
            prevTabBox.width = prevTabNewWidth;
            this.currIntervalOrLastNonEmpty.avaliableWidth -= prevTabNewWidth;
            ListUtils.forEach(this.row.boxes, (box) => box.x += prevTabNewWidth, this.lastTabBoxIndex + 1);
        }
        this.restart();
    }
    addTabBox() {
        const box = this.rowFormatter.currBox;
        this.shiftBoxesAfterLastTab();
        let tabPosition = this.getNextCustomTabPosition(this.currInterval.startOfFreeSpace);
        let tabXPosRelativePage = tabPosition ? tabPosition.position : this.getNextDefaultTabPosition(this.currInterval.startOfFreeSpace);
        if (tabXPosRelativePage > this.currInterval.end) {
            let ind = this.rowFormatter.rowSizesManager.rowFormattingInfo.indexOfIntervalContainsPositon(tabXPosRelativePage);
            if (ind != this.rowFormatter.rowSizesManager.rowFormattingInfo.currIndex) {
                const mustPlaceOnThisRow = tabPosition && tabPosition.alignment == TabAlign.Right;
                if (mustPlaceOnThisRow)
                    tabXPosRelativePage = this.currInterval.end;
                else {
                    this.rowFormatter.rowSizesManager.finishLogicalRow(ind, this.currInterval.end);
                    tabPosition = this.getNextCustomTabPosition(this.currInterval.startOfFreeSpace);
                    tabXPosRelativePage = tabPosition ? tabPosition.position : this.getNextDefaultTabPosition(this.currInterval.startOfFreeSpace);
                }
            }
        }
        box.x = this.currInterval.startOfFreeSpace;
        box.width = !tabPosition || EnumUtils.isAnyOf(tabPosition.alignment, TabAlign.Left, TabAlign.Numbering) ? tabXPosRelativePage - box.x : 0;
        const tabBox = box.getLayoutTabBox(tabPosition ? tabPosition.leader : TabLeaderType.None);
        if (tabBox.right > ListUtils.last(this.rowFormatter.rowSizesManager.rowFormattingInfo.intervals).end) {
            if (!this.row.isEmpty())
                return false;
            if (this.rowFormatter.rowSizesManager.rowFormattingInfo.isFloatingIntersectRow) {
                this.rowFormatter.rowSizesManager.rowFormattingInfo.findNextYPos();
                this.rowFormatter.rowSizesManager.restartAllRow(false);
                while (EnumUtils.isAnyOf(this.rowFormatter.currBox.getType(), LayoutBoxType.AnchorPicture, LayoutBoxType.AnchorTextBox))
                    this.rowFormatter.setBoxInfo(true);
                return this.addTabBox();
            }
        }
        this.rowFormatter.rowSizesManager.addTabBox(tabBox);
        this.lastTabPosition = tabPosition ? tabPosition : new TabInfo(tabXPosRelativePage, TabAlign.Left, TabLeaderType.None, false, false);
        this.lastTabBoxIndex = this.row.boxes.length - 1;
        return true;
    }
    calculateActualTabWidth(prevTabBox) {
        const prevTabBoxXPos = prevTabBox.x;
        switch (this.lastTabPosition.alignment) {
            case TabAlign.Decimal: {
                const decimalSeparatorChar = StringUtils.getDecimalSeparator();
                for (let i = this.lastTabBoxIndex + 1, box; box = this.row.boxes[i]; i++) {
                    const charIndex = box.getCharIndex(decimalSeparatorChar);
                    if (charIndex >= 0) {
                        const charXOffset = box.getCharOffsetXInPixels(this.rowFormatter.manager.measurer, charIndex);
                        return this.getFinalCustomTabWidth(prevTabBoxXPos, box.x + charXOffset - prevTabBoxXPos);
                    }
                }
            }
            case TabAlign.Right: {
                const lastTextBoxRightBound = this.calcLastVisibleBoxRightBounds(prevTabBoxXPos);
                const tabPosition = Math.min(this.lastTabPosition.position, this.currIntervalOrLastNonEmpty.start + this.currIntervalOrLastNonEmpty.length);
                return Math.max(0, tabPosition - lastTextBoxRightBound);
            }
            case TabAlign.Center: {
                const lastTextBoxRightBound = this.calcLastVisibleBoxRightBounds(prevTabBoxXPos);
                return this.getFinalCustomTabWidth(prevTabBoxXPos, Math.ceil((lastTextBoxRightBound - prevTabBoxXPos) / 2));
            }
            case TabAlign.Left:
            case TabAlign.Numbering:
                return 0;
            default:
                throw new Error(Errors.InternalException);
        }
    }
    calcLastVisibleBoxRightBounds(prevTabBoxXPos) {
        const startIndex = this.row.boxes.length - 1;
        const endIndex = this.lastTabBoxIndex + 1;
        const lastVisibleBox = this.row.boxes[BoxAligner.findLastVisibleBoxIndex(this.row.boxes, startIndex, endIndex)];
        return lastVisibleBox ? lastVisibleBox.right : prevTabBoxXPos;
    }
    getFinalCustomTabWidth(prevTabBoxXPos, textLengthBetweenTabBoxAndTabMark) {
        return MathUtils.restrictValue(this.lastTabPosition.position - prevTabBoxXPos - textLengthBetweenTabBoxAndTabMark, 0, this.currIntervalOrLastNonEmpty.avaliableWidth);
    }
    getNextDefaultTabPosition(xOffsetRelativePage) {
        if (!this.defaultTabStop)
            return xOffsetRelativePage;
        if (xOffsetRelativePage >= this.paragraphHorizontalBoundsStart) {
            const tab = this.paragraphHorizontalBoundsStart +
                this.defaultTabStop * (Math.floor((xOffsetRelativePage - this.paragraphHorizontalBoundsStart) / this.defaultTabStop) + 1);
            return tab - xOffsetRelativePage > 1 ? tab : tab + this.defaultTabStop;
        }
        return this.paragraphHorizontalBoundsStart -
            this.defaultTabStop * Math.floor((this.paragraphHorizontalBoundsStart - xOffsetRelativePage) / this.defaultTabStop);
    }
    getNextCustomTabPosition(xOffsetRelativePage) {
        return ListUtils.elementBy(this.tabPositions, (tabPos) => NumberUtils.lessThan(xOffsetRelativePage, tabPos.position));
    }
}
