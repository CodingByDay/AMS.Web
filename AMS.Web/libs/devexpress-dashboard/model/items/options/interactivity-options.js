﻿/**
* DevExpress Dashboard (interactivity-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._chartItemInteractivityOptionsMeta = exports._drillDownInteractivityOptionsMeta = exports._masterFilterInteractivityOptionsMeta = exports._dashboardItemInteractivityOptionsMeta = exports._baseInteractivityOptionsMeta = exports._tabItemInteractivityOptions = exports._groupItemInteractivityOptionsMeta = exports._filterItemInteractivityOptionsMeta = exports.ChartInteractivityOptions = exports.DashboardItemInteractivityOptions = exports.DashboardItemDrillDownInteractivityOptions = exports.DashboardItemMasterFilterInteractivityOptions = exports.DashboardTabItemInteractivityOptions = exports.DashboardItemBaseInteractivityOptions = exports.DashboardItemGroupInteractivityOptions = exports.FilterableDashboardItemInteractivityOptions = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _interactivity_options_1 = require("./metadata/_interactivity-options");
class FilterableDashboardItemInteractivityOptions extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return [_interactivity_options_1.ignoreMasterFiltersDefaultTrue];
    }
}
exports.FilterableDashboardItemInteractivityOptions = FilterableDashboardItemInteractivityOptions;
class DashboardItemGroupInteractivityOptions extends FilterableDashboardItemInteractivityOptions {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return super.getInfo().concat(_interactivity_options_1.isMasterFilterDefaultFalse);
    }
}
exports.DashboardItemGroupInteractivityOptions = DashboardItemGroupInteractivityOptions;
class DashboardItemBaseInteractivityOptions extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return [_interactivity_options_1.ignoreMasterFiltersDefaultFalse];
    }
}
exports.DashboardItemBaseInteractivityOptions = DashboardItemBaseInteractivityOptions;
class DashboardTabItemInteractivityOptions extends DashboardItemBaseInteractivityOptions {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return super.getInfo().concat([_interactivity_options_1.isMasterFilterDefaultTrue, _interactivity_options_1.ignoreMasterFiltersDefaultFalse]);
    }
}
exports.DashboardTabItemInteractivityOptions = DashboardTabItemInteractivityOptions;
class DashboardItemMasterFilterInteractivityOptions extends DashboardItemBaseInteractivityOptions {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return super.getInfo().concat([_interactivity_options_1.masterFilterMode]);
    }
}
exports.DashboardItemMasterFilterInteractivityOptions = DashboardItemMasterFilterInteractivityOptions;
class DashboardItemDrillDownInteractivityOptions extends DashboardItemBaseInteractivityOptions {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return super.getInfo().concat([_interactivity_options_1.isDrillDownEnabled]);
    }
}
exports.DashboardItemDrillDownInteractivityOptions = DashboardItemDrillDownInteractivityOptions;
class DashboardItemInteractivityOptions extends DashboardItemMasterFilterInteractivityOptions {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return super.getInfo().concat([_interactivity_options_1.isDrillDownEnabled]);
    }
}
exports.DashboardItemInteractivityOptions = DashboardItemInteractivityOptions;
class ChartInteractivityOptions extends DashboardItemInteractivityOptions {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return super.getInfo().concat(_interactivity_options_1.targetDimensions);
    }
}
exports.ChartInteractivityOptions = ChartInteractivityOptions;
exports._filterItemInteractivityOptionsMeta = _interactivity_options_1.getInteractivityOptionsPropertyInfo(FilterableDashboardItemInteractivityOptions);
exports._groupItemInteractivityOptionsMeta = _interactivity_options_1.getInteractivityOptionsPropertyInfo(DashboardItemGroupInteractivityOptions);
exports._tabItemInteractivityOptions = _interactivity_options_1.getInteractivityOptionsPropertyInfo(DashboardTabItemInteractivityOptions);
exports._baseInteractivityOptionsMeta = _interactivity_options_1.getInteractivityOptionsPropertyInfo(DashboardItemBaseInteractivityOptions);
exports._dashboardItemInteractivityOptionsMeta = _interactivity_options_1.getInteractivityOptionsPropertyInfo(DashboardItemInteractivityOptions);
exports._masterFilterInteractivityOptionsMeta = _interactivity_options_1.getInteractivityOptionsPropertyInfo(DashboardItemMasterFilterInteractivityOptions);
exports._drillDownInteractivityOptionsMeta = _interactivity_options_1.getInteractivityOptionsPropertyInfo(DashboardItemDrillDownInteractivityOptions);
exports._chartItemInteractivityOptionsMeta = _interactivity_options_1.getInteractivityOptionsPropertyInfo(ChartInteractivityOptions);
