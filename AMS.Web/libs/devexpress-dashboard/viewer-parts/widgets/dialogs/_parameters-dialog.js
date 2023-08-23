﻿/**
* DevExpress Dashboard (_parameters-dialog.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterEntity = exports.parametersDialog = exports.parameterTypes = void 0;
const data_source_1 = require("devextreme/data/data_source");
require("devextreme/ui/check_box");
const check_box_1 = require("devextreme/ui/check_box");
const data_grid_1 = require("devextreme/ui/data_grid");
const date_box_1 = require("devextreme/ui/date_box");
const number_box_1 = require("devextreme/ui/number_box");
const select_box_1 = require("devextreme/ui/select_box");
const tag_box_1 = require("devextreme/ui/tag_box");
const text_box_1 = require("devextreme/ui/text_box");
const themes_1 = require("devextreme/ui/themes");
const $ = require("jquery");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _constants_1 = require("../../../styles/_constants");
const _dashboard_layout_mode_helper_1 = require("../../_dashboard-layout-mode-helper");
const _dialog_form_1 = require("./_dialog-form");
const genericParametersDialogSizes = {
    fakeElementsHeight: 172,
    fakeParametersDialogGridRowHeight: 34,
};
var dialogClasses = {
    allowNullCheckBox: 'dx-parameter-allownull-checkbox',
    allowNullCheckBoxSize: 'dx-datagrid-checkbox-size',
    valueEditor: 'dx-parameter-value-editor',
    multiselectValuePart: 'dx-dashboard-dialog-parameters-tag',
    theme: 'dx-dashboard-theme',
};
exports.parameterTypes = {
    string: 'String',
    int: 'Int',
    float: 'Float',
    bool: 'Bool',
    dateTime: 'DateTime',
    selector: 'Selector',
    multiselector: 'Multiselector',
    guid: 'Guid'
};
class parametersDialog {
    constructor(options) {
        this.valueChanged = _jquery_helpers_1.createJQueryCallbacks();
        this.options = options;
        if (this.options.getParametersCollection) {
            this.getParametersCollection = this.options.getParametersCollection;
        }
        if (this.options.submitParameters) {
            this.submitParameters = this.options.submitParameters;
        }
        this._initialize();
    }
    _initialize() {
        var that = this, options = that.options, numberOfParameters = that.getParametersCollection().getVisibleParameters().length, scroll = numberOfParameters > 8, allowNullColumn = that.allowNullColumn(), submitParameters = that.submitParameters, parameterEntities = [];
        let notScrollHeight = themes_1.default.isMaterial(themes_1.default.current()) ?
            _constants_1.devExtremeConstants.materialPopupToolbarHeight + _constants_1.devExtremeConstants.dxPopupTitleBorderBottom + 2 * _constants_1.devExtremeConstants.dxDatagridHeadersBorder +
                _constants_1.dashboardConstants.materialParametersDialogFormPaddingTop +
                _constants_1.devExtremeConstants.materialGridBaseHeaderHeight + _constants_1.devExtremeConstants.dxDatagridHeadersBorder +
                numberOfParameters * (_constants_1.devExtremeConstants.materialGridBaseCellHeight + _constants_1.devExtremeConstants.materialGridBaseRowBorder) +
                _constants_1.dashboardConstants.materialParametersDialogFormPaddingBottom +
                _constants_1.devExtremeConstants.materialPopupContentPadding * 2 + _constants_1.devExtremeConstants.materialButtonHeight
            :
                (numberOfParameters + 1) * genericParametersDialogSizes.fakeParametersDialogGridRowHeight + genericParametersDialogSizes.fakeElementsHeight;
        that.dialogForm = new _dialog_form_1.dialogForm({
            title: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ParametersFormCaption),
            fullScreenMode: options.fullScreenMode,
            dialogContainer: options.parametersDialogContainer,
            width: allowNullColumn ? _dialog_form_1.dialogSizes.width : _dialog_form_1.dialogSizes.minWidth,
            height: scroll ? _dialog_form_1.dialogSizes.height : notScrollHeight,
            allowScrolling: false,
            deferredRendering: false,
            onShowing: options.onShowing,
            onShown: options.onShown,
            onHidden: options.onHidden,
            buttons: [{
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonReset), func: () => that.resetParameterValues()
                }, {
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonSubmit), hide: true, func: () => that.submitParameterValues(), isDefault: true
                }, {
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonCancel), hide: true, func: () => { }
                }],
            renderContent: (controlCreationCallbacks) => {
                var parametersForm = document.createElement('div');
                parametersForm.classList.add(_dialog_form_1.dialogClasses.form);
                this._dataGrid = that._generateContent(parametersForm, controlCreationCallbacks);
                return parametersForm;
            },
            disposeContent: () => {
                this._disposeGrid();
            },
            setActualState: function () {
                that.setActualState();
            }
        });
    }
    _disposeGrid() {
        if (this._dataGrid) {
            this._dataGrid.option('dataSource').forEach(entry => entry.dispose());
            this._dataGrid.dispose();
        }
    }
    appendNullGridColumn(gridColumns) {
        if (this.allowNullColumn())
            gridColumns.push(this.createNullColumn());
    }
    allowNullColumn() {
        var allowNullValues;
        this.getParametersCollection().getVisibleParameters().forEach(parameter => {
            if (parameter.getAllowNull())
                allowNullValues = true;
        });
        return allowNullValues;
    }
    createNullColumn() {
        return {
            dataField: 'fakeDataField_divAllowNull',
            caption: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ParametersFormAllowNullColumnCaption),
            width: '20%',
            alignment: 'center',
            allowEditing: false,
            cellTemplate: function (container, options) {
                let entity = options.data;
                _jquery_helpers_1.$unwrap(container).appendChild(_jquery_helpers_1.$unwrap(entity.divAllowNull));
            }
        };
    }
    createGridColumns() {
        let allowNullColumn = this.allowNullColumn();
        let gridColumns = [{
                dataField: 'description',
                caption: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ParametersFormNameColumnCaption),
                dataType: 'string',
                width: allowNullColumn ? '40%' : '50%',
                allowEditing: false
            }, {
                dataField: 'fakeDataField_divValueEditor',
                caption: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ParametersFormValueColumnCaption),
                width: allowNullColumn ? '40%' : '50%',
                cssClass: 'dx-parameter-value-editor',
                showEditorAlways: true,
                editCellTemplate: (cellElement, cellInfo) => {
                    _jquery_helpers_1.$unwrap(cellElement).appendChild(_jquery_helpers_1.$unwrap(cellInfo.data.divValueEditor));
                }
            }];
        this.appendNullGridColumn(gridColumns);
        return gridColumns;
    }
    _generateContent(element, controlCreationCallbacks, subscribeValueChanged = false) {
        var that = this, parameterEntities = that.getParametersCollection().getVisibleParameters().map(parameter => {
            let parameterEntity = that._getParameterEntity(parameter, controlCreationCallbacks);
            if (subscribeValueChanged) {
                parameterEntity.valueChanged.add((e) => that.valueChanged.fire());
            }
            return parameterEntity;
        });
        this.submitParameterValues = () => {
            that.submitParameters(parameterEntities.map(parameterEntity => parameterEntity.wrapParameter()));
        };
        this.resetParameterValues = () => {
            var parametersCollection = that.getParametersCollection();
            parameterEntities.forEach(parameterEntity => {
                parameterEntity.setValue(parametersCollection.getParameterDefaultValue(parameterEntity.name));
            });
        };
        this.setActualState = () => {
            var parametersCollection = that.getParametersCollection();
            parameterEntities.forEach(parameterEntity => {
                var parameter = parametersCollection.getParameterByName(parameterEntity.name);
                if (parameter) {
                    var lookUpValues = parameter.getLookUpValues();
                    if (lookUpValues !== null)
                        parameterEntity.setLookUpValues(lookUpValues);
                    parameterEntity.setValue(parameter.getValue());
                }
            });
        };
        let gridOptions = {
            dataSource: parameterEntities,
            columns: that.createGridColumns(),
            width: '100%',
            height: '100%',
            showColumnLines: true,
            showRowLines: true,
            allowColumnResizing: true,
            keyExpr: 'name',
            loadPanel: {
                enabled: false
            },
            repaintChangesOnly: true,
            editing: { mode: 'cell', allowUpdating: true, refreshMode: 'repaint' },
            paging: { enabled: false },
            sorting: { mode: 'none' },
            scrolling: {
                mode: 'standard'
            }
        };
        if (themes_1.default.isMaterial(themes_1.default.current())) {
            gridOptions.showBorders = true;
            gridOptions.rowAlternationEnabled = parameterEntities.length > 2;
        }
        return new data_grid_1.default(element, gridOptions);
    }
    generateContent(element, disposeCallback) {
        let controlCreationCallbacks = _jquery_helpers_1.createJQueryCallbacks();
        this._disposeGrid();
        this._dataGrid = this._generateContent(element, controlCreationCallbacks, true);
        let prepareActualValues = (controlCreationCallbacks) => {
            controlCreationCallbacks.fire();
            this.setActualState();
        };
        prepareActualValues(controlCreationCallbacks);
        return {
            grid: this._dataGrid,
            submitParameterValues: () => this.submitParameterValues(),
            resetParameterValues: () => this.resetParameterValues(),
            valueChanged: this.valueChanged,
            dispose: () => {
                this.dispose();
                disposeCallback && disposeCallback();
            }
        };
    }
    show() {
        this.dialogForm.showDialog();
    }
    hide() {
        this.dialogForm.hideDialog();
    }
    dispose() {
        this.dialogForm && this.dialogForm.dispose();
        this._disposeGrid();
    }
    _getParameterEntity(parameter, controlCreationCallbacks) {
        var entityOptions = {
            name: parameter.getName(),
            description: parameter.getDescription(),
            defaultValue: parameter.getDefaultValue(),
            controlCreationCallbacks: controlCreationCallbacks,
            allowNull: parameter.getAllowNull(),
            allowMultiselect: parameter.getAllowMultiselect(),
            type: parameter.getType(),
            value: parameter.getValue()
        };
        if (parameter.getLookUpValues() !== null) {
            if (entityOptions.allowMultiselect) {
                return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new tag_box_1.default(element, {
                        showDropDownButton: true,
                        showSelectionControls: true,
                        selectAllMode: 'allPages',
                        multiline: false,
                        tagTemplate: (data, $element) => {
                            var element = _jquery_helpers_1.$unwrap($element);
                            if (element) {
                                element.innerText = $.fn.constructor(element).is(':first-child') ? data.displayValue : ', ' + data.displayValue;
                                element.classList.add(dialogClasses.multiselectValuePart);
                                return element;
                            }
                            return undefined;
                        },
                        searchEnabled: true,
                        selectAllText: _default_1.getLocalizationById('DashboardStringId.FilterElementShowAllItem'),
                        noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
                        displayExpr: 'displayValue',
                        valueExpr: 'value',
                        searchExpr: 'displayValue',
                        placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.ParametersSelectorText),
                        dropDownOptions: {
                            container: this.options.parametersDialogContainer
                        },
                        onSelectionChanged: e => e.element.title = e.component.option('value').join(', '),
                    }) }));
            }
            else {
                return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new select_box_1.default(element, {
                        searchEnabled: true,
                        selectAllText: _default_1.getLocalizationById('DashboardStringId.FilterElementShowAllItem'),
                        noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
                        encodeNoDataText: true,
                        displayExpr: 'displayValue',
                        valueExpr: 'value',
                        searchExpr: 'displayValue',
                        placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.ParametersSelectorText),
                        dropDownOptions: {
                            container: this.options.parametersDialogContainer
                        }
                    }) }));
            }
        }
        else {
            switch (parameter.getType()) {
                case exports.parameterTypes.string:
                    return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new text_box_1.default(element) }));
                case exports.parameterTypes.int:
                    return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new number_box_1.default(element, {
                            showSpinButtons: true,
                            step: 1
                        }) }));
                case exports.parameterTypes.float:
                    return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new number_box_1.default(element, {
                            showSpinButtons: true,
                            step: 0.1
                        }) }));
                case exports.parameterTypes.bool:
                    return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new check_box_1.default(element) }));
                case exports.parameterTypes.dateTime:
                    return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new date_box_1.default(element, {
                            pickerType: _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isTouch ? 'rollers' : 'calendar',
                            width: '100%',
                            applyButtonText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonOK),
                            cancelButtonText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonCancel),
                            placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.SelectDate),
                            dropDownOptions: {
                                container: this.options.parametersDialogContainer
                            },
                            onPopupInitialized: function (e) {
                                var popup = e.popup;
                                if (popup) {
                                    let todayBtn = {
                                        widget: 'dxButton', toolbar: 'bottom', location: 'center',
                                        options: {
                                            text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ParametersFormCalendarTodayButton),
                                            onClick: function () {
                                                var dateBox = e.component;
                                                if (dateBox) {
                                                    var todate = new Date();
                                                    todate.setHours(0, 0, 0, 0);
                                                    dateBox.option('value', todate);
                                                }
                                            }
                                        }
                                    };
                                    if (_dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isTouch) {
                                        popup.option('toolbarItems').push(todayBtn);
                                    }
                                    else {
                                        popup.option('toolbarItems', [todayBtn]);
                                    }
                                }
                            }
                        }) }));
                case exports.parameterTypes.guid:
                    return new ParameterEntity(Object.assign(Object.assign({}, entityOptions), { valueName: 'value', createControl: (element) => new text_box_1.default(element, {
                            mask: 'hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh',
                            maskRules: { 'h': /[0-9A-Fa-f]/ },
                            useMaskedValue: true
                        }) }));
            }
        }
    }
}
exports.parametersDialog = parametersDialog;
class ParameterEntity {
    constructor(options) {
        this.lookUpValues = [];
        this.valueChanged = _jquery_helpers_1.createJQueryCallbacks();
        this.name = options.name;
        this.type = options.type;
        this.description = options.description ? options.description : this.name;
        this.defaultValue = options.defaultValue;
        this.value = options.value;
        this.lookUpValues = [];
        this.allowNull = options.allowNull;
        this.allowMultiselect = options.allowMultiselect;
        this.createControl = options.createControl;
        this.valueName = options.valueName;
        this.controlCreationCallbacks = options.controlCreationCallbacks;
        this.divValueEditor = document.createElement('div');
        this.divValueEditor.classList.add(dialogClasses.valueEditor);
        this.divValueEditor.classList.add(dialogClasses.valueEditor + '-' + this.type.toLowerCase());
        this.divValueEditor.classList.add(dialogClasses.allowNullCheckBoxSize);
        if (this.allowNull) {
            this.divAllowNull = document.createElement('div');
            this.divAllowNull.classList.add(dialogClasses.allowNullCheckBox);
            this.divAllowNull.classList.add(dialogClasses.allowNullCheckBoxSize);
        }
        else {
            this.divAllowNull = document.createElement('center');
            this.divAllowNull.innerText = 'n/a';
        }
        this._addControl();
    }
    dispose() {
        if (this.allowNullControl) {
            this.allowNullControl.dispose();
        }
        if (this.control) {
            this.control.dispose();
        }
    }
    getValue() {
        if (this.allowNull && this.allowNullControl.option('value') === true)
            return null;
        else
            return this.control.option(this.valueName);
    }
    setValue(value) {
        if (this.allowMultiselect) {
            if ((value === null) || (value === undefined)) {
                value = [];
            }
            else if (!Array.isArray(value)) {
                value = [{ displayValue: value, value: value }];
            }
        }
        this.control.option('value', value);
    }
    setLookUpValues(values) {
        var newValues = [];
        values.forEach(value => {
            newValues.push({
                value: value.getValue(),
                displayValue: value.getDisplayText()
            });
        });
        this.lookUpValues = newValues;
        this.control.option('dataSource', new data_source_1.default(newValues));
    }
    wrapParameter() {
        return {
            Name: this.name,
            Value: this.getValue()
        };
    }
    _addControl() {
        this.controlCreationCallbacks.add((component) => {
            if (!this.control) {
                this.control = this.createControl(this.divValueEditor);
                this.control.option('onValueChanged', this.allowNull ?
                    (e) => {
                        var passNull = this.allowNullControl.option('value'), value = this.control.option('value');
                        if (this.allowMultiselect) {
                            if (passNull === true && value.length > 0)
                                this.allowNullControl.option('value', false);
                            else if (passNull === false && value.length === 0)
                                this.allowNullControl.option('value', true);
                        }
                        else if (passNull === false && value === null)
                            this.allowNullControl.option('value', true);
                        else if (passNull === true && value !== null)
                            this.allowNullControl.option('value', false);
                        this.valueChanged.fire();
                    } :
                    (e) => {
                        this.valueChanged.fire();
                    });
                if (this.allowNull) {
                    this.allowNullControl = new check_box_1.default(this.divAllowNull, {
                        value: this.value === null,
                        onValueChanged: (e) => {
                            var value = this.control.option('value');
                            if (e.value) {
                                this.value = value;
                                if (this.allowMultiselect && value !== [])
                                    this.control.option('value', []);
                                else if (value !== null)
                                    this.control.option('value', null);
                            }
                            else if (value === null || value.length === 0)
                                this.control.option('value', this.value);
                        }
                    });
                }
            }
        });
    }
}
exports.ParameterEntity = ParameterEntity;
