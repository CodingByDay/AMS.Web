﻿/**
* DevExpress Dashboard (_cssHelper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function createCssPropertyWrapper(propertyName: string, propertyValue: any): {
    propertyName: string;
    propertyValue: any;
};
export declare function getEmptyCssPropertyWrappersArray(): Array<{
    propertyName: string;
    propertyValue: any;
}>;
export declare function createStylesElement(nonce?: string): void;
export declare function addToStyles(styles: string): () => void;
export declare function createCssClass(cssSelector: string, cssProperties: Array<{
    propertyName: string;
    propertyValue: any;
}>): () => void;
export declare function convertCssPropertyWrappersToString(properties: Array<{
    propertyName: string;
    propertyValue: any;
}>): string;
export declare function convertCssPropertyWrappersToObject(properties: Array<{
    propertyName: string;
    propertyValue: any;
}>): object;
