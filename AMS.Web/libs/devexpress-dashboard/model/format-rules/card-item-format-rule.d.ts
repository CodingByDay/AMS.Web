/**
* DevExpress Dashboard (card-item-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { CardItemFormatRuleBase } from './card-item-format-rule-base';
export declare class CardItemFormatRule extends CardItemFormatRuleBase {
    dataItemName: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
