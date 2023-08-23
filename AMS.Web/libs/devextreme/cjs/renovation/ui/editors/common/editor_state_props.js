/**
 * DevExtreme (cjs/renovation/ui/editors/common/editor_state_props.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.EditorStateProps = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var EditorStateProps = Object.defineProperties({
    hoverStateEnabled: true,
    activeStateEnabled: true
}, {
    focusStateEnabled: {
        get: function() {
            return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
        },
        configurable: true,
        enumerable: true
    }
});
exports.EditorStateProps = EditorStateProps;
