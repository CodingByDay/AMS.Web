﻿/**
* DevExpress Dashboard (_date-filter-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DateFilterItem } from '../../../model';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class DateFilterItemPropertiesComposer extends DashboardItemPropertiesComposer<DateFilterItem> {
    editRuleHandler: any;
    constructor(customizeHandler: CustomizeDashboardItemTabs, editRuleHandler: any);
    _composeTabsCore(model: DateFilterItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
    getLayoutWrapper(model: DateFilterItem): ObjectPropertiesWrapper<DateFilterItem>;
}
