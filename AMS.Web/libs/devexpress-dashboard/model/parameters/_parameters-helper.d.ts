/**
* DevExpress Dashboard (_parameters-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SimpleFormAdapterItems } from '../metadata/_base-metadata';
export declare function validateGuid(guid: any): boolean;
export declare class ParameterHelper {
    static getInfoPerType(valueType: any): any[];
    static getEditorType(typeString: string): {
        simpleFormAdapterItem: SimpleFormAdapterItems;
        editorOptions: {};
    };
    static typeValues: any[];
    private static _getTypeValue;
    private static _tryConvertValue;
    static getDefaultTypeValue(type: string): any;
    static convertSingleValue(value: any, type: string, allowNull?: boolean): any;
}
