﻿/**
* DevExpress Dashboard (dashboard.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ColorSchemeEntry } from './colorization/color-scheme-entry';
import { CustomProperties } from './custom-properties/custom-properties';
import { ICustomPropertiesProvider } from './custom-properties/_custom-properties-utils';
import { DashboardState } from './dashboard-state';
import { DataSource } from './data-sources/data-source';
import { IColorSignaturesProvider, IMasterFilterItemsProvider } from './internal/_interfaces';
import { DashboardItem } from './items/dashboard-item';
import { DataDashboardItem } from './items/data-dashboard-item';
import { GroupItem } from './items/group/group-item';
import { DashboardTabPage } from './items/tab-container-item/dashboard-tab-page';
import { DashboardLayoutGroup } from './layout/dashboard-layout-group';
import { DashboardLayoutNode } from './layout/dashboard-layout-node';
import { LayoutOptions } from './layout/layout-options';
import { IQueryParameter, Parameter } from './parameters/parameter';
import { SerializableModel } from './serializable-model';
import { DashboardTitle } from './title';
export declare class Dashboard extends SerializableModel implements IMasterFilterItemsProvider, IColorSignaturesProvider, ICustomPropertiesProvider {
    dashboardJSON: any;
    static _dataSourceTypesMap: {
        [key: string]: new (json: Object, serializer: ModelSerializer) => DataSource;
    };
    static _createDataSource(dataSourceJSON: Object, serializer: ModelSerializer): DataSource;
    dataSources: ko.ObservableArray<DataSource>;
    parameters: ko.ObservableArray<Parameter>;
    colorScheme: ko.ObservableArray<ColorSchemeEntry>;
    currencyCultureName: ko.Observable<string>;
    items: ko.ObservableArray<DashboardItem>;
    groups: ko.ObservableArray<GroupItem>;
    layout: ko.Observable<DashboardLayoutGroup>;
    layoutOptions: LayoutOptions;
    title: DashboardTitle;
    customProperties: CustomProperties;
    _tabPages: ko.ObservableArray<DashboardItem>;
    _allItems: ko.PureComputed<Array<DashboardItem>>;
    _dataDashboardItems: ko.Computed<DataDashboardItem[]>;
    _colorableItems: ko.Subscribable<DashboardItem[]>;
    _queryParameters: ko.Subscribable<IQueryParameter[]>;
    _masterFilterItems: ko.Computed<DataDashboardItem[]>;
    _state: ko.Computed<DashboardState>;
    private _disposables;
    private _componentNameGenerator;
    get stateString(): string;
    set stateString(stateVal: string);
    constructor(dashboardJSON?: any, serializer?: ModelSerializer);
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    getJSON(): any;
    findItem(itemId: string): DashboardItem;
    rebuildLayout(clientWidth?: number, clientHeight?: number): void;
    _getDisplayDashboardItem(tabPage: DashboardTabPage): DashboardItem;
    _changeItem(oldItem: DashboardItem, newItem: DashboardItem): void;
    _duplicateItem(item: DashboardItem): void;
    _createDashboardLayoutItem(modelItemJson?: any): DashboardLayoutNode;
    _createDashboardLayoutNode(dashboardItem: DashboardItem): DashboardLayoutNode;
    _findDataItem(itemId: string): DataDashboardItem;
    _interactivityGroupPathToRoot(dashboardItem: DashboardItem): Array<GroupItem | DashboardTabPage>;
    private _processDeleteDataSource;
}
