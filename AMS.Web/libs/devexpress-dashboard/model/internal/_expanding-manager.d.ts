﻿/**
* DevExpress Dashboard (_expanding-manager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PivotState } from '../../viewer-parts/viewer-items/pivot-grid-item/_pivot-grid-item-helper';
export interface IExpandingState {
    rows: Array<Array<any>>;
    columns: Array<Array<any>>;
}
export interface IExpandingParams {
    values: Array<any>;
    isColumn: boolean;
}
export declare class ExpandingManager {
    private _expandingParams;
    private _expandingState;
    private _dxPivotState;
    getPivotExpandViewState(): any;
    setExpandingParams(expandingParams: IExpandingParams): any;
    onViewStateChanged(expandingState: IExpandingState, dxPivotState: PivotState): void;
    canProvideExpandingState(): IExpandingState | IExpandingParams;
    calculateExpandingState(): any;
    resetExpandingParams(): void;
    resetColumnViewState(autoExpand: boolean): void;
    resetRowViewState(autoExpand: boolean): void;
}
