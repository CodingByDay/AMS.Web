/**
 * DevExtreme (esm/ui/html_editor/modules/imageCursor.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Quill from "devextreme-quill";
import BaseModule from "./base";
import eventsEngine from "../../../events/core/events_engine";
import {
    addNamespace
} from "../../../events/utils/index";
var MODULE_NAMESPACE = "dxHtmlEditorImageCursor";
var clickEvent = addNamespace("dxclick", MODULE_NAMESPACE);
var ImageCursorModule = BaseModule;
if (Quill) {
    ImageCursorModule = class extends BaseModule {
        constructor(quill, options) {
            super(quill, options);
            this.addCleanCallback(this.clean.bind(this));
            this._attachEvents()
        }
        _attachEvents() {
            eventsEngine.on(this.quill.root, clickEvent, this._clickHandler.bind(this))
        }
        _detachEvents() {
            eventsEngine.off(this.quill.root, clickEvent)
        }
        _clickHandler(e) {
            if (this._isAllowedTarget(e.target)) {
                this._adjustSelection(e)
            }
        }
        _isAllowedTarget(targetElement) {
            return this._isImage(targetElement)
        }
        _isImage(targetElement) {
            return "IMG" === targetElement.tagName.toUpperCase()
        }
        _adjustSelection(e) {
            var blot = this.quill.scroll.find(e.target);
            if (blot) {
                var index = blot.offset(this.quill.scroll);
                this.quill.setSelection(index + 1, 0)
            } else {
                this.quill.setSelection(0, 0)
            }
        }
        clean() {
            this._detachEvents()
        }
    }
}
export default ImageCursorModule;
