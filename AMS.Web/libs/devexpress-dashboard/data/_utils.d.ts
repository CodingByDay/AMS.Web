﻿/**
* DevExpress Dashboard (_utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemDataAxisName } from '.';
import { itemDataTupleValues } from './item-data/_item-data-tuple';
export declare let type: {
    isDefined: (object: any) => boolean;
    isFunction: (object: any) => boolean;
    isString: (object: any) => boolean;
    isNumeric: (object: any) => boolean;
    isBoolean: (object: any) => boolean;
};
export declare let KpiValueMode: {
    Measure: string;
    Delta: string;
}, pivotArea: {
    column: string;
    row: string;
    data: string;
}, gaugeViewType: {
    CircularFull: string;
    CircularHalf: string;
    CircularQuarterRight: string;
    CircularQuarterLeft: string;
    CircularThreeFourth: string;
    LinearHorizontal: string;
    LinearVertical: string;
}, tooltipContainerSelector: string;
export declare function toColor(numericColorValue: any): any;
export declare function getRGBColor(r: number, g: number, b: number, a: number): string;
export declare function allowSelectValue(values: any[]): boolean;
export declare function isVulnerable(value: string): boolean;
export declare function encodeHtml(str: any): string;
export declare function decodeHtml(value: any): string;
export declare function moveContent(source: HTMLElement, dest: HTMLElement, clearSource: boolean): void;
export declare function arrayContains(container: Array<Array<any>>, part: Array<any>): boolean;
export declare function arrayEquals(array1: Array<any>, array2: Array<any>): boolean;
export declare function checkValuesAreEqual(value1: any, value2: any, nullValuesEquals?: boolean, emptyArraysEquals?: boolean): boolean;
export declare function checkTuplesAreEqual(tuple1: itemDataTupleValues, tuple2: itemDataTupleValues): boolean;
export declare function checkArrayContainsTuple(array: any, tuple: itemDataTupleValues): any;
export declare function getAxisPointValue(tuple: itemDataTupleValues, axisName: ItemDataAxisName): any[];
export declare function getTagValue(tag: any): any;
export declare function getValueIndex(matrix: any, vector: any): number;
export declare function treeWalker(rootNode: any, childrenFunc: any): {
    walk: (func: any) => void;
    walkLeaf: (func: any) => void;
    _walkInternal: (node: any, parent: any, func: any, callPredicate: any) => void;
};
export declare function getParentClasses($obj: any): any[];
export declare function wrapHash(valuesArray: any[]): {
    [value: string]: boolean;
};
export declare function areNotOrderedListsEqual(list1: any, list2: any): boolean;
export declare function pxToNumber(px: any): number;
export declare function debounce(func: any, wait: any): (...args: any[]) => void;
export declare function asyncDebounce(func: any, action: any): (...args: any[]) => void;
export declare function distinct<T>(array: Array<T>, compare?: (value1: T, value2: T) => boolean): Array<T>;
export declare function intersect<T>(array1: Array<T>, array2: Array<T>, compare?: (value1: T, value2: T) => boolean): Array<T>;
export declare function union<T>(array1: Array<T>, array2: Array<T>, compare?: (value1: T, value2: T) => boolean): Array<T>;
export declare function minus<T>(array1: Array<T>, array2: Array<T>, compare?: (value1: T, value2: T) => boolean): Array<T>;
export declare function groupByProperty<TProperty, TSource>(array: Array<TSource>, property: string): Array<TSource[]>;
export declare function groupBy<TKey, TSource>(array: Array<TSource>, getKey: (item: TSource) => TKey): Array<TSource[]>;
export declare function mapMany<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[];
export declare function deepStrictEquals(x: any, y: any): boolean;
export declare function strictEquals(x: any, y: any, equalsCore: (x: any, y: any) => boolean): boolean;
export declare class LocalStorageHelper {
    private static _getLocalStorage;
    static getItem(key: string, defaultValue?: string): string;
    static setItem(key: string, value: string): void;
}
export declare function findIndex(array: Array<any>, predicate: {
    (value: any): boolean;
}): number;
export declare function findLastIndex(array: Array<any>, predicate: {
    (value: any): boolean;
}): number;
export declare function createSvgIconElement(iconId: string): Element;
export declare function renderImage(container: HTMLElement, imageData: any): void;
export declare class RedBlackTree<TKey, TValue> implements IDictionary<TKey, TValue> {
    private _root;
    private _compare;
    constructor(compare: {
        (key1: TKey, key2: TKey): number;
    });
    getOrAdd(key: TKey, getValue: {
        (): TValue;
    }): {
        added: boolean;
        value: TValue;
    };
    private _rebalance;
    private _rotateLeft;
    private _rotateRight;
}
export interface IDictionary<TKey, TValue> {
    getOrAdd(key: TKey, createValue: {
        (): TValue;
    }): {
        added: boolean;
        value: TValue;
    };
}
export declare function unwrapSpecialNullValue(value: any): any;
