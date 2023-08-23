﻿/**
* DevExpress Dashboard (_pivot-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PivotFormatRuleModel } from '../conditional-formatting/_view-model';
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { DataControllerOptions } from '../_factory';
import { dataControllerBase } from './_data-controller-base';
export declare class pivotDataController extends dataControllerBase {
    _measureIds: string[];
    _collapseStateCache: {
        [collapsedStateKey: string]: any;
    };
    _conditionalFormattingInfoCache: any;
    constructor(options: DataControllerOptions);
    getStyleSettingsInfo(cellItem: any, collapseStateCache: {
        [collapsedStateKey: string]: any;
    }, conditionalFormattingInfoCache: any, pointsCache: {
        columns: {
            [uniquePath: string]: itemDataAxisPoint;
        };
        rows: {
            [uniquePath: string]: itemDataAxisPoint;
        };
    }): any;
    private _getMeasureIds;
    private _getColumnAxis;
    private _getRowAxis;
    private _getCellInfo;
    protected _getStyleIndexes(rule: PivotFormatRuleModel, cellInfo: any, points: any): any[];
    private _findStyleSettingsOnAxis;
    private _getFormatRules;
    private _isRowValuePosition;
    private _getAxisPointByPath;
    private _getFormatRulesByDataId;
    private _getPointId;
}
