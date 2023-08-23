/**
* DevExpress Dashboard (_localization-initializer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocalization = void 0;
const analytics_localization_1 = require("@devexpress/analytics-core/analytics-localization");
const _default_1 = require("./_default");
function setLocalization(localization) {
    analytics_localization_1.loadMessages(localization);
}
exports.setLocalization = setLocalization;
setLocalization(_default_1.getDefaultLocalization());
