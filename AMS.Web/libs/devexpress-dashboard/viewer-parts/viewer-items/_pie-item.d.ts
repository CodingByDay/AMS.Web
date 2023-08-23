﻿/**
* DevExpress Dashboard (_pie-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { pieDataController } from '../../data/data-controllers/_pie-data-controller';
import { itemDataTupleValues } from '../../data/item-data/_item-data-tuple';
import { WidgetsViewerWidgetType } from '../widgets/widgets-viewer/_widgets-viewer-base';
import { widgetViewerItem } from './_widget-viewer-item';
export declare class pieItem extends widgetViewerItem {
    itemElementCustomColor: JQuery.Callbacks<Function>;
    pieMouseEventController: pieMouseEventController;
    sizeGroupId: any;
    protected _dataController: pieDataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    protected _initializeData(newOptions: any): void;
    protected _clearSelectionUnsafe(): void;
    protected updateContentStateUnsafe(): void;
    protected selectTupleUnsafe(tuple: itemDataTupleValues, state: any): void;
    protected _setSelectionUnsafe(values: any): void;
    _elementCustomColor(eventArgs: any): void;
    _createPieMouseEventController(): void;
    _isHoverEnabled(): boolean;
    _isItemSelectionEnabled(): boolean;
    _isLabelsVisible(): boolean;
    _isShowPieCaptions(): any;
    _supportAnimation(): boolean;
    _getSpecificWidgetViewerOptions(): any;
    _getWidgetType(): WidgetsViewerWidgetType;
    _getDataSource(): {};
    _getPointSelectionEnabled(): boolean;
    _getFormatLabelHandler(valueType: any): (label: any) => any;
    _getTooltipPattern(valueType: any): "" | "{0}: {1}" | "{0} ({1})" | "{0}: {1} ({2})";
    _getElementInteractionValue(element: any, viewModel?: any): any;
    _getOnClickHandler(): (e: any) => void;
    _getSelectPointsHandler(): (e: any) => void;
    _getOnHoverHandler(): (e: any) => void;
    _getHoverPointsHandler(): (e: any) => void;
    _pieMouseEventHandler(element: any): void;
    _sliceMouseEventHandler(element: any): void;
    _getDataPoint(element: any): {
        getValues: (name: any) => any;
        getDeltaIds: () => any[];
        getMeasureIds: () => any;
    };
    _getMeasuresIds(sliceTag: any): any;
    _isMultiDataSupported(): boolean;
    _getWidget(): any[];
    protected _applySelectionUnsafe(): void;
}
export declare class pieMouseEventController {
    pieData: any;
    sliceData: any;
    shouldRaise: boolean;
    ready: JQuery.Callbacks<Function>;
    timer: number;
    constructor();
    setPieData(data: any): void;
    setSliceData(data: any): void;
}
