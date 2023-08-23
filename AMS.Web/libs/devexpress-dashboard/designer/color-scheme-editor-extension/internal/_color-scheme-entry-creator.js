﻿/**
* DevExpress Dashboard (_color-scheme-entry-creator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSchemeEntryCreator = void 0;
const analytics_criteria_1 = require("@devexpress/analytics-core/analytics-criteria");
const analytics_criteria_utils_1 = require("@devexpress/analytics-core/analytics-criteria-utils");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const color_scheme_entry_1 = require("../../../model/colorization/color-scheme-entry");
const dimension_key_1 = require("../../../model/colorization/dimension-key");
const measure_definition_1 = require("../../../model/colorization/measure-definition");
const _dimension_definition_1 = require("../../../model/colorization/_dimension-definition");
const calculation_1 = require("../../../model/data-item/calculations/calculation");
const dimension_1 = require("../../../model/data-item/dimension");
const window_definition_1 = require("../../../model/data-item/window-definition/window-definition");
const _expression_utils_1 = require("../../../model/internal/_expression-utils");
class ColorSchemeEntryCreator {
    constructor() {
        this._entry = new color_scheme_entry_1.ColorSchemeEntry({});
    }
    static createMeasureKey(dataMember, summaryType) {
        var measureDefinition = new measure_definition_1.MeasureDefinition({ '@ItemType': 'Definition' });
        measureDefinition.dataMember(dataMember);
        measureDefinition.summaryType(summaryType);
        return measureDefinition;
    }
    static createMeasureDefinitionFromMeasure(measure, otherDataItems) {
        var measureDefinition = new measure_definition_1.MeasureDefinition({ '@ItemType': 'Definition' });
        var serializer = new analytics_utils_1.ModelSerializer();
        var calculationClone = new calculation_1.Calculation(serializer.serialize(measure.calculation));
        var windowDefinitionJson = serializer.serialize(measure.windowDefinition);
        var windowDefinitionClone = new window_definition_1.WindowDefinition(windowDefinitionJson);
        measureDefinition.dataMember(measure.dataMember());
        measureDefinition.summaryType(measure.summaryType());
        measureDefinition.calculation.calculation(calculationClone.calculation());
        measureDefinition.calculation.calculationType(calculationClone.calculationType());
        measureDefinition.expression(measure.expression());
        measureDefinition.windowDefinition.windowDefinition(windowDefinitionClone.windowDefinition());
        measureDefinition.windowDefinition.windowDefinitionType(windowDefinitionClone.windowDefinitionType());
        let filterString = measure.filterString();
        measureDefinition.filterString(filterString);
        if (filterString && otherDataItems && otherDataItems.length > 0) {
            let filterCriteria = _expression_utils_1.getFilterCriteria(filterString);
            let dimensions = [];
            analytics_criteria_utils_1.criteriaForEach(filterCriteria, op => {
                if (op instanceof analytics_criteria_1.OperandProperty) {
                    let prop = op;
                    let dataItem = otherDataItems.filter(di => di.uniqueName() === prop.propertyName)[0];
                    if (dataItem instanceof dimension_1.Dimension) {
                        dimensions.push(this.createDimensionDefinitionFromDimension(dataItem));
                    }
                }
            });
            measureDefinition.definitions(dimensions);
        }
        return measureDefinition;
    }
    static createDimensionDefinitionFromDimension(dimension) {
        var dimensionDefinition = new _dimension_definition_1.DimensionDefinition();
        dimensionDefinition.dataMember = dimension.dataMember;
        dimensionDefinition.dateTimeGroupInterval = dimension.dateTimeGroupInterval;
        return dimensionDefinition;
    }
    static createMeasureDefinitionCopy(measureKey) {
        var serializer = new analytics_utils_1.ModelSerializer();
        return new measure_definition_1.MeasureDefinition(serializer.serialize(measureKey));
    }
    static createDimensionKey(dataMember, groupInterval, valueType, value) {
        var dimensionKey = new dimension_key_1.DimensionKey({ '@ItemType': 'DimensionKey' });
        dimensionKey.definition = {
            dataMember: ko.observable(dataMember),
            dateTimeGroupInterval: ko.observable(groupInterval)
        };
        dimensionKey.value = {
            value: ko.observable(value),
            type: ko.observable(valueType)
        };
        return dimensionKey;
    }
    addColor(color) {
        this._entry.color(color);
        return this;
    }
    addItemComponentName(name) {
        this._entry.itemComponentName = name;
        return this;
    }
    addPaletteIndex(paletteIndex) {
        this._entry.paletteIndex(paletteIndex);
        return this;
    }
    addDataSourceName(dataSourceName) {
        this._entry.dataSource(dataSourceName);
        return this;
    }
    addDataMemberName(dataMember) {
        this._entry.dataMember(dataMember);
        return this;
    }
    addMeasureKey(dataMember, summaryType) {
        this._entry.measureKeys.push(ColorSchemeEntryCreator.createMeasureKey(dataMember, summaryType));
        return this;
    }
    addDimensionKey(dataMember, groupInterval, valueType, value) {
        this._entry.dimensionKeys.push(ColorSchemeEntryCreator.createDimensionKey(dataMember, groupInterval, valueType, value));
        return this;
    }
    getEntry() {
        return this._entry;
    }
}
exports.ColorSchemeEntryCreator = ColorSchemeEntryCreator;
