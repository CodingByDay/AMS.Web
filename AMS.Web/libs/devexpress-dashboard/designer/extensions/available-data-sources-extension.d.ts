﻿/**
* DevExpress Dashboard (available-data-sources-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { DataSource } from '../../model/data-sources/data-source';
import { DisposableObject } from '../../model/disposable-object';
import { AvailableDataSourcesViewModel } from './_available-data-sources-view-model';
export declare class AvailableDataSourcesExtension extends DisposableObject implements IExtension {
    private dashboardControl;
    name: string;
    templateName: string;
    viewModel: AvailableDataSourcesViewModel;
    selectedDataSources: ko.ObservableArray<DataSource>;
    dataSources: ko.ObservableArray<DataSource>;
    private _errorState;
    private _uiState;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    loadAvailableDataSources(): void;
}
