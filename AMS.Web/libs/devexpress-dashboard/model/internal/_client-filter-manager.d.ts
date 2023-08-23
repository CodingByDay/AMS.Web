/**
* DevExpress Dashboard (_client-filter-manager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class ClientFilterManager {
    private _updateTotals;
    private _filterParams;
    private _filterState;
    constructor(_updateTotals: ko.Observable<boolean>);
    getFilterParams(): string;
    setFilterParams(clientFilter: string): void;
    clearFilterParams(): void;
    setFilterState(filterValue: any): void;
    getFilterState(): any;
}
