/**
 * DevExtreme (cjs/__internal/grids/tree_list/m_columns_controller.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColumnsController = void 0;
var _type = require("../../../core/utils/type");
var _m_columns_controller = require("../../grids/grid_core/columns_controller/m_columns_controller");
var _m_core = _interopRequireDefault(require("./m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var ColumnsController = _m_columns_controller.columnsControllerModule.controllers.columns.inherit({
    _getFirstItems: function(dataSourceAdapter) {
        return this.callBase(dataSourceAdapter).map((function(node) {
            return node.data
        }))
    },
    getFirstDataColumnIndex: function() {
        var visibleColumns = this.getVisibleColumns();
        var visibleColumnsLength = visibleColumns.length;
        var firstDataColumnIndex = 0;
        for (var i = 0; i <= visibleColumnsLength - 1; i++) {
            if (!(0, _type.isDefined)(visibleColumns[i].command)) {
                firstDataColumnIndex = visibleColumns[i].index;
                break
            }
        }
        return firstDataColumnIndex
    }
});
exports.ColumnsController = ColumnsController;
_m_core.default.registerModule("columns", {
    defaultOptions: _m_columns_controller.columnsControllerModule.defaultOptions,
    controllers: {
        columns: ColumnsController
    }
});
