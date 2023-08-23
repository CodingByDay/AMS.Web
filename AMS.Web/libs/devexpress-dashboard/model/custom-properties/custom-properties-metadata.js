﻿/**
* DevExpress Dashboard (custom-properties-metadata.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._customMetadataContainsProperty = exports._customPropertiesMeta = exports._clearCustomPropertiesMeta = exports.registerCustomProperty = void 0;
const _custom_property_validation_1 = require("./_custom-property-validation");
function registerCustomProperty(meta) {
    if (exports._customPropertiesMeta.filter(existingMeta => existingMeta.ownerType === meta.ownerType && existingMeta.propertyName === meta.propertyName)[0]) {
        throw new Error('Duplicated CustomPropertiesMeta');
    }
    _custom_property_validation_1.validateCustomPropertyName(meta.propertyName);
    exports._customPropertiesMeta.push(meta);
}
exports.registerCustomProperty = registerCustomProperty;
function _clearCustomPropertiesMeta() {
    exports._customPropertiesMeta = [];
}
exports._clearCustomPropertiesMeta = _clearCustomPropertiesMeta;
exports._customPropertiesMeta = [];
function _customMetadataContainsProperty(propertyName) {
    return !!(exports._customPropertiesMeta.filter(c => c.propertyName === propertyName)[0]);
}
exports._customMetadataContainsProperty = _customMetadataContainsProperty;
