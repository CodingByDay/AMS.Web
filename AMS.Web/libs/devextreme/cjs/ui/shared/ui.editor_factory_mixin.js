/**
 * DevExtreme (cjs/ui/shared/ui.editor_factory_mixin.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _type = require("../../core/utils/type");
var _variable_wrapper = _interopRequireDefault(require("../../core/utils/variable_wrapper"));
var _data = require("../../core/utils/data");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _extend = require("../../core/utils/extend");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _element = require("../../core/element");
var _utils = require("../../data/data_source/utils");
var _index = require("../../events/utils/index");
require("../text_box");
require("../number_box");
require("../check_box");
require("../select_box");
require("../date_box");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var isWrapped = _variable_wrapper.default.isWrapped;
var CHECKBOX_SIZE_CLASS = "checkbox-size";
var EDITOR_INLINE_BLOCK = "dx-editor-inline-block";
var EditorFactoryMixin = function() {
    var getResultConfig = function(config, options) {
        return (0, _extend.extend)(config, {
            readOnly: options.readOnly,
            placeholder: options.placeholder,
            inputAttr: {
                id: options.id
            },
            tabIndex: options.tabIndex
        }, options.editorOptions)
    };
    var checkEnterBug = function() {
        return _browser.default.mozilla || _devices.default.real().ios
    };
    var getTextEditorConfig = function(options) {
        var data = {};
        var isEnterBug = checkEnterBug();
        var sharedData = options.sharedData || data;
        return getResultConfig({
            placeholder: options.placeholder,
            width: options.width,
            value: options.value,
            onValueChanged: function(e) {
                var needDelayedUpdate = "filterRow" === options.parentType || "searchPanel" === options.parentType;
                var isInputOrKeyUpEvent = e.event && ("input" === e.event.type || "keyup" === e.event.type);
                var updateValue = function(e, notFireEvent) {
                    options && options.setValue(e.value, notFireEvent)
                };
                clearTimeout(data.valueChangeTimeout);
                if (isInputOrKeyUpEvent && needDelayedUpdate) {
                    sharedData.valueChangeTimeout = data.valueChangeTimeout = setTimeout((function() {
                        updateValue(e, data.valueChangeTimeout !== sharedData.valueChangeTimeout)
                    }), (0, _type.isDefined)(options.updateValueTimeout) ? options.updateValueTimeout : 0)
                } else {
                    updateValue(e)
                }
            },
            onKeyDown: function(e) {
                if (isEnterBug && "enter" === (0, _index.normalizeKeyName)(e.event)) {
                    _events_engine.default.trigger((0, _renderer.default)(e.component._input()), "change")
                }
            },
            valueChangeEvent: "change" + ("filterRow" === options.parentType ? " keyup input" : "")
        }, options)
    };
    var prepareDateBox = function(options) {
        options.editorName = "dxDateBox";
        options.editorOptions = getResultConfig({
            value: options.value,
            onValueChanged: function(args) {
                options.setValue(args.value)
            },
            onKeyDown: function(_ref) {
                var component = _ref.component,
                    event = _ref.event;
                var useMaskBehavior = component.option("useMaskBehavior");
                if ((checkEnterBug() || useMaskBehavior) && "enter" === (0, _index.normalizeKeyName)(event)) {
                    component.blur();
                    component.focus()
                }
            },
            displayFormat: options.format,
            type: options.dataType,
            dateSerializationFormat: null,
            width: "filterBuilder" === options.parentType ? void 0 : "auto"
        }, options)
    };
    var prepareTextBox = function(options) {
        var config = getTextEditorConfig(options);
        var isSearching = "searchPanel" === options.parentType;
        if (options.editorType && "dxTextBox" !== options.editorType) {
            config.value = options.value
        } else {
            config.value = (value = options.value, (0, _type.isDefined)(value) ? value.toString() : "")
        }
        var value;
        config.valueChangeEvent += isSearching ? " keyup input search" : "";
        config.mode = config.mode || (isSearching ? "search" : "text");
        options.editorName = "dxTextBox";
        options.editorOptions = config
    };
    var prepareNumberBox = function(options) {
        var config = getTextEditorConfig(options);
        config.value = (0, _type.isDefined)(options.value) ? options.value : null;
        options.editorName = "dxNumberBox";
        options.editorOptions = config
    };

    function prepareLookupEditor(options) {
        var lookup = options.lookup;
        var displayGetter;
        var dataSource;
        var postProcess;
        var isFilterRow = "filterRow" === options.parentType;
        if (lookup) {
            var _options$editorType;
            displayGetter = (0, _data.compileGetter)(lookup.displayExpr);
            dataSource = lookup.dataSource;
            if ((0, _type.isFunction)(dataSource) && !isWrapped(dataSource)) {
                dataSource = dataSource(options.row || {});
                ! function(options) {
                    if (options.row && options.row.watch && "dataRow" === options.parentType) {
                        var editorOptions = options.editorOptions || {};
                        options.editorOptions = editorOptions;
                        var selectBox;
                        var onInitialized = editorOptions.onInitialized;
                        editorOptions.onInitialized = function(e) {
                            onInitialized && onInitialized.apply(this, arguments);
                            selectBox = e.component;
                            selectBox.on("disposing", stopWatch)
                        };
                        var dataSource;
                        var stopWatch = options.row.watch((function() {
                            dataSource = options.lookup.dataSource(options.row);
                            return dataSource && dataSource.filter
                        }), (function() {
                            selectBox.option("dataSource", dataSource)
                        }), (function(row) {
                            options.row = row
                        }))
                    }
                }(options)
            }
            if ((0, _type.isObject)(dataSource) || Array.isArray(dataSource)) {
                dataSource = (0, _utils.normalizeDataSourceOptions)(dataSource);
                if (isFilterRow) {
                    postProcess = dataSource.postProcess;
                    dataSource.postProcess = function(items) {
                        if (0 === this.pageIndex()) {
                            items = items.slice(0);
                            items.unshift(null)
                        }
                        if (postProcess) {
                            return postProcess.call(this, items)
                        }
                        return items
                    }
                }
            }
            var allowClearing = Boolean(lookup.allowClearing && !isFilterRow);
            options.editorName = null !== (_options$editorType = options.editorType) && void 0 !== _options$editorType ? _options$editorType : "dxSelectBox";
            options.editorOptions = getResultConfig({
                searchEnabled: true,
                value: options.value,
                valueExpr: options.lookup.valueExpr,
                searchExpr: options.lookup.searchExpr || options.lookup.displayExpr,
                allowClearing: allowClearing,
                showClearButton: allowClearing,
                displayExpr: function(data) {
                    if (null === data) {
                        return options.showAllText
                    }
                    return displayGetter(data)
                },
                dataSource: dataSource,
                onValueChanged: function(e) {
                    var params = [e.value];
                    !isFilterRow && params.push(e.component.option("text"));
                    options.setValue.apply(this, params)
                }
            }, options)
        }
    }

    function prepareCheckBox(options) {
        options.editorName = "dxCheckBox";
        options.editorOptions = getResultConfig({
            elementAttr: {
                id: options.id
            },
            value: (0, _type.isDefined)(options.value) ? options.value : void 0,
            hoverStateEnabled: !options.readOnly,
            focusStateEnabled: !options.readOnly,
            activeStateEnabled: false,
            onValueChanged: function(e) {
                options.setValue && options.setValue(e.value, e)
            }
        }, options)
    }
    var prepareCustomEditor = function(options) {
        options.editorName = options.editorType;
        options.editorOptions = getResultConfig({
            value: options.value,
            onValueChanged: function(args) {
                options.setValue(args.value)
            }
        }, options)
    };
    var prepareEditor = function(options) {
        var prepareDefaultEditor = {
            dxDateBox: prepareDateBox,
            dxCheckBox: prepareCheckBox,
            dxNumberBox: prepareNumberBox,
            dxTextBox: prepareTextBox
        };
        if (options.lookup) {
            prepareLookupEditor(options)
        } else if (options.editorType) {
            var _prepareDefaultEditor;
            (null !== (_prepareDefaultEditor = prepareDefaultEditor[options.editorType]) && void 0 !== _prepareDefaultEditor ? _prepareDefaultEditor : prepareCustomEditor)(options)
        } else {
            switch (options.dataType) {
                case "date":
                case "datetime":
                    prepareDateBox(options);
                    break;
                case "boolean":
                    ! function(options) {
                        if ("filterRow" === options.parentType || "filterBuilder" === options.parentType) {
                            prepareLookupEditor((0, _extend.extend)(options, {
                                lookup: {
                                    displayExpr: function(data) {
                                        if (true === data) {
                                            return options.trueText || "true"
                                        } else if (false === data) {
                                            return options.falseText || "false"
                                        }
                                    },
                                    dataSource: [true, false]
                                }
                            }))
                        } else {
                            prepareCheckBox(options)
                        }
                    }(options);
                    break;
                case "number":
                    prepareNumberBox(options);
                    break;
                default:
                    prepareTextBox(options)
            }
        }
    };
    return {
        createEditor: function($container, options) {
            options.cancel = false;
            options.editorElement = (0, _element.getPublicElement)($container);
            if (!(0, _type.isDefined)(options.tabIndex)) {
                options.tabIndex = this.option("tabIndex")
            }
            prepareEditor(options);
            this.executeAction("onEditorPreparing", options);
            if (options.cancel) {
                return
            }
            if ("dataRow" === options.parentType && !options.isOnForm && !(0, _type.isDefined)(options.editorOptions.showValidationMark)) {
                options.editorOptions.showValidationMark = false
            }! function(that, options) {
                var $editorElement = (0, _renderer.default)(options.editorElement);
                if (options.editorName && options.editorOptions && $editorElement[options.editorName]) {
                    if ("dxCheckBox" === options.editorName || "dxSwitch" === options.editorName) {
                        if (!options.isOnForm) {
                            $editorElement.addClass(that.addWidgetPrefix(CHECKBOX_SIZE_CLASS));
                            $editorElement.parent().addClass(EDITOR_INLINE_BLOCK)
                        }
                    }
                    that._createComponent($editorElement, options.editorName, options.editorOptions);
                    if ("dxDateBox" === options.editorName) {
                        var dateBox = $editorElement.dxDateBox("instance");
                        var defaultEnterKeyHandler = dateBox._supportedKeys().enter;
                        dateBox.registerKeyHandler("enter", (function(e) {
                            if (dateBox.option("opened")) {
                                defaultEnterKeyHandler(e)
                            }
                            return true
                        }))
                    }
                    if ("dxTextArea" === options.editorName) {
                        $editorElement.dxTextArea("instance").registerKeyHandler("enter", (function(event) {
                            if ("enter" === (0, _index.normalizeKeyName)(event) && !event.ctrlKey && !event.shiftKey) {
                                event.stopPropagation()
                            }
                        }))
                    }
                }
            }(this, options);
            this.executeAction("onEditorPrepared", options)
        }
    }
}();
var _default = EditorFactoryMixin;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
