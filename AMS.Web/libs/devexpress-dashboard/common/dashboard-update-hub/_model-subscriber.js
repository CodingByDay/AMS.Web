﻿/**
* DevExpress Dashboard (_model-subscriber.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelSubscriber = void 0;
const ko = require("knockout");
const _base_metadata_1 = require("../../model/metadata/_base-metadata");
class ModelSubscriber {
    constructor(_model) {
        this._model = _model;
        this.handlers = [];
        this._subscribe(_model);
    }
    static changePropertyQuietly(property, func) {
        try {
            property[ModelSubscriber.dxSubscriptionSuspend] = true;
            func();
        }
        finally {
            delete property[ModelSubscriber.dxSubscriptionSuspend];
        }
    }
    _unsubscribe(model) {
        var serializationsInfo = model.getInfo();
        serializationsInfo
            .filter(serializationInfo => !!serializationInfo.modelName)
            .forEach(serializationInfo => {
            var property = model[serializationInfo.propertyName];
            var propertyValue = ko.unwrap(property);
            if (property[ModelSubscriber.dxSubscription]) {
                var subscription = property[ModelSubscriber.dxSubscription];
                subscription.dispose();
                delete property[ModelSubscriber.dxSubscription];
            }
            if (this._isPropertySerializeModel(propertyValue)) {
                this._unsubscribe(propertyValue);
            }
        });
    }
    _subscribe(model) {
        if (!model.getInfo) {
            return;
        }
        var serializationsInfo = model.getInfo();
        serializationsInfo
            .filter(serializationInfo => !!serializationInfo.modelName)
            .forEach(serializationInfo => {
            var property = model[serializationInfo.propertyName];
            var category = !!serializationInfo['category'] ? serializationInfo['category'] : _base_metadata_1.PropertyCategory.Data;
            var propertyValue = ko.unwrap(property);
            if (Array.isArray(property)) {
                throw new Error('Non-observable arrays are not supported.');
            }
            if (category === _base_metadata_1.PropertyCategory.NoUpdate)
                return;
            if (Array.isArray(propertyValue) && !property[ModelSubscriber.dxSubscription]) {
                propertyValue.forEach(item => this._subscribe(item));
                property[ModelSubscriber.dxSubscription] = property.subscribe((arrayChanges) => {
                    arrayChanges.forEach(arrayChange => {
                        var changedStatus = 'unknown';
                        if (arrayChange.status === 'added') {
                            this._subscribe(arrayChange.value);
                            changedStatus = 'added';
                        }
                        if (arrayChange.status === 'deleted') {
                            this._unsubscribe(arrayChange.value);
                            changedStatus = 'deleted';
                        }
                        if (property[ModelSubscriber.dxSubscriptionSuspend] !== true)
                            this._propertyChanged(category, arrayChange.value, serializationInfo.propertyName, changedStatus);
                    });
                }, null, 'arrayChange');
            }
            else if (ko.isObservable(property) && !property[ModelSubscriber.dxSubscription]) {
                var getSubscribeHandler = prevModel => model => {
                    if (this._isPropertySerializeModel(prevModel)) {
                        this._unsubscribe(prevModel);
                    }
                    if (this._isPropertySerializeModel(model)) {
                        this._subscribe(model);
                    }
                };
                var subscriberHandler = getSubscribeHandler(propertyValue);
                property[ModelSubscriber.dxSubscription] = property.subscribe(val => {
                    if (property[ModelSubscriber.dxSubscriptionSuspend] !== true) {
                        this._propertyChanged(category, model, serializationInfo.propertyName, 'changed');
                    }
                    if (category !== _base_metadata_1.PropertyCategory.NoUpdateByObservableValue) {
                        subscriberHandler(val);
                        subscriberHandler = getSubscribeHandler(val);
                    }
                });
                if (category !== _base_metadata_1.PropertyCategory.NoUpdateByObservableValue && this._isPropertySerializeModel(propertyValue)) {
                    this._subscribe(propertyValue);
                }
            }
            else if (!ko.isObservable(property) && this._isPropertySerializeModel(propertyValue)) {
                this._subscribe(propertyValue);
            }
        });
    }
    _propertyChanged(category, model, propertyName, status) {
        this.handlers.forEach(handler => handler(category, model, propertyName, status));
    }
    registerHandler(handler) {
        this.handlers.push(handler);
    }
    _isPropertySerializeModel(propertyValue) {
        return propertyValue && propertyValue['getInfo'];
    }
    dispose() {
        this._unsubscribe(this._model);
    }
}
exports.ModelSubscriber = ModelSubscriber;
ModelSubscriber.dxSubscription = '__dx_notifier_subscription';
ModelSubscriber.dxSubscriptionSuspend = '__dx_notifier_subscription_suspend';
