/**
 * DevExtreme (bundles/__internal/grids/tree_list/m_grid_view.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _m_grid_view = require("../../grids/grid_core/views/m_grid_view");
var _m_core = _interopRequireDefault(require("./m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var GridView = _m_grid_view.gridViewModule.views.gridView.inherit({
    _getWidgetAriaLabel: function() {
        return "dxTreeList-ariaTreeList"
    },
    _getTableRoleName: function() {
        return "treegrid"
    }
});
_m_core.default.registerModule("gridView", {
    defaultOptions: _m_grid_view.gridViewModule.defaultOptions,
    controllers: _m_grid_view.gridViewModule.controllers,
    views: {
        gridView: GridView
    },
    extenders: {
        controllers: {
            resizing: {
                _toggleBestFitMode: function(isBestFit) {
                    this.callBase(isBestFit);
                    var $rowsTable = this._rowsView.getTableElement();
                    $rowsTable.find(".dx-treelist-cell-expandable").toggleClass(this.addWidgetPrefix("best-fit"), isBestFit)
                }
            }
        }
    }
});
