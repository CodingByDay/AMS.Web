﻿/**
* DevExpress Dashboard (_custom-property-validation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomPropertyValueType = exports.validateCustomPropertyName = void 0;
const _helper_classes_1 = require("../internal/_helper-classes");
function validateCustomPropertyName(name) {
    if (!_helper_classes_1.isComponentNameValid(name))
        throw new Error(`The property name '${name}' is invalid. It should contain only letters, numbers, and the underscore symbol and cannot start with a number.`);
}
exports.validateCustomPropertyName = validateCustomPropertyName;
function validateCustomPropertyValueType(propertyName, value) {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && value !== null && value !== undefined)
        throw new Error(`The '${propertyName}' custom property value has incorrect type.`);
}
exports.validateCustomPropertyValueType = validateCustomPropertyValueType;
