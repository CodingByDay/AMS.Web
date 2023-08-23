﻿/**
* DevExpress Dashboard (index.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./card-widget");
require("./index.internal");
__exportStar(require("./card-widget"), exports);
__exportStar(require("./export-options"), exports);
__exportStar(require("./legacy-settings"), exports);
__exportStar(require("./viewer/events-arguments"), exports);
__exportStar(require("./viewer/item-widget-event-args"), exports);
__exportStar(require("./widgets/caption-toolbar/caption-toolbar-options"), exports);
__exportStar(require("./widgets/dialogs/parameters-dialog-content"), exports);
