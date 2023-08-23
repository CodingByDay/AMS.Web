﻿/**
* DevExpress Dashboard (_dimension-filter-values.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IFormattableValue {
    Type: string;
    Value?: any;
    RangeLeft?: any;
    RangeRight?: any;
    Format: any;
}
export declare class DimensionFilterValues {
    Name: string;
    Truncated: boolean;
    Values: Array<IFormattableValue>;
    constructor(name?: string);
}
