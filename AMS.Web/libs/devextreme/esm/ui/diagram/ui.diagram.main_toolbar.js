/**
 * DevExtreme (esm/ui/diagram/ui.diagram.main_toolbar.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import DiagramToolbar from "./ui.diagram.toolbar";
import DiagramCommandsManager from "./diagram.commands_manager";
class DiagramMainToolbar extends DiagramToolbar {
    _getCommands() {
        return DiagramCommandsManager.getMainToolbarCommands(this.option("commands"), this.option("excludeCommands"))
    }
}
export default DiagramMainToolbar;
