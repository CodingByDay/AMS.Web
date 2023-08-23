﻿/**
* DevExpress Dashboard (_data-storage.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataRowKey, dataSlice, SliceIterator, sliceRepository } from './_data-slice';
export declare class dataStorage {
    _sliceRep: sliceRepository;
    constructor(dto: any);
    _createSliceRep(dto: any): sliceRepository;
    _initialize(): void;
    getSlices(): dataSlice[];
    getSlice(sliceKey: any): dataSlice;
    getSliceKey(keyIds: string[]): number;
    getSliceByIds(keyIds: any): dataSlice;
    getOrCreateSlice(keyIds: any): dataSlice;
    findDataRowKey(sliceKey: any, dataRowKey: any): DataRowKey;
    getCrossValue(dataRowKeys: DataRowKey[], valueId: any): any;
    getKeyValue(dataRow: any, keyId: string): any;
    getValue(dataRow: any, valueId: any): any;
    isEmpty(): boolean;
    insert(ds: dataStorage, sortOrderSlices?: any): {
        [key: number]: SliceIterator;
    };
    insertSlice(ds: dataStorage, keyIds: any): void;
}
