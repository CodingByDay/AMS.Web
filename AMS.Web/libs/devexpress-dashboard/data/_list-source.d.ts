﻿/**
* DevExpress Dashboard (_list-source.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class listSource {
    dataSource: any;
    dataMembers: any;
    rowCount: any;
    columnCount: any;
    constructor(dataSource: any, dataMembers: any);
    _wrapIfRequired(dataSource: any, dataMembers: any): any;
    getRowValue(rowIndex: any, dataMember: any): any;
    getFormattedRowValue(rowIndex: any, dataMember: any, formatInfo: any): string;
    getFormattedArgumentRowValue(rowIndex: any, dataMember: any, formatInfo: any): string;
    getColumnIndex(dataMember: any): any;
    getRowCount(): any;
}
