/**
 * DevExtreme (renovation/ui/editors/common/text_editor_props.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.TextEditorProps = void 0;
var _themes = require("../../../../ui/themes");
var TextEditorProps = Object.defineProperties({
    maxLength: null,
    spellCheck: false,
    valueChangeEvent: "change",
    defaultValue: ""
}, {
    stylingMode: {
        get: function() {
            return (0, _themes.isMaterial)((0, _themes.current)()) ? "filled" : "outlined"
        },
        configurable: true,
        enumerable: true
    }
});
exports.TextEditorProps = TextEditorProps;
