﻿/**
* DevExpress Dashboard (_geopoint-map-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GeoPointMapItem } from '../../../model/items/map/geo-point-map-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class GeoPointMapItemPropertiesComposer extends DashboardItemPropertiesComposer<GeoPointMapItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: GeoPointMapItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
}
