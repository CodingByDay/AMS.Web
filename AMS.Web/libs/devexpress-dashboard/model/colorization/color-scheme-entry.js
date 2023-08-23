﻿/**
* DevExpress Dashboard (color-scheme-entry.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoColorSchemeEntry = exports.ColorSchemeEntry = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const serializable_model_1 = require("../serializable-model");
const color_scheme_definition_1 = require("./color-scheme-definition");
const dimension_key_1 = require("./dimension-key");
const measure_definition_1 = require("./measure-definition");
const _color_scheme_entry_1 = require("./metadata/_color-scheme-entry");
class ColorSchemeEntry extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer(), itemComponentName = '', name = '') {
        super(modelJson, serializer, _color_scheme_entry_1.colorSchemeEntrySerializationInfo);
        this.itemComponentName = itemComponentName;
        this.name = name;
        this.measureKeys = ko.observableArray();
        this.dimensionKeys = ko.observableArray();
        this.measureKeys = analytics_utils_1.deserializeArray(modelJson.MeasureKey, (item) => new measure_definition_1.MeasureDefinition(item, serializer));
        this.dimensionKeys = analytics_utils_1.deserializeArray(modelJson.DimensionKeys, (item) => new dimension_key_1.DimensionKey(item, serializer));
        this.displayText = ko.computed(() => {
            return this.dimensionKeys()
                .map(key => key.value.value())
                .concat(this.measureKeys().map(key => key.displayText()))
                .join(' | ');
        });
        this.colorText = ko.computed(() => {
            var result = '';
            if (!this.custom) {
                result = _default_1.getLocalizationById('DashboardStringId.ColorAutoAssigned');
            }
            else {
                if (this.paletteIndex() !== null)
                    result = _default_1.getLocalizationById('DashboardStringId.ColorPaletteIndex') + this.paletteIndex();
                else if (!!this.color()) {
                    result = _default_1.getLocalizationById('DashboardWebStringId.ColorScheme.Color') + ' [A=' + (this.color().A * 255).toFixed(0) + ', R=' + this.color().R + ', G=' + this.color().G + ', B=' + this.color().B + ']';
                }
            }
            return result;
        });
        this.componentName = ko.computed(() => {
            return this.displayText() + this.dataSource() + this.dataMember();
        });
    }
    get custom() {
        return true;
    }
    get definition() {
        if (!this._definition) {
            this._definition = new color_scheme_definition_1.ColorSchemeDefinition(this.dataSource(), this.dataMember(), this.dimensionKeys().map(key => { return key.definition; }), !!this.measureKeys().length, this.itemComponentName, this.name);
        }
        return this._definition;
    }
    getInfo() {
        return _color_scheme_entry_1.colorSchemeEntrySerializationInfo;
    }
    clone() {
        var clonedEntry = new ColorSchemeEntry();
        clonedEntry.itemComponentName = this.itemComponentName;
        clonedEntry.name = this.name;
        clonedEntry.dataMember(this.dataMember());
        clonedEntry.dataSource(this.dataSource());
        clonedEntry.dimensionKeys(this.dimensionKeys());
        clonedEntry.measureKeys(this.measureKeys());
        clonedEntry.paletteIndex(this.paletteIndex());
        clonedEntry.color(this.color());
        return clonedEntry;
    }
    equals(entry) {
        if (this.dimensionKeys().length !== entry.dimensionKeys().length)
            return false;
        for (var i = 0; i < this.dimensionKeys().length; i++) {
            if (this.dimensionKeys()[i].value.value() !== entry.dimensionKeys()[i].value.value()) {
                return false;
            }
        }
        if (this.definition.colorByMeasures) {
            if (this.measureKeys().length !== entry.measureKeys().length)
                return false;
            for (var i = 0; i < this.measureKeys().length; i++) {
                if (this.measureKeys()[i].dataMember() !== entry.measureKeys()[i].dataMember() || this.measureKeys()[i].summaryType() !== entry.measureKeys()[i].summaryType())
                    return false;
            }
        }
        return true;
    }
    getUniqueNamePrefix() {
        return super._getUniqueNamePrefix();
    }
    _getDefaultItemType() {
        return 'Entry';
    }
}
exports.ColorSchemeEntry = ColorSchemeEntry;
class AutoColorSchemeEntry extends ColorSchemeEntry {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer(), componentName, name) {
        super(modelJson, serializer, componentName, name);
    }
    get custom() {
        return false;
    }
}
exports.AutoColorSchemeEntry = AutoColorSchemeEntry;
