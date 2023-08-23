﻿/**
* DevExpress Dashboard (_item-data-axis-builder.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SliceIterator } from '../../data-storage/_data-slice';
import { dataStorage } from '../../data-storage/_data-storage';
import { ItemDataAxisName } from '../item-data-definitions';
import { itemDataAxisPoint } from '../_item-data-axis-point';
import { itemDataDimension } from './_item-meta-data';
export declare let pivotAreaNames: {
    columns: string;
    rows: string;
};
export declare let itemDataAxisBuilder: {
    build: (name: ItemDataAxisName, storage: dataStorage, dimensions: itemDataDimension[], sortOrderSlices?: string[][], metaData?: any, iterators?: {
        [key: number]: SliceIterator;
    }) => itemDataAxisPoint;
    _getKeyIdsList: (keyIds: string[]) => string[][];
    _isSortOrderSlice: (slice: string[], sortOrderSlices: string[][]) => boolean;
};
