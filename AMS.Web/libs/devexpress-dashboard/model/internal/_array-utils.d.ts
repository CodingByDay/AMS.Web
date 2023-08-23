﻿/**
* DevExpress Dashboard (_array-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function arrayEquals(array1: Array<any>, array2: Array<any>): boolean;
export declare function arrayInsert(a: Array<any>, insertion: Array<any>, position: number): any[];
export declare function areArraysEqual(arr1?: any[], arr2?: any[]): boolean;
export declare function compareArrays<T>(array1: Array<T>, array2: Array<T>, predicate?: (a: T, b: T) => boolean): boolean;
export declare function compareNotOrderedArrays<T>(array1: Array<T>, array2: Array<T>, predicate?: (a: T, b: T) => boolean): boolean;
export declare function findClosestItemIndex<T>(array: Array<T>, predicate: (element: T) => boolean): number;
