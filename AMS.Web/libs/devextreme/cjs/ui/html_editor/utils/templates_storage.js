/**
 * DevExtreme (cjs/ui/html_editor/utils/templates_storage.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../../core/utils/type");
var TemplatesStorage = function() {
    function TemplatesStorage() {
        this._storage = {}
    }
    var _proto = TemplatesStorage.prototype;
    _proto.set = function(_ref, value) {
        var _this$_storage, _this$_storage$editor;
        var editorKey = _ref.editorKey,
            marker = _ref.marker;
        null !== (_this$_storage$editor = (_this$_storage = this._storage)[editorKey]) && void 0 !== _this$_storage$editor ? _this$_storage$editor : _this$_storage[editorKey] = {};
        this._storage[editorKey][marker] = value
    };
    _proto.get = function(_ref2) {
        var _Object$values$at, _this$_storage$editor2;
        var editorKey = _ref2.editorKey,
            marker = _ref2.marker;
        var isQuillFormatCall = !(0, _type.isDefined)(editorKey);
        return isQuillFormatCall ? null === (_Object$values$at = Object.values(this._storage).at(-1)) || void 0 === _Object$values$at ? void 0 : _Object$values$at[marker] : null === (_this$_storage$editor2 = this._storage[editorKey]) || void 0 === _this$_storage$editor2 ? void 0 : _this$_storage$editor2[marker]
    };
    _proto.delete = function(_ref3) {
        var editorKey = _ref3.editorKey,
            marker = _ref3.marker;
        if (!this._storage[editorKey]) {
            return
        }
        delete this._storage[editorKey][marker];
        if ((0, _type.isEmptyObject)(this._storage[editorKey])) {
            delete this._storage[editorKey]
        }
    };
    return TemplatesStorage
}();
exports.default = TemplatesStorage;
module.exports = exports.default;
module.exports.default = exports.default;
