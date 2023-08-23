/**
* DevExpress Dashboard (index.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
require("../designer");
class dxDashboardControl extends common_1.DashboardControl {
    constructor(element, options) {
        super(element, Object.assign(Object.assign({}, options), { renderImmediately: true }));
    }
}
exports.default = dxDashboardControl;
