﻿/**
* DevExpress Dashboard (custom-properties.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomProperties = void 0;
const serializable_model_1 = require("../serializable-model");
const _custom_property_validation_1 = require("./_custom-property-validation");
class CustomProperties extends serializable_model_1.SerializableModel {
    constructor(json, serializer, info) {
        super(json, serializer, info);
        info.forEach(propertyInfo => {
            this[propertyInfo.propertyName].subscribe(value => {
                propertyInfo.alwaysSerialize = value !== null && value !== undefined;
            });
        });
        this.getInfo = () => info;
    }
    _isKnownProperty(propertyName) {
        return !!this.getInfo().filter(i => i.propertyName === propertyName)[0];
    }
    getValue(propertyName) {
        if (this._isKnownProperty(propertyName)) {
            return this[propertyName].peek();
        }
        else {
            return this._model[propertyName];
        }
    }
    setValue(propertyName, propertyValue) {
        _custom_property_validation_1.validateCustomPropertyName(propertyName);
        _custom_property_validation_1.validateCustomPropertyValueType(propertyName, propertyValue);
        if (this._isKnownProperty(propertyName)) {
            this[propertyName](propertyValue);
        }
        else {
            this._model[propertyName] = propertyValue;
        }
    }
}
exports.CustomProperties = CustomProperties;
