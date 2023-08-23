﻿/**
* DevExpress Dashboard (_calculation-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../../common/_data-source-browser';
import { Measure } from '../../../../model/data-item/measure';
import { IDisposable } from '../../../../model/disposable-object';
import { DataDashboardItem } from '../../../../model/items/data-dashboard-item';
import { AccordionTab } from '../../../properties-controller/_accordion-tab';
import { IPropertiesHolder, PropertiesController } from '../../../properties-controller/_properties-controller';
import { CollectionEditorEditItemArguments } from '../../../ui-widgets/collection-editor/_collection-editor-viewmodel';
export declare class CalculationSurface implements IDisposable, IPropertiesHolder {
    model: any;
    measure: Measure;
    dashboardItem: DataDashboardItem;
    dataSourceBrowser: DataSourceBrowser;
    propertiesController: PropertiesController;
    private _disposables;
    constructor(model: any, measure: Measure, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser, propertiesController: PropertiesController);
    propertiesTabs: ko.ObservableArray<AccordionTab<any>>;
    updatePropertiesTabs(): void;
    startEditing(args: CollectionEditorEditItemArguments): void;
    dispose(): void;
}
