﻿/**
* DevExpress Dashboard (_style-settings-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
declare class BarCacheItem {
    container: HTMLElement;
    barContainer: HTMLElement;
    barDiv: HTMLElement;
    getTextDiv: () => HTMLElement;
    axisDiv: HTMLElement;
    tooltipDiv: HTMLElement;
    showBarOnly: boolean;
    drawAxis: boolean;
}
export declare class DrawProperty {
    shouldDrawFontStyles: boolean;
    shouldDrawBackColorStyle: boolean;
}
export declare class styleSettingsProvider {
    protected static cssClassNames: {
        iconConditionalFormatting: string;
        barAxis: string;
        customStyle: string;
        customGradientStyle: string;
        dashboardContainer: string;
        absolutePosition: string;
        relativePosition: string;
        flexParent: string;
        flexParentBaseline: string;
        truncated: string;
        wordWrap: string;
        stretched: string;
        fixed: string;
        leftMargin: string;
        rightMargin: string;
        barContainer: string;
        barValue: string;
    };
    static inctanceCounter: number;
    static hiddenTextCounter: number;
    static toIconCssClass(iconType: any): string;
    static _getRangeBackColorStyleSettings(styleSettings: any, condition: any): any;
    cfModel: any;
    cssCustomClasses: Array<{
        primary: string;
        secondary: string;
    }>;
    cssCustomClassesLinks: Array<() => void>;
    id: number;
    barCache: {
        [key: string]: BarCacheItem[];
    };
    padding: string;
    barPrefixes: Array<string>;
    drawingLocked: boolean;
    wordWrap: boolean;
    constructor();
    FontStyle: {
        Bold: number;
        Italic: number;
        Underline: number;
        Strikeout: number;
    };
    DataAttributes: {
        Bar: string;
        Axis: string;
        NormalizedValue: string;
        ZeroPosition: string;
        AllowNegativeAxis: string;
        DrawAxis: string;
    };
    initialize(cfModel: any, wordWrap?: boolean): void;
    dispose(): void;
    draw(): void;
    updateBarWidth(barPrefix: any): void;
    applyStyleSettings(container: HTMLElement, popupContainer: HTMLElement, styleSettingsInfo: any, ignoreImageSettings: any, barPrefix?: any, forceLeftAlignment?: boolean, isSecondaryStyle?: boolean): void;
    private _getContainerHeights;
    protected _createCssClassName(prefix: any, styleIndex: any, postFix: string): string;
    protected _applyIconSettings(container: HTMLElement, iconType: any, forceLeftAlignment?: boolean, flexParentStyle?: string): void;
    protected _wrapChildElementsToApplyIconSettings(container: HTMLElement, classes: any, forceLeftAlignment: boolean): void;
    protected _textAlignmentIsLeft(container: HTMLElement): boolean;
    private _getBarInfo;
    private _createBarContent;
    private _createBarDiv;
    private _createAxisDiv;
    private _setBarBounds;
    private _setAxisBounds;
    private _clearCssClasses;
    protected _registerCssClasses(): void;
    protected _registerCssClassByStyleModel(styleSettingsModel: any, styleIndex: number, isSecondaryStyle: any): void;
    protected _addCssClassToDictionary(styleName: string, styleIndex: number, isSecondary: boolean): void;
    protected _generateCssClassName(styleIndex: number, isSecondary: boolean): string;
    addNewStyle(styleName: string, styleIndex: number, isSecond: boolean): void;
    protected _isShouldGenerateSecondaryStyle(styleSettingsModel: any): boolean;
    protected _isSecondaryStyle(styleSettingsModel: any): boolean;
    protected _getStylePostFix(isSecondary: boolean): any;
    protected _getDrawProperty(isSecondaryStyle: boolean): DrawProperty;
    protected _shouldDrawBarStyle(styleSettingsModel: any): boolean;
    protected _generateCssClassBody(styleSettingsModel: any, cssClassName: string, drawProperty?: DrawProperty): void;
    protected _getCssTdSelector(cssClassname: string): string;
    private _createCssClassFromCustomAppearanceType;
    private _createFontStyles;
    private _createBackColorStyle;
    private _createCssClassFromPredefinedAppearanceType;
}
export declare class cardItemStyleSettingsProvider extends styleSettingsProvider {
    constructor();
    protected _getDrawProperty(isSecondaryStyle: boolean): DrawProperty;
    protected _getStylePostFix(isSecondaryStyle: boolean): string;
    protected _isShouldGenerateSecondaryStyle(styleSettingsModel: any): boolean;
    protected _shouldDrawBarStyle(styleSettingsModel: any): boolean;
    protected _textAlignmentIsLeft(container: any): boolean;
    protected _getCssTdSelector(cssClassname: string): string;
    protected _applyIconSettings(container: HTMLElement, iconType: any, forceLeftAlignment?: boolean, flexParentStyle?: string): void;
    protected _wrapChildElementsToApplyIconSettings(container: HTMLElement, classes: any, forceLeftAlignment: boolean): void;
    getIconType(styleSettingsInfo: any): any;
    applyIndicatorStyle(container: HTMLElement, iconType: any): void;
}
export {};
