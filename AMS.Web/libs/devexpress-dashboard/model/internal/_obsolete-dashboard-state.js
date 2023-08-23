/**
* DevExpress Dashboard (_obsolete-dashboard-state.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObsoleteItemState = exports.ObsoleteDashboardState = void 0;
class ObsoleteDashboardState {
}
exports.ObsoleteDashboardState = ObsoleteDashboardState;
class ObsoleteItemState {
    static unwrapDilldownValues(values) {
        if (!values) {
            return null;
        }
        return values.map(value => value[0][0]);
    }
}
exports.ObsoleteItemState = ObsoleteItemState;
