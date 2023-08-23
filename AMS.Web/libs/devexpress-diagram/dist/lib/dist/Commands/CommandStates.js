"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCommandState = void 0;
var SimpleCommandState = (function () {
    function SimpleCommandState(enabled, value, defaultValue, items, visible) {
        this.visible = true;
        this.denyUpdateValue = false;
        this.enabled = enabled;
        this.value = value;
        this.items = items;
        this.visible = visible;
        this.defaultValue = defaultValue;
    }
    return SimpleCommandState;
}());
exports.SimpleCommandState = SimpleCommandState;
//# sourceMappingURL=CommandStates.js.map