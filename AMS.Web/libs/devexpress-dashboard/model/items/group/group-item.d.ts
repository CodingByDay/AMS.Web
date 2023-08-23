﻿/**
* DevExpress Dashboard (group-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DashboardItem } from '../dashboard-item';
import { DashboardItemGroupInteractivityOptions } from '../options/interactivity-options';
export declare class GroupItem extends DashboardItem {
    interactivityOptions: DashboardItemGroupInteractivityOptions;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
}
