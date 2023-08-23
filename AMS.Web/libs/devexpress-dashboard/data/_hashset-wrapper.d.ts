/**
* DevExpress Dashboard (_hashset-wrapper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class HashsetWrapper {
    private FNV_prime_32;
    private FNV_offset_basis_32;
    private hashSet;
    constructor(array: any[]);
    contains(item: any): boolean;
    getIntersection(array: any[]): any[];
    indexOf(item: any): number;
    private getItem;
    private getHash;
    private toHash;
}
