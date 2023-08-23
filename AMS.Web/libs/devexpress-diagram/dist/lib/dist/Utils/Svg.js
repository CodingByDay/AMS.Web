"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isColorProperty = void 0;
var COLOR_PROPERTIES = { "stroke": true, "fill": true };
function isColorProperty(propName) {
    return COLOR_PROPERTIES[propName];
}
exports.isColorProperty = isColorProperty;
//# sourceMappingURL=Svg.js.map