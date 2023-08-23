﻿/**
* DevExpress Dashboard (_card-arrangement-table-generator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { cardArrangementInfo } from './_card-arrangement-info';
export declare class cardArrangementTableGenerator {
    cells: JQuery[];
    cardArrangements: cardArrangementInfo;
    generateTable(container: JQuery, cardArrangements: cardArrangementInfo): void;
    drawCellContent(startIndex: any, endIndex: any, drawHandler: (container: JQuery, cardArrangements: cardArrangementInfo, cardIndex: number) => JQuery): void;
    private reset;
    private generateCells;
    private createRow;
    private createCell;
}
