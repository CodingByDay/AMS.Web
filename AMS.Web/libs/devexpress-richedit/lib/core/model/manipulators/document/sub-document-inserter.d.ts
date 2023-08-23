import { Initializer } from '@devexpress/utils/lib/class/initializer';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { SubDocument, SubDocumentInterval, SubDocumentPosition } from '../../sub-document';
import { Table } from '../../tables/main-structures/table';
import { ModelManipulator } from '../model-manipulator';
import { ISizeUpdater } from '../picture-manipulator/loader/picture-loader';
export declare class SubDocumentInserterOptions extends Initializer {
    insertParagraphMarkBeforeIfStartsWithTable: boolean;
    enableCharacterStyleCreation: boolean;
    enableParagraphStyleCreation: boolean;
    enableTableStyleCreation: boolean;
    overlapTableCellContent: boolean;
    numberingListCache: Record<number, number>;
    abstractNumberingListCache: Record<number, number>;
    pictureSizeUpdater?: ISizeUpdater;
}
export declare class SubDocumentInserter {
    readonly newTables: Table[];
    insertedInterval: FixedInterval;
    insertedSubDocuments: SubDocument[];
    private targetModelManipulator;
    private get history();
    private options;
    private targetSubDocPos;
    private sourceSubDocInterval;
    private targetSubDocument;
    private targetStartPosition;
    private sourceSubDocument;
    private sourceInterval;
    private sourceDocumentModel;
    private targetDocumentModel;
    private constRunIterator;
    private currentTargetPosition;
    private fromFieldIndexesWhatNeedCopyInfo;
    private numberingListCache;
    private abstractNumberingListIndexesMap;
    private readonly runHandlers;
    private readonly unloadedCacheImageInfo;
    private get modelsConstOffset();
    private get sameModel();
    private get currInsertSubDocumentPosition();
    constructor(targetModelManipulator: ModelManipulator, options: SubDocumentInserterOptions, targetSubDocPos: SubDocumentPosition, sourceSubDocInterval: SubDocumentInterval);
    insert(): void;
    private fieldCodeRunHandler;
    private textRunHandler;
    private inlinePictureRunHandler;
    private anchoredPictureRunHandler;
    private anchoredTextBoxRunHandler;
    private paragraphRunHandler;
    private sectionRunHandler;
    private notSupportedRunHandler;
    private collectTables;
    private getPatternTable;
    private collectFields;
    private collectBookmarks;
    private prependTableByParagraph;
    private getFontInfo;
    private getColorModelInfo;
    private getCharPropsBundle;
    private getMaskedParagraphPropertiesBundleFull;
    private getMaskedCharacterProperties;
    private getMaskedParagraphProperties;
    private getTableProperties;
    private getTableRowProperties;
    private getTableCellProperties;
    private getCharacterStyle;
    private getParagraphStyle;
    private getTableStyle;
    private getTableConditionalStyle;
    private getTableCellStyle;
    private getCacheImageInfo;
    private getInlinePictureInfo;
    private getAnchorPictureInfo;
    private getParagraphListInfo;
    getAbstractNumberingListId(sourceAbstrNumbListIndex: number): number;
    private getListIndex;
}
//# sourceMappingURL=sub-document-inserter.d.ts.map