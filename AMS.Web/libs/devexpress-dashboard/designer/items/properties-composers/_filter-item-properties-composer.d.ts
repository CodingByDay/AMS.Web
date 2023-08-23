﻿/**
* DevExpress Dashboard (_filter-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FilterElementItemBase } from '../../../model/items/filter-items/filter-element-item-base';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer } from './_base-properties-composer';
export declare class FilterItemPropertiesComposer extends DashboardItemPropertiesComposer<FilterElementItemBase> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: FilterElementItemBase): AccordionTab<any>[];
}
