﻿/**
* DevExpress Dashboard (_utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionItemType = void 0;
const ko = require("knockout");
const _knockout_utils_1 = require("./_knockout-utils");
function collectionItemType(itemType) {
    return (target, key) => {
        var createObjectPropertyDescriptor = () => {
            var _subscription;
            var _val = this[key];
            var getter = function () {
                return _val;
            };
            var setter = function (newVal) {
                if (!!_subscription) {
                    _subscription.dispose();
                    _subscription = null;
                }
                if (ko.isObservable(newVal) && Array.isArray(ko.unwrap(newVal))) {
                    _subscription = _knockout_utils_1.subscribeArrayChange(newVal, {
                        added: (item) => {
                            item.itemType(itemType);
                        }
                    });
                }
                _val = newVal;
            };
            return {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            };
        };
        var prototypePropertyDescriptor = {
            get: null,
            set: null,
            enumerable: true,
            configurable: true
        };
        var getter = function () {
            var descriptor = Object.getOwnPropertyDescriptor(this, key);
            if (descriptor === void 0) {
                Object.defineProperty(this, key, createObjectPropertyDescriptor());
            }
            return this[key];
        };
        var setter = function (newVal) {
            var descriptor = Object.getOwnPropertyDescriptor(this, key);
            if (descriptor === void 0) {
                Object.defineProperty(this, key, createObjectPropertyDescriptor());
            }
            this[key] = newVal;
        };
        prototypePropertyDescriptor.get = getter;
        prototypePropertyDescriptor.set = setter;
        if (delete this[key]) {
            Object.defineProperty(target, key, prototypePropertyDescriptor);
        }
    };
}
exports.collectionItemType = collectionItemType;
