﻿/**
* DevExpress Dashboard (_calculation-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationSurface = void 0;
const ko = require("knockout");
const _calculation_properties_composer_1 = require("../../../items/properties-composers/_calculation-properties-composer");
class CalculationSurface {
    constructor(model, measure, dashboardItem, dataSourceBrowser, propertiesController) {
        this.model = model;
        this.measure = measure;
        this.dashboardItem = dashboardItem;
        this.dataSourceBrowser = dataSourceBrowser;
        this.propertiesController = propertiesController;
        this._disposables = [];
        this.propertiesTabs = ko.observableArray([]);
    }
    updatePropertiesTabs() {
        var composer = new _calculation_properties_composer_1.CalculationPropertiesComposer();
        var tabs = composer.composeTabs(this.measure, {
            dashboardItem: this.dashboardItem,
            dataSourceBrowser: this.dataSourceBrowser
        });
        this.propertiesTabs(tabs);
        this.propertiesController.secondaryModel({
            displayText: this.model.title,
            data: this
        });
        this.propertiesController.secondarySelectedIndex(0);
    }
    startEditing(args) {
        args.createImmediately = false;
        this.updatePropertiesTabs();
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
exports.CalculationSurface = CalculationSurface;
