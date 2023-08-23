/**
* DevExpress Dashboard (_flat-item-provider-wrapper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo, IItemsProvider, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
export declare class FlatItemProviderWrapper implements IItemsProvider {
    private itemsProvider;
    constructor(itemsProvider: IItemsProvider);
    getItems(path: IPathRequest): JQueryPromise<IDataMemberInfo[]>;
}
