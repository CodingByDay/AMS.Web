﻿/**
* DevExpress Dashboard (format-condition-bar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { StyleSettingsBase } from '../style-settings/style-settings-base';
import { StyleSettingsType } from '../style-settings/_style-settings-utils';
import { FormatConditionBarOptions } from './format-condition-bar-options';
import { FormatConditionMinMaxBase } from './format-condition-min-max-base';
export declare class FormatConditionBar extends FormatConditionMinMaxBase {
    barOptions: FormatConditionBarOptions;
    negativeStyleSettings: ko.Observable<StyleSettingsBase>;
    currentStyleSettingsType: ko.Observable<string>;
    currentStyleSettings: ko.Computed<StyleSettingsBase>;
    get _isApplyToRowColumnRestricted(): boolean;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoButStyleSettings(): IDashboardSerializationInfoArray;
    protected _getStyleSettingsInfo(): IDashboardSerializationInfo;
    getSpecificType: () => any;
    setSpecificType: (type: string) => void;
    protected _getDefaultStyleSettingsType(): StyleSettingsType;
    init(): void;
}
