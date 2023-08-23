/**
* DevExtreme (common/data/custom-store.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * 
 */
export type GroupItem<
    TItem = any,
> = {
  key: any | string | number;
  items: Array<TItem> | Array<GroupItem<TItem>> | null;
  count?: number;
  summary?: Array<any>;
};

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
type LoadResultArray<TItem = any> = Array<TItem> | Array<GroupItem<TItem>>;

/**
 * 
 */
export type LoadResultObject<TItem = any> = {
    data: Array<TItem> | Array<GroupItem<TItem>>;
    totalCount?: number;
    summary?: Array<any>;
    groupCount?: number;
  };

/**
 * 
 */
export type LoadResult<
    TItem = any,
> =
  | Object
  | LoadResultArray<TItem>
  | LoadResultObject<TItem>;

/**
 * 
 */
export function isLoadResultObject<TItem>(res: LoadResult<TItem>): res is LoadResultObject<TItem>;

/**
 * 
 */
export function isGroupItemsArray<TItem>(res: LoadResult<TItem>): res is Array<GroupItem<TItem>>;

/**
 * 
 */
export function isItemsArray<TItem>(res: LoadResult<TItem>): res is Array<TItem>;
