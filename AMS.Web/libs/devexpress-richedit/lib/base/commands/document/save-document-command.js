import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { IsModified, JSONInitSessionProperty } from '../../../core/model/json/enums/json-top-level-enums';
import { ControlOptions, DocumentCapability } from '../../../core/model/options/control';
import { RichEditClientCommand } from '../client-command';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
export class SaveDocumentCommand extends CommandBase {
    getState() {
        var state = new SimpleCommandState(this.isEnabled());
        state.visible = this.control.modelManager.richOptions.control.save !== DocumentCapability.Hidden;
        return state;
    }
    executeCore() {
        if (this.needShowSaveAsDialog())
            return this.executeSaveAsCommand();
        const params = {};
        params[JSONInitSessionProperty.HistoryId] = this.history.getCurrentItemId();
        this.control.serverDispatcher.pushRequest(new LoadCommandRequest(CommandType.SaveDocument, -1, params), new RequestParams(false, true, true));
        return true;
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.save) &&
            (this.control.getModifiedState() === IsModified.True || !this.control.documentInfo.documentHasSource) &&
            this.control.modelManager.model.isLoaded();
    }
    needShowSaveAsDialog() {
        const documentInfo = this.control.documentInfo;
        return this.control.owner.hasWorkDirectory && !documentInfo.fileName && !documentInfo.documentHasSource &&
            ControlOptions.isEnabled(this.control.modelManager.richOptions.control.saveAs);
    }
    executeSaveAsCommand() {
        return this.control.commandManager.getCommand(RichEditClientCommand.FileSaveAs).execute(this.control.commandManager.isPublicApiCall);
    }
    canModify() {
        return true;
    }
}
