﻿/**
* DevExpress Dashboard (_chart-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExtension } from '../../../common/common-interfaces';
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { ChartItem } from '../../../model/items/chart/chart-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class ChartItemSurface extends DataDashboardItemSurface<ChartItem> {
    private editCFRuleRuleHandler;
    private createCFRuleDelegate;
    private editChartIndicatorHandler;
    private createChartIndicatorDelegate;
    private addConditionalFormattingOptions;
    protected extendHiddenMeasuresTabs(tabs: AccordionTab[], model: any): void;
    fillSections(): void;
    constructor(dashboardItem: ChartItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController, findExtension?: (name: string) => IExtension);
    getPropertiesComposer(): DashboardItemPropertiesComposer<ChartItem>;
}
