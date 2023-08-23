import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { SubDocumentInserterOptions } from '../../manipulators/document/sub-document-inserter';
import { ModelManipulator } from '../../manipulators/model-manipulator';
import { SubDocumentInterval, SubDocumentPosition, SubDocument } from '../../sub-document';
import { Table } from '../../tables/main-structures/table';
import { HistoryItem } from '../base/history-item';
export declare class InsertSubDocumentHistoryItem extends HistoryItem {
    targetSubDocPos: SubDocumentPosition;
    sourceSubDocInterval: SubDocumentInterval;
    newTables: Table[];
    options: SubDocumentInserterOptions;
    insertedInterval: FixedInterval;
    insertedSubDocuments: SubDocument[];
    constructor(modelManipulator: ModelManipulator, options: SubDocumentInserterOptions, targetSubDocPos: SubDocumentPosition, sourceSubDocInterval: SubDocumentInterval);
    redo(): void;
    undo(): void;
}
//# sourceMappingURL=insert-sub-document-history-item.d.ts.map