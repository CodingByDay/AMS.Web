/**
* DevExpress Dashboard (_element-size-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDisposable } from '../../model';
import { baseItem } from '../../viewer-parts/viewer-items/_base-item';
import { ISizeController } from '../internal/_interfaces';
export declare function createItemSizeUpdater(item: baseItem, sizeController: ISizeController): IDisposable;
export declare function createElementSizeUpdater(element: HTMLElement, sizeController: ISizeController): {
    dispose: () => JQueryCallback;
};
export declare function setElementSize(element: HTMLElement, sizeController: ISizeController): void;
