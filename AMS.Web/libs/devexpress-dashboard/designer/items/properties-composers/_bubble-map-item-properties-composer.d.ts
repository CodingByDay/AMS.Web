﻿/**
* DevExpress Dashboard (_bubble-map-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BubbleMapItem } from '../../../model/items/map/bubble-map-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class BubleMapItemPropertiesComposer extends DashboardItemPropertiesComposer<BubbleMapItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: BubbleMapItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
}
