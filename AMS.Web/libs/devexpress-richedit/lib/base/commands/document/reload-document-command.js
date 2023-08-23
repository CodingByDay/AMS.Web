import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
export class ReloadDocumentCommand extends CommandBase {
    getState() {
        return new SimpleCommandState(this.isEnabled());
    }
    executeCore(_state) {
        this.control.closeDocument();
        this.control.serverDispatcher.pushRequest(new LoadCommandRequest(CommandType.ReloadDocument, -1, {}), new RequestParams(false, true, true));
        return true;
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
}
