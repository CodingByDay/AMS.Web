﻿/**
* DevExpress Dashboard (custom-properties-metadata.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CustomPropertyValueType } from './custom-properties';
export interface CustomPropertyMetadata {
    ownerType: any;
    customItemType?: string;
    propertyName: string;
    defaultValue?: CustomPropertyValueType;
    valueType?: 'string' | 'number' | 'boolean';
}
export declare function registerCustomProperty(meta: CustomPropertyMetadata): void;
export declare function _clearCustomPropertiesMeta(): void;
export declare let _customPropertiesMeta: Array<CustomPropertyMetadata>;
export declare function _customMetadataContainsProperty(propertyName: any): boolean;
