﻿/**
* DevExpress Dashboard (_range-filter-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { RangeFilterItem } from '../../../model/items/range-filter/range-filter-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class RangeFilterItemPropertiesComposer extends DashboardItemPropertiesComposer<RangeFilterItem> {
    editRuleHandler: any;
    constructor(customizeHandler: CustomizeDashboardItemTabs, editRuleHandler: any);
    _composeTabsCore(model: RangeFilterItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
}
