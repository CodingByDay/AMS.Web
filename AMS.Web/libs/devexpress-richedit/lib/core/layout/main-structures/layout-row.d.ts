import { Flag } from '@devexpress/utils/lib/class/flag';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { Paragraph } from '../../model/paragraph/paragraph';
import { LayoutTableCellInfo } from '../table/layout-table-cell-info';
import { BookmarkBox } from './layout-boxes/bookmark-box';
import { LayoutBox } from './layout-boxes/layout-box';
import { LayoutNumberingListBox } from './layout-boxes/layout-numbering-list-box';
export declare enum LayoutRowStateFlags {
    NormallyEnd = 0,
    ParagraphEnd = 1,
    PageEnd = 2,
    ColumnEnd = 4,
    SectionEnd = 8,
    DocumentEnd = 16,
    CellTableEnd = 64,
    PageBreakBefore = 128
}
export declare class LayoutRow extends Rectangle {
    boxes: LayoutBox[];
    bookmarkBoxes: BookmarkBox[];
    numberingListBox: LayoutNumberingListBox;
    tableCellInfo: LayoutTableCellInfo;
    flags: Flag;
    columnOffset: number;
    baseLine: number;
    lineHeight: number;
    private spacingBefore;
    private spacingAfter;
    readonly initialY: number;
    get hasEffectToPageHeight(): boolean;
    constructor(minY?: number);
    getEndPosition(): number;
    getLastBoxEndPositionInRow(): number;
    getStartPosition(): number;
    getLastBox(): LayoutBox;
    isEmpty(): boolean;
    increaseRowHeightFromSpacingBeforeAndAfter(maxAscent: number, maxDescent: number): void;
    applySpacingBefore(value: number): void;
    rollbackSpacingBefore(): void;
    applySpacingAfter(value: number): void;
    rollbackSpacingAfter(): void;
    getSpacingBefore(): number;
    getSpacingAfter(): number;
    getLastVisibleBox(): LayoutBox;
    getLastVisibleBoxIndex(): number;
    static getParagraphSpacingBefore(paragraph: Paragraph, prevParagraph: Paragraph, isFirstRowInCell: boolean, isFirstCellInRow: boolean, isFirstRowInTable: boolean): number;
    static getParagraphSpacingAfter(paragraph: Paragraph, nextParagraph: Paragraph): number;
    applyXOffsetToBoxes(offset: number): void;
    getLastBoxIndexWhatCanStrikeoutAndUnderline(): number;
    containsSpacesOnly(): boolean;
}
export declare class LayoutRowWithIndex extends LayoutRow {
    indexInColumn: number;
}
//# sourceMappingURL=layout-row.d.ts.map