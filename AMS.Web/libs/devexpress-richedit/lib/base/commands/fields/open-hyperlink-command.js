import { ChangeFieldHyperlinkInfoHistoryItem } from '../../../core/model/history/items/change-field-hyperlink-info-history-item';
import { Url } from '@devexpress/utils/lib/utils/url';
import { ReadOnlyMode } from '../../interfaces/i-rich-edit-core';
import { RichEditClientCommand } from '../client-command';
import { CommandSimpleOptions } from '../command-base';
import { HyperlinkCommandBase } from './hyperlink-command-base';
export class OpenHyperlinkCommand extends HyperlinkCommandBase {
    executeCore(state, options) {
        let field;
        if (options.param)
            field = options.param;
        else {
            if (!state.visible)
                return false;
            field = state.value;
        }
        var hyperlinkInfo = field.getHyperlinkInfo();
        const fieldIsEditable = this.selection.activeSubDocument.isEditable([field.getAllFieldInterval()]);
        if (!hyperlinkInfo.visited && this.control.readOnly != ReadOnlyMode.Persistent && fieldIsEditable) {
            var newHyperlinkInfo = hyperlinkInfo.clone();
            newHyperlinkInfo.visited = true;
            this.history.beginTransaction();
            this.history.addAndRedo(new ChangeFieldHyperlinkInfoHistoryItem(this.modelManipulator, this.selection.activeSubDocument, field.index, newHyperlinkInfo));
            this.history.endTransaction();
            this.control.serverDispatcher.forceSendingRequest();
        }
        if (hyperlinkInfo.anchor)
            this.control.commandManager.getCommand(RichEditClientCommand.GoToBookmark)
                .execute(this.control.commandManager.isPublicApiCall, new CommandSimpleOptions(this.control, hyperlinkInfo.anchor));
        else if (!(Url.containsClientScript(hyperlinkInfo.uri) || /^\s*data\s*\:\s*/gi.test(hyperlinkInfo.uri)))
            Url.navigate(hyperlinkInfo.uri, "_blank");
        return true;
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
}
