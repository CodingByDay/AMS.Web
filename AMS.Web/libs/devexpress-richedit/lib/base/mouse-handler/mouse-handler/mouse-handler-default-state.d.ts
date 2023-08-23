import { LayoutAnchoredObjectBox } from '../../../core/layout/main-structures/layout-boxes/layout-anchored-object-box';
import { SubDocument } from '../../../core/model/sub-document';
import { RichMouseEvent } from '../../event-manager';
import { IRichEditControl } from '../../interfaces/i-rich-edit-core';
import { HitTestResult } from '../../layout-engine/hit-test-manager/hit-test-result';
import { MouseHandlerStateBase } from './mouse-handler-state-base';
export declare class MouseHandlerDefaultState extends MouseHandlerStateBase {
    onMouseDoubleClick(evt: RichMouseEvent): void;
    shouldActivateMainArea(activeSubDocument: SubDocument, htr: HitTestResult): boolean;
    private changeActiveSubDocument;
    onMouseDown(evt: RichMouseEvent): void;
    processMouseDownOnMaxDetailsLevel(evt: RichMouseEvent, htr: HitTestResult, activeSubDocument: SubDocument): void;
    onMouseUp(evt: RichMouseEvent): void;
    private static canHandleFullTableSelection;
    private shouldSelectEntireTableColumn;
    private shouldSelectEntireTableRow;
    private shouldSelectEntireTableCell;
    private beginSelectEntireTableColumn;
    private beginSelectEntireTableRow;
    private beginSelectEntireTableCell;
    private beginCharacterMultiSelection;
    private isLeftArea;
    private isLeftAreaOffset;
    private shouldProcessResizeBoxVisualizer;
    private beginResizeBoxMouseHandler;
    private beginRotate;
    private beginCharacterSelection;
    private setStartSelection;
    private getPosition;
    private beginLineSelection;
    private shouldSelectPicture;
    private shouldBeginDragExistingSelection;
    private selectImage;
    private beginDragExistingSelection;
    selectFloatingObject(box: LayoutAnchoredObjectBox): void;
}
export declare class MouseHandlerHelper {
    static selectParentsTextBox(control: IRichEditControl): void;
    static changeActiveSubDocumentToParent(control: IRichEditControl): void;
}
//# sourceMappingURL=mouse-handler-default-state.d.ts.map