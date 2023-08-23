/**
 * DevExtreme (cjs/ui/scheduler/base/widgetObserver.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _ui = _interopRequireDefault(require("../../widget/ui.widget"));

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
var WidgetObserver = function(_Widget) {
    _inheritsLoose(WidgetObserver, _Widget);

    function WidgetObserver() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = WidgetObserver.prototype;
    _proto.notifyObserver = function(subject, args) {
        var observer = this.option("observer");
        if (observer) {
            observer.fire(subject, args)
        }
    };
    _proto.invoke = function() {
        var observer = this.option("observer");
        if (observer) {
            return observer.fire.apply(observer, arguments)
        }
    };
    return WidgetObserver
}(_ui.default);
var _default = WidgetObserver;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
