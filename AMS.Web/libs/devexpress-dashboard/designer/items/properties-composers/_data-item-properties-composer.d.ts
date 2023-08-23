﻿/**
* DevExpress Dashboard (_data-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser, IFieldConstraint } from '../../../common/_data-source-browser';
import { DashboardLocalizationId } from '../../../data/localization/_default';
import { MeasureCalculation } from '../../../model/data-item/calculations/measure-calculation';
import { DataItem, DataItemLink } from '../../../model/data-item/data-item';
import { Dimension } from '../../../model/data-item/dimension';
import { Measure } from '../../../model/data-item/measure';
import { IDataField } from '../../../model/data-sources/_data-field';
import { DashboardItemFormatRule } from '../../../model/format-rules/dashboard-item-format-rule';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab, BindingAccordionTab } from '../../properties-controller/_accordion-tab';
import { PropertiesController } from '../../properties-controller/_properties-controller';
import { IComposeTabsArgs, IDetailsPropertiesComposerBase } from './_base-properties-composer';
export interface ICalculationDefinition {
    title: DashboardLocalizationId;
    data: {
        type?: typeof MeasureCalculation;
        default?: any;
        isEqual?: (c: MeasureCalculation) => boolean;
    };
}
export declare class DataItemsPropertiesComposer implements IDetailsPropertiesComposerBase<DataItemLink, IDataItemsLinkComposeTabsArgs> {
    private static _addConstraint;
    private static _mergeRules;
    composeTabs(model: DataItemLink, args: IDataItemsLinkComposeTabsArgs): AccordionTab<any>[];
    fillBindingTab(bindingTab: BindingAccordionTab, model: DataItemLink, choosenField: ko.Observable<IDataField>, dataSourceBrowser: DataSourceBrowser, dataDashboardItem: DataDashboardItem, constraint: IFieldConstraint): void;
    fillOptionsTab(tab: AccordionTab, dataItem: DataItem, model: DataItemLink, dataDashboardItem: DataDashboardItem): void;
    fillDataShapingPropertiesTab(tab: AccordionTab, dataDashboardItem: DataDashboardItem, model: DataItemLink, dataField: IDataField, measures: Array<DataItem>, dataSourceBrowser: DataSourceBrowser): void;
    private _createExactDateProperties;
    fillDataItemExactDatetimeFormatTab(tab: AccordionTab, model: DataItem): void;
    private _createExactDatePropertiesWrapper;
    fillDimensionDatetimeFormatTab(tab: AccordionTab, model: Dimension): void;
    fillTopNTab(tab: AccordionTab, dataDashboardItem: DataDashboardItem, dataItem: Dimension, dataField: IDataField, measures: Array<Measure>, supportsTopNOther: boolean, dataSourceBrowser: DataSourceBrowser): void;
    fillCalculationsTab(tab: AccordionTab, measure: Measure, dataDashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser, propertiesController: PropertiesController): void;
    private _fillFilterTab;
    static getCellFormatRuleCreator(dataItem: DataItem, dataItemApplyTo: DataItem, formatRuleItemType: string): () => DashboardItemFormatRule;
    static getCellFormatRuleFilter(dataItem: DataItem): (rule: DashboardItemFormatRule) => boolean;
    static getFormatRulesWrapper(model: DataDashboardItem, createNewItemHandler: () => DashboardItemFormatRule, visibleItemsFilter: (rule: DashboardItemFormatRule) => boolean, editHandler: any): ObjectPropertiesWrapper<DataDashboardItem>;
}
export interface IDataItemsLinkComposeTabsArgs extends IComposeTabsArgs {
    dataDashboardItem: DataDashboardItem;
    choosenField: ko.Observable<IDataField>;
    dataSourceBrowser: DataSourceBrowser;
    unwrappedDataItem: boolean;
    constraint?: IFieldConstraint;
    propertiesController?: PropertiesController;
}
