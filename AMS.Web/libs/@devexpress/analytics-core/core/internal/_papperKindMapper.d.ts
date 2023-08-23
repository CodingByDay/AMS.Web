/**
* DevExpress Analytics (core\internal\_papperKindMapper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare type MeasureUnit = 'HundredthsOfAnInch' | 'TenthsOfAMillimeter' | 'Pixels';
export declare function getPaperSize(kind: string, precision?: number): {
    width: number;
    height: number;
};
