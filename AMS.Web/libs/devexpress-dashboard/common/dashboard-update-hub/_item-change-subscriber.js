﻿/**
* DevExpress Dashboard (_item-change-subscriber.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourcesSubscriber = exports.ColorSchemeSubscriber = exports.ItemsChangeSubscriber = exports.ComponentArraySubscriber = exports.ItemChangeSubscriber = void 0;
const calculated_field_1 = require("../../model/data-sources/calculated-field");
const disposable_object_1 = require("../../model/disposable-object");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _base_metadata_1 = require("../../model/metadata/_base-metadata");
const _model_subscriber_1 = require("./_model-subscriber");
class ItemChangeSubscriber extends disposable_object_1.DisposableObject {
    constructor(dashboardItem, itemChanged) {
        super();
        this.dashboardItem = dashboardItem;
        let subscriber = new _model_subscriber_1.ModelSubscriber(this.dashboardItem);
        subscriber.registerHandler(category => itemChanged(category));
        this.toDispose(subscriber);
        this.toDispose(this.dashboardItem._subcribeDataQueryParams(newValue => itemChanged(_base_metadata_1.PropertyCategory.ClientState)));
    }
}
exports.ItemChangeSubscriber = ItemChangeSubscriber;
class ComponentArraySubscriber extends disposable_object_1.DisposableObject {
    constructor(_items, _propertyUniqueName = 'componentName') {
        super();
        this._items = _items;
        this._propertyUniqueName = _propertyUniqueName;
        this._subscribers = [];
        this.toDispose(_knockout_utils_1.subscribeArrayChange(this._items, {
            added: (item) => {
                this._subscribe(item);
                this.itemAdded(item);
            },
            deleted: (item) => {
                this._unsubscribe(item);
                this.itemDeleted(item);
            }
        }));
        this._items().forEach(item => this._subscribe(item));
    }
    itemAdded(item) { }
    itemDeleted(item) { }
    _subscribe(item) {
        this._subscribers[item[this._propertyUniqueName]()] = this.createSubscriber(item);
    }
    _unsubscribe(item) {
        var propertyValue = item[this._propertyUniqueName]();
        !!this._subscribers[propertyValue] && this._subscribers[propertyValue].dispose();
        delete this._subscribers[propertyValue];
    }
    dispose() {
        this._items().forEach(item => this._unsubscribe(item));
        super.dispose();
    }
}
exports.ComponentArraySubscriber = ComponentArraySubscriber;
class ItemsChangeSubscriber extends ComponentArraySubscriber {
    constructor(items, _options) {
        super(items);
        this._options = _options;
    }
    itemAdded(item) {
        this._options.itemAdded && this._options.itemAdded(item);
    }
    itemDeleted(item) {
        this._options.itemDeleted && this._options.itemDeleted(item);
    }
    createSubscriber(item) {
        return new ItemChangeSubscriber(item, category => this._options.itemChanged(item, category));
    }
}
exports.ItemsChangeSubscriber = ItemsChangeSubscriber;
class ColorSchemeSubscriber extends ComponentArraySubscriber {
    constructor(entries, _changed) {
        super(entries);
        this._changed = _changed;
    }
    createSubscriber(item) {
        var subscriber = new _model_subscriber_1.ModelSubscriber(item);
        subscriber.registerHandler((category, model) => {
            this._changed();
        });
        return subscriber;
    }
    itemAdded(item) {
        this._changed();
    }
    itemDeleted(item) {
        this._changed();
    }
}
exports.ColorSchemeSubscriber = ColorSchemeSubscriber;
class DataSourcesSubscriber extends ComponentArraySubscriber {
    constructor(dataSources, _onDataSourceChanged) {
        super(dataSources);
        this._onDataSourceChanged = _onDataSourceChanged;
    }
    createSubscriber(dataSource) {
        var subscriber = new _model_subscriber_1.ModelSubscriber(dataSource);
        subscriber.registerHandler((category, model, propertyName, status) => {
            if (model instanceof calculated_field_1.CalculatedField) {
                var calcField = model;
                this._onDataSourceChanged({
                    dataSource: dataSource,
                    model: model,
                    propertyName: propertyName,
                    status: status,
                    queryName: calcField.dataMember(),
                    fieldName: calcField.name()
                });
            }
            else {
                this._onDataSourceChanged({
                    dataSource: dataSource,
                    model: model,
                    propertyName: propertyName,
                    status: status
                });
            }
        });
        return subscriber;
    }
    itemAdded(dataSource) {
        this._onDataSourceChanged({
            dataSource: dataSource,
            status: 'added'
        });
    }
    itemDeleted(dataSource) {
        this._onDataSourceChanged({
            dataSource: dataSource,
            status: 'deleted'
        });
    }
}
exports.DataSourcesSubscriber = DataSourcesSubscriber;
