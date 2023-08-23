/**
 * DevExtreme (esm/__internal/grids/data_grid/m_utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    normalizeSortingInfo
} from "../../../data/utils";
import gridCoreUtils from "../../grids/grid_core/m_utils";
export function createGroupFilter(path, storeLoadOptions) {
    var groups = normalizeSortingInfo(storeLoadOptions.group);
    var filter = [];
    for (var i = 0; i < path.length; i++) {
        filter.push([groups[i].selector, "=", path[i]])
    }
    if (storeLoadOptions.filter) {
        filter.push(storeLoadOptions.filter)
    }
    return gridCoreUtils.combineFilters(filter)
}
