﻿/**
* DevExpress Dashboard (_pie-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PieItem } from '../../../model/items/pie/pie-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { ContainerTypeSelector } from '../container-type-selector/_container-type-selector';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer } from './_base-properties-composer';
export declare class PieItemPropertiesComposer extends DashboardItemPropertiesComposer<PieItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: PieItem): AccordionTab<any>[];
    getTypeWrapper(model: PieItem): ContainerTypeSelector;
    getLabelsWrapper(model: PieItem): ObjectPropertiesWrapper<PieItem>;
}
