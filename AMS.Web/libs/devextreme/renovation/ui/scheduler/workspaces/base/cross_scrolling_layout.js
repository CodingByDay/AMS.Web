/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/cross_scrolling_layout.js)
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
exports.viewFunction = exports.CrossScrollingLayout = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _widget = require("../../../common/widget");
var _scrollable = require("../../../scroll_view/scrollable");
var _group_panel = require("./group_panel/group_panel");
var _layout = require("./date_table/all_day_panel/layout");
var _header_panel_empty_cell = require("./header_panel_empty_cell");
var _main_layout_props = require("./main_layout_props");
var _scrollSemaphore = require("../../utils/semaphore/scrollSemaphore");
var _layout2 = require("./time_panel/layout");
var _layout3 = require("../month/date_table/layout");
var _layout4 = require("./date_table/layout");
var _layout5 = require("../timeline/header_panel/layout");
var _layout6 = require("./header_panel/layout");
var _layout7 = require("../../appointment/layout");
var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "allDayAppointments", "allDayPanelRef", "appointments", "bottomVirtualRowHeight", "className", "dataCellTemplate", "dateCellTemplate", "dateHeaderData", "dateTableRef", "dateTableTemplate", "groupByDate", "groupOrientation", "groupPanelClassName", "groupPanelData", "groupPanelHeight", "groupPanelRef", "groups", "headerEmptyCellWidth", "headerPanelTemplate", "intervalCount", "isAllDayPanelCollapsed", "isAllDayPanelVisible", "isRenderDateHeader", "isRenderGroupPanel", "isRenderHeaderEmptyCell", "isRenderTimePanel", "isStandaloneAllDayPanel", "isUseMonthDateTable", "isUseTimelineHeader", "isWorkSpaceWithOddCells", "leftVirtualCellWidth", "onScroll", "resourceCellTemplate", "rightVirtualCellWidth", "scrollingDirection", "tablesWidth", "timeCellTemplate", "timePanelData", "timePanelRef", "topVirtualRowHeight", "viewData", "widgetElementRef", "width"];

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

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
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
    var dateTableScrollableRef = _ref.dateTableScrollableRef,
        headerScrollableRef = _ref.headerScrollableRef,
        headerStyles = _ref.headerStyles,
        onDateTableScroll = _ref.onDateTableScroll,
        onHeaderScroll = _ref.onHeaderScroll,
        onSideBarScroll = _ref.onSideBarScroll,
        _ref$props = _ref.props,
        allDayPanelRef = _ref$props.allDayPanelRef,
        className = _ref$props.className,
        dataCellTemplate = _ref$props.dataCellTemplate,
        dateCellTemplate = _ref$props.dateCellTemplate,
        dateHeaderData = _ref$props.dateHeaderData,
        dateTableRef = _ref$props.dateTableRef,
        groupByDate = _ref$props.groupByDate,
        groupOrientation = _ref$props.groupOrientation,
        groupPanelClassName = _ref$props.groupPanelClassName,
        groupPanelData = _ref$props.groupPanelData,
        groupPanelHeight = _ref$props.groupPanelHeight,
        groupPanelRef = _ref$props.groupPanelRef,
        groups = _ref$props.groups,
        headerEmptyCellWidth = _ref$props.headerEmptyCellWidth,
        isRenderDateHeader = _ref$props.isRenderDateHeader,
        isRenderGroupPanel = _ref$props.isRenderGroupPanel,
        isRenderHeaderEmptyCell = _ref$props.isRenderHeaderEmptyCell,
        isRenderTimePanel = _ref$props.isRenderTimePanel,
        isStandaloneAllDayPanel = _ref$props.isStandaloneAllDayPanel,
        isUseMonthDateTable = _ref$props.isUseMonthDateTable,
        isUseTimelineHeader = _ref$props.isUseTimelineHeader,
        resourceCellTemplate = _ref$props.resourceCellTemplate,
        tablesWidth = _ref$props.tablesWidth,
        timeCellTemplate = _ref$props.timeCellTemplate,
        timePanelData = _ref$props.timePanelData,
        timePanelRef = _ref$props.timePanelRef,
        viewData = _ref$props.viewData,
        widgetElementRef = _ref$props.widgetElementRef,
        sideBarScrollableRef = _ref.sideBarScrollableRef;
    var DateTable = isUseMonthDateTable ? _layout3.MonthDateTableLayout : _layout4.DateTableLayoutBase;
    var HeaderPanel = isUseTimelineHeader ? _layout5.TimelineHeaderPanelLayout : _layout6.HeaderPanelLayout;
    return (0, _inferno.createComponentVNode)(2, _widget.Widget, {
        className: className,
        rootElementRef: widgetElementRef,
        children: [(0, _inferno.createVNode)(1, "div", "dx-scheduler-fixed-appointments"), (0, _inferno.createVNode)(1, "div", "dx-scheduler-header-panel-container", [isRenderHeaderEmptyCell && (0, _inferno.createComponentVNode)(2, _header_panel_empty_cell.HeaderPanelEmptyCell, {
            width: headerEmptyCellWidth,
            isRenderAllDayTitle: isStandaloneAllDayPanel
        }), (0, _inferno.createVNode)(1, "div", "dx-scheduler-header-tables-container", (0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
            classes: "dx-scheduler-header-scrollable",
            useKeyboard: false,
            showScrollbar: "never",
            direction: "horizontal",
            useNative: false,
            bounceEnabled: false,
            onScroll: onHeaderScroll,
            children: [(0, _inferno.createVNode)(1, "table", "dx-scheduler-header-panel", (0, _inferno.createComponentVNode)(2, HeaderPanel, {
                dateHeaderData: dateHeaderData,
                groupPanelData: groupPanelData,
                timeCellTemplate: timeCellTemplate,
                dateCellTemplate: dateCellTemplate,
                isRenderDateHeader: isRenderDateHeader,
                groupOrientation: groupOrientation,
                groupByDate: groupByDate,
                groups: groups,
                resourceCellTemplate: resourceCellTemplate
            }), 2, {
                style: (0, _inferno2.normalizeStyles)(headerStyles)
            }), isStandaloneAllDayPanel && (0, _inferno.createComponentVNode)(2, _layout.AllDayPanelLayout, {
                viewData: viewData,
                dataCellTemplate: dataCellTemplate,
                tableRef: allDayPanelRef,
                width: tablesWidth
            })]
        }, null, headerScrollableRef), 2)], 0), (0, _inferno.createVNode)(1, "div", "dx-scheduler-work-space-flex-container", [(0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
            classes: "dx-scheduler-sidebar-scrollable",
            useKeyboard: false,
            showScrollbar: "never",
            direction: "vertical",
            useNative: false,
            bounceEnabled: false,
            onScroll: onSideBarScroll,
            children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-side-bar-scrollable-content", [isRenderGroupPanel && (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
                groupPanelData: groupPanelData,
                className: groupPanelClassName,
                groupOrientation: groupOrientation,
                groupByDate: groupByDate,
                groups: groups,
                resourceCellTemplate: resourceCellTemplate,
                height: groupPanelHeight,
                elementRef: groupPanelRef
            }), isRenderTimePanel && (0, _inferno.createComponentVNode)(2, _layout2.TimePanelTableLayout, {
                timePanelData: timePanelData,
                timeCellTemplate: timeCellTemplate,
                groupOrientation: groupOrientation,
                tableRef: timePanelRef
            })], 0)
        }, null, sideBarScrollableRef), (0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
            useKeyboard: false,
            bounceEnabled: false,
            direction: "both",
            classes: "dx-scheduler-date-table-scrollable",
            onScroll: onDateTableScroll,
            children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-scrollable-content", (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-container", [(0, _inferno.createComponentVNode)(2, DateTable, {
                tableRef: dateTableRef,
                viewData: viewData,
                groupOrientation: groupOrientation,
                dataCellTemplate: dataCellTemplate,
                width: tablesWidth
            }), (0, _inferno.createComponentVNode)(2, _layout7.AppointmentLayout)], 4), 2)
        }, null, dateTableScrollableRef)], 4)]
    })
};
exports.viewFunction = viewFunction;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var CrossScrollingLayout = function(_BaseInfernoComponent) {
    _inheritsLoose(CrossScrollingLayout, _BaseInfernoComponent);

    function CrossScrollingLayout(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        _this.dateTableScrollableRef = (0, _inferno.createRef)();
        _this.headerScrollableRef = (0, _inferno.createRef)();
        _this.sideBarScrollableRef = (0, _inferno.createRef)();
        _this.__getterCache = {};
        _this.getScrollableWidth = _this.getScrollableWidth.bind(_assertThisInitialized(_this));
        _this.onDateTableScroll = _this.onDateTableScroll.bind(_assertThisInitialized(_this));
        _this.onHeaderScroll = _this.onHeaderScroll.bind(_assertThisInitialized(_this));
        _this.onSideBarScroll = _this.onSideBarScroll.bind(_assertThisInitialized(_this));
        return _this
    }
    var _proto = CrossScrollingLayout.prototype;
    _proto.onDateTableScroll = function(e) {
        this.dateTableSemaphore.take(e.scrollOffset);
        this.sideBarSemaphore.isFree(e.scrollOffset) && this.sideBarScrollableRef.current.scrollTo({
            top: e.scrollOffset.top
        });
        this.headerSemaphore.isFree(e.scrollOffset) && this.headerScrollableRef.current.scrollTo({
            left: e.scrollOffset.left
        });
        this.props.onScroll(e);
        this.dateTableSemaphore.release()
    };
    _proto.onHeaderScroll = function(e) {
        this.headerSemaphore.take(e.scrollOffset);
        this.dateTableSemaphore.isFree(e.scrollOffset) && this.dateTableScrollableRef.current.scrollTo({
            left: e.scrollOffset.left
        });
        this.headerSemaphore.release()
    };
    _proto.onSideBarScroll = function(e) {
        this.sideBarSemaphore.take(e.scrollOffset);
        this.dateTableSemaphore.isFree(e.scrollOffset) && this.dateTableScrollableRef.current.scrollTo({
            top: e.scrollOffset.top
        });
        this.sideBarSemaphore.release()
    };
    _proto.getScrollableWidth = function() {
        return this.dateTableScrollableRef.current.container().getBoundingClientRect().width
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                headerPanelTemplate: getTemplate(props.headerPanelTemplate),
                dateTableTemplate: getTemplate(props.dateTableTemplate),
                resourceCellTemplate: getTemplate(props.resourceCellTemplate),
                timeCellTemplate: getTemplate(props.timeCellTemplate),
                dateCellTemplate: getTemplate(props.dateCellTemplate),
                dataCellTemplate: getTemplate(props.dataCellTemplate)
            }),
            dateTableScrollableRef: this.dateTableScrollableRef,
            headerScrollableRef: this.headerScrollableRef,
            sideBarScrollableRef: this.sideBarScrollableRef,
            dateTableSemaphore: this.dateTableSemaphore,
            headerSemaphore: this.headerSemaphore,
            sideBarSemaphore: this.sideBarSemaphore,
            headerStyles: this.headerStyles,
            onDateTableScroll: this.onDateTableScroll,
            onHeaderScroll: this.onHeaderScroll,
            onSideBarScroll: this.onSideBarScroll,
            restAttributes: this.restAttributes
        })
    };
    _createClass(CrossScrollingLayout, [{
        key: "dateTableSemaphore",
        get: function() {
            if (void 0 !== this.__getterCache.dateTableSemaphore) {
                return this.__getterCache.dateTableSemaphore
            }
            return this.__getterCache.dateTableSemaphore = new _scrollSemaphore.ScrollSemaphore
        }
    }, {
        key: "headerSemaphore",
        get: function() {
            if (void 0 !== this.__getterCache.headerSemaphore) {
                return this.__getterCache.headerSemaphore
            }
            return this.__getterCache.headerSemaphore = new _scrollSemaphore.ScrollSemaphore
        }
    }, {
        key: "sideBarSemaphore",
        get: function() {
            if (void 0 !== this.__getterCache.sideBarSemaphore) {
                return this.__getterCache.sideBarSemaphore
            }
            return this.__getterCache.sideBarSemaphore = new _scrollSemaphore.ScrollSemaphore
        }
    }, {
        key: "headerStyles",
        get: function() {
            return {
                width: this.props.tablesWidth
            }
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.addDateTableClass, _this$props.addVerticalSizesClassToRows, _this$props.allDayAppointments, _this$props.allDayPanelRef, _this$props.appointments, _this$props.bottomVirtualRowHeight, _this$props.className, _this$props.dataCellTemplate, _this$props.dateCellTemplate, _this$props.dateHeaderData, _this$props.dateTableRef, _this$props.dateTableTemplate, _this$props.groupByDate, _this$props.groupOrientation, _this$props.groupPanelClassName, _this$props.groupPanelData, _this$props.groupPanelHeight, _this$props.groupPanelRef, _this$props.groups, _this$props.headerEmptyCellWidth, _this$props.headerPanelTemplate, _this$props.intervalCount, _this$props.isAllDayPanelCollapsed, _this$props.isAllDayPanelVisible, _this$props.isRenderDateHeader, _this$props.isRenderGroupPanel, _this$props.isRenderHeaderEmptyCell, _this$props.isRenderTimePanel, _this$props.isStandaloneAllDayPanel, _this$props.isUseMonthDateTable, _this$props.isUseTimelineHeader, _this$props.isWorkSpaceWithOddCells, _this$props.leftVirtualCellWidth, _this$props.onScroll, _this$props.resourceCellTemplate, _this$props.rightVirtualCellWidth, _this$props.scrollingDirection, _this$props.tablesWidth, _this$props.timeCellTemplate, _this$props.timePanelData, _this$props.timePanelRef, _this$props.topVirtualRowHeight, _this$props.viewData, _this$props.widgetElementRef, _this$props.width, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return CrossScrollingLayout
}(_inferno2.BaseInfernoComponent);
exports.CrossScrollingLayout = CrossScrollingLayout;
CrossScrollingLayout.defaultProps = _main_layout_props.MainLayoutProps;
