/**
 * DevExtreme (esm/ui/html_editor/utils/templates_storage.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isDefined,
    isEmptyObject
} from "../../../core/utils/type";
export default class TemplatesStorage {
    constructor() {
        this._storage = {}
    }
    set(_ref, value) {
        var _this$_storage, _this$_storage$editor;
        var {
            editorKey: editorKey,
            marker: marker
        } = _ref;
        null !== (_this$_storage$editor = (_this$_storage = this._storage)[editorKey]) && void 0 !== _this$_storage$editor ? _this$_storage$editor : _this$_storage[editorKey] = {};
        this._storage[editorKey][marker] = value
    }
    get(_ref2) {
        var _Object$values$at, _this$_storage$editor2;
        var {
            editorKey: editorKey,
            marker: marker
        } = _ref2;
        var isQuillFormatCall = !isDefined(editorKey);
        return isQuillFormatCall ? null === (_Object$values$at = Object.values(this._storage).at(-1)) || void 0 === _Object$values$at ? void 0 : _Object$values$at[marker] : null === (_this$_storage$editor2 = this._storage[editorKey]) || void 0 === _this$_storage$editor2 ? void 0 : _this$_storage$editor2[marker]
    }
    delete(_ref3) {
        var {
            editorKey: editorKey,
            marker: marker
        } = _ref3;
        if (!this._storage[editorKey]) {
            return
        }
        delete this._storage[editorKey][marker];
        if (isEmptyObject(this._storage[editorKey])) {
            delete this._storage[editorKey]
        }
    }
}
