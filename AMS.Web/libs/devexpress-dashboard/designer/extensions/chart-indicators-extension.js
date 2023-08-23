/**
* DevExpress Dashboard (chart-indicators-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartIndicatorsExtension = void 0;
const control_options_1 = require("../../common/control-options");
const name = 'chartIndicators';
const nameAlias = 'chart-indicators';
class ChartIndicatorsExtension {
    constructor(dashboardControl, options) {
        this.dashboardControl = dashboardControl;
        this.options = options;
        this.name = name;
    }
    get customChartIndicators() {
        var _a;
        return (_a = this.options) === null || _a === void 0 ? void 0 : _a.customIndicatorTypes;
    }
}
exports.ChartIndicatorsExtension = ChartIndicatorsExtension;
control_options_1.extensionNameMap[nameAlias] = name;
