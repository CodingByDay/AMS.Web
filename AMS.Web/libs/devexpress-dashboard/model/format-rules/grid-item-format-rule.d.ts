/**
* DevExpress Dashboard (grid-item-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { CellsItemFormatRule } from './cells-item-format-rule';
export declare class GridItemFormatRule extends CellsItemFormatRule {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
