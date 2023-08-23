﻿/**
* DevExpress Dashboard (_aggregated-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataInspectorItemDataMeasureComparer = exports.dataInspectorItemDataDimensionComparer = exports.generateAggregatedSource = void 0;
const _item_data_tuple_1 = require("../../../data/item-data/_item-data-tuple");
const _default_1 = require("../../../data/localization/_default");
const _utils_1 = require("../../../data/_utils");
const _date_filter_element_1 = require("../../../viewer-parts/viewer-items/filter-items/_date-filter-element");
const _inspected_data_colum_generator_1 = require("./_inspected-data-colum-generator");
function _createDimensionColumnInfo(dimension, axisName) {
    return {
        getValue: (row) => {
            let point = row.getAxisPoint(axisName);
            if (point) {
                var dimensionValue = point.getDimensionValue(dimension.id);
                if (dimensionValue) {
                    return {
                        displayValue: dimensionValue.getDisplayText(),
                        value: dimensionValue.getUniqueValue()
                    };
                }
            }
            return null;
        },
        getGridColumn: () => {
            return {
                dataField: dimension.id,
                caption: dimension.name || dimension.dataMember || dimension.id,
                calculateCellValue: (row) => row[dimension.id] && row[dimension.id].value
            };
        }
    };
}
function _createMeasureColumnInfo(itemData, measure, isSparklineMeasure) {
    const sparklineColumnId = '_Sparkline';
    var getSparklineCellText = (defaultAxisPoint) => {
        let argumentValueSeparator = _default_1.getLocalizationById('DashboardStringId.SparklineArgumentValueSeparator');
        let valuesSeparator = _default_1.getLocalizationById('DashboardStringId.SparklineValuesSeparator');
        return itemData
            .getAxis('Sparkline')
            .getPoints()
            .map(sparklinePoint => {
            let measureValue = itemData.getSlice(sparklinePoint).getSlice(defaultAxisPoint).getMeasureValue(measure.id);
            if (measureValue) {
                return sparklinePoint.getDisplayText() + argumentValueSeparator + measureValue.getDisplayText();
            }
            return '';
        })
            .join(valuesSeparator);
    };
    return {
        getValue: (row) => {
            if (isSparklineMeasure && itemData.getAxisNames().indexOf('Sparkline') !== -1) {
                let cellText = getSparklineCellText(row.getAxisPoint());
                return { displayValue: cellText, value: cellText };
            }
            return {
                displayValue: itemData.getSlice(row).getMeasureValue(measure.id).getDisplayText(),
                value: itemData.getSlice(row).getMeasureValue(measure.id).getValue()
            };
        },
        getGridColumn: () => {
            let dataField = !isSparklineMeasure ? measure.id : measure.id + sparklineColumnId;
            let caption = measure.name || measure.dataMember || measure.id;
            switch (measure.id) {
                case _date_filter_element_1.dateFilterElement.MinMeasureId:
                    caption += ' ' + _default_1.getLocalizationById('DashboardStringId.StartDate');
                    break;
                case _date_filter_element_1.dateFilterElement.MaxMeasureId:
                    caption += ' ' + _default_1.getLocalizationById('DashboardStringId.EndDate');
                    break;
            }
            return {
                dataField: dataField,
                caption: caption,
                calculateCellValue: (row) => row[dataField] && row[dataField].value
            };
        }
    };
}
function _createColumns(itemData, axes, args) {
    return axes
        .reduce((acc, axis) => {
        let distinctDimensions = _utils_1.distinct(itemData.getDimensions(axis), (dim1, dim2) => dataInspectorItemDataDimensionComparer(dim1, dim2, itemData));
        return acc.concat(distinctDimensions.map(dimension => _createDimensionColumnInfo(dimension, axis)));
    }, [])
        .concat(_utils_1.distinct(_inspected_data_colum_generator_1.getMeasureColumns(itemData), (m1, m2) => dataInspectorItemDataMeasureComparer(m1, m2, itemData, args.addSparklineTotal, args.sparklineMeasures))
        .reduce((acc, measure) => {
        let isSparklineMeasure = args.sparklineMeasures != null && args.sparklineMeasures.indexOf(measure.id) !== -1;
        acc.push(_createMeasureColumnInfo(itemData, measure, isSparklineMeasure));
        if (isSparklineMeasure && args.addSparklineTotal) {
            acc.push(_createMeasureColumnInfo(itemData, measure, false));
        }
        return acc;
    }, []));
}
function _createRows(itemData, axes) {
    if (axes.length) {
        return itemData
            .getAxis(axes[0])
            .getAvaliableLeafPoints()
            .reduce((acc, primaryAxisPoint) => {
            if (axes.length > 1) {
                acc = acc.concat(itemData
                    .getAxis(axes[1])
                    .getAvaliableLeafPoints()
                    .map(secondaryAxisPoint => new _item_data_tuple_1.itemDataTuple([primaryAxisPoint, secondaryAxisPoint])));
            }
            else {
                acc.push(new _item_data_tuple_1.itemDataTuple([primaryAxisPoint]));
            }
            return acc;
        }, []);
    }
    else {
        var defaultAxis = itemData.getAxisNames()[0];
        let axisPoints = defaultAxis ? [itemData.getAxis(defaultAxis).getRootPoint()] : [];
        return [new _item_data_tuple_1.itemDataTuple(axisPoints)];
    }
}
function generateAggregatedSource(itemData, args) {
    if (itemData && !itemData.isEmpty()) {
        let axes = _inspected_data_colum_generator_1.getSortedAxes(itemData, true);
        let columnsInfo = _createColumns(itemData, axes, args);
        let rows = _createRows(itemData, axes);
        const columnTypes = _inspected_data_colum_generator_1.getSortedAxes(itemData)
            .reduce((acc, axis) => acc.concat(itemData.getDimensions(axis).map(d => {
            return { id: d.id, dataType: d.dataType };
        })), []);
        return {
            columns: columnsInfo.map(columnInfo => columnInfo.getGridColumn()),
            customizeColumns: () => { },
            data: rows.map(row => {
                return columnsInfo.reduce((acc, columnInfo) => {
                    const currentTypeInfo = columnTypes.find(obj => {
                        return obj.id === columnInfo.getGridColumn().dataField;
                    });
                    acc[columnInfo.getGridColumn().dataField] = columnInfo.getValue(row);
                    if (currentTypeInfo && currentTypeInfo['dataType'] === 'Object')
                        acc[columnInfo.getGridColumn().dataField].displayValueAsImage = true;
                    return acc;
                }, {});
            })
        };
    }
    return {
        columns: [],
        customizeColumns: () => { },
        data: []
    };
}
exports.generateAggregatedSource = generateAggregatedSource;
function dataInspectorItemDataDimensionComparer(x, y, data) {
    return x.name === y.name
        && x.dataMember === y.dataMember
        && x.dateTimeGroupInterval === y.dateTimeGroupInterval
        && x.textGroupInterval === y.textGroupInterval
        && _utils_1.deepStrictEquals(data.getDimensionFormat(x.id), data.getDimensionFormat(y.id));
}
exports.dataInspectorItemDataDimensionComparer = dataInspectorItemDataDimensionComparer;
function dataInspectorItemDataMeasureComparer(x, y, data, addSparklineTotal, sparklineMeasures) {
    return x.name === y.name
        && x.dataMember == y.dataMember
        && (addSparklineTotal ||
            !sparklineMeasures || ((sparklineMeasures.indexOf(x.id) !== -1) === (sparklineMeasures.indexOf(y.id) !== -1)))
        && ((_utils_1.type.isDefined(data.getMeasureExpression(x.id)) || _utils_1.type.isDefined(data.getMeasureExpression(y.id))) ?
            (data.getMeasureExpression(x.id) === data.getMeasureExpression(y.id)) : (x.summaryType === y.summaryType))
        && _utils_1.deepStrictEquals(data.getMeasureCalculation(x.id), data.getMeasureCalculation(y.id))
        && _utils_1.deepStrictEquals(data.getMeasureWindowDefinition(x.id), data.getMeasureWindowDefinition(y.id))
        && _utils_1.deepStrictEquals(data.getMeasureFormat(x.id), data.getMeasureFormat(y.id));
}
exports.dataInspectorItemDataMeasureComparer = dataInspectorItemDataMeasureComparer;
