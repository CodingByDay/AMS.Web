/**
* DevExpress Dashboard (_measure.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardLocalizationId } from '../../../data/localization/_default';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
export declare let summaryTypeDict: {
    [key in string]: DashboardLocalizationId;
};
export declare let summaryTypeTemplate: IDashboardSerializationInfo;
export declare let summaryTypeNumericToAny: IDashboardSerializationInfo;
export declare let summaryTypeAttribute: IDashboardSerializationInfo;
export declare let summaryTypeNonNumericToNumeric: IDashboardSerializationInfo;
export declare let summaryTypeNonNumericToString: IDashboardSerializationInfo;
export declare let calculation: IDashboardSerializationInfo;
export declare let windowDefinition: IDashboardSerializationInfo;
export declare let expression: IDashboardSerializationInfo;
export declare let calculations: IDashboardSerializationInfo;
export declare let measureFilterString: IDashboardSerializationInfo;
export declare let measureItemSerializationsInfo: IDashboardSerializationInfoArray;
