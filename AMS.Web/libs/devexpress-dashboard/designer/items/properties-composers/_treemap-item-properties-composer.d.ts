﻿/**
* DevExpress Dashboard (_treemap-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataItem } from '../../../model/data-item/data-item';
import { TreemapItem } from '../../../model/items/treemap/treemap-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer } from './_base-properties-composer';
export declare class TreemapItemPropertiesComposer extends DashboardItemPropertiesComposer<TreemapItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: TreemapItem): AccordionTab<any>[];
    getLayoutWrapper(model: TreemapItem): ObjectPropertiesWrapper<TreemapItem>;
    getLabelsWrapper(model: TreemapItem): ObjectPropertiesWrapper<TreemapItem>;
    static getTileOptionsTab(model: TreemapItem, dataItem: DataItem): AccordionTab<any>;
    protected static getTileOptionsWrapper(model: TreemapItem, dataItem: DataItem): ObjectPropertiesWrapper<DataItem>;
}
