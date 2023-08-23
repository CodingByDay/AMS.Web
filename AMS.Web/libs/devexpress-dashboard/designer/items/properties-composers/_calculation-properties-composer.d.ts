﻿/**
* DevExpress Dashboard (_calculation-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DataSourceBrowser, IDataFieldsProvider } from '../../../common/_data-source-browser';
import { Measure } from '../../../model/data-item/measure';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IComposeTabsArgs, IDetailsPropertiesComposerBase } from './_base-properties-composer';
export declare class CalculationPropertiesComposer implements IDetailsPropertiesComposerBase<Measure, ICalculationComposeTabsArgs> {
    composeTabs(model: Measure, args: ICalculationComposeTabsArgs): AccordionTab<any>[];
    fillCommonWrapper(tab: AccordionTab, model: Measure, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser): void;
}
export interface ICalculationComposeTabsArgs extends IComposeTabsArgs {
    dashboardItem: DataDashboardItem;
    dataSourceBrowser: DataSourceBrowser;
}
export declare function getCalculationArgumentExpression(measure: Measure, dashboardItem: DataDashboardItem, dataFieldProvider: IDataFieldsProvider): JQueryPromise<string>;
