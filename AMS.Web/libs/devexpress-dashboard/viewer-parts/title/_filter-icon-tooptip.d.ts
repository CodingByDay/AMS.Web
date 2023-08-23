﻿/**
* DevExpress Dashboard (_filter-icon-tooptip.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
export declare let titleTooltipClasses: {
    root: string;
    list: string;
    listText: string;
    subList: string;
    subListItem: string;
};
export declare class FilterIconTooltip {
    private static FILTER_LIST_SPACE;
    private static DEFAULT_LINE_HEIGHT;
    static getTooltipContent(contentElement: JQuery, masterFilterValues: Array<any>): any;
    private static _calcMaxFilterListValues;
    private static _calcMaxFilterValues;
    private static _calcMaxHeight;
}
