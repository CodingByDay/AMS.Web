﻿/**
* DevExpress Dashboard (_events-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWidgetOptionsEventArgs = exports.createWidgetEventArgs = exports.createItemInteractivityEventArgs = exports.createItemElementCustomColorEventArgs = exports.createItemSelectionChangedEventArgs = exports.createItemClickEventArgs = void 0;
require("devextreme/ui/widget/ui.widget");
const _item_data_tuple_1 = require("../../data/item-data/_item-data-tuple");
const chart_item_1 = require("../../model/items/chart/chart-item");
const data_dashboard_item_1 = require("../../model/items/data-dashboard-item");
const gauge_item_1 = require("../../model/items/gauge/gauge-item");
const grid_item_1 = require("../../model/items/grid/grid-item");
const item_widget_event_args_1 = require("./item-widget-event-args");
const createItemClickEventArgs = (dashboardItem, dataPoint, requestUnderlyingDataFunc) => {
    let itemData = dashboardItem._getItemData();
    const patchAxisName = (axisName) => {
        if (axisName === undefined)
            axisName = 'Default';
        return axisName;
    };
    const getAxis = (axisName) => {
        return itemData.getAxis(patchAxisName(axisName));
    };
    const getAxisPoint = (axisName) => {
        axisName = patchAxisName(axisName);
        return getAxis(axisName).getPointByUniqueValues(dataPoint.getValues(axisName));
    };
    return {
        itemName: dashboardItem.componentName(),
        dashboardItem: dashboardItem,
        getData: function () {
            return itemData;
        },
        getAxisPoint: getAxisPoint,
        getMeasures: () => {
            return itemData.getMeasuresByIds(dataPoint.getMeasureIds());
        },
        getDeltas: function () {
            var ids = dataPoint.getDeltaIds(), deltas = [];
            ids.forEach(id => {
                deltas.push(itemData.getDeltaById(id));
            });
            return deltas;
        },
        getDimensions: (axisName) => {
            return getAxis(axisName).getDimensions();
        },
        requestUnderlyingData: function (onCompleted, dataMembers) {
            var axisPoints = [];
            itemData.getAxisNames().forEach(axisName => {
                axisPoints.push(getAxisPoint(axisName));
            });
            requestUnderlyingDataFunc(dashboardItem.componentName(), {
                axisPoints: axisPoints,
                dataMembers: dataMembers
            }, onCompleted);
        }
    };
};
exports.createItemClickEventArgs = createItemClickEventArgs;
const createItemSelectionChangedEventArgs = (dashboardItem, tuples) => {
    return {
        itemName: dashboardItem.componentName(),
        dashboardItem: dashboardItem,
        getCurrentSelection: function () {
            let axisPointTuples = [];
            tuples.forEach(tuple => {
                axisPointTuples.push(dashboardItem._getItemData().createTuple(tuple));
            });
            return axisPointTuples;
        }
    };
};
exports.createItemSelectionChangedEventArgs = createItemSelectionChangedEventArgs;
const createItemElementCustomColorEventArgs = (dashboardItem, eventArgs) => {
    return {
        itemName: dashboardItem.componentName(),
        dashboardItem: dashboardItem,
        getTargetElement: function () {
            return new _item_data_tuple_1.itemDataTuple(eventArgs.targetElement);
        },
        getMeasures: function () {
            return dashboardItem._getItemData().getMeasuresByIds(eventArgs.measureIds);
        },
        getColor: function () {
            return eventArgs.color;
        },
        setColor: function (color) {
            eventArgs.color = color;
        }
    };
};
exports.createItemElementCustomColorEventArgs = createItemElementCustomColorEventArgs;
const createItemInteractivityEventArgs = (dashboardItem, interactivityOptions) => {
    return {
        itemName: dashboardItem.componentName(),
        dashboardItem: dashboardItem,
        getSelectionMode: function () { return interactivityOptions.selectionMode; },
        setSelectionMode: function (value) { interactivityOptions.selectionMode = value; },
        isHighlightingEnabled: function () { return interactivityOptions.hoverEnabled; },
        enableHighlighting: function (value) { interactivityOptions.hoverEnabled = value; },
        getTargetAxes: function () { return interactivityOptions.targetAxes; },
        setTargetAxes: function (value) { interactivityOptions.targetAxes = value; },
        getDefaultSelection: function () {
            let realTuples = [];
            interactivityOptions.defaultSelectedValues.forEach(tuple => {
                realTuples.push(dashboardItem._getItemData().createTuple(tuple));
            });
            return realTuples;
        },
        setDefaultSelection: function (realTuples) {
            let tuples = [], tuple;
            realTuples.forEach(realTuple => {
                tuple = [];
                interactivityOptions.targetAxes.forEach(axisName => {
                    tuple.push({
                        AxisName: axisName,
                        Value: realTuple.getAxisPoint(axisName).getUniquePath()
                    });
                });
                tuples.push(tuple);
            });
            interactivityOptions.defaultSelectedValues = tuples;
        }
    };
};
exports.createItemInteractivityEventArgs = createItemInteractivityEventArgs;
const createBaseWidgetEventArgs = (dashboardItem) => {
    var itemData = dashboardItem instanceof data_dashboard_item_1.DataDashboardItem ? dashboardItem._getItemData() : null;
    return {
        itemName: dashboardItem.componentName(),
        itemData: itemData,
        dashboardItem: dashboardItem,
        chartContext: dashboardItem instanceof chart_item_1.ChartItem ? new item_widget_event_args_1.ChartContext(dashboardItem) : null,
        gridContext: dashboardItem instanceof grid_item_1.GridItem ? new item_widget_event_args_1.GridContext(dashboardItem) : null,
        gaugeContext: dashboardItem instanceof gauge_item_1.GaugeItem ? new item_widget_event_args_1.GaugeContext(dashboardItem) : null
    };
};
const createWidgetEventArgs = (dashboardItem, widget) => {
    return Object.assign({ getWidget: function () { return widget; } }, createBaseWidgetEventArgs(dashboardItem));
};
exports.createWidgetEventArgs = createWidgetEventArgs;
const createWidgetOptionsEventArgs = (dashboardItem, options) => {
    return Object.assign({ options: options }, createBaseWidgetEventArgs(dashboardItem));
};
exports.createWidgetOptionsEventArgs = createWidgetOptionsEventArgs;
