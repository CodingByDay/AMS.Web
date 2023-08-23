﻿/**
* DevExpress Dashboard (_object-properties-wrapper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectPropertiesWrapper = void 0;
const query_1 = require("devextreme/data/query");
const ko = require("knockout");
class ObjectPropertiesWrapper {
    constructor(options) {
        this._serializationInfo = [];
        this.isPropertyVisible = (name) => {
            if (!this._serializationInfo.filter(i => i.propertyName === name)[0]) {
                throw new Error('unknown property');
            }
            var result = true;
            var propertyFilter = this.visibilityFilterRules[name];
            if (propertyFilter) {
                result = !!query_1.default([this]).filter(propertyFilter).toArray().length;
            }
            return result;
        };
        this.isPropertyDisabled = (name) => {
            if (!this._serializationInfo.filter(i => i.propertyName === name)[0]) {
                throw new Error('unknown property');
            }
            var result = false;
            var propertyFilter = this.disabledFilterRules[name];
            if (propertyFilter) {
                result = !!query_1.default([this]).filter(propertyFilter).toArray().length;
            }
            return result;
        };
        this.getDynamicEditor = (name) => {
            if (!this._serializationInfo.filter(i => i.propertyName === name)[0]) {
                throw new Error('unknown property');
            }
            return this.dynamicEditorRules[name] && this.dynamicEditorRules[name](this.model) || null;
        };
        this.model = options.model;
        this.visibilityFilterRules = options.visibilityFilterRules || {};
        this.disabledFilterRules = options.disabledFilterRules || {};
        this.dynamicEditorRules = options.dynamicEditorRules || {};
        this._modelSubscriptions = options.disposableModelSubscriptions || [];
        this.summary = options.summary;
        this.getPropertiesFromContainer(this.model, options.properties);
        if (options.modelExtention) {
            this.getPropertiesFromContainer(options.modelExtention, options.properties);
        }
        if (options.properties.length === 0) {
            this.model['getInfo']().forEach(propertyInfo => {
                this._assignPropertyCore(this.model[propertyInfo.propertyName], propertyInfo);
            });
        }
    }
    getPropertiesFromContainer(cur, properties) {
        properties.forEach((propertyInfo) => {
            if (propertyInfo['container']) {
                var containerObject = ko.unwrap(cur[propertyInfo['container'].propertyName]);
                if (!!containerObject) {
                    this.getPropertiesFromContainer(containerObject, propertyInfo['properties']);
                }
            }
            else {
                var sourcePropertyName = propertyInfo.propertyName, targetPropertyName = propertyInfo.replacementPropertyName || sourcePropertyName;
                if (cur[sourcePropertyName]) {
                    var serializationInfo = sourcePropertyName !== targetPropertyName ? Object.assign(Object.assign({}, propertyInfo), { propertyName: targetPropertyName }) : propertyInfo;
                    this._assignPropertyCore((propertyInfo.sourceObject || cur[sourcePropertyName]), serializationInfo);
                }
            }
        });
    }
    assignValidationPovider(validationProvider) {
        this._validationProvider = validationProvider;
    }
    _assignPropertyCore(propertyObject, info) {
        if (info.validateBeforeSet === true && ko.isObservable(propertyObject)) {
            this[info.propertyName] = ko.pureComputed({
                read: () => propertyObject(),
                write: (value) => {
                    if (this._validationProvider) {
                        var validateResult = this._validationProvider.validate();
                        if (validateResult.status === 'valid') {
                            propertyObject(value);
                        }
                    }
                    else {
                        propertyObject(value);
                    }
                }
            });
            this._modelSubscriptions.push(this[info.propertyName]);
        }
        else {
            this[info.propertyName] = propertyObject;
        }
        this._serializationInfo.push(info);
    }
    addProperty(propertyValue, info) {
        this._assignPropertyCore(propertyValue, info);
    }
    getInfo() {
        return this._serializationInfo;
    }
    isEmpty() {
        if (this._serializationInfo.length !== 0) {
            let everythingIsInvisible = true;
            this._serializationInfo.forEach(i => {
                if (this.isPropertyVisible(i.propertyName))
                    everythingIsInvisible = false;
            });
            return everythingIsInvisible;
        }
        return true;
    }
    unbindModel() {
        this._modelSubscriptions.forEach(disposable => disposable.dispose());
        this._modelSubscriptions = [];
    }
}
exports.ObjectPropertiesWrapper = ObjectPropertiesWrapper;
