﻿/**
* DevExpress Dashboard (_scatter-chart-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { ScatterChartItem } from '../../../model/items/scatter-chart/scatter-chart-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class ScatterChartItemSurface extends DataDashboardItemSurface<ScatterChartItem> {
    constructor(dashboardItem: ScatterChartItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController);
    fillSections(): void;
    getPropertiesComposer(): DashboardItemPropertiesComposer<ScatterChartItem>;
    private editCFRuleRuleHandler;
    private createCFRuleDelegate;
    private addConditionalFormattingOptions;
    protected extendHiddenMeasuresTabs(tabs: AccordionTab[], model: any): void;
}
