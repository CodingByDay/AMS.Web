import { FileNameHelper } from '../../../core/formats/file-name-helper';
import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { JSONInitSessionProperty } from '../../../core/model/json/enums/json-top-level-enums';
import { ControlOptions, DocumentCapability } from '../../../core/model/options/control';
import { RichEditClientCommand } from '../client-command';
import { SimpleCommandState } from '../command-states';
import { DialogParametersBase, ShowDialogCommandBase } from './show-dialog-command-base';
export class DialogOpenFileCommand extends ShowDialogCommandBase {
    getState() {
        var state = new SimpleCommandState(this.isEnabled());
        state.visible = this.control.modelManager.richOptions.control.open !== DocumentCapability.Hidden;
        return state;
    }
    createParameters(_options) {
        var parameters = new OpenFileDialogParameters();
        parameters.src = null;
        return parameters;
    }
    executeCore(state) {
        if (this.control.owner.hasWorkDirectory)
            return super.executeCore(state, null);
        else
            return this.executeShowErrorMessageCommand();
    }
    applyParameters(_state, params) {
        if (this.control.getModifiedState() && !this.control.owner.confirmOnLosingChanges())
            return false;
        this.control.closeDocument();
        const reqParams = {};
        reqParams[JSONInitSessionProperty.Src] = new FileNameHelper(params.src, false).getFullPath();
        this.control.serverDispatcher.pushRequest(new LoadCommandRequest(CommandType.OpenDocument, -1, reqParams), new RequestParams(true, true, true));
    }
    getDialogName() {
        return "FileOpen";
    }
    executeShowErrorMessageCommand() {
        return this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorOpeningAndOverstoreImpossibleMessageCommand)
            .execute(this.control.commandManager.isPublicApiCall);
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.open) &&
            this.control.modelManager.model.isLoaded();
    }
}
export class OpenFileDialogParameters extends DialogParametersBase {
    constructor() {
        super(...arguments);
        this.src = null;
    }
    copyFrom(obj) {
        super.copyFrom(obj);
        this.src = obj.src;
    }
    clone() {
        const newInstance = new OpenFileDialogParameters();
        newInstance.copyFrom(this);
        return newInstance;
    }
    applyConverter(_converter) {
        return this;
    }
}
