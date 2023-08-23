﻿/**
* DevExpress Dashboard (_appearance-settings-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { StyleSettingsModel } from '../../data/conditional-formatting/_view-model';
import { AppearanceSettings } from '../../model';
import { DrawProperty } from './_style-settings-provider';
export declare class appearanceSettingsProvider {
    static getColor(style: StyleSettingsModel): any;
    static getDefaultColorizationColor(): any;
    static toCssProperties(appearanceType: any, drawProperty?: DrawProperty): Array<{
        propertyName: string;
        propertyValue: any;
    }>;
    static toCustomCssProperties(appearance: AppearanceSettings): {
        propertyName: string;
        propertyValue: any;
    }[];
    private static _createFontBold;
    private static _createFontItalic;
    private static _createFontUnderline;
    private static _createFontStyles;
    private static _getBackColorFromPredefinedStyle;
    static backAndGradientColorGroupsToBackColor(appearanceType: any): any;
    private static _backColorsWithFontGroupToBackColor;
    private static _getCustomBackColor;
    private static isDarkColorScheme;
}
