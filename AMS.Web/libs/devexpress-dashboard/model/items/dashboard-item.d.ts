﻿/**
* DevExpress Dashboard (dashboard-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ViewerItemOptions } from '../../viewer-parts/viewer-items/_base-item';
import { CustomProperties } from '../custom-properties/custom-properties';
import { ICustomPropertiesProvider } from '../custom-properties/_custom-properties-utils';
import { ItemState } from '../dashboard-state';
import { DimensionFilterValues } from '../data-item/_dimension-filter-values';
import { IDashboardComponent } from '../internal/_dashboard-component-name-generator';
import { Notification } from '../internal/_interfaces';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray, PropertyCategory } from '../metadata/_base-metadata';
import { TypedSerializableModel } from '../serializable-model';
import { PaneContentHolder } from './_pane-content-holder';
export declare type UiStateType = 'live' | 'empty' | 'error' | 'loading';
export declare abstract class DashboardItem extends TypedSerializableModel implements IDashboardComponent, ICustomPropertiesProvider {
    static _getCommonItemType(itemType: string): string;
    getUniqueNamePrefix(): string;
    name: ko.Observable<string>;
    componentName: ko.Observable<string>;
    showCaption: ko.Observable<boolean>;
    parentContainer: ko.Observable<string>;
    customProperties: CustomProperties;
    _useNeutralFilterMode: ko.Observable<boolean>;
    _state: ko.Computed<ItemState>;
    _actions: ko.Computed<Array<string>>;
    _uiState: ko.Subscribable<UiStateType>;
    _errorState: ko.Observable<Notification>;
    _viewerItemCreated: ko.Observable<boolean>;
    _paneContentHolder: PaneContentHolder;
    _allowMultiselection: ko.Observable<boolean>;
    private _serverContent;
    protected _dataQueryParams: ko.Computed<any>;
    get _caption(): string;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer, info?: IDashboardSerializationInfoArray);
    _isInteractivityAllowed(): boolean;
    protected _getLayersCount(): number;
    protected _getLayerName(): string;
    protected _updateContentViewModel(content: any): void;
    protected _updateContentData(content: any): void;
    protected _updateDataQueryParams(params: any): void;
    protected _validateSelectionByData(selection: Array<Array<any>>): void;
    protected _extendContentState(content: any): void;
    _getDisplayFilterValues(limitCount?: number): Array<DimensionFilterValues>;
    _getDisplayFilterValuesExternal(): void;
    _getServerContent(): any;
    _getFullServerContent(): ViewerItemOptions;
    _subcribeServerContent(handler: (content: any) => void): ko.Subscription;
    _getContentCategories(): PropertyCategory[];
    _getDataQueryParams(): any;
    _subcribeDataQueryParams(handler: (content: any) => void): ko.Subscription;
    _getExportingSelection(): void;
    _setState(parameter: ItemState): void;
    getInfo(): ISerializationInfoArray;
    protected abstract _getInfoCore(): IDashboardSerializationInfo[];
}
