/**
 * DevExtreme (esm/__internal/grids/tree_list/m_core.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import modules from "../../grids/grid_core/m_modules";
export default extend({}, modules, {
    modules: [],
    foreachNodes(nodes, callBack, ignoreHasChildren) {
        for (var i = 0; i < nodes.length; i++) {
            if (false !== callBack(nodes[i]) && (ignoreHasChildren || nodes[i].hasChildren) && nodes[i].children.length) {
                this.foreachNodes(nodes[i].children, callBack, ignoreHasChildren)
            }
        }
    }
});
