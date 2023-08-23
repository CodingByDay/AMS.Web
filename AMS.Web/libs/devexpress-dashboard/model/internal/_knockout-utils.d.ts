﻿/**
* DevExpress Dashboard (_knockout-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxPromise } from 'devextreme/core/utils/deferred';
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
import { DisposableType, IDisposable } from '../disposable-object';
export declare type KnockoutEntry<T = any> = ko.Observable<T> | ko.Computed<T>;
export declare function subscribeArrayChange<T>(array: ko.ObservableArray<T>, handlers: {
    added?: (item: T, index?: number) => void;
    deleted?: (item: T) => void;
}): ko.Subscription;
export declare function subscribeWithPrev<T>(target: ko.Subscribable<T>, callback: (oldValue: T, newValue: T) => void): IDisposable;
export declare function subscribeArrayChangeWithCancel<T>(target: ko.ObservableArray<T>, callback: (changes: ko.utils.ArrayChanges<T>) => boolean): IDisposable;
export declare function syncArrayHelper<T, U>(sourceArray: ko.ObservableArray<T>, destArray: ko.ObservableArray<U>, addHandler: (value: T) => U): ko.Subscription;
export declare function subscribeToArrayItemProperties<T>(array: ko.ObservableArray<T>, handler: (item: T) => DisposableType | DisposableType[]): DisposableType;
export declare function subscribeAndPerform<T>(subscribable: ko.Subscribable<T>, action: (value: T) => void): DisposableType;
export declare function safeSubscribe<T>(observables: {
    [K in keyof T]: ko.Subscribable<T[K]>;
}, handler: (args: T) => DisposableType | void): DisposableType;
export declare function safeComputed<T, V>(observables: {
    [K in keyof T]: ko.Subscribable<T[K]>;
}, handler: (args: T) => V): ko.PureComputed<V>;
export declare function createObservableDataSource<T, V>(observables: {
    [K in keyof T]: ko.Subscribable<T[K]>;
}, load: (args: T) => DxPromise<any[]> | Array<any>): {
    dataSource: DataSource<any, any>;
    dispose: () => void;
};
