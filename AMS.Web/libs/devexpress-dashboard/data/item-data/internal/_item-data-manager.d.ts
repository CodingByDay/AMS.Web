﻿/**
* DevExpress Dashboard (_item-data-manager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dataStorage } from '../../data-storage/_data-storage';
import { itemData } from '../_item-data';
import { itemDataAxisPoint } from '../_item-data-axis-point';
import { itemMetaData } from './_item-meta-data';
export declare class itemDataManager {
    _dataStorage: dataStorage;
    _metaData: itemMetaData;
    _itemData: itemData;
    _items: {
        [name: string]: itemDataAxisPoint;
    };
    initialize(itemDataDTO: any): void;
    updateExpandedData(expandedItemDataDTO: any, expandInfo: any): void;
    updateTotals(expandedItemDataDTO: any): void;
    getDataStorage(): dataStorage;
    getItemData(): itemData;
    getMetaData(): itemMetaData;
    _createMetaData(metaDataDTO: any): itemMetaData;
}
