﻿/**
* DevExpress Dashboard (_grid-column-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { IDataItemProvider } from '../../../model/items/_binding-model';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { GridColumn, GridDeltaColumn, GridSparklineColumn } from '../../../model/items/grid/grid-columns';
import { GridItem } from '../../../model/items/grid/grid-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { ContainerTypeSelector } from '../container-type-selector/_container-type-selector';
import { CustomizeDataItemContainerTabs, DataItemContainerPropertiesComposer, IDataItemContainerComposeTabsArgs } from './_base-properties-composer';
export declare class GridColumnPropertiesComposer extends DataItemContainerPropertiesComposer<GridColumn> {
    editRuleHandler: any;
    private editDeltaFormatHandler;
    private _totals;
    constructor(customizeHandler: CustomizeDataItemContainerTabs, editRuleHandler: any, editDeltaFormatHandler?: (model: any) => void);
    protected _composeTabsCore(model: GridColumn, args: IDataItemContainerComposeTabsArgs): AccordionTab<any>[];
    getColumnTypeWrapper(model: GridColumn, containerType: ko.Observable<string>): ContainerTypeSelector;
    getColumnWrapper(model: GridColumn, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser): ObjectPropertiesWrapper<GridColumn>;
    getWidthWrapper(model: GridColumn): ObjectPropertiesWrapper<GridColumn>;
    getTotalsWrapper(model: GridColumn, p: IDataItemProvider): ObjectPropertiesWrapper<GridColumn>;
    getDeltaWrapper(model: GridDeltaColumn): ObjectPropertiesWrapper<GridDeltaColumn>;
    getSparklineWrapper(model: GridSparklineColumn): ObjectPropertiesWrapper<GridSparklineColumn>;
    getFormatRulesWrapper(model: GridColumn, dashboardItem: GridItem): ObjectPropertiesWrapper<GridItem>;
}
