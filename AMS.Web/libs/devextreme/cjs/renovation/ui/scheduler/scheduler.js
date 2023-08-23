/**
 * DevExtreme (cjs/renovation/ui/scheduler/scheduler.js)
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
exports.viewFunction = exports.Scheduler = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _props = require("./props");
var _widget = require("../common/widget");
var _data_source = _interopRequireDefault(require("../../../data/data_source"));
var _views = require("./model/views");
var _work_space = require("./workspaces/base/work_space");
var _header = require("./header/header");
var _utils = require("../../../ui/scheduler/workspaces/view_model/utils");
var _common = require("./common");
var _createTimeZoneCalculator = require("./timeZoneCalculator/createTimeZoneCalculator");
var _utils2 = require("../../../ui/scheduler/resources/utils");
var _appointments = require("./view_model/appointments/appointments");
var _appointments2 = require("./model/appointments");
var _appointment_tooltip = require("./appointment/tooltip/appointment_tooltip");
var _work_space_config = require("./workspaces/base/work_space_config");
var _data = require("./utils/data");
var _local = require("./utils/filtering/local");
var _remote = _interopRequireDefault(require("./utils/filtering/remote"));
var _layout = require("./appointment/reduced_icon_tooltip/layout");
var _appointments_context_provider = require("./appointments_context_provider");
var _combine_classes = require("../../utils/combine_classes");
var _layout2 = require("./appointment_edit_form/layout");
var _popup_config = require("./appointment_edit_form/popup_config");
var _form_context_provider = require("./form_context_provider");
var _formData = require("./utils/editing/formData");
var _excluded = ["accessKey", "activeStateEnabled", "adaptivityEnabled", "allDayExpr", "allDayPanelMode", "appointmentCollectorTemplate", "appointmentDragging", "appointmentTemplate", "appointmentTooltipTemplate", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "currentDateChange", "currentView", "currentViewChange", "customizeDateNavigatorText", "dataCellTemplate", "dataSource", "dateCellTemplate", "dateSerializationFormat", "defaultCurrentDate", "defaultCurrentView", "descriptionExpr", "disabled", "editing", "endDateExpr", "endDateTimeZoneExpr", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groups", "height", "hint", "hoverStateEnabled", "indicatorUpdateInterval", "max", "maxAppointmentsPerCell", "min", "noDataText", "onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onClick", "onKeyDown", "recurrenceEditMode", "recurrenceExceptionExpr", "recurrenceRuleExpr", "remoteFiltering", "resourceCellTemplate", "resources", "rtlEnabled", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDateExpr", "startDateTimeZoneExpr", "startDayHour", "tabIndex", "textExpr", "timeCellTemplate", "timeZone", "toolbar", "useDropDownViewSwitcher", "views", "visible", "width"];

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
    var appointmentEditFormVisible = _ref.appointmentEditFormVisible,
        appointmentFormData = _ref.appointmentFormData,
        appointmentPopupSize = _ref.appointmentPopupSize,
        appointmentsContextValue = _ref.appointmentsContextValue,
        changeAppointmentEditFormVisible = _ref.changeAppointmentEditFormVisible,
        changeTooltipVisible = _ref.changeTooltipVisible,
        classes = _ref.classes,
        currentViewConfig = _ref.currentViewConfig,
        dataAccessors = _ref.dataAccessors,
        formContextValue = _ref.formContextValue,
        loadedResources = _ref.loadedResources,
        needCreateAppointmentEditForm = _ref.needCreateAppointmentEditForm,
        onViewRendered = _ref.onViewRendered,
        _ref$props = _ref.props,
        accessKey = _ref$props.accessKey,
        activeStateEnabled = _ref$props.activeStateEnabled,
        className = _ref$props.className,
        currentView = _ref$props.currentView,
        customizeDateNavigatorText = _ref$props.customizeDateNavigatorText,
        disabled = _ref$props.disabled,
        _ref$props$editing = _ref$props.editing,
        allowTimeZoneEditing = _ref$props$editing.allowTimeZoneEditing,
        allowUpdating = _ref$props$editing.allowUpdating,
        focusStateEnabled = _ref$props.focusStateEnabled,
        height = _ref$props.height,
        hint = _ref$props.hint,
        hoverStateEnabled = _ref$props.hoverStateEnabled,
        max = _ref$props.max,
        min = _ref$props.min,
        rtlEnabled = _ref$props.rtlEnabled,
        tabIndex = _ref$props.tabIndex,
        toolbarItems = _ref$props.toolbar,
        useDropDownViewSwitcher = _ref$props.useDropDownViewSwitcher,
        views = _ref$props.views,
        visible = _ref$props.visible,
        width = _ref$props.width,
        reducedIconEndDate = _ref.reducedIconEndDate,
        reducedIconTarget = _ref.reducedIconTarget,
        reducedIconTooltipVisible = _ref.reducedIconTooltipVisible,
        restAttributes = _ref.restAttributes,
        setCurrentDate = _ref.setCurrentDate,
        setCurrentView = _ref.setCurrentView,
        startViewDate = _ref.startViewDate,
        tooltipData = _ref.tooltipData,
        tooltipTarget = _ref.tooltipTarget,
        tooltipVisible = _ref.tooltipVisible,
        workSpaceKey = _ref.workSpaceKey;
    var allDayPanelExpanded = currentViewConfig.allDayPanelExpanded,
        allowMultipleCellSelection = currentViewConfig.allowMultipleCellSelection,
        cellDuration = currentViewConfig.cellDuration,
        crossScrollingEnabled = currentViewConfig.crossScrollingEnabled,
        currentDate = currentViewConfig.currentDate,
        dataCellTemplate = currentViewConfig.dataCellTemplate,
        dateCellTemplate = currentViewConfig.dateCellTemplate,
        endDayHour = currentViewConfig.endDayHour,
        firstDayOfWeek = currentViewConfig.firstDayOfWeek,
        groupByDate = currentViewConfig.groupByDate,
        groupOrientation = currentViewConfig.groupOrientation,
        hoursInterval = currentViewConfig.hoursInterval,
        indicatorUpdateInterval = currentViewConfig.indicatorUpdateInterval,
        intervalCount = currentViewConfig.intervalCount,
        resourceCellTemplate = currentViewConfig.resourceCellTemplate,
        scrolling = currentViewConfig.scrolling,
        shadeUntilCurrentTime = currentViewConfig.shadeUntilCurrentTime,
        showAllDayPanel = currentViewConfig.showAllDayPanel,
        showCurrentTimeIndicator = currentViewConfig.showCurrentTimeIndicator,
        startDate = currentViewConfig.startDate,
        startDayHour = currentViewConfig.startDayHour,
        timeCellTemplate = currentViewConfig.timeCellTemplate,
        type = currentViewConfig.type;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
        classes: classes,
        accessKey: accessKey,
        activeStateEnabled: activeStateEnabled,
        disabled: disabled,
        focusStateEnabled: focusStateEnabled,
        height: height,
        hint: hint,
        hoverStateEnabled: hoverStateEnabled,
        rtlEnabled: rtlEnabled,
        tabIndex: tabIndex,
        visible: visible,
        width: width,
        className: className
    }, restAttributes, {
        children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-container", [0 !== toolbarItems.length && (0, _inferno.createComponentVNode)(2, _header.SchedulerToolbar, {
            items: toolbarItems,
            views: views,
            currentView: currentView,
            onCurrentViewUpdate: setCurrentView,
            currentDate: currentDate,
            onCurrentDateUpdate: setCurrentDate,
            startViewDate: startViewDate,
            min: min,
            max: max,
            intervalCount: intervalCount,
            firstDayOfWeek: firstDayOfWeek,
            useDropDownViewSwitcher: useDropDownViewSwitcher,
            customizationFunction: customizeDateNavigatorText,
            viewType: type
        }), (0, _inferno.createComponentVNode)(2, _appointments_context_provider.AppointmentsContextProvider, {
            appointmentsContextValue: appointmentsContextValue,
            children: (0, _inferno.createComponentVNode)(2, _work_space.WorkSpace, {
                firstDayOfWeek: firstDayOfWeek,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                cellDuration: cellDuration,
                groupByDate: groupByDate,
                scrolling: scrolling,
                currentDate: currentDate,
                intervalCount: intervalCount,
                groupOrientation: groupOrientation,
                startDate: startDate,
                startViewDate: startViewDate,
                showAllDayPanel: showAllDayPanel,
                showCurrentTimeIndicator: showCurrentTimeIndicator,
                indicatorUpdateInterval: indicatorUpdateInterval,
                shadeUntilCurrentTime: shadeUntilCurrentTime,
                crossScrollingEnabled: crossScrollingEnabled,
                hoursInterval: hoursInterval,
                groups: loadedResources,
                type: type,
                schedulerHeight: height,
                schedulerWidth: width,
                allowMultipleCellSelection: allowMultipleCellSelection,
                allDayPanelExpanded: allDayPanelExpanded,
                onViewRendered: onViewRendered,
                dataCellTemplate: dataCellTemplate,
                timeCellTemplate: timeCellTemplate,
                dateCellTemplate: dateCellTemplate,
                resourceCellTemplate: resourceCellTemplate
            }, workSpaceKey)
        }), (0, _inferno.createComponentVNode)(2, _appointment_tooltip.AppointmentTooltip, {
            visible: tooltipVisible,
            onVisibleChange: changeTooltipVisible,
            target: tooltipTarget,
            dataList: tooltipData
        }), (0, _inferno.createComponentVNode)(2, _layout.ReducedIconTooltip, {
            visible: reducedIconTooltipVisible,
            endDate: reducedIconEndDate,
            target: reducedIconTarget
        }), needCreateAppointmentEditForm && (0, _inferno.createComponentVNode)(2, _form_context_provider.FormContextProvider, {
            formContextValue: formContextValue,
            children: (0, _inferno.createComponentVNode)(2, _layout2.AppointmentEditForm, {
                visible: appointmentEditFormVisible,
                fullScreen: appointmentPopupSize.fullScreen,
                maxWidth: appointmentPopupSize.maxWidth,
                dataAccessors: dataAccessors,
                appointmentData: appointmentFormData,
                allowUpdating: allowUpdating,
                firstDayOfWeek: firstDayOfWeek,
                onVisibleChange: changeAppointmentEditFormVisible,
                allowTimeZoneEditing: allowTimeZoneEditing
            })
        })], 0)
    })))
};
exports.viewFunction = viewFunction;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var Scheduler = function(_InfernoWrapperCompon) {
    _inheritsLoose(Scheduler, _InfernoWrapperCompon);

    function Scheduler(props) {
        var _this;
        _this = _InfernoWrapperCompon.call(this, props) || this;
        _this.__getterCache = {};
        _this.state = {
            workSpaceViewModel: void 0,
            resourcePromisesMap: new Map,
            loadedResources: void 0,
            dataItems: [],
            tooltipTarget: void 0,
            tooltipVisible: false,
            appointmentEditFormVisible: false,
            appointmentPopupSize: void 0,
            appointmentFocus: {
                type: "regular",
                index: -1
            },
            needCreateAppointmentEditForm: false,
            tooltipData: [],
            appointmentFormData: void 0,
            lastViewDateByEndDayHour: void 0,
            reducedIconTooltipVisible: false,
            reducedIconEndDate: void 0,
            reducedIconTarget: void 0,
            formContextValue: void 0,
            currentDate: void 0 !== _this.props.currentDate ? _this.props.currentDate : _this.props.defaultCurrentDate,
            currentView: void 0 !== _this.props.currentView ? _this.props.currentView : _this.props.defaultCurrentView
        };
        _this.addAppointment = _this.addAppointment.bind(_assertThisInitialized(_this));
        _this.deleteAppointment = _this.deleteAppointment.bind(_assertThisInitialized(_this));
        _this.updateAppointment = _this.updateAppointment.bind(_assertThisInitialized(_this));
        _this.getDataSource = _this.getDataSource.bind(_assertThisInitialized(_this));
        _this.getEndViewDate = _this.getEndViewDate.bind(_assertThisInitialized(_this));
        _this.getStartViewDate = _this.getStartViewDate.bind(_assertThisInitialized(_this));
        _this.hideAppointmentPopup = _this.hideAppointmentPopup.bind(_assertThisInitialized(_this));
        _this.hideAppointmentTooltip = _this.hideAppointmentTooltip.bind(_assertThisInitialized(_this));
        _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
        _this.scrollToTime = _this.scrollToTime.bind(_assertThisInitialized(_this));
        _this.showAppointmentPopup = _this.showAppointmentPopup.bind(_assertThisInitialized(_this));
        _this.showAppointmentTooltip = _this.showAppointmentTooltip.bind(_assertThisInitialized(_this));
        _this.loadGroupResources = _this.loadGroupResources.bind(_assertThisInitialized(_this));
        _this.loadDataSource = _this.loadDataSource.bind(_assertThisInitialized(_this));
        _this.onViewRendered = _this.onViewRendered.bind(_assertThisInitialized(_this));
        _this.setCurrentView = _this.setCurrentView.bind(_assertThisInitialized(_this));
        _this.setCurrentDate = _this.setCurrentDate.bind(_assertThisInitialized(_this));
        _this.showTooltip = _this.showTooltip.bind(_assertThisInitialized(_this));
        _this.showAppointmentPopupForm = _this.showAppointmentPopupForm.bind(_assertThisInitialized(_this));
        _this.hideTooltip = _this.hideTooltip.bind(_assertThisInitialized(_this));
        _this.changeTooltipVisible = _this.changeTooltipVisible.bind(_assertThisInitialized(_this));
        _this.changeAppointmentEditFormVisible = _this.changeAppointmentEditFormVisible.bind(_assertThisInitialized(_this));
        _this.showReducedIconTooltip = _this.showReducedIconTooltip.bind(_assertThisInitialized(_this));
        _this.hideReducedIconTooltip = _this.hideReducedIconTooltip.bind(_assertThisInitialized(_this));
        _this.updateAppointmentFocus = _this.updateAppointmentFocus.bind(_assertThisInitialized(_this));
        _this.updateFocusedAppointment = _this.updateFocusedAppointment.bind(_assertThisInitialized(_this));
        return _this
    }
    var _proto = Scheduler.prototype;
    _proto.createEffects = function() {
        return [new _inferno2.InfernoEffect(this.loadGroupResources, [this.props.groups, this.state.currentView, this.props.currentView, this.props.views, this.props.resources, this.state.resourcePromisesMap]), new _inferno2.InfernoEffect(this.loadDataSource, [this.props.dataSource, this.props.remoteFiltering, this.state.lastViewDateByEndDayHour, this.props.startDateExpr, this.props.endDateExpr, this.props.startDateTimeZoneExpr, this.props.endDateTimeZoneExpr, this.props.allDayExpr, this.props.textExpr, this.props.descriptionExpr, this.props.recurrenceRuleExpr, this.props.recurrenceExceptionExpr, this.props.resources, this.props.allDayPanelMode, this.props.appointmentCollectorTemplate, this.props.appointmentTemplate, this.props.appointmentTooltipTemplate, this.props.cellDuration, this.props.crossScrollingEnabled, this.state.currentDate, this.props.currentDate, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.height, this.props.indicatorUpdateInterval, this.props.maxAppointmentsPerCell, this.props.resourceCellTemplate, this.props.scrolling, this.props.shadeUntilCurrentTime, this.props.showAllDayPanel, this.props.showCurrentTimeIndicator, this.props.startDayHour, this.props.timeCellTemplate, this.props.width, this.state.currentView, this.props.currentView, this.props.views, this.props.dateSerializationFormat]), (0, _inferno2.createReRenderEffect)()]
    };
    _proto.updateEffects = function() {
        var _this$_effects$, _this$_effects$2;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props.groups, this.state.currentView, this.props.currentView, this.props.views, this.props.resources, this.state.resourcePromisesMap]);
        null === (_this$_effects$2 = this._effects[1]) || void 0 === _this$_effects$2 ? void 0 : _this$_effects$2.update([this.props.dataSource, this.props.remoteFiltering, this.state.lastViewDateByEndDayHour, this.props.startDateExpr, this.props.endDateExpr, this.props.startDateTimeZoneExpr, this.props.endDateTimeZoneExpr, this.props.allDayExpr, this.props.textExpr, this.props.descriptionExpr, this.props.recurrenceRuleExpr, this.props.recurrenceExceptionExpr, this.props.resources, this.props.allDayPanelMode, this.props.appointmentCollectorTemplate, this.props.appointmentTemplate, this.props.appointmentTooltipTemplate, this.props.cellDuration, this.props.crossScrollingEnabled, this.state.currentDate, this.props.currentDate, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.height, this.props.indicatorUpdateInterval, this.props.maxAppointmentsPerCell, this.props.resourceCellTemplate, this.props.scrolling, this.props.shadeUntilCurrentTime, this.props.showAllDayPanel, this.props.showCurrentTimeIndicator, this.props.startDayHour, this.props.timeCellTemplate, this.props.width, this.state.currentView, this.props.currentView, this.props.views, this.props.dateSerializationFormat])
    };
    _proto.loadGroupResources = function() {
        var _this2 = this;
        (0, _utils2.loadResources)(this.mergedGroups, this.props.resources, this.state.resourcePromisesMap).then((function(loadedResources) {
            _this2.setState((function(__state_argument) {
                return {
                    loadedResources: loadedResources
                }
            }))
        }))
    };
    _proto.loadDataSource = function() {
        var _this3 = this;
        if (!this.internalDataSource.isLoaded() && !this.internalDataSource.isLoading()) {
            if (this.props.remoteFiltering && this.state.lastViewDateByEndDayHour) {
                var combinedFilter = (0, _remote.default)({
                    dataAccessors: this.dataAccessors,
                    dataSourceFilter: this.internalDataSource.filter(),
                    min: this.startViewDate,
                    max: this.state.lastViewDateByEndDayHour,
                    dateSerializationFormat: this.props.dateSerializationFormat
                });
                this.internalDataSource.filter(combinedFilter)
            }
            this.internalDataSource.load().done((function(loadOptions) {
                _this3.setState((function(__state_argument) {
                    return {
                        dataItems: (0, _data.resolveDataItems)(loadOptions)
                    }
                }))
            }))
        }
    };
    _proto.onViewRendered = function(viewMetaData) {
        var _this$state$lastViewD;
        this.setState((function(__state_argument) {
            return {
                workSpaceViewModel: viewMetaData
            }
        }));
        var viewDataProvider = viewMetaData.viewDataProvider;
        var lastViewDate = viewDataProvider.getLastViewDateByEndDayHour(this.currentViewConfig.endDayHour);
        if (lastViewDate.getTime() !== (null === (_this$state$lastViewD = this.state.lastViewDateByEndDayHour) || void 0 === _this$state$lastViewD ? void 0 : _this$state$lastViewD.getTime())) {
            this.setState((function(__state_argument) {
                return {
                    lastViewDateByEndDayHour: lastViewDate
                }
            }))
        }
    };
    _proto.setCurrentView = function(view) {
        var __newValue;
        this.setState((function(__state_argument) {
            __newValue = view;
            return {
                currentView: __newValue
            }
        }));
        this.props.currentViewChange(__newValue)
    };
    _proto.setCurrentDate = function(date) {
        var __newValue;
        this.setState((function(__state_argument) {
            __newValue = date;
            return {
                currentDate: __newValue
            }
        }));
        this.props.currentDateChange(__newValue)
    };
    _proto.showTooltip = function(e) {
        this.setState((function(__state_argument) {
            return {
                tooltipData: e.data
            }
        }));
        this.setState((function(__state_argument) {
            return {
                tooltipTarget: e.target
            }
        }));
        this.changeTooltipVisible(true)
    };
    _proto.showAppointmentPopupForm = function(_ref2) {
        var data = _ref2.data;
        var appointmentData = data[0];
        this.setState((function(__state_argument) {
            return {
                appointmentFormData: appointmentData.appointment
            }
        }));
        this.setState((function(__state_argument) {
            return {
                formContextValue: {
                    formData: (0, _formData.createFormData)(appointmentData.appointment)
                }
            }
        }));
        var isRecurrent = appointmentData.info.isRecurrent;
        this.setState((function(__state_argument) {
            return {
                appointmentPopupSize: (0, _popup_config.getPopupSize)(isRecurrent)
            }
        }));
        this.setState((function(__state_argument) {
            return {
                needCreateAppointmentEditForm: true
            }
        }));
        this.hideTooltip();
        this.changeAppointmentEditFormVisible(true)
    };
    _proto.hideTooltip = function() {
        this.changeTooltipVisible(false)
    };
    _proto.changeTooltipVisible = function(value) {
        this.setState((function(__state_argument) {
            return {
                tooltipVisible: value
            }
        }))
    };
    _proto.changeAppointmentEditFormVisible = function(value) {
        this.setState((function(__state_argument) {
            return {
                appointmentEditFormVisible: value
            }
        }))
    };
    _proto.showReducedIconTooltip = function(data) {
        this.setState((function(__state_argument) {
            return {
                reducedIconTarget: data.target
            }
        }));
        this.setState((function(__state_argument) {
            return {
                reducedIconEndDate: data.endDate
            }
        }));
        this.setState((function(__state_argument) {
            return {
                reducedIconTooltipVisible: true
            }
        }))
    };
    _proto.hideReducedIconTooltip = function() {
        this.setState((function(__state_argument) {
            return {
                reducedIconTooltipVisible: false
            }
        }))
    };
    _proto.updateAppointmentFocus = function(type, index) {
        this.state.appointmentFocus.type = type;
        this.state.appointmentFocus.index = index
    };
    _proto.updateFocusedAppointment = function(type, index) {
        var _this$state$appointme = this.state.appointmentFocus,
            prevFocusedIndex = _this$state$appointme.index,
            prevFocusedType = _this$state$appointme.type;
        if (prevFocusedIndex >= 0) {
            var prevViewModels = this.appointmentsViewModel[prevFocusedType];
            var prevViewModel = prevViewModels[prevFocusedIndex];
            prevViewModels[prevFocusedIndex] = _extends({}, prevViewModel, {
                focused: false
            })
        }
        this.updateAppointmentFocus(type, index);
        var viewModels = this.appointmentsViewModel[type];
        viewModels[index] = _extends({}, viewModels[index], {
            focused: true
        })
    };
    _proto.addAppointment = function(_appointment) {};
    _proto.deleteAppointment = function(_appointment) {};
    _proto.updateAppointment = function(_target, _appointment) {};
    _proto.getDataSource = function() {
        return this.internalDataSource
    };
    _proto.getEndViewDate = function() {
        return this.state.workSpaceViewModel.viewDataProvider.getLastCellEndDate()
    };
    _proto.getStartViewDate = function() {
        return this.startViewDate
    };
    _proto.hideAppointmentPopup = function(_saveChanges) {};
    _proto.hideAppointmentTooltip = function() {
        this.hideTooltip()
    };
    _proto.scrollTo = function(_date, _group, _allDay) {};
    _proto.scrollToTime = function(_hours, _minutes, _date) {};
    _proto.showAppointmentPopup = function(_appointmentData, _createNewAppointment, _currentAppointmentData) {};
    _proto.showAppointmentTooltip = function(_appointmentData, _target, _currentAppointmentData) {};
    _proto.componentWillUpdate = function(nextProps, nextState, context) {
        _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
        if (this.props.allDayPanelMode !== nextProps.allDayPanelMode || this.props.appointmentCollectorTemplate !== nextProps.appointmentCollectorTemplate || this.props.appointmentTemplate !== nextProps.appointmentTemplate || this.props.appointmentTooltipTemplate !== nextProps.appointmentTooltipTemplate || this.props.cellDuration !== nextProps.cellDuration || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.dataCellTemplate !== nextProps.dataCellTemplate || this.props.dateCellTemplate !== nextProps.dateCellTemplate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.height !== nextProps.height || this.props.indicatorUpdateInterval !== nextProps.indicatorUpdateInterval || this.props.maxAppointmentsPerCell !== nextProps.maxAppointmentsPerCell || this.props.resourceCellTemplate !== nextProps.resourceCellTemplate || this.props.scrolling !== nextProps.scrolling || this.props.shadeUntilCurrentTime !== nextProps.shadeUntilCurrentTime || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.props.showCurrentTimeIndicator !== nextProps.showCurrentTimeIndicator || this.props.startDayHour !== nextProps.startDayHour || this.props.timeCellTemplate !== nextProps.timeCellTemplate || this.props.width !== nextProps.width || this.state.currentDate !== nextState.currentDate || this.props.currentDate !== nextProps.currentDate || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView) {
            this.__getterCache.currentViewConfig = void 0
        }
        if (this.props.startDateExpr !== nextProps.startDateExpr || this.props.endDateExpr !== nextProps.endDateExpr || this.props.startDateTimeZoneExpr !== nextProps.startDateTimeZoneExpr || this.props.endDateTimeZoneExpr !== nextProps.endDateTimeZoneExpr || this.props.allDayExpr !== nextProps.allDayExpr || this.props.textExpr !== nextProps.textExpr || this.props.descriptionExpr !== nextProps.descriptionExpr || this.props.recurrenceRuleExpr !== nextProps.recurrenceRuleExpr || this.props.recurrenceExceptionExpr !== nextProps.recurrenceExceptionExpr || this.props.resources !== nextProps.resources) {
            this.__getterCache.dataAccessors = void 0
        }
        if (this.props.allDayPanelMode !== nextProps.allDayPanelMode || this.props.appointmentCollectorTemplate !== nextProps.appointmentCollectorTemplate || this.props.appointmentTemplate !== nextProps.appointmentTemplate || this.props.appointmentTooltipTemplate !== nextProps.appointmentTooltipTemplate || this.props.cellDuration !== nextProps.cellDuration || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.dataCellTemplate !== nextProps.dataCellTemplate || this.props.dateCellTemplate !== nextProps.dateCellTemplate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.height !== nextProps.height || this.props.indicatorUpdateInterval !== nextProps.indicatorUpdateInterval || this.props.maxAppointmentsPerCell !== nextProps.maxAppointmentsPerCell || this.props.resourceCellTemplate !== nextProps.resourceCellTemplate || this.props.scrolling !== nextProps.scrolling || this.props.shadeUntilCurrentTime !== nextProps.shadeUntilCurrentTime || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.props.showCurrentTimeIndicator !== nextProps.showCurrentTimeIndicator || this.props.startDayHour !== nextProps.startDayHour || this.props.timeCellTemplate !== nextProps.timeCellTemplate || this.props.width !== nextProps.width || this.state.currentDate !== nextState.currentDate || this.props.currentDate !== nextProps.currentDate || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView) {
            this.__getterCache.startViewDate = void 0
        }
        if (this.props.timeZone !== nextProps.timeZone) {
            this.__getterCache.timeZoneCalculator = void 0
        }
        if (this.props.allDayPanelMode !== nextProps.allDayPanelMode || this.props.appointmentCollectorTemplate !== nextProps.appointmentCollectorTemplate || this.props.appointmentTemplate !== nextProps.appointmentTemplate || this.props.appointmentTooltipTemplate !== nextProps.appointmentTooltipTemplate || this.props.cellDuration !== nextProps.cellDuration || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.dataCellTemplate !== nextProps.dataCellTemplate || this.props.dateCellTemplate !== nextProps.dateCellTemplate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.height !== nextProps.height || this.props.indicatorUpdateInterval !== nextProps.indicatorUpdateInterval || this.props.maxAppointmentsPerCell !== nextProps.maxAppointmentsPerCell || this.props.resourceCellTemplate !== nextProps.resourceCellTemplate || this.props.scrolling !== nextProps.scrolling || this.props.shadeUntilCurrentTime !== nextProps.shadeUntilCurrentTime || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.props.showCurrentTimeIndicator !== nextProps.showCurrentTimeIndicator || this.props.startDayHour !== nextProps.startDayHour || this.props.timeCellTemplate !== nextProps.timeCellTemplate || this.props.width !== nextProps.width || this.state.currentDate !== nextState.currentDate || this.props.currentDate !== nextProps.currentDate || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView || this.state.workSpaceViewModel !== nextState.workSpaceViewModel || this.state.loadedResources !== nextState.loadedResources || this.props.adaptivityEnabled !== nextProps.adaptivityEnabled || this.props.rtlEnabled !== nextProps.rtlEnabled || this.props.resources !== nextProps.resources || this.props.timeZone !== nextProps.timeZone || this.props.groups !== nextProps.groups) {
            this.__getterCache.appointmentsConfig = void 0
        }
        if (this.state.dataItems !== nextState.dataItems || this.props.startDateExpr !== nextProps.startDateExpr || this.props.endDateExpr !== nextProps.endDateExpr || this.props.startDateTimeZoneExpr !== nextProps.startDateTimeZoneExpr || this.props.endDateTimeZoneExpr !== nextProps.endDateTimeZoneExpr || this.props.allDayExpr !== nextProps.allDayExpr || this.props.textExpr !== nextProps.textExpr || this.props.descriptionExpr !== nextProps.descriptionExpr || this.props.recurrenceRuleExpr !== nextProps.recurrenceRuleExpr || this.props.recurrenceExceptionExpr !== nextProps.recurrenceExceptionExpr || this.props.resources !== nextProps.resources || this.props.allDayPanelMode !== nextProps.allDayPanelMode || this.props.appointmentCollectorTemplate !== nextProps.appointmentCollectorTemplate || this.props.appointmentTemplate !== nextProps.appointmentTemplate || this.props.appointmentTooltipTemplate !== nextProps.appointmentTooltipTemplate || this.props.cellDuration !== nextProps.cellDuration || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.dataCellTemplate !== nextProps.dataCellTemplate || this.props.dateCellTemplate !== nextProps.dateCellTemplate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.height !== nextProps.height || this.props.indicatorUpdateInterval !== nextProps.indicatorUpdateInterval || this.props.maxAppointmentsPerCell !== nextProps.maxAppointmentsPerCell || this.props.resourceCellTemplate !== nextProps.resourceCellTemplate || this.props.scrolling !== nextProps.scrolling || this.props.shadeUntilCurrentTime !== nextProps.shadeUntilCurrentTime || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.props.showCurrentTimeIndicator !== nextProps.showCurrentTimeIndicator || this.props.startDayHour !== nextProps.startDayHour || this.props.timeCellTemplate !== nextProps.timeCellTemplate || this.props.width !== nextProps.width || this.state.currentDate !== nextState.currentDate || this.props.currentDate !== nextProps.currentDate || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView || this.props.timeZone !== nextProps.timeZone) {
            this.__getterCache.preparedDataItems = void 0
        }
        if (this.props.allDayPanelMode !== nextProps.allDayPanelMode || this.props.appointmentCollectorTemplate !== nextProps.appointmentCollectorTemplate || this.props.appointmentTemplate !== nextProps.appointmentTemplate || this.props.appointmentTooltipTemplate !== nextProps.appointmentTooltipTemplate || this.props.cellDuration !== nextProps.cellDuration || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.dataCellTemplate !== nextProps.dataCellTemplate || this.props.dateCellTemplate !== nextProps.dateCellTemplate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.height !== nextProps.height || this.props.indicatorUpdateInterval !== nextProps.indicatorUpdateInterval || this.props.maxAppointmentsPerCell !== nextProps.maxAppointmentsPerCell || this.props.resourceCellTemplate !== nextProps.resourceCellTemplate || this.props.scrolling !== nextProps.scrolling || this.props.shadeUntilCurrentTime !== nextProps.shadeUntilCurrentTime || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.props.showCurrentTimeIndicator !== nextProps.showCurrentTimeIndicator || this.props.startDayHour !== nextProps.startDayHour || this.props.timeCellTemplate !== nextProps.timeCellTemplate || this.props.width !== nextProps.width || this.state.currentDate !== nextState.currentDate || this.props.currentDate !== nextProps.currentDate || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView || this.state.workSpaceViewModel !== nextState.workSpaceViewModel || this.state.loadedResources !== nextState.loadedResources || this.props.adaptivityEnabled !== nextProps.adaptivityEnabled || this.props.rtlEnabled !== nextProps.rtlEnabled || this.props.resources !== nextProps.resources || this.props.timeZone !== nextProps.timeZone || this.props.groups !== nextProps.groups || this.props.startDateExpr !== nextProps.startDateExpr || this.props.endDateExpr !== nextProps.endDateExpr || this.props.startDateTimeZoneExpr !== nextProps.startDateTimeZoneExpr || this.props.endDateTimeZoneExpr !== nextProps.endDateTimeZoneExpr || this.props.allDayExpr !== nextProps.allDayExpr || this.props.textExpr !== nextProps.textExpr || this.props.descriptionExpr !== nextProps.descriptionExpr || this.props.recurrenceRuleExpr !== nextProps.recurrenceRuleExpr || this.props.recurrenceExceptionExpr !== nextProps.recurrenceExceptionExpr || this.state.dataItems !== nextState.dataItems) {
            this.__getterCache.filteredItems = void 0
        }
        if (this.props.allDayPanelMode !== nextProps.allDayPanelMode || this.props.appointmentCollectorTemplate !== nextProps.appointmentCollectorTemplate || this.props.appointmentTemplate !== nextProps.appointmentTemplate || this.props.appointmentTooltipTemplate !== nextProps.appointmentTooltipTemplate || this.props.cellDuration !== nextProps.cellDuration || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.dataCellTemplate !== nextProps.dataCellTemplate || this.props.dateCellTemplate !== nextProps.dateCellTemplate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.height !== nextProps.height || this.props.indicatorUpdateInterval !== nextProps.indicatorUpdateInterval || this.props.maxAppointmentsPerCell !== nextProps.maxAppointmentsPerCell || this.props.resourceCellTemplate !== nextProps.resourceCellTemplate || this.props.scrolling !== nextProps.scrolling || this.props.shadeUntilCurrentTime !== nextProps.shadeUntilCurrentTime || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.props.showCurrentTimeIndicator !== nextProps.showCurrentTimeIndicator || this.props.startDayHour !== nextProps.startDayHour || this.props.timeCellTemplate !== nextProps.timeCellTemplate || this.props.width !== nextProps.width || this.state.currentDate !== nextState.currentDate || this.props.currentDate !== nextProps.currentDate || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView || this.state.workSpaceViewModel !== nextState.workSpaceViewModel || this.state.loadedResources !== nextState.loadedResources || this.props.adaptivityEnabled !== nextProps.adaptivityEnabled || this.props.rtlEnabled !== nextProps.rtlEnabled || this.props.resources !== nextProps.resources || this.props.timeZone !== nextProps.timeZone || this.props.groups !== nextProps.groups || this.props.startDateExpr !== nextProps.startDateExpr || this.props.endDateExpr !== nextProps.endDateExpr || this.props.startDateTimeZoneExpr !== nextProps.startDateTimeZoneExpr || this.props.endDateTimeZoneExpr !== nextProps.endDateTimeZoneExpr || this.props.allDayExpr !== nextProps.allDayExpr || this.props.textExpr !== nextProps.textExpr || this.props.descriptionExpr !== nextProps.descriptionExpr || this.props.recurrenceRuleExpr !== nextProps.recurrenceRuleExpr || this.props.recurrenceExceptionExpr !== nextProps.recurrenceExceptionExpr || this.state.dataItems !== nextState.dataItems) {
            this.__getterCache.appointmentsViewModel = void 0
        }
        if (this.props.groups !== nextProps.groups || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView) {
            this.__getterCache.mergedGroups = void 0
        }
        if (this.props.allDayPanelMode !== nextProps.allDayPanelMode || this.props.appointmentCollectorTemplate !== nextProps.appointmentCollectorTemplate || this.props.appointmentTemplate !== nextProps.appointmentTemplate || this.props.appointmentTooltipTemplate !== nextProps.appointmentTooltipTemplate || this.props.cellDuration !== nextProps.cellDuration || this.props.crossScrollingEnabled !== nextProps.crossScrollingEnabled || this.props.dataCellTemplate !== nextProps.dataCellTemplate || this.props.dateCellTemplate !== nextProps.dateCellTemplate || this.props.endDayHour !== nextProps.endDayHour || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.groupByDate !== nextProps.groupByDate || this.props.height !== nextProps.height || this.props.indicatorUpdateInterval !== nextProps.indicatorUpdateInterval || this.props.maxAppointmentsPerCell !== nextProps.maxAppointmentsPerCell || this.props.resourceCellTemplate !== nextProps.resourceCellTemplate || this.props.scrolling !== nextProps.scrolling || this.props.shadeUntilCurrentTime !== nextProps.shadeUntilCurrentTime || this.props.showAllDayPanel !== nextProps.showAllDayPanel || this.props.showCurrentTimeIndicator !== nextProps.showCurrentTimeIndicator || this.props.startDayHour !== nextProps.startDayHour || this.props.timeCellTemplate !== nextProps.timeCellTemplate || this.props.width !== nextProps.width || this.state.currentDate !== nextState.currentDate || this.props.currentDate !== nextProps.currentDate || this.props.views !== nextProps.views || this.state.currentView !== nextState.currentView || this.props.currentView !== nextProps.currentView || this.state.workSpaceViewModel !== nextState.workSpaceViewModel || this.state.loadedResources !== nextState.loadedResources || this.props.adaptivityEnabled !== nextProps.adaptivityEnabled || this.props.rtlEnabled !== nextProps.rtlEnabled || this.props.resources !== nextProps.resources || this.props.timeZone !== nextProps.timeZone || this.props.groups !== nextProps.groups || this.props.startDateExpr !== nextProps.startDateExpr || this.props.endDateExpr !== nextProps.endDateExpr || this.props.startDateTimeZoneExpr !== nextProps.startDateTimeZoneExpr || this.props.endDateTimeZoneExpr !== nextProps.endDateTimeZoneExpr || this.props.allDayExpr !== nextProps.allDayExpr || this.props.textExpr !== nextProps.textExpr || this.props.descriptionExpr !== nextProps.descriptionExpr || this.props.recurrenceRuleExpr !== nextProps.recurrenceRuleExpr || this.props.recurrenceExceptionExpr !== nextProps.recurrenceExceptionExpr || this.state.dataItems !== nextState.dataItems || this.state.resourcePromisesMap !== nextState.resourcePromisesMap || this.state.appointmentFocus !== nextState.appointmentFocus) {
            this.__getterCache.appointmentsContextValue = void 0
        }
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                currentDate: void 0 !== this.props.currentDate ? this.props.currentDate : this.state.currentDate,
                currentView: void 0 !== this.props.currentView ? this.props.currentView : this.state.currentView,
                dataCellTemplate: getTemplate(props.dataCellTemplate),
                dateCellTemplate: getTemplate(props.dateCellTemplate),
                timeCellTemplate: getTemplate(props.timeCellTemplate),
                resourceCellTemplate: getTemplate(props.resourceCellTemplate),
                appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate),
                appointmentTemplate: getTemplate(props.appointmentTemplate),
                appointmentTooltipTemplate: getTemplate(props.appointmentTooltipTemplate)
            }),
            workSpaceViewModel: this.state.workSpaceViewModel,
            resourcePromisesMap: this.state.resourcePromisesMap,
            loadedResources: this.state.loadedResources,
            dataItems: this.state.dataItems,
            tooltipTarget: this.state.tooltipTarget,
            tooltipVisible: this.state.tooltipVisible,
            appointmentEditFormVisible: this.state.appointmentEditFormVisible,
            appointmentPopupSize: this.state.appointmentPopupSize,
            appointmentFocus: this.state.appointmentFocus,
            needCreateAppointmentEditForm: this.state.needCreateAppointmentEditForm,
            tooltipData: this.state.tooltipData,
            appointmentFormData: this.state.appointmentFormData,
            lastViewDateByEndDayHour: this.state.lastViewDateByEndDayHour,
            reducedIconTooltipVisible: this.state.reducedIconTooltipVisible,
            reducedIconEndDate: this.state.reducedIconEndDate,
            reducedIconTarget: this.state.reducedIconTarget,
            formContextValue: this.state.formContextValue,
            currentViewProps: this.currentViewProps,
            currentViewConfig: this.currentViewConfig,
            isValidViewDataProvider: this.isValidViewDataProvider,
            dataAccessors: this.dataAccessors,
            startViewDate: this.startViewDate,
            isVirtualScrolling: this.isVirtualScrolling,
            timeZoneCalculator: this.timeZoneCalculator,
            internalDataSource: this.internalDataSource,
            appointmentsConfig: this.appointmentsConfig,
            preparedDataItems: this.preparedDataItems,
            filteredItems: this.filteredItems,
            appointmentsViewModel: this.appointmentsViewModel,
            workSpaceKey: this.workSpaceKey,
            mergedGroups: this.mergedGroups,
            appointmentsContextValue: this.appointmentsContextValue,
            classes: this.classes,
            onViewRendered: this.onViewRendered,
            setCurrentView: this.setCurrentView,
            setCurrentDate: this.setCurrentDate,
            showTooltip: this.showTooltip,
            showAppointmentPopupForm: this.showAppointmentPopupForm,
            hideTooltip: this.hideTooltip,
            changeTooltipVisible: this.changeTooltipVisible,
            changeAppointmentEditFormVisible: this.changeAppointmentEditFormVisible,
            showReducedIconTooltip: this.showReducedIconTooltip,
            hideReducedIconTooltip: this.hideReducedIconTooltip,
            updateAppointmentFocus: this.updateAppointmentFocus,
            updateFocusedAppointment: this.updateFocusedAppointment,
            restAttributes: this.restAttributes
        })
    };
    _createClass(Scheduler, [{
        key: "currentViewProps",
        get: function() {
            var views = this.props.views;
            return (0, _views.getCurrentViewProps)(void 0 !== this.props.currentView ? this.props.currentView : this.state.currentView, views)
        }
    }, {
        key: "currentViewConfig",
        get: function() {
            var _this4 = this;
            if (void 0 !== this.__getterCache.currentViewConfig) {
                return this.__getterCache.currentViewConfig
            }
            return this.__getterCache.currentViewConfig = (_this4$props = _this4.props, allDayPanelMode = _this4$props.allDayPanelMode, appointmentCollectorTemplate = _this4$props.appointmentCollectorTemplate, appointmentTemplate = _this4$props.appointmentTemplate, appointmentTooltipTemplate = _this4$props.appointmentTooltipTemplate, cellDuration = _this4$props.cellDuration, crossScrollingEnabled = _this4$props.crossScrollingEnabled, dataCellTemplate = _this4$props.dataCellTemplate, dateCellTemplate = _this4$props.dateCellTemplate, endDayHour = _this4$props.endDayHour, firstDayOfWeek = _this4$props.firstDayOfWeek, groupByDate = _this4$props.groupByDate, height = _this4$props.height, indicatorUpdateInterval = _this4$props.indicatorUpdateInterval, maxAppointmentsPerCell = _this4$props.maxAppointmentsPerCell, resourceCellTemplate = _this4$props.resourceCellTemplate, scrolling = _this4$props.scrolling, shadeUntilCurrentTime = _this4$props.shadeUntilCurrentTime, showAllDayPanel = _this4$props.showAllDayPanel, showCurrentTimeIndicator = _this4$props.showCurrentTimeIndicator, startDayHour = _this4$props.startDayHour, timeCellTemplate = _this4$props.timeCellTemplate, width = _this4$props.width, (0, _views.getCurrentViewConfig)(_this4.currentViewProps, {
                firstDayOfWeek: firstDayOfWeek,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                cellDuration: cellDuration,
                groupByDate: groupByDate,
                scrolling: scrolling,
                dataCellTemplate: dataCellTemplate,
                timeCellTemplate: timeCellTemplate,
                resourceCellTemplate: resourceCellTemplate,
                dateCellTemplate: dateCellTemplate,
                appointmentTemplate: appointmentTemplate,
                appointmentCollectorTemplate: appointmentCollectorTemplate,
                appointmentTooltipTemplate: appointmentTooltipTemplate,
                maxAppointmentsPerCell: maxAppointmentsPerCell,
                showAllDayPanel: showAllDayPanel,
                showCurrentTimeIndicator: showCurrentTimeIndicator,
                indicatorUpdateInterval: indicatorUpdateInterval,
                shadeUntilCurrentTime: shadeUntilCurrentTime,
                crossScrollingEnabled: crossScrollingEnabled,
                height: height,
                width: width,
                allDayPanelMode: allDayPanelMode
            }, void 0 !== _this4.props.currentDate ? _this4.props.currentDate : _this4.state.currentDate));
            var _this4$props, allDayPanelMode, appointmentCollectorTemplate, appointmentTemplate, appointmentTooltipTemplate, cellDuration, crossScrollingEnabled, dataCellTemplate, dateCellTemplate, endDayHour, firstDayOfWeek, groupByDate, height, indicatorUpdateInterval, maxAppointmentsPerCell, resourceCellTemplate, scrolling, shadeUntilCurrentTime, showAllDayPanel, showCurrentTimeIndicator, startDayHour, timeCellTemplate, width
        }
    }, {
        key: "isValidViewDataProvider",
        get: function() {
            var _this$state$workSpace;
            var _this$currentViewConf = this.currentViewConfig,
                allDayPanelExpanded = _this$currentViewConf.allDayPanelExpanded,
                cellDuration = _this$currentViewConf.cellDuration,
                crossScrollingEnabled = _this$currentViewConf.crossScrollingEnabled,
                currentDate = _this$currentViewConf.currentDate,
                endDayHour = _this$currentViewConf.endDayHour,
                firstDayOfWeek = _this$currentViewConf.firstDayOfWeek,
                groupByDate = _this$currentViewConf.groupByDate,
                groupOrientation = _this$currentViewConf.groupOrientation,
                hoursInterval = _this$currentViewConf.hoursInterval,
                intervalCount = _this$currentViewConf.intervalCount,
                scrolling = _this$currentViewConf.scrolling,
                showAllDayPanel = _this$currentViewConf.showAllDayPanel,
                startDate = _this$currentViewConf.startDate,
                startDayHour = _this$currentViewConf.startDayHour,
                type = _this$currentViewConf.type;
            return (0, _common.isViewDataProviderConfigValid)(null === (_this$state$workSpace = this.state.workSpaceViewModel) || void 0 === _this$state$workSpace ? void 0 : _this$state$workSpace.viewDataProviderValidationOptions, {
                intervalCount: null !== intervalCount && void 0 !== intervalCount ? intervalCount : 1,
                currentDate: currentDate,
                type: type,
                hoursInterval: hoursInterval,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                groupOrientation: groupOrientation,
                groupByDate: groupByDate,
                crossScrollingEnabled: crossScrollingEnabled,
                firstDayOfWeek: firstDayOfWeek,
                startDate: startDate,
                showAllDayPanel: showAllDayPanel,
                allDayPanelExpanded: allDayPanelExpanded,
                scrolling: scrolling,
                cellDuration: cellDuration,
                groups: this.state.loadedResources
            })
        }
    }, {
        key: "dataAccessors",
        get: function() {
            var _this5 = this;
            if (void 0 !== this.__getterCache.dataAccessors) {
                return this.__getterCache.dataAccessors
            }
            return this.__getterCache.dataAccessors = (0, _common.createDataAccessors)({
                startDateExpr: _this5.props.startDateExpr,
                endDateExpr: _this5.props.endDateExpr,
                startDateTimeZoneExpr: _this5.props.startDateTimeZoneExpr,
                endDateTimeZoneExpr: _this5.props.endDateTimeZoneExpr,
                allDayExpr: _this5.props.allDayExpr,
                textExpr: _this5.props.textExpr,
                descriptionExpr: _this5.props.descriptionExpr,
                recurrenceRuleExpr: _this5.props.recurrenceRuleExpr,
                recurrenceExceptionExpr: _this5.props.recurrenceExceptionExpr,
                resources: _this5.props.resources
            })
        }
    }, {
        key: "startViewDate",
        get: function() {
            var _this6 = this;
            if (void 0 !== this.__getterCache.startViewDate) {
                return this.__getterCache.startViewDate
            }
            return this.__getterCache.startViewDate = (_this6$currentViewCon = _this6.currentViewConfig, currentDate = _this6$currentViewCon.currentDate, firstDayOfWeek = _this6$currentViewCon.firstDayOfWeek, intervalCount = _this6$currentViewCon.intervalCount, startDate = _this6$currentViewCon.startDate, startDayHour = _this6$currentViewCon.startDayHour, type = _this6$currentViewCon.type, options = {
                currentDate: currentDate,
                startDayHour: startDayHour,
                startDate: startDate,
                intervalCount: intervalCount,
                firstDayOfWeek: firstDayOfWeek
            }, viewDataGenerator = (0, _utils.getViewDataGeneratorByViewType)(type), startViewDate = viewDataGenerator.getStartViewDate(options), startViewDate);
            var _this6$currentViewCon, currentDate, firstDayOfWeek, intervalCount, startDate, startDayHour, type, options, viewDataGenerator, startViewDate
        }
    }, {
        key: "isVirtualScrolling",
        get: function() {
            var _this$currentViewProp;
            return "virtual" === this.props.scrolling.mode || "virtual" === (null === (_this$currentViewProp = this.currentViewProps.scrolling) || void 0 === _this$currentViewProp ? void 0 : _this$currentViewProp.mode)
        }
    }, {
        key: "timeZoneCalculator",
        get: function() {
            var _this7 = this;
            if (void 0 !== this.__getterCache.timeZoneCalculator) {
                return this.__getterCache.timeZoneCalculator
            }
            return this.__getterCache.timeZoneCalculator = (0, _createTimeZoneCalculator.createTimeZoneCalculator)(_this7.props.timeZone)
        }
    }, {
        key: "internalDataSource",
        get: function() {
            if (this.props.dataSource instanceof _data_source.default) {
                return this.props.dataSource
            }
            if (this.props.dataSource instanceof Array) {
                return new _data_source.default({
                    store: {
                        type: "array",
                        data: this.props.dataSource
                    },
                    paginate: false
                })
            }
            return new _data_source.default(this.props.dataSource)
        }
    }, {
        key: "appointmentsConfig",
        get: function() {
            var _this8 = this;
            if (void 0 !== this.__getterCache.appointmentsConfig) {
                return this.__getterCache.appointmentsConfig
            }
            return this.__getterCache.appointmentsConfig = function() {
                if (!_this8.isValidViewDataProvider || !_this8.state.loadedResources) {
                    return
                }
                var renderConfig = (0, _work_space_config.getViewRenderConfigByType)(_this8.currentViewConfig.type, _this8.currentViewConfig.crossScrollingEnabled, _this8.currentViewConfig.intervalCount, _this8.state.loadedResources, _this8.currentViewConfig.groupOrientation);
                return (0, _appointments2.getAppointmentsConfig)({
                    adaptivityEnabled: _this8.props.adaptivityEnabled,
                    rtlEnabled: _this8.props.rtlEnabled,
                    resources: _this8.props.resources,
                    timeZone: _this8.props.timeZone,
                    groups: _this8.mergedGroups
                }, {
                    startDayHour: _this8.currentViewConfig.startDayHour,
                    endDayHour: _this8.currentViewConfig.endDayHour,
                    currentDate: _this8.currentViewConfig.currentDate,
                    scrolling: _this8.currentViewConfig.scrolling,
                    intervalCount: _this8.currentViewConfig.intervalCount,
                    hoursInterval: _this8.currentViewConfig.hoursInterval,
                    showAllDayPanel: _this8.currentViewConfig.showAllDayPanel,
                    firstDayOfWeek: _this8.currentViewConfig.firstDayOfWeek,
                    type: _this8.currentViewConfig.type,
                    cellDuration: _this8.currentViewConfig.cellDuration,
                    maxAppointmentsPerCell: _this8.currentViewConfig.maxAppointmentsPerCell,
                    allDayPanelMode: _this8.currentViewConfig.allDayPanelMode
                }, _this8.state.loadedResources, _this8.state.workSpaceViewModel.viewDataProvider, renderConfig.isAllDayPanelSupported)
            }()
        }
    }, {
        key: "preparedDataItems",
        get: function() {
            var _this9 = this;
            if (void 0 !== this.__getterCache.preparedDataItems) {
                return this.__getterCache.preparedDataItems
            }
            return this.__getterCache.preparedDataItems = (0, _data.getPreparedDataItems)(_this9.state.dataItems, _this9.dataAccessors, _this9.currentViewConfig.cellDuration, _this9.timeZoneCalculator)
        }
    }, {
        key: "filteredItems",
        get: function() {
            var _this10 = this;
            if (void 0 !== this.__getterCache.filteredItems) {
                return this.__getterCache.filteredItems
            }
            return this.__getterCache.filteredItems = function() {
                if (!_this10.appointmentsConfig) {
                    return []
                }
                var filterStrategy = (0, _local.getFilterStrategy)(_this10.appointmentsConfig.resources, _this10.appointmentsConfig.startDayHour, _this10.appointmentsConfig.endDayHour, _this10.appointmentsConfig.cellDurationInMinutes, _this10.appointmentsConfig.showAllDayPanel, _this10.appointmentsConfig.supportAllDayRow, _this10.appointmentsConfig.firstDayOfWeek, _this10.appointmentsConfig.viewType, _this10.appointmentsConfig.dateRange, _this10.appointmentsConfig.groupCount, _this10.appointmentsConfig.loadedResources, _this10.appointmentsConfig.isVirtualScrolling, _this10.timeZoneCalculator, _this10.dataAccessors, _this10.state.workSpaceViewModel.viewDataProvider);
                return filterStrategy.filter(_this10.preparedDataItems)
            }()
        }
    }, {
        key: "appointmentsViewModel",
        get: function() {
            var _this11 = this;
            if (void 0 !== this.__getterCache.appointmentsViewModel) {
                return this.__getterCache.appointmentsViewModel
            }
            return this.__getterCache.appointmentsViewModel = function() {
                if (!_this11.appointmentsConfig || 0 === _this11.filteredItems.length) {
                    return {
                        allDay: [],
                        allDayCompact: [],
                        regular: [],
                        regularCompact: []
                    }
                }
                var model = (0, _appointments2.getAppointmentsModel)(_this11.appointmentsConfig, _this11.state.workSpaceViewModel.viewDataProvider, _this11.timeZoneCalculator, _this11.dataAccessors, _this11.state.workSpaceViewModel.cellsMetaData);
                return (0, _appointments.getAppointmentsViewModel)(model, _this11.filteredItems)
            }()
        }
    }, {
        key: "workSpaceKey",
        get: function() {
            var _this$state$loadedRes;
            var _this$currentViewConf2 = this.currentViewConfig,
                crossScrollingEnabled = _this$currentViewConf2.crossScrollingEnabled,
                groupOrientation = _this$currentViewConf2.groupOrientation,
                intervalCount = _this$currentViewConf2.intervalCount;
            if (!crossScrollingEnabled) {
                return ""
            }
            var groupCount = (0, _utils2.getGroupCount)(null !== (_this$state$loadedRes = this.state.loadedResources) && void 0 !== _this$state$loadedRes ? _this$state$loadedRes : []);
            return "".concat(void 0 !== this.props.currentView ? this.props.currentView : this.state.currentView, "_").concat(groupOrientation, "_").concat(intervalCount, "_").concat(groupCount)
        }
    }, {
        key: "mergedGroups",
        get: function() {
            var _this12 = this;
            if (void 0 !== this.__getterCache.mergedGroups) {
                return this.__getterCache.mergedGroups
            }
            return this.__getterCache.mergedGroups = (0, _views.getValidGroups)(_this12.props.groups, _this12.currentViewProps.groups)
        }
    }, {
        key: "appointmentsContextValue",
        get: function() {
            var _this13 = this;
            if (void 0 !== this.__getterCache.appointmentsContextValue) {
                return this.__getterCache.appointmentsContextValue
            }
            return this.__getterCache.appointmentsContextValue = {
                viewModel: _this13.appointmentsViewModel,
                groups: _this13.mergedGroups,
                resources: _this13.props.resources,
                resourceLoaderMap: _this13.state.resourcePromisesMap,
                loadedResources: _this13.state.loadedResources,
                dataAccessors: _this13.dataAccessors,
                appointmentTemplate: _this13.currentViewConfig.appointmentTemplate,
                overflowIndicatorTemplate: _this13.currentViewConfig.appointmentCollectorTemplate,
                onAppointmentClick: function(data) {
                    return _this13.showTooltip(data)
                },
                onAppointmentDoubleClick: function(data) {
                    return _this13.showAppointmentPopupForm(data)
                },
                showReducedIconTooltip: function(data) {
                    return _this13.showReducedIconTooltip(data)
                },
                hideReducedIconTooltip: function() {
                    return _this13.hideReducedIconTooltip()
                },
                updateFocusedAppointment: _this13.updateFocusedAppointment
            }
        }
    }, {
        key: "classes",
        get: function() {
            return (0, _combine_classes.combineClasses)({
                "dx-scheduler": true,
                "dx-scheduler-native": true,
                "dx-scheduler-adaptive": this.props.adaptivityEnabled
            })
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props$currentDa = _extends({}, this.props, {
                    currentDate: void 0 !== this.props.currentDate ? this.props.currentDate : this.state.currentDate,
                    currentView: void 0 !== this.props.currentView ? this.props.currentView : this.state.currentView
                }),
                restProps = (_this$props$currentDa.accessKey, _this$props$currentDa.activeStateEnabled, _this$props$currentDa.adaptivityEnabled, _this$props$currentDa.allDayExpr, _this$props$currentDa.allDayPanelMode, _this$props$currentDa.appointmentCollectorTemplate, _this$props$currentDa.appointmentDragging, _this$props$currentDa.appointmentTemplate, _this$props$currentDa.appointmentTooltipTemplate, _this$props$currentDa.cellDuration, _this$props$currentDa.className, _this$props$currentDa.crossScrollingEnabled, _this$props$currentDa.currentDate, _this$props$currentDa.currentDateChange, _this$props$currentDa.currentView, _this$props$currentDa.currentViewChange, _this$props$currentDa.customizeDateNavigatorText, _this$props$currentDa.dataCellTemplate, _this$props$currentDa.dataSource, _this$props$currentDa.dateCellTemplate, _this$props$currentDa.dateSerializationFormat, _this$props$currentDa.defaultCurrentDate, _this$props$currentDa.defaultCurrentView, _this$props$currentDa.descriptionExpr, _this$props$currentDa.disabled, _this$props$currentDa.editing, _this$props$currentDa.endDateExpr, _this$props$currentDa.endDateTimeZoneExpr, _this$props$currentDa.endDayHour, _this$props$currentDa.firstDayOfWeek, _this$props$currentDa.focusStateEnabled, _this$props$currentDa.groupByDate, _this$props$currentDa.groups, _this$props$currentDa.height, _this$props$currentDa.hint, _this$props$currentDa.hoverStateEnabled, _this$props$currentDa.indicatorUpdateInterval, _this$props$currentDa.max, _this$props$currentDa.maxAppointmentsPerCell, _this$props$currentDa.min, _this$props$currentDa.noDataText, _this$props$currentDa.onAppointmentAdded, _this$props$currentDa.onAppointmentAdding, _this$props$currentDa.onAppointmentClick, _this$props$currentDa.onAppointmentContextMenu, _this$props$currentDa.onAppointmentDblClick, _this$props$currentDa.onAppointmentDeleted, _this$props$currentDa.onAppointmentDeleting, _this$props$currentDa.onAppointmentFormOpening, _this$props$currentDa.onAppointmentRendered, _this$props$currentDa.onAppointmentUpdated, _this$props$currentDa.onAppointmentUpdating, _this$props$currentDa.onCellClick, _this$props$currentDa.onCellContextMenu, _this$props$currentDa.onClick, _this$props$currentDa.onKeyDown, _this$props$currentDa.recurrenceEditMode, _this$props$currentDa.recurrenceExceptionExpr, _this$props$currentDa.recurrenceRuleExpr, _this$props$currentDa.remoteFiltering, _this$props$currentDa.resourceCellTemplate, _this$props$currentDa.resources, _this$props$currentDa.rtlEnabled, _this$props$currentDa.scrolling, _this$props$currentDa.selectedCellData, _this$props$currentDa.shadeUntilCurrentTime, _this$props$currentDa.showAllDayPanel, _this$props$currentDa.showCurrentTimeIndicator, _this$props$currentDa.startDateExpr, _this$props$currentDa.startDateTimeZoneExpr, _this$props$currentDa.startDayHour, _this$props$currentDa.tabIndex, _this$props$currentDa.textExpr, _this$props$currentDa.timeCellTemplate, _this$props$currentDa.timeZone, _this$props$currentDa.toolbar, _this$props$currentDa.useDropDownViewSwitcher, _this$props$currentDa.views, _this$props$currentDa.visible, _this$props$currentDa.width, _objectWithoutProperties(_this$props$currentDa, _excluded));
            return restProps
        }
    }]);
    return Scheduler
}(_inferno2.InfernoWrapperComponent);
exports.Scheduler = Scheduler;
Scheduler.defaultProps = _props.SchedulerProps;
