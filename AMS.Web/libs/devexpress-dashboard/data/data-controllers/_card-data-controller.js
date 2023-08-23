/**
* DevExpress Dashboard (_card-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardDataController = void 0;
const _kpi_data_controller_1 = require("./_kpi-data-controller");
class cardDataController extends _kpi_data_controller_1.kpiDataController {
    constructor(options) {
        super(options);
    }
    _iterateKpiItems(delegate) {
        var that = this;
        if (that.viewModel) {
            that.viewModel.Cards.forEach(delegate);
        }
    }
}
exports.cardDataController = cardDataController;
