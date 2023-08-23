/**
 * DevExtreme (bundles/__internal/grids/data_grid/m_data_source_adapter.js)
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
var _m_data_source_adapter = _interopRequireDefault(require("../../grids/grid_core/data_source_adapter/m_data_source_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var dataSourceAdapterType = _m_data_source_adapter.default;
var _default = {
    extend: function(extender) {
        dataSourceAdapterType = dataSourceAdapterType.inherit(extender)
    },
    create: function(component) {
        return new dataSourceAdapterType(component)
    }
};
exports.default = _default;
