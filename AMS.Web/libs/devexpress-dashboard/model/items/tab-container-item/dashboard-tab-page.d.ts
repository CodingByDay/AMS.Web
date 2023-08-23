﻿/**
* DevExpress Dashboard (dashboard-tab-page.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DashboardItem } from '../dashboard-item';
import { DashboardItemGroupInteractivityOptions } from '../options/interactivity-options';
export declare class DashboardTabPage extends DashboardItem {
    showItemAsTabPage: ko.Observable<boolean>;
    private _uniqueNamePrefix;
    interactivityOptions: DashboardItemGroupInteractivityOptions;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    getUniqueNamePrefix(): string;
    protected _getDefaultItemType(): string;
}
