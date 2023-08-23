﻿/**
* DevExpress Dashboard (_new-card-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { cardItemStyleSettingsProvider } from '../../../conditional-formatting/_style-settings-provider';
import { widgetItemCore } from '../../../viewer-items/_widget-viewer-item-core';
import { cardArrangementInfo } from './_card-arrangement-info';
export declare let newCardMeasurements: {
    margin: number;
    padding: number;
    borderWidth: number;
};
export declare class newCardItem {
    private cardPainter;
    private clickHandler;
    private hoverHandler;
    private properties;
    private tag;
    index: number;
    itemDiv: JQuery;
    constructor(properties: widgetItemCore, cardIndex: number, viewerOptions: {
        clickHandler: any;
        hoverHandler: any;
        controlContainer: HTMLElement;
    });
    dispose(): void;
    selected(): boolean;
    setHoverEnabledState(hoverEnabled: boolean): void;
    draw(container: JQuery, cardArrangements: cardArrangementInfo, styleSettingsProvider: cardItemStyleSettingsProvider): JQuery;
    clearSelection(): void;
    select(): void;
    private hover;
    private setClickHandler;
    private setHoverHandler;
    private afterDraw;
    private applyExtraStyles;
}
