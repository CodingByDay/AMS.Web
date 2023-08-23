/**
 * DevExtreme (cjs/__internal/grids/tree_list/m_core.js)
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
exports.default = void 0;
var _extend = require("../../../core/utils/extend");
var _m_modules = _interopRequireDefault(require("../../grids/grid_core/m_modules"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var _default = (0, _extend.extend)({}, _m_modules.default, {
    modules: [],
    foreachNodes: function(nodes, callBack, ignoreHasChildren) {
        for (var i = 0; i < nodes.length; i++) {
            if (false !== callBack(nodes[i]) && (ignoreHasChildren || nodes[i].hasChildren) && nodes[i].children.length) {
                this.foreachNodes(nodes[i].children, callBack, ignoreHasChildren)
            }
        }
    }
});
exports.default = _default;
