import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { JSONForceSyncWithServerCommand } from '../../../core/model/json/enums/json-general-enums';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
export class ForceSyncWithServerCommand extends CommandBase {
    getState() {
        return new SimpleCommandState(super.isEnabled());
    }
    canModify() {
        return true;
    }
    executeCore(_state, options) {
        this.control.commandManager.forceSyncWithServerCallbackManager.addCallback(this.control, options.param);
        return true;
    }
}
export class ForceSyncWithServerCallbackManager {
    constructor() {
        this.reset();
    }
    reset() {
        this.map = {};
    }
    addCallback(control, callback) {
        const id = ForceSyncWithServerCallbackManager.id++;
        const request = new LoadCommandRequest(CommandType.ForceSyncWithServer, control.modelManager.model.mainSubDocument.id, { [JSONForceSyncWithServerCommand.Id]: id });
        control.serverDispatcher.pushRequest(request, new RequestParams(false, true, false));
        this.map[id] = callback;
    }
    handleResponce(responce) {
        const id = responce[JSONForceSyncWithServerCommand.Id];
        const callback = this.map[id];
        if (callback) {
            delete this.map[id];
            callback();
        }
    }
}
ForceSyncWithServerCallbackManager.id = 0;
