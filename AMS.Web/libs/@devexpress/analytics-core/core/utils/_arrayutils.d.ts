﻿/**
* DevExpress Analytics (core\utils\_arrayutils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare function createObservableReverseArrayMapCollection<T>(elementModels: any, target: ko.ObservableArray<T>, createItem: (item: any) => T): any;
export declare function createObservableArrayMapCollection<T>(elementModels: any, target: ko.ObservableArray<T>, createItem: (item: any) => T): any;
export declare function deserializeChildArray<T>(model: any, parent: any, creator: any): ko.ObservableArray<T>;
export declare function getFirstItemByPropertyValue<T>(array: T[], propertyName: string, propertyValue: any, fromIndex?: number): T;
export declare function findFirstItemMatchesCondition<T>(array: T[], predicate: (item: T) => boolean): T;
export declare var find: typeof findFirstItemMatchesCondition;
export declare function binaryIndexOf<T>(ar: T[], el: T, compare: (a: T, b: T) => number): number;
export declare function compareArrays(array1: any[], array2: any[]): boolean;
