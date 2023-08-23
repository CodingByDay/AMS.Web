﻿/**
* DevExpress Dashboard (_chart-indicators-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { IExtension } from '../../../common/common-interfaces';
import { ChartIndicator } from '../../../model/items/chart/chart-indicator';
import { ChartItem } from '../../../model/items/chart/chart-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
export declare class ChartIndicatorPropertiesComposer {
    static getIndicatorsWrapper(model: ChartItem, createIndicatorDelegate: () => ChartIndicator, editHandler: (item: ChartIndicator, args: any, container: ko.Observable<ChartIndicator>) => void): ObjectPropertiesWrapper<ChartItem>;
    static getIndicatorPropertiesWrapper(model: ChartIndicator, dashboardItem: ChartItem, dataSourceBrowser: DataSourceBrowser, requestRecalculation: JQueryCallback, findExtension: (name: string) => IExtension): ObjectPropertiesWrapper<ChartIndicator>;
}
