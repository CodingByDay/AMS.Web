﻿/**
* DevExpress Dashboard (card-item.js)
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
exports.CardItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const card_calc_window_definition_1 = require("../../data-item/window-definition/card-calc-window-definition");
const _utils_1 = require("../../internal/_utils");
const serializable_model_1 = require("../../serializable-model");
const kpi_item_1 = require("../kpi/kpi-item");
const card_1 = require("./card");
const _card_item_1 = require("./metadata/_card-item");
class CardItem extends kpi_item_1.KpiItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.cards = analytics_utils_1.deserializeArray(modelJson.Cards, (item) => new card_1.Card(this, item, serializer));
        this._attachDataItem(this, _card_item_1.cardSparklineArgument.propertyName);
    }
    _getInfoCore() {
        return _card_item_1.cardDashboardItemSerializationsInfo;
    }
    _clearBindings() {
        super._clearBindings();
        this.cards.removeAll();
    }
    _getDefaultItemType() {
        return 'Card';
    }
    _getLayersCount() {
        return !!this.__seriesDimensions && this.__seriesDimensions().length > 0 ? this.cards().length : 0;
    }
    _getLayerName() {
        return this._getDataItemContainerDisplayName(this.cards()[this._selectedElementIndex() || 0]);
    }
    _getDefaultCalculationWindowDefinition() {
        return new card_calc_window_definition_1.CardWindowDefinition();
    }
    _itemInteractivityByColumnAxis() {
        return false;
    }
    _getInteractivityAxisDimensionCount() {
        return this.seriesDimensions().length;
    }
    _conditionFormattingExpressionEditorFilter(dataItem) {
        let isHiddenMeasure = this.hiddenMeasures().filter(hm => hm.uniqueName() === dataItem.uniqueName()).length > 0;
        let isSeriesDimension = this.seriesDimensions().filter(sd => sd.uniqueName() === dataItem.uniqueName()).length > 0;
        return isHiddenMeasure || isSeriesDimension;
    }
}
__decorate([
    _utils_1.collectionItemType('Card')
], CardItem.prototype, "cards", void 0);
exports.CardItem = CardItem;
serializable_model_1.itemTypesMap['Card'] = { type: CardItem, groupName: 'common', title: 'DashboardStringId.DefaultNameCardItem', index: 60 };
