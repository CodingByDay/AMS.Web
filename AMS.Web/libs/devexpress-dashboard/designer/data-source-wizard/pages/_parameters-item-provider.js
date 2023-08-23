/**
* DevExpress Dashboard (_parameters-item-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametersItemProvider = void 0;
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const index_internal_1 = require("../../../data/index.internal");
const data_item_1 = require("../../../model/data-item/data-item");
class ParametersItemProvider {
    constructor(dashboardParameters = []) {
        this.dashboardParameters = dashboardParameters;
    }
    getItems(pathRequest) {
        var items = [], fullPath = pathRequest.fullPath && pathRequest.fullPath.toLowerCase() || '';
        if (fullPath === '') {
            items = [{
                    displayName: index_internal_1.getLocalizationById('DashboardWebStringId.DashboardParameters'),
                    name: 'Parameters',
                    isList: true,
                    specifics: 'parameters'
                }];
        }
        else if (fullPath === 'parameters') {
            items = this.dashboardParameters.map(parameter => {
                return {
                    displayName: parameter.name(),
                    name: parameter.name(),
                    isList: false,
                    specifics: data_item_1.DataItem.typesMap[parameter.type().replace('System.', '')]
                };
            });
        }
        return _jquery_helpers_1.createJQueryDeferred().resolve(items).promise();
    }
}
exports.ParametersItemProvider = ParametersItemProvider;
