/**
* DevExpress Dashboard (_tab-header-calculator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface TabHeadersViewModel {
    widths: Array<number>;
    leftVisibleIndex: number;
    rightVisibleIndex: number;
}
export declare function calcTabHeadersWidth(tabsWidth: Array<number>, containerWidth: number, leftIndex: number, showCaption: boolean): TabHeadersViewModel;
