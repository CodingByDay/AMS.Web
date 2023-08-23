﻿/**
* DevExpress Dashboard (_custom-properties-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomPropertiesSerializationInfo = exports._getCustomPropertiesSerializationInfoCore = void 0;
const _base_metadata_1 = require("../metadata/_base-metadata");
const custom_properties_1 = require("./custom-properties");
const custom_properties_metadata_1 = require("./custom-properties-metadata");
function _convertCustomPropertiesMetadata(customPropertiesMeta) {
    return (customPropertiesMeta || [])
        .map(d => {
        var serializationInfo = {
            propertyName: d.propertyName,
            modelName: d.propertyName,
            category: _base_metadata_1.PropertyCategory.ViewModel,
            defaultVal: d.defaultValue,
        };
        if (d.valueType === 'boolean') {
            serializationInfo.from = _base_metadata_1.parseBool;
        }
        if (d.valueType === 'number') {
            serializationInfo.from = _base_metadata_1.floatFromModel;
        }
        return serializationInfo;
    });
}
function _getCustomPropertiesSerializationInfoCore(customPropertiesMeta) {
    return {
        propertyName: 'customProperties',
        modelName: 'CustomProperties',
        category: _base_metadata_1.PropertyCategory.ViewModel,
        type: custom_properties_1.CustomProperties,
        info: _convertCustomPropertiesMetadata(customPropertiesMeta)
    };
}
exports._getCustomPropertiesSerializationInfoCore = _getCustomPropertiesSerializationInfoCore;
function getCustomPropertiesSerializationInfo(owner) {
    const filteredCustomProperties = custom_properties_metadata_1._customPropertiesMeta
        .filter(metadata => owner instanceof metadata.ownerType);
    return _getCustomPropertiesSerializationInfoCore(filteredCustomProperties);
}
exports.getCustomPropertiesSerializationInfo = getCustomPropertiesSerializationInfo;
