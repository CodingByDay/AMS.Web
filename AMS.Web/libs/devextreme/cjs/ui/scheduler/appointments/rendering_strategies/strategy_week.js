/**
 * DevExtreme (cjs/ui/scheduler/appointments/rendering_strategies/strategy_week.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _strategy_vertical = _interopRequireDefault(require("./strategy_vertical"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var WeekAppointmentRenderingStrategy = function(_VerticalRenderingStr) {
    _inheritsLoose(WeekAppointmentRenderingStrategy, _VerticalRenderingStr);

    function WeekAppointmentRenderingStrategy() {
        return _VerticalRenderingStr.apply(this, arguments) || this
    }
    var _proto = WeekAppointmentRenderingStrategy.prototype;
    _proto.isApplyCompactAppointmentOffset = function() {
        if (this.isAdaptive && 0 === this._getMaxAppointmentCountPerCellByType()) {
            return false
        }
        return this.supportCompactDropDownAppointments()
    };
    return WeekAppointmentRenderingStrategy
}(_strategy_vertical.default);
var _default = WeekAppointmentRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
