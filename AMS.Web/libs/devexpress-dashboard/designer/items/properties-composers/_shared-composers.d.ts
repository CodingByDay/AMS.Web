﻿/**
* DevExpress Dashboard (_shared-composers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { DashboardLocalizationId } from '../../../data/localization/_default';
import { DateTimeGroupInterval, DeltaMap, GridDeltaColumn, KpiElement } from '../../../model';
import { DataItemNumericFormat } from '../../../model/data-item/data-item-format';
import { ChartAxis } from '../../../model/items/chart/chart-axis';
import { ChartItem } from '../../../model/items/chart/chart-item';
import { ChartSeries } from '../../../model/items/chart/chart-series';
import { DashboardItem } from '../../../model/items/dashboard-item';
import { DateFilterItem } from '../../../model/items/filter-items/date-filter-item';
import { KpiItem } from '../../../model/items/kpi/kpi-item';
import { BubbleMapItem } from '../../../model/items/map/bubble-map-item';
import { ChoroplethMapItem } from '../../../model/items/map/chorolpeth-map-item';
import { MapItem } from '../../../model/items/map/map-item';
import { PieMapItem } from '../../../model/items/map/pie-map-item';
import { PieItem } from '../../../model/items/pie/pie-item';
import { RangeFilterItem } from '../../../model/items/range-filter/range-filter-item';
import { ScatterChartItem } from '../../../model/items/scatter-chart/scatter-chart-item';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../../model/metadata/_base-metadata';
import { SerializableModel } from '../../../model/serializable-model';
import { ObjectPropertiesRules, ObjectPropertiesWrapper, PropertyDesciptors } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { PropertiesController } from '../../properties-controller/_properties-controller';
export declare class SharedComposers {
    static getCommonTab(model: DashboardItem, properties?: PropertyDesciptors, disabledRules?: ObjectPropertiesRules): AccordionTab;
    static getAllTab(model: SerializableModel): AccordionTab;
    static getContentArrangementTab(model: PieItem | KpiItem): AccordionTab;
    static getCommonWrapper(model: DashboardItem, specificProperties?: PropertyDesciptors, specificDisabledRules?: ObjectPropertiesRules, specificVisibilityRules?: ObjectPropertiesRules): ObjectPropertiesWrapper<DashboardItem>;
    static getCommonMapWrapper(model: MapItem, propertiesController: PropertiesController, specificProperties?: PropertyDesciptors): ObjectPropertiesWrapper<DashboardItem>;
    static updateValidationMessages(rules: any[]): void;
    static getAxisWrapper(model: ChartAxis, axisComputedTitle: ko.Subscribable<string>, alwaysShowZeroLevelInfo: IDashboardSerializationInfo, isDateField?: boolean, isNumericField?: boolean, groupInterval?: DateTimeGroupInterval): ObjectPropertiesWrapper<ChartAxis>;
    static getLegendWrapper(model: ChartItem | ScatterChartItem): ObjectPropertiesWrapper<ChartItem | ScatterChartItem>;
    static getContentArrangementWrapper(model: PieItem | KpiItem): ObjectPropertiesWrapper<KpiItem | PieItem>;
    static getLabelsWrapper(model: ChartSeries | ScatterChartItem): ObjectPropertiesWrapper<ChartSeries | ScatterChartItem>;
    static getAttributeNamesSerializationInfo(model: MapItem, propertyInfo: IDashboardSerializationInfo, includeNoneValue?: boolean, noneValueCaption?: DashboardLocalizationId): IDashboardSerializationInfo;
    static getShapeTitleSerializationInfo(model: MapItem): IDashboardSerializationInfo;
    static getColorLegendWrapper(model: ChoroplethMapItem | PieMapItem | BubbleMapItem): ObjectPropertiesWrapper<BubbleMapItem | ChoroplethMapItem | PieMapItem>;
    static getWeightedLegendWrapper(model: PieMapItem | BubbleMapItem): ObjectPropertiesWrapper<BubbleMapItem | PieMapItem>;
    static getNumericFormatWrapper(model: DataItemNumericFormat): ObjectPropertiesWrapper<DataItemNumericFormat>;
    static getDeltaOptionsWrapper(model: any): ObjectPropertiesWrapper<any>;
    static getDeltaFormatsOptionsWrapper(model: KpiElement | GridDeltaColumn | DeltaMap, editFormat?: (model: any) => void, ...additionalFormats: {
        title: string;
        numericFormat: DataItemNumericFormat;
    }[]): ObjectPropertiesWrapper<{
        deltaFormats: ko.ObservableArray<any>;
    }>;
    static getDeltaFormats(kpiElement: KpiElement | GridDeltaColumn | DeltaMap): any[];
    static getCustomRangesWrapper(model: RangeFilterItem | DateFilterItem, editRuleHandler: any, dataSourceBrowser: DataSourceBrowser, dimension: any): ObjectPropertiesWrapper;
    static getSparklineOptionsProperties(): IDashboardSerializationInfoArray;
}
