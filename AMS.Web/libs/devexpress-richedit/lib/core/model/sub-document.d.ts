import { ConstInterval } from '@devexpress/utils/lib/intervals/const';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { SpellCheckerIntervalsManager } from '../spelling/intervals-manager';
import { Bookmark } from './bookmarks';
import { RunIterator } from './character/run-iterator';
import { Chunk } from './chunk';
import { DocumentModel, ResetFormattingCacheType } from './document-model';
import { Field } from './fields/field';
import { FieldsWaitingForUpdate } from './fields/tree-creator';
import { FullChunkAndRunInfo } from './full-chunk-and-run-info';
import { DocumentProtectionSettings } from './options/protection';
import { Paragraph } from './paragraph/paragraph';
import { ParagraphProperties } from './paragraph/paragraph-properties';
import { PositionManager } from './position/position-manager';
import { RangePermission } from './range-permissions';
import { RunBase } from './runs/run-base';
import { Section } from './section/section';
import { SubDocumentInfoBase } from './sub-document-infos';
import { Table } from './tables/main-structures/table';
export declare class SubDocument {
    static AUTOGENERATE_ID: number;
    static MAIN_SUBDOCUMENT_ID: number;
    id: number;
    isDeleted: boolean;
    replacedWithSubDocId: number;
    documentModel: DocumentModel;
    chunks: Chunk[];
    paragraphs: Paragraph[];
    fields: Field[];
    tables: Table[];
    tablesByLevels: Table[][];
    positionManager: PositionManager;
    fieldsWaitingForUpdate: FieldsWaitingForUpdate;
    info: SubDocumentInfoBase;
    bookmarks: Bookmark[];
    rangePermissions: RangePermission[];
    availableRangePermissions: RangePermission[];
    spellCheckerIntervalsManager: SpellCheckerIntervalsManager;
    constructor(documentModel: DocumentModel, subDocumentInfo: SubDocumentInfoBase);
    get interval(): FixedInterval;
    getLastChunk(): Chunk;
    getFirstChunk(): Chunk;
    getText(interval?: FixedInterval): string;
    getSimpleText(interval: ConstInterval): string;
    splitRun(position: number): void;
    getLastRun(): RunBase;
    getFirstRun(): RunBase;
    getRunIterator(interval: FixedInterval): RunIterator;
    getConstRunIterator(interval: ConstInterval): RunIterator;
    private getRunIteratorInternal;
    getRunsByInterval(interval: FixedInterval): RunBase[];
    getRunByPosition(position: number): RunBase;
    getRunAndIndexesByPosition(position: number): FullChunkAndRunInfo;
    getSectionByPosition(position: number): Section;
    getParagraphByPosition(position: number): Paragraph;
    getParagraphIndexByPosition(position: number): number;
    getParagraphsIndices(interval: FixedInterval): FixedInterval;
    getParagraphsByInterval(interval: FixedInterval): Paragraph[];
    getParagraphIndicesByIntervals(intervals: FixedInterval[]): number[];
    getDocumentEndPosition(): number;
    getWholeWordInterval(position: number, checkRunProperties?: boolean, includeBounds?: boolean): FixedInterval;
    private getWordStart;
    private getWordEnd;
    resetMergedFormattingCache(type: ResetFormattingCacheType, interval?: FixedInterval): FixedInterval;
    isEditable(intervals: FixedInterval[]): boolean;
    filterRangePermissions(protectionSettings: DocumentProtectionSettings): void;
    clone(model: DocumentModel): SubDocument;
    isMain(): boolean;
    isHeaderFooter(): boolean;
    isFooter(): boolean;
    isHeader(): boolean;
    isNote(): boolean;
    isFootNote(): boolean;
    isEndNote(): boolean;
    isTextBox(): boolean;
    isComment(): boolean;
    isReferenced(): boolean;
    getParagraphProperties(paragraph: Paragraph): ParagraphProperties;
    findBookmarkByInterval(intervals: FixedInterval[], searchHidden?: boolean): Bookmark[];
    getActualSubDocument(): any;
}
export interface ISubDocumentPosition {
    subDocument: SubDocument;
    position: number;
    validateInterval(): any;
}
export interface ISubDocumentInterval {
    subDocument: SubDocument;
    interval: FixedInterval;
    validateInterval(): any;
}
export interface ISubDocumentIntervals {
    subDocument: SubDocument;
    intervals: FixedInterval[];
    validateInterval(): any;
}
export declare class SubDocumentPosition implements ISubDocumentPosition {
    subDocument: SubDocument;
    position: number;
    constructor(subDocument: SubDocument, position: number);
    validateInterval(): void;
    clone(): SubDocumentPosition;
    equals(obj: SubDocumentPosition): boolean;
}
export declare class SubDocumentInterval implements ISubDocumentInterval {
    subDocument: SubDocument;
    interval: FixedInterval;
    constructor(subDocument: SubDocument, interval: FixedInterval);
    static fromPosition(subDocument: SubDocument, position: number): SubDocumentInterval;
    clone(): SubDocumentInterval;
    validateInterval(): void;
    equals(obj: SubDocumentInterval): boolean;
}
export declare class SubDocumentIntervals implements ISubDocumentIntervals {
    subDocument: SubDocument;
    intervals: FixedInterval[];
    constructor(subDocument: SubDocument, intervals: FixedInterval[]);
    get multiselection(): boolean;
    validateInterval(): void;
    clone(): SubDocumentIntervals;
    equals(obj: SubDocumentIntervals): boolean;
    static fromPosition(subDocument: SubDocument, pos: number): SubDocumentIntervals;
}
//# sourceMappingURL=sub-document.d.ts.map