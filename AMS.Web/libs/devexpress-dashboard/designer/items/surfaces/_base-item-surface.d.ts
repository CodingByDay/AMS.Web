﻿/**
* DevExpress Dashboard (_base-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IExtension } from '../../../common/common-interfaces';
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { DisposableObject } from '../../../model/disposable-object';
import { DashboardItem } from '../../../model/items/dashboard-item';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { DataItemContainer } from '../../../model/items/data-item-container';
import { CustomizeDataItemContainerSectionsEventArgs, CustomizeSectionsEventArgs } from '../../accordion-tab-options';
import { ConfirmDialogViewModel } from '../../confirm-dialog/_confirm-dialog';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { PropertiesController } from '../../properties-controller/_properties-controller';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDataItemContainerComposeTabsArgs } from '../properties-composers/_base-properties-composer';
import { IDataSectionSurface } from '../_interfaces';
export declare class BaseItemSurface<T extends DashboardItem> extends DisposableObject {
    customizeDashboardItemTabs: (args: CustomizeSectionsEventArgs) => void;
    propertiesController: PropertiesController;
    protected _dashboardItemCustomization: CustomizeDashboardItemTabs;
    getPropertiesComposer(): DashboardItemPropertiesComposer<T>;
}
export declare class DataDashboardItemSurface<T extends DataDashboardItem> extends BaseItemSurface<T> {
    dashboardItem: T;
    dashboardModel: Dashboard;
    _dataSourceBrowser: DataSourceBrowser;
    notificationController: NotificationController;
    findExtension?: (name: string) => IExtension;
    protected get showDefaultSections(): boolean;
    protected fillSections(): void;
    protected extendHiddenDimensionsTabs(tabs: AccordionTab[], model: any): void;
    protected extendHiddenMeasuresTabs(tabs: AccordionTab[], model: any): void;
    constructor(dashboardItem: T, dashboardModel: Dashboard, _dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController, findExtension?: (name: string) => IExtension);
    customizeDataItemContainerTabs: (args: CustomizeDataItemContainerSectionsEventArgs) => void;
    protected _dataItemContainerCustomization: (tabs: AccordionTab[], target: DataItemContainer, args: IDataItemContainerComposeTabsArgs) => void;
    changeDataSource(): void;
    private _changeDataSource;
    saveDataSourceChanges(): void;
    get dataSourceBrowser(): any;
    dataSourceName: ko.Observable<string>;
    dataMemberName: ko.Observable<string>;
    dataSourceDisplayText: ko.Computed<string>;
    needSetDataSource: ko.Computed<boolean>;
    changeDataSourcePanelVisible: ko.Observable<boolean>;
    template: string;
    confirmDialogViewModel: ConfirmDialogViewModel;
    dataSections: ko.ObservableArray<IDataSectionSurface>;
}
