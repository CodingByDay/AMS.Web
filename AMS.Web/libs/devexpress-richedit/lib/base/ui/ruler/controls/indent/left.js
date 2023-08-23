import { MinMaxNumber } from '@devexpress/utils/lib/class/min-max';
import { DocumentRenderer } from '../../../../canvas/renderes/common/document-renderer';
import { RichEditClientCommand } from '../../../../commands/client-command';
import { RulerParagraphLeftIndentsCommandValue } from '../../../../commands/ruler/ruler-paragraph-indents-command';
import { RICH_EDIT_CLASS_NAME_PREFIX, RULLER_NUMBER_CORRECTION } from '../../settings';
import { RulerModelState } from '../base';
import { RulerTemplateManager } from '../template-manager';
import { RulerBaseIndentControl, RulerMinDistanceBetweenIndents } from './base';
const LEFT_INDENT_DRAG_HANDLE_BODY = RICH_EDIT_CLASS_NAME_PREFIX + "leftIndentDragHandleBody";
export class RulerLeftIndentDragHandle extends RulerBaseIndentControl {
    constructor(modelData, controls) {
        super(modelData, controls);
        this.isActionLeftIndent = false;
        this.topElement = DocumentRenderer.renderContainer(this.modelData.settings.styles.leftIndentImage.spriteCssClass);
        this.bodyElement = DocumentRenderer.renderContainer(LEFT_INDENT_DRAG_HANDLE_BODY);
        const topElementTemplate = RulerTemplateManager.getLeftIndentTopElementTemplate();
        if (topElementTemplate)
            this.topElement.innerHTML = topElementTemplate;
        const bodyElementTemplate = RulerTemplateManager.getLeftIndentBodyElementTemplate();
        if (bodyElementTemplate)
            this.bodyElement.innerHTML = bodyElementTemplate;
        this.rootElement.appendChild(this.topElement);
        this.rootElement.appendChild(this.bodyElement);
        this.controls.ruler.rootElement.appendChild(this.rootElement);
        this.adjustByTop();
        const mainElementWidth = this.topElement.offsetWidth;
        this.bodyElement.style.width = mainElementWidth + "px";
        const style = this.rootElement.style;
        style.height = this.topElement.offsetHeight + this.bodyElement.offsetHeight + "px";
        style.width = mainElementWidth + "px";
        style.marginTop = this.controls.divisions.height / 2 + "px";
        this.bodyElement.title = this.modelData.settings.titles.leftIndent;
        this.topElement.title = this.modelData.settings.titles.hangingIndent;
        this.leftCorrection = Math.round(this.rootElement.offsetWidth / 2);
        this._heightOfProtrudingPart = this.rootElement.offsetHeight - this.controls.divisions.height / 2;
    }
    get heightOfProtrudingPart() { return this.modelData.settings.showLeftIndent ? this._heightOfProtrudingPart : 0; }
    getRootClassName() { return this.modelData.settings.styles.leftIndent.className; }
    adjustByTop() {
        const mainElementHeight = this.rootElement.offsetHeight;
        const divisionsControlHeight = this.controls.divisions.height;
        this.rootElement.style.marginTop = (mainElementHeight - divisionsControlHeight) / 2 + "px";
    }
    getModelState() {
        const state = this.modelData.commandManager.getCommand(RichEditClientCommand.RulerParagraphLeftIndents).getState();
        return new RulerModelState(state.value.hanging, state.enabled);
    }
    updateView() {
        const newViewState = this.controls.paragraphLeftPosition + this.currModelState.modelValue;
        if (newViewState != this.viewState) {
            this.viewState = newViewState;
            if (this.modelData.settings.showLeftIndent)
                this.rootElement.style.left = this.viewState + RULLER_NUMBER_CORRECTION - this.leftCorrection + "px";
            else
                this.setVisible(false);
        }
    }
    canHandle(source) {
        if (this.bodyElement == source) {
            this.isActionLeftIndent = true;
            return true;
        }
        else if (this.topElement == source) {
            this.isActionLeftIndent = false;
            return true;
        }
        return false;
    }
    onMouseUp() {
        const commandValue = new RulerParagraphLeftIndentsCommandValue(null, this.currModelState.modelValue, this.controls.firstLineIndent.currModelState.modelValue);
        commandValue.setIntervalsInfo(this.modelData.selection.intervalsInfo);
        this.modelData.commandManager.getCommand(RichEditClientCommand.RulerParagraphLeftIndents)
            .execute(this.modelData.commandManager.isPublicApiCall, commandValue);
        this.finishHandle();
    }
    onEscPress() {
        super.onEscPress();
        this.controls.firstLineIndent.currModelState = this.controls.firstLineIndent.prevModelState.clone();
    }
    calculateNewModelState(distance) {
        const parLeftPos = this.controls.paragraphLeftPosition;
        if (this.isActionLeftIndent) {
            const minPrevValue = Math.min(this.prevModelState.modelValue, this.controls.firstLineIndent.prevModelState.modelValue);
            const maxPrevValue = Math.max(this.prevModelState.modelValue, this.controls.firstLineIndent.prevModelState.modelValue);
            const diff = maxPrevValue - minPrevValue;
            const newModelValue = this.controls.chooseClosestAnchorPosition(parLeftPos + minPrevValue + distance, [parLeftPos + minPrevValue], new MinMaxNumber(0, Math.max(0, this.controls.rightIndent.viewStateRelativeLeft - diff - RulerMinDistanceBetweenIndents))) -
                parLeftPos;
            if (this.prevModelState.modelValue < this.controls.firstLineIndent.prevModelState.modelValue) {
                this.currModelState.modelValue = newModelValue;
                this.controls.firstLineIndent.currModelState.modelValue = newModelValue + diff;
            }
            else {
                this.currModelState.modelValue = newModelValue + diff;
                this.controls.firstLineIndent.currModelState.modelValue = newModelValue;
            }
        }
        else {
            this.currModelState.modelValue = this.controls.chooseClosestAnchorPosition(parLeftPos + this.prevModelState.modelValue + distance, [parLeftPos + this.prevModelState.modelValue], new MinMaxNumber(0, Math.max(0, this.controls.rightIndent.viewStateRelativeLeft - RulerMinDistanceBetweenIndents))) - parLeftPos;
        }
    }
}
