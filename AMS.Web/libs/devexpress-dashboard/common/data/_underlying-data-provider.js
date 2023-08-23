﻿/**
* DevExpress Dashboard (_underlying-data-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnderlyingDataProvider = void 0;
const string_1 = require("devextreme/core/utils/string");
const _default_1 = require("../../data/localization/_default");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _date_utils_1 = require("../../model/internal/_date-utils");
class UnderlyingDataProvider {
    constructor(_serviceClient) {
        this._serviceClient = _serviceClient;
    }
    _getValidDataQueryParamsValues(values, dataDashboardItem) {
        var itemQueryParams = _jquery_helpers_1.deepExtend({}, dataDashboardItem._getDataQueryParams());
        if (itemQueryParams.DrillDown) {
            var drillDownLen = itemQueryParams.DrillDown.length;
            var columnValuesLen = values.length;
            var visibleDimensionsCount = dataDashboardItem._getInteractivityAxisDimensionCount();
            var notInteractivityDimensionsCount = visibleDimensionsCount - dataDashboardItem._interactivityDimensions.length;
            var interactivityColumnsValues = columnValuesLen - notInteractivityDimensionsCount;
            if (drillDownLen > 0) {
                var stateToModelDiff = interactivityColumnsValues - drillDownLen - 1;
                if (stateToModelDiff < 0) {
                    itemQueryParams.DrillDown.splice(stateToModelDiff);
                }
            }
        }
        return itemQueryParams;
    }
    _getUnderlyingDataArgsAxisPoints(data, args) {
        var axisNames = data.getAxisNames(), axisPoints = args.axisPoints;
        if (!axisPoints) {
            axisPoints = [];
            axisNames.forEach(axisName => {
                var axis = data.getAxis(axisName), axisPoint = undefined;
                if (args.uniqueValuesByAxisName) {
                    var axisValues = args.uniqueValuesByAxisName[axisName];
                    if (axisValues)
                        axisPoint = axis.getPointByUniqueValues(axisValues.map(_utils_1.unwrapSpecialNullValue));
                }
                if (args.valuesByAxisName) {
                    var axisValues = args.valuesByAxisName[axisName];
                    if (axisValues)
                        axisPoint = axis.getPointByValues(axisValues.map(_utils_1.unwrapSpecialNullValue));
                }
                if (!axisPoint)
                    axisPoint = axis.getRootPoint();
                axisPoints.push(axisPoint);
            });
        }
        axisNames.forEach(axisName => {
            var points = axisPoints.map(axisPoint => {
                return axisPoint.getAxisName() === axisName;
            });
            if (points.length == 0) {
                axisPoints.push(data.getAxis(axisName).getRootPoint());
            }
        });
        return axisPoints;
    }
    requestUnderlyingData(dataDashboardItem, args) {
        let itemDataManager = dataDashboardItem._dataManager();
        if (!_utils_1.type.isDefined(itemDataManager))
            throw Error(string_1.format(_default_1.getLocalizationById('DashboardWebStringId.Notification.UnderlyingRequestDataNotLoaded'), dataDashboardItem.name()));
        var metaData = itemDataManager.getMetaData(), axisPoints = this._getUnderlyingDataArgsAxisPoints(dataDashboardItem._getItemData(), args), columnNames = args.dataMembers, pivotAreaValues = {};
        axisPoints.forEach((axisPoint) => {
            var name = axisPoint.getAxisName();
            pivotAreaValues[metaData.getPivotAreaByAxisName(name)] = _date_utils_1.toStringArray(axisPoint.getUniquePath());
        });
        var isInteractivityByColumns = dataDashboardItem._itemInteractivityByColumnAxis();
        var columnValues = pivotAreaValues['Columns'];
        var rowValues = pivotAreaValues['Rows'];
        var itemQueryParams = this._getValidDataQueryParamsValues(isInteractivityByColumns ? columnValues : rowValues, dataDashboardItem);
        let promise = this._serviceClient.getUnderlyingData(dataDashboardItem.componentName(), columnValues, rowValues, columnNames, itemQueryParams);
        return promise.then((data) => {
            data.Data = data.Data.map(row => row = row.map(value => _date_utils_1.tryConvertToDateTime(value)));
            return data;
        });
    }
}
exports.UnderlyingDataProvider = UnderlyingDataProvider;
