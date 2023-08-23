/**
 * DevExtreme (cjs/__internal/grids/data_grid/m_data_controller.js)
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
exports.DataController = void 0;
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_data_controller = require("../../grids/grid_core/data_controller/m_data_controller");
var _m_core = _interopRequireDefault(require("./m_core"));
var _m_data_source_adapter = _interopRequireDefault(require("./m_data_source_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var _a, _b;
var DataController = null === (_b = null === (_a = _m_data_controller.dataControllerModule.controllers) || void 0 === _a ? void 0 : _a.data) || void 0 === _b ? void 0 : _b.inherit({
    _getDataSourceAdapter: function() {
        return _m_data_source_adapter.default
    },
    _getSpecificDataSourceOption: function() {
        var dataSource = this.option("dataSource");
        if (dataSource && !Array.isArray(dataSource) && this.option("keyExpr")) {
            _ui.default.log("W1011")
        }
        return this.callBase()
    }
});
exports.DataController = DataController;
_m_core.default.registerModule("data", {
    defaultOptions: _m_data_controller.dataControllerModule.defaultOptions,
    controllers: {
        data: DataController
    }
});
