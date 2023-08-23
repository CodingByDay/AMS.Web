/**
 * DevExtreme (esm/__internal/grids/data_grid/m_data_controller.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var _a, _b;
import errors from "../../../ui/widget/ui.errors";
import {
    dataControllerModule
} from "../../grids/grid_core/data_controller/m_data_controller";
import gridCore from "./m_core";
import dataSourceAdapterProvider from "./m_data_source_adapter";
export var DataController = null === (_b = null === (_a = dataControllerModule.controllers) || void 0 === _a ? void 0 : _a.data) || void 0 === _b ? void 0 : _b.inherit({
    _getDataSourceAdapter: () => dataSourceAdapterProvider,
    _getSpecificDataSourceOption() {
        var dataSource = this.option("dataSource");
        if (dataSource && !Array.isArray(dataSource) && this.option("keyExpr")) {
            errors.log("W1011")
        }
        return this.callBase()
    }
});
gridCore.registerModule("data", {
    defaultOptions: dataControllerModule.defaultOptions,
    controllers: {
        data: DataController
    }
});
