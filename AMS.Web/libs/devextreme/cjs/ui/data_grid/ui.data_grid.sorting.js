/**
 * DevExtreme (cjs/ui/data_grid/ui.data_grid.sorting.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _sorting = require("../../__internal/grids/data_grid/module_not_extended/sorting");
Object.keys(_sorting).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _sorting[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _sorting[key]
        }
    })
}));
