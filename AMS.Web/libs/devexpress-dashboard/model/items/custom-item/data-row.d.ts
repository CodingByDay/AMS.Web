/**
* DevExpress Dashboard (data-row.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface ICustomDataRow {
    getColor: (measureBindingName?: string) => Array<string>;
    getDisplayText: (property: string) => Array<string>;
    getValue: (property: string) => Array<any>;
    getUniqueValue: (property: string) => Array<any>;
}
