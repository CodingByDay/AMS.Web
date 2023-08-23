﻿/**
* DevExpress Dashboard (_textbox-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TextBoxItem } from '../../../model/items/text-box-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer } from './_base-properties-composer';
export declare class TextBoxItemPropertiesComposer extends DashboardItemPropertiesComposer<TextBoxItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(model: TextBoxItem): AccordionTab<any>[];
}
