﻿/**
* DevExpress Dashboard (_image-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageItem } from '../../../model/items/image-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDataItemContainerComposeTabsArgs } from './_base-properties-composer';
export declare class ImageItemPropertiesComposer extends DashboardItemPropertiesComposer<ImageItem> {
    protected _composeTabsCore(model: ImageItem, args?: IDataItemContainerComposeTabsArgs): void;
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    composeTabs(model: ImageItem): AccordionTab<any>[];
}
