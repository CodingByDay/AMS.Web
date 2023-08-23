/**
* DevExpress Dashboard (card-item-delta-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { DeltaValueType } from '../enums';
import { CardItemFormatRuleBase } from './card-item-format-rule-base';
export declare class CardItemDeltaFormatRule extends CardItemFormatRuleBase {
    deltaValueType: ko.Observable<DeltaValueType>;
    cardId: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
