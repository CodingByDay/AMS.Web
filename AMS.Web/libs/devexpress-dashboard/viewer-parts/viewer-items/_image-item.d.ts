﻿/**
* DevExpress Dashboard (_image-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { DxElement } from 'devextreme/core/element';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { imageDataController } from '../../data/data-controllers/_image-data-controller';
import { baseItem, ViewerItemOptions } from './_base-item';
export declare class imageItem extends baseItem {
    imgSrc: any;
    img: JQuery;
    _initialHeight: any;
    _initialWidth: any;
    protected _dataController: imageDataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: ViewerItemOptions);
    protected _initializeData(newOptions: ViewerItemOptions): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _loadImage(): void;
    _clearImgTag(): void;
    _loadedImgProcessing(): void;
    _setHorizontalAlignment($img: any, horizontalAlignment: any): void;
    _setVerticalAlignment($img: any, verticalAlignment: any): void;
    _setImgSizeWithProportions($img: any, containerProportion: any): "horizontalCentering" | "verticalCentering";
    _getImageSource(imageViewModel: any): any;
    protected _resizeUnsafe(): void;
    _getWidget(): DxElement;
}
