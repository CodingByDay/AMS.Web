﻿/**
* DevExpress Dashboard (_rule-ranges-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleRangesEditor = void 0;
const themes_1 = require("devextreme/ui/themes");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const model_1 = require("../../model");
const color_1 = require("../../model/color");
const _range_info_1 = require("../../model/format-rules/conditions/range/metadata/_range-info");
const range_generator_1 = require("../../model/format-rules/conditions/range/range-generator");
const _format_rules_common_1 = require("../../model/format-rules/metadata/_format-rules-common");
const _style_settings_base_1 = require("../../model/format-rules/style-settings/metadata/_style-settings-base");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _style_settings_adapters_1 = require("./_style-settings-adapters");
const negativeInfinityDisplayText = '-∞';
var dataGridColumnTypes = {
    Text: 'string',
    DateTime: 'date',
    Bool: 'boolean',
    Integer: 'number',
    Float: 'number',
    Double: 'number',
    Decimal: 'number',
    Enum: 'string',
    Custom: 'object',
    Unknown: 'object'
};
class RuleRangesEditor {
    constructor(options) {
        this.selection = ko.observable(null);
        this.value = ko.observableArray([]);
        this.popoverOffset = themes_1.default.isMaterial(themes_1.default.current()) ? '0 -8' : '-8 -8';
        this.closeEditCell = () => {
            this._closeEditCell && this._closeEditCell();
        };
        this._closeEditCell = null;
        this.isGradient = options.condition.isGradient();
        this.appearanceMode = options.appearanceMode;
        this.condition = options.condition;
        this.enableCustomStyles = options.enableCustomStyles;
        this.dataType = this.condition.dataType;
        this.restrictToColor = options.restrictToColor;
        this.isPercent = ko.computed({
            read: () => this.condition.valueType() === 'Percent',
            write: (isPercent) => {
                if (isPercent) {
                    this.condition.setValues(range_generator_1.FormatConditionRangeGenerator.calculateRangePercentValues(this.condition.rangeSet.ranges.peek().length));
                }
            }
        });
        _knockout_utils_1.safeComputed({ valueType: this.condition.valueType }, () => {
            this._updateValue();
            this.updateRangeValues(this.isPercent());
        });
        this.condition.rangeSet.ranges.subscribe(() => this._updateValue(), null, 'arrayChange');
        if (this.condition.rangeSet.ranges()[0].styleSettings() instanceof model_1.IconSettings && themes_1.default.isMaterial(themes_1.default.current())) {
            this.popoverOffset = '12 -8';
        }
    }
    updateRangeValues(isPercent) {
        const valueType = isPercent ? 'System.Double' : _format_rules_common_1.fieldTypes[this.dataType()];
        this.condition.rangeSet.ranges().forEach((rangeInfo) => rangeInfo.value.setValue(RuleRangesEditor.patchValueToMatchSerializedType(rangeInfo.value.value(), valueType), valueType));
    }
    isRangeEmptyAllowed(range) {
        if (this.isGradient) {
            var ranges = this.value.peek();
            var index = ranges.indexOf(range);
            return (index != 0) && (index != ranges.length - 1);
        }
        else {
            return true;
        }
    }
    createStyleSettingsEditorOptions(range) {
        return {
            allowChangeViewMode: false,
            appearanceMode: this.appearanceMode,
            isEmptyAllowed: this.isRangeEmptyAllowed(range),
            selectedChanged: this.getSelectedStyleChangedHandler(range),
            closeEditCell: this.closeEditCell,
            enableCustomStyles: this.enableCustomStyles,
            restrictToColor: this.restrictToColor,
            getAvailableFontFamilies: this.condition._getAvailableFontFamilies
        };
    }
    createStyleSettingsEditorItemOptions(range) {
        return {
            item: range.style(),
            clickHandler: () => { },
            isSelected: ko.observable(false),
            isEmptyAllowed: this.isRangeEmptyAllowed(range),
            isRange: true,
            isGradient: this.isGradient,
            restrictToColor: this.restrictToColor,
            getAvailableFontFamilies: this.condition._getAvailableFontFamilies
        };
    }
    createRangeNumberEditorViewModel(args) {
        const isNegativeInfintySelected = args.value() === _format_rules_common_1.negativeInfinity;
        const editorValue = ko.observable(isNegativeInfintySelected ? 0 : args.value());
        const allowInfinity = args.isRightValue && args.grid.totalCount() === args.rowIndex + 1 && !this.isPercent();
        const infinitValue = ko.observable(isNegativeInfintySelected);
        const editorType = this.dataType() === 'DateTime' ? 'dateBox' : 'numberBox';
        const editorOptions = {
            onValueChanged: (e) => {
                args.setValue(e.value);
                editorValue(e.value);
            },
            format: this.dataType() === 'Integer' && !this.isPercent() ? 'fixedPoint' : '',
            value: editorValue()
        };
        const buttonOptions = {
            width: '100%',
            keyExpr: 'value',
            selectedItemKeys: [isNegativeInfintySelected ? _format_rules_common_1.negativeInfinity : 'number'],
            items: [{
                    value: 'number',
                    text: _default_1.getLocalizationById('DashboardStringId.FormatConditionNumberValueType')
                }, {
                    value: _format_rules_common_1.negativeInfinity,
                    text: negativeInfinityDisplayText
                }],
            selectionMode: 'single',
            onSelectionChanged: (e) => {
                if (e.addedItems[0].value === _format_rules_common_1.negativeInfinity) {
                    args.setValue(_format_rules_common_1.negativeInfinity);
                    infinitValue(true);
                }
                else {
                    args.setValue(editorValue());
                    infinitValue(false);
                }
            }
        };
        return {
            editorType,
            negativeInfinityDisplayText,
            allowInfinity,
            infinitValue,
            editorOptions,
            buttonOptions
        };
    }
    get dataGridOptions() {
        let valueType = dataGridColumnTypes[this.dataType()];
        return {
            dataSource: (this.value),
            twoWayBindingEnabled: false,
            hoverStateEnabled: false,
            showRowLines: true,
            showColumnHeaders: false,
            rowAlternationEnabled: false,
            selection: undefined,
            paging: {
                enabled: false
            },
            editing: {
                mode: 'cell',
                allowFiltering: false,
                allowSorting: false,
                allowUpdating: true
            },
            onInitialized: (e) => {
                e.component.getController('editorFactory')._showRevertButton = () => { };
                this._closeEditCell = () => {
                    e.component.closeEditCell();
                    this._updateValue();
                };
            },
            onCellHoverChanged: function (e) {
                let cellElement = _jquery_helpers_1.$unwrap(e.cellElement);
                if (e.eventType === 'mouseover') {
                    cellElement.classList.add('dx-dashboard-range-editor-state-hover');
                }
                else {
                    cellElement.classList.remove('dx-dashboard-range-editor-state-hover');
                }
            },
            onRowPrepared: function (e) {
                if (e.data === this.selection()) {
                    let selectedRow = _jquery_helpers_1.$unwrap(e.element).querySelector('tr.dx-selection');
                    if (selectedRow) {
                        selectedRow.classList.remove('dx-selection');
                    }
                    _jquery_helpers_1.$unwrap(e.rowElement).classList.add('dx-selection');
                }
            },
            onEditingStart: function (e) {
                if (e.component.getRowIndexByKey(e.key) === 0 && e.column.dataField === 'leftValue') {
                    e.cancel = true;
                }
            },
            onCellPrepared: function (e) {
                let cellElement = _jquery_helpers_1.$unwrap(e.cellElement);
                if (cellElement.classList.contains('dx-editor-cell')) {
                    this.selection(e.data);
                    let selectedRow = _jquery_helpers_1.$unwrap(e.element).querySelector('tr.dx-selection');
                    if (selectedRow) {
                        selectedRow.classList.remove('dx-selection');
                    }
                    cellElement.parentElement.classList.add('dx-selection');
                }
            },
            onRowValidating: function (e) {
                if (!!e.newData.sign || e.brokenRules.length > 0)
                    return;
                var dataGrid = e.component, value = e.newData.leftValue || e.newData.rightValue, rowIndex = dataGrid.getRowIndexByKey(e.key), bottomValue = undefined, upperValue = undefined;
                if (!!e.newData.leftValue) {
                    bottomValue = dataGrid.getKeyByRowIndex(rowIndex).rightValue();
                    upperValue = rowIndex - 1 >= 0 ? dataGrid.getKeyByRowIndex(rowIndex - 1).leftValue() : undefined;
                }
                else if (!!e.newData.rightValue) {
                    var count = dataGrid.option('dataSource').length;
                    var minBottomValue = this.isPercent() && (rowIndex + 1 == count) ? 0 : undefined;
                    bottomValue = rowIndex + 1 < count ? dataGrid.getKeyByRowIndex(rowIndex + 1).rightValue() : minBottomValue;
                    upperValue = dataGrid.getKeyByRowIndex(rowIndex).leftValue();
                }
                if (value == undefined || (bottomValue !== undefined && value < bottomValue) || (upperValue !== undefined && value > upperValue)) {
                    e.isValid = false;
                    e.errorText = 'Invalid value: value should be between [' + bottomValue + ', ' + upperValue + ']';
                }
            },
            columns: [{
                    dataField: 'style',
                    alignment: 'center',
                    width: 52,
                    cellTemplate: 'dx-dashboard-range-style-template',
                    lookup: {
                        dataSource: []
                    },
                    editCellTemplate: 'dx-dashboard-range-style-editor-template'
                }, {
                    dataField: 'leftValue',
                    dataType: valueType,
                    width: 74,
                    alignment: 'center',
                    cellTemplate: 'dx-dashboard-range-cell-template',
                    editCellTemplate: 'dx-dashboard-range-edit-number-template-left',
                    cssClass: 'dx-dashboard-range-value',
                    validationRules: [{ type: 'required' }]
                }, {
                    dataField: 'sign',
                    alignment: 'center',
                    cellTemplate: 'dx-dashboard-range-cell-template',
                    cssClass: 'dx-dashboard-range-sign',
                    showEditorAlways: false,
                    editorOptions: {
                        searchEnabled: false,
                        showDropDownButton: false
                    },
                    lookup: {
                        dataSource: [{
                                name: _range_info_1.rangeValueComparison.values['GreaterOrEqual'],
                                id: 'GreaterOrEqual'
                            }, {
                                name: _range_info_1.rangeValueComparison.values['Greater'],
                                id: 'Greater'
                            }],
                        displayExpr: 'name',
                        valueExpr: 'id'
                    }
                }, {
                    dataField: 'rightValue',
                    dataType: valueType,
                    alignment: 'center',
                    width: 74,
                    cellTemplate: 'dx-dashboard-range-cell-template',
                    editCellTemplate: 'dx-dashboard-range-edit-number-template-right',
                    cssClass: 'dx-dashboard-range-value',
                    validationRules: [{ type: 'required' }],
                    customizeText: (e) => {
                        return e.value === -Infinity ? negativeInfinityDisplayText : e.valueText;
                    }
                }
            ]
        };
    }
    add() {
        var index = !!this.selection() ? this.condition.rangeSet.ranges.indexOf(this.selection().rangeInfo) : this.condition.rangeSet.ranges().length - 1;
        var rangeInfo = this.condition.rangeSet.ranges()[index];
        this.condition.rangeSet.ranges.splice(index, 0, rangeInfo.clone());
    }
    remove() {
        if (!!this.selection() && this.condition.rangeSet.ranges().length > 2) {
            var rangeInfo = this.selection().rangeInfo;
            var index = this.condition.rangeSet.ranges.indexOf(rangeInfo);
            this.condition.rangeSet.ranges.splice(index, 1);
            this.selection(this.value()[this.value().indexOf(this.selection())]);
        }
    }
    getSelectedStyleChangedHandler(range) {
        return (oldStyle, newStyle) => {
            range.rangeInfo.styleSettings(newStyle);
        };
    }
    _updateValue() {
        this.value(generateRanges(this.condition.rangeSet.ranges.peek(), this.isGradient, this.isPercent()));
    }
}
exports.RuleRangesEditor = RuleRangesEditor;
RuleRangesEditor.patchValueToMatchSerializedType = (value, valueType) => {
    if (valueType === 'System.Int32')
        return Math.round(value);
    return value;
};
var generateRanges = (ranges, isGradient, isPercent) => {
    var value = [];
    var prevIndex = -1, nextIndex = ranges.length;
    var isStyleEmpty = (s) => {
        return !s || _style_settings_adapters_1.styleSettingsAdapter(s).getPredefinedStyle() == _style_settings_base_1.emptyStyleType;
    };
    var generateStyleSettings = (currentIndex) => {
        let color;
        let nextColor;
        const itemAdapter = _style_settings_adapters_1.styleSettingsAdapter(ranges[prevIndex].styleSettings());
        const nextItemAdapter = _style_settings_adapters_1.styleSettingsAdapter(ranges[nextIndex].styleSettings());
        color = itemAdapter.hasCustomStyle() ? color_1.Color.fromRgbaString(itemAdapter.getCustomColor()) : color_1.Color.fromAppearance(itemAdapter.getPredefinedStyle());
        nextColor = nextItemAdapter.hasCustomStyle() ? color_1.Color.fromRgbaString(nextItemAdapter.getCustomColor()) : color_1.Color.fromAppearance(nextItemAdapter.getPredefinedStyle());
        const generatedColor = color_1.Color.fromDxColor(nextColor.blend(color, (currentIndex - nextIndex) / (prevIndex - nextIndex))).css;
        const newItem = _style_settings_adapters_1.styleSettingsAdapter(ranges[0].styleSettings()).itemFactory();
        _style_settings_adapters_1.styleSettingsAdapter(newItem).setCustomColor(generatedColor);
        return ko.observable(newItem);
    };
    var getRangeValue = (index) => {
        var rangeInfo = ranges[index];
        return rangeInfo.value.value;
    };
    for (var i = ranges.length - 1; i >= 0; i--) {
        var styleSettings = ranges[i].styleSettings;
        if (isGradient) {
            if (isStyleEmpty(styleSettings())) {
                if (nextIndex > i) {
                    for (var j = i - 1; j >= 0; j--) {
                        if (!isStyleEmpty(ranges[j].styleSettings())) {
                            nextIndex = j;
                            break;
                        }
                    }
                }
                styleSettings = generateStyleSettings(i);
            }
            else {
                prevIndex = i;
            }
        }
        value.push({
            style: styleSettings,
            sign: ranges[i].valueComparison,
            leftValue: (i < ranges.length - 1) ? getRangeValue(i + 1) : (isPercent ? ko.observable(100) : ko.observable('∞')),
            rightValue: getRangeValue(i),
            rangeInfo: ranges[i]
        });
    }
    return value;
};
