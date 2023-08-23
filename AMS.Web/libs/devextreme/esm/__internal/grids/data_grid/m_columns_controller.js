/**
 * DevExtreme (esm/__internal/grids/data_grid/m_columns_controller.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import {
    columnsControllerModule
} from "../../grids/grid_core/columns_controller/m_columns_controller";
import gridCore from "./m_core";
gridCore.registerModule("columns", {
    defaultOptions: () => extend(true, {}, columnsControllerModule.defaultOptions(), {
        commonColumnSettings: {
            allowExporting: true
        }
    }),
    controllers: columnsControllerModule.controllers
});
