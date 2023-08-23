﻿/**
* DevExpress Dashboard (_kpi-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { itemDataTupleValues } from '../../data/item-data/_item-data-tuple';
import { widgetViewerItem } from './_widget-viewer-item';
import { widgetItemCore } from './_widget-viewer-item-core';
export declare abstract class kpiItem<TWidgetOptions extends widgetItemCore = widgetItemCore> extends widgetViewerItem<TWidgetOptions> {
    constructor(container: HTMLElement, options: any);
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _showTitle(): boolean;
    _getElementsName(): any;
    protected selectTupleUnsafe(tuple: itemDataTupleValues, state: any): void;
    protected _setSelectionUnsafe(values: any): void;
    _getDataPoint(element: any): {
        getValues: (name: any) => any;
        getDeltaIds: () => any[];
        getMeasureIds: () => any[];
        getSelectionValues: () => any;
    };
    _isMultiDataSupported(): boolean;
    _setSourceItemProperties(sourceItem: TWidgetOptions, elementModel: any, props: any): void;
    protected _applySelectionUnsafe(): void;
}
