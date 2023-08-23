﻿/**
* DevExpress Dashboard (_card-painter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { cardItemStyleSettingsProvider } from '../../../conditional-formatting/_style-settings-provider';
import { IWidgetItemDataAccessor } from '../../../viewer-items/_widget-viewer-item-core';
import { cardArrangementInfo } from './_card-arrangement-info';
import { cardIndicatorElement, cardLayout, cardRow, cardRowElement, cardRowElementBase, cardSparklineElement } from './_card-layout';
export declare class cardPainter {
    private data;
    private controlContainer;
    _styleSettingsProvider: cardItemStyleSettingsProvider;
    _cardStyle: any;
    layout: cardLayout;
    constructor(data: IWidgetItemDataAccessor, controlContainer: HTMLElement);
    draw(cardArrangements: cardArrangementInfo, layout: cardLayout, _styleSettingsProvider: cardItemStyleSettingsProvider): JQuery;
    createCardContent(cardArrangements: cardArrangementInfo, layout: cardLayout): JQuery;
    createRows(rowModels: cardRow[], contentWidth: number): JQuery[];
    createRow(elementModels: cardRowElementBase[], rowDiv: JQuery, contentWidth: number): void;
    createElements(elements: cardRowElementBase[], contentWidth: number): JQuery[];
    createIndicatorElement(indicatorElement: cardIndicatorElement): JQuery;
    createSparklineElement(sparklineElement: cardSparklineElement, contentWidth: number): any;
    createDataElement(textElement: cardRowElement): any;
    setElementColor(element: cardRowElement, elementDiv: JQuery, elementProperties: Array<{
        propertyName: string;
        propertyValue: any;
    }>): void;
}
