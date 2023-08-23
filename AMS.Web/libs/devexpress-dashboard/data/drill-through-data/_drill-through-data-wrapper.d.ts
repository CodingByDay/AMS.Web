/**
* DevExpress Dashboard (_drill-through-data-wrapper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemUnderlyingData } from '../item-data/item-data-definitions';
export declare class DrillThroughDataWrapper implements ItemUnderlyingData {
    _data: any;
    _drillThroughData: any;
    _errorMessage: any;
    constructor(drillThroughData: any);
    initialize(): void;
    getRowCount(): any;
    getRowValue(rowIndex: any, columnName: any): any;
    getDataMembers(): any;
    getDisplayNames(): any;
    isDataReceived(): boolean;
    getRequestDataError(): any;
}
