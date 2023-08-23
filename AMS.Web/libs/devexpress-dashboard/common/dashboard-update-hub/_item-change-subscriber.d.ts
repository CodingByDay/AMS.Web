﻿/**
* DevExpress Dashboard (_item-change-subscriber.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ColorSchemeEntry } from '../../model/colorization/color-scheme-entry';
import { DataSource } from '../../model/data-sources/data-source';
import { DisposableObject, IDisposable } from '../../model/disposable-object';
import { DashboardItem } from '../../model/items/dashboard-item';
import { PropertyCategory } from '../../model/metadata/_base-metadata';
import { ModelSubscriber, PropertyChangedStatus } from './_model-subscriber';
export declare class ItemChangeSubscriber extends DisposableObject {
    dashboardItem: DashboardItem;
    constructor(dashboardItem: DashboardItem, itemChanged: (category: PropertyCategory) => void);
}
export declare abstract class ComponentArraySubscriber extends DisposableObject {
    private _items;
    private _propertyUniqueName;
    private _subscribers;
    constructor(_items: ko.ObservableArray<ISerializableModel>, _propertyUniqueName?: string);
    protected itemAdded(item: ISerializableModel): void;
    protected itemDeleted(item: ISerializableModel): void;
    protected abstract createSubscriber(item: ISerializableModel): IDisposable;
    protected _subscribe(item: ISerializableModel): void;
    protected _unsubscribe(item: ISerializableModel): void;
    dispose(): void;
}
export interface ISubscriberOptions {
    itemAdded?: (item: any) => void;
    itemDeleted?: (item: any) => void;
    itemChanged: (item: any, changeCategory: PropertyCategory) => void;
}
export declare class ItemsChangeSubscriber extends ComponentArraySubscriber {
    private _options;
    constructor(items: ko.ObservableArray<DashboardItem>, _options: ISubscriberOptions);
    protected itemAdded(item: any): void;
    protected itemDeleted(item: any): void;
    protected createSubscriber(item: DashboardItem): ItemChangeSubscriber;
}
export declare class ColorSchemeSubscriber extends ComponentArraySubscriber {
    private _changed;
    constructor(entries: ko.ObservableArray<ColorSchemeEntry>, _changed: () => void);
    protected createSubscriber(item: any): ModelSubscriber;
    protected itemAdded(item: any): void;
    protected itemDeleted(item: any): void;
}
export declare class DataSourcesSubscriber extends ComponentArraySubscriber {
    private _onDataSourceChanged;
    constructor(dataSources: ko.ObservableArray<DataSource>, _onDataSourceChanged: (args: DataSourceChangedEventArgs) => void);
    protected createSubscriber(dataSource: ISerializableModel): ModelSubscriber;
    protected itemAdded(dataSource: ISerializableModel): void;
    protected itemDeleted(dataSource: ISerializableModel): void;
}
export interface DataSourceChangedEventArgs {
    dataSource: DataSource;
    propertyName?: string;
    model?: any;
    status: PropertyChangedStatus;
    queryName?: string;
    fieldName?: string;
}
export interface DashboardItemChangedEventArgs {
    item: DashboardItem;
    category: PropertyCategory;
}
