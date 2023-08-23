/**
 * DevExtreme (cjs/ui/notify.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _view_port = require("../core/utils/view_port");
var _extend = require("../core/utils/extend");
var _type = require("../core/utils/type");
var _window = require("../core/utils/window");
var _toast = _interopRequireDefault(require("./toast"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var window = (0, _window.getWindow)();
var $notify = null;
var $containers = {};

function notify(message, typeOrStack, displayTime) {
    var options = (0, _type.isPlainObject)(message) ? message : {
        message: message
    };
    var stack = (0, _type.isPlainObject)(typeOrStack) ? typeOrStack : void 0;
    var type = (0, _type.isPlainObject)(typeOrStack) ? void 0 : typeOrStack;
    var userOnHidden = options.onHidden;
    if (null !== stack && void 0 !== stack && stack.position) {
        var position = stack.position;
        var direction = stack.direction || getDefaultDirection(position);
        var containerKey = (0, _type.isString)(position) ? position : "".concat(position.top, "-").concat(position.left, "-").concat(position.bottom, "-").concat(position.right);
        var userOnShowing = options.onShowing;
        var $container = getStackContainer(containerKey);
        setContainerClasses($container, direction);
        (0, _extend.extend)(options, {
            container: $container,
            onShowing: function(args) {
                setContainerStyles($container, direction, position);
                null === userOnShowing || void 0 === userOnShowing ? void 0 : userOnShowing(args)
            }
        })
    }(0, _extend.extend)(options, {
        type: type,
        displayTime: displayTime,
        onHidden: function(args) {
            (0, _renderer.default)(args.element).remove();
            null === userOnHidden || void 0 === userOnHidden ? void 0 : userOnHidden(args)
        }
    });
    $notify = (0, _renderer.default)("<div>").appendTo((0, _view_port.value)());
    new _toast.default($notify, options).show()
}
var getDefaultDirection = function(position) {
    return (0, _type.isString)(position) && position.includes("top") ? "down-push" : "up-push"
};
var createStackContainer = function(key) {
    var $container = (0, _renderer.default)("<div>").appendTo((0, _view_port.value)());
    $containers[key] = $container;
    return $container
};
var getStackContainer = function(key) {
    var $container = $containers[key];
    return $container ? $container : createStackContainer(key)
};
var setContainerClasses = function(container, direction) {
    var containerClasses = "dx-toast-stack dx-toast-stack-".concat(direction, "-direction");
    container.removeAttr("class").addClass(containerClasses)
};
var setContainerStyles = function(container, direction, position) {
    var _container$children$f = container.children().first().get(0),
        toastWidth = _container$children$f.offsetWidth,
        toastHeight = _container$children$f.offsetHeight;
    var dimensions = {
        toastWidth: toastWidth,
        toastHeight: toastHeight,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    };
    var coordinates = (0, _type.isString)(position) ? getCoordinatesByAlias(position, dimensions) : position;
    var styles = getPositionStylesByCoordinates(direction, coordinates, dimensions);
    container.css(styles)
};
var getCoordinatesByAlias = function(alias, _ref) {
    var toastWidth = _ref.toastWidth,
        toastHeight = _ref.toastHeight,
        windowHeight = _ref.windowHeight,
        windowWidth = _ref.windowWidth;
    switch (alias) {
        case "top left":
            return {
                top: 10, left: 10
            };
        case "top right":
            return {
                top: 10, right: 10
            };
        case "bottom left":
            return {
                bottom: 10, left: 10
            };
        case "bottom right":
            return {
                bottom: 10, right: 10
            };
        case "top center":
            return {
                top: 10, left: Math.round(windowWidth / 2 - toastWidth / 2)
            };
        case "left center":
            return {
                top: Math.round(windowHeight / 2 - toastHeight / 2), left: 10
            };
        case "right center":
            return {
                top: Math.round(windowHeight / 2 - toastHeight / 2), right: 10
            };
        case "center":
            return {
                top: Math.round(windowHeight / 2 - toastHeight / 2), left: Math.round(windowWidth / 2 - toastWidth / 2)
            };
        case "bottom center":
        default:
            return {
                bottom: 10, left: Math.round(windowWidth / 2 - toastWidth / 2)
            }
    }
};
var getPositionStylesByCoordinates = function(direction, coordinates, dimensions) {
    var _coordinates$bottom, _coordinates$left, _coordinates$right, _coordinates$top, _coordinates$left2, _coordinates$right2, _coordinates$right3, _coordinates$top2, _coordinates$bottom2, _coordinates$left3, _coordinates$top3, _coordinates$bottom3;
    var toastWidth = dimensions.toastWidth,
        toastHeight = dimensions.toastHeight,
        windowHeight = dimensions.windowHeight,
        windowWidth = dimensions.windowWidth;
    switch (direction.replace(/-push|-stack/g, "")) {
        case "up":
            return {
                bottom: null !== (_coordinates$bottom = coordinates.bottom) && void 0 !== _coordinates$bottom ? _coordinates$bottom : windowHeight - toastHeight - coordinates.top, top: "", left: null !== (_coordinates$left = coordinates.left) && void 0 !== _coordinates$left ? _coordinates$left : "", right: null !== (_coordinates$right = coordinates.right) && void 0 !== _coordinates$right ? _coordinates$right : ""
            };
        case "down":
            return {
                top: null !== (_coordinates$top = coordinates.top) && void 0 !== _coordinates$top ? _coordinates$top : windowHeight - toastHeight - coordinates.bottom, bottom: "", left: null !== (_coordinates$left2 = coordinates.left) && void 0 !== _coordinates$left2 ? _coordinates$left2 : "", right: null !== (_coordinates$right2 = coordinates.right) && void 0 !== _coordinates$right2 ? _coordinates$right2 : ""
            };
        case "left":
            return {
                right: null !== (_coordinates$right3 = coordinates.right) && void 0 !== _coordinates$right3 ? _coordinates$right3 : windowWidth - toastWidth - coordinates.left, left: "", top: null !== (_coordinates$top2 = coordinates.top) && void 0 !== _coordinates$top2 ? _coordinates$top2 : "", bottom: null !== (_coordinates$bottom2 = coordinates.bottom) && void 0 !== _coordinates$bottom2 ? _coordinates$bottom2 : ""
            };
        case "right":
            return {
                left: null !== (_coordinates$left3 = coordinates.left) && void 0 !== _coordinates$left3 ? _coordinates$left3 : windowWidth - toastWidth - coordinates.right, right: "", top: null !== (_coordinates$top3 = coordinates.top) && void 0 !== _coordinates$top3 ? _coordinates$top3 : "", bottom: null !== (_coordinates$bottom3 = coordinates.bottom) && void 0 !== _coordinates$bottom3 ? _coordinates$bottom3 : ""
            }
    }
};
var _default = notify;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
