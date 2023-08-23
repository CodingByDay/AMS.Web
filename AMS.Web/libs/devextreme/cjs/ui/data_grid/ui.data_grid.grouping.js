/**
 * DevExtreme (cjs/ui/data_grid/ui.data_grid.grouping.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _m_grouping = require("../../__internal/grids/data_grid/grouping/m_grouping");
Object.keys(_m_grouping).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _m_grouping[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _m_grouping[key]
        }
    })
}));
