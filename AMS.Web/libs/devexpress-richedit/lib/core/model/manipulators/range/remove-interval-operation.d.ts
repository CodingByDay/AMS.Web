import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ConstBookmark } from '../../bookmarks';
import { HistoryRun } from '../../character/history-runs';
import { SubDocument } from '../../sub-document';
import { TableCell } from '../../tables/main-structures/table-cell';
import { ModelManipulator } from '../model-manipulator';
export declare class RemoveIntervalOperation {
    modelManipulator: ModelManipulator;
    currentSectionIndex: number;
    currentChunkIndex: number;
    currentParagraphIndex: number;
    currentCellIndex: number;
    position: number;
    subDocument: SubDocument;
    fieldIndexThatNeedDelete: number;
    shouldMergeParagraphs: boolean;
    cellsIterator: SelectedCellsIterator;
    constructor(manipulator: ModelManipulator, subDocument: SubDocument);
    execute(interval: FixedInterval, applyPropertiesToLeft: boolean, needHistory: boolean): RemoveIntervalOperationResult;
    private correctTablesStart;
    private initializeStartPositions;
    private executeCore;
    private modifySectionLength;
    private getStrategy;
    private removeTextRun;
    private skipParagraphRunAndMergeParagraphsAtTheEnd;
    private skipRunAndMoveToNextParagraph;
    private mergePreviousParagraph;
    private removeWholeSection;
    private removeWholeParagraph;
    private tryMergeStartEndParagraphs;
    private removeField;
    private tryPackSelectionInOneRun;
    private canRemoveRun;
    private fillResult;
    private removeAccumulatedInterval;
    private mergeParagraphsInternal;
    private removeRunInternal;
}
export declare class RemoveIntervalOperationResult {
    historyRuns: HistoryRun[];
    private nestingLevels;
    private cellsIterator;
    bookmarkItems: ConstBookmark[];
    constructor(cellsIterator: SelectedCellsIterator);
    registerItem(historyRun: HistoryRun): void;
    private registerItemCore;
    removeLastParagraphRun(): void;
    getIterator(): RemoveIntervalOperationResultIterator;
}
export declare class SelectedCellsIterator {
    cells: TableCell[];
    private current;
    private position;
    constructor(subDocument: SubDocument, interval: FixedInterval);
    moveTo(position: number): boolean;
    getCurrent(): TableCell;
    getPrev(): TableCell;
    getNext(): TableCell;
    reset(): void;
    private static getCellsByInterval;
    private static collectCellsByIntervalCore;
    private static correctCurrent;
}
export declare class RemoveIntervalOperationResultIterator {
    private historyRuns;
    private nestingLevels;
    private position;
    constructor(historyRuns: HistoryRun[], nestingLevels: number[]);
    currentHistoryRun: HistoryRun;
    currentNestingLevel: number;
    moveNext(): boolean;
}
//# sourceMappingURL=remove-interval-operation.d.ts.map