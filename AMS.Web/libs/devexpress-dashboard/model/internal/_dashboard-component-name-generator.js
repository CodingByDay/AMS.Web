﻿/**
* DevExpress Dashboard (_dashboard-component-name-generator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUniqueNameGenerator = void 0;
const _helper_classes_1 = require("./_helper-classes");
const _knockout_utils_1 = require("./_knockout-utils");
class DashboardUniqueNameGenerator {
    constructor(_propertyName, _startIndex, ...collections) {
        this._propertyName = _propertyName;
        this._startIndex = _startIndex;
        this._disposables = [];
        this._componentsCollections = collections;
        this._componentsCollections.map(collection => {
            collection().forEach(item => this._ensureUniqueName(item));
            this._disposables.push(_knockout_utils_1.subscribeArrayChangeWithCancel(collection, changes => {
                for (const itemChange of changes) {
                    var change = itemChange;
                    if (change.status === 'added') {
                        if (!this._ensureUniqueName(change.value))
                            return false;
                    }
                }
                return true;
            }));
        });
    }
    _ensureUniqueName(item) {
        var affectedItems = this._componentsCollections.reduce((result, collection) => result.concat(collection()), []), itemIndex = affectedItems.indexOf(item), uniqueName = item[this._propertyName]();
        affectedItems.splice(itemIndex, 1);
        if (!!uniqueName && !_helper_classes_1.NameGenerator.isValidName(uniqueName, affectedItems, this._propertyName))
            throw new Error(`Invalid Name "${uniqueName}": An item with the same name already exists. Check the name or set it to 'undefined' to generate a unique name automatically.`);
        if (!uniqueName) {
            item[this._propertyName](_helper_classes_1.NameGenerator.generateName(item.getUniqueNamePrefix(), affectedItems, this._propertyName, this._startIndex));
        }
        return true;
    }
    dispose() {
        this._disposables.map(disposable => disposable.dispose());
    }
}
exports.DashboardUniqueNameGenerator = DashboardUniqueNameGenerator;
