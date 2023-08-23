/**
 * DevExtreme (cjs/ui/grid_core/ui.grid_core.virtual_scrolling.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _m_virtual_scrolling = require("../../__internal/grids/grid_core/virtual_scrolling/m_virtual_scrolling");
Object.keys(_m_virtual_scrolling).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _m_virtual_scrolling[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _m_virtual_scrolling[key]
        }
    })
}));
