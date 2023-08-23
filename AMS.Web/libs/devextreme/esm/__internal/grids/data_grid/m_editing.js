/**
 * DevExtreme (esm/__internal/grids/data_grid/m_editing.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import "./module_not_extended/editor_factory";
import {
    extend
} from "../../../core/utils/extend";
import {
    editingModule
} from "../../grids/grid_core/editing/m_editing";
import gridCore from "./m_core";
gridCore.registerModule("editing", extend(true, {}, editingModule, {
    extenders: {
        controllers: {
            data: {
                _changeRowExpandCore(key) {
                    var editingController = this._editingController;
                    if (Array.isArray(key)) {
                        editingController && editingController.refresh()
                    }
                    return this.callBase.apply(this, arguments)
                }
            }
        }
    }
}));
