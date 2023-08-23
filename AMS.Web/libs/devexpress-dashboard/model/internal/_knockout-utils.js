﻿/**
* DevExpress Dashboard (_knockout-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableDataSource = exports.safeComputed = exports.safeSubscribe = exports.subscribeAndPerform = exports.subscribeToArrayItemProperties = exports.syncArrayHelper = exports.subscribeArrayChangeWithCancel = exports.subscribeWithPrev = exports.subscribeArrayChange = void 0;
const custom_store_1 = require("devextreme/data/custom_store");
const data_source_1 = require("devextreme/data/data_source");
const ko = require("knockout");
function subscribeArrayChange(array, handlers) {
    return array.subscribe(changes => {
        changes.forEach(arrayChange => {
            var change = arrayChange;
            if (change.status === 'added' && handlers.added) {
                handlers.added(change.value, change.index);
            }
            if (change.status === 'deleted' && handlers.deleted) {
                handlers.deleted(change.value);
            }
        });
    }, null, 'arrayChange');
}
exports.subscribeArrayChange = subscribeArrayChange;
function subscribeWithPrev(target, callback) {
    var prevValue;
    var disposables = [];
    disposables.push(target.subscribe(value => {
        prevValue = value;
    }, null, 'beforeChange'));
    disposables.push(target.subscribe(value => {
        callback(prevValue, value);
        prevValue = undefined;
    }));
    return {
        dispose: () => {
            disposables.forEach(disposable => disposable.dispose());
            disposables = [];
        }
    };
}
exports.subscribeWithPrev = subscribeWithPrev;
function subscribeArrayChangeWithCancel(target, callback) {
    let prevValue;
    let disposables = [];
    disposables.push(target.subscribe(value => {
        prevValue = value && value.slice();
    }, null, 'beforeChange'));
    disposables.push(target.subscribe(changes => {
        let ok = true;
        try {
            ok = callback(changes);
        }
        catch (error) {
            target(prevValue);
            prevValue = undefined;
            throw error;
        }
        if (!ok)
            target(prevValue);
        prevValue = undefined;
    }, null, 'arrayChange'));
    return {
        dispose: () => { disposables.forEach(element => element.dispose()); }
    };
}
exports.subscribeArrayChangeWithCancel = subscribeArrayChangeWithCancel;
function syncArrayHelper(sourceArray, destArray, addHandler) {
    destArray(sourceArray.peek().map(item => addHandler(item)));
    return sourceArray.subscribe((changes) => {
        changes.forEach((arrayChange) => {
            var change = arrayChange;
            if (change.status === 'added') {
                destArray.splice(change.index, 0, addHandler(change.value));
            }
            else if (change.status === 'deleted') {
                destArray.splice(change.index, 1);
            }
        });
    }, null, 'arrayChange');
}
exports.syncArrayHelper = syncArrayHelper;
function subscribeToArrayItemProperties(array, handler) {
    let subscriptionInfoList = [];
    let subscribe = (item) => {
        subscriptionInfoList.push({ object: item, subscriptions: [].concat(handler(item) || []) });
    };
    let unsubscribe = (item) => {
        var info = subscriptionInfoList.filter(info => info.object === item)[0];
        if (info) {
            info.subscriptions.forEach(subscription => subscription.dispose());
            subscriptionInfoList.splice(subscriptionInfoList.indexOf(info), 1);
        }
    };
    array().forEach(subscribe);
    let arrayChangeSubscribtion = subscribeArrayChange(array, {
        added: subscribe,
        deleted: unsubscribe
    });
    return {
        dispose: () => {
            arrayChangeSubscribtion.dispose();
            arrayChangeSubscribtion = null;
            subscriptionInfoList.forEach(info => info.subscriptions.forEach(subscription => subscription.dispose()));
            subscriptionInfoList.splice(0, subscriptionInfoList.length);
        }
    };
}
exports.subscribeToArrayItemProperties = subscribeToArrayItemProperties;
function subscribeAndPerform(subscribable, action) {
    action(subscribable());
    return subscribable.subscribe(action);
}
exports.subscribeAndPerform = subscribeAndPerform;
function safeSubscribe(observables, handler) {
    let computed = ko.pureComputed(() => Object.keys(observables).reduce((acc, key) => { acc[key] = observables[key](); return acc; }, {}));
    let prevDisposable = handler(computed());
    let subscription = computed.subscribe(args => {
        prevDisposable && prevDisposable.dispose();
        prevDisposable = handler(args);
    });
    return {
        dispose: () => {
            subscription.dispose();
            computed.dispose();
            prevDisposable && prevDisposable.dispose();
        }
    };
}
exports.safeSubscribe = safeSubscribe;
function safeComputed(observables, handler) {
    var observable = ko.observable();
    var subscription = safeSubscribe(observables, (args) => {
        observable(handler(args));
    });
    var computed = ko.pureComputed(() => observable());
    var oldDispose = computed.dispose;
    computed.dispose = () => {
        subscription.dispose();
        oldDispose.call(computed);
    };
    return computed;
}
exports.safeComputed = safeComputed;
function createObservableDataSource(observables, load) {
    let computed = ko.pureComputed(() => Object.keys(observables).reduce((acc, key) => { acc[key] = observables[key](); return acc; }, {}));
    let dataSource = new data_source_1.default({
        store: new custom_store_1.default({
            loadMode: 'raw',
            load: () => load(computed())
        })
    });
    var subscription = computed.subscribe(_ => {
        dataSource.reload();
    });
    return {
        dataSource: dataSource,
        dispose: () => {
            subscription.dispose();
            if (dataSource['_disposed'] !== true)
                dataSource.dispose();
            computed.dispose();
        }
    };
}
exports.createObservableDataSource = createObservableDataSource;
