﻿/**
* DevExpress Dashboard (_item-filter-display-name-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemFilterDisplayNameProvider = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _display_name_provider_1 = require("../_display-name-provider");
class ItemFilterDisplayNameProvider {
    constructor(dashboardItem, dataSourceBrowser) {
        this.dashboardItem = dashboardItem;
        this.dataSourceBrowser = dataSourceBrowser;
    }
    _mapDataItemProperties(getSourceProperty, getTargetProperty, value) {
        let dataItem = this.dashboardItem.dataItems().filter(di => getSourceProperty(di) === value)[0];
        let result = '';
        if (dataItem) {
            result = getTargetProperty(dataItem);
        }
        else {
            result = value;
        }
        return _jquery_helpers_1.createJQueryDeferred().resolve(result).promise();
    }
    getDisplayNameByPath(path, dataMember) {
        return this._mapDataItemProperties((dataItem) => dataItem.uniqueName(), (dataItem) => _display_name_provider_1.getDataItemDisplayName(this.dataSourceBrowser, this.dashboardItem, dataItem), dataMember);
    }
    getRealName(path, displayDataMember) {
        return this._mapDataItemProperties((dataItem) => _display_name_provider_1.getDataItemDisplayName(this.dataSourceBrowser, this.dashboardItem, dataItem), (dataItem) => dataItem.uniqueName(), displayDataMember);
    }
}
exports.ItemFilterDisplayNameProvider = ItemFilterDisplayNameProvider;
