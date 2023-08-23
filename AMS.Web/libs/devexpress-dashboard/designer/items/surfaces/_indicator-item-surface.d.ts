﻿/**
* DevExpress Dashboard (_indicator-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IExtension } from '../../../common/common-interfaces';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { ChartItem } from '../../../model';
import { ChartIndicator } from '../../../model/items/chart/chart-indicator';
import { PropertiesController } from '../../properties-controller/_properties-controller';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
export declare class IndicatorSurface {
    model: ko.Observable<ChartIndicator>;
    dashboardItem: ChartItem;
    dataSourceBrowser: DataSourceBrowser;
    propertiesController: PropertiesController;
    constructor(model: ko.Observable<ChartIndicator>, dashboardItem: ChartItem, dataSourceBrowser: DataSourceBrowser, propertiesController: PropertiesController);
    updatePropertiesTabs(requestRecalculation: JQueryCallback, findExtension: (name: string) => IExtension): void;
    startEditing(args: CollectionEditorEditItemArguments, findExtension: (name: string) => IExtension): void;
}
