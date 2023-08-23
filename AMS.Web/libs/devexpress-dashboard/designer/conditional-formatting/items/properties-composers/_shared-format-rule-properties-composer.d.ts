﻿/**
* DevExpress Dashboard (_shared-format-rule-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../../common/_data-source-browser';
import { DashboardItemFormatRule } from '../../../../model';
import { DateTimeGroupInterval } from '../../../../model/enums';
import { CardItemDeltaFormatRule } from '../../../../model/format-rules/card-item-delta-format-rule';
import { CardItemFormatRule } from '../../../../model/format-rules/card-item-format-rule';
import { CellsItemFormatRule } from '../../../../model/format-rules/cells-item-format-rule';
import { ChartItemFormatRule } from '../../../../model/format-rules/chart-item-format-rule';
import { ScatterChartItemFormatRule } from '../../../../model/format-rules/scatter-chart-item-format-rule';
import { DataDashboardItem } from '../../../../model/items/data-dashboard-item';
import { ObjectPropertiesInfo, ObjectPropertiesWrapper } from '../../../form-adapter/_object-properties-wrapper';
import { IComposeTabsArgs, IDetailsPropertiesComposerBase } from '../../../items/properties-composers/_base-properties-composer';
import { AccordionTab } from '../../../properties-controller/_accordion-tab';
import { ConditionTypesFilters } from '../../_condition-type-editor';
export interface KeyText {
    uniqueName: string | ko.Observable<string>;
    displayName: string | ko.Observable<string>;
}
export interface FormatRulePropertiesComposerOptions<TRule extends DashboardItemFormatRule, TDashboardItem extends DataDashboardItem> {
    conditionTypeFilter?: ConditionTypesFilters;
    createDataTypeObservable: (model: TRule, dashboardItem: TDashboardItem, dataSourceBrowser: DataSourceBrowser) => ConditionEditorDataType;
    getCommonFormatRuleProperties: (model: TRule, dashboardItem: TDashboardItem, dataSourceBrowser: DataSourceBrowser, ruleAdded?: JQueryCallback) => ObjectPropertiesInfo<TRule>;
    getConditionFormatRuleProperties: (model: TRule, dashboardItem: TDashboardItem, dataSourceBrowser: DataSourceBrowser) => ObjectPropertiesInfo<TRule>;
    getMiscFormatRuleProperties: (model: TRule, dashboardItem: TDashboardItem, dataSourceBrowser: DataSourceBrowser) => ObjectPropertiesInfo<TRule>;
    getAdditionalTabs?: (model: TRule, dashboardItem: TDashboardItem, dataSourceBrowser: DataSourceBrowser) => AccordionTab[];
}
export declare class FormatRulePropertiesComposer<TRule extends DashboardItemFormatRule, TDashboardItem extends DataDashboardItem> implements IDetailsPropertiesComposerBase<DashboardItemFormatRule, FormatRuleComposeTabsArgs<TDashboardItem>> {
    private _options;
    constructor(_options: FormatRulePropertiesComposerOptions<TRule, TDashboardItem>);
    composeTabs(model: TRule, args: FormatRuleComposeTabsArgs<TDashboardItem>): AccordionTab[];
    private _fillCommonFormatRuleCommonWrapper;
    private _fillConditionWrapper;
    protected _fillMiscWrapper(tab: AccordionTab, model: TRule, dashboardItem: TDashboardItem, dataSourceBrowser: DataSourceBrowser): void;
}
export declare function createDeltaDataTypeObservable(model: CardItemDeltaFormatRule, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser): ConditionEditorDataType;
export interface ConditionEditorDataType {
    dataType: ko.Observable<string>;
    dateTimeGroupInterval: ko.Observable<DateTimeGroupInterval>;
}
export declare function createDataTypeObservable(formatRule: ChartItemFormatRule | ScatterChartItemFormatRule | CellsItemFormatRule | CardItemFormatRule, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser): ConditionEditorDataType;
export declare function addConditionEditor(wrapper: ObjectPropertiesWrapper<DashboardItemFormatRule>, dataTypeInfo: ConditionEditorDataType, formatRuleModel: DashboardItemFormatRule, dashboardItem: DataDashboardItem, requestRecalculation: JQueryCallback, specificTypeChanged: () => void, conditionTypeFilter?: ConditionTypesFilters): void;
export declare function getCommonCellsFormatRuleProperties(formatRule: CellsItemFormatRule, getDataItems: () => KeyText[], getApplyToDataItems: () => KeyText[]): ObjectPropertiesInfo<CellsItemFormatRule>;
export interface FormatRuleComposeTabsArgs<TDashboardItem extends DataDashboardItem> extends IComposeTabsArgs {
    dashboardItem: TDashboardItem;
    dataSourceBrowser: DataSourceBrowser;
    requestRecalculation: JQueryCallback;
    specificTypeChanged: () => void;
}
