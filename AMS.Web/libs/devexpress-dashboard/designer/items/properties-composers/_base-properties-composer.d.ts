﻿/**
* DevExpress Dashboard (_base-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard, DashboardItem, DataDashboardItem } from '../../../model';
import { DataItemContainer } from '../../../model/items/data-item-container';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { PropertiesController } from '../../properties-controller/_properties-controller';
export interface IComposeTabsArgs {
}
export interface IDashboardItemComposeTabsArgs extends IComposeTabsArgs {
    dashboard?: Dashboard;
    dataSourceBrowser?: DataSourceBrowser;
    propertiesController?: PropertiesController;
}
export interface IDataItemContainerComposeTabsArgs extends IComposeTabsArgs {
    dashboardItem: DataDashboardItem;
    dataSourceBrowser?: DataSourceBrowser;
    containerType?: ko.Observable<string>;
}
export interface IDetailsPropertiesComposer<TModel> extends IDetailsPropertiesComposerBase<TModel, IComposeTabsArgs> {
}
export interface IDetailsPropertiesComposerBase<TModel, TArgs extends IComposeTabsArgs> {
    composeTabs(model: TModel, args?: TArgs): Array<AccordionTab>;
}
export declare abstract class PropertiesComposerBase<TModel, TArgs extends IComposeTabsArgs> implements IDetailsPropertiesComposerBase<TModel, TArgs> {
    private _customizeTabs;
    constructor(_customizeTabs: ((tabs: AccordionTab[], model: TModel, args: TArgs) => void));
    protected abstract _composeTabsCore(model: TModel, args?: TArgs): any;
    composeTabs(model: TModel, args?: TArgs): Array<AccordionTab>;
}
export declare type CustomizeDataItemContainerTabs = (tabs: AccordionTab[], model: DataItemContainer, args: IDataItemContainerComposeTabsArgs) => void;
export declare abstract class DataItemContainerPropertiesComposer<T extends DataItemContainer> extends PropertiesComposerBase<T, IDataItemContainerComposeTabsArgs> {
    constructor(_customizeTabs: CustomizeDataItemContainerTabs);
}
export declare type CustomizeDashboardItemTabs = (tabs: AccordionTab[], model: DashboardItem, args: IDashboardItemComposeTabsArgs) => void;
export declare abstract class DashboardItemPropertiesComposer<T extends DashboardItem> extends PropertiesComposerBase<T, IDashboardItemComposeTabsArgs> {
    constructor(_customizeTabs: CustomizeDashboardItemTabs);
}
