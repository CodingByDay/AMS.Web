﻿/**
* DevExpress Dashboard (color-scheme-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSchemeDefinition = void 0;
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
class ColorSchemeDefinition {
    constructor(dataSource, dataMember, dimensionDefinitions, colorByMeasures = false, componentName = '', name = '') {
        this.dataSource = dataSource;
        this.dataMember = dataMember;
        this.dimensionDefinitions = dimensionDefinitions;
        this.colorByMeasures = colorByMeasures;
        this.componentName = componentName;
        this.name = name;
        this.dataItems = ko.computed(() => {
            return this.dimensionDefinitions.map(definition => {
                return false ? definition.dataMember() + ' (' + definition.dateTimeGroupInterval() + ')' : definition.dataMember();
            }).concat(this.colorByMeasures ? [_default_1.getLocalizationById('DashboardWebStringId.Colorization.MeasureNames')] : []);
        });
        this.typeText = ko.computed(() => {
            return !this.componentName ? _default_1.getLocalizationById('DashboardWebStringId.Coloring.Global') : (_default_1.getLocalizationById('DashboardWebStringId.Coloring.Local') + '(' + this.name + ')');
        });
        this.dataSourceText = ko.computed(() => {
            return this.dataMember || this.dataSource;
        });
        this.key = ko.computed(() => {
            return [this.componentName, this.dataMember, this.dataSource].concat(this.dimensionDefinitions.map(value => value.dataMember() + '(' + value.dateTimeGroupInterval() + ')').sort()).concat(this.colorByMeasures ? [_default_1.getLocalizationById('DashboardWebStringId.Colorization.MeasureNames')] : []).join('|');
        });
    }
    equals(definition) {
        return definition.key() === this.key();
    }
    _getDataSourceText(dataSourceName) {
        return this.dataMember || dataSourceName || this.dataSource;
    }
}
exports.ColorSchemeDefinition = ColorSchemeDefinition;
