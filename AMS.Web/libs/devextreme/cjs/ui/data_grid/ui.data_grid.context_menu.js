/**
 * DevExtreme (cjs/ui/data_grid/ui.data_grid.context_menu.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _context_menu = require("../../__internal/grids/data_grid/module_not_extended/context_menu");
Object.keys(_context_menu).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _context_menu[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _context_menu[key]
        }
    })
}));
