﻿/**
* DevExpress Dashboard (_chart-series-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { ChartItemFormatRule } from '../../../model/format-rules/chart-item-format-rule';
import { ChartSeries } from '../../../model/items/chart/chart-series';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
import { CustomizeDataItemContainerTabs, DataItemContainerPropertiesComposer, IDataItemContainerComposeTabsArgs } from './_base-properties-composer';
export declare class ChartSeriesPropertiesComposer extends DataItemContainerPropertiesComposer<ChartSeries> {
    private _containerTypesMap;
    private _allowConfigurePointLabels;
    private _allowSecondaryAxis;
    private _editCFRuleHandler?;
    private _createCFRuleDelegate?;
    constructor(customizeHandler: CustomizeDataItemContainerTabs, _containerTypesMap?: any, _allowConfigurePointLabels?: boolean, _allowSecondaryAxis?: boolean, _editCFRuleHandler?: (item: ChartItemFormatRule, args: CollectionEditorEditItemArguments, container?: ko.Observable<ChartItemFormatRule>) => void, _createCFRuleDelegate?: () => ChartItemFormatRule);
    protected _composeTabsCore(model: ChartSeries, args: IDataItemContainerComposeTabsArgs): AccordionTab<any>[];
    private _fillSeriesTypeWrapper;
    private _showPointMarkersVisible;
    protected _showIgnoreEmptyPointsVisible(model: ChartSeries): boolean;
    private _fillSeriesGeneralTab;
    protected _fillConditionalFormattingTab(tab: AccordionTab, series: ChartSeries, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser): void;
}
