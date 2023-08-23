/**
 * DevExtreme (cjs/exporter/jspdf/export_gantt.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.exportGantt = exportGantt;

function exportGantt(options) {
    var component = options.component;
    return null === component || void 0 === component ? void 0 : component.exportToPdf(options)
}
