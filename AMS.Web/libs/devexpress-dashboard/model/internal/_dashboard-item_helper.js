﻿/**
* DevExpress Dashboard (_dashboard-item_helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemJson = exports.getItemTitle = exports.getItemIconName = exports.getIconName = void 0;
const _default_1 = require("../../data/localization/_default");
const custom_item_1 = require("../items/custom-item/custom-item");
const serializable_model_1 = require("../serializable-model");
function getIconName(typeName, icon) {
    var getCamelType = s => s[0].toLowerCase() + s.substr(1, s.length);
    return icon || 'dx-dashboard-toolbox-' + getCamelType(typeName);
}
exports.getIconName = getIconName;
function getItemIconName(item) {
    var icon = item instanceof custom_item_1.CustomItem ? serializable_model_1.itemTypesMap[item.customItemType()].icon : undefined;
    return getIconName(item.itemType(), icon);
}
exports.getItemIconName = getItemIconName;
function getItemTitle(item) {
    var itemType = item instanceof custom_item_1.CustomItem ? item.customItemType() : item.itemType();
    var info = serializable_model_1.itemTypesMap[itemType];
    return !!info.title ? _default_1.getLocalizationById(info.title) : itemType;
}
exports.getItemTitle = getItemTitle;
function getItemJson(itemType) {
    var itemTypeDescription = serializable_model_1.itemTypesMap[itemType];
    return {
        '@ItemType': !!itemTypeDescription.customItemType ? custom_item_1.CustomItem.ItemType : itemType,
        '@CustomItemType': !!itemTypeDescription.customItemType ? itemType : undefined
    };
}
exports.getItemJson = getItemJson;
