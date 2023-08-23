﻿/**
* DevExpress Dashboard (_pivot-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { PivotItem } from '../../../model/items/pivot/pivot-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class PivotItemPropertiesComposer extends DashboardItemPropertiesComposer<PivotItem> {
    editRuleHandler: any;
    constructor(customizeHandler: CustomizeDashboardItemTabs, editRuleHandler: any);
    _composeTabsCore(model: PivotItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
    static getFormatRulesWrapper(model: PivotItem, dataSourceBrowser: DataSourceBrowser, editHandler: any): ObjectPropertiesWrapper<PivotItem>;
    getLayoutDataWrapper(model: PivotItem): ObjectPropertiesWrapper<PivotItem>;
    getInitialStateDataWrapper(model: PivotItem): ObjectPropertiesWrapper<PivotItem>;
}
