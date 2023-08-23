import { LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { ControlOptions, DocumentCapability } from '../../../core/model/options/control';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
export class NewDocumentCommand extends CommandBase {
    getState() {
        var state = new SimpleCommandState(this.isEnabled());
        state.visible = this.control.modelManager.richOptions.control.createNew !== DocumentCapability.Hidden;
        return state;
    }
    executeCore(_state) {
        if (this.control.getModifiedState() && !this.control.owner.confirmOnLosingChanges())
            return false;
        this.control.closeDocument();
        this.control.serverDispatcher.pushRequest(new LoadCommandRequest(CommandType.NewDocument, -1, {}), new RequestParams(true, true, true));
        return true;
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.createNew) &&
            this.control.modelManager.model.isLoaded();
    }
    isEnabledInClosedDocument() {
        return true;
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
}
