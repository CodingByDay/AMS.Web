/**
 * DevExtreme (cjs/renovation/utils/diagnostic.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.DiagnosticUtils = void 0;
var _window = require("../../core/utils/window");
var DiagnosticUtils = {
    resolveMap: function() {
        var diagnosticWindow = (0, _window.getWindow)();
        if (!diagnosticWindow.dxDiagnostic) {
            diagnosticWindow.dxDiagnostic = {}
        }
        return diagnosticWindow.dxDiagnostic
    },
    getDiagnostic: function(key) {
        var diagnosticMap = DiagnosticUtils.resolveMap();
        if (!diagnosticMap[key]) {
            diagnosticMap[key] = {
                renderCount: 0
            }
        }
        return diagnosticMap[key]
    },
    incrementRenderCount: function(key) {
        var diagnostic = DiagnosticUtils.getDiagnostic(key);
        diagnostic.renderCount += 1
    }
};
exports.DiagnosticUtils = DiagnosticUtils;
