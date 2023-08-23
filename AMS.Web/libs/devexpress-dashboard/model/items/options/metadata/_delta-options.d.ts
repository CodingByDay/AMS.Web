﻿/**
* DevExpress Dashboard (_delta-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardLocalizationId } from '../../../../data/localization/_default';
import { DeltaValueType } from '../../../enums';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../../metadata/_base-metadata';
export declare let deltaValueTypeMap: {
    [key in DeltaValueType]: DashboardLocalizationId;
};
export declare let valueType: IDashboardSerializationInfo;
export declare let resultIndicationMode: IDashboardSerializationInfo;
export declare let resultIndicationThresholdType: IDashboardSerializationInfo;
export declare let resultIndicationThreshold: IDashboardSerializationInfo;
export declare let cardDeltaOptionsSerializationsInfo: IDashboardSerializationInfoArray;
export declare let deltaOptionsSerializationsInfo: IDashboardSerializationInfoArray;
