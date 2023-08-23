﻿/**
* DevExpress Dashboard (format-condition-style-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { StyleSettingsBase } from '../style-settings/style-settings-base';
import { StyleSettingsType } from '../style-settings/_style-settings-utils';
import { FormatConditionBase } from './format-condition-base';
export declare let currentStyleSettingsInfo: (styleSettingsType: ko.Observable<StyleSettingsType>) => IDashboardSerializationInfo;
export declare abstract class FormatConditionStyleBase extends FormatConditionBase {
    styleSettings: ko.Observable<StyleSettingsBase>;
    private _styleSettingsType;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected abstract _getInfoButStyleSettings(): IDashboardSerializationInfoArray;
    protected _getStyleSettingsInfo(): IDashboardSerializationInfo;
    protected _getDefaultStyleSettingsType(): StyleSettingsType;
    getDefaultStyleSettingsType(): string;
    isValid(): boolean;
    init(): void;
}
