﻿/**
* DevExpress Dashboard (_data-grid-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import dxDataGrid, { Properties as dxDataGridOptions } from 'devextreme/ui/data_grid';
import { dataControllerBase } from '../../../data/data-controllers/_data-controller-base';
import { CellValue, gridDataController } from '../../../data/data-controllers/_grid-data-controller';
import { itemDataTupleValues } from '../../../data/item-data/_item-data-tuple';
import { GridColumnTotalType } from '../../../model/enums';
import { styleSettingsProvider } from '../../conditional-formatting/_style-settings-provider';
import { baseItem, DataPoint, ViewerItemInfo } from '../_base-item';
import { ColumnWidthCalculator, ColumnWidthMode, IBestFitProvider, IWidthOptions } from './_column-width-calculator';
export interface GridClientState {
    widthOptions: IWidthOptions;
}
export declare class dataGridItem extends baseItem {
    _calculator: ColumnWidthCalculator;
    _styleSettingsProvider: styleSettingsProvider;
    _dataGrid: dxDataGrid;
    _updateLocked: boolean;
    _digits_string: string;
    charWidth: number;
    resetClientStateOnUpdate: boolean;
    manualyResetClientState: boolean;
    clientFilterChanged: JQuery.Callbacks<Function>;
    clientFilterStateChanged: JQuery.Callbacks<Function>;
    protected get _captionToolbarSeparatorRequired(): boolean;
    _dataController: gridDataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    TextAlignment: {
        [key: string]: 'left' | 'right' | 'center';
    };
    DisplayMode: {
        Value: string;
        Delta: string;
        Bar: string;
        Sparkline: string;
        Image: string;
        Hyperlink: string;
    };
    SummaryType: {
        Count: string;
        Min: string;
        Max: string;
        Avg: string;
        Sum: string;
    };
    CssClasses: {
        wordWrap: string;
        gridAdaptiveCellValue: string;
    };
    dispose(): void;
    protected _clearSelectionUnsafe(): void;
    protected _setSelectionUnsafe(values: any): void;
    protected _selectTuplesCore(tuples: itemDataTupleValues[], updateTupleDelegate: (tuple: itemDataTupleValues) => itemDataTupleValues, state: any): void;
    protected renderPartialContentUnsafe(): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected getInfoUnsafe(): ViewerItemInfo;
    _getSortInfo(): any[];
    protected _initializeData(newOptions: any): void;
    getValueItem(columnName: string, index: number): CellValue;
    _bestFitProvider: IBestFitProvider;
    _resetColumnWidths(): void;
    _updateColumnsWidth(columnWidths: Array<number>): void;
    _getColumnWidthProperty(): string;
    _getColumnWidthMode(): ColumnWidthMode;
    _getDefaultBestCharacterCount(index: number): number;
    _beginResize(): void;
    _endResize(): void;
    _updateCharWidth(): void;
    gridWidthOptionsChanged: (args: {
        widthOptions: any;
    }) => void;
    _clientStateUpdateDebounced: (...args: any[]) => void;
    _onColumnsChanging(e: {
        component: dxDataGrid;
        optionNames: any;
    }): void;
    _getViewOptions(): dxDataGridOptions;
    _customizeViewOptions: (opts: dxDataGridOptions) => void;
    _getCommonOptions(): dxDataGridOptions;
    _getRowsValues(data: {
        index: number;
    }): any[];
    _getSelectedRowIndices(): number[];
    _getTotalCaptionTemplate(totalType: GridColumnTotalType): string;
    _getTotals(): any[];
    _calculateCustomSummary(options: any): void;
    private _getColumnName;
    private calculateFilterExpressionHandler;
    _getColumns(): any[];
    private _changeGridSparklineColumnsWidth;
    _isDetail(rowType: string): boolean;
    protected _applySelectionUnsafe(): void;
    protected _resizeUnsafe(): void;
    _getDataPoint(element: any): DataPoint;
    _getColumnsByColumnType(columnType: any): any[];
    _getColumnDataIdsByColumnType(columnType: any): any[];
    _getElementInteractionValue(element: any, viewModel: any): any[];
    _getWidget(): dxDataGrid<any, any>;
    _setGridSelection(values: any, keyProcessingDelegate?: any): void;
    _selectRows(data: any): void;
    _isMultiDataSupported(): boolean;
    private isSummaryFilterCollecting;
    private canRaiseFilterChanged;
    _raiseClientFilterChanged(e: any): void;
}
