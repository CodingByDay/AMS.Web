import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { JSONGetRtfCommand } from '../../../core/model/json/enums/json-top-level-enums';
import { SelectionIntervalsInfo } from '../../../core/selection/selection-intervals-info';
import { CommandBase, CommandOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
export class GetRtfCommandOptions extends CommandOptions {
    constructor(interval, callback, subDocument) {
        super(null);
        this.interval = interval;
        this.callback = callback;
        if (!this.intervalsInfo)
            this.intervalsInfo = SelectionIntervalsInfo.fromInterval(subDocument, interval);
    }
}
export class GetRtfCommand extends CommandBase {
    getState() {
        return new SimpleCommandState(this.isEnabled());
    }
    executeCore(_state, options) {
        const reqParams = {};
        reqParams[JSONGetRtfCommand.Position] = options.interval.start;
        reqParams[JSONGetRtfCommand.Length] = options.interval.length;
        reqParams[JSONGetRtfCommand.SubDocumentId] = options.subDocument.id;
        const request = new LoadCommandRequest(CommandType.GetRtf, options.subDocument.id, reqParams);
        this.control.serverDispatcher.pushRequest(request, new RequestParams(false, true, true));
        this.control.commandManager.rtfCommandsOptions[request.id] = options;
        return true;
    }
    handleResponce(responce) {
        const id = responce[JSONGetRtfCommand.Id];
        const options = this.control.commandManager.rtfCommandsOptions[id];
        delete this.control.commandManager.rtfCommandsOptions[id];
        options.callback(responce[JSONGetRtfCommand.ResultRtf]);
    }
}
