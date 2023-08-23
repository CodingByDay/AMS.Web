/**
* DevExpress Dashboard (bar-style-settings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ColorStyleSettings } from './color-style-settings';
import { StyleSettingsBase } from './style-settings-base';
export declare class BarStyleSettings extends ColorStyleSettings {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    clone(): StyleSettingsBase;
    init(): void;
}
