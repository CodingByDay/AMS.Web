﻿/**
* DevExpress Analytics (core\elements\paddingModel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { paddingSerializationsInfo } from './paddingModelMetaData';
export class PaddingModel extends Disposable {
    constructor(left = ko.observable(null), right = ko.observable(null), top = ko.observable(null), bottom = ko.observable(null), dpi = ko.observable(100)) {
        super();
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.dpi = dpi;
        ['left', 'right', 'top', 'bottom'].forEach((propertyName) => {
            this['_' + propertyName] = ko.observable(this[propertyName]());
            this._disposables.push(this[propertyName] = ko.computed({
                read: () => {
                    return this['_' + propertyName]() || 0;
                },
                write: (newVal) => {
                    this['_' + propertyName](newVal);
                }
            }));
        });
        var isUpdating = ko.observable(false);
        var oldValue = null;
        this._disposables.push(this.all = ko.computed({
            read: () => {
                if (isUpdating())
                    return oldValue;
                if (['right', 'top', 'bottom'].every(propertyName => this[propertyName]() === this.left()))
                    oldValue = this.left();
                else
                    oldValue = null;
                return oldValue;
            },
            write: (newVal) => {
                isUpdating(true);
                ['left', 'right', 'top', 'bottom'].forEach((propertyName) => this[propertyName](newVal));
                isUpdating(false);
            }
        }));
    }
    getInfo() {
        return paddingSerializationsInfo;
    }
    resetValue() {
        ['left', 'right', 'top', 'bottom'].forEach(name => this['_' + name](null));
    }
    isEmpty() {
        return ['left', 'right', 'top', 'bottom'].map(x => ko.unwrap(this['_' + x])).every(x => x === null);
    }
    applyFromString(value) {
        if (value) {
            var components = (value || '').split(',');
            this.left(parseInt(components[0]) || 0);
            this.right(parseInt(components[1]) || 0);
            this.top(parseInt(components[2]) || 0);
            this.bottom(parseInt(components[3]) || 0);
        }
        return this;
    }
    static from(val) {
        return new PaddingModel().applyFromString(val);
    }
    toString() {
        if (this.isEmpty())
            return;
        return this._toString();
    }
    _toString(inner = false) {
        return ['left', 'right', 'top', 'bottom'].map(x => parseInt(ko.unwrap(this[x]))).concat(this.dpi()).join(', ');
    }
}
PaddingModel.defaultVal = '0, 0, 0, 0, 100';
PaddingModel.unitProperties = ['left', 'right', 'top', 'bottom'];
