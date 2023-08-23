﻿/**
* DevExpress Dashboard (dashboard-item-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TypedSerializableModel } from '../serializable-model';
import { FormatConditionBase } from './conditions/format-condition-base';
export declare abstract class DashboardItemFormatRule extends TypedSerializableModel {
    name: ko.Observable<string>;
    enabled: ko.Observable<boolean>;
    condition: ko.Computed<FormatConditionBase>;
    get _classCaption(): string;
    get _classId(): string;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _changeConditionType(propertyName: string): void;
}
