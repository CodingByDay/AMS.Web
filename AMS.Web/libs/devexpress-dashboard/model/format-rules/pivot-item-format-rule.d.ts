﻿/**
* DevExpress Dashboard (pivot-item-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { FormatConditionIntersectionLevelMode } from '../enums';
import { CellsItemFormatRule } from './cells-item-format-rule';
import { PivotItemFormatRuleLevel } from './pivot-item-format-rule-level';
export declare class PivotItemFormatRule extends CellsItemFormatRule {
    applyToColumn: ko.Observable<boolean>;
    intersectionLevelMode: ko.Observable<FormatConditionIntersectionLevelMode>;
    level: PivotItemFormatRuleLevel;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
