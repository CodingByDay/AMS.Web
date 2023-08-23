import { ICloneable, IEquatable } from '@devexpress/utils/lib/types';
export interface IHashBasedCacheTypeCore<T> extends IEquatable<T> {
    getHashCode(): number;
}
export interface IHashBasedCacheType<T> extends IHashBasedCacheTypeCore<T>, ICloneable<T> {
}
export declare type FromJsonConverterType<T> = (obj: any) => T;
export declare class HashBasedCacheCore<T extends IHashBasedCacheTypeCore<T>> {
    protected hashtable: Record<number, T[]>;
    protected numElements: number;
    get count(): number;
    constructor();
    clear(): void;
    getItem(item: T): T;
    forEach(callback: (item: T) => void): void;
    findItemByPredicate(predicate: (item: T) => boolean): T;
    protected processNewItem(_item: T): void;
    isExist(item: T): boolean;
    DEBUG_MAX_CELL_LENGTH(): number;
    removeItems(shouldRemove: (item: T) => boolean): void;
    private addItemInternal;
}
export declare abstract class HashBasedCache<T extends IHashBasedCacheType<T>> extends HashBasedCacheCore<T> {
    protected tempCacheForMerge: Record<number, T>;
    constructor();
    clearTemporaryCache(): void;
    clear(): void;
    merge(jsonObjs: any, convertFromJSON: FromJsonConverterType<T>): void;
    getItemByJsonKey(jsonKey: number): T;
    addItemForMerge(item: T, jsonKey: number): T;
    convertToJSON(convertToJSON: {
        (obj: T): any;
    }): any[];
    indexOf(_item: T): void;
    copyFrom(obj: HashBasedCache<T>): void;
}
//# sourceMappingURL=hash-based-cache.d.ts.map