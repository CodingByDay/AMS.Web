/**
* DevExtreme (data/local_store.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ArrayStore, {
    ArrayStoreOptions,
} from './array_store';

export type Options<
    TItem = any,
    TKey = any,
> = LocalStoreOptions<TItem, TKey>;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface LocalStoreOptions<
    TItem = any,
    TKey = any,
> extends ArrayStoreOptions<TItem, TKey> {
    /**
     * Specifies a delay in milliseconds between when data changes and the moment these changes are saved in the local storage. Applies only if immediate is false.
     */
    flushInterval?: number;
    /**
     * Specifies whether the LocalStore saves changes in the local storage immediately.
     */
    immediate?: boolean;
    /**
     * Specifies the name under which data should be saved in the local storage. The `dx-data-localStore-` prefix will be added to the name.
     */
    name?: string;
}
/**
 * The LocalStore is a store that provides an interface for loading and editing data from HTML Web Storage (also known as window.localStorage) and handling related events.
 */
export default class LocalStore<
    TItem = any,
    TKey = any,
> extends ArrayStore<TItem, TKey> {
    constructor(options?: Options<TItem, TKey>);
    /**
     * Removes data from the local storage.
     */
    clear(): void;
}
