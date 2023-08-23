﻿/**
* DevExpress Dashboard (_pivot-grid-item-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemDataAxis } from '../../../data/item-data/item-data-definitions';
import { itemData } from '../../../data/item-data/_item-data';
import { PrimitiveType } from '../../../data/types';
export interface PivotGridDataSourceField {
    area?: 'column' | 'data' | 'filter' | 'row' | undefined;
    caption?: string;
    dataField?: string;
    dataType?: PivotFieldType;
    name?: string;
    showGrandTotals?: boolean;
    showTotals?: boolean;
    showValues?: boolean;
    expanded?: boolean;
    sortBy?: 'displayText' | 'value' | 'none';
}
export declare type PivotFieldType = 'date' | 'number' | 'string' | undefined;
export interface PivotState {
    columnExpandedPaths: Array<Array<any>>;
    rowExpandedPaths: Array<Array<any>>;
    fields: PivotGridDataSourceField[];
}
export declare let pivotHelper: {
    getSchemaRow(fields: PivotGridDataSourceField[]): {};
    createAreaFields(fieldsViewModels: Array<any>, area: 'column' | 'row' | 'data', autoExpand?: boolean): PivotGridDataSourceField[];
    getColumnAxis(multiData: itemData): ItemDataAxis;
    getRowAxis(multiData: itemData): ItemDataAxis;
};
export declare type FilterValue = PrimitiveType | string | Array<any>;
declare abstract class FilterValueVisitor<T> {
    private readonly _supportedLogicalOperation;
    private _visitComplexExpression;
    protected _visit(filter: Array<FilterValue>): T;
    protected abstract _visitEmpty(filter: Array<FilterValue>): T;
    protected abstract _negate(value: T): T;
    protected abstract _visitEquality(field: string, value: any): T;
    protected abstract _and(left: T, right: T): any;
    protected abstract _or(left: T, right: T): any;
}
export declare class FilterChecker extends FilterValueVisitor<boolean> {
    static _instance: FilterChecker;
    static fits(dimensionValues: {
        [field: string]: PrimitiveType;
    }, filter: Array<FilterValue>): boolean;
    private _dimensionValues;
    protected _visitEmpty(filter: FilterValue[]): boolean;
    protected _negate(value: boolean): boolean;
    protected _visitEquality(field: string, value: any): boolean;
    protected _and(left: boolean, right: boolean): boolean;
    protected _or(left: boolean, right: boolean): boolean;
}
export declare class OneElementFilterRemover extends FilterValueVisitor<Array<FilterValue>> {
    private static _instance;
    static simplify(filter: FilterValue[]): FilterValue[];
    protected _visitEmpty(filter: FilterValue[]): FilterValue[];
    protected _negate(value: FilterValue[]): FilterValue[];
    protected _visitEquality(field: string, value: any): FilterValue[];
    protected _and(left: FilterValue[], right: FilterValue[]): (string | FilterValue[])[];
    protected _or(left: FilterValue[], right: FilterValue[]): (string | FilterValue[])[];
}
export declare class FieldsExtractor extends FilterValueVisitor<string[]> {
    private static _instance;
    static extract(filter: FilterValue[]): string[];
    protected _visitEmpty(filter: FilterValue[]): string[];
    protected _negate(value: string[]): string[];
    protected _visitEquality(field: string, value: any): string[];
    protected _and(left: string[], right: string[]): string[];
    protected _or(left: string[], right: string[]): string[];
}
export {};
