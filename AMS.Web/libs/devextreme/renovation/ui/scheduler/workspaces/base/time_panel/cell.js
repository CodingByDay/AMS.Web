/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/time_panel/cell.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}
exports.viewFunction = exports.TimePanelCellProps = exports.TimePanelCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _cell = require("../cell");
var _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text", "timeCellTemplate"];

function _objectWithoutProperties(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) {
            continue
        }
        target[key] = source[key]
    }
    return target
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === _typeof(key) ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== _typeof(input) || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== _typeof(res)) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
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

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
var viewFunction = function(_ref) {
    var _ref$props = _ref.props,
        className = _ref$props.className,
        isFirstGroupCell = _ref$props.isFirstGroupCell,
        isLastGroupCell = _ref$props.isLastGroupCell,
        text = _ref$props.text,
        TimeCellTemplate = _ref$props.timeCellTemplate,
        timeCellTemplateProps = _ref.timeCellTemplateProps;
    return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
        isFirstGroupCell: isFirstGroupCell,
        isLastGroupCell: isLastGroupCell,
        className: "dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical ".concat(className),
        children: [!TimeCellTemplate && (0, _inferno.createVNode)(1, "div", null, text, 0), !!TimeCellTemplate && TimeCellTemplate({
            index: timeCellTemplateProps.index,
            data: timeCellTemplateProps.data
        })]
    })
};
exports.viewFunction = viewFunction;
var TimePanelCellProps = _cell.CellBaseProps;
exports.TimePanelCellProps = TimePanelCellProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var TimePanelCell = function(_BaseInfernoComponent) {
    _inheritsLoose(TimePanelCell, _BaseInfernoComponent);

    function TimePanelCell(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        _this.__getterCache = {};
        return _this
    }
    var _proto = TimePanelCell.prototype;
    _proto.componentWillUpdate = function(nextProps, nextState, context) {
        if (this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate || this.props.text !== nextProps.text) {
            this.__getterCache.timeCellTemplateProps = void 0
        }
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                timeCellTemplate: getTemplate(props.timeCellTemplate)
            }),
            timeCellTemplateProps: this.timeCellTemplateProps,
            restAttributes: this.restAttributes
        })
    };
    _createClass(TimePanelCell, [{
        key: "timeCellTemplateProps",
        get: function() {
            var _this2 = this;
            if (void 0 !== this.__getterCache.timeCellTemplateProps) {
                return this.__getterCache.timeCellTemplateProps
            }
            return this.__getterCache.timeCellTemplateProps = (_this2$props = _this2.props, groupIndex = _this2$props.groupIndex, groups = _this2$props.groups, index = _this2$props.index, startDate = _this2$props.startDate, text = _this2$props.text, {
                data: {
                    date: startDate,
                    groups: groups,
                    groupIndex: groupIndex,
                    text: text
                },
                index: index
            });
            var _this2$props, groupIndex, groups, index, startDate, text
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.allDay, _this$props.ariaLabel, _this$props.children, _this$props.className, _this$props.contentTemplateProps, _this$props.endDate, _this$props.groupIndex, _this$props.groups, _this$props.index, _this$props.isFirstGroupCell, _this$props.isLastGroupCell, _this$props.startDate, _this$props.text, _this$props.timeCellTemplate, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return TimePanelCell
}(_inferno2.BaseInfernoComponent);
exports.TimePanelCell = TimePanelCell;
TimePanelCell.defaultProps = TimePanelCellProps;
