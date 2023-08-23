/**
 * DevExtreme (bundles/__internal/grids/grid_core/row_dragging/dom.js)
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
exports.GridCoreRowDraggingDom = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var createHandleTemplateFunc = function(addWidgetPrefix) {
    return function(container, options) {
        var $container = (0, _renderer.default)(container);
        $container.attr(_const.ATTRIBUTES.dragCell, "");
        if ("data" === options.rowType) {
            $container.addClass(_const.CLASSES.cellFocusDisabled);
            return (0, _renderer.default)("<span>").addClass(addWidgetPrefix(_const.CLASSES.handleIcon))
        }
        _m_utils.default.setEmptyText($container);
        return
    }
};
var GridCoreRowDraggingDom = {
    createHandleTemplateFunc: createHandleTemplateFunc
};
exports.GridCoreRowDraggingDom = GridCoreRowDraggingDom;
