﻿/**
* DevExpress Dashboard (_pivot-grid-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DxElement } from 'devextreme/core/element';
import dxPivotGrid, { Cell as dxPivotGridPivotGridCell } from 'devextreme/ui/pivot_grid';
import { dataControllerBase } from '../../../data/data-controllers/_data-controller-base';
import { pivotDataController } from '../../../data/data-controllers/_pivot-data-controller';
import { IExpandingState } from '../../../model/internal/_expanding-manager';
import { styleSettingsProvider } from '../../conditional-formatting/_style-settings-provider';
import { baseItem, DataPoint, ViewerItemInfo, ViewerItemOptions } from '../_base-item';
export declare class pivotGridItem extends baseItem {
    _collapseStateCache: {
        [collapseStateKey: string]: any;
    };
    _conditionalFormattingInfoCache: any[];
    private _pivotLoadingDeferred;
    private _pointsCache;
    _styleSettingsProvider: styleSettingsProvider;
    pivotGridViewer: dxPivotGrid;
    expandStateChanged: JQuery.Callbacks<Function>;
    _dataController: pivotDataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    protected get _captionToolbarSeparatorRequired(): boolean;
    private get _multiData();
    private get _viewModel();
    constructor(container: HTMLElement, options: ViewerItemOptions);
    dispose(): void;
    hideLoadingPanel(): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected renderPartialContentUnsafe(): void;
    protected getInfoUnsafe(): ViewerItemInfo;
    getExpandingState(isRowsExpanding?: boolean, isColumnsExpanding?: boolean): IExpandingState;
    private _onExpandStateChanged;
    private _getStatePaths;
    private _dataUpdateHook;
    protected _initializeData(newOptions: any): void;
    private _loadState;
    private _getPivotGridOptions;
    _getShowColumnGrandTotals(fields: any): any;
    _showRowGrandTotals(fields: any): any;
    _resetPivotLoadingDeferred(): void;
    _resolvePivotLoadingDeferred(): void;
    _expandValueChangingHandler: (args: any) => void;
    onCollapseStateChanged(isColumn: boolean, values: Array<any>, collapse: boolean): void;
    protected _resizeUnsafe(): void;
    _getDataPoint(element: any): DataPoint;
    _getWidget(): dxPivotGrid;
    _onCellPrepared(element: {
        component?: dxPivotGrid;
        element?: DxElement;
        area?: string;
        cellElement?: DxElement;
        cell?: dxPivotGridPivotGridCell;
        rowIndex?: number;
        columnIndex?: number;
    }): void;
    private _getFields;
    private _createAndLoadDataSource;
    private _getLoadData;
}
