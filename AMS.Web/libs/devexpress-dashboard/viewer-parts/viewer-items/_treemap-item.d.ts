﻿/**
* DevExpress Dashboard (_treemap-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import dxTreeMap, { Properties as dxTreeMapOptions } from 'devextreme/viz/tree_map';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { treemapDataController } from '../../data/data-controllers/_treemap-data-controller';
import { itemDataTupleValues } from '../../data/item-data/_item-data-tuple';
import { baseItem, DataPoint } from './_base-item';
export declare class treemapItem extends baseItem {
    itemElementCustomColor: JQuery.Callbacks<Function>;
    treemapViewer: dxTreeMap;
    protected _dataController: treemapDataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    dispose(): void;
    protected _initializeData(newOptions: any): void;
    protected _clearSelectionUnsafe(): void;
    protected selectTupleUnsafe(tuple: itemDataTupleValues, state: any): void;
    protected _setSelectionUnsafe(values: any): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected updateContentStateUnsafe(): void;
    _selectNodes(valueSet: any, state: any): void;
    _clickAction(tuple: itemDataTupleValues): void;
    _elementCustomColor(eventArgs: any): void;
    _getTreeMapViewerOptions(): dxTreeMapOptions;
    _getLayoutAlgorithm(): any;
    _getLayoutDirection(): "leftBottomRightTop" | "leftTopRightBottom" | "rightBottomLeftTop" | "rightTopLeftBottom";
    _getDataPoint(element: any): DataPoint;
    _getElementInteractionValue(element: any): any;
    _getDataPointMeasureIds(): any[];
    protected _updateContentSizeUnsafe(): void;
    _getWidget(): dxTreeMap;
    _isMultiDataSupported(): boolean;
    protected _applySelectionUnsafe(): void;
}
