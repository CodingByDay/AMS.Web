﻿/**
* DevExpress Dashboard (_data-source-browser-viewmodel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FilterEditor } from '@devexpress/analytics-core/analytics-widgets';
import { ITreeListOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
import { dxPopupToolbarItem } from 'devextreme/ui/popup';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { DashboardUpdateHub } from '../../common/dashboard-update-hub/_dashboard-update-hub';
import { FederationDataSource } from '../../model';
import { CalculatedField } from '../../model/data-sources/calculated-field';
import { DataSource } from '../../model/data-sources/data-source';
import { SqlDataSource } from '../../model/data-sources/sql-data-source';
import { DisposableObject } from '../../model/disposable-object';
import { CalcFieldEditor } from '../calc-field-editor/_calc-field-editor';
import { DataSourceWizardExtension } from '../data-source-wizard/data-source-wizard-extension';
import { AvailableDataSourcesExtension } from '../extensions/available-data-sources-extension';
import { RenameDataSourcePopup } from './rename-data-source-popup/_rename-data-source-popup';
export interface IDataSourceAction {
    click: Function;
    text: string;
    disabled: ko.Computed<boolean>;
}
export interface IEditDataSourceAction {
    click: Function;
    text: string;
    visible: ko.Computed<boolean>;
}
export interface IDataSourceBrowserViewModel {
    selectedDataSource: ko.Observable<DataSource>;
    canEditDataSource: boolean;
    canEditCustomSqlQueries: boolean;
    editQuery(queryName: string): any;
    editFederationQuery?(queryName: string): any;
    removeQuery(queryName: string): any;
    removeFederationQuery?(queryName: string): any;
    editCalcField(field: CalculatedField): any;
    removeCalcField(field: CalculatedField): any;
}
export interface IDashboardActionInfo {
    title?: string;
    icon: string;
    click: () => void;
    style?: string;
}
export declare class DataSourceBrowserViewModel extends DisposableObject implements IDataSourceBrowserViewModel {
    dataSourceBrowser: DataSourceBrowser;
    dataSourceWizardExtension: ko.Computed<DataSourceWizardExtension>;
    accessibleDataSourcesExtension: ko.Computed<AvailableDataSourcesExtension>;
    calcFieldEditor: CalcFieldEditor;
    renameDataSourcePopup: RenameDataSourcePopup;
    dataSourceTreeListViewModel: DataSourceTreeListViewModel;
    constructor(dataSourceBrowser: DataSourceBrowser, dataSourceWizardExtension: ko.Computed<DataSourceWizardExtension>, accessibleDataSourcesExtension: ko.Computed<AvailableDataSourcesExtension>, updateHub: DashboardUpdateHub);
    _expandQuery(dataSource: SqlDataSource | FederationDataSource, queryName: string): void;
    editDataSourceActions: ko.ObservableArray<IEditDataSourceAction>;
    get canEditDataSource(): boolean;
    get canEditCustomSqlQueries(): boolean;
    addDataSources: (dataSources: Array<DataSource>) => void;
    refreshFieldList(): void;
    showAddDataSourceForm(): void;
    addQuery: () => void;
    manageQueries: () => void;
    editQuery(queryName: string): void;
    editFederationQuery(queryName: string): void;
    manageFederationQueries(): void;
    removeQuery(queryName: string): void;
    removeFederationQuery(queryName: string): void;
    editDataSource(): void;
    dataSourceActions: ko.ObservableArray<IDataSourceAction>;
    private _removeDataSource;
    removeDataSource: (dataSource: DataSource) => void;
    showRenameDataSourceForm: (dataSource: DataSource) => void;
    usedDataSourcesExist: () => boolean;
    availableDataSourcesExist: () => boolean;
    get canAddCalculatedField(): boolean;
    popupContent: ko.Observable<IPopupContentViewModel>;
    popupVisible: ko.Computed<boolean>;
    addCalculatedField: () => void;
    private _onDataSourcePropertyChanged;
    editCalcField: (field: CalculatedField) => void;
    removeCalcField: (field: CalculatedField) => void;
    selectedPath: ko.Observable<string>;
    selectedDataSource: ko.Observable<DataSource>;
    allowAddQuery: ko.Computed<boolean>;
    allowManageQueries: ko.Computed<boolean>;
    allowEditDataSource: ko.Computed<boolean>;
    selectedDataSourceComponentName: ko.Computed<string>;
    filterEditorModel: ko.Computed<FilterEditor>;
    editFilter: () => void;
}
export declare class DataSourceTreeListViewModel {
    private _itemsProvider;
    constructor(dataSourceBrowserViewModel: DataSourceBrowserViewModel);
    triggerItemsChanged(): void;
    treeListEditorOption: ko.Observable<ITreeListOptions>;
}
export interface IPopupContentViewModel {
    toolbarItems: Array<dxPopupToolbarItem>;
    title: string;
    template: string;
    bindingData?: any;
}
