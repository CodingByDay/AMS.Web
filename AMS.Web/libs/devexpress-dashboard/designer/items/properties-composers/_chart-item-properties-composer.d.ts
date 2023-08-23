﻿/**
* DevExpress Dashboard (_chart-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { IDataField } from '../../../model/data-sources/_data-field';
import { ChartItemFormatRule } from '../../../model/format-rules/chart-item-format-rule';
import { ChartIndicator } from '../../../model/items/chart/chart-indicator';
import { ChartItem } from '../../../model/items/chart/chart-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export interface IChartItemPropertiesComposerOptions {
    customizeHandler: CustomizeDashboardItemTabs;
    editCFRuleHandler?: (item: ChartItemFormatRule, args: CollectionEditorEditItemArguments, container?: ko.Observable<ChartItemFormatRule>) => void;
    createCFRuleDelegate?: () => ChartItemFormatRule;
    editChartIndicatorHandler?: (item: ChartIndicator, args: CollectionEditorEditItemArguments, container?: ko.Observable<ChartIndicator>) => void;
    createIndicatorDelegate?: () => ChartIndicator;
}
export declare class ChartItemPropertiesComposer extends DashboardItemPropertiesComposer<ChartItem> {
    private options;
    constructor(options: IChartItemPropertiesComposerOptions);
    _getAxisXTabModel(model: ChartItem, dataSourceBrowser: DataSourceBrowser, argumentDataField: IDataField): ObjectPropertiesWrapper;
    _composeTabsCore(model: ChartItem, args: IDashboardItemComposeTabsArgs): Array<AccordionTab>;
}
