/**
* DevExpress Dashboard (_custom-property-validation.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CustomPropertyValueType } from './custom-properties';
export declare function validateCustomPropertyName(name: string): void;
export declare function validateCustomPropertyValueType(propertyName: string, value: CustomPropertyValueType): void;
