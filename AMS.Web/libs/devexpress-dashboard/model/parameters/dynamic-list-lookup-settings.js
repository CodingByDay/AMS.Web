﻿/**
* DevExpress Dashboard (dynamic-list-lookup-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._dynamicListLookUpSettingsSerializationInfo = exports.DynamicListLookUpSettings = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../serializable-model");
const _dynamic_list_lookup_settings_1 = require("./metadata/_dynamic-list-lookup-settings");
class DynamicListLookUpSettings extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        let clearMembers = () => {
            this.valueMemberName(null);
            this.displayMemberName(null);
            this.sortByMember(null);
        };
        this._dataSource = ko.computed({
            read: () => {
                return this.dataSource();
            },
            write: (val) => {
                this.dataMember(null);
                clearMembers();
                this.dataSource(val);
            }
        });
        this._dataMember = ko.computed({
            read: () => {
                return this.dataMember();
            },
            write: (val) => {
                clearMembers();
                this.dataMember(val);
            }
        });
    }
    getInfo() {
        return _dynamic_list_lookup_settings_1.dynamicListLookUpSettingsSerializationsInfo;
    }
    equals(target) {
        return this.dataMember() === target.dataMember() &&
            this.dataSource() === target.dataSource() &&
            this.valueMemberName() === target.valueMemberName() &&
            this.displayMemberName() === target.displayMemberName() &&
            this.sortByMember() === target.sortByMember() &&
            this.sortOrder() === target.sortOrder();
    }
    isPropertyDisabled(propertyName) {
        if (propertyName === _dynamic_list_lookup_settings_1.sortOrder.propertyName) {
            return !this.sortByMember();
        }
        return false;
    }
}
exports.DynamicListLookUpSettings = DynamicListLookUpSettings;
DynamicListLookUpSettings.modelName = 'DynamicListLookUpSettings';
exports._dynamicListLookUpSettingsSerializationInfo = { propertyName: 'dynamicListLookUpSettings', displayName: 'DashboardWebStringId.Parameters.DynamicListLookUpSettings', type: DynamicListLookUpSettings, defaultVal: null, alwaysSerialize: true };
