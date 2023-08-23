import { AnchoredPictureChange, LayoutChangeBase } from '../../../../core/layout-formatter/changes/changes/layout-change-base';
import { PageAreaChange } from '../../../../core/layout-formatter/changes/changes/page-area-change';
import { PageChange } from '../../../../core/layout-formatter/changes/changes/page-change';
import { LayoutAnchoredPictureBox } from '../../../../core/layout/main-structures/layout-boxes/layout-anchored-picture-box';
import { LayoutAnchoredTextBox } from '../../../../core/layout/main-structures/layout-boxes/layout-anchored-text-box';
import { ConstInterval } from '@devexpress/utils/lib/intervals/const';
import { SimpleViewRenderer } from '../common/simple-view-renderer';
import { CanvasListener } from './canvas-listener';
export declare class SimpleViewChangesDataBase<T> {
    rows: T;
    tables: T;
    parFrames: T;
    constructor(rows: T, tables: T, parFrames: T);
}
export declare class SimpleViewChangesData<T, AncPicMapT, AncTextBoxMapT> extends SimpleViewChangesDataBase<T> {
    ancPictureObjs: AncPicMapT;
    ancTextBoxObjs: AncTextBoxMapT;
    constructor(rows: T, tables: T, parFrames: T, ancPictureObjs: AncPicMapT, ancTextBoxObjs: AncTextBoxMapT);
}
export declare class VisibleCanvasObjectsInfo extends SimpleViewChangesData<ConstInterval, Record<number, LayoutAnchoredPictureBox>, Record<number, LayoutAnchoredTextBox>> {
}
export declare class RenderedCanvasObjectsInfo extends SimpleViewChangesData<LayoutChangeBase[], AnchoredPictureChange[], PageAreaChange[]> {
}
export declare class SimpleViewCanvasListener extends CanvasListener<SimpleViewRenderer> {
    onPagesReady(pageChanges: PageChange[]): void;
    private getCurrentIndexes;
    private determineVisibleObjects;
    private determineVisibleObjectsForTables;
    private findBoundaryMinIndex;
    private determineVisibleObjectsForRows;
    updateVisibleParts(): void;
    onCanvasScroll(): void;
}
//# sourceMappingURL=simple-view-canvas-listener.d.ts.map