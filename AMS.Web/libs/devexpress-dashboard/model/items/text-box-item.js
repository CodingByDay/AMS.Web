﻿/**
* DevExpress Dashboard (text-box-item.js)
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
exports.TextBoxItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../data-item/data-item");
const _utils_1 = require("../internal/_utils");
const serializable_model_1 = require("../serializable-model");
const data_dashboard_item_1 = require("./data-dashboard-item");
const _text_box_item_1 = require("./metadata/_text-box-item");
class TextBoxItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.values = ko.observableArray([]);
        this.__values = analytics_utils_1.deserializeArray(dashboardItemJSON.Values, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_text_box_item_1.textBoxValues);
        this.__values.subscribe((links) => {
            this._setLinkCollectionAcceptableShapingType(links, data_item_1.AcceptableShapingType.String);
        });
        this._setLinkCollectionAcceptableShapingType(this.__values(), data_item_1.AcceptableShapingType.String);
        this._supportedUIStates(['error', 'loading']);
    }
    _clearBindings() {
        super._clearBindings();
        this.__values.removeAll();
    }
    _getInfoCore() {
        return _text_box_item_1.textBoxDashboardItemSerializationsInfo;
    }
    _isCalculationSupported() {
        return false;
    }
    _getDefaultItemType() {
        return 'TextBox';
    }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getIsVisualInteractivitySupported() { return false; }
}
__decorate([
    _utils_1.collectionItemType('Value')
], TextBoxItem.prototype, "__values", void 0);
exports.TextBoxItem = TextBoxItem;
serializable_model_1.itemTypesMap['TextBox'] = { type: TextBoxItem, groupName: 'common', title: 'DashboardStringId.DefaultNameTextBoxItem', index: 80 };
