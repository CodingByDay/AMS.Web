import { FontInfo } from '../../core/model/fonts/font-info';
import { BatchUpdatableObject } from '@devexpress/utils/lib/class/batch-updatable';
import { isDefined } from '@devexpress/utils/lib/utils/common';
import { RichEditClientCommand } from '../commands/client-command';
export class BarBase extends BatchUpdatableObject {
    constructor(owner) {
        super();
        this.updateEnabled = true;
        this.owner = owner;
    }
    get isInitialized() { return !!this.core; }
    initialize(core) {
        this.core = core;
    }
    updateItemsState(queryCommands) {
        if (!this.isInitialized || this.isUpdateLocked() || !this.isVisible())
            return;
        if (queryCommands === undefined) {
            for (const commandKey of this.getCommandKeys())
                this.updateBarItem(commandKey);
            for (const commandKey of this.getContextKeys())
                this.updateContextItem(commandKey);
        }
        else {
            for (const commandKey of this.getCommandKeys()) {
                if (queryCommands[commandKey] !== undefined)
                    this.updateBarItem(commandKey);
            }
            for (const commandKey of this.getContextKeys()) {
                if (queryCommands[commandKey] !== undefined)
                    this.updateContextItem(commandKey);
            }
        }
    }
    updateBarItem(commandKey) {
        const coreCommandId = commandKey;
        const command = this.core.commandManager.getCommand(coreCommandId);
        if (command) {
            const commandState = command.getState();
            this.setItemVisible(coreCommandId, commandState.visible);
            if (commandState.visible) {
                this.setItemEnabled(commandKey, commandState.enabled);
                if (!commandState.denyUpdateValue) {
                    const itemValue = this.getItemValue(commandState);
                    if (commandState.items)
                        this.setItemSubItems(coreCommandId, commandState.items);
                    this.setItemValue(coreCommandId, itemValue);
                }
            }
        }
        else
            this.setItemEnabled(commandKey, this.core.commandManager.commandIsEnabled(commandKey));
    }
    raiseBarCommandExecuted(command, parameter) {
        const commandId = parseInt(command);
        if (!isNaN(commandId) && RichEditClientCommand[commandId] !== undefined) {
            const executeResult = this.core.commandManager.getCommand(commandId)
                .execute(this.core.commandManager.isPublicApiCall, parameter);
            if (!executeResult)
                this.updateItemsState({ [commandId]: true });
        }
        else
            this.owner.raiseCustomCommandExecuted(command, parameter);
        this.owner.Focus();
    }
    isVisible() { return true; }
    setItemSubItems(_key, _subItems) { }
    setItemValue(_key, _value) { }
    getContextKeys() { return []; }
    updateContextItem(_commandKey) { }
    getItemValue(state) {
        if (isDefined(state.checked))
            return state.checked;
        const value = state.value;
        return value instanceof FontInfo ? value.name : value;
    }
}
