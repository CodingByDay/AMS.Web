﻿/**
* DevExpress Dashboard (custom-viewer-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import { CustomPropertyValueType } from '../../model/custom-properties/custom-properties';
import { ICustomItemBindingValue } from '../../model/items/custom-item/binding';
import { CustomItem } from '../../model/items/custom-item/custom-item';
import { ICustomDataRow } from '../../model/items/custom-item/data-row';
import { baseItem } from '../../viewer-parts/viewer-items/_base-item';
export declare class CustomItemViewer extends baseItem {
    private model;
    constructor(model: CustomItem, container: DxElement, options: any);
    contentWidth(): number;
    contentHeight(): number;
    setSize(width: number, height: number): void;
    protected _renderContent(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    renderContent(element: DxElement, changeExisting: boolean, afterRenderCallback?: any): void;
    dispose(): void;
    clearSelection(): void;
    setSelection(values: Array<Array<any>>): void;
    allowExportSingleItem(): boolean;
    getExportInfo(): CustomItemExportInfo;
    getMasterFilterMode(): string;
    getBindingValue(propertyName: string, index?: number): Array<ICustomItemBindingValue>;
    getPropertyValue(propertyName: string): CustomPropertyValueType;
    subscribe(propertyName: string, callback: (newValue: any) => void): any;
    iterateData: (action: (item: ICustomDataRow) => void) => void;
    isSelected(row: ICustomDataRow): boolean;
    canMasterFilter: (row?: ICustomDataRow) => boolean;
    canDrillDown: (row?: ICustomDataRow) => boolean;
    setMasterFilter: (row: ICustomDataRow) => boolean;
    drillDown: (row: ICustomDataRow) => boolean;
    getInfo(): any;
    initializeData(newOptions: any): void;
    protected _initializeData(newOptions: any): void;
    private _prepareRow;
    private _getUniqueValues;
    protected _isSupportDataAwareExport(): boolean;
}
export interface CustomItemExportInfo {
    image: string;
}
export declare class customViewerItem extends CustomItemViewer {
}
