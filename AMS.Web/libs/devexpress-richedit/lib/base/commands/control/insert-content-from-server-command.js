import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { JSONInsertContentFromServerCommand } from '../../../core/model/json/enums/json-general-enums';
import { ServerModelInserter } from '../../../core/model/json/importers/server-model-inserter';
import { RichUtils } from '../../../core/model/rich-utils';
import { SelectionIntervalsInfo } from '../../../core/selection/selection-intervals-info';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { isString } from '@devexpress/utils/lib/utils/common';
import { RichEditClientCommand } from '../client-command';
import { CommandBase, CommandSimpleOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
export class InsertContentFromServerCommand extends CommandBase {
    getState() {
        return new SimpleCommandState(super.isEnabled());
    }
    executeCore(_state, options) {
        this.control.commandManager.insertContentFromServerRequestManager.addCallback(this.control, options.param);
        return true;
    }
}
export class InsertContentFromServerCommandOptions {
    constructor(requestId, subDocPos, callback) {
        this.requestId = requestId;
        this.subDocPos = subDocPos;
        this.callback = callback;
    }
}
export class InsertContentFromServerRequestManager {
    constructor() {
        this.reset();
    }
    reset() {
        this.map = {};
    }
    addCallback(control, options) {
        const id = InsertContentFromServerRequestManager.id++;
        const request = new LoadCommandRequest(CommandType.InsertContentFromServer, control.modelManager.model.mainSubDocument.id, {
            [JSONInsertContentFromServerCommand.Id]: id,
            [JSONInsertContentFromServerCommand.UserRequestId]: options.requestId,
        });
        control.serverDispatcher.pushRequest(request, new RequestParams(false, true, true));
        this.map[id] = options;
    }
    handleResponce(control, responce) {
        const id = responce[JSONInsertContentFromServerCommand.Id];
        const data = this.map[id];
        if (data === undefined)
            return;
        delete this.map[id];
        const userModel = responce[JSONInsertContentFromServerCommand.Model];
        if (userModel === undefined) {
            let simpleText = responce[JSONInsertContentFromServerCommand.SimpleText];
            if (isString(simpleText) && simpleText.length != 0) {
                simpleText = simpleText.replace(/\r\n/g, RichUtils.specialCharacters.LineBreak);
                control.commandManager.getCommand(RichEditClientCommand.InsertText)
                    .execute(control.commandManager.isPublicApiCall, new CommandSimpleOptions(control, simpleText)
                    .setIntervalsInfo(SelectionIntervalsInfo.fromPosition(data.subDocPos.subDocument, data.subDocPos.position)));
                data.callback(new FixedInterval(data.subDocPos.position, simpleText.length));
            }
        }
        else {
            const interval = ServerModelInserter.insertDocumentModelFromServer(control.modelManager, userModel, data.subDocPos.position, data.subDocPos.subDocument.id);
            data.callback(interval);
        }
    }
}
InsertContentFromServerRequestManager.id = 0;
