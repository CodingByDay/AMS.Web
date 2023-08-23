﻿/**
* DevExpress Dashboard (bound-image-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundImageItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../serializable-model");
const data_dashboard_item_1 = require("./data-dashboard-item");
const _bound_image_item_1 = require("./metadata/_bound-image-item");
class BoundImageItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this._attachDataItem(this, _bound_image_item_1.imageItem.propertyName);
    }
    _getInfoCore() {
        return _bound_image_item_1.boundImageDashboardItemSerializationsInfo;
    }
    _isCalculationSupported() {
        return false;
    }
    _isSortingEnabled() {
        return false;
    }
    _isTopNEnabled(dataItem) {
        return false;
    }
    _getDefaultItemType() {
        return 'BoundImage';
    }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getIsVisualInteractivitySupported() { return false; }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        content.ViewModel.SizeMode = this.sizeMode();
        content.ViewModel.HorizontalAlignment = this.horizontalAlignment();
        content.ViewModel.VerticalAlignment = this.verticalAlignment();
    }
}
exports.BoundImageItem = BoundImageItem;
serializable_model_1.itemTypesMap['BoundImage'] = { type: BoundImageItem, groupName: 'common', title: 'DashboardStringId.DefaultNameBoundImageItem', index: 100 };
