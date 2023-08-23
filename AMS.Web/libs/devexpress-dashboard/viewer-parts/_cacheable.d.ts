/**
* DevExpress Dashboard (_cacheable.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function resetGlobalSizeCache(): void;
export declare function cacheable(cacheKey: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    value: (...args: any[]) => any;
};
