/**
* DevExpress Dashboard (binding-property.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare type DataItemType = 'Measure' | 'Dimension';
export interface IBindingProperty {
    propertyName: string;
    dataItemType: DataItemType;
    emptyPlaceholder: string;
    selectedPlaceholder?: string;
}
