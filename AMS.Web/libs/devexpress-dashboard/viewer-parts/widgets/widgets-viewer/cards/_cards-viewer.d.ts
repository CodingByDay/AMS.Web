﻿/**
* DevExpress Dashboard (_cards-viewer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { WidgetsViewerBase, WidgetsViewerOptions } from '../_widgets-viewer-base';
import { newCardItem } from './_new-card-item';
export declare class CardsViewer extends WidgetsViewerBase {
    private content;
    private _viewerID;
    private arranger;
    private tableStruct;
    private virtualizer;
    private tableGenerator;
    private container;
    itemsList: newCardItem[];
    private get _styleSettingsProvider();
    constructor(element: HTMLElement, options: WidgetsViewerOptions);
    redraw(): void;
    _getDefaultOptions(): WidgetsViewerOptions;
    getSelectedItems(): newCardItem[];
    clearSelections(): void;
    getSizeParams(): {
        virtualSize: {
            width: number;
            height: number;
        };
        scroll: {
            top: number;
            left: number;
            size: number;
            horizontal: boolean;
            vertical: boolean;
        };
        itemMargin: {
            width: number;
            height: number;
        };
        layoutMeasurement: {
            margin: number;
            contentPadding: number;
        };
    };
    clear(): void;
    dispose(): void;
    _init(): void;
    _update(): void;
    private initContainer;
    private createItems;
    protected _render(drawOptions?: any): void;
    private invalidateContent;
    private drawCards;
    private drawCardsByIndices;
    private createArranger;
    private shouldRecreateArranger;
}
