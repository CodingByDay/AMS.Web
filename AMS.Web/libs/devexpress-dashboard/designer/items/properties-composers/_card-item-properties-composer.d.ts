﻿/**
* DevExpress Dashboard (_card-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CardItem } from '../../../model/items/card/card-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class CardItemPropertiesComposer extends DashboardItemPropertiesComposer<CardItem> {
    editRuleHandler: any;
    constructor(customizeHandler: CustomizeDashboardItemTabs, editRuleHandler: any);
    _composeTabsCore(model: CardItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
}
