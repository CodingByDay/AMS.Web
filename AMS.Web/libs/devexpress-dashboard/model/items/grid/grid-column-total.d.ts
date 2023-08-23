﻿/**
* DevExpress Dashboard (grid-column-total.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { GridColumnTotalType } from '../../enums';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { TypedSerializableModel } from '../../serializable-model';
export declare class GridColumnTotal extends TypedSerializableModel {
    totalType: ko.Observable<GridColumnTotalType>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    static getDisplayValue(totalType: string): string;
    static getLocalization(totalType: string): string;
    protected _getDefaultItemType(): string;
}
export declare let _totalTypeTemplate: IDashboardSerializationInfo;
export declare let _gridColumnTotalSerializationsInfo: IDashboardSerializationInfoArray;
