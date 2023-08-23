﻿/**
* DevExpress Analytics (core\selection\_combinedObj.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { extend, isEmptyObject } from '../../serializer/_utils';
export class CombinedObject {
    static getInfo(controls) {
        var infos = controls.map((item) => { return item['getInfo'](); });
        return () => {
            var info = [];
            for (var i = 0; i < infos[0].length; i++) {
                if (infos.filter((info) => { return info.filter((x) => { return x.propertyName === infos[0][i].propertyName; }).length > 0; }).length === infos.length) {
                    info.push(infos[0][i]);
                }
            }
            return info;
        };
    }
    static isPropertyDisabled(controls) {
        return (name) => {
            for (var i = 0; i < controls.length; i++) {
                if (controls[i]['isPropertyDisabled'](name)) {
                    return true;
                }
            }
            return false;
        };
    }
    static getPath(controls) {
        return (name) => {
            var result = '';
            for (var i = 0; i < controls.length; i++) {
                var currentPath = controls[i].getPath(name);
                if (i === 0) {
                    result = currentPath;
                }
                else if (result !== currentPath) {
                    result = '';
                    break;
                }
            }
            return result;
        };
    }
    static isPropertyVisible(controls) {
        return (name) => {
            for (var i = 0; i < controls.length; i++) {
                if (!controls[i]['isPropertyVisible'](name)) {
                    return false;
                }
            }
            return true;
        };
    }
    static mergeProperty(controls, propertyName, undoEngine, customMerge) {
        var property = controls[0][propertyName];
        var combinedObj = null;
        var subscriptions = null;
        if (controls.filter(x => !!x[propertyName]).length === controls.length) {
            combinedObj = customMerge && customMerge(propertyName, controls, undoEngine);
            if (!combinedObj) {
                if (ko.isObservable(property) && !property['push']) {
                    if (!controls.every(control => ko.isObservable(control[propertyName])))
                        return combinedObj;
                    var combinedObservable = ko.observable(controls.every((control) => { return controls[0][propertyName].peek() === control[propertyName].peek(); }) ? controls[0][propertyName].peek() : null);
                    combinedObj = {
                        result: combinedObservable,
                        subscriptions: [combinedObservable.subscribe((newVal) => {
                                undoEngine && undoEngine().start();
                                controls.forEach(control => { control[propertyName](newVal); });
                                undoEngine && undoEngine().end();
                            })]
                    };
                }
                else if (typeof property === 'object' && !$.isArray(property)) {
                    combinedObj = this._merge(controls.map(x => x[propertyName]), undoEngine, customMerge);
                }
            }
        }
        return combinedObj;
    }
    static _createProperty(result, propertyName, propertyValue) {
        if (propertyValue) {
            if (typeof propertyValue === 'object' && isEmptyObject(propertyValue))
                return;
            result[propertyName] = propertyValue;
        }
    }
    static _merge(controls, undoEngine, customMerge, ignoreProperties) {
        var result = {};
        var subscriptions = [];
        ['getInfo', 'isPropertyVisible', 'isPropertyDisabled', 'getPath'].forEach((propertyName) => {
            if (controls[0][propertyName])
                this._createProperty(result, propertyName, this[propertyName](controls));
        });
        if (ignoreProperties) {
            var oldPropertyDisabled = result['isPropertyDisabled'];
            result['isPropertyDisabled'] = (name) => {
                return (oldPropertyDisabled && oldPropertyDisabled(name)) || ignoreProperties.indexOf(name) !== -1;
            };
        }
        if (result && result['getInfo']) {
            result['getInfo']().map(x => x.propertyName).forEach((propertyName) => {
                var combinedObj = this.mergeProperty(controls, propertyName, undoEngine, customMerge);
                if (combinedObj) {
                    subscriptions = [].concat.apply(subscriptions, combinedObj.subscriptions);
                    this._createProperty(result, propertyName, combinedObj.result);
                }
            });
        }
        else {
            Object.keys(controls[0]).forEach((propertyName) => {
                var combinedObj = this.mergeProperty(controls, propertyName, undoEngine, customMerge);
                if (combinedObj) {
                    subscriptions = [].concat.apply(subscriptions, combinedObj.subscriptions);
                    this._createProperty(result, propertyName, combinedObj.result);
                }
            });
        }
        return { result, subscriptions };
    }
    static mergeControls(controls, undoEngine, customMerge, ignoreProperties) {
        var combinedObj = this._merge(controls, undoEngine, customMerge, ignoreProperties);
        return {
            result: extend(combinedObj.result, { controlType: 'multiselect', displayName: ko.observable('') }),
            subscriptions: combinedObj.subscriptions
        };
    }
    static getEditableObject(selectionProvider, undoEngine, customMerge) {
        var editableObject = ko.observable(null);
        var subscriptions = [];
        var subscription = selectionProvider.focused.subscribe((newVal) => {
            editableObject(newVal && newVal.getControlModel());
        });
        if (selectionProvider._disposables) {
            selectionProvider._disposables.push(subscription);
            selectionProvider._disposables.push({
                dispose: () => {
                    subscriptions.forEach(x => x.dispose());
                    subscriptions.splice(0);
                }
            });
        }
        return ko.pureComputed({
            read: () => {
                subscriptions.forEach(x => x.dispose());
                subscriptions = [];
                if (selectionProvider.selectedItems.length > 1) {
                    var combinedObj = this.mergeControls(selectionProvider.selectedItems.map((item) => { return item.getControlModel(); }), undoEngine, customMerge, selectionProvider.ignoreMultiSelectProperties);
                    subscriptions = combinedObj.subscriptions;
                    return combinedObj.result;
                }
                else {
                    return editableObject();
                }
            },
            write: (val) => {
                if (val && val.surface) {
                    selectionProvider.focused(val.surface);
                }
                else {
                    selectionProvider.updateSelection(null);
                    editableObject(val);
                }
            }
        }).extend({ deferred: true });
    }
}
