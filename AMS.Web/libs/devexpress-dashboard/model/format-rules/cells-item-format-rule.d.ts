﻿/**
* DevExpress Dashboard (cells-item-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardItemFormatRule } from './dashboard-item-format-rule';
export declare abstract class CellsItemFormatRule extends DashboardItemFormatRule {
    applyToRow: ko.Observable<boolean>;
    dataItemName: ko.Observable<string>;
    dataItemApplyToName: ko.Computed<string>;
    private _dataItemApplyToName;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
