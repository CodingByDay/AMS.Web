﻿/**
* DevExpress Dashboard (_factory.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDataControllerFactory = exports.DataControllerFactory = void 0;
const _viewer_item_types_1 = require("../viewer-parts/_viewer-item-types");
const _bubble_map_data_controller_1 = require("./data-controllers/_bubble-map-data-controller");
const _card_data_controller_1 = require("./data-controllers/_card-data-controller");
const _chart_data_controller_1 = require("./data-controllers/_chart-data-controller");
const _choropleth_map_data_controller_1 = require("./data-controllers/_choropleth-map-data-controller");
const _filter_element_data_controller_1 = require("./data-controllers/_filter-element-data-controller");
const _gauge_data_controller_1 = require("./data-controllers/_gauge-data-controller");
const _geo_point_map_data_controller_1 = require("./data-controllers/_geo-point-map-data-controller");
const _grid_data_controller_1 = require("./data-controllers/_grid-data-controller");
const _image_data_controller_1 = require("./data-controllers/_image-data-controller");
const _pie_data_controller_1 = require("./data-controllers/_pie-data-controller");
const _pie_map_data_controller_1 = require("./data-controllers/_pie-map-data-controller");
const _pivot_data_controller_1 = require("./data-controllers/_pivot-data-controller");
const _range_filter_data_controller_1 = require("./data-controllers/_range-filter-data-controller");
const _scatter_chart_data_controller_1 = require("./data-controllers/_scatter-chart-data-controller");
const _text_item_data_controller_1 = require("./data-controllers/_text-item-data-controller");
const _treemap_data_controller_1 = require("./data-controllers/_treemap-data-controller");
class DataControllerFactory {
    createDataController(type, options) {
        switch (type) {
            case _viewer_item_types_1.types.rangeFilter:
                return new _range_filter_data_controller_1.rangeFilterDataController(options);
            case _viewer_item_types_1.types.chart:
                return new _chart_data_controller_1.chartDataController(options);
            case _viewer_item_types_1.types.scatter:
                return new _scatter_chart_data_controller_1.scatterChartDataController(options);
            case _viewer_item_types_1.types.pie:
                return new _pie_data_controller_1.pieDataController(options);
            case _viewer_item_types_1.types.pivot:
                return new _pivot_data_controller_1.pivotDataController(options);
            case _viewer_item_types_1.types.choroplethMap:
                return new _choropleth_map_data_controller_1.choroplethMapDataController(options);
            case _viewer_item_types_1.types.grid:
                return new _grid_data_controller_1.gridDataController(options);
            case _viewer_item_types_1.types.card:
                return new _card_data_controller_1.cardDataController(options);
            case _viewer_item_types_1.types.gauge:
                return new _gauge_data_controller_1.gaugeDataController(options);
            case _viewer_item_types_1.types.geoPointMap:
                return new _geo_point_map_data_controller_1.geoPointMapDataController(options);
            case _viewer_item_types_1.types.bubbleMap:
                return new _bubble_map_data_controller_1.bubbleMapDataController(options);
            case _viewer_item_types_1.types.pieMap:
                return new _pie_map_data_controller_1.pieMapDataController(options);
            case _viewer_item_types_1.types.comboBox:
            case _viewer_item_types_1.types.listBox:
                return new _filter_element_data_controller_1.listViewDataController(options);
            case _viewer_item_types_1.types.treeView:
                return new _filter_element_data_controller_1.treeViewDataController(options);
            case _viewer_item_types_1.types.boundImage:
                return new _image_data_controller_1.imageDataController(options);
            case _viewer_item_types_1.types.text:
                return new _text_item_data_controller_1.textItemDataController(options);
            case _viewer_item_types_1.types.treemap:
                return new _treemap_data_controller_1.treemapDataController(options);
            default:
                return undefined;
        }
    }
}
exports.DataControllerFactory = DataControllerFactory;
exports.defaultDataControllerFactory = new DataControllerFactory();
