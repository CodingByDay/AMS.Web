import { AnchoredPictureRun } from '../../../core/model/runs/anchored-picture-run';
import { AnchoredTextBoxRun } from '../../../core/model/runs/anchored-text-box-run';
import { Point } from '@devexpress/utils/lib/geometry/point';
import { ConstInterval } from '@devexpress/utils/lib/intervals/const';
import { IRichEditControl } from '../../interfaces/i-rich-edit-core';
import { HitTestResult } from '../../layout-engine/hit-test-manager/hit-test-result';
import { CommandBase, CommandOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
export declare class FloatingObjectMovedArgumentInner {
    readonly subDocumentId: number;
    newPosition: number;
    readonly pageIntervals: ConstInterval[];
    readonly pageIndex: number;
    objectX: number;
    objectY: number;
    constructor(subDocumentId: number, newPosition: number, pageIntervals: ConstInterval[], pageIndex: number, objectX: number, objectY: number);
}
export declare class FloatingObjectDragDropChangePositionCommand extends CommandBase<SimpleCommandState> {
    private rangeCopy;
    private get activeSubDocument();
    getState(): SimpleCommandState;
    canModify(): boolean;
    isEnabled(): boolean;
    executeCore(_state: SimpleCommandState, options: FloatingObjectDragDropChangePositionCommandParameters): boolean;
    changeActiveSubDocument(htr: HitTestResult, point: Point): boolean;
    private changeActiveSubDocumentToHeaderFooter;
    private getPageClientBounds;
    private move;
    shouldMoveInsideTable(oldRun: AnchoredPictureRun | AnchoredTextBoxRun, initialHtr: HitTestResult): boolean;
    private handleEvent;
    private moveInsideTable;
    private moveOutsideTable;
    private removeOldRun;
    private findParagraphStartOnThisPage;
    private addRun;
    private getNewAnchorInfo;
    private getNewLogPosition;
}
export declare class FloatingObjectDragDropChangePositionCommandParameters extends CommandOptions {
    startPageIndex: number;
    endPageIndex: number;
    finalPoint: Point;
    finalClickPoint: Point;
    constructor(control: IRichEditControl, startPageIndex: number, endPageIndex: number, finalPoint: Point, finalClickPoint: Point);
}
//# sourceMappingURL=floating-object-drag-drop-change-position-command.d.ts.map