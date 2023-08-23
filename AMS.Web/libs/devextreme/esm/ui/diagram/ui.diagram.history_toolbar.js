/**
 * DevExtreme (esm/ui/diagram/ui.diagram.history_toolbar.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import DiagramToolbar from "./ui.diagram.toolbar";
import DiagramCommandsManager from "./diagram.commands_manager";
class DiagramHistoryToolbar extends DiagramToolbar {
    _getCommands() {
        return DiagramCommandsManager.getHistoryToolbarCommands(this.option("commands"), this._getExcludeCommands())
    }
    _getExcludeCommands() {
        var commands = [].concat(this.option("excludeCommands"));
        if (!this.option("isMobileView")) {
            commands.push(DiagramCommandsManager.SHOW_TOOLBOX_COMMAND_NAME)
        }
        return commands
    }
}
export default DiagramHistoryToolbar;
