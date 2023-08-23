/**
* DevExpress Dashboard (_chart-item-style-settings-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { StyleSettingsModel } from '../../data/conditional-formatting/_view-model';
export declare class ChartItemStyleSettingsProvider {
    cfModel: any;
    initialize(cfModel: any): void;
    getDefaultBackColor(): any;
    getBackColor(styleSettingsInfo: any): any;
    getBackColorFromStyleSettingsModel(styleSettingsModel: StyleSettingsModel): any;
}
