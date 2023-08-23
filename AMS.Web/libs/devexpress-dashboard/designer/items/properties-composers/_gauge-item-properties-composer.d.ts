﻿/**
* DevExpress Dashboard (_gauge-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GaugeItem } from '../../../model/items/gauge/gauge-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { ContainerTypeSelector } from '../container-type-selector/_container-type-selector';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer } from './_base-properties-composer';
export declare class GaugeItemPropertiesComposer extends DashboardItemPropertiesComposer<GaugeItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: GaugeItem): AccordionTab<any>[];
    getTypeWrapper(model: GaugeItem): ContainerTypeSelector;
}
