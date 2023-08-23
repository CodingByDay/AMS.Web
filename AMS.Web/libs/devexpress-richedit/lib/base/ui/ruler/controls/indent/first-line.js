import { MinMaxNumber } from '@devexpress/utils/lib/class/min-max';
import { RichEditClientCommand } from '../../../../commands/client-command';
import { RulerParagraphLeftIndentsCommandValue } from '../../../../commands/ruler/ruler-paragraph-indents-command';
import { RULLER_NUMBER_CORRECTION } from '../../settings';
import { RulerModelState } from '../base';
import { RulerTemplateManager } from '../template-manager';
import { RulerBaseIndentControl, RulerMinDistanceBetweenIndents } from './base';
export class RulerFirstLineIndentDragHandle extends RulerBaseIndentControl {
    constructor(modelData, controls) {
        super(modelData, controls);
        const template = RulerTemplateManager.getFirstLineIndentElementTemplate();
        if (template)
            this.rootElement.innerHTML = template;
        this.rootElement.title = this.modelData.settings.titles.firstLineIndent;
        this.controls.ruler.rootElement.appendChild(this.rootElement);
        this.adjustByTop();
        this.leftCorrection = Math.round(this.rootElement.offsetWidth / 2);
        this._heightOfProtrudingPart = this.rootElement.offsetHeight - this.controls.divisions.height / 2;
    }
    get heightOfProtrudingPart() { return this.modelData.settings.showLeftIndent ? this._heightOfProtrudingPart : 0; }
    getRootClassName() {
        return this.modelData.settings.styles.firstLineIndentImage.spriteCssClass + " " +
            this.modelData.settings.styles.firstLineIndent.className;
    }
    adjustByTop() {
        const mainElementHeight = this.rootElement.offsetHeight;
        const divisionsControlHeight = this.controls.divisions.height;
        this.rootElement.style.marginTop = (mainElementHeight - divisionsControlHeight) / 2 + "px";
    }
    getModelState() {
        const state = this.modelData.commandManager.getCommand(RichEditClientCommand.RulerParagraphLeftIndents).getState();
        return new RulerModelState(state.value.firstLine, state.enabled);
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
    canHandle(source) { return source == this.rootElement; }
    onMouseUp() {
        const commandValue = new RulerParagraphLeftIndentsCommandValue(null, this.controls.leftIndent.currModelState.modelValue, this.currModelState.modelValue);
        commandValue.setIntervalsInfo(this.modelData.selection.intervalsInfo);
        this.modelData.commandManager.getCommand(RichEditClientCommand.RulerParagraphLeftIndents)
            .execute(this.modelData.commandManager.isPublicApiCall, commandValue);
        this.finishHandle();
    }
    calculateNewModelState(distance) {
        const parLeftPos = this.controls.paragraphLeftPosition;
        this.currModelState.modelValue =
            this.controls.chooseClosestAnchorPosition(parLeftPos + this.prevModelState.modelValue + distance, [parLeftPos + this.prevModelState.modelValue], new MinMaxNumber(0, Math.max(0, this.controls.rightIndent.viewStateRelativeLeft - RulerMinDistanceBetweenIndents))) - parLeftPos;
    }
}
