import { ControlOptions } from '../../../core/model/options/control';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
import { DownloadRequestType } from './print-document-command';
export class DownloadDocumentCommand extends CommandBase {
    getState() {
        return new SimpleCommandState(this.isEnabled());
    }
    executeCore(_state, options) {
        this.control.serverDispatcher.forceSendingRequest();
        this.control.owner.sendDownloadRequest(DownloadRequestType.DownloadCurrentDocument, JSON.stringify({
            "fileName": options.param.fileName,
            "documentFormat": options.param.documentFormat
        }));
        return true;
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.download) &&
            this.control.modelManager.model.isLoaded();
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
}
