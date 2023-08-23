﻿/**
* DevExpress Dashboard (_available-data-sources-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSource } from '../../model/data-sources/data-source';
import { Notification } from '../../model/internal/_interfaces';
import { UiStateType } from '../../model/items/dashboard-item';
export declare class AvailableDataSourcesViewModel {
    private _dataSources;
    selectedDataSources: ko.ObservableArray<DataSource>;
    uiState: ko.Computed<UiStateType>;
    errorState: ko.Observable<Notification>;
    private _showCreateDataSourceWizardDelegate;
    constructor(_dataSources: ko.ObservableArray<DataSource>, selectedDataSources: ko.ObservableArray<DataSource>, uiState: ko.Computed<UiStateType>, errorState: ko.Observable<Notification>, _showCreateDataSourceWizardDelegate: ko.Computed<{
        (federationSources: DataSource[]): void;
    }>);
    getDataSources(dataSourcesFilter?: {
        (ds: DataSource): boolean;
    }): DataSource[];
    get canCreateDataSourceWizard(): boolean;
    showCreateDataSourceWizard: (federationSources: DataSource[]) => void;
}
