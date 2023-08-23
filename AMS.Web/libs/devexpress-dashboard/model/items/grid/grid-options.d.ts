﻿/**
* DevExpress Dashboard (grid-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { GridColumnWidthMode } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class GridOptions extends SerializableModel {
    allowCellMerge: ko.Observable<boolean>;
    columnWidthMode: ko.Observable<GridColumnWidthMode>;
    enableBandedRows: ko.Observable<boolean>;
    showVerticalLines: ko.Observable<boolean>;
    showHorizontalLines: ko.Observable<boolean>;
    showColumnHeaders: ko.Observable<boolean>;
    wordWrap: ko.Observable<boolean>;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _getViewModel(): Object;
}
