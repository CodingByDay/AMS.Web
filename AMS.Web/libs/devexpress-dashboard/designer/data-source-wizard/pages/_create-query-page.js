﻿/**
* DevExpress Dashboard (_create-query-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryPageCallback = void 0;
const _helpers_1 = require("../_helpers");
const _parameters_item_provider_1 = require("./_parameters-item-provider");
function createQueryPageCallback(requestWrapper, parameters, dataSourceBrowser, customQueriesPreset = undefined) {
    return {
        customQueriesPreset: customQueriesPreset,
        customizeQBInitData: (initData) => {
            initData.parametersItemsProvider = new _parameters_item_provider_1.ParametersItemProvider(parameters());
            initData.requestWrapper = requestWrapper;
            return initData;
        },
        selectStatement: (connection, query) => requestWrapper.getSelectStatement(connection, query),
        getItemsProviderCallback: () => new _parameters_item_provider_1.ParametersItemProvider(parameters()),
        fieldListsCallback: (pathRequest, dataSourceInfo) => _helpers_1.getFederationFieldList(pathRequest, dataSourceBrowser),
    };
}
exports.createQueryPageCallback = createQueryPageCallback;
