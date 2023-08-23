﻿/**
* DevExpress Dashboard (parameter.js)
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
exports.Parameter = exports._getParametersQuery = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _date_utils_1 = require("../internal/_date-utils");
const _utils_1 = require("../internal/_utils");
const serializable_model_1 = require("../serializable-model");
const dynamic_list_lookup_settings_1 = require("./dynamic-list-lookup-settings");
const look_up_value_1 = require("./look-up-value");
const _parameter_1 = require("./metadata/_parameter");
const static_list_lookup_settings_1 = require("./static-list-lookup-settings");
const _parameters_helper_1 = require("./_parameters-helper");
function _getParametersQuery(parameters) {
    return parameters.map(p => {
        return {
            name: p.name(),
            value: _date_utils_1.toStringArray(p._actualValue()),
            type: p.type(),
            allowMultiselect: p.allowMultiselect(),
            selectAll: p.allowMultiselect() && p.selectAllValues() && p._actualValue() === Parameter.SelectAllValue
        };
    });
}
exports._getParametersQuery = _getParametersQuery;
class Parameter extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer(), _allParameters) {
        super(modelJson, serializer);
        this._allParameters = _allParameters;
        this.lookUpSourceType = ko.observable('None');
        this.staticListLookUpSettings = ko.observable(null);
        this.dynamicListLookUpSettings = ko.observable(null);
        this._paramDialogValue = ko.observable();
        this._value = ko.computed({
            read: () => this._paramDialogValue(),
            write: val => this._paramDialogValue(val)
        });
        this.defaultValues = analytics_utils_1.deserializeArray(modelJson.Values, (item) => new look_up_value_1.LookUpValue(item, serializer));
        this._valuesOfDefaultValues = ko.computed(() => {
            return this.defaultValues() && this.defaultValues().map(val => val.value()) || null;
        });
        if (this._type()) {
            var typeParts = this._type().split(',');
            if (typeParts.length > 1) {
                this._type(typeParts[0]);
            }
        }
        this.type = ko.pureComputed({
            read: () => {
                return this._type();
            },
            write: (val) => {
                var oldVal = this._type();
                if (val !== oldVal) {
                    this._value(undefined);
                    if (this.staticListLookUpSettings()) {
                        this.staticListLookUpSettings()._updateValuesType(val);
                    }
                    this._type(val);
                    if (val === 'System.DateTime') {
                        this.defaultValue(_parameters_helper_1.ParameterHelper.getDefaultTypeValue(val));
                    }
                    else {
                        this.defaultValue(_parameters_helper_1.ParameterHelper.convertSingleValue(this.defaultValue(), val, this.allowNull()));
                    }
                }
            }
        });
        this.defaultValue(_parameters_helper_1.ParameterHelper.convertSingleValue(this.defaultValue(), this.type(), this.allowNull()));
        if (modelJson.hasOwnProperty(static_list_lookup_settings_1.StaticListLookUpSettings.modelName)) {
            this.staticListLookUpSettings(new static_list_lookup_settings_1.StaticListLookUpSettings(modelJson[static_list_lookup_settings_1.StaticListLookUpSettings.modelName], serializer));
            delete this['_model'][static_list_lookup_settings_1.StaticListLookUpSettings.modelName];
            this.staticListLookUpSettings()._updateValuesType(this.type());
            this.lookUpSourceType('StaticListLookUpSettings');
        }
        else if (modelJson.hasOwnProperty(dynamic_list_lookup_settings_1.DynamicListLookUpSettings.modelName)) {
            this.dynamicListLookUpSettings(new dynamic_list_lookup_settings_1.DynamicListLookUpSettings(modelJson[dynamic_list_lookup_settings_1.DynamicListLookUpSettings.modelName], serializer));
            delete this['_model'][dynamic_list_lookup_settings_1.DynamicListLookUpSettings.modelName];
            this.lookUpSourceType('DynamicListLookUpSettings');
        }
        else {
            this.lookUpSourceType('None');
        }
        this.lookUpSourceType = ko.computed({
            read: () => {
                if (!!this.staticListLookUpSettings()) {
                    return 'StaticListLookUpSettings';
                }
                else if (this.dynamicListLookUpSettings()) {
                    return 'DynamicListLookUpSettings';
                }
                else {
                    return 'None';
                }
            },
            write: (val) => {
                switch (val) {
                    case 'StaticListLookUpSettings':
                        this.staticListLookUpSettings(new static_list_lookup_settings_1.StaticListLookUpSettings());
                        this.dynamicListLookUpSettings(null);
                        this._resetDefaultValues();
                        break;
                    case 'DynamicListLookUpSettings':
                        this.staticListLookUpSettings(null);
                        this.dynamicListLookUpSettings(new dynamic_list_lookup_settings_1.DynamicListLookUpSettings());
                        this._resetDefaultValues();
                        break;
                    default:
                        this.staticListLookUpSettings(null);
                        this.dynamicListLookUpSettings(null);
                        this._resetDefaultValues();
                        this.allowMultiselect(false);
                        this.selectAllValues(false);
                        break;
                }
            }
        });
        this._actualValue = ko.computed(() => {
            if ((!this.allowNull() && (this._value() === null || this._value() === undefined)) ||
                (this.allowNull() && this._value() === undefined)) {
                if (this.allowMultiselect()) {
                    if (this.selectAllValues()) {
                        if (!!this.staticListLookUpSettings()) {
                            return this.staticListLookUpSettings().values().map(val => val.value());
                        }
                        else if (!!this.dynamicListLookUpSettings()) {
                            return Parameter.SelectAllValue;
                        }
                    }
                    return this._valuesOfDefaultValues();
                }
                return this.defaultValue();
            }
            return this._value();
        });
        this.containsDisplayMember = ko.computed(() => {
            return !!this.dynamicListLookUpSettings();
        });
        this.defaultValue.subscribe(newDefaultValue => {
            if (!this.allowMultiselect()) {
                this._value(this.defaultValue());
            }
        });
        ko.computed(() => {
            if (this.allowMultiselect()) {
                if (this.selectAllValues()) {
                    this._value(undefined);
                }
                else {
                    this._value(this._valuesOfDefaultValues());
                }
            }
            else {
                this._value(this.defaultValue());
            }
        });
        this.allowMultiselect.subscribe(newAllowMultiselect => {
            if (!newAllowMultiselect) {
                this.selectAllValues(false);
            }
            this._resetDefaultValues();
        });
        this.selectAllValues.subscribe(_ => {
            this._resetDefaultValues();
        });
    }
    _patchSerializationsInfo(infos, propertyName, action) {
        var property = (infos.filter((prop) => { return prop.propertyName === propertyName; })[0]);
        if (!!property) {
            action(property);
        }
    }
    getInfo() {
        var info = _jquery_helpers_1.deepExtend([], _parameter_1.dashboardParameterSerializationsInfo);
        if (this.type) {
            this._patchSerializationsInfo(info, _parameter_1.defaultValue.propertyName, (prop) => { prop.defaultVal = _parameters_helper_1.ParameterHelper.getDefaultTypeValue(this.type()); });
        }
        if (this.staticListLookUpSettings && !!this.staticListLookUpSettings()) {
            this._patchSerializationsInfo(info, static_list_lookup_settings_1._staticListLookUpSettingsSerializationInfo.propertyName, (prop) => { prop.modelName = static_list_lookup_settings_1.StaticListLookUpSettings.modelName; });
        }
        if (this.staticListLookUpSettings && !!this.dynamicListLookUpSettings()) {
            this._patchSerializationsInfo(info, dynamic_list_lookup_settings_1._dynamicListLookUpSettingsSerializationInfo.propertyName, (prop) => { prop.modelName = dynamic_list_lookup_settings_1.DynamicListLookUpSettings.modelName; });
        }
        return info;
    }
    _resetDefaultValues() {
        this.defaultValue(_parameters_helper_1.ParameterHelper.convertSingleValue(null, this.type(), this.allowNull()));
        this.defaultValues(this.allowNull() ? null : []);
    }
    grabFrom(another) {
        this.name(another.name.peek());
        this._type(another._type.peek());
        this.allowNull(another.allowNull.peek());
        this.parameterVisible(another.parameterVisible.peek());
        this.description(another.description.peek());
        this.defaultValue(another.defaultValue.peek());
        this.allowMultiselect(another.allowMultiselect.peek());
        this.defaultValues(another.defaultValues.peek());
        this.selectAllValues(another.selectAllValues.peek());
        this.staticListLookUpSettings(another.staticListLookUpSettings.peek());
        this.dynamicListLookUpSettings(another.dynamicListLookUpSettings.peek());
    }
    _getDefaultItemType() {
        return 'Parameter';
    }
}
Parameter.SelectAllValue = '7BD68C11-DC21-4571-8EF6-AAB6E15355EF';
__decorate([
    _utils_1.collectionItemType('Value')
], Parameter.prototype, "defaultValues", void 0);
exports.Parameter = Parameter;
