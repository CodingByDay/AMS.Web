import { LayoutPositionCreatorConflictFlags, LayoutPositionMainSubDocumentCreator, LayoutPositionOtherSubDocumentCreator } from '../../../core/layout-engine/layout-position-creator';
import { DocumentLayoutDetailsLevel } from '../../../core/layout/document-layout-details-level';
import { LayoutWordBounds } from '../../../core/word-bounds-engine/layout-word-bounds';
import { Browser } from '@devexpress/utils/lib/browser';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ManipulatorHandlerStateBase } from '../base/manipulator-handler-state-base';
export class TouchHandlerStateBase extends ManipulatorHandlerStateBase {
    constructor() {
        super(...arguments);
        this.TOUCH_SCROLL_SENSITIVITY_IN_ROWS = 2;
    }
    dispose() {
        super.dispose();
        clearTimeout(this.popupMenuId);
    }
    onTouchStart(_evt) { }
    onDoubleTap(_evt) { }
    onTouchEnd(_evt) { }
    onTouchMove(_evt) { return true; }
    captureInputFocus(_evt) {
        this.handler.control.focusManager.captureFocus();
    }
    showPopupMenu() {
        this.popupMenuId = setTimeout(() => this.handler.control.popupMenuManager.showByTouchClick(), 20);
    }
    setEditableDocumentContent() {
        if (!Browser.IE && !Browser.Edge) {
            var subDocument = this.handler.control.selection.activeSubDocument;
            let position = this.handler.control.selection.lastSelectedInterval.start;
            let startInterval = LayoutWordBounds.getLayoutWordStartBound(this.handler.control.layout, this.handler.control.selection.activeSubDocument, this.handler.control.selection, position);
            let startIntervalLayoutPosition = (subDocument.isMain()
                ? new LayoutPositionMainSubDocumentCreator(this.handler.control.layout, subDocument, startInterval, DocumentLayoutDetailsLevel.Box)
                : new LayoutPositionOtherSubDocumentCreator(this.handler.control.layout, subDocument, startInterval, this.handler.control.selection.pageIndex, DocumentLayoutDetailsLevel.Box))
                .create(new LayoutPositionCreatorConflictFlags().setDefault(this.handler.control.selection.endOfLine), new LayoutPositionCreatorConflictFlags().setDefault(false));
            if (startIntervalLayoutPosition.isLastBoxInRow())
                startInterval = LayoutWordBounds.getLayoutWordStartBound(this.handler.control.layout, this.handler.control.selection.activeSubDocument, this.handler.control.selection, position - 1);
            let endInterval = LayoutWordBounds.getLayoutWordEndBound(this.handler.control.layout, this.handler.control.selection.activeSubDocument, this.handler.control.selection, startInterval, false);
            let textUnderCursor = position >= startInterval && position <= endInterval ? this.handler.control.selection.activeSubDocument.getText(new FixedInterval(startInterval, endInterval - startInterval)) : "";
            this.handler.control.inputController.setEditableDocumentContent(textUnderCursor);
            if (textUnderCursor.length)
                this.handler.control.inputController.setEditableDocumentCursorPosition(position - startInterval);
        }
    }
    setLastLayoutPosition() {
        var subDocument = this.handler.control.selection.activeSubDocument;
        var logPosition = this.handler.control.selection.lastSelectedInterval.start;
        this.lastLayoutPosition = (subDocument.isMain()
            ? new LayoutPositionMainSubDocumentCreator(this.handler.control.layout, subDocument, logPosition, DocumentLayoutDetailsLevel.Character)
            : new LayoutPositionOtherSubDocumentCreator(this.handler.control.layout, subDocument, logPosition, this.handler.control.selection.pageIndex, DocumentLayoutDetailsLevel.Character))
            .create(new LayoutPositionCreatorConflictFlags().setDefault(this.handler.control.selection.endOfLine), new LayoutPositionCreatorConflictFlags().setDefault(true));
    }
}
export class TouchHandlerBeginDragHelperState extends TouchHandlerStateBase {
    constructor(handler, dragState) {
        super(handler);
        this.dragState = dragState;
    }
    start() {
        var _a;
        (_a = this.handler.control.barHolder.ribbon) === null || _a === void 0 ? void 0 : _a.beginUpdate();
        this.handler.control.horizontalRulerControl.beginUpdate();
    }
    finish() {
        var _a;
        (_a = this.handler.control.barHolder.ribbon) === null || _a === void 0 ? void 0 : _a.endUpdate();
        this.handler.control.horizontalRulerControl.endUpdate();
        this.handler.control.barHolder.updateItemsState();
        this.handler.control.horizontalRulerControl.update();
    }
    onTouchMove(evt) {
        this.handler.switchState(this.dragState);
        this.dragState.onTouchMove(evt);
        return false;
    }
    onTouchEnd(evt) {
        this.handler.switchToDefaultState();
        this.handler.onTouchEnd(evt);
    }
}
