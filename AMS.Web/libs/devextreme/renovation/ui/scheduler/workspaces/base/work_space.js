/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/work_space.js)
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
exports.viewFunction = exports.prepareGenerationOptions = exports.WorkSpace = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _subscribe_to_event = require("../../../../utils/subscribe_to_event");
var _combine_classes = require("../../../../utils/combine_classes");
var _ordinary_layout = require("./ordinary_layout");
var _uiScheduler = require("../../../../../ui/scheduler/workspaces/ui.scheduler.virtual_scrolling");
var _view_data_provider = _interopRequireDefault(require("../../../../../ui/scheduler/workspaces/view_model/view_data_provider"));
var _utils = require("./utils");
var _props = require("../props");
var _work_space_config = require("./work_space_config");
var _utils2 = require("../utils");
var _cross_scrolling_layout = require("./cross_scrolling_layout");
var _utils3 = require("../../../../../ui/scheduler/workspaces/view_model/utils");
var _base = require("../../view_model/to_test/views/utils/base");
var _date_header_data_generator = require("../../../../../ui/scheduler/workspaces/view_model/date_header_data_generator");
var _time_panel_data_generator = require("../../../../../ui/scheduler/workspaces/view_model/time_panel_data_generator");
var _cells_selection_controller = require("../../../../../ui/scheduler/workspaces/cells_selection_controller");
var _utils4 = require("../../view_model/group_panel/utils");
var _window = require("../../../../../core/utils/window");
var _dom_adapter = _interopRequireDefault(require("../../../../../core/dom_adapter"));
var _config_context = require("../../../../common/config_context");
var _pointer = _interopRequireDefault(require("../../../../../events/pointer"));
var _events_engine = _interopRequireDefault(require("../../../../../events/core/events_engine"));
var _index = require("../../../../../events/utils/index");
var _const = require("../const");
var _diagnostic = require("../../../../utils/diagnostic");
var _excluded = ["accessKey", "activeStateEnabled", "allDayAppointments", "allDayPanelExpanded", "allDayPanelMode", "allowMultipleCellSelection", "appointmentCollectorTemplate", "appointmentTemplate", "appointments", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "dataCellTemplate", "dateCellTemplate", "disabled", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groupOrientation", "groups", "height", "hint", "hoursInterval", "hoverStateEnabled", "indicatorTime", "indicatorUpdateInterval", "intervalCount", "maxAppointmentsPerCell", "onClick", "onKeyDown", "onViewRendered", "resourceCellTemplate", "rtlEnabled", "schedulerHeight", "schedulerWidth", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDate", "startDayHour", "startViewDate", "tabIndex", "timeCellTemplate", "type", "visible", "width"];

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

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

function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [],
            _n = !0,
            _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) {
                    return
                }
                _n = !1
            } else {
                for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {}
            }
        } catch (err) {
            _d = !0, _e = err
        } finally {
            try {
                if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) {
                    return
                }
            } finally {
                if (_d) {
                    throw _e
                }
            }
        }
        return _arr
    }
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
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
var DATA_CELL_SELECTOR = ".".concat(_const.DATE_TABLE_CELL_CLASS, ", .").concat(_const.ALL_DAY_PANEL_CELL_CLASS);
var defaultVirtualScrollingMetaData = {
    cellHeight: 50,
    cellWidth: _utils.DATE_TABLE_MIN_CELL_WIDTH,
    viewWidth: 300,
    viewHeight: 300,
    scrollableWidth: 300,
    windowHeight: 300,
    windowWidth: 300
};
var calculateDefaultVirtualScrollingState = function(options) {
    var completeColumnCount = options.completeViewDataMap[0].length;
    var completeRowCount = options.completeViewDataMap.length;
    options.virtualScrollingDispatcher.setViewOptions((0, _utils.createVirtualScrollingOptions)({
        cellHeight: defaultVirtualScrollingMetaData.cellHeight,
        cellWidth: defaultVirtualScrollingMetaData.cellWidth,
        schedulerHeight: options.schedulerHeight,
        schedulerWidth: options.schedulerWidth,
        viewHeight: defaultVirtualScrollingMetaData.viewHeight,
        viewWidth: defaultVirtualScrollingMetaData.viewWidth,
        scrolling: options.scrolling,
        scrollableWidth: defaultVirtualScrollingMetaData.scrollableWidth,
        groups: options.groups,
        isVerticalGrouping: options.isVerticalGrouping,
        completeRowCount: completeRowCount,
        completeColumnCount: completeColumnCount,
        windowHeight: defaultVirtualScrollingMetaData.windowHeight,
        windowWidth: defaultVirtualScrollingMetaData.windowWidth,
        rtlEnabled: options.rtlEnabled
    }));
    options.virtualScrollingDispatcher.createVirtualScrolling();
    options.virtualScrollingDispatcher.updateDimensions(true);
    return options.virtualScrollingDispatcher.getRenderState()
};
var prepareGenerationOptions = function(workSpaceProps, renderConfig, isAllDayPanelVisible, virtualStartIndices) {
    var cellDuration = workSpaceProps.cellDuration,
        currentDate = workSpaceProps.currentDate,
        endDayHour = workSpaceProps.endDayHour,
        firstDayOfWeek = workSpaceProps.firstDayOfWeek,
        groupByDate = workSpaceProps.groupByDate,
        groupOrientation = workSpaceProps.groupOrientation,
        groups = workSpaceProps.groups,
        hoursInterval = workSpaceProps.hoursInterval,
        intervalCount = workSpaceProps.intervalCount,
        startDate = workSpaceProps.startDate,
        startDayHour = workSpaceProps.startDayHour,
        type = workSpaceProps.type;
    var getDateForHeaderText = renderConfig.getDateForHeaderText,
        headerCellTextFormat = renderConfig.headerCellTextFormat,
        isGenerateWeekDaysHeaderData = renderConfig.isGenerateWeekDaysHeaderData,
        isProvideVirtualCellsWidth = renderConfig.isProvideVirtualCellsWidth,
        isRenderTimePanel = renderConfig.isRenderTimePanel;
    return {
        startRowIndex: virtualStartIndices.startRowIndex,
        startCellIndex: virtualStartIndices.startCellIndex,
        groupOrientation: groupOrientation,
        groupByDate: groupByDate,
        groups: groups,
        isProvideVirtualCellsWidth: isProvideVirtualCellsWidth,
        isAllDayPanelVisible: isAllDayPanelVisible,
        selectedCells: void 0,
        focusedCell: void 0,
        headerCellTextFormat: headerCellTextFormat,
        getDateForHeaderText: getDateForHeaderText,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        cellDuration: cellDuration,
        viewType: type,
        intervalCount: intervalCount,
        hoursInterval: hoursInterval,
        currentDate: currentDate,
        startDate: startDate,
        firstDayOfWeek: firstDayOfWeek,
        isGenerateTimePanelData: isRenderTimePanel,
        isGenerateWeekDaysHeaderData: isGenerateWeekDaysHeaderData
    }
};
exports.prepareGenerationOptions = prepareGenerationOptions;
var viewFunction = function(_ref) {
    var allDayPanelRef = _ref.allDayPanelRef,
        classes = _ref.classes,
        dateHeaderData = _ref.dateHeaderData,
        dateTableRef = _ref.dateTableRef,
        groupOrientation = _ref.groupOrientation,
        groupPanelData = _ref.groupPanelData,
        groupPanelHeight = _ref.groupPanelHeight,
        groupPanelRef = _ref.groupPanelRef,
        headerEmptyCellWidth = _ref.headerEmptyCellWidth,
        isAllDayPanelVisible = _ref.isAllDayPanelVisible,
        isGroupedByDate = _ref.isGroupedByDate,
        isRenderHeaderEmptyCell = _ref.isRenderHeaderEmptyCell,
        isStandaloneAllDayPanel = _ref.isStandaloneAllDayPanel,
        isVerticalGrouping = _ref.isVerticalGrouping,
        layoutRef = _ref.layoutRef,
        onScrollableScroll = _ref.onScrollableScroll,
        _ref$props = _ref.props,
        allDayAppointments = _ref$props.allDayAppointments,
        allDayPanelExpanded = _ref$props.allDayPanelExpanded,
        appointments = _ref$props.appointments,
        dataCellTemplate = _ref$props.dataCellTemplate,
        dateCellTemplate = _ref$props.dateCellTemplate,
        groups = _ref$props.groups,
        intervalCount = _ref$props.intervalCount,
        resourceCellTemplate = _ref$props.resourceCellTemplate,
        timeCellTemplate = _ref$props.timeCellTemplate,
        _ref$renderConfig = _ref.renderConfig,
        groupPanelClassName = _ref$renderConfig.groupPanelClassName,
        isCreateCrossScrolling = _ref$renderConfig.isCreateCrossScrolling,
        isRenderDateHeader = _ref$renderConfig.isRenderDateHeader,
        isRenderTimePanel = _ref$renderConfig.isRenderTimePanel,
        isUseMonthDateTable = _ref$renderConfig.isUseMonthDateTable,
        isUseTimelineHeader = _ref$renderConfig.isUseTimelineHeader,
        scrollingDirection = _ref$renderConfig.scrollingDirection,
        tablesWidth = _ref.tablesWidth,
        timePanelData = _ref.timePanelData,
        timePanelRef = _ref.timePanelRef,
        viewData = _ref.viewData,
        widgetElementRef = _ref.widgetElementRef;
    var Layout = isCreateCrossScrolling ? _cross_scrolling_layout.CrossScrollingLayout : _ordinary_layout.OrdinaryLayout;
    return (0, _inferno.createComponentVNode)(2, Layout, {
        viewData: viewData,
        dateHeaderData: dateHeaderData,
        timePanelData: timePanelData,
        groupPanelData: groupPanelData,
        dataCellTemplate: dataCellTemplate,
        dateCellTemplate: dateCellTemplate,
        timeCellTemplate: timeCellTemplate,
        resourceCellTemplate: resourceCellTemplate,
        groups: groups,
        groupByDate: isGroupedByDate,
        groupOrientation: groupOrientation,
        groupPanelClassName: groupPanelClassName,
        intervalCount: intervalCount,
        isUseMonthDateTable: isUseMonthDateTable,
        isUseTimelineHeader: isUseTimelineHeader,
        isRenderTimePanel: isRenderTimePanel,
        isAllDayPanelCollapsed: !allDayPanelExpanded,
        isAllDayPanelVisible: isAllDayPanelVisible,
        isRenderDateHeader: isRenderDateHeader,
        isRenderHeaderEmptyCell: isRenderHeaderEmptyCell,
        isRenderGroupPanel: isVerticalGrouping,
        isStandaloneAllDayPanel: isStandaloneAllDayPanel,
        scrollingDirection: scrollingDirection,
        groupPanelHeight: groupPanelHeight,
        headerEmptyCellWidth: headerEmptyCellWidth,
        tablesWidth: tablesWidth,
        onScroll: onScrollableScroll,
        className: classes,
        dateTableRef: dateTableRef,
        allDayPanelRef: allDayPanelRef,
        timePanelRef: timePanelRef,
        groupPanelRef: groupPanelRef,
        widgetElementRef: widgetElementRef,
        appointments: appointments,
        allDayAppointments: allDayAppointments
    }, null, layoutRef)
};
exports.viewFunction = viewFunction;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var WorkSpace = function(_InfernoComponent) {
    _inheritsLoose(WorkSpace, _InfernoComponent);

    function WorkSpace(props) {
        var _this;
        _this = _InfernoComponent.call(this, props) || this;
        _this.dateTableRef = (0, _inferno.createRef)();
        _this.allDayPanelRef = (0, _inferno.createRef)();
        _this.timePanelRef = (0, _inferno.createRef)();
        _this.groupPanelRef = (0, _inferno.createRef)();
        _this.layoutRef = (0, _inferno.createRef)();
        _this.widgetElementRef = (0, _inferno.createRef)();
        _this.__getterCache = {};
        _this.state = {
            groupPanelHeight: void 0,
            headerEmptyCellWidth: void 0,
            tablesWidth: void 0,
            virtualScrolling: new _uiScheduler.VirtualScrollingDispatcher,
            virtualScrollingData: void 0,
            cellsSelectionState: null,
            isPointerDown: false
        };
        _this.diagnosticEffect = _this.diagnosticEffect.bind(_assertThisInitialized(_this));
        _this.headerEmptyCellWidthEffect = _this.headerEmptyCellWidthEffect.bind(_assertThisInitialized(_this));
        _this.tablesWidthEffect = _this.tablesWidthEffect.bind(_assertThisInitialized(_this));
        _this.virtualScrollingMetaDataEffect = _this.virtualScrollingMetaDataEffect.bind(_assertThisInitialized(_this));
        _this.groupPanelHeightEffect = _this.groupPanelHeightEffect.bind(_assertThisInitialized(_this));
        _this.onWindowScrollEffect = _this.onWindowScrollEffect.bind(_assertThisInitialized(_this));
        _this.pointerEventsEffect = _this.pointerEventsEffect.bind(_assertThisInitialized(_this));
        _this.onViewRendered = _this.onViewRendered.bind(_assertThisInitialized(_this));
        _this.pointerUpEffect = _this.pointerUpEffect.bind(_assertThisInitialized(_this));
        _this.createDateTableElementsMeta = _this.createDateTableElementsMeta.bind(_assertThisInitialized(_this));
        _this.createAllDayPanelElementsMeta = _this.createAllDayPanelElementsMeta.bind(_assertThisInitialized(_this));
        _this.onWindowScroll = _this.onWindowScroll.bind(_assertThisInitialized(_this));
        _this.onScrollableScroll = _this.onScrollableScroll.bind(_assertThisInitialized(_this));
        _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
        _this.onPointerDown = _this.onPointerDown.bind(_assertThisInitialized(_this));
        _this.onPointerUp = _this.onPointerUp.bind(_assertThisInitialized(_this));
        _this.onPointerMove = _this.onPointerMove.bind(_assertThisInitialized(_this));
        return _this
    }
    var _proto = WorkSpace.prototype;
    _proto.createEffects = function() {
        return [new _inferno2.InfernoEffect(this.diagnosticEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new _inferno2.InfernoEffect(this.headerEmptyCellWidthEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new _inferno2.InfernoEffect(this.tablesWidthEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new _inferno2.InfernoEffect(this.virtualScrollingMetaDataEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new _inferno2.InfernoEffect(this.groupPanelHeightEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new _inferno2.InfernoEffect(this.onWindowScrollEffect, [this.state.virtualScrolling, this.state.virtualScrollingData]), new _inferno2.InfernoEffect(this.pointerEventsEffect, [this.props.cellDuration, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.startDate, this.props.startDayHour, this.props.type, this.props.groupByDate, this.props.startViewDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.showAllDayPanel, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.props.scrolling, this.state.virtualScrolling, this.state.isPointerDown, this.state.cellsSelectionState]), new _inferno2.InfernoEffect(this.onViewRendered, [this.props.allDayPanelExpanded, this.props.cellDuration, this.props.crossScrollingEnabled, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.groupOrientation, this.props.type, this.props.intervalCount, this.props.groups, this.props.hoursInterval, this.props.onViewRendered, this.props.scrolling, this.props.showAllDayPanel, this.props.startDate, this.props.startDayHour, this.props.startViewDate, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.state.virtualScrolling, this.state.tablesWidth]), new _inferno2.InfernoEffect(this.pointerUpEffect, [])]
    };
    _proto.updateEffects = function() {
        var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
        null === (_this$_effects$2 = this._effects[1]) || void 0 === _this$_effects$2 ? void 0 : _this$_effects$2.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
        null === (_this$_effects$3 = this._effects[2]) || void 0 === _this$_effects$3 ? void 0 : _this$_effects$3.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
        null === (_this$_effects$4 = this._effects[3]) || void 0 === _this$_effects$4 ? void 0 : _this$_effects$4.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
        null === (_this$_effects$5 = this._effects[4]) || void 0 === _this$_effects$5 ? void 0 : _this$_effects$5.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
        null === (_this$_effects$6 = this._effects[5]) || void 0 === _this$_effects$6 ? void 0 : _this$_effects$6.update([this.state.virtualScrolling, this.state.virtualScrollingData]);
        null === (_this$_effects$7 = this._effects[6]) || void 0 === _this$_effects$7 ? void 0 : _this$_effects$7.update([this.props.cellDuration, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.startDate, this.props.startDayHour, this.props.type, this.props.groupByDate, this.props.startViewDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.showAllDayPanel, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.props.scrolling, this.state.virtualScrolling, this.state.isPointerDown, this.state.cellsSelectionState]);
        null === (_this$_effects$8 = this._effects[7]) || void 0 === _this$_effects$8 ? void 0 : _this$_effects$8.update([this.props.allDayPanelExpanded, this.props.cellDuration, this.props.crossScrollingEnabled, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.groupOrientation, this.props.type, this.props.intervalCount, this.props.groups, this.props.hoursInterval, this.props.onViewRendered, this.props.scrolling, this.props.showAllDayPanel, this.props.startDate, this.props.startDayHour, this.props.startViewDate, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.state.virtualScrolling, this.state.tablesWidth])
    };
    _proto.diagnosticEffect = function() {
        _diagnostic.DiagnosticUtils.incrementRenderCount("scheduler_workspace")
    };
    _proto.headerEmptyCellWidthEffect = function() {
        var _this$timePanelRef$cu, _this$timePanelRef$cu2, _this$groupPanelRef$c, _this$groupPanelRef$c2;
        var timePanelWidth = null !== (_this$timePanelRef$cu = null === (_this$timePanelRef$cu2 = this.timePanelRef.current) || void 0 === _this$timePanelRef$cu2 ? void 0 : _this$timePanelRef$cu2.getBoundingClientRect().width) && void 0 !== _this$timePanelRef$cu ? _this$timePanelRef$cu : 0;
        var groupPanelWidth = null !== (_this$groupPanelRef$c = null === (_this$groupPanelRef$c2 = this.groupPanelRef.current) || void 0 === _this$groupPanelRef$c2 ? void 0 : _this$groupPanelRef$c2.getBoundingClientRect().width) && void 0 !== _this$groupPanelRef$c ? _this$groupPanelRef$c : 0;
        this.setState((function(__state_argument) {
            return {
                headerEmptyCellWidth: timePanelWidth + groupPanelWidth
            }
        }))
    };
    _proto.tablesWidthEffect = function() {
        var _this2 = this;
        if (this.isCalculateTablesWidth) {
            var _this$props = this.props,
                currentDate = _this$props.currentDate,
                endDayHour = _this$props.endDayHour,
                groups = _this$props.groups,
                hoursInterval = _this$props.hoursInterval,
                intervalCount = _this$props.intervalCount,
                startDayHour = _this$props.startDayHour,
                viewType = _this$props.type;
            this.setState((function(__state_argument) {
                return {
                    tablesWidth: (0, _utils.getDateTableWidth)(_this2.layoutRef.current.getScrollableWidth(), _this2.dateTableRef.current, _this2.viewDataProvider, {
                        intervalCount: intervalCount,
                        currentDate: currentDate,
                        viewType: viewType,
                        hoursInterval: hoursInterval,
                        startDayHour: startDayHour,
                        endDayHour: endDayHour,
                        groups: groups,
                        groupOrientation: _this2.groupOrientation
                    })
                }
            }))
        }
    };
    _proto.virtualScrollingMetaDataEffect = function() {
        var _this3 = this;
        var dateTableCell = this.dateTableRef.current.querySelector("td:not(.dx-scheduler-virtual-cell)");
        var cellRect = dateTableCell.getBoundingClientRect();
        var cellHeight = Math.floor(cellRect.height);
        var cellWidth = Math.floor(cellRect.width);
        var scrollableWidth = this.layoutRef.current.getScrollableWidth();
        var widgetRect = this.widgetElementRef.current.getBoundingClientRect();
        var viewHeight = widgetRect.height;
        var viewWidth = widgetRect.width;
        var windowHeight = (0, _window.getWindow)().innerHeight;
        var windowWidth = (0, _window.getWindow)().innerWidth;
        var nextSizes = {
            cellHeight: cellHeight,
            cellWidth: cellWidth,
            scrollableWidth: scrollableWidth,
            viewHeight: viewHeight,
            viewWidth: viewWidth,
            windowHeight: windowHeight,
            windowWidth: windowWidth
        };
        var isNextMetaDataNotEqualToCurrent = !this.state.virtualScrollingData || Object.entries(nextSizes).some((function(_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                key = _ref3[0],
                value = _ref3[1];
            return value !== _this3.state.virtualScrollingData.sizes[key]
        }));
        if (isNextMetaDataNotEqualToCurrent) {
            var _this$config;
            var _this$props2 = this.props,
                groups = _this$props2.groups,
                schedulerHeight = _this$props2.schedulerHeight,
                schedulerWidth = _this$props2.schedulerWidth,
                scrolling = _this$props2.scrolling;
            var completeColumnCount = this.completeViewDataMap[0].length;
            var completeRowCount = this.completeViewDataMap.length;
            this.state.virtualScrolling.setViewOptions((0, _utils.createVirtualScrollingOptions)({
                cellHeight: nextSizes.cellHeight,
                cellWidth: nextSizes.cellWidth,
                schedulerHeight: schedulerHeight,
                schedulerWidth: schedulerWidth,
                viewHeight: nextSizes.viewHeight,
                viewWidth: nextSizes.viewWidth,
                scrolling: scrolling,
                scrollableWidth: nextSizes.scrollableWidth,
                groups: groups,
                isVerticalGrouping: this.isVerticalGrouping,
                completeRowCount: completeRowCount,
                completeColumnCount: completeColumnCount,
                windowHeight: nextSizes.windowHeight,
                windowWidth: nextSizes.windowWidth,
                rtlEnabled: !!(null !== (_this$config = this.config) && void 0 !== _this$config && _this$config.rtlEnabled)
            }));
            this.state.virtualScrolling.createVirtualScrolling();
            this.state.virtualScrolling.updateDimensions(true);
            this.setState((function(__state_argument) {
                return {
                    virtualScrollingData: {
                        state: _this3.state.virtualScrolling.getRenderState(),
                        sizes: nextSizes
                    }
                }
            }))
        }
    };
    _proto.groupPanelHeightEffect = function() {
        var _this4 = this;
        this.setState((function(__state_argument) {
            var _this4$dateTableRef$c;
            return {
                groupPanelHeight: null === (_this4$dateTableRef$c = _this4.dateTableRef.current) || void 0 === _this4$dateTableRef$c ? void 0 : _this4$dateTableRef$c.getBoundingClientRect().height
            }
        }))
    };
    _proto.onWindowScrollEffect = function() {
        var _this5 = this;
        if (this.state.virtualScrolling.isAttachWindowScrollEvent()) {
            return (0, _subscribe_to_event.subscribeToScrollEvent)(_dom_adapter.default.getDocument(), (function() {
                return _this5.onWindowScroll()
            }))
        }
        return
    };
    _proto.pointerEventsEffect = function() {
        var _this6 = this;
        var disposePointerDown = (0, _subscribe_to_event.subscribeToDXPointerDownEvent)(this.widgetElementRef.current, (function(e) {
            return _this6.onPointerDown(e)
        }));
        var disposePointerMove = (0, _subscribe_to_event.subscribeToDXPointerMoveEvent)(this.widgetElementRef.current, (function(e) {
            return _this6.onPointerMove(e)
        }));
        return function() {
            disposePointerDown();
            disposePointerMove()
        }
    };
    _proto.onViewRendered = function() {
        var _this$props3 = this.props,
            allDayPanelExpanded = _this$props3.allDayPanelExpanded,
            cellDuration = _this$props3.cellDuration,
            crossScrollingEnabled = _this$props3.crossScrollingEnabled,
            currentDate = _this$props3.currentDate,
            endDayHour = _this$props3.endDayHour,
            firstDayOfWeek = _this$props3.firstDayOfWeek,
            groupByDate = _this$props3.groupByDate,
            groupOrientation = _this$props3.groupOrientation,
            groups = _this$props3.groups,
            hoursInterval = _this$props3.hoursInterval,
            intervalCount = _this$props3.intervalCount,
            onViewRendered = _this$props3.onViewRendered,
            scrolling = _this$props3.scrolling,
            showAllDayPanel = _this$props3.showAllDayPanel,
            startDate = _this$props3.startDate,
            startDayHour = _this$props3.startDayHour,
            viewType = _this$props3.type;
        var tableWidths = (0, _utils.getDateTableWidth)(this.layoutRef.current.getScrollableWidth(), this.dateTableRef.current, this.viewDataProvider, {
            intervalCount: intervalCount,
            currentDate: currentDate,
            viewType: viewType,
            hoursInterval: hoursInterval,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            groups: groups,
            groupOrientation: this.groupOrientation
        });
        if (!this.isCalculateTablesWidth || tableWidths === this.state.tablesWidth) {
            var columnCount = this.viewDataMap.dateTableMap[0].length;
            var dateTableCellsMeta = this.createDateTableElementsMeta(columnCount);
            var allDayPanelCellsMeta = this.createAllDayPanelElementsMeta();
            onViewRendered({
                viewDataProvider: this.viewDataProvider,
                cellsMetaData: {
                    dateTableCellsMeta: dateTableCellsMeta,
                    allDayPanelCellsMeta: allDayPanelCellsMeta
                },
                viewDataProviderValidationOptions: {
                    intervalCount: intervalCount,
                    currentDate: currentDate,
                    type: viewType,
                    hoursInterval: hoursInterval,
                    startDayHour: startDayHour,
                    endDayHour: endDayHour,
                    groups: groups,
                    groupOrientation: groupOrientation,
                    groupByDate: groupByDate,
                    crossScrollingEnabled: crossScrollingEnabled,
                    firstDayOfWeek: firstDayOfWeek,
                    startDate: startDate,
                    showAllDayPanel: showAllDayPanel,
                    allDayPanelExpanded: allDayPanelExpanded,
                    scrolling: scrolling,
                    cellDuration: cellDuration
                }
            })
        }
    };
    _proto.pointerUpEffect = function() {
        var _this7 = this;
        var onPointerUp = function(e) {
            return _this7.onPointerUp(e)
        };
        _events_engine.default.on(_dom_adapter.default.getDocument(), _pointer.default.up, onPointerUp);
        return function() {
            _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.up, onPointerUp)
        }
    };
    _proto.createDateTableElementsMeta = function(totalCellCount) {
        var dateTableCells = this.dateTableRef.current.querySelectorAll("td:not(.dx-scheduler-virtual-cell)");
        var dateTableRect = this.dateTableRef.current.getBoundingClientRect();
        var dateTableCellsMeta = [];
        dateTableCells.forEach((function(cellElement, index) {
            if (index % totalCellCount === 0) {
                dateTableCellsMeta.push([])
            }
            var cellRect = cellElement.getBoundingClientRect();
            var validCellRect = (0, _utils.createCellElementMetaData)(dateTableRect, cellRect);
            dateTableCellsMeta[dateTableCellsMeta.length - 1].push(validCellRect)
        }));
        return dateTableCellsMeta
    };
    _proto.createAllDayPanelElementsMeta = function() {
        if (!this.allDayPanelRef.current) {
            return []
        }
        var allDayPanelCells = this.allDayPanelRef.current.querySelectorAll("td");
        var allDayPanelRect = this.allDayPanelRef.current.getBoundingClientRect();
        var allDayPanelCellsMeta = [];
        allDayPanelCells.forEach((function(cellElement) {
            var cellRect = cellElement.getBoundingClientRect();
            allDayPanelCellsMeta.push((0, _utils.createCellElementMetaData)(allDayPanelRect, cellRect))
        }));
        return allDayPanelCellsMeta
    };
    _proto.onWindowScroll = function() {
        var _getWindow = (0, _window.getWindow)(),
            scrollX = _getWindow.scrollX,
            scrollY = _getWindow.scrollY;
        this.onScroll({
            top: scrollY,
            left: scrollX
        })
    };
    _proto.onScrollableScroll = function(event) {
        if ("virtual" === this.props.scrolling.mode) {
            this.onScroll(event.scrollOffset)
        }
    };
    _proto.onScroll = function(scrollOffset) {
        var _this8 = this;
        this.state.virtualScrolling.handleOnScrollEvent(scrollOffset);
        var nextState = this.state.virtualScrolling.getRenderState();
        var isUpdateState = Object.entries(nextState).some((function(_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                key = _ref5[0],
                value = _ref5[1];
            return value !== _this8.state.virtualScrollingData.state[key]
        }));
        if (isUpdateState) {
            this.setState((function(__state_argument) {
                return {
                    virtualScrollingData: {
                        state: nextState,
                        sizes: __state_argument.virtualScrollingData.sizes
                    }
                }
            }))
        }
    };
    _proto.onPointerDown = function(e) {
        var cell = e.target.closest(DATA_CELL_SELECTOR);
        if (cell && (0, _index.isMouseEvent)(e) && 0 === e.button) {
            var isAllDay = (0, _utils.isCellAllDay)(cell);
            var cellIndices = (0, _utils.getCellIndices)(cell);
            var cellData = this.viewDataProvider.getCellData(cellIndices.rowIndex, cellIndices.columnIndex, isAllDay);
            this.setState((function(__state_argument) {
                return {
                    cellsSelectionState: {
                        focusedCell: {
                            cellData: cellData,
                            position: cellIndices
                        },
                        selectedCells: [cellData],
                        firstSelectedCell: cellData
                    }
                }
            }));
            this.setState((function(__state_argument) {
                return {
                    isPointerDown: true
                }
            }))
        }
    };
    _proto.onPointerUp = function(e) {
        if ((0, _index.isMouseEvent)(e) && 0 === e.button) {
            this.setState((function(__state_argument) {
                return {
                    isPointerDown: false
                }
            }))
        }
    };
    _proto.onPointerMove = function(e) {
        var cell = e.target.closest(DATA_CELL_SELECTOR);
        if (cell && this.state.isPointerDown) {
            e.preventDefault();
            e.stopPropagation();
            var cellsSelectionController = new _cells_selection_controller.CellsSelectionController;
            var cellIndices = (0, _utils.getCellIndices)(cell);
            var isAllDay = (0, _utils.isCellAllDay)(cell);
            var cellData = this.viewDataProvider.getCellData(cellIndices.rowIndex, cellIndices.columnIndex, isAllDay);
            var nextFocusedCell = cellsSelectionController.moveToCell({
                isMultiSelection: true,
                isMultiSelectionAllowed: true,
                focusedCellData: this.state.cellsSelectionState.focusedCell.cellData,
                currentCellData: cellData
            });
            if (nextFocusedCell === cellData && this.state.cellsSelectionState.focusedCell.cellData.index !== cellData.index) {
                var firstCell = this.state.cellsSelectionState.firstSelectedCell;
                var lastCell = cellData;
                var selectedCells = (0, _utils.getSelectedCells)(this.viewDataProvider, firstCell, lastCell, !!firstCell.allDay);
                this.setState((function(__state_argument) {
                    return {
                        cellsSelectionState: {
                            focusedCell: {
                                cellData: cellData,
                                position: cellIndices
                            },
                            selectedCells: selectedCells,
                            firstSelectedCell: __state_argument.cellsSelectionState.firstSelectedCell
                        }
                    }
                }))
            }
        }
    };
    _proto.componentWillUpdate = function(nextProps, nextState, context) {
        _InfernoComponent.prototype.componentWillUpdate.call(this);
        if (this.props.type !== nextProps.type || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.intervalCount !== nextProps.intervalCount || this.props.groups !== nextProps.groups || this.props.groupOrientation !== nextProps.groupOrientation) {
            this.__getterCache.renderConfig = void 0
        }
        if (this.props.type !== nextProps.type) {
            this.__getterCache.viewDataGenerator = void 0
        }
        if (this.props.type !== nextProps.type) {
            this.__getterCache.dateHeaderDataGenerator = void 0
        }
        if (this.props.type !== nextProps.type) {
            this.__getterCache.timePanelDataGenerator = void 0
        }
        if (this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.groups !== nextProps.groups || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDate !== nextProps.startDate || this.props.startDayHour !== nextProps.startDayHour || this.props.type !== nextProps.type || this.props.startViewDate !== nextProps.startViewDate || this.props.groupOrientation !== nextProps.groupOrientation || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.showAllDayPanel !== nextProps.showAllDayPanel) {
            this.__getterCache.completeViewDataMap = void 0
        }
        if (this.state.virtualScrollingData !== nextState.virtualScrollingData || this.props.groups !== nextProps.groups || this.props.schedulerHeight !== nextProps.schedulerHeight || this.props.schedulerWidth !== nextProps.schedulerWidth || this.props.scrolling !== nextProps.scrolling || this.state.virtualScrolling !== nextState.virtualScrolling || this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDate !== nextProps.startDate || this.props.startDayHour !== nextProps.startDayHour || this.props.type !== nextProps.type || this.props.startViewDate !== nextProps.startViewDate || this.props.groupOrientation !== nextProps.groupOrientation || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.showAllDayPanel !== nextProps.showAllDayPanel) {
            this.__getterCache.correctedVirtualScrollingState = void 0
        }
        if (this.props.type !== nextProps.type || this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.groups !== nextProps.groups || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDate !== nextProps.startDate || this.props.startDayHour !== nextProps.startDayHour || this.props.startViewDate !== nextProps.startViewDate || this.props.groupOrientation !== nextProps.groupOrientation || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.state.virtualScrollingData !== nextState.virtualScrollingData || this.props.schedulerHeight !== nextProps.schedulerHeight || this.props.schedulerWidth !== nextProps.schedulerWidth || this.props.scrolling !== nextProps.scrolling || this.state.virtualScrolling !== nextState.virtualScrolling) {
            this.__getterCache.viewDataMap = void 0
        }
        if (this.state.cellsSelectionState !== nextState.cellsSelectionState || this.props.type !== nextProps.type || this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.groups !== nextProps.groups || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDate !== nextProps.startDate || this.props.startDayHour !== nextProps.startDayHour || this.props.startViewDate !== nextProps.startViewDate || this.props.groupOrientation !== nextProps.groupOrientation || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.state.virtualScrollingData !== nextState.virtualScrollingData || this.props.schedulerHeight !== nextProps.schedulerHeight || this.props.schedulerWidth !== nextProps.schedulerWidth || this.props.scrolling !== nextProps.scrolling || this.state.virtualScrolling !== nextState.virtualScrolling) {
            this.__getterCache.viewDataMapWithSelection = void 0
        }
        if (this.props.groups !== nextProps.groups || this.props.type !== nextProps.type || this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDate !== nextProps.startDate || this.props.startDayHour !== nextProps.startDayHour || this.props.startViewDate !== nextProps.startViewDate || this.props.groupOrientation !== nextProps.groupOrientation || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.state.cellsSelectionState !== nextState.cellsSelectionState || this.state.virtualScrollingData !== nextState.virtualScrollingData || this.props.schedulerHeight !== nextProps.schedulerHeight || this.props.schedulerWidth !== nextProps.schedulerWidth || this.props.scrolling !== nextProps.scrolling || this.state.virtualScrolling !== nextState.virtualScrolling) {
            this.__getterCache.viewData = void 0
        }
        if (this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.groups !== nextProps.groups || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDayHour !== nextProps.startDayHour || this.props.type !== nextProps.type || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.groupOrientation !== nextProps.groupOrientation || this.props.groupByDate !== nextProps.groupByDate || this.props.startViewDate !== nextProps.startViewDate || this.props.cellDuration !== nextProps.cellDuration || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.startDate !== nextProps.startDate || this.props.showAllDayPanel !== nextProps.showAllDayPanel) {
            this.__getterCache.completeDateHeaderData = void 0
        }
        if (this.props.endDayHour !== nextProps.endDayHour || this.props.groups !== nextProps.groups || this.props.hoursInterval !== nextProps.hoursInterval || this.props.startDayHour !== nextProps.startDayHour || this.props.type !== nextProps.type || this.props.currentDate !== nextProps.currentDate || this.props.intervalCount !== nextProps.intervalCount || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.groupOrientation !== nextProps.groupOrientation || this.props.groupByDate !== nextProps.groupByDate || this.props.startViewDate !== nextProps.startViewDate || this.props.cellDuration !== nextProps.cellDuration || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.startDate !== nextProps.startDate || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.state.virtualScrollingData !== nextState.virtualScrollingData || this.props.schedulerHeight !== nextProps.schedulerHeight || this.props.schedulerWidth !== nextProps.schedulerWidth || this.props.scrolling !== nextProps.scrolling || this.state.virtualScrolling !== nextState.virtualScrolling) {
            this.__getterCache.dateHeaderData = void 0
        }
        if (this.props.type !== nextProps.type || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.intervalCount !== nextProps.intervalCount || this.props.groups !== nextProps.groups || this.props.groupOrientation !== nextProps.groupOrientation || this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.hoursInterval !== nextProps.hoursInterval || this.props.startDayHour !== nextProps.startDayHour || this.props.startViewDate !== nextProps.startViewDate || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.startDate !== nextProps.startDate || this.props.showAllDayPanel !== nextProps.showAllDayPanel) {
            this.__getterCache.completeTimePanelData = void 0
        }
        if (this.props.type !== nextProps.type || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.intervalCount !== nextProps.intervalCount || this.props.groups !== nextProps.groups || this.props.groupOrientation !== nextProps.groupOrientation || this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.hoursInterval !== nextProps.hoursInterval || this.props.startDayHour !== nextProps.startDayHour || this.props.startViewDate !== nextProps.startViewDate || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.startDate !== nextProps.startDate || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.state.virtualScrollingData !== nextState.virtualScrollingData || this.props.schedulerHeight !== nextProps.schedulerHeight || this.props.schedulerWidth !== nextProps.schedulerWidth || this.props.scrolling !== nextProps.scrolling || this.state.virtualScrolling !== nextState.virtualScrolling) {
            this.__getterCache.timePanelData = void 0
        }
        if (this.props.cellDuration !== nextProps.cellDuration || this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groups !== nextProps.groups || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDate !== nextProps.startDate || this.props.startDayHour !== nextProps.startDayHour || this.props.type !== nextProps.type || this.props.groupByDate !== nextProps.groupByDate || this.props.startViewDate !== nextProps.startViewDate || this.props.groupOrientation !== nextProps.groupOrientation || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.state.virtualScrollingData !== nextState.virtualScrollingData || this.props.schedulerHeight !== nextProps.schedulerHeight || this.props.schedulerWidth !== nextProps.schedulerWidth || this.props.scrolling !== nextProps.scrolling || this.state.virtualScrolling !== nextState.virtualScrolling) {
            this.__getterCache.viewDataProvider = void 0
        }
        if (this.props.currentDate !== nextProps.currentDate || this.props.endDayHour !== nextProps.endDayHour || this.props.groups !== nextProps.groups || this.props.hoursInterval !== nextProps.hoursInterval || this.props.intervalCount !== nextProps.intervalCount || this.props.startDayHour !== nextProps.startDayHour || this.props.type !== nextProps.type || this.props.groupOrientation !== nextProps.groupOrientation || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.groupByDate !== nextProps.groupByDate) {
            this.__getterCache.groupPanelData = void 0
        }
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                dataCellTemplate: getTemplate(props.dataCellTemplate),
                dateCellTemplate: getTemplate(props.dateCellTemplate),
                timeCellTemplate: getTemplate(props.timeCellTemplate),
                resourceCellTemplate: getTemplate(props.resourceCellTemplate),
                appointmentTemplate: getTemplate(props.appointmentTemplate),
                appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate)
            }),
            groupPanelHeight: this.state.groupPanelHeight,
            headerEmptyCellWidth: this.state.headerEmptyCellWidth,
            tablesWidth: this.state.tablesWidth,
            virtualScrolling: this.state.virtualScrolling,
            virtualScrollingData: this.state.virtualScrollingData,
            cellsSelectionState: this.state.cellsSelectionState,
            isPointerDown: this.state.isPointerDown,
            dateTableRef: this.dateTableRef,
            allDayPanelRef: this.allDayPanelRef,
            timePanelRef: this.timePanelRef,
            groupPanelRef: this.groupPanelRef,
            widgetElementRef: this.widgetElementRef,
            layoutRef: this.layoutRef,
            config: this.config,
            renderConfig: this.renderConfig,
            groupOrientation: this.groupOrientation,
            isVerticalGrouping: this.isVerticalGrouping,
            isHorizontalGrouping: this.isHorizontalGrouping,
            isGroupedByDate: this.isGroupedByDate,
            isAllDayPanelVisible: this.isAllDayPanelVisible,
            viewDataGenerator: this.viewDataGenerator,
            dateHeaderDataGenerator: this.dateHeaderDataGenerator,
            timePanelDataGenerator: this.timePanelDataGenerator,
            completeViewDataMap: this.completeViewDataMap,
            correctedVirtualScrollingState: this.correctedVirtualScrollingState,
            viewDataMap: this.viewDataMap,
            viewDataMapWithSelection: this.viewDataMapWithSelection,
            viewData: this.viewData,
            completeDateHeaderData: this.completeDateHeaderData,
            dateHeaderData: this.dateHeaderData,
            completeTimePanelData: this.completeTimePanelData,
            timePanelData: this.timePanelData,
            viewDataProvider: this.viewDataProvider,
            groupPanelData: this.groupPanelData,
            isRenderHeaderEmptyCell: this.isRenderHeaderEmptyCell,
            isWorkSpaceWithOddCells: this.isWorkSpaceWithOddCells,
            classes: this.classes,
            isStandaloneAllDayPanel: this.isStandaloneAllDayPanel,
            isCalculateTablesWidth: this.isCalculateTablesWidth,
            createDateTableElementsMeta: this.createDateTableElementsMeta,
            createAllDayPanelElementsMeta: this.createAllDayPanelElementsMeta,
            onWindowScroll: this.onWindowScroll,
            onScrollableScroll: this.onScrollableScroll,
            onScroll: this.onScroll,
            onPointerDown: this.onPointerDown,
            onPointerUp: this.onPointerUp,
            onPointerMove: this.onPointerMove,
            restAttributes: this.restAttributes
        })
    };
    _createClass(WorkSpace, [{
        key: "config",
        get: function() {
            if (this.context[_config_context.ConfigContext.id]) {
                return this.context[_config_context.ConfigContext.id]
            }
            return _config_context.ConfigContext.defaultValue
        }
    }, {
        key: "renderConfig",
        get: function() {
            var _this9 = this;
            if (void 0 !== this.__getterCache.renderConfig) {
                return this.__getterCache.renderConfig
            }
            return this.__getterCache.renderConfig = (0, _work_space_config.getViewRenderConfigByType)(_this9.props.type, _this9.props.crossScrollingEnabled, _this9.props.intervalCount, _this9.props.groups, _this9.props.groupOrientation)
        }
    }, {
        key: "groupOrientation",
        get: function() {
            var groupOrientation = this.props.groupOrientation;
            var defaultGroupOrientation = this.renderConfig.defaultGroupOrientation;
            return null !== groupOrientation && void 0 !== groupOrientation ? groupOrientation : defaultGroupOrientation
        }
    }, {
        key: "isVerticalGrouping",
        get: function() {
            return (0, _utils2.isVerticalGroupingApplied)(this.props.groups, this.groupOrientation)
        }
    }, {
        key: "isHorizontalGrouping",
        get: function() {
            return (0, _utils2.isHorizontalGroupingApplied)(this.props.groups, this.groupOrientation)
        }
    }, {
        key: "isGroupedByDate",
        get: function() {
            return (0, _utils2.isGroupingByDate)(this.props.groups, this.groupOrientation, this.props.groupByDate)
        }
    }, {
        key: "isAllDayPanelVisible",
        get: function() {
            var showAllDayPanel = this.props.showAllDayPanel;
            var isAllDayPanelSupported = this.renderConfig.isAllDayPanelSupported;
            return isAllDayPanelSupported && showAllDayPanel
        }
    }, {
        key: "viewDataGenerator",
        get: function() {
            var _this10 = this;
            if (void 0 !== this.__getterCache.viewDataGenerator) {
                return this.__getterCache.viewDataGenerator
            }
            return this.__getterCache.viewDataGenerator = (0, _utils3.getViewDataGeneratorByViewType)(_this10.props.type)
        }
    }, {
        key: "dateHeaderDataGenerator",
        get: function() {
            var _this11 = this;
            if (void 0 !== this.__getterCache.dateHeaderDataGenerator) {
                return this.__getterCache.dateHeaderDataGenerator
            }
            return this.__getterCache.dateHeaderDataGenerator = new _date_header_data_generator.DateHeaderDataGenerator(_this11.viewDataGenerator)
        }
    }, {
        key: "timePanelDataGenerator",
        get: function() {
            var _this12 = this;
            if (void 0 !== this.__getterCache.timePanelDataGenerator) {
                return this.__getterCache.timePanelDataGenerator
            }
            return this.__getterCache.timePanelDataGenerator = new _time_panel_data_generator.TimePanelDataGenerator(_this12.viewDataGenerator)
        }
    }, {
        key: "completeViewDataMap",
        get: function() {
            var _this13 = this;
            if (void 0 !== this.__getterCache.completeViewDataMap) {
                return this.__getterCache.completeViewDataMap
            }
            return this.__getterCache.completeViewDataMap = (_this13$props = _this13.props, cellDuration = _this13$props.cellDuration, currentDate = _this13$props.currentDate, endDayHour = _this13$props.endDayHour, firstDayOfWeek = _this13$props.firstDayOfWeek, groupByDate = _this13$props.groupByDate, groups = _this13$props.groups, hoursInterval = _this13$props.hoursInterval, intervalCount = _this13$props.intervalCount, startDate = _this13$props.startDate, startDayHour = _this13$props.startDayHour, type = _this13$props.type, _this13.viewDataGenerator.getCompleteViewDataMap({
                currentDate: currentDate,
                startDate: startDate,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                groupByDate: groupByDate,
                groups: groups,
                intervalCount: intervalCount,
                firstDayOfWeek: firstDayOfWeek,
                hoursInterval: hoursInterval,
                cellDuration: cellDuration,
                startViewDate: _this13.props.startViewDate,
                groupOrientation: _this13.groupOrientation,
                isVerticalGrouping: _this13.isVerticalGrouping,
                isHorizontalGrouping: _this13.isHorizontalGrouping,
                isGroupedByDate: _this13.isGroupedByDate,
                isAllDayPanelVisible: _this13.isAllDayPanelVisible,
                viewType: type,
                interval: _this13.viewDataGenerator.getInterval(hoursInterval)
            }));
            var _this13$props, cellDuration, currentDate, endDayHour, firstDayOfWeek, groupByDate, groups, hoursInterval, intervalCount, startDate, startDayHour, type
        }
    }, {
        key: "correctedVirtualScrollingState",
        get: function() {
            var _this14 = this;
            if (void 0 !== this.__getterCache.correctedVirtualScrollingState) {
                return this.__getterCache.correctedVirtualScrollingState
            }
            return this.__getterCache.correctedVirtualScrollingState = function() {
                var _this14$state$virtual;
                var result = null === (_this14$state$virtual = _this14.state.virtualScrollingData) || void 0 === _this14$state$virtual ? void 0 : _this14$state$virtual.state;
                if (!result) {
                    var _this14$props = _this14.props,
                        groups = _this14$props.groups,
                        schedulerHeight = _this14$props.schedulerHeight,
                        schedulerWidth = _this14$props.schedulerWidth,
                        scrolling = _this14$props.scrolling;
                    result = calculateDefaultVirtualScrollingState({
                        virtualScrollingDispatcher: _this14.state.virtualScrolling,
                        scrolling: scrolling,
                        groups: groups,
                        completeViewDataMap: _this14.completeViewDataMap,
                        isVerticalGrouping: _this14.isVerticalGrouping,
                        schedulerHeight: schedulerHeight,
                        schedulerWidth: schedulerWidth,
                        rtlEnabled: false
                    })
                }
                return _extends({
                    startCellIndex: 0,
                    startRowIndex: 0
                }, result)
            }()
        }
    }, {
        key: "viewDataMap",
        get: function() {
            var _this15 = this;
            if (void 0 !== this.__getterCache.viewDataMap) {
                return this.__getterCache.viewDataMap
            }
            return this.__getterCache.viewDataMap = _this15.viewDataGenerator.generateViewDataMap(_this15.completeViewDataMap, _extends({}, _this15.correctedVirtualScrollingState, {
                isVerticalGrouping: _this15.isVerticalGrouping,
                isAllDayPanelVisible: _this15.isAllDayPanelVisible
            }))
        }
    }, {
        key: "viewDataMapWithSelection",
        get: function() {
            var _this16 = this;
            if (void 0 !== this.__getterCache.viewDataMapWithSelection) {
                return this.__getterCache.viewDataMapWithSelection
            }
            return this.__getterCache.viewDataMapWithSelection = function() {
                if (!_this16.state.cellsSelectionState) {
                    return _this16.viewDataMap
                }
                return _this16.viewDataGenerator.markSelectedAndFocusedCells(_this16.viewDataMap, _this16.state.cellsSelectionState)
            }()
        }
    }, {
        key: "viewData",
        get: function() {
            var _this17 = this;
            if (void 0 !== this.__getterCache.viewData) {
                return this.__getterCache.viewData
            }
            return this.__getterCache.viewData = (groups = _this17.props.groups, result = _this17.viewDataGenerator.getViewDataFromMap(_this17.completeViewDataMap, _this17.viewDataMapWithSelection, _extends({}, _this17.correctedVirtualScrollingState, {
                isProvideVirtualCellsWidth: _this17.renderConfig.isProvideVirtualCellsWidth,
                isVerticalGrouping: _this17.isVerticalGrouping,
                isAllDayPanelVisible: _this17.isAllDayPanelVisible,
                isGroupedAllDayPanel: (0, _base.calculateIsGroupedAllDayPanel)(groups, _this17.groupOrientation, _this17.isAllDayPanelVisible)
            })), result);
            var groups, result
        }
    }, {
        key: "completeDateHeaderData",
        get: function() {
            var _this18 = this;
            if (void 0 !== this.__getterCache.completeDateHeaderData) {
                return this.__getterCache.completeDateHeaderData
            }
            return this.__getterCache.completeDateHeaderData = (_this18$props = _this18.props, currentDate = _this18$props.currentDate, endDayHour = _this18$props.endDayHour, groups = _this18$props.groups, hoursInterval = _this18$props.hoursInterval, intervalCount = _this18$props.intervalCount, startDayHour = _this18$props.startDayHour, viewType = _this18$props.type, _this18.dateHeaderDataGenerator.getCompleteDateHeaderMap({
                isGenerateWeekDaysHeaderData: _this18.renderConfig.isGenerateWeekDaysHeaderData,
                isGroupedByDate: _this18.isGroupedByDate,
                groups: groups,
                groupOrientation: _this18.groupOrientation,
                isHorizontalGrouping: _this18.isHorizontalGrouping,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                hoursInterval: hoursInterval,
                intervalCount: intervalCount,
                headerCellTextFormat: _this18.renderConfig.headerCellTextFormat,
                getDateForHeaderText: _this18.renderConfig.getDateForHeaderText,
                interval: _this18.viewDataGenerator.getInterval(hoursInterval),
                startViewDate: _this18.props.startViewDate,
                currentDate: currentDate,
                viewType: viewType,
                today: new Date
            }, _this18.completeViewDataMap));
            var _this18$props, currentDate, endDayHour, groups, hoursInterval, intervalCount, startDayHour, viewType
        }
    }, {
        key: "dateHeaderData",
        get: function() {
            var _this19 = this;
            if (void 0 !== this.__getterCache.dateHeaderData) {
                return this.__getterCache.dateHeaderData
            }
            return this.__getterCache.dateHeaderData = (_this19$props = _this19.props, endDayHour = _this19$props.endDayHour, groups = _this19$props.groups, hoursInterval = _this19$props.hoursInterval, startDayHour = _this19$props.startDayHour, _this19.dateHeaderDataGenerator.generateDateHeaderData(_this19.completeDateHeaderData, _this19.completeViewDataMap, _extends({
                isGenerateWeekDaysHeaderData: _this19.renderConfig.isGenerateWeekDaysHeaderData,
                isProvideVirtualCellsWidth: _this19.renderConfig.isProvideVirtualCellsWidth,
                isMonthDateHeader: _this19.renderConfig.isMonthDateHeader,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                hoursInterval: hoursInterval,
                groups: groups,
                groupOrientation: _this19.groupOrientation,
                isGroupedByDate: _this19.isGroupedByDate
            }, _this19.correctedVirtualScrollingState)));
            var _this19$props, endDayHour, groups, hoursInterval, startDayHour
        }
    }, {
        key: "completeTimePanelData",
        get: function() {
            var _this20 = this;
            if (void 0 !== this.__getterCache.completeTimePanelData) {
                return this.__getterCache.completeTimePanelData
            }
            return this.__getterCache.completeTimePanelData = function() {
                if (!_this20.renderConfig.isRenderTimePanel) {
                    return
                }
                var _this20$props = _this20.props,
                    cellDuration = _this20$props.cellDuration,
                    currentDate = _this20$props.currentDate,
                    endDayHour = _this20$props.endDayHour,
                    hoursInterval = _this20$props.hoursInterval,
                    intervalCount = _this20$props.intervalCount,
                    startDayHour = _this20$props.startDayHour,
                    type = _this20$props.type;
                return _this20.timePanelDataGenerator.getCompleteTimePanelMap({
                    startViewDate: _this20.props.startViewDate,
                    cellDuration: cellDuration,
                    startDayHour: startDayHour,
                    endDayHour: endDayHour,
                    isVerticalGrouping: _this20.isVerticalGrouping,
                    intervalCount: intervalCount,
                    currentDate: currentDate,
                    viewType: type,
                    hoursInterval: hoursInterval
                }, _this20.completeViewDataMap)
            }()
        }
    }, {
        key: "timePanelData",
        get: function() {
            var _this21 = this;
            if (void 0 !== this.__getterCache.timePanelData) {
                return this.__getterCache.timePanelData
            }
            return this.__getterCache.timePanelData = function() {
                if (!_this21.completeTimePanelData) {
                    return
                }
                return _this21.timePanelDataGenerator.generateTimePanelData(_this21.completeTimePanelData, _extends({
                    isGroupedAllDayPanel: (0, _base.calculateIsGroupedAllDayPanel)(_this21.props.groups, _this21.groupOrientation, _this21.isAllDayPanelVisible),
                    isVerticalGrouping: _this21.isVerticalGrouping,
                    isAllDayPanelVisible: _this21.isAllDayPanelVisible
                }, _this21.correctedVirtualScrollingState))
            }()
        }
    }, {
        key: "viewDataProvider",
        get: function() {
            var _this22 = this;
            if (void 0 !== this.__getterCache.viewDataProvider) {
                return this.__getterCache.viewDataProvider
            }
            return this.__getterCache.viewDataProvider = function() {
                var _this22$props = _this22.props,
                    cellDuration = _this22$props.cellDuration,
                    currentDate = _this22$props.currentDate,
                    endDayHour = _this22$props.endDayHour,
                    firstDayOfWeek = _this22$props.firstDayOfWeek,
                    groups = _this22$props.groups,
                    hoursInterval = _this22$props.hoursInterval,
                    intervalCount = _this22$props.intervalCount,
                    startDate = _this22$props.startDate,
                    startDayHour = _this22$props.startDayHour,
                    type = _this22$props.type;
                var viewDataProvider = new _view_data_provider.default(type);
                viewDataProvider.completeViewDataMap = _this22.completeViewDataMap;
                viewDataProvider.viewDataMap = _this22.viewDataMap;
                var generationOptions = prepareGenerationOptions({
                    intervalCount: intervalCount,
                    groups: groups,
                    groupByDate: _this22.isGroupedByDate,
                    groupOrientation: _this22.groupOrientation,
                    startDayHour: startDayHour,
                    endDayHour: endDayHour,
                    currentDate: currentDate,
                    startDate: startDate,
                    firstDayOfWeek: firstDayOfWeek,
                    hoursInterval: hoursInterval,
                    type: type,
                    cellDuration: cellDuration
                }, _this22.renderConfig, _this22.isAllDayPanelVisible, _this22.correctedVirtualScrollingState);
                viewDataProvider.setViewOptions(generationOptions);
                viewDataProvider.createGroupedDataMapProvider();
                return viewDataProvider
            }()
        }
    }, {
        key: "groupPanelData",
        get: function() {
            var _this23 = this;
            if (void 0 !== this.__getterCache.groupPanelData) {
                return this.__getterCache.groupPanelData
            }
            return this.__getterCache.groupPanelData = (_this23$props = _this23.props, currentDate = _this23$props.currentDate, endDayHour = _this23$props.endDayHour, groups = _this23$props.groups, hoursInterval = _this23$props.hoursInterval, intervalCount = _this23$props.intervalCount, startDayHour = _this23$props.startDayHour, type = _this23$props.type, columnCountPerGroup = _this23.viewDataGenerator.getCellCount({
                intervalCount: intervalCount,
                hoursInterval: hoursInterval,
                currentDate: currentDate,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                viewType: type
            }), groupPanelData = (0, _utils4.getGroupPanelData)(groups, columnCountPerGroup, _this23.isGroupedByDate, _this23.isGroupedByDate ? 1 : columnCountPerGroup), groupPanelData);
            var _this23$props, currentDate, endDayHour, groups, hoursInterval, intervalCount, startDayHour, type, columnCountPerGroup, groupPanelData
        }
    }, {
        key: "isRenderHeaderEmptyCell",
        get: function() {
            return this.isVerticalGrouping || !!this.renderConfig.isRenderTimePanel
        }
    }, {
        key: "isWorkSpaceWithOddCells",
        get: function() {
            return false
        }
    }, {
        key: "classes",
        get: function() {
            var _combineClasses;
            var _this$props4 = this.props,
                allDayPanelExpanded = _this$props4.allDayPanelExpanded,
                groups = _this$props4.groups,
                intervalCount = _this$props4.intervalCount,
                scrolling = _this$props4.scrolling;
            return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, this.renderConfig.className, true), _defineProperty(_combineClasses, "dx-scheduler-work-space-count", intervalCount > 1), _defineProperty(_combineClasses, "dx-scheduler-work-space-odd-cells", !!this.isWorkSpaceWithOddCells), _defineProperty(_combineClasses, "dx-scheduler-work-space-all-day-collapsed", !allDayPanelExpanded && this.isAllDayPanelVisible), _defineProperty(_combineClasses, "dx-scheduler-work-space-all-day", this.isAllDayPanelVisible), _defineProperty(_combineClasses, "dx-scheduler-work-space-group-by-date", this.isGroupedByDate), _defineProperty(_combineClasses, "dx-scheduler-work-space-grouped", groups.length > 0), _defineProperty(_combineClasses, "dx-scheduler-work-space-vertical-grouped", this.isVerticalGrouping && "vertical" !== this.renderConfig.defaultGroupOrientation), _defineProperty(_combineClasses, "dx-scheduler-work-space-horizontal-grouped", (0, _utils2.isHorizontalGroupingApplied)(groups, this.groupOrientation) && "vertical" === this.renderConfig.defaultGroupOrientation), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-one", this.isVerticalGrouping && 1 === groups.length), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-two", this.isVerticalGrouping && 2 === groups.length), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-three", this.isVerticalGrouping && 3 === groups.length), _defineProperty(_combineClasses, "dx-scheduler-work-space-both-scrollbar", this.props.crossScrollingEnabled), _defineProperty(_combineClasses, "dx-scheduler-work-space-virtual", "virtual" === scrolling.mode), _defineProperty(_combineClasses, "dx-scheduler-work-space", true), _combineClasses))
        }
    }, {
        key: "isStandaloneAllDayPanel",
        get: function() {
            var groups = this.props.groups;
            return !(0, _utils2.isVerticalGroupingApplied)(groups, this.groupOrientation) && this.isAllDayPanelVisible
        }
    }, {
        key: "isCalculateTablesWidth",
        get: function() {
            return this.props.crossScrollingEnabled && "vertical" !== this.renderConfig.defaultGroupOrientation
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props5 = this.props,
                restProps = (_this$props5.accessKey, _this$props5.activeStateEnabled, _this$props5.allDayAppointments, _this$props5.allDayPanelExpanded, _this$props5.allDayPanelMode, _this$props5.allowMultipleCellSelection, _this$props5.appointmentCollectorTemplate, _this$props5.appointmentTemplate, _this$props5.appointments, _this$props5.cellDuration, _this$props5.className, _this$props5.crossScrollingEnabled, _this$props5.currentDate, _this$props5.dataCellTemplate, _this$props5.dateCellTemplate, _this$props5.disabled, _this$props5.endDayHour, _this$props5.firstDayOfWeek, _this$props5.focusStateEnabled, _this$props5.groupByDate, _this$props5.groupOrientation, _this$props5.groups, _this$props5.height, _this$props5.hint, _this$props5.hoursInterval, _this$props5.hoverStateEnabled, _this$props5.indicatorTime, _this$props5.indicatorUpdateInterval, _this$props5.intervalCount, _this$props5.maxAppointmentsPerCell, _this$props5.onClick, _this$props5.onKeyDown, _this$props5.onViewRendered, _this$props5.resourceCellTemplate, _this$props5.rtlEnabled, _this$props5.schedulerHeight, _this$props5.schedulerWidth, _this$props5.scrolling, _this$props5.selectedCellData, _this$props5.shadeUntilCurrentTime, _this$props5.showAllDayPanel, _this$props5.showCurrentTimeIndicator, _this$props5.startDate, _this$props5.startDayHour, _this$props5.startViewDate, _this$props5.tabIndex, _this$props5.timeCellTemplate, _this$props5.type, _this$props5.visible, _this$props5.width, _objectWithoutProperties(_this$props5, _excluded));
            return restProps
        }
    }]);
    return WorkSpace
}(_inferno2.InfernoComponent);
exports.WorkSpace = WorkSpace;
WorkSpace.defaultProps = _props.WorkSpaceProps;
