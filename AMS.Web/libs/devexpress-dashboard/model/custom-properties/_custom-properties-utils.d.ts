﻿/**
* DevExpress Dashboard (_custom-properties-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { CustomProperties } from './custom-properties';
import { CustomPropertyMetadata } from './custom-properties-metadata';
export declare function _getCustomPropertiesSerializationInfoCore(customPropertiesMeta: Array<CustomPropertyMetadata>): IDashboardSerializationInfo;
export declare function getCustomPropertiesSerializationInfo(owner: any): IDashboardSerializationInfo;
export interface ICustomPropertiesProvider {
    customProperties: CustomProperties;
}
