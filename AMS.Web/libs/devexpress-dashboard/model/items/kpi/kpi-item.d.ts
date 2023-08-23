﻿/**
* DevExpress Dashboard (kpi-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ContentArrangementMode } from '../../enums';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DashboardItemInteractivityOptions } from '../options/interactivity-options';
import { SeriesItem } from '../series-item';
export declare abstract class KpiItem extends SeriesItem {
    interactivityOptions: DashboardItemInteractivityOptions;
    contentArrangementMode: ko.Observable<ContentArrangementMode>;
    contentLineCount: ko.Observable<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getMasterFilterMode(): string;
    protected _getDrillDownEnabled(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
}
