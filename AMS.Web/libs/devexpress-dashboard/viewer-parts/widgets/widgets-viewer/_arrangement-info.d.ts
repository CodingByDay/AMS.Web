﻿/**
* DevExpress Dashboard (_arrangement-info.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare let positioningDirection: {
    Vertical: string;
    Horizontal: string;
};
export declare class ArrangementInfo {
    totalItemCount: any;
    itemsOnRowCount: any;
    itemWidth: any;
    itemHeight: any;
    direction: any;
    itemMargin: any;
    options: any;
    itemsOnColumnCount: any;
    constructor(totalItemCount: any, itemsOnRowCount: any, itemWidth: any, itemHeight: any, itemMargin: any, direction: any, options: any);
    getHeight(useMargin: any): number;
    getWidth(useMargin: any): number;
}
