﻿/**
* DevExpress Dashboard (_tab-container-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardTabPage } from '../../../model';
import { TabContainerItem } from '../../../model/items/tab-container-item/tab-container-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
import { DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class TabContainerItemPropertiesComposer extends DashboardItemPropertiesComposer<TabContainerItem> {
    private editTabPageHandler;
    constructor(editTabPageHandler: (tabPage: DashboardTabPage, args: CollectionEditorEditItemArguments) => void);
    _composeTabsCore(): void;
    composeTabs(tabContainer: TabContainerItem, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
}
