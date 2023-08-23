﻿/**
* DevExpress Dashboard (_scatter-chart-item-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ScatterChartItemFormatRule } from '../../../model/format-rules/scatter-chart-item-format-rule';
import { ScatterChartItem } from '../../../model/items/scatter-chart/scatter-chart-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer, IDashboardItemComposeTabsArgs } from './_base-properties-composer';
export declare class ScatterChartItemPropertiesComposer extends DashboardItemPropertiesComposer<ScatterChartItem> {
    private editCFRuleHandler;
    private createCFRuleDelegate;
    constructor(customizeHandler: CustomizeDashboardItemTabs, editCFRuleHandler: (item: ScatterChartItemFormatRule, args: CollectionEditorEditItemArguments, container?: ko.Observable<ScatterChartItemFormatRule>) => void, createCFRuleDelegate: () => ScatterChartItemFormatRule);
    _composeTabsCore(model: ScatterChartItem, args: IDashboardItemComposeTabsArgs): Array<AccordionTab>;
}
