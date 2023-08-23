import { UpdateFieldsOptions } from '../../../core/model/fields/tree-creator';
import { EditCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { ControlOptions, DocumentCapability } from '../../../core/model/options/control';
import { PrintMode } from '../../../core/model/options/printing';
import { SubDocumentIntervals } from '../../../core/model/sub-document';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { RichEditClientCommand } from '../client-command';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
import { UpdateFieldCommandBase } from '../fields/update-field-command-base';
export class PrintDocumentCommand extends CommandBase {
    getState() {
        var state = new SimpleCommandState(this.isEnabled());
        state.visible = this.control.modelManager.richOptions.control.printing !== DocumentCapability.Hidden;
        return state;
    }
    executeCore(_state) {
        if (this.control.modelManager.richOptions.printing.mode !== PrintMode.ServerPdf)
            return this.control.commandManager.getCommand(RichEditClientCommand.PrintDocumentOnClient).execute(this.control.commandManager.isPublicApiCall);
        const updateAllFieldsCommand = this.control.commandManager.getCommand(RichEditClientCommand.UpdateAllFields);
        if (this.control.modelManager.richOptions.fields.updateFieldsBeforePrint && updateAllFieldsCommand.getState().enabled) {
            const subDocsInfo = NumberMapUtils.toListBy(this.modelManipulator.model.subDocuments, (sd) => new SubDocumentIntervals(sd, [sd.interval]));
            return UpdateFieldCommandBase.updateFields(this, subDocsInfo, () => this.sendPrintRequest(), new UpdateFieldsOptions(false, false));
        }
        else
            this.sendPrintRequest();
        return true;
    }
    sendPrintRequest() {
        if (this.control.serverDispatcher.hasQueue()) {
            this.control.serverDispatcher.pushRequest(new EditCommandRequest(CommandType.DelayedPrint, -1, {}), new RequestParams(false, true, false));
        }
        else
            this.control.owner.sendDownloadRequest(DownloadRequestType.PrintCurrentDocument);
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.printing) &&
            this.control.modelManager.model.isLoaded();
    }
}
export var DownloadRequestType;
(function (DownloadRequestType) {
    DownloadRequestType[DownloadRequestType["PrintCurrentDocument"] = 0] = "PrintCurrentDocument";
    DownloadRequestType[DownloadRequestType["DownloadCurrentDocument"] = 1] = "DownloadCurrentDocument";
})(DownloadRequestType || (DownloadRequestType = {}));
