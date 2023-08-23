﻿/**
* DevExpress Dashboard (_card-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { CardItem } from '../../../model/items/card/card-item';
import { CardLayoutTemplate } from '../../../model/items/card/card-layout-template';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class CardItemSurface extends DataDashboardItemSurface<CardItem> {
    private _editRuleHandler;
    private addConditionalFormattingOptions;
    protected extendHiddenMeasuresTabs(tabs: AccordionTab[], model: any): void;
    fillSections(): void;
    constructor(dashboardItem: CardItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController);
    getPropertiesComposer(): DashboardItemPropertiesComposer<CardItem>;
    applyLayoutTemplateToAllCards(template: CardLayoutTemplate): void;
}
