﻿/**
* DevExpress Dashboard (_gauges-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Properties as dxCircularGaugeOptions } from 'devextreme/viz/circular_gauge';
import { Properties as dxLinearGaugeOptions } from 'devextreme/viz/linear_gauge';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { WidgetsViewerOptions, WidgetsViewerWidgetType } from '../widgets/widgets-viewer/_widgets-viewer-base';
import { kpiItem } from './_kpi-item';
import { widgetItemCore } from './_widget-viewer-item-core';
export declare class gaugesItem extends kpiItem<dxLinearGaugeOptions & dxCircularGaugeOptions & widgetItemCore> {
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    _getWidgetViewerOptions(): WidgetsViewerOptions;
    _getSpecificWidgetViewerOptions(): any;
    _supportAnimation(): boolean;
    _getWidgetType(): WidgetsViewerWidgetType;
    _getElementsName(): string;
    _showTitle(): any;
    _getWidget(): any[];
    _setSourceItemProperties(sourceItem: widgetItemCore, gaugeModel: any, props: any): void;
    _setVisualProperties(sourceItem: dxLinearGaugeOptions | dxCircularGaugeOptions, gaugeModel: any, range: any): void;
}
