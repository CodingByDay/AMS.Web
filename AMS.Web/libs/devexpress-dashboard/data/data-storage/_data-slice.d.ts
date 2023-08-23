﻿/**
* DevExpress Dashboard (_data-slice.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class dataSlice implements SliceIterator {
    _sliceKey: number;
    _sliceDTO: any;
    _decode: {
        (keyId: string, code: number): any;
    };
    _encode: any;
    _keyIndexById: {
        [id: string]: number;
    };
    _valueIdByKey: {
        [key: number]: string;
    };
    constructor(sliceKey: number, sliceDTO: any, decode: {
        (keyId: string, code: number): any;
    }, encode: any);
    getRowCount(): number;
    getKey(): number;
    getValue(rowKey: any, valueId: any): any;
    getRowValues(rowKey: any): {
        [valueId: string]: any;
    };
    getRowKeyValues(rowKey: number[]): {
        [keyId: string]: any;
    };
    _getRowDTO(rowKey: any): {
        [key: number]: any;
    };
    getKeyValue(rowKey: number[], keyId: string): any;
    getKeyIds(): string[];
    getValueIds(): string[];
    forEach(action: {
        (dataRowKey: DataRowKey): any;
    }): void;
    append(slice: dataSlice): SliceIterator;
    addRow(keyValues: {
        [keyId: string]: any;
    }, values: {
        [valueId: string]: any;
    }): any[];
    _parseKey(key: any): number[];
    _stringifyKey(key: any): string;
}
export declare class sliceRepository {
    _sliceListDTO: any[];
    _sliceList: dataSlice[];
    _rowKeyConvertMap: any;
    _sliceJoinCache: any;
    _decode: {
        (keyId: string, code: number): any;
    };
    _encode: any;
    constructor(sliceListDTO: any[], decode: {
        (keyId: string, code: number): any;
    }, encode: any);
    _initialize(decode: any): void;
    getAll(): dataSlice[];
    getKey(keyIds: string[]): number;
    get(vsKey: any): dataSlice;
    getOrCreate(keyIds: any): dataSlice;
    findDataRowKey(sliceKey: any, dataRowKey: any): DataRowKey;
    getCrossValue(dataRows: DataRowKey[], valueId: any): any;
    getKeyValue(dataRow: any, keyId: string): any;
    getValue(dataRow: any, valueId: any): any;
    isEmpty(): boolean;
    _joinSliceKey(key1: any, key2: any): any;
    _getByKeyIds(keyIds: string[]): dataSlice;
    _getConvertMap(sliceFromKey: any, sliceToKey: any): any;
}
export interface SliceIterator {
    forEach(action: {
        (dataRowKey: DataRowKey): any;
    }): void;
}
export interface DataRowKey {
    sliceKey: number;
    rowKey: number[];
}
