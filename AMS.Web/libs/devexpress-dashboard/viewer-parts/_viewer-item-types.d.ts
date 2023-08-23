﻿/**
* DevExpress Dashboard (_viewer-item-types.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare let types: {
    group: string;
    page: string;
    tabPage: string;
    tabContainer: string;
    rangeFilter: string;
    chart: string;
    scatter: string;
    pie: string;
    card: string;
    grid: string;
    pivot: string;
    gauge: string;
    text: string;
    image: string;
    boundImage: string;
    map: string;
    choroplethMap: string;
    geoPointMap: string;
    bubbleMap: string;
    pieMap: string;
    comboBox: string;
    listBox: string;
    treeView: string;
    treemap: string;
    dateFilter: string;
    custom: string;
};
export declare type ViewerItemType = typeof types[keyof typeof types];
