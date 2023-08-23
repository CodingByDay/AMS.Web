﻿/**
* DevExpress Dashboard (_style-settings-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AppearanceSettings } from '../style-settings/appearance-settings';
import { BarStyleSettings } from '../style-settings/bar-style-settings';
import { ColorStyleSettings } from '../style-settings/color-style-settings';
import { IconSettings } from '../style-settings/icon-settings';
export declare let styleSettingsTypesMap: {
    AppearanceSettings: typeof AppearanceSettings;
    IconSettings: typeof IconSettings;
    BarStyleSettings: typeof BarStyleSettings;
    ColorStyleSettings: typeof ColorStyleSettings;
};
export declare type StyleSettingsType = keyof typeof styleSettingsTypesMap;
export declare let styleSettingsTypes: StyleSettingsType[];
