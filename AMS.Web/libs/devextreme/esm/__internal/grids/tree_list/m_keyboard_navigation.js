/**
 * DevExtreme (esm/__internal/grids/tree_list/m_keyboard_navigation.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import {
    keyboardNavigationModule
} from "../../grids/grid_core/keyboard_navigation/m_keyboard_navigation";
import core from "./m_core";
core.registerModule("keyboardNavigation", extend(true, {}, keyboardNavigationModule, {
    extenders: {
        controllers: {
            keyboardNavigation: {
                _leftRightKeysHandler(eventArgs, isEditing) {
                    var rowIndex = this.getVisibleRowIndex();
                    var dataController = this._dataController;
                    if (eventArgs.ctrl) {
                        var directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
                        var key = dataController.getKeyByRowIndex(rowIndex);
                        if ("nextInRow" === directionCode) {
                            dataController.expandRow(key)
                        } else {
                            dataController.collapseRow(key)
                        }
                    } else {
                        return this.callBase.apply(this, arguments)
                    }
                }
            }
        }
    }
}));
