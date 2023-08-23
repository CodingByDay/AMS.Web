﻿/**
* DevExpress Dashboard (_item-meta-data.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemMetaData = exports.deltaValueTypes = exports.deltaValueNames = void 0;
const _formatter_1 = require("../../_formatter");
const item_data_axis_names_1 = require("../item-data-axis-names");
exports.deltaValueNames = {
    actualValue: 'actualValue',
    targetValue: 'targetValue',
    absoluteVariation: 'absoluteVariation',
    percentVariation: 'percentVariation',
    percentOfTarget: 'percentOfTarget',
    mainValue: 'mainValue',
    subValue1: 'subValue1',
    subValue2: 'subValue2',
    isGood: 'isGood',
    indicatorType: 'indicatorType'
};
exports.deltaValueTypes = {
    actualValue: 'ActualValue',
    absoluteVariation: 'AbsoluteVariation',
    percentVariation: 'PercentVariation',
    percentOfTarget: 'PercentOfTarget',
    targetValue: 'TargetValue'
};
class itemMetaData {
    constructor(metaDataDto) {
        this._metaDataDto = metaDataDto;
    }
    initialize() {
        let metaDataDto = this._metaDataDto;
        this._measuresInfo = this._createMeasureInfo(metaDataDto.MeasureDescriptors);
        this._colorMeasuresInfo = this._createMeasureInfo(metaDataDto.ColorMeasureDescriptors);
        this._conditionalFormattingMeasuresInfo = this._createMeasureInfo(metaDataDto.FormatConditionMeasureDescriptors);
        this._deltaInfo = this._createDeltaInfo();
        this._axesInfo = this._createAxesInfo();
        this._dataSourceColumns = this._metaDataDto.DataSourceColumns;
    }
    _createMeasureInfo(descriptors) {
        var measures = [], formatByMeasureId = {};
        let expressionByMeasureId = {};
        let calculationByMeasureId = {};
        let windowDefinitionByMeasureId = {};
        if (descriptors) {
            descriptors.forEach((_measure) => {
                var measure = {
                    id: _measure.ID,
                    name: _measure.Name,
                    dataItemId: _measure.DataItemId,
                    dataMember: _measure.DataMember,
                    dataType: _measure.DataType,
                    finalDataType: _measure.FinalDataType,
                    summaryType: _measure.SummaryType,
                    format: function (value) {
                        var format = _measure.Format, text = undefined;
                        if (format)
                            text = _formatter_1.format(value, format);
                        return text;
                    }
                };
                measures.push(measure);
                formatByMeasureId[measure.id] = _measure.Format;
                expressionByMeasureId[measure.id] = _measure.Expression;
                calculationByMeasureId[measure.id] = _measure.Calculation;
                windowDefinitionByMeasureId[measure.id] = _measure.WindowDefinition;
            });
        }
        return {
            measures: measures,
            formatByMeasureId: formatByMeasureId,
            expressionByMeasureId: expressionByMeasureId,
            calculationByMeasureId: calculationByMeasureId,
            windowDefinitionByMeasureId: windowDefinitionByMeasureId
        };
    }
    _createDeltaInfo() {
        var metaData = this._metaDataDto, names = exports.deltaValueNames, deltas = [], valueIdsByDeltaId = {}, formatsByDeltaId = {};
        if (metaData.DeltaDescriptors) {
            metaData.DeltaDescriptors.forEach((_delta) => {
                var delta = {
                    id: _delta.ID,
                    name: _delta.Name,
                    actualMeasureId: _delta.ActualMeasureID,
                    targetMeasureId: _delta.TargetMeasureID
                }, ids = {}, formats = {};
                deltas.push(delta);
                ids[names.actualValue] = _delta.ActualValueID;
                ids[names.targetValue] = _delta.TargetValueID;
                ids[names.absoluteVariation] = _delta.AbsoluteVariationID;
                ids[names.percentVariation] = _delta.PercentVariationID;
                ids[names.percentOfTarget] = _delta.PercentOfTargetID;
                ids[names.isGood] = _delta.IsGoodID;
                ids[names.indicatorType] = _delta.IndicatorTypeID;
                formats[names.actualValue] = _delta.ActualValueFormat;
                formats[names.targetValue] = _delta.TargetValueFormat;
                formats[names.absoluteVariation] = _delta.AbsoluteVariationFormat;
                formats[names.percentVariation] = _delta.PercentVariationFormat;
                formats[names.percentOfTarget] = _delta.PercentOfTargetFormat;
                switch (_delta.DeltaValueType) {
                    case exports.deltaValueTypes.actualValue:
                        ids[names.mainValue] = ids[names.actualValue];
                        ids[names.subValue1] = ids[names.absoluteVariation];
                        ids[names.subValue2] = ids[names.percentVariation];
                        formats[names.mainValue] = formats[names.actualValue];
                        formats[names.subValue1] = formats[names.absoluteVariation];
                        formats[names.subValue2] = formats[names.percentVariation];
                        break;
                    case exports.deltaValueTypes.absoluteVariation:
                        ids[names.mainValue] = ids[names.absoluteVariation];
                        ids[names.subValue1] = ids[names.actualValue];
                        ids[names.subValue2] = ids[names.percentVariation];
                        formats[names.mainValue] = formats[names.absoluteVariation];
                        formats[names.subValue1] = formats[names.actualValue];
                        formats[names.subValue2] = formats[names.percentVariation];
                        break;
                    case exports.deltaValueTypes.percentVariation:
                        ids[names.mainValue] = ids[names.percentVariation];
                        ids[names.subValue1] = ids[names.actualValue];
                        ids[names.subValue2] = ids[names.absoluteVariation];
                        formats[names.mainValue] = formats[names.percentVariation];
                        formats[names.subValue1] = formats[names.actualValue];
                        formats[names.subValue2] = formats[names.absoluteVariation];
                        break;
                    case exports.deltaValueTypes.percentOfTarget:
                        ids[names.mainValue] = ids[names.percentOfTarget];
                        ids[names.subValue1] = ids[names.actualValue];
                        ids[names.subValue2] = ids[names.absoluteVariation];
                        formats[names.mainValue] = formats[names.percentOfTarget];
                        formats[names.subValue1] = formats[names.actualValue];
                        formats[names.subValue2] = formats[names.absoluteVariation];
                        break;
                    case exports.deltaValueTypes.targetValue:
                        ids[names.mainValue] = ids[names.targetValue];
                        ids[names.subValue1] = ids[names.absoluteVariation];
                        ids[names.subValue2] = ids[names.percentVariation];
                        formats[names.mainValue] = formats[names.targetValue];
                        formats[names.subValue1] = formats[names.absoluteVariation];
                        formats[names.subValue2] = formats[names.percentVariation];
                        break;
                }
                valueIdsByDeltaId[delta.id] = ids;
                formatsByDeltaId[delta.id] = formats;
            });
        }
        return {
            deltas: deltas,
            valueIdsByDeltaId: valueIdsByDeltaId,
            formatsByDeltaId: formatsByDeltaId
        };
    }
    _createAxesInfo() {
        var metaDataDto = this._metaDataDto, axes = {}, dimensionDescriptorsByAxisName = metaDataDto.DimensionDescriptors || {}, levelByDimensionId = {}, formatByDimensionId = {}, pivotAreaByAxisName = {};
        Object.keys(dimensionDescriptorsByAxisName).forEach((_name) => {
            let _dimensions = dimensionDescriptorsByAxisName[_name];
            var dimensions = [];
            if (_dimensions) {
                _dimensions.forEach((_dimension) => {
                    var dimension = {
                        id: _dimension.ID,
                        name: _dimension.Name,
                        dataMember: _dimension.DataMember,
                        finalDataType: _dimension.FinalDataType,
                        dataType: _dimension.DataType,
                        dateTimeGroupInterval: _dimension.DateTimeGroupInterval,
                        textGroupInterval: _dimension.TextGroupInterval,
                        getFormat: function () {
                            return _formatter_1.convertToFormat(_dimension.Format);
                        },
                        format: function (value) {
                            var format = _dimension.Format, text = undefined;
                            if (format)
                                text = _formatter_1.format(value, format);
                            return text;
                        }
                    };
                    levelByDimensionId[dimension.id] = _dimension.Level;
                    formatByDimensionId[dimension.id] = _dimension.Format;
                    dimensions.push(dimension);
                });
            }
            axes[_name] = dimensions;
        });
        if (metaDataDto.ColumnHierarchy)
            pivotAreaByAxisName[metaDataDto.ColumnHierarchy] = 'Columns';
        if (metaDataDto.RowHierarchy)
            pivotAreaByAxisName[metaDataDto.RowHierarchy] = 'Rows';
        return {
            axes: axes,
            levelByDimensionId: levelByDimensionId,
            formatByDimensionId: formatByDimensionId,
            pivotAreaByAxisName: pivotAreaByAxisName
        };
    }
    getAxes() {
        return this._axesInfo.axes;
    }
    getAxisNames() {
        var names = [];
        Object.keys(this.getAxes()).forEach((name) => {
            names.push(name);
        });
        return names;
    }
    getPivotAreaByAxisName(name) {
        return this._axesInfo.pivotAreaByAxisName[name];
    }
    getColorMeasures() {
        return this._colorMeasuresInfo.measures;
    }
    getConditionalFormattingMeasures() {
        return this._conditionalFormattingMeasuresInfo.measures;
    }
    getDimensions(axisName) {
        return this.getAxes()[axisName === undefined ? item_data_axis_names_1.itemDataAxisNames.defaultAxis : axisName];
    }
    getMeasures() {
        return this._measuresInfo.measures;
    }
    getDeltas() {
        return this._deltaInfo.deltas;
    }
    getMeasureById(id) {
        var measures = this.getMeasures(), foundMeasures = measures.filter((measure) => {
            return measure.id == id;
        });
        return foundMeasures[0];
    }
    getDeltaById(id) {
        var deltas = this.getDeltas(), foundDeltas = deltas.filter((delta) => {
            return delta.id == id;
        });
        return foundDeltas[0];
    }
    getMeasureFormat(measureId) {
        return this._measuresInfo.formatByMeasureId[measureId];
    }
    getMeasureExpression(measureId) {
        return this._measuresInfo.expressionByMeasureId[measureId];
    }
    getMeasureCalculation(measureId) {
        return this._measuresInfo.calculationByMeasureId[measureId];
    }
    getMeasureWindowDefinition(measureId) {
        return this._measuresInfo.windowDefinitionByMeasureId[measureId];
    }
    getDeltaValueIds(deltaId) {
        return this._deltaInfo.valueIdsByDeltaId[deltaId];
    }
    getDeltaFormats(deltaId) {
        return this._deltaInfo.formatsByDeltaId[deltaId];
    }
    getDeltaValueType(deltaId) {
    }
    getDimensionLevel(dimensionId) {
        return this._axesInfo.levelByDimensionId[dimensionId];
    }
    getDimensionFormat(dimensionId) {
        return this._axesInfo.formatByDimensionId[dimensionId];
    }
    getDataMembers() {
        return this._dataSourceColumns;
    }
    getFinalDataType(dataItemId) {
        var dataItem = this.getMeasureById(dataItemId);
        if (!dataItem) {
            let axes = this.getAxes();
            Object.keys(axes).forEach((axisName) => {
                let dimensions = axes[axisName];
                dataItem = dimensions.filter(d => d.id == dataItemId)[0];
                if (!!dataItem) {
                    return false;
                }
            });
        }
        return !!dataItem ? dataItem.finalDataType : undefined;
    }
}
exports.itemMetaData = itemMetaData;
