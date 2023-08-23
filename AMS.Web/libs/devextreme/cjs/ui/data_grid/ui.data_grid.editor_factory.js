/**
 * DevExtreme (cjs/ui/data_grid/ui.data_grid.editor_factory.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _editor_factory = require("../../__internal/grids/data_grid/module_not_extended/editor_factory");
Object.keys(_editor_factory).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _editor_factory[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _editor_factory[key]
        }
    })
}));
