﻿/**
* DevExpress Dashboard (_gauge-element-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { Gauge } from '../../../model/items/gauge/gauge';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDataItemContainerTabs, DataItemContainerPropertiesComposer, IDataItemContainerComposeTabsArgs } from './_base-properties-composer';
export declare class GaugeElementPropertiesComposer extends DataItemContainerPropertiesComposer<Gauge> {
    private editFormatHandler;
    constructor(customizeHandler: CustomizeDataItemContainerTabs, editFormatHandler?: (model: any) => void);
    protected _composeTabsCore(model: Gauge, args: IDataItemContainerComposeTabsArgs): AccordionTab<any>[];
    getCommonWrapper(model: Gauge, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser): ObjectPropertiesWrapper<Gauge>;
    getScaleWrapper(model: Gauge): ObjectPropertiesWrapper<Gauge>;
}
