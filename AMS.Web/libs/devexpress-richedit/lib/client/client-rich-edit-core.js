import { on as dxOn } from 'devextreme/events';
import { RichEditCore } from '../base/rich-edit-core';
import { ClientModelManager } from '../core/model-manager';
import { ClientCommandManager } from './commands/client-command-manager';
import { ClientShortcutManager } from './commands/shortcut-manager';
import { ClientLoadingPanelManager } from './loading-panel/manager';
import { FieldClientRequestManager, FieldClientRequestManagerOptions } from './model/fields/field-client-request-manager';
import { ClientFontChangesListener } from './model/font-changes-listener';
export class ClientRichEditCore extends RichEditCore {
    beforeInitialization(options) {
        this._nonce = options.nonce;
    }
    registerActiveContextTabManager() {
        this.selection.onChanged.add(this.owner.activeContextTabManager);
    }
    createCommandManager() {
        return new ClientCommandManager(this, this._nonce);
    }
    createShortcutManager() {
        return new ClientShortcutManager(this.commandManager, this);
    }
    createFieldRequestManager() {
        const rich = (this.owner);
        const options = new FieldClientRequestManagerOptions(rich.dataSource, rich.useAsyncVersionOfCalculateDocvariable.bind(rich), args => rich.raiseCalculateDocumentVariable(args), args => rich.raiseCalculateDocumentVariableAsync(args));
        return new FieldClientRequestManager(options);
    }
    createLoadingPanelManager() {
        return new ClientLoadingPanelManager(this.viewManager.canvas);
    }
    registerFontChangesListeners() {
        this.modelManager.modelManipulator.onFontsChanged.add(new ClientFontChangesListener(this.owner));
    }
    isClientMode() { return true; }
    createModelManager(richOptions) {
        return new ClientModelManager(null, richOptions, this);
    }
    dispose() {
        super.dispose();
    }
    createViewElement(id, element) {
        const elements = super.createViewElement(id, element);
        dxOn(elements, 'dxmousewheel', (e) => e.stopPropagation());
        return elements;
    }
}
