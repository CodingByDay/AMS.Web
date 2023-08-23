﻿/**
* DevExpress Dashboard (_data-item-draggable.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IItemsCollection } from './_interfaces';
export declare class DragProcessor {
    rootElement: HTMLElement;
    CSS_DRAG_IN_PROGRESS: string;
    CSS_HIGHLIGHT_PLACEHOLDER: string;
    COLLECTION_SELECTOR: string;
    TARGET_SELECTOR: string;
    EVENT_NAMESPACE: string;
    currentDrag: {
        clonedElement: HTMLElement;
        itemPosition: number;
        originalEvent: DragEvent;
        itemElement: HTMLElement;
        sourceCollection: IItemsCollection;
    };
    constructor(rootElement: HTMLElement);
    state: 'pending' | 'dragging';
    startDrag(ev: JQueryEventObject): boolean;
    setDataItemsPositions: (sourceCollectionRoot: HTMLElement) => void;
    processHtmlDragEvent: () => void;
    finishDrag: () => void;
    checkItemIsDraggableToPosition(itemIndex: number, placeholderIndex: number): boolean;
    interchange(items: ko.ObservableArray<any>, newOwner: {
        relocateItem: (item: any, placeholderIndex: number) => void;
    }, sourceIndex: number, placeholderIndex: number, groupSize: number): void;
}
