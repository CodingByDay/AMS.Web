﻿/**
* DevExpress Dashboard (static-list-lookup-settings.js)
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
exports._staticListLookUpSettingsSerializationInfo = exports.StaticListLookUpSettings = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _utils_1 = require("../internal/_utils");
const serializable_model_1 = require("../serializable-model");
const look_up_value_1 = require("./look-up-value");
const _static_list_lookup_settings_1 = require("./metadata/_static-list-lookup-settings");
const _parameters_helper_1 = require("./_parameters-helper");
class StaticListLookUpSettings extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._valueType = ko.observable();
        this.values = analytics_utils_1.deserializeArray(modelJson.Values, (item) => new look_up_value_1.LookUpValue(item, serializer));
    }
    getInfo() {
        return _static_list_lookup_settings_1.staticListLookUpSettingsSerializationsInfo;
    }
    _updateValuesType(newType) {
        this._valueType(newType);
        if (this.values() && this.values().length > 0) {
            this.values().forEach((lookUpValue) => {
                lookUpValue.valueType(newType);
                lookUpValue.value(_parameters_helper_1.ParameterHelper.convertSingleValue(lookUpValue.value(), newType));
            });
        }
    }
}
StaticListLookUpSettings.modelName = 'StaticListLookUpSettings';
__decorate([
    _utils_1.collectionItemType('Value')
], StaticListLookUpSettings.prototype, "values", void 0);
exports.StaticListLookUpSettings = StaticListLookUpSettings;
exports._staticListLookUpSettingsSerializationInfo = { propertyName: 'staticListLookUpSettings', displayName: 'DashboardWebStringId.Parameters.StaticListLookUpSettings', type: StaticListLookUpSettings, defaultVal: null, alwaysSerialize: true };
