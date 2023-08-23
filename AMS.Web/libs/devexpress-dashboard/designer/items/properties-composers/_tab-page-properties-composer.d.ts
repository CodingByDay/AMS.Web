/**
* DevExpress Dashboard (_tab-page-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardTabPage } from '../../../model';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class DashboardTabPagePropertiesComposer extends DashboardItemPropertiesComposer<DashboardTabPage> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    _composeTabsCore(tabPage: DashboardTabPage, args: IDashboardItemComposeTabsArgs): AccordionTab<any>[];
}
