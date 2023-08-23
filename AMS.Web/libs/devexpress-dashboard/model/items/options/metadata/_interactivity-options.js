﻿/**
* DevExpress Dashboard (_interactivity-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInteractivityOptionsPropertyInfo = exports.commonInteractivityOptions = exports.targetDimensions = exports.isDrillDownEnabled = exports.masterFilterMode = exports.isMasterFilterDefaultTrue = exports.isMasterFilterDefaultFalse = exports.ignoreMasterFiltersDefaultTrue = exports.ignoreMasterFiltersDefaultFalse = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.ignoreMasterFiltersDefaultFalse = { propertyName: 'ignoreMasterFilters', modelName: '@IgnoreMasterFilters', displayName: 'DashboardWebStringId.InteractivityOptions.IgnoreMasterFilters', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.Interactivity };
exports.ignoreMasterFiltersDefaultTrue = { propertyName: 'ignoreMasterFilters', modelName: '@IgnoreMasterFilters', displayName: 'DashboardWebStringId.InteractivityOptions.IgnoreMasterFilters', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.Interactivity };
exports.isMasterFilterDefaultFalse = { propertyName: 'isMasterFilter', modelName: '@IsMasterFilter', displayName: 'DashboardWebStringId.InteractivityOptions.IsMasterFilter', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.isMasterFilterDefaultTrue = { propertyName: 'isMasterFilter', modelName: '@IsMasterFilter', displayName: 'DashboardWebStringId.InteractivityOptions.IsMasterFilter', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.masterFilterMode = {
    propertyName: 'masterFilterMode', modelName: '@MasterFilterMode', displayName: 'DashboardWebStringId.MasterFilterMode', defaultVal: 'None', simpleFormAdapterItem: 'buttonGroupEditor', category: _base_metadata_1.PropertyCategory.Interactivity, values: {
        'None': 'DashboardWebStringId.InteractivityOptions.MasterFilterMode.None',
        'Single': 'DashboardWebStringId.InteractivityOptions.MasterFilterMode.Single',
        'Multiple': 'DashboardWebStringId.InteractivityOptions.MasterFilterMode.Multiple'
    }
};
exports.isDrillDownEnabled = { propertyName: 'isDrillDownEnabled', modelName: '@IsDrillDownEnabled', displayName: 'DashboardWebStringId.InteractivityOptions.DrillDown', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.Data };
exports.targetDimensions = {
    propertyName: 'targetDimensions', modelName: '@TargetDimensions', displayName: 'DashboardWebStringId.InteractivityOptions.TargetDimensions', defaultVal: 'Arguments', simpleFormAdapterItem: 'buttonGroupEditor', category: _base_metadata_1.PropertyCategory.Interactivity,
    values: {
        'Arguments': 'DashboardWebStringId.InteractivityOptions.TargetDimensions.Arguments',
        'Series': 'DashboardWebStringId.InteractivityOptions.TargetDimensions.Series',
        'Points': 'DashboardWebStringId.InteractivityOptions.TargetDimensions.Points'
    }
};
exports.commonInteractivityOptions = { propertyName: 'interactivityOptions', modelName: 'InteractivityOptions', displayName: 'DashboardWebStringId.InteractivityOptions' };
function getInteractivityOptionsPropertyInfo(type) { return Object.assign({ type: type }, exports.commonInteractivityOptions); }
exports.getInteractivityOptionsPropertyInfo = getInteractivityOptionsPropertyInfo;
