﻿/**
* DevExpress Analytics (core\internal\_stores.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
export class CustomSortedArrayStore extends CustomStore {
    static _sortItems(items, sortPropertyName) {
        return items.sort((a, b) => {
            var propA = ko.unwrap(a[sortPropertyName]), propB = ko.unwrap(b[sortPropertyName]);
            if (propA && propB) {
                var diff = propA - propB;
                if (!isNaN(diff))
                    return diff;
                propA = propA.toLowerCase ? propA.toLowerCase() : propA;
                propB = propB.toLowerCase ? propB.toLowerCase() : propB;
                return (propA < propB) ? -1 : (propA > propB) ? 1 : 0;
            }
        });
    }
    static _createOptions(items, sortPropertyName) {
        items = this._sortItems(items, sortPropertyName);
        return {
            load: (options) => {
                var result = [].concat(items);
                if (options.take)
                    result = result.splice(options.skip, options.take);
                return $.Deferred().resolve(result).promise();
            },
            byKey: (key) => {
                if (items.some(x => x === key))
                    return key;
            }
        };
    }
    constructor(items, sortPropertyName = 'name') {
        super(CustomSortedArrayStore._createOptions(items, sortPropertyName));
    }
}
export class SortedArrayStore extends ArrayStore {
    constructor(options, sortPropertyName = 'name') {
        if (options instanceof Array) {
            CustomSortedArrayStore._sortItems(options, sortPropertyName);
        }
        super(options);
    }
}
export class ControlsStore extends Disposable {
    constructor(allControls) {
        super();
        this._filter = ko.observable(null);
        var dataSource = null;
        this._disposables.push(this.dataSource = ko.computed(() => {
            dataSource && dataSource.dispose();
            var items = this._filter() ? allControls().filter(this._filter()) : allControls();
            dataSource = new DataSource({
                store: new CustomSortedArrayStore(items),
                paginate: true,
                pageSize: 100
            });
            return dataSource;
        }));
        this._disposables.push(this.visible = ko.computed(() => {
            return allControls().length > 0;
        }));
    }
    getFilter() {
        return this._filter();
    }
    setFilter(filter) {
        this._filter(filter);
    }
    resetFilter() {
        this._filter(null);
    }
}
