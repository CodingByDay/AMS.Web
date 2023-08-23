﻿/**
* DevExpress Dashboard (_grid-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { GridItem } from '../../../model/items/grid/grid-item';
import { GridOptions } from '../../../model/items/grid/grid-options';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class GridItemPropertiesComposer extends DashboardItemPropertiesComposer<GridItem> {
    editRuleHandler: any;
    private dataSourceBrowser;
    constructor(customizeHandler: CustomizeDashboardItemTabs, editRuleHandler: any, dataSourceBrowser: DataSourceBrowser);
    _composeTabsCore(model: GridItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
    getColumnFilterWrapper(model: GridItem): any;
    getLayoutWrapper(model: GridOptions): ObjectPropertiesWrapper<GridOptions>;
    getFormatRulesWrapper(model: GridItem, dataSourceBrowser: DataSourceBrowser): ObjectPropertiesWrapper<GridItem>;
}
