/**
 * DevExtreme (cjs/renovation/ui/editors/common/editor_label_props.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.EditorLabelProps = void 0;
var _themes = require("../../../../ui/themes");
var EditorLabelProps = Object.defineProperties({
    label: ""
}, {
    labelMode: {
        get: function() {
            return (0, _themes.isMaterial)((0, _themes.current)()) ? "floating" : "static"
        },
        configurable: true,
        enumerable: true
    }
});
exports.EditorLabelProps = EditorLabelProps;
