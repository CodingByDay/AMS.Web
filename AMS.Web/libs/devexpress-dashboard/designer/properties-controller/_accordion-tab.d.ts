﻿/**
* DevExpress Dashboard (_accordion-tab.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser, IFieldConstraint } from '../../common/_data-source-browser';
import { DataItemLink } from '../../model/data-item/data-item';
import { IDataField } from '../../model/data-sources/_data-field';
import { ObjectPropertiesWrapper } from '../form-adapter/_object-properties-wrapper';
import { ContainerTypeSelector } from '../items/container-type-selector/_container-type-selector';
export declare var KnownTabs: {
    Binding: string;
    DataShaping: string;
    NumericFormat: string;
    DateTimeFormat: string;
    TopN: string;
    Interactivity: string;
    ItemFilter: string;
    VisibleDataFilter: string;
    Common: string;
    Totals: string;
    AxisX: string;
    Indicators: string;
    IndicatorSettings: string;
    AxisY: string;
    Legend: string;
    ColoringOptions: string;
    ColorLegend: string;
    WeightedLegend: string;
    Layout: string;
    ConditionalFormatting: string;
    GridColumnFilter: string;
    FormatRuleCommon: string;
    FormatRuleCondition: string;
    FormatRuleChartLegend: string;
    FormatRuleMisc: string;
    CustomRanges: string;
    Type: string;
    PointLabels: string;
    DeltaOptions: string;
    ScaleOptions: string;
    SparklineOptions: string;
    CardTemplates: string;
    DeltaFormats: string;
    CardTemplateSettings: string;
    ContentArrangement: string;
    ShapeLabels: string;
    Labels: string;
    DataLayout: string;
    DataItemsGroup: string;
    ColorScheme: string;
    Calculations: string;
    Expression: string;
    TileOptions: string;
    UnwrappedDataItem: string;
    CustomMapOptions: string;
    MeasureFilter: string;
    TabContainer: string;
};
export declare class AccordionTab<TTabModel = any> {
    name: string;
    category: string | ko.Observable<string>;
    constructor(name: string, category: string | ko.Observable<string>, tabModel?: any);
    grabData(tab: AccordionTab): void;
    visible: ko.Computed<boolean>;
    tabModel: ko.Observable<TTabModel>;
    orderNo: number;
    get summary(): ko.Computed<string>;
    get buttons(): Array<any>;
    tabTemplate?: string;
    headerTemplate?: string;
    headerModel?: any;
    unsubscribeTabModel(tabModel: any): void;
    disposeTabModel(tabModel: any): void;
    dispose(): void;
}
export declare class ContentInHeaderAccordionTab extends AccordionTab {
    orderNo: number;
    style: string;
    headerTemplate: string;
    hasNoBorder: boolean;
    onTitleClick: (tabModel: any, data: any, event: any) => boolean;
}
export declare class TypeAccordionTab extends AccordionTab<ContainerTypeSelector> {
    orderNo: number;
    style: string;
    headerTemplate: string;
    tabTemplate: string;
    hasNoBorder: boolean;
    onTitleClick: (tabModel: ContainerTypeSelector, data: any, event: any) => void;
}
export declare class StyleAccordionTab extends AccordionTab<ContainerTypeSelector> {
    orderNo: number;
    style: string;
    headerTemplate: string;
    hasNoBorder: boolean;
    onTitleClick: (tabModel: ContainerTypeSelector, data: any, event: any) => void;
}
export declare class ItemGroupAccordionTab extends AccordionTab {
    style: string;
    orderNo: number;
    headerTemplate: string;
    get headerHeight(): number;
    hasNoBorder: boolean;
}
export declare class BindingAccordionTab extends AccordionTab<{
    choosenField: ko.Observable<ko.Observable<IDataField>>;
    dataItemLink: DataItemLink;
    constraint: IFieldConstraint;
    dataSourceBrowser: DataSourceBrowser;
    dataMemberPath: ko.Observable<ko.Subscribable<string>>;
    additionalProperties: ko.Observable<ko.Subscribable<ObjectPropertiesWrapper>>;
    summary: ko.Computed<string>;
    summaryHint: ko.Computed<string>;
}> {
    name: string;
    category: string;
    constructor(name: string, category: string);
    tabTemplate: string;
    get summaryHint(): ko.Computed<string>;
    unsubscribeTabModel(tabModel: any): void;
    grabData(tab: BindingAccordionTab): void;
    orderNo: number;
}
