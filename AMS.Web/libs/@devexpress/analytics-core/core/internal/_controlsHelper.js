﻿/**
* DevExpress Analytics (core\internal\_controlsHelper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { getUniqueNameForNamedObjectsArray } from './_getNameHelpers';
import { collectionsVisitor } from '../utils/_visitors';
export class DesignControlsHelper extends Disposable {
    constructor(target, handlers, collectionNames) {
        super();
        this.target = target;
        this.collectionNames = collectionNames;
        this._handlers = [];
        this._setText = false;
        this._visitedCollections = [];
        this._subscriptions = [];
        this.added = (value) => {
            this._setText = true;
            this._collectControls(value);
            this._setText = false;
        };
        this.deleted = (value) => {
            var allControls = this.allControls();
            var index = allControls.indexOf(value);
            allControls.splice(index, 1);
            collectionsVisitor(value, (collection) => {
                collection().forEach((item) => {
                    allControls.splice(allControls.indexOf(item), 1);
                });
            });
            this.allControls.valueHasMutated();
        };
        this.allControls = ko.observableArray();
        var unwrappedTarget = target;
        if (ko.isSubscribable(target)) {
            this._disposables.push(target.subscribe((newTarget) => {
                this._visitedCollections = [];
                for (var i = 0, len = this._subscriptions.length; i < len; i++) {
                    this._subscriptions[i].dispose();
                }
                this._subscriptions = [];
                this.allControls([]);
                if (newTarget) {
                    this._collectControls(newTarget);
                }
            }));
            unwrappedTarget = target.peek();
        }
        this._disposables.push(this.allControls.subscribe((args) => {
            var addedItems = args.filter(x => x.status === 'added');
            for (var i = 0; i < addedItems.length; i++) {
                this._setName(addedItems[i].value);
            }
        }, null, 'arrayChange'));
        unwrappedTarget && this._collectControls(unwrappedTarget);
        this._handlers.push.apply(this._handlers, handlers);
    }
    getNameProperty(model) {
        return model.name;
    }
    getControlByName(name) {
        var control = null;
        this.allControls().some(x => {
            if (ko.unwrap(x.name) == name) {
                control = x;
                return true;
            }
            return false;
        });
        return control;
    }
    _setName(value) {
        var names = this.allControls().map((item) => { return ko.unwrap(this.getNameProperty(item)); });
        if (!this.getNameProperty(value)() || names.filter((x) => { return x === this.getNameProperty(value)(); }).length > 1) {
            var newName = getUniqueNameForNamedObjectsArray(this.allControls(), this._getNamePrefix(value), names);
            this.getNameProperty(value)(newName);
            this._setText && this._setDefaultText(value);
        }
    }
    _setDefaultText(value) {
        var initialText = value.getControlInfo && value.getControlInfo().defaultVal && value.getControlInfo().defaultVal['@Text'];
        if (this._setText && value['text'] && !value['text']() && (initialText === null || initialText === undefined)) {
            value['text'](this.getNameProperty(value)());
        }
    }
    _getNamePrefix(value) {
        var controlType = value.controlType || 'Unknown';
        return controlType.split('.').pop();
    }
    dispose() {
        super.dispose();
        this._subscriptions.forEach(subscription => subscription.dispose());
        this._subscriptions.splice(0);
        this._visitedCollections.splice(0);
        this._handlers.splice(0);
        this.target = null;
        this.allControls([]);
    }
    processCollection(collection) { }
    _collectControls(target) {
        var array = [target];
        collectionsVisitor(target, (collection, owner) => {
            if (this._visitedCollections.indexOf(collection) === -1) {
                this._visitedCollections.push(collection);
                var subscriptionsArray = this._subscriptions;
                if (owner instanceof Disposable) {
                    subscriptionsArray = owner._disposables;
                }
                var subscription = collection.subscribe((args) => {
                    args.forEach((changeSet) => {
                        if (changeSet.moved != undefined)
                            return;
                        this[changeSet.status] && this[changeSet.status](changeSet.value);
                        this._handlers.forEach((handler) => {
                            handler[changeSet.status] && handler[changeSet.status](changeSet.value);
                        });
                    });
                }, null, 'arrayChange');
                subscriptionsArray.push({
                    dispose: () => {
                        subscription.dispose();
                        subscription = null;
                        this._visitedCollections.splice(this._visitedCollections.indexOf(collection), 1);
                    }
                });
            }
            this.processCollection(collection());
            array.push.apply(array, collection());
        }, this.collectionNames);
        this.allControls.push.apply(this.allControls, array);
    }
    getControls(target) {
        var controls = ko.observableArray();
        collectionsVisitor(target, (collection) => {
            controls.push.apply(controls, collection());
        });
        return controls;
    }
}
