﻿/**
* DevExpress Dashboard (color-style-settings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Color } from '../../color';
import { FormatConditionAppearanceType } from '../../enums';
import { StyleSettingsBase } from './style-settings-base';
export declare class ColorStyleSettings extends StyleSettingsBase {
    predefinedColor: ko.Observable<FormatConditionAppearanceType>;
    color: ko.Observable<Color>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    equals(style: StyleSettingsBase): boolean;
    clone(): StyleSettingsBase;
    setSpecificType(type: FormatConditionAppearanceType): void;
    init(): void;
}
