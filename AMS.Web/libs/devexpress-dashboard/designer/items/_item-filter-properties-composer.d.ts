﻿/**
* DevExpress Dashboard (_item-filter-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { DataDashboardItem } from '../../model';
import { AccordionTab } from '../properties-controller/_accordion-tab';
import { IDetailsPropertiesComposer } from './properties-composers/_base-properties-composer';
export declare class ItemFilterPropertiesComposer implements IDetailsPropertiesComposer<any> {
    dataSourceBrowser: DataSourceBrowser;
    constructor(dataSourceBrowser: DataSourceBrowser);
    composeTabs(item: DataDashboardItem): Array<AccordionTab>;
    private _fillFilterTab;
    private _fillSimpleFilterTab;
}
