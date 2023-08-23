import { Flag } from '@devexpress/utils/lib/class/flag';
import { MinMaxNumber } from '@devexpress/utils/lib/class/min-max';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { LayoutBoxType } from '../../layout/main-structures/layout-boxes/layout-box';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
import { BoxGenerator } from './generator/box-infos-generator';
export var IteratorFlags;
(function (IteratorFlags) {
    IteratorFlags[IteratorFlags["None"] = 0] = "None";
    IteratorFlags[IteratorFlags["DocumentEnd"] = 1] = "DocumentEnd";
})(IteratorFlags || (IteratorFlags = {}));
export class BoxWrapsHolder {
    constructor(manager, subDocumentId) {
        this.manager = manager;
        this.subDocument = manager.model.subDocuments[subDocumentId];
        this.boxGenerator = new BoxGenerator(manager, this);
    }
    reset(pos) {
        this.wrappers = [];
        this.wrapIndex = 0;
        this.flags = new Flag(IteratorFlags.None);
        this.boxGenerator.positionFromStartGenerate = pos;
        this.boxGenerator.waitForMoreChunks = false;
        this.boxGenerator.generate();
        this.getWrap();
        Log.print(LogSource.BoxWrapHolder, "reset", () => `wrappers.length:${this.wrappers.length}, subDocId: ${this.subDocument.id}`);
    }
    getWrap() {
        const wrap = this.wrappers[this.wrapIndex];
        if (wrap) {
            this.currPos = wrap.box.rowOffset;
            Log.print(LogSource.BoxWrapHolder, "getWrap", () => `currPos: ${this.currPos}, wrapInd: ${this.wrapIndex}, subDocId: ${this.subDocument.id}`);
            return wrap;
        }
        if (this.boxGenerator.generate()) {
            const newWrap = this.wrappers[this.wrapIndex];
            this.currPos = newWrap.box.rowOffset;
            Log.print(LogSource.BoxWrapHolder, "getWrap", () => `currPos: ${this.currPos}, wrapInd: ${this.wrapIndex}, subDocId: ${this.subDocument.id}`);
            return newWrap;
        }
        const lastWrap = ListUtils.last(this.wrappers);
        this.currPos = lastWrap ? lastWrap.box.getEndPosition() : this.subDocument.getDocumentEndPosition();
        Log.print(LogSource.BoxWrapHolder, "getWrap", () => `currPos: ${this.currPos}, wrapInd: ${this.wrapIndex}, subDocId: ${this.subDocument.id}`);
        return null;
    }
    get position() {
        return this.currPos;
    }
    setPosition(pos, forceResetBoxInfos) {
        if (!forceResetBoxInfos && this.trySetPosition(pos))
            return;
        this.reset(pos);
    }
    toNextWrap() {
        this.wrapIndex++;
        this.getWrap();
    }
    setParagraphsWidthInfo(wrappers) {
        this.paragraphBoundsInfo = {};
        let parIndex = -1;
        let parWidthBounds = null;
        let wordWidth;
        let lineWidth;
        for (let wrap of wrappers) {
            const tblPoss = wrap.info.tablePosition;
            if (tblPoss) {
                if (wrap.info.paragraphIndex != parIndex) {
                    parIndex = wrap.info.paragraphIndex;
                    parWidthBounds = new MinMaxNumber(0, 0);
                    this.paragraphBoundsInfo[parIndex] = parWidthBounds;
                    wordWidth = 0;
                    lineWidth = 0;
                }
                if (wrap.box.getType() == LayoutBoxType.AnchorTextBox) {
                    this.manager.anchoredObjectsManager.textBoxContextSizeCalculators[wrap.box.objectId].paragraphMinMax = parWidthBounds;
                    continue;
                }
                if (wrap.box.isLineBreak())
                    lineWidth = 0;
                else {
                    lineWidth += wrap.box.width;
                    parWidthBounds.maxElement = Math.max(parWidthBounds.maxElement, lineWidth);
                }
                if (wrap.box.isLineBreak() || wrap.box.isWhitespace() || wrap.box.isDashBox) {
                    wordWidth = 0;
                }
                else {
                    wordWidth += wrap.box.width;
                    parWidthBounds.minElement = Math.max(parWidthBounds.minElement, wordWidth);
                }
            }
        }
    }
    setNewWrappers(newLayoutBoxes, generateFrom) {
        if (!newLayoutBoxes.length)
            return;
        ListUtils.addListOnTail(this.wrappers, newLayoutBoxes);
        const excessLen = this.wrappers.length - BoxWrapsHolder.MAX_BOXES_IN_LIST;
        if (excessLen > 0) {
            const prevWrap = this.wrappers[excessLen - 1];
            const nextWrap = this.wrappers[excessLen];
            if (prevWrap.box.getEndPosition() <= generateFrom && !(nextWrap && nextWrap.info.tablePosition)) {
                this.wrappers.splice(0, excessLen);
                this.wrapIndex = Math.max(0, this.wrapIndex - excessLen);
            }
        }
        Log.print(LogSource.BoxWrapHolder, "setNewWrappers", () => `wrappers.length:${this.wrappers.length}, subDocId: ${this.subDocument.id}`);
        this.setParagraphsWidthInfo(this.wrappers);
    }
    setNextValidWrapPosition(pos, nestedLevel) {
        if (this.interval.contains(pos)) {
            this.wrapIndex = SearchUtils.normedInterpolationIndexOf(this.wrappers, (w) => w.box.rowOffset, pos);
            let currentWrap = this.wrappers[this.wrapIndex];
            const length = this.wrappers.length;
            while (currentWrap.info.getTableNestedLevel() >= nestedLevel && this.wrapIndex < length - 1)
                currentWrap = this.wrappers[++this.wrapIndex];
            this.currPos = currentWrap.box.getEndPosition();
        }
        else
            this.reset(pos);
    }
    trySetPosition(pos) {
        if (!this.interval.contains(pos))
            return false;
        this.wrapIndex = SearchUtils.normedInterpolationIndexOf(this.wrappers, (w) => w.box.rowOffset, pos);
        const wrap = this.wrappers[this.wrapIndex];
        if (pos >= wrap.box.getEndPosition()) {
            this.currPos = this.wrappers[++this.wrapIndex].box.rowOffset;
            return true;
        }
        const offsetFromStartBox = pos - wrap.box.rowOffset;
        if (offsetFromStartBox > 0)
            this.splitBoxByPosition(wrap, offsetFromStartBox);
        this.currPos = this.wrappers[this.wrapIndex].box.rowOffset;
        return true;
    }
    splitBoxByPosition(wrap, offsetFromStartBox) {
        const next = wrap.splitByPosition(this.manager.measurer, offsetFromStartBox);
        if (!next)
            return;
        this.wrapIndex++;
        this.wrappers.splice(this.wrapIndex, 0, next);
    }
    get interval() {
        if (!this.wrappers.length)
            return new FixedInterval(0, 0);
        return FixedInterval.fromPositions(this.wrappers[0].box.rowOffset, ListUtils.last(this.wrappers).box.getEndPosition());
    }
}
BoxWrapsHolder.AVERAGE_BOXES_ON_PAGE = 2000;
BoxWrapsHolder.MAX_BOXES_IN_LIST_MULTIPLIER = 3;
BoxWrapsHolder.MAX_BOXES_IN_LIST = BoxWrapsHolder.AVERAGE_BOXES_ON_PAGE * BoxWrapsHolder.MAX_BOXES_IN_LIST_MULTIPLIER;
