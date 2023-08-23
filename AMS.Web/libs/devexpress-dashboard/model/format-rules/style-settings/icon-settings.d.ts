/**
* DevExpress Dashboard (icon-settings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { FormatConditionIconType } from '../../enums';
import { StyleSettingsBase } from './style-settings-base';
export declare class IconSettings extends StyleSettingsBase {
    iconType: ko.Observable<FormatConditionIconType>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    equals(style: StyleSettingsBase): boolean;
    clone(): StyleSettingsBase;
    setSpecificType(type: FormatConditionIconType): void;
    init(): void;
}
