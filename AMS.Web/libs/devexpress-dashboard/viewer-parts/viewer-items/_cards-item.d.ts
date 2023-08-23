﻿/**
* DevExpress Dashboard (_cards-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { cardItemStyleSettingsProvider } from '../conditional-formatting/_style-settings-provider';
import { cardLayout } from '../widgets/widgets-viewer/cards/_card-layout';
import { WidgetsViewerBase, WidgetsViewerWidgetType } from '../widgets/widgets-viewer/_widgets-viewer-base';
import { CardWidgetImplementation } from '../_card-widget-implementation';
import { kpiItem } from './_kpi-item';
import { widgetItemCore } from './_widget-viewer-item-core';
export interface ICardModel {
    Layout?: ICardLayoutModel;
}
export interface ICardLayoutModel {
    MinWidth?: number;
    MaxWidth?: number;
    Rows?: Array<ICardLayoutRowModel>;
}
export interface ICardLayoutRowModel {
    VAlignment?: string;
    Indent?: number;
    Elements?: Array<ICardLayoutElementModel>;
}
export declare type RowElementType = 'Title' | 'Subtitle' | 'Text' | 'ActualValue' | 'AbsoluteVariation' | 'PercentVariation' | 'PercentOfTarget' | 'TargetValue' | 'Dimension' | 'Measure' | 'CardName';
export interface ICardLayoutElementModel {
    Type?: string;
    Color?: number;
    PredefinedColor?: string;
    HAlignment?: string;
    FontSize?: number;
    FontFamily?: string;
    FontStyle?: string;
    DataId?: string;
    Text?: string;
    Size?: number;
    Id?: string;
    IndicatorWidthRatio?: number;
    SparklineOptions?: SparklineOptionsModel;
}
export interface SparklineOptionsModel {
    ViewType: string;
    HighlightMinMaxPoints: boolean;
    HighlightStartEndPoints: boolean;
}
export declare class cardsItem extends kpiItem {
    _hasSparkline: boolean;
    useNewViewer: boolean;
    layoutCollection: {
        [id: string]: cardLayout;
    };
    apiHandlers: CardWidgetImplementation;
    _styleSettingsProvider: cardItemStyleSettingsProvider;
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    protected _initializeData(newOptions: any): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected createWidgetViewer(element: HTMLElement, options: any): WidgetsViewerBase;
    private initializeLayoutCollection;
    protected _isPaneEmpty(): boolean;
    _isBorderRequired(): boolean;
    _isTransparentBackground(): boolean;
    _getSpecificWidgetViewerOptions(): any;
    _getIgnorePadding(): boolean;
    _getWidgetType(): WidgetsViewerWidgetType;
    _getElementsName(): string;
    private setOldCardProperties;
    private setNewCardProperties;
    _setSourceItemProperties(sourceItem: widgetItemCore, cardModel: any, props: any): void;
    _getWidget(): CardWidgetImplementation;
    _generateInnerBorderClassesUnsafe(element?: HTMLElement): string[];
    dispose(): void;
    disposeLayoutCollection(): void;
}
