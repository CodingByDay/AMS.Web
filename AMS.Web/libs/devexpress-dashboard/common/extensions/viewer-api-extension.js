﻿/**
* DevExpress Dashboard (viewer-api-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerApiExtension = void 0;
const disposable_object_1 = require("../../model/disposable-object");
const control_options_1 = require("../control-options");
const _options_manager_1 = require("../internal/_options-manager");
const _viewer_api_1 = require("../viewer/_viewer-api");
const name = 'viewerApi';
const nameAlias = 'viewer-api';
class ViewerApiExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl, options = {}) {
        super();
        this.name = name;
        this._optionsManager = new _options_manager_1.OptionsManager();
        this.requestUnderlyingData = (itemName, args, onCompleted) => {
            this._viewerApi.requestUnderlyingData(itemName, args, onCompleted);
        };
        this._viewerApi = dashboardControl._viewerApi;
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: {},
            eventsHolder: this,
            initOptions: options,
            optionChanged: (args) => null
        });
    }
    start() {
        _viewer_api_1.viewerApiEventsNames.forEach(eventName => {
            let handler = this['_on' + eventName] = (args) => this._optionsManager.raiseEvent(eventName, args);
            this._viewerApi.on(eventName, handler);
        });
    }
    stop() {
        _viewer_api_1.viewerApiEventsNames.forEach(eventName => {
            let handler = this['_on' + eventName];
            this._viewerApi.off(eventName, handler);
        });
    }
    getCurrentRange(itemName) {
        return this._viewerApi.getCurrentRange(itemName);
    }
    getEntireRange(itemName) {
        return this._viewerApi.getEntireRange(itemName);
    }
    setRange(itemName, range) {
        this._viewerApi.setRange(itemName, range);
    }
    setPredefinedRange(itemName, dateTimePeriodName) {
        return this._viewerApi.setPredefinedRange(itemName, dateTimePeriodName);
    }
    getAvailablePredefinedRanges(itemName) {
        return this._viewerApi.getAvailablePredefinedRanges(itemName);
    }
    getCurrentPredefinedRange(itemName) {
        return this._viewerApi.getCurrentPredefinedRange(itemName);
    }
    getCurrentSelection(itemName) {
        return this._viewerApi.getCurrentSelection(itemName);
    }
    canSetMasterFilter(itemName) {
        return this._viewerApi.canSetMasterFilter(itemName);
    }
    canClearMasterFilter(itemName) {
        return this._viewerApi.canClearMasterFilter(itemName);
    }
    canPerformDrillDown(itemName) {
        return this._viewerApi.canPerformDrillDown(itemName);
    }
    canPerformDrillUp(itemName) {
        return this._viewerApi.canPerformDrillUp(itemName);
    }
    getItemData(itemName) {
        return this._viewerApi.getItemData(itemName);
    }
    getCurrentFilterValues(itemName) {
        return this._viewerApi.getCurrentFilterValues(itemName);
    }
    getAvailableFilterValues(itemName) {
        return this._viewerApi.getAvailableFilterValues(itemName);
    }
    getCurrentDrillDownValues(itemName) {
        return this._viewerApi.getCurrentDrillDownValues(itemName);
    }
    getAvailableDrillDownValues(itemName) {
        return this._viewerApi.getAvailableDrillDownValues(itemName);
    }
    setMasterFilter(itemName, values) {
        this._viewerApi.setMasterFilter(itemName, values);
    }
    clearMasterFilter(itemName) {
        this._viewerApi.clearMasterFilter(itemName);
    }
    performDrillDown(itemName, value) {
        this._viewerApi.performDrillDown(itemName, value);
    }
    performDrillUp(itemName) {
        this._viewerApi.performDrillUp(itemName);
    }
    getAvailableActions(itemName) {
        return this._viewerApi.getAvailableActions(itemName);
    }
    updateItemCaptionToolbar(itemName) {
        this._viewerApi.updateItemCaptionToolbar(itemName);
    }
    updateDashboardTitleToolbar() {
        this._viewerApi.updateDashboardTitleToolbar();
    }
    setSelectedTabPage(tabPageName) {
        this._viewerApi.setSelectedTabPage(tabPageName);
    }
    setSelectedTabPageIndex(tabContainerName, index) {
        this._viewerApi.setSelectedTabPageIndex(tabContainerName, index);
    }
    getSelectedTabPageIndex(tabContainerName) {
        return this._viewerApi.getSelectedTabPageIndex(tabContainerName);
    }
    getSelectedTabPage(tabContainerName) {
        return this._viewerApi.getSelectedTabPage(tabContainerName);
    }
}
exports.ViewerApiExtension = ViewerApiExtension;
control_options_1.defaultExtensions[nameAlias] = (dashboardControl, options) => new ViewerApiExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
