﻿/**
* DevExpress Dashboard (_helper-classes.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class NameGenerator {
    static validateName(object: any, nameCollection: Array<any>, propertyName: string, startIndex?: number, addWhiteSpace?: boolean): void;
    static isValidName(name: string, nameCollection: Array<any>, propertyName: string): boolean;
    static generateName(namePrefix: string, nameCollection: Array<any>, propertyName: string, startIndex?: number, addWhiteSpace?: boolean): string;
}
export declare function isComponentNameValid(name: string): boolean;
export declare class Guard {
    static isNotFalsy(object: any, name: string): void;
    static requires(condition: boolean, message?: string): void;
}
export declare class EnumManager {
    static getNamesAndValues(enumType: any): {
        name: any;
        value: any;
    }[];
    static getNames(enumType: any): Array<any>;
    static getValues(enumType: any): Array<any>;
    private static _getObjectValues;
}
