﻿/**
* DevExpress Dashboard (_bound-image-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BoundImageItem } from '../../../model/items/bound-image-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer } from './_base-properties-composer';
export declare class BoundImageItemPropertiesComposer extends DashboardItemPropertiesComposer<BoundImageItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: BoundImageItem): AccordionTab<any>[];
}
