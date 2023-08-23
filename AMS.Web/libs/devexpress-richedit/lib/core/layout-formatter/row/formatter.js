import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Errors } from '@devexpress/utils/lib/errors';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { LayoutBox, LayoutBoxType } from '../../layout/main-structures/layout-boxes/layout-box';
import { LayoutRowStateFlags } from '../../layout/main-structures/layout-row';
import { SubDocumentNumberingListCountersManager } from '../../model/numbering-lists/piece-table-numbering-list-counters-manager';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogObjToStr } from '../../rich-utils/debug/logger/base-logger/log-obj-to-str';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
import { BoxIterator } from '../box/box-iterator';
import { BoxWrap } from '../box/box-wrap';
import { RowFormatterResult, RowFormatterResultFlag } from './result';
import { RowSizesManager } from './size-engine/row-sizes-manager';
import { RowBaseFormatterState, RowEndedWithPageBreakState, RowEndedWithParagraphMarkFormatterState } from './states';
import { RowTabInfo } from './tab-info';
import { WordHolderInfo } from './word-holder';
export var TextRowFormatterState;
(function (TextRowFormatterState) {
    TextRowFormatterState[TextRowFormatterState["None"] = 0] = "None";
    TextRowFormatterState[TextRowFormatterState["Base"] = 1] = "Base";
    TextRowFormatterState[TextRowFormatterState["EndedWithPageBreak"] = 2] = "EndedWithPageBreak";
    TextRowFormatterState[TextRowFormatterState["EndedWithParagraphMark"] = 3] = "EndedWithParagraphMark";
})(TextRowFormatterState || (TextRowFormatterState = {}));
export class RowFormatter {
    constructor(formatterManager, subDocumentId) {
        this.rowFormatting = true;
        this.manager = formatterManager;
        this.iterator = new BoxIterator(this.manager, subDocumentId);
        this.numberingListCountersManager = new SubDocumentNumberingListCountersManager(this.subDocument);
        this.stateMap = {};
        this.stateMap[TextRowFormatterState.Base] = new RowBaseFormatterState(this);
        this.stateMap[TextRowFormatterState.EndedWithPageBreak] = new RowEndedWithPageBreakState(this);
        this.stateMap[TextRowFormatterState.EndedWithParagraphMark] = new RowEndedWithParagraphMarkFormatterState(this);
        if (RowFormatter.addBoxFunctionMap)
            return;
        RowFormatter.addBoxFunctionMap = {};
        RowFormatter.addBoxFunctionMap[LayoutBoxType.Space] = function () { this.currentState.addSpaceBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.NonBreakingSpace] = function () { this.currentState.addTextBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.Dash] = function () { this.currentState.addDashBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.Text] = function () { this.currentState.addTextBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.Picture] = function () { this.currentState.addPictureBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.ParagraphMark] = function () { this.currentState.addParagraphBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.LineBreak] = function () { this.currentState.addLineBreakBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.SectionMark] = function () { this.currentState.addSectionBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.PageBreak] = function () { this.currentState.addPageBreakBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.ColumnBreak] = function () { this.currentState.addColumnBreakBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.TabSpace] = function () { this.currentState.addTabulationBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.FieldCodeStart] = function () { this.currentState.addTextBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.FieldCodeEnd] = function () { this.currentState.addTextBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.LayoutDependent] = function () { this.currentState.addTextBox(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.AnchorTextBox] = function () { this.currentState.addAnchorObject(); };
        RowFormatter.addBoxFunctionMap[LayoutBoxType.AnchorPicture] = function () { this.currentState.addAnchorObject(); };
    }
    get subDocument() { return this.iterator.subDocument; }
    ;
    get row() { return this.result.row; }
    get paragraph() { return this.subDocument.paragraphs[this.result.paragraphIndex]; }
    get paragraphProps() { return this.paragraph.getParagraphMergedProperties(); }
    getNextBoxWrapInfo() { return this.iterator.getWrap(false); }
    setPosition(position, forceResetBoxInfos, checkStartTable) { this.iterator.setPosition(position, forceResetBoxInfos, checkStartTable); }
    getPosition() { return this.iterator.getPosition(); }
    documentStart() { this.iterator.documentStart(); }
    formatRow(minY, paragraphHorizontalBounds, rowSpacingBeforeApplier) {
        this.paragraphHorizontalBounds = paragraphHorizontalBounds;
        this.initResult(minY);
        Log.print(LogSource.RowFormatter, "formatRow", `paragraphHorizontalBounds: ${LogObjToStr.fixedInterval(paragraphHorizontalBounds)}, firstBoxOffset: ${this.currBox.rowOffset}`);
        const prevRow = this.manager.activeFormatter.lastRowInfo.row;
        const isFirstRowInParagraph = !prevRow || prevRow.flags.get(LayoutRowStateFlags.ParagraphEnd) ||
            this.manager.activeFormatter.lastRowInfo.paragraphIndex != this.currWrapInfo.paragraphIndex;
        const rowParagraphLeftIndent = isFirstRowInParagraph ?
            UnitConverter.twipsToPixelsF(this.paragraphProps.getLeftIndentForFirstRow()) :
            UnitConverter.twipsToPixelsF(this.paragraphProps.getLeftIndentForOtherRow());
        const rowContentHorizontalBounds = FixedInterval.fromPositions(paragraphHorizontalBounds.start + rowParagraphLeftIndent, paragraphHorizontalBounds.end - UnitConverter.twipsToPixelsF(this.paragraphProps.rightIndent));
        this.rowSizesManager = new RowSizesManager(this, rowContentHorizontalBounds, minY, rowSpacingBeforeApplier, this.manager.activeFormatter.layoutRowBoundsCalculator.getRectangleBounds(this.manager), isFirstRowInParagraph);
        this.tabInfo = new RowTabInfo(this, paragraphHorizontalBounds.start);
        this.wordHolder = new WordHolderInfo(this);
        this.rowFormatting = true;
        let cycleCounter = 0;
        while (this.rowFormatting) {
            this.setState(TextRowFormatterState.Base);
            this.innerFormatRow();
            if (++cycleCounter > 10000)
                throw new Error(Errors.InternalException);
        }
    }
    innerFormatRow() {
        while (this.rowFormatting && this.currBox) {
            const oldWrapTablPos = this.currWrapInfo.tablePosition;
            RowFormatter.addBoxFunctionMap[this.currBox.getType()].call(this);
            if (this.currWrapInfo) {
                if (!oldWrapTablPos && this.currWrapInfo.tablePosition) {
                    this.finishRow();
                    break;
                }
                if (oldWrapTablPos && (!this.currWrapInfo.tablePosition || !this.currWrapInfo.equalsTablePositions(oldWrapTablPos))) {
                    this.wordHolder.pushBoxes();
                    this.row.flags.set(LayoutRowStateFlags.CellTableEnd, true);
                    this.finishRow();
                    break;
                }
            }
            else {
                if (oldWrapTablPos)
                    this.row.flags.set(LayoutRowStateFlags.CellTableEnd, true);
            }
        }
        if (!this.currBox) {
            if (!this.iterator.allBoxesGiven()) {
                this.iterator.setPosition(this.startPos, false, false);
                this.result.flags.set(RowFormatterResultFlag.NotEnoughChunks, true);
                this.rowFormatting = false;
                return;
            }
            this.row.flags.set(LayoutRowStateFlags.DocumentEnd, true);
        }
        this.rowFormatting = !this.rowSizesManager.finishRow();
    }
    finishRow() {
        if (!this.result.row.boxes.length && !this.result.newAnchoredObjects.length)
            throw new Error(Errors.InternalException);
        this.rowFormatting = false;
    }
    setState(state) {
        this.currentState = this.stateMap[state];
    }
    addAnchorObject() {
        const ancBox = this.currBox;
        this.setBoxInfo(true);
        if (this.manager.activeFormatter.layoutPosition.page.anchoredObjectHolder.isObjectExist(ancBox))
            return;
        if (ancBox.getType() == LayoutBoxType.AnchorTextBox) {
            const calculator = this.manager.anchoredObjectsManager.textBoxContextSizeCalculators[ancBox.objectId];
            calculator.calculateSize(this.manager.boundsCalculator);
            ancBox.setContentSize(calculator.layoutSize);
        }
        this.result.newAnchoredObjects.push(ancBox);
    }
    initResult(minY) {
        this.result = new RowFormatterResult(this, minY);
        this.setBoxInfo(false);
        if (this.currBox)
            this.startPos = this.currBox.rowOffset;
        this.result.paragraphIndex = this.currWrapInfo.paragraphIndex;
        this.result.sectionIndex = this.currWrapInfo.sectionIndex;
    }
    setBoxInfo(getNextWrap) {
        let wrap = this.iterator.getWrap(getNextWrap);
        if (!wrap) {
            this.currBox = null;
            this.currWrapInfo = null;
            return;
        }
        this.currBox = wrap.box.getType() == LayoutBoxType.TabSpace ? wrap.box : wrap.box.clone();
        this.currWrapInfo = wrap.info;
        if (this.currBox.getType() == LayoutBoxType.LayoutDependent) {
            this.currBox.calculateText(this.manager);
            LayoutBox.initializeWithMeasurer([new BoxWrap(this.currBox, null)], this.manager.measurer, false);
        }
    }
}
