/**
 * DevExtreme (esm/__internal/grids/tree_list/m_grid_view.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    gridViewModule
} from "../../grids/grid_core/views/m_grid_view";
import treeListCore from "./m_core";
var GridView = gridViewModule.views.gridView.inherit({
    _getWidgetAriaLabel: () => "dxTreeList-ariaTreeList",
    _getTableRoleName: () => "treegrid"
});
treeListCore.registerModule("gridView", {
    defaultOptions: gridViewModule.defaultOptions,
    controllers: gridViewModule.controllers,
    views: {
        gridView: GridView
    },
    extenders: {
        controllers: {
            resizing: {
                _toggleBestFitMode(isBestFit) {
                    this.callBase(isBestFit);
                    var $rowsTable = this._rowsView.getTableElement();
                    $rowsTable.find(".dx-treelist-cell-expandable").toggleClass(this.addWidgetPrefix("best-fit"), isBestFit)
                }
            }
        }
    }
});
