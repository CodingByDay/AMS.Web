﻿/**
* DevExpress Dashboard (_choropleth-map-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChoroplethMapItem } from '../../../model/items/map/chorolpeth-map-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class ChoroplethMapItemPropertiesComposer extends DashboardItemPropertiesComposer<ChoroplethMapItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: ChoroplethMapItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
    getShapeLabelsWrapper(model: ChoroplethMapItem): ObjectPropertiesWrapper<ChoroplethMapItem>;
}
