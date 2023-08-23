import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { JSONUpdateFieldCommandResult } from '../../../core/model/json/enums/json-field-enums';
import { JSONInsertRtfCommand } from '../../../core/model/json/enums/json-top-level-enums';
import { ServerModelInserter } from '../../../core/model/json/importers/server-model-inserter';
import { SelectionIntervalsInfo } from '../../../core/selection/selection-intervals-info';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { RichEditClientCommand } from '../client-command';
import { CommandBase, CommandOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
export class InsertRtfCommandOptions extends CommandOptions {
    constructor(rtfText, position, subDocument, callback) {
        super(null);
        this.rtfText = rtfText;
        if (!this.intervalsInfo)
            this.intervalsInfo = SelectionIntervalsInfo.fromPosition(subDocument, position);
        this.callback = callback;
    }
    get position() { return this.intervalsInfo.position; }
}
export class InsertRtfCommand extends CommandBase {
    getState() {
        return new SimpleCommandState(this.isEnabled());
    }
    executeCore(_state, options) {
        const reqParams = {};
        reqParams[JSONInsertRtfCommand.RtfText] = options.rtfText;
        const request = new LoadCommandRequest(CommandType.InsertRtf, options.subDocument.id, reqParams);
        this.control.serverDispatcher.pushRequest(request, new RequestParams(false, true, true));
        this.control.commandManager.rtfCommandsOptions[request.id] = options;
        return true;
    }
    handleResponce(response) {
        const id = response[JSONInsertRtfCommand.Id];
        const options = this.control.commandManager.rtfCommandsOptions[response[JSONInsertRtfCommand.Id]];
        const result = response[JSONInsertRtfCommand.Result];
        const isRtfValid = result != null;
        delete this.control.commandManager.rtfCommandsOptions[id];
        if (isRtfValid) {
            this.control.beginUpdate();
            ServerModelInserter.insertDocumentModelFromServer(this.control.modelManager, result, options.position, options.subDocument.id);
            this.control.endUpdate();
            this.control.barHolder.updateItemsState({ [RichEditClientCommand.Undo]: true });
        }
        options.callback(new FixedInterval(options.position, isRtfValid ? result[JSONUpdateFieldCommandResult.DocumentLength] : 0), isRtfValid);
    }
}
