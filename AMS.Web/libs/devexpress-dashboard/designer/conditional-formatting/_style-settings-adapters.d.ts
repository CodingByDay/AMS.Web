﻿/**
* DevExpress Dashboard (_style-settings-adapters.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AppearanceSettings } from '../../model/format-rules/style-settings/appearance-settings';
import { StyleSettingsBase } from '../../model/format-rules/style-settings/style-settings-base';
import { ICustomAppearance } from './custom-style-settings/_conditional-formatting-custom-color-storage';
interface StyleSettingsAdapter<T extends StyleSettingsBase> {
    getCssStyles: (item: T) => object;
    getCssClasses: (item: T, isEmptyAllowed: boolean, isRange: boolean, isGradient: boolean) => string[];
    getLocalizedCaption: (item: T) => string;
    getLabelText: (item: T, isRange: boolean, isGradient: boolean, restrictToColor: boolean) => string;
    getPredefinedStyle: (item: T) => string;
    setPredefinedStyle: (item: T, style: string) => void;
    hasCustomStyle: (item: T) => boolean;
    isEmptyCustomStyle: (item: T) => boolean;
    getCustomColor: (item: T) => string;
    getCustomAppearance: (item: T) => ICustomAppearance;
    setCustomColor: (item: T, style: string) => void;
    setCustomAppearance: (item: T, style: ICustomAppearance) => void;
}
export declare const appearanceStyleSettingsAdapter: StyleSettingsAdapter<AppearanceSettings>;
export declare function styleSettingsAdapter(item: any, itemType?: any): {
    itemFactory: () => any;
    getCssStyles: () => any;
    getCssClasses: (isEmptyAllowed: any, isRange: any, isGradient: any) => any;
    getLocalizedCaption: () => any;
    getLabelText: (isRange: any, isGradient: any, restrictToColor: any) => any;
    getPredefinedStyle: () => any;
    setPredefinedStyle: (style: any) => any;
    hasCustomStyle: () => any;
    isEmptyCustomStyle: () => any;
    getCustomColor: () => any;
    getCustomAppearance: () => any;
    setCustomColor: (style: any) => any;
    setCustomAppearance: (style: any) => any;
};
export {};
