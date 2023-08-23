/**
 * DevExtreme (bundles/__internal/grids/grid_core/validating/m_validating.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validatingModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _string = require("../../../../core/utils/string");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _load_indicator = _interopRequireDefault(require("../../../../ui/load_indicator"));
var _ui = _interopRequireDefault(require("../../../../ui/overlay/ui.overlay"));
var _validation_engine = _interopRequireDefault(require("../../../../ui/validation_engine"));
var _validator = _interopRequireDefault(require("../../../../ui/validator"));
var _selectors = require("../../../../ui/widget/selectors");
var _ui2 = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
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
var INVALIDATE_CLASS = "invalid";
var REVERT_TOOLTIP_CLASS = "revert-tooltip";
var INVALID_MESSAGE_CLASS = "dx-invalid-message";
var WIDGET_INVALID_MESSAGE_CLASS = "invalid-message";
var INVALID_MESSAGE_ALWAYS_CLASS = "dx-invalid-message-always";
var REVERT_BUTTON_CLASS = "dx-revert-button";
var VALIDATOR_CLASS = "validator";
var PENDING_INDICATOR_CLASS = "dx-pending-indicator";
var VALIDATION_PENDING_CLASS = "dx-validation-pending";
var CONTENT_CLASS = "content";
var INSERT_INDEX = "__DX_INSERT_INDEX__";
var PADDING_BETWEEN_TOOLTIPS = 2;
var EDIT_MODE_ROW = "row";
var EDIT_MODE_FORM = "form";
var EDIT_MODE_BATCH = "batch";
var EDIT_MODE_CELL = "cell";
var EDIT_MODE_POPUP = "popup";
var GROUP_CELL_CLASS = "dx-group-cell";
var FORM_BASED_MODES = [EDIT_MODE_POPUP, EDIT_MODE_FORM];
var COMMAND_TRANSPARENT = "transparent";
var VALIDATION_STATUS = {
    valid: "valid",
    invalid: "invalid",
    pending: "pending"
};
var EDIT_DATA_INSERT_TYPE = "insert";
var EDIT_DATA_REMOVE_TYPE = "remove";
var VALIDATION_CANCELLED = "cancel";
var validationResultIsValid = function(result) {
    return (0, _type.isDefined)(result) && result !== VALIDATION_CANCELLED
};
var cellValueShouldBeValidated = function(value, rowOptions) {
    return void 0 !== value || void 0 === value && rowOptions && !rowOptions.isNewRow
};
var ValidatingController = _m_modules.default.Controller.inherit({
    init: function() {
        this._editingController = this.getController("editing");
        this.createAction("onRowValidating");
        if (!this._validationState) {
            this.initValidationState()
        }
    },
    initValidationState: function() {
        this._validationState = [];
        this._validationStateCache = {}
    },
    _rowIsValidated: function(change) {
        var validationData = this._getValidationData(null === change || void 0 === change ? void 0 : change.key);
        return !!validationData && !!validationData.validated
    },
    _getValidationData: function(key, create) {
        var keyHash = (0, _common.getKeyHash)(key);
        var isObjectKeyHash = (0, _type.isObject)(keyHash);
        var validationData;
        if (isObjectKeyHash) {
            validationData = this._validationState.filter((function(data) {
                return (0, _common.equalByValue)(data.key, key)
            }))[0]
        } else {
            validationData = this._validationStateCache[keyHash]
        }
        if (!validationData && create) {
            validationData = {
                key: key,
                isValid: true
            };
            this._validationState.push(validationData);
            if (!isObjectKeyHash) {
                this._validationStateCache[keyHash] = validationData
            }
        }
        return validationData
    },
    _getBrokenRules: function(validationData, validationResults) {
        var brokenRules;
        if (validationResults) {
            brokenRules = validationResults.brokenRules || validationResults.brokenRule && [validationResults.brokenRule]
        } else {
            brokenRules = validationData.brokenRules || []
        }
        return brokenRules
    },
    _rowValidating: function(validationData, validationResults) {
        var deferred = new _deferred.Deferred;
        var change = this._editingController.getChangeByKey(null === validationData || void 0 === validationData ? void 0 : validationData.key);
        var brokenRules = this._getBrokenRules(validationData, validationResults);
        var isValid = validationResults ? validationResults.isValid : validationData.isValid;
        var parameters = {
            brokenRules: brokenRules,
            isValid: isValid,
            key: change.key,
            newData: change.data,
            oldData: this._editingController._getOldData(change.key),
            promise: null,
            errorText: this.getHiddenValidatorsErrorText(brokenRules)
        };
        this.executeAction("onRowValidating", parameters);
        (0, _deferred.when)((0, _deferred.fromPromise)(parameters.promise)).always((function() {
            validationData.isValid = parameters.isValid;
            validationData.errorText = parameters.errorText;
            deferred.resolve(parameters)
        }));
        return deferred.promise()
    },
    getHiddenValidatorsErrorText: function(brokenRules) {
        var brokenRulesMessages = [];
        (0, _iterator.each)(brokenRules, (function(_, brokenRule) {
            var column = brokenRule.column;
            var isGroupExpandColumn = column && void 0 !== column.groupIndex && !column.showWhenGrouped;
            var isVisibleColumn = column && column.visible;
            if (!brokenRule.validator.$element().parent().length && (!isVisibleColumn || isGroupExpandColumn)) {
                brokenRulesMessages.push(brokenRule.message)
            }
        }));
        return brokenRulesMessages.join(", ")
    },
    validate: function(isFull) {
        var _this = this;
        var isValid = true;
        var editingController = this._editingController;
        var deferred = new _deferred.Deferred;
        var completeList = [];
        var editMode = editingController.getEditMode();
        isFull = isFull || editMode === EDIT_MODE_ROW;
        if (this._isValidationInProgress) {
            return deferred.resolve(false).promise()
        }
        this._isValidationInProgress = true;
        if (isFull) {
            editingController.addDeferred(deferred);
            var changes = editingController.getChanges();
            (0, _iterator.each)(changes, (function(index, _ref) {
                var type = _ref.type,
                    key = _ref.key;
                if ("remove" !== type) {
                    var validationData = _this._getValidationData(key, true);
                    var validationResult = _this.validateGroup(validationData);
                    completeList.push(validationResult);
                    validationResult.done((function(validationResult) {
                        validationData.validated = true;
                        isValid = isValid && validationResult.isValid
                    }))
                }
            }))
        } else if (this._currentCellValidator) {
            var validationResult = this.validateGroup(this._currentCellValidator._findGroup());
            completeList.push(validationResult);
            validationResult.done((function(validationResult) {
                isValid = validationResult.isValid
            }))
        }
        _deferred.when.apply(void 0, completeList).done((function() {
            _this._isValidationInProgress = false;
            deferred.resolve(isValid)
        }));
        return deferred.promise()
    },
    validateGroup: function(validationData) {
        var _this2 = this;
        var result = new _deferred.Deferred;
        var validateGroup = validationData && _validation_engine.default.getGroupConfig(validationData);
        var validationResult;
        if (null === validateGroup || void 0 === validateGroup ? void 0 : validateGroup.validators.length) {
            this.resetRowValidationResults(validationData);
            validationResult = _validation_engine.default.validateGroup(validationData)
        }(0, _deferred.when)((null === validationResult || void 0 === validationResult ? void 0 : validationResult.complete) || validationResult).done((function(validationResult) {
            (0, _deferred.when)(_this2._rowValidating(validationData, validationResult)).done(result.resolve)
        }));
        return result.promise()
    },
    isRowDataModified: function(change) {
        return !(0, _type.isEmptyObject)(change.data)
    },
    updateValidationState: function(change) {
        var editMode = this._editingController.getEditMode();
        var key = change.key;
        var validationData = this._getValidationData(key, true);
        if (!FORM_BASED_MODES.includes(editMode)) {
            if (change.type === EDIT_DATA_INSERT_TYPE && !this.isRowDataModified(change)) {
                validationData.isValid = true;
                return
            }
            this.setDisableApplyValidationResults(true);
            var groupConfig = _validation_engine.default.getGroupConfig(validationData);
            if (groupConfig) {
                var validationResult = _validation_engine.default.validateGroup(validationData);
                (0, _deferred.when)(validationResult.complete || validationResult).done((function(validationResult) {
                    validationData.isValid = validationResult.isValid;
                    validationData.brokenRules = validationResult.brokenRules
                }))
            } else if (!validationData.brokenRules || !validationData.brokenRules.length) {
                validationData.isValid = true
            }
            this.setDisableApplyValidationResults(false)
        } else {
            validationData.isValid = true
        }
    },
    setValidator: function(validator) {
        this._currentCellValidator = validator
    },
    renderCellPendingIndicator: function($container) {
        var $indicator = $container.find(".".concat(PENDING_INDICATOR_CLASS));
        if (!$indicator.length) {
            var $indicatorContainer = $container;
            $indicator = (0, _renderer.default)("<div>").appendTo($indicatorContainer).addClass(PENDING_INDICATOR_CLASS);
            this._createComponent($indicator, _load_indicator.default);
            $container.addClass(VALIDATION_PENDING_CLASS)
        }
    },
    disposeCellPendingIndicator: function($container) {
        var $indicator = $container.find(".".concat(PENDING_INDICATOR_CLASS));
        if ($indicator.length) {
            var indicator = _load_indicator.default.getInstance($indicator);
            if (indicator) {
                indicator.dispose();
                indicator.$element().remove()
            }
            $container.removeClass(VALIDATION_PENDING_CLASS)
        }
    },
    validationStatusChanged: function(result) {
        var validator = result.validator;
        var validationGroup = validator.option("validationGroup");
        var _validator$option = validator.option("dataGetter")(),
            column = _validator$option.column;
        this.updateCellValidationResult({
            rowKey: validationGroup.key,
            columnIndex: column.index,
            validationResult: result
        })
    },
    validatorInitialized: function(arg) {
        arg.component.on("validating", this.validationStatusChanged.bind(this));
        arg.component.on("validated", this.validationStatusChanged.bind(this))
    },
    validatorDisposing: function(arg) {
        var validator = arg.component;
        var validationGroup = validator.option("validationGroup");
        var _validator$option2 = validator.option("dataGetter")(),
            column = _validator$option2.column;
        var result = this.getCellValidationResult({
            rowKey: null === validationGroup || void 0 === validationGroup ? void 0 : validationGroup.key,
            columnIndex: column.index
        });
        if (validationResultIsValid(result) && result.status === VALIDATION_STATUS.pending) {
            this.cancelCellValidationResult({
                change: validationGroup,
                columnIndex: column.index
            })
        }
    },
    applyValidationResult: function($container, result) {
        var validator = result.validator;
        var validationGroup = validator.option("validationGroup");
        var _validator$option3 = validator.option("dataGetter")(),
            column = _validator$option3.column;
        result.brokenRules && result.brokenRules.forEach((function(rule) {
            rule.columnIndex = column.index;
            rule.column = column
        }));
        if ($container) {
            var validationResult = this.getCellValidationResult({
                rowKey: validationGroup.key,
                columnIndex: column.index
            });
            var requestIsDisabled = validationResultIsValid(validationResult) && validationResult.disabledPendingId === result.id;
            if (this._disableApplyValidationResults || requestIsDisabled) {
                return
            }
            if (result.status === VALIDATION_STATUS.invalid) {
                var $focus = $container.find(":focus");
                if (!(0, _selectors.focused)($focus)) {
                    _events_engine.default.trigger($focus, "focus");
                    _events_engine.default.trigger($focus, _pointer.default.down)
                }
            }
            var editor = !column.editCellTemplate && this.getController("editorFactory").getEditorInstance($container);
            if (result.status === VALIDATION_STATUS.pending) {
                if (editor) {
                    editor.option("validationStatus", VALIDATION_STATUS.pending)
                } else {
                    this.renderCellPendingIndicator($container)
                }
            } else if (editor) {
                editor.option("validationStatus", VALIDATION_STATUS.valid)
            } else {
                this.disposeCellPendingIndicator($container)
            }
            $container.toggleClass(this.addWidgetPrefix(INVALIDATE_CLASS), result.status === VALIDATION_STATUS.invalid)
        }
    },
    _syncInternalEditingData: function(parameters) {
        var _a;
        var editingController = this._editingController;
        var change = editingController.getChangeByKey(parameters.key);
        var oldDataFromState = editingController._getOldData(parameters.key);
        var oldData = null === (_a = parameters.row) || void 0 === _a ? void 0 : _a.oldData;
        if (change && oldData && !oldDataFromState) {
            editingController._addInternalData({
                key: parameters.key,
                oldData: oldData
            })
        }
    },
    createValidator: function(parameters, $container) {
        var _this3 = this;
        var _a, _b;
        var editingController = this._editingController;
        var column = parameters.column;
        var showEditorAlways = column.showEditorAlways;
        if ((0, _type.isDefined)(column.command) || !column.validationRules || !Array.isArray(column.validationRules) || !column.validationRules.length) {
            return
        }
        var editIndex = editingController.getIndexByKey(parameters.key, editingController.getChanges());
        var needCreateValidator = editIndex > -1;
        if (!needCreateValidator) {
            if (!showEditorAlways) {
                var columnsController = this.getController("columns");
                var visibleColumns = (null === columnsController || void 0 === columnsController ? void 0 : columnsController.getVisibleColumns()) || [];
                showEditorAlways = visibleColumns.some((function(column) {
                    return column.showEditorAlways
                }))
            }
            var isEditRow = (0, _common.equalByValue)(this.option("editing.editRowKey"), parameters.key);
            var isCellOrBatchEditingAllowed = editingController.isCellOrBatchEditMode() && editingController.allowUpdating({
                row: parameters.row
            });
            needCreateValidator = isEditRow || isCellOrBatchEditingAllowed && showEditorAlways;
            if (isCellOrBatchEditingAllowed && showEditorAlways) {
                editingController._addInternalData({
                    key: parameters.key,
                    oldData: null !== (_b = null === (_a = parameters.row) || void 0 === _a ? void 0 : _a.oldData) && void 0 !== _b ? _b : parameters.data
                })
            }
        }
        if (needCreateValidator) {
            if ($container && !$container.length) {
                _ui2.default.log("E1050");
                return
            }
            this._syncInternalEditingData(parameters);
            var validationData = this._getValidationData(parameters.key, true);
            var getValue = function() {
                var change = editingController.getChangeByKey(null === validationData || void 0 === validationData ? void 0 : validationData.key);
                var value = column.calculateCellValue((null === change || void 0 === change ? void 0 : change.data) || {});
                return void 0 !== value ? value : parameters.value
            };
            var useDefaultValidator = $container && $container.hasClass("dx-widget");
            $container && $container.addClass(this.addWidgetPrefix(VALIDATOR_CLASS));
            var validator = new _validator.default($container || (0, _renderer.default)("<div>"), {
                name: column.caption,
                validationRules: (0, _extend.extend)(true, [], column.validationRules),
                validationGroup: validationData,
                adapter: useDefaultValidator ? null : {
                    getValue: getValue,
                    applyValidationResults: function(result) {
                        _this3.applyValidationResult($container, result)
                    }
                },
                dataGetter: function() {
                    var key = null === validationData || void 0 === validationData ? void 0 : validationData.key;
                    var change = editingController.getChangeByKey(key);
                    var oldData = editingController._getOldData(key);
                    return {
                        data: (0, _array_utils.createObjectWithChanges)(oldData, null === change || void 0 === change ? void 0 : change.data),
                        column: column
                    }
                },
                onInitialized: this.validatorInitialized.bind(this),
                onDisposing: this.validatorDisposing.bind(this)
            });
            if (useDefaultValidator) {
                var adapter = validator.option("adapter");
                if (adapter) {
                    var originBypass = adapter.bypass;
                    adapter.getValue = getValue;
                    adapter.validationRequestsCallbacks = [];
                    adapter.bypass = function() {
                        return originBypass.call(adapter) || parameters.row.isNewRow && !_this3._isValidationInProgress && !editingController.isCellModified(parameters)
                    }
                }
            }
            return validator
        }
        return
    },
    setDisableApplyValidationResults: function(flag) {
        this._disableApplyValidationResults = flag
    },
    getDisableApplyValidationResults: function() {
        return this._disableApplyValidationResults
    },
    isCurrentValidatorProcessing: function(_ref2) {
        var rowKey = _ref2.rowKey,
            columnIndex = _ref2.columnIndex;
        return this._currentCellValidator && (0, _common.equalByValue)(this._currentCellValidator.option("validationGroup").key, rowKey) && this._currentCellValidator.option("dataGetter")().column.index === columnIndex
    },
    validateCell: function(validator) {
        var cellParams = {
            rowKey: validator.option("validationGroup").key,
            columnIndex: validator.option("dataGetter")().column.index
        };
        var validationResult = this.getCellValidationResult(cellParams);
        var stateRestored = validationResultIsValid(validationResult);
        var adapter = validator.option("adapter");
        if (!stateRestored) {
            validationResult = validator.validate()
        } else {
            var currentCellValue = adapter.getValue();
            if (!(0, _common.equalByValue)(currentCellValue, validationResult.value)) {
                validationResult = validator.validate()
            }
        }
        var deferred = new _deferred.Deferred;
        if (stateRestored && validationResult.status === VALIDATION_STATUS.pending) {
            this.updateCellValidationResult(cellParams);
            adapter.applyValidationResults(validationResult)
        }(0, _deferred.when)(validationResult.complete || validationResult).done((function(validationResult) {
            stateRestored && adapter.applyValidationResults(validationResult);
            deferred.resolve(validationResult)
        }));
        return deferred.promise()
    },
    updateCellValidationResult: function(_ref3) {
        var rowKey = _ref3.rowKey,
            columnIndex = _ref3.columnIndex,
            validationResult = _ref3.validationResult;
        var validationData = this._getValidationData(rowKey);
        if (!validationData) {
            return
        }
        if (!validationData.validationResults) {
            validationData.validationResults = {}
        }
        var result;
        if (validationResult) {
            result = (0, _extend.extend)({}, validationResult);
            validationData.validationResults[columnIndex] = result;
            if (validationResult.status === VALIDATION_STATUS.pending) {
                if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
                    result.deferred = new _deferred.Deferred;
                    result.complete.always((function() {
                        result.deferred.resolve()
                    }));
                    this._editingController.addDeferred(result.deferred)
                }
                if (this._disableApplyValidationResults) {
                    result.disabledPendingId = validationResult.id;
                    return
                }
            }
        } else {
            result = validationData.validationResults[columnIndex]
        }
        if (result && result.disabledPendingId) {
            delete result.disabledPendingId
        }
    },
    getCellValidationResult: function(_ref4) {
        var rowKey = _ref4.rowKey,
            columnIndex = _ref4.columnIndex;
        var _a;
        var validationData = this._getValidationData(rowKey, true);
        return null === (_a = null === validationData || void 0 === validationData ? void 0 : validationData.validationResults) || void 0 === _a ? void 0 : _a[columnIndex]
    },
    removeCellValidationResult: function(_ref5) {
        var change = _ref5.change,
            columnIndex = _ref5.columnIndex;
        var validationData = this._getValidationData(null === change || void 0 === change ? void 0 : change.key);
        if (validationData && validationData.validationResults) {
            this.cancelCellValidationResult({
                change: change,
                columnIndex: columnIndex
            });
            delete validationData.validationResults[columnIndex]
        }
    },
    cancelCellValidationResult: function(_ref6) {
        var change = _ref6.change,
            columnIndex = _ref6.columnIndex;
        var validationData = this._getValidationData(change.key);
        if (change && validationData.validationResults) {
            var result = validationData.validationResults[columnIndex];
            if (result) {
                result.deferred && result.deferred.reject(VALIDATION_CANCELLED);
                validationData.validationResults[columnIndex] = VALIDATION_CANCELLED
            }
        }
    },
    resetRowValidationResults: function(validationData) {
        if (validationData) {
            validationData.validationResults && delete validationData.validationResults;
            delete validationData.validated
        }
    },
    isInvalidCell: function(_ref7) {
        var rowKey = _ref7.rowKey,
            columnIndex = _ref7.columnIndex;
        var result = this.getCellValidationResult({
            rowKey: rowKey,
            columnIndex: columnIndex
        });
        return validationResultIsValid(result) && result.status === VALIDATION_STATUS.invalid
    },
    getCellValidator: function(_ref8) {
        var rowKey = _ref8.rowKey,
            columnIndex = _ref8.columnIndex;
        var validationData = this._getValidationData(rowKey);
        var groupConfig = validationData && _validation_engine.default.getGroupConfig(validationData);
        var validators = groupConfig && groupConfig.validators;
        return validators && validators.filter((function(v) {
            var _v$option = v.option("dataGetter")(),
                column = _v$option.column;
            return column ? column.index === columnIndex : false
        }))[0]
    },
    setCellValidationStatus: function(cellOptions) {
        var validationResult = this.getCellValidationResult({
            rowKey: cellOptions.key,
            columnIndex: cellOptions.column.index
        });
        if ((0, _type.isDefined)(validationResult)) {
            cellOptions.validationStatus = validationResult !== VALIDATION_CANCELLED ? validationResult.status : VALIDATION_CANCELLED
        } else {
            delete cellOptions.validationStatus
        }
    }
});
var validatingModule = {
    defaultOptions: function() {
        return {
            editing: {
                texts: {
                    validationCancelChanges: _message.default.format("dxDataGrid-validationCancelChanges")
                }
            }
        }
    },
    controllers: {
        validating: ValidatingController
    },
    extenders: {
        controllers: {
            editing: {
                _addChange: function(changeParams) {
                    var change = this.callBase.apply(this, arguments);
                    var validatingController = this.getController("validating");
                    if (change && changeParams.type !== EDIT_DATA_REMOVE_TYPE) {
                        validatingController.updateValidationState(change)
                    }
                    return change
                },
                _handleChangesChange: function(args) {
                    this.callBase.apply(this, arguments);
                    var validatingController = this.getController("validating");
                    args.value.forEach((function(change) {
                        if (void 0 === validatingController._getValidationData(change.key)) {
                            validatingController.updateValidationState(change)
                        }
                    }))
                },
                _updateRowAndPageIndices: function() {
                    var _this4 = this;
                    var that = this;
                    var startInsertIndex = that.getView("rowsView").getTopVisibleItemIndex();
                    var rowIndex = startInsertIndex;
                    (0, _iterator.each)(that.getChanges(), (function(_, _ref9) {
                        var key = _ref9.key,
                            type = _ref9.type;
                        var validationData = _this4.getController("validating")._getValidationData(key);
                        if (validationData && !validationData.isValid && validationData.pageIndex !== that._pageIndex) {
                            validationData.pageIndex = that._pageIndex;
                            if (type === EDIT_DATA_INSERT_TYPE) {
                                validationData.rowIndex = startInsertIndex
                            } else {
                                validationData.rowIndex = rowIndex
                            }
                            rowIndex++
                        }
                    }))
                },
                _getValidationGroupsInForm: function(detailOptions) {
                    var validatingController = this.getController("validating");
                    var validationData = validatingController._getValidationData(detailOptions.key, true);
                    return {
                        validationGroup: validationData
                    }
                },
                _validateEditFormAfterUpdate: function(row, isCustomSetCellValue) {
                    if (isCustomSetCellValue && this._editForm) {
                        this._editForm.validate()
                    }
                    this.callBase.apply(this, arguments)
                },
                _prepareEditCell: function(params) {
                    var isNotCanceled = this.callBase.apply(this, arguments);
                    var validatingController = this.getController("validating");
                    if (isNotCanceled && params.column.showEditorAlways) {
                        validatingController.updateValidationState({
                            key: params.key
                        })
                    }
                    return isNotCanceled
                },
                processItems: function(items, changeType) {
                    var _this5 = this;
                    var changes = this.getChanges();
                    var dataController = this.getController("data");
                    var validatingController = this.getController("validating");
                    items = this.callBase(items, changeType);
                    var itemsCount = items.length;
                    var addInValidItem = function(change, validationData) {
                        var data = {
                            key: change.key
                        };
                        var index = function(change, items) {
                            var index = -1;
                            var isInsert = change.type === EDIT_DATA_INSERT_TYPE;
                            var key = change.key;
                            (0, _iterator.each)(items, (function(i, item) {
                                if ((0, _common.equalByValue)(key, isInsert ? item.key : dataController.keyOf(item))) {
                                    index = i;
                                    return false
                                }
                                return
                            }));
                            return index
                        }(change, items);
                        if (index >= 0) {
                            return
                        }
                        validationData.rowIndex = validationData.rowIndex > itemsCount ? validationData.rowIndex % itemsCount : validationData.rowIndex;
                        var rowIndex = validationData.rowIndex;
                        data[INSERT_INDEX] = 1;
                        items.splice(rowIndex, 0, data)
                    };
                    if (this.getEditMode() === EDIT_MODE_BATCH && "prepend" !== changeType && "append" !== changeType) {
                        changes.forEach((function(change) {
                            var key = change.key;
                            var validationData = validatingController._getValidationData(key);
                            if (validationData && change.type && validationData.pageIndex === _this5._pageIndex && (null === change || void 0 === change ? void 0 : change.pageIndex) !== _this5._pageIndex) {
                                addInValidItem(change, validationData)
                            }
                        }))
                    }
                    return items
                },
                processDataItem: function(item) {
                    var isInserted = item.data[INSERT_INDEX];
                    var key = isInserted ? item.data.key : item.key;
                    var editMode = this.getEditMode();
                    if (editMode === EDIT_MODE_BATCH && isInserted && key) {
                        var changes = this.getChanges();
                        var editIndex = _m_utils.default.getIndexByKey(key, changes);
                        if (editIndex >= 0) {
                            var change = changes[editIndex];
                            if (change.type !== EDIT_DATA_INSERT_TYPE) {
                                var oldData = this._getOldData(change.key);
                                item.data = (0, _extend.extend)(true, {}, oldData, change.data);
                                item.key = key
                            }
                        }
                    }
                    this.callBase.apply(this, arguments)
                },
                _createInvisibleColumnValidators: function(changes) {
                    var _this6 = this;
                    var that = this;
                    var validatingController = this.getController("validating");
                    var columnsController = this.getController("columns");
                    var columns = columnsController.getColumns();
                    var invisibleColumns = columnsController.getInvisibleColumns().filter((function(column) {
                        return !column.isBand
                    }));
                    var groupColumns = columnsController.getGroupColumns().filter((function(column) {
                        return !column.showWhenGrouped && -1 === invisibleColumns.indexOf(column)
                    }));
                    var invisibleColumnValidators = [];
                    invisibleColumns.push.apply(invisibleColumns, _toConsumableArray(groupColumns));
                    if (!FORM_BASED_MODES.includes(this.getEditMode())) {
                        (0, _iterator.each)(columns, (function(_, column) {
                            changes.forEach((function(change) {
                                var data;
                                if (function(column, rowKey) {
                                        return _this6._dataController.getRowIndexByKey(rowKey) >= 0 && invisibleColumns.indexOf(column) < 0
                                    }(column, change.key)) {
                                    return
                                }
                                if (change.type === EDIT_DATA_INSERT_TYPE) {
                                    data = change.data
                                } else if ("update" === change.type) {
                                    var oldData = that._getOldData(change.key);
                                    if (!(0, _type.isDefined)(oldData)) {
                                        return
                                    }
                                    data = (0, _array_utils.createObjectWithChanges)(oldData, change.data)
                                }
                                if (data) {
                                    var validator = validatingController.createValidator({
                                        column: column,
                                        key: change.key,
                                        value: column.calculateCellValue(data)
                                    });
                                    if (validator) {
                                        invisibleColumnValidators.push(validator)
                                    }
                                }
                            }))
                        }))
                    }
                    return function() {
                        invisibleColumnValidators.forEach((function(validator) {
                            validator.dispose()
                        }))
                    }
                },
                _beforeSaveEditData: function(change, editIndex) {
                    var _this7 = this;
                    var result = this.callBase.apply(this, arguments);
                    var validatingController = this.getController("validating");
                    var validationData = validatingController._getValidationData(null === change || void 0 === change ? void 0 : change.key);
                    if (change) {
                        var isValid = "remove" === change.type || validationData.isValid;
                        result = result || !isValid
                    } else {
                        var disposeValidators = this._createInvisibleColumnValidators(this.getChanges());
                        result = new _deferred.Deferred;
                        this.executeOperation(result, (function() {
                            validatingController.validate(true).done((function(isFullValid) {
                                disposeValidators();
                                _this7._updateRowAndPageIndices();
                                switch (_this7.getEditMode()) {
                                    case EDIT_MODE_CELL:
                                        if (!isFullValid) {
                                            _this7._focusEditingCell()
                                        }
                                        break;
                                    case EDIT_MODE_BATCH:
                                        if (!isFullValid) {
                                            _this7._resetEditRowKey();
                                            _this7._resetEditColumnName();
                                            _this7.getController("data").updateItems()
                                        }
                                }
                                result.resolve(!isFullValid)
                            }))
                        }))
                    }
                    return result.promise ? result.promise() : result
                },
                _beforeEditCell: function(rowIndex, columnIndex, item) {
                    var result = this.callBase(rowIndex, columnIndex, item);
                    if (this.getEditMode() === EDIT_MODE_CELL) {
                        var $cell = this._rowsView._getCellElement(rowIndex, columnIndex);
                        var validator = $cell && $cell.data("dxValidator");
                        var rowOptions = $cell && $cell.closest(".dx-row").data("options");
                        var value = validator && validator.option("adapter").getValue();
                        if (validator && cellValueShouldBeValidated(value, rowOptions)) {
                            var validatingController = this.getController("validating");
                            var deferred = new _deferred.Deferred;
                            (0, _deferred.when)(validatingController.validateCell(validator), result).done((function(validationResult, result) {
                                deferred.resolve(validationResult.status === VALIDATION_STATUS.valid && result)
                            }));
                            return deferred.promise()
                        }
                        if (!validator) {
                            return result
                        }
                    }
                },
                _afterSaveEditData: function(cancel) {
                    var _this8 = this;
                    var $firstErrorRow;
                    var isCellEditMode = this.getEditMode() === EDIT_MODE_CELL;
                    (0, _iterator.each)(this.getChanges(), (function(_, change) {
                        var $errorRow = _this8._showErrorRow(change);
                        $firstErrorRow = $firstErrorRow || $errorRow
                    }));
                    if ($firstErrorRow) {
                        var scrollable = this._rowsView.getScrollable();
                        if (scrollable) {
                            scrollable.update();
                            scrollable.scrollToElement($firstErrorRow)
                        }
                    }
                    if (cancel && isCellEditMode && this._needUpdateRow()) {
                        var editRowIndex = this.getEditRowIndex();
                        this._dataController.updateItems({
                            changeType: "update",
                            rowIndices: [editRowIndex]
                        });
                        this._focusEditingCell()
                    } else if (!cancel) {
                        var shouldResetValidationState = true;
                        if (isCellEditMode) {
                            var columns = this.getController("columns").getColumns();
                            var columnsWithValidatingEditors = columns.filter((function(col) {
                                var _a;
                                return col.showEditorAlways && (null === (_a = col.validationRules) || void 0 === _a ? void 0 : _a.length) > 0
                            })).length > 0;
                            shouldResetValidationState = !columnsWithValidatingEditors
                        }
                        if (shouldResetValidationState) {
                            this.getController("validating").initValidationState()
                        }
                    }
                },
                _handleDataChanged: function(args) {
                    var validationState = this.getController("validating")._validationState;
                    if ("standard" === this.option("scrolling.mode")) {
                        this.resetRowAndPageIndices()
                    }
                    if ("prepend" === args.changeType) {
                        (0, _iterator.each)(validationState, (function(_, validationData) {
                            validationData.rowIndex += args.items.length
                        }))
                    }
                    this.callBase(args)
                },
                resetRowAndPageIndices: function() {
                    var _this9 = this;
                    var validationState = this.getController("validating")._validationState;
                    (0, _iterator.each)(validationState, (function(_, validationData) {
                        if (validationData.pageIndex !== _this9._pageIndex) {
                            delete validationData.pageIndex;
                            delete validationData.rowIndex
                        }
                    }))
                },
                _beforeCancelEditData: function() {
                    this.getController("validating").initValidationState();
                    this.callBase()
                },
                _showErrorRow: function(change) {
                    var $popupContent;
                    var errorHandling = this.getController("errorHandling");
                    var items = this.getController("data").items();
                    var rowIndex = this.getIndexByKey(change.key, items);
                    var validationData = this.getController("validating")._getValidationData(change.key);
                    if (!(null === validationData || void 0 === validationData ? void 0 : validationData.isValid) && (null === validationData || void 0 === validationData ? void 0 : validationData.errorText) && rowIndex >= 0) {
                        $popupContent = this.getPopupContent();
                        return errorHandling && errorHandling.renderErrorRow(null === validationData || void 0 === validationData ? void 0 : validationData.errorText, rowIndex, $popupContent)
                    }
                },
                updateFieldValue: function(e) {
                    var _this10 = this;
                    var validatingController = this.getController("validating");
                    var deferred = new _deferred.Deferred;
                    validatingController.removeCellValidationResult({
                        change: this.getChangeByKey(e.key),
                        columnIndex: e.column.index
                    });
                    this.callBase.apply(this, arguments).done((function() {
                        var currentValidator = validatingController.getCellValidator({
                            rowKey: e.key,
                            columnIndex: e.column.index
                        });
                        (0, _deferred.when)(currentValidator && validatingController.validateCell(currentValidator)).done((function(validationResult) {
                            _this10.getController("editorFactory").refocus();
                            deferred.resolve(validationResult)
                        }))
                    }));
                    return deferred.promise()
                },
                highlightDataCell: function($cell, parameters) {
                    this.callBase.apply(this, arguments);
                    var validatingController = this.getController("validating");
                    validatingController.setCellValidationStatus(parameters);
                    var isEditableCell = !!parameters.setValue;
                    var cellModified = this.isCellModified(parameters);
                    var isValidated = (0, _type.isDefined)(parameters.validationStatus);
                    var needValidation = cellModified && parameters.column.setCellValue || isEditableCell && !cellModified && !(parameters.row.isNewRow || !isValidated);
                    if (needValidation) {
                        var validator = $cell.data("dxValidator");
                        if (validator) {
                            (0, _deferred.when)(this.getController("validating").validateCell(validator)).done((function() {
                                validatingController.setCellValidationStatus(parameters)
                            }))
                        }
                    }
                },
                getChangeByKey: function(key) {
                    var changes = this.getChanges();
                    return changes[_m_utils.default.getIndexByKey(key, changes)]
                },
                isCellModified: function(parameters) {
                    var cellModified = this.callBase(parameters);
                    var change = this.getChangeByKey(parameters.key);
                    var isCellInvalid = !!parameters.row && this.getController("validating").isInvalidCell({
                        rowKey: parameters.key,
                        columnIndex: parameters.column.index
                    });
                    return cellModified || this.getController("validating")._rowIsValidated(change) && isCellInvalid
                }
            },
            editorFactory: {
                _showRevertButton: function($container) {
                    var _this11 = this;
                    var _a;
                    var $tooltipElement = null === (_a = this._revertTooltip) || void 0 === _a ? void 0 : _a.$element();
                    if (!$container || !$container.length) {
                        null === $tooltipElement || void 0 === $tooltipElement ? void 0 : $tooltipElement.remove();
                        this._revertTooltip = void 0;
                        return
                    }
                    if ($container.find($tooltipElement).length) {
                        return
                    }
                    var $overlayContainer = $container.closest(".".concat(this.addWidgetPrefix(CONTENT_CLASS)));
                    var revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
                    null === $tooltipElement || void 0 === $tooltipElement ? void 0 : $tooltipElement.remove();
                    $tooltipElement = (0, _renderer.default)("<div>").addClass(revertTooltipClass).appendTo($container);
                    var tooltipOptions = {
                        animation: null,
                        visible: true,
                        width: "auto",
                        height: "auto",
                        shading: false,
                        container: $overlayContainer,
                        propagateOutsideClick: true,
                        hideOnOutsideClick: false,
                        wrapperAttr: {
                            class: revertTooltipClass
                        },
                        contentTemplate: function() {
                            var $buttonElement = (0, _renderer.default)("<div>").addClass(REVERT_BUTTON_CLASS);
                            var buttonOptions = {
                                icon: "revert",
                                hint: _this11.option("editing.texts.validationCancelChanges"),
                                onClick: function() {
                                    _this11._editingController.cancelEditData()
                                }
                            };
                            return new _button.default($buttonElement, buttonOptions).$element()
                        },
                        position: {
                            my: "left top",
                            at: "right top",
                            offset: "1 0",
                            collision: "flip",
                            boundaryOffset: "0 0",
                            boundary: this._rowsView.element(),
                            of: $container
                        },
                        onPositioned: this._positionedHandler.bind(this)
                    };
                    this._revertTooltip = new _ui.default($tooltipElement, tooltipOptions)
                },
                _hideFixedGroupCell: function($cell, overlayOptions) {
                    var $nextFixedRowElement;
                    var $groupCellElement;
                    var isFixedColumns = this._rowsView.isFixedColumns();
                    var isFormOrPopupEditMode = this._editingController.isFormOrPopupEditMode();
                    if (isFixedColumns && !isFormOrPopupEditMode) {
                        var nextRowOptions = $cell.closest(".dx-row").next().data("options");
                        if (nextRowOptions && "group" === nextRowOptions.rowType) {
                            $nextFixedRowElement = (0, _renderer.default)(this._rowsView.getRowElement(nextRowOptions.rowIndex)).last();
                            $groupCellElement = $nextFixedRowElement.find(".".concat(GROUP_CELL_CLASS));
                            if ($groupCellElement.length && "hidden" !== $groupCellElement.get(0).style.visibility) {
                                $groupCellElement.css("visibility", "hidden");
                                overlayOptions.onDisposing = function() {
                                    $groupCellElement.css("visibility", "")
                                }
                            }
                        }
                    }
                },
                _positionedHandler: function(e, isOverlayVisible) {
                    if (!e.component.__skipPositionProcessing) {
                        var isRevertButton = (0, _renderer.default)(e.element).hasClass(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS));
                        var needRepaint = !isRevertButton && this._rowsView.updateFreeSpaceRowHeight();
                        var normalizedPosition = this._normalizeValidationMessagePositionAndMaxWidth(e, isRevertButton, isOverlayVisible);
                        e.component.__skipPositionProcessing = !!(needRepaint || normalizedPosition);
                        if (normalizedPosition) {
                            e.component.option(normalizedPosition)
                        } else if (needRepaint) {
                            e.component.repaint()
                        }
                    }
                },
                _showValidationMessage: function($cell, messages, alignment) {
                    var _this12 = this;
                    var _a;
                    var editorPopup = $cell.find(".dx-dropdowneditor-overlay").data("dxPopup");
                    var isOverlayVisible = editorPopup && editorPopup.option("visible");
                    var myPosition = isOverlayVisible ? "top right" : "top ".concat(alignment);
                    var atPosition = isOverlayVisible ? "top left" : "bottom ".concat(alignment);
                    var hasFixedColumns = (null === (_a = this._columnsController.getFixedColumns()) || void 0 === _a ? void 0 : _a.length) > 0;
                    var $overlayContainer = hasFixedColumns ? this.getView("rowsView").element() : $cell.closest(".".concat(this.addWidgetPrefix(CONTENT_CLASS)));
                    var errorMessageText = "";
                    messages && messages.forEach((function(message) {
                        errorMessageText += (errorMessageText.length ? "<br/>" : "") + (0, _string.encodeHtml)(message)
                    }));
                    var invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
                    this._rowsView.element().find(".".concat(invalidMessageClass)).remove();
                    var $overlayElement = (0, _renderer.default)("<div>").addClass(INVALID_MESSAGE_CLASS).addClass(INVALID_MESSAGE_ALWAYS_CLASS).addClass(invalidMessageClass).html(errorMessageText).appendTo($cell);
                    var overlayOptions = {
                        container: $overlayContainer,
                        shading: false,
                        width: "auto",
                        height: "auto",
                        visible: true,
                        animation: false,
                        propagateOutsideClick: true,
                        hideOnOutsideClick: false,
                        wrapperAttr: {
                            class: "".concat(INVALID_MESSAGE_CLASS, " ").concat(INVALID_MESSAGE_ALWAYS_CLASS, " ").concat(invalidMessageClass)
                        },
                        position: {
                            collision: "flip",
                            boundary: this._rowsView.element(),
                            boundaryOffset: "0 0",
                            offset: {
                                x: 0,
                                y: !isOverlayVisible && _browser.default.mozilla ? -1 : 0
                            },
                            my: myPosition,
                            at: atPosition,
                            of: $cell
                        },
                        onPositioned: function(e) {
                            _this12._positionedHandler(e, isOverlayVisible);
                            _this12._shiftValidationMessageIfNeed(e.component.$content(), $cell)
                        }
                    };
                    this._hideFixedGroupCell($cell, overlayOptions);
                    new _ui.default($overlayElement, overlayOptions)
                },
                _hideValidationMessage: function() {
                    var _a;
                    var validationMessages = null === (_a = this._rowsView.element()) || void 0 === _a ? void 0 : _a.find(this._getValidationMessagesSelector());
                    null === validationMessages || void 0 === validationMessages ? void 0 : validationMessages.remove()
                },
                _normalizeValidationMessagePositionAndMaxWidth: function(options, isRevertButton, isOverlayVisible) {
                    var fixedColumns = this._columnsController.getFixedColumns();
                    if (!fixedColumns || !fixedColumns.length) {
                        return
                    }
                    var position;
                    var visibleTableWidth = !isRevertButton && (that = this, element = options.element, rowIndex = (0, _renderer.default)(element).closest("tr").index(), $cellElements = (0, _renderer.default)(that._rowsView.getRowElement(rowIndex)).first().children().filter(":not(.dx-hidden-cell)"), that._rowsView._getWidths($cellElements).reduce((function(w1, w2) {
                        return w1 + w2
                    }), 0));
                    var that, element, rowIndex, $cellElements;
                    var $overlayContentElement = options.component.$content();
                    var validationMessageWidth = (0, _size.getOuterWidth)($overlayContentElement, true);
                    var needMaxWidth = !isRevertButton && validationMessageWidth > visibleTableWidth;
                    var columnIndex = this._rowsView.getCellIndex((0, _renderer.default)(options.element).closest("td"));
                    var boundaryNonFixedColumnsInfo = function(fixedColumns) {
                        var firstNonFixedColumnIndex;
                        var lastNonFixedColumnIndex;
                        fixedColumns.some((function(column, index) {
                            if (column.command === COMMAND_TRANSPARENT) {
                                firstNonFixedColumnIndex = 0 === index ? -1 : index;
                                lastNonFixedColumnIndex = index === fixedColumns.length - 1 ? -1 : index + column.colspan - 1;
                                return true
                            }
                            return
                        }));
                        return {
                            startColumnIndex: firstNonFixedColumnIndex,
                            endColumnIndex: lastNonFixedColumnIndex
                        }
                    }(fixedColumns);
                    if (!isRevertButton && (columnIndex === boundaryNonFixedColumnsInfo.startColumnIndex || needMaxWidth)) {
                        position = {
                            collision: "none flip",
                            my: "top left",
                            at: isOverlayVisible ? "top right" : "bottom left"
                        }
                    } else if (columnIndex === boundaryNonFixedColumnsInfo.endColumnIndex) {
                        position = {
                            collision: "none flip",
                            my: "top right",
                            at: isRevertButton || isOverlayVisible ? "top left" : "bottom right"
                        };
                        if (isRevertButton) {
                            position.offset = "-1 0"
                        }
                    }
                    return position && {
                        position: position,
                        maxWidth: needMaxWidth ? visibleTableWidth - 2 : void 0
                    }
                },
                _shiftValidationMessageIfNeed: function($content, $cell) {
                    var $revertContent = this._revertTooltip && this._revertTooltip.$content();
                    if (!$revertContent) {
                        return
                    }
                    var contentOffset = $content.offset();
                    var revertContentOffset = $revertContent.offset();
                    if (contentOffset.top === revertContentOffset.top && contentOffset.left + (0, _size.getWidth)($content) > revertContentOffset.left) {
                        var left = (0, _size.getWidth)($revertContent) + PADDING_BETWEEN_TOOLTIPS;
                        $content.css("left", revertContentOffset.left < $cell.offset().left ? -left : left)
                    }
                },
                _getRevertTooltipsSelector: function() {
                    var revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
                    return ".dx-editor-cell .".concat(revertTooltipClass)
                },
                _getValidationMessagesSelector: function() {
                    var invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
                    return ".dx-editor-cell .".concat(invalidMessageClass, ", .dx-cell-modified .").concat(invalidMessageClass)
                },
                init: function() {
                    this.callBase();
                    this._editingController = this.getController("editing");
                    this._columnsController = this.getController("columns");
                    this._rowsView = this.getView("rowsView")
                },
                loseFocus: function(skipValidator) {
                    if (!skipValidator) {
                        this.getController("validating").setValidator(null)
                    }
                    this.callBase()
                },
                updateCellState: function($element, validationResult, isHideBorder) {
                    var _a;
                    var $focus = null === $element || void 0 === $element ? void 0 : $element.closest(this._getFocusCellSelector());
                    var $cell = (null === $focus || void 0 === $focus ? void 0 : $focus.is("td")) ? $focus : null;
                    var rowOptions = null === $focus || void 0 === $focus ? void 0 : $focus.closest(".dx-row").data("options");
                    var change = rowOptions ? this.getController("editing").getChangeByKey(rowOptions.key) : null;
                    var column = $cell && this.getController("columns").getVisibleColumns()[$cell.index()];
                    var isCellModified = void 0 !== (null === (_a = null === change || void 0 === change ? void 0 : change.data) || void 0 === _a ? void 0 : _a[null === column || void 0 === column ? void 0 : column.name]) && !this._editingController.isSaving();
                    if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
                        if ((null === validationResult || void 0 === validationResult ? void 0 : validationResult.status) === VALIDATION_STATUS.invalid || isCellModified) {
                            this._showRevertButton($focus)
                        } else {
                            this._revertTooltip && this._revertTooltip.$element().remove()
                        }
                    }
                    var showValidationMessage = validationResult && validationResult.status === VALIDATION_STATUS.invalid;
                    if (showValidationMessage && $cell && column && validationResult && validationResult.brokenRules) {
                        var errorMessages = [];
                        validationResult.brokenRules.forEach((function(rule) {
                            if (rule.message) {
                                errorMessages.push(rule.message)
                            }
                        }));
                        if (errorMessages.length) {
                            this._showValidationMessage($focus, errorMessages, column.alignment || "left")
                        }
                    }!isHideBorder && this._rowsView.element() && this._rowsView.updateFreeSpaceRowHeight()
                },
                focus: function($element, isHideBorder) {
                    var _this13 = this;
                    if (!arguments.length) {
                        return this.callBase()
                    }
                    this._hideValidationMessage();
                    if ((null === $element || void 0 === $element ? void 0 : $element.hasClass("dx-row")) || (null === $element || void 0 === $element ? void 0 : $element.hasClass("dx-master-detail-cell"))) {
                        return this.callBase($element, isHideBorder)
                    }
                    var $focus = null === $element || void 0 === $element ? void 0 : $element.closest(this._getFocusCellSelector());
                    var callBase = this.callBase;
                    var validator = $focus && ($focus.data("dxValidator") || $element.find(".".concat(this.addWidgetPrefix(VALIDATOR_CLASS))).eq(0).data("dxValidator"));
                    var rowOptions = $focus && $focus.closest(".dx-row").data("options");
                    var editingController = this.getController("editing");
                    var change = rowOptions ? editingController.getChangeByKey(rowOptions.key) : null;
                    var validatingController = this.getController("validating");
                    var validationResult;
                    if (validator) {
                        validatingController.setValidator(validator);
                        var value = validator.option("adapter").getValue();
                        if (cellValueShouldBeValidated(value, rowOptions) || validatingController._rowIsValidated(change)) {
                            editingController.waitForDeferredOperations().done((function() {
                                (0, _deferred.when)(validatingController.validateCell(validator)).done((function(result) {
                                    validationResult = result;
                                    var _validationResult$val = validationResult.validator.option("dataGetter")(),
                                        column = _validationResult$val.column;
                                    if (change && column && !validatingController.isCurrentValidatorProcessing({
                                            rowKey: change.key,
                                            columnIndex: column.index
                                        })) {
                                        return
                                    }
                                    if (validationResult.status === VALIDATION_STATUS.invalid) {
                                        isHideBorder = true
                                    }
                                    _this13.updateCellState($element, validationResult, isHideBorder);
                                    callBase.call(_this13, $element, isHideBorder)
                                }))
                            }));
                            return this.callBase($element, isHideBorder)
                        }
                    }
                    this.updateCellState($element, validationResult, isHideBorder);
                    return this.callBase($element, isHideBorder)
                },
                getEditorInstance: function($container) {
                    var $editor = $container.find(".dx-texteditor").eq(0);
                    return _m_utils.default.getWidgetInstance($editor)
                }
            },
            data: {
                _getValidationStatus: function(validationResult) {
                    var validationStatus = validationResultIsValid(validationResult) ? validationResult.status : validationResult;
                    return validationStatus || VALIDATION_STATUS.valid
                },
                _isCellChanged: function(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
                    var _a, _b;
                    var cell = null === (_a = oldRow.cells) || void 0 === _a ? void 0 : _a[columnIndex];
                    var oldValidationStatus = this._getValidationStatus({
                        status: null === cell || void 0 === cell ? void 0 : cell.validationStatus
                    });
                    var validatingController = this.getController("validating");
                    var validationResult = validatingController.getCellValidationResult({
                        rowKey: oldRow.key,
                        columnIndex: columnIndex
                    });
                    var validationData = validatingController._getValidationData(oldRow.key);
                    var newValidationStatus = this._getValidationStatus(validationResult);
                    var rowIsModified = JSON.stringify(newRow.modifiedValues) !== JSON.stringify(oldRow.modifiedValues);
                    var validationStatusChanged = oldValidationStatus !== newValidationStatus && rowIsModified;
                    var cellIsMarkedAsInvalid = (0, _renderer.default)(null === cell || void 0 === cell ? void 0 : cell.cellElement).hasClass(this.addWidgetPrefix(INVALIDATE_CLASS));
                    var hasValidationRules = null === (_b = null === cell || void 0 === cell ? void 0 : cell.column.validationRules) || void 0 === _b ? void 0 : _b.length;
                    var rowEditStateChanged = oldRow.isEditing !== newRow.isEditing && hasValidationRules;
                    var cellValidationStateChanged = validationStatusChanged || validationData.isValid && cellIsMarkedAsInvalid;
                    if (rowEditStateChanged || cellValidationStateChanged) {
                        return true
                    }
                    return this.callBase.apply(this, arguments)
                }
            }
        },
        views: {
            rowsView: {
                updateFreeSpaceRowHeight: function($table) {
                    var $rowElements;
                    var $freeSpaceRowElement;
                    var $freeSpaceRowElements;
                    var $element = this.element();
                    var $tooltipContent = $element && $element.find(".".concat(this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS), " .dx-overlay-content"));
                    this.callBase($table);
                    if ($tooltipContent && $tooltipContent.length) {
                        $rowElements = this._getRowElements();
                        $freeSpaceRowElements = this._getFreeSpaceRowElements($table);
                        $freeSpaceRowElement = $freeSpaceRowElements.first();
                        if ($freeSpaceRowElement && 1 === $rowElements.length && (!$freeSpaceRowElement.is(":visible") || (0, _size.getOuterHeight)($tooltipContent) > (0, _size.getOuterHeight)($freeSpaceRowElement))) {
                            $freeSpaceRowElements.show();
                            (0, _size.setHeight)($freeSpaceRowElements, (0, _size.getOuterHeight)($tooltipContent));
                            return true
                        }
                    }
                    return
                },
                _formItemPrepared: function(cellOptions, $container) {
                    var _this14 = this;
                    this.callBase.apply(this, arguments);
                    (0, _common.deferUpdate)((function() {
                        var $editor = $container.find(".dx-widget").first();
                        var isEditorDisposed = $editor.length && !$editor.children().length;
                        if (!isEditorDisposed) {
                            _this14.getController("validating").createValidator(cellOptions, $editor)
                        }
                    }))
                },
                _cellPrepared: function($cell, parameters) {
                    if (!this.getController("editing").isFormOrPopupEditMode()) {
                        this.getController("validating").createValidator(parameters, $cell)
                    }
                    this.callBase.apply(this, arguments)
                },
                _restoreErrorRow: function(contentTable) {
                    var editingController = this.getController("editing");
                    editingController && editingController.hasChanges() && this._getRowElements(contentTable).each((function(_, item) {
                        var rowOptions = (0, _renderer.default)(item).data("options");
                        if (rowOptions) {
                            var change = editingController.getChangeByKey(rowOptions.key);
                            change && editingController._showErrorRow(change)
                        }
                    }))
                }
            }
        }
    }
};
exports.validatingModule = validatingModule;
