﻿/**
* DevExpress Dashboard (chart-item-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartItemBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const item_data_axis_names_1 = require("../../data/item-data/item-data-axis-names");
const _item_data_tuple_1 = require("../../data/item-data/_item-data-tuple");
const data_item_1 = require("../data-item/data-item");
const _knockout_utils_1 = require("../internal/_knockout-utils");
const _utils_1 = require("../internal/_utils");
const _base_metadata_1 = require("../metadata/_base-metadata");
const data_dashboard_item_1 = require("./data-dashboard-item");
const _chart_item_base_1 = require("./metadata/_chart-item-base");
const series_item_1 = require("./series-item");
class ChartItemBase extends series_item_1.SeriesItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.__arguments = ko.observableArray([]);
        this.arguments = ko.observableArray([]);
        this.__arguments(analytics_utils_1.deserializeArray(dashboardItemJSON.Arguments, (item) => new data_item_1.DataItemLink(this, item, serializer))());
        this._subscribeDataItemLinkArrays(_chart_item_base_1.chartArgumentsMeta);
        _knockout_utils_1.subscribeAndPerform(this.__seriesDimensions, newValue => {
            data_dashboard_item_1.DataDashboardItem._addColoringMeta(newValue);
        });
        _knockout_utils_1.subscribeAndPerform(this.__arguments, newValue => {
            data_dashboard_item_1.DataDashboardItem._addColoringMeta(newValue);
        });
    }
    _getInfoCore() {
        return _chart_item_base_1.chartItemBaseSerializationsInfo;
    }
    _clearBindings() {
        super._clearBindings();
        this.__arguments.removeAll();
    }
    _getInteractivityDimensionLinks() {
        var targetDimensions = this._getTargetDimensions();
        if (targetDimensions) {
            if (targetDimensions === 'Arguments') {
                return this.__arguments();
            }
            else if (targetDimensions === 'Points') {
                return this.__arguments().concat(this.__seriesDimensions());
            }
        }
        return super._getInteractivityDimensionLinks();
    }
    _getTargetDimensions() {
        return 'Arguments';
    }
    _getItemDataAxis() {
        if (this.interactivityOptions.targetDimensions() === 'Series') {
            return item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis;
        }
        else if (this.interactivityOptions.targetDimensions() === 'Arguments') {
            return item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis;
        }
        else if (this.interactivityOptions.targetDimensions() === 'Points') {
            return item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis;
        }
        else {
            throw Error('Unsupported interactivity type');
        }
    }
    _getCurrentFilterValues() {
        var that = this, data = that._getItemData(), argumentNames = that.arguments().map(dim => dim.uniqueName()), seriesNames = that.seriesDimensions().map(dim => dim.uniqueName()), selectedValues = that._getSelectedValuesByItemName();
        if (!data)
            return;
        if (this.interactivityOptions.targetDimensions() === 'Arguments') {
            return data && data.getCurrentFilterValues(argumentNames, item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis, selectedValues);
        }
        else if (this.interactivityOptions.targetDimensions() === 'Series') {
            return data.getCurrentFilterValues(seriesNames, item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis, selectedValues);
        }
        else if (this.interactivityOptions.targetDimensions() === 'Points') {
            var argumentPoints = data.getCurrentFilterValues(that.arguments().map(dim => dim.uniqueName()), item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis, selectedValues.map(val => [val[0]]));
            var seriesPoints = data.getCurrentFilterValues(that.seriesDimensions().map(dim => dim.uniqueName()), item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis, selectedValues.map(val => [val[1]]));
            var tuples = [];
            argumentPoints.forEach(function (arg, index) {
                tuples.push(new _item_data_tuple_1.itemDataTuple([arg.getAxisPoint(item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis), seriesPoints[index].getAxisPoint(item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis)]));
            });
            return tuples;
        }
    }
    _itemInteractivityByColumnAxis() {
        return this.interactivityOptions.targetDimensions() === 'Arguments';
    }
    _getInteractivityAxisDimensionCount() {
        return this._itemInteractivityByColumnAxis() ? this.arguments().length : this.seriesDimensions().length;
    }
    _getCanColorByMeasures() { return true; }
    _getCanColorByDimensions() { return true; }
    _getColorizableDataItemsInfo() {
        return [{
                items: this.__arguments(),
                prefixId: _base_metadata_1.BindingSectionTitles.Arguments
            }, {
                items: this.__seriesDimensions(),
                prefixId: _base_metadata_1.BindingSectionTitles.SeriesDimension
            }];
    }
}
__decorate([
    _utils_1.collectionItemType('Argument')
], ChartItemBase.prototype, "__arguments", void 0);
exports.ChartItemBase = ChartItemBase;
