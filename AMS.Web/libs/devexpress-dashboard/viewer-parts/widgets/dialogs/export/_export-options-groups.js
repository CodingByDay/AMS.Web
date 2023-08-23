﻿/**
* DevExpress Dashboard (_export-options-groups.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardImageOptionsGroup = exports.simplyImageOptionsGroup = exports.excelOptionsGroup = exports.dashboardExcelOptionsGroup = exports.imageOptionsGroup = exports.cardOptionsGroup = exports.gaugeOptionsGroup = exports.pieOptionsGroup = exports.rangeFilterOptionsGroup = exports.treemapOptionsGroup = exports.mapOptionsGroup = exports.chartOptionsGroup = exports.pivotOptionsGroup = exports.gridOptionsGroup = exports.dashboardOptionsGroup = exports.entireDashboardOptionsGroup = exports.customItemOptionsGroup = exports.groupItemOptionsGroup = exports.imageItemOptionsGroup = exports.boundImageItemOptionsGroup = exports.textItemOptionsGroup = exports.documentOptionsGroup = exports.scaleModeOptionsGroup = exports.captionOptionsGroup = exports.dashboardStateOptionsGroup = exports.optionsGroup = exports.labeledEditor = void 0;
const array_store_1 = require("devextreme/data/array_store");
const check_box_1 = require("devextreme/ui/check_box");
const date_box_1 = require("devextreme/ui/date_box");
const number_box_1 = require("devextreme/ui/number_box");
const radio_group_1 = require("devextreme/ui/radio_group");
const select_box_1 = require("devextreme/ui/select_box");
const tag_box_1 = require("devextreme/ui/tag_box");
const text_box_1 = require("devextreme/ui/text_box");
const _jquery_helpers_1 = require("../../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../../data/_localization-ids");
const _localizer_1 = require("../../../../data/_localizer");
const _export_options_1 = require("../../../_export-options");
const _dialog_form_1 = require("../_dialog-form");
const _export_localization_1 = require("./_export-localization");
var DXNUMBERBOX_MIN = 1, DXNUMBERBOX_MAX = 999;
let dialogEditorFactory = {
    dxTagBox: { name: 'dxTagBox', create: (element, options) => new tag_box_1.default(element, options) },
    dxSelectBox: { name: 'dxSelectBox', create: (element, options) => new select_box_1.default(element, options) },
    dxRadioGroup: { name: 'dxRadioGroup', create: (element, options) => new radio_group_1.default(element, options) },
    dxNumberBox: { name: 'dxNumberBox', create: (element, options) => new number_box_1.default(element, options) },
    dxTextBox: { name: 'dxTextBox', create: (element, options) => new text_box_1.default(element, options) },
    dxCheckBox: { name: 'dxCheckBox', create: (element, options) => new check_box_1.default(element, options) },
    dxDateBox: { name: 'dxDateBox', create: (element, options) => new date_box_1.default(element, options) }
};
class labeledEditor {
    constructor(options) {
        this._options = options;
        this._initialize();
    }
    get margin() {
        return this._options.margin;
    }
    _initialize() {
        var that = this;
        var controlOptions = _jquery_helpers_1.deepExtend(that._getControlOptions(that._options), that._options.controlOptions || {});
        that._valueName = controlOptions.valueName;
        var labelText = that._options.labelText;
        if (!that._options.customText)
            labelText += ':';
        that.labelDiv = document.createElement('div');
        that.labelDiv.classList.add(_dialog_form_1.dialogClasses.name);
        that.labelDiv.classList.add(that._generateElementNameClassName(that._options.controlCreator.name, that._options.margin === 'Large'));
        that.labelDiv.innerText = labelText;
        that.editorDiv = document.createElement('div');
        that.editorDiv.classList.add(_dialog_form_1.dialogClasses.box);
        var elementClass = that._getElementClassName(that._options.controlCreator.name, that._options.margin === 'Large');
        if (elementClass)
            that.editorDiv.classList.add(elementClass);
        this._editor = that._options.controlCreator.create(that.editorDiv, controlOptions);
        that.enabled = true;
    }
    setEnabled(enabled) {
        var that = this;
        that.enabled = enabled;
        if (enabled) {
            that.labelDiv.classList.remove(_dialog_form_1.dialogClasses.disabledName);
        }
        else {
            that.labelDiv.classList.add(_dialog_form_1.dialogClasses.disabledName);
        }
        that._editor.option('disabled', !enabled);
    }
    setVisibility(visible) {
        var that = this;
        that.enabled = visible;
        if (visible) {
            that.labelDiv.style.display = 'inline-block';
            that.editorDiv.style.display = 'inline-block';
        }
        else {
            that.labelDiv.style.display = 'none';
            that.editorDiv.style.display = 'none';
        }
    }
    set(value) {
        var that = this;
        that._editor.option(that._valueName, value);
    }
    get() {
        var that = this;
        return that._editor.option(that._valueName);
    }
    dispose() {
        if (this._editor)
            this._editor.dispose();
    }
    _getControlOptions(options) {
        switch (options.controlCreator.name) {
            case dialogEditorFactory.dxSelectBox.name:
                return {
                    dataSource: {
                        store: new array_store_1.default(options.values),
                        paginate: false
                    },
                    itemTemplate: item => item.displayValue,
                    displayExpr: 'displayValue',
                    valueExpr: 'value',
                    valueName: 'value',
                    placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.FilterElementCheckedComboBoxNoDataCaption),
                    noDataText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.FilterElementNoDataToDisplay),
                    encodeNoDataText: true,
                };
            case dialogEditorFactory.dxRadioGroup.name:
                var dataSource = options.values.map(value => value.value);
                return {
                    dataSource: dataSource,
                    itemTemplate: function (item) {
                        return options.values.filter(value => {
                            return value.value === item;
                        })[0].displayValue;
                    },
                    valueName: 'value'
                };
            case dialogEditorFactory.dxNumberBox.name:
                return {
                    valueName: 'value',
                    min: DXNUMBERBOX_MIN,
                    max: DXNUMBERBOX_MAX
                };
            case dialogEditorFactory.dxCheckBox.name:
                return {
                    valueName: 'value'
                };
            case dialogEditorFactory.dxTextBox.name:
                return {
                    valueName: 'value'
                };
        }
    }
    _generateElementNameClassName(controlCreator, largeMargin) {
        if (largeMargin)
            return _dialog_form_1.dialogClasses.name + '-margin-top';
        if ((controlCreator == dialogEditorFactory.dxRadioGroup.name) || (controlCreator == dialogEditorFactory.dxCheckBox.name)) {
            return _dialog_form_1.dialogClasses.name + '-top';
        }
        return _dialog_form_1.dialogClasses.name + '-middle';
    }
    _getElementClassName(controlName, largeMargin) {
        if (largeMargin)
            return _dialog_form_1.dialogClasses.elementLargeMarginTop;
        switch (controlName) {
            case dialogEditorFactory.dxSelectBox.name:
            case dialogEditorFactory.dxTextBox.name:
                return _dialog_form_1.dialogClasses.elementTextBox;
            case dialogEditorFactory.dxNumberBox.name:
                return _dialog_form_1.dialogClasses.elementNumberBox;
            default:
                return '';
        }
    }
}
exports.labeledEditor = labeledEditor;
class optionsGroup {
    constructor() {
    }
    setEnabled(enabled) {
        var that = this;
        that.enabled = enabled;
        that.getEditors().forEach(editor => {
            editor.setEnabled(enabled);
        });
    }
    createEditors(additionalOptions) {
        this._additionalOptions = additionalOptions;
        this._initialize();
    }
    dispose() {
        this.getEditors().forEach(editor => editor.dispose());
    }
}
exports.optionsGroup = optionsGroup;
class dashboardStateOptionsGroup extends optionsGroup {
    constructor() {
        super();
    }
    _initialize() {
        var that = this;
        this.exportFilters = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.IncludeExportDashboardState),
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Large',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportFilters),
                onValueChanged: function (args) {
                    that.dashboardStatePosition.setEnabled(that.exportParameters.get() || args.component.option('value'));
                }
            }
        });
        this.exportParameters = new labeledEditor({
            labelText: ' ',
            customText: true,
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Small',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportParameters),
                onValueChanged: function (args) {
                    that.dashboardStatePosition.setEnabled(that.exportFilters.get() || args.component.option('value'));
                }
            }
        });
        this.dashboardStatePosition = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.DashboardStatePosition),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.dashboardStatePosition.below, _export_localization_1.dashboardStatePosition.separatePage],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        that.dashboardStatePosition.setEnabled(that.exportFilters.get() || that.exportParameters.get());
    }
    set(documentInfo) {
        this.exportFilters.set(documentInfo.pdfExportOptions.ExportFilters);
        this.exportParameters.set(documentInfo.pdfExportOptions.ExportParameters);
        this.dashboardStatePosition.set(documentInfo.pdfExportOptions.DashboardStatePosition);
    }
    apply(documentInfo) {
        documentInfo.pdfExportOptions.ExportFilters = this.exportFilters.get();
        documentInfo.pdfExportOptions.ExportParameters = this.exportParameters.get();
        documentInfo.pdfExportOptions.DashboardStatePosition = this.dashboardStatePosition.get();
    }
    getEditors() {
        return [this.exportFilters, this.exportParameters, this.dashboardStatePosition];
    }
}
exports.dashboardStateOptionsGroup = dashboardStateOptionsGroup;
class captionOptionsGroup extends optionsGroup {
    constructor(_showCaptionValue) {
        super();
        this._showCaptionValue = _showCaptionValue;
    }
    _initialize() {
        var that = this;
        this.showCaption = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ShowTitle),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that.caption.setEnabled(args.component.option('value'));
                }
            }
        });
        this.caption = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Title),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        that.caption.setEnabled(this._showCaptionValue);
    }
    set(documentInfo) {
        this.showCaption.set(documentInfo.pdfExportOptions.ShowTitle);
        this.caption.set(documentInfo.pdfExportOptions.Title);
    }
    apply(documentInfo) {
        documentInfo.pdfExportOptions.ShowTitle = this.showCaption.get();
        documentInfo.pdfExportOptions.Title = this.caption.get();
    }
    getEditors() {
        return [this.showCaption, this.caption];
    }
}
exports.captionOptionsGroup = captionOptionsGroup;
class scaleModeOptionsGroup extends optionsGroup {
    constructor(_scaleModeValue) {
        super();
        this._scaleModeValue = _scaleModeValue;
        this.visibilityUpdated = _jquery_helpers_1.createJQueryCallbacks();
    }
    _initialize() {
        var that = this;
        this.scaleMode = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ScaleMode),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.scaleMode.none, _export_localization_1.scaleMode.useScaleFactor, _export_localization_1.scaleMode.autoFitToPageWidth],
            controlOptions: {
                onValueChanged: function (args) {
                    that._setScaleModeOptionsVisibility(args.component.option('value'));
                },
                container: this._additionalOptions.popupContainer
            }
        });
        this.scaleFactor = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ScaleFactor),
            controlCreator: dialogEditorFactory.dxNumberBox
        });
        this.autoFitPageCount = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.AutoFitPageCount),
            controlCreator: dialogEditorFactory.dxNumberBox
        });
        that._setScaleModeOptionsVisibility(this._scaleModeValue);
    }
    set(documentInfo) {
        this.scaleMode.set(documentInfo.pdfExportOptions.DocumentScaleMode);
        this.scaleFactor.set(documentInfo.pdfExportOptions.ScaleFactor);
        this.autoFitPageCount.set(documentInfo.pdfExportOptions.AutoFitPageCount);
        this._setScaleModeOptionsVisibility(this.scaleMode.get());
    }
    apply(documentInfo) {
        if (this.scaleMode.enabled) {
            documentInfo.pdfExportOptions.DocumentScaleMode = this.scaleMode.get();
            documentInfo.pdfExportOptions.ScaleFactor = this.scaleFactor.get();
            documentInfo.pdfExportOptions.AutoFitPageCount = this.autoFitPageCount.get();
        }
        else {
            documentInfo.pdfExportOptions.ScaleFactor = 1;
            documentInfo.pdfExportOptions.AutoFitPageCount = 1;
        }
    }
    getEditors() {
        return [this.scaleMode, this.scaleFactor, this.autoFitPageCount];
    }
    _setScaleModeOptionsVisibility(scaleModeValue) {
        var that = this;
        switch (scaleModeValue) {
            case _export_localization_1.scaleMode.none.value:
                that.scaleFactor.setVisibility(false);
                that.autoFitPageCount.setVisibility(false);
                break;
            case _export_localization_1.scaleMode.useScaleFactor.value:
                that.scaleFactor.setVisibility(true);
                that.autoFitPageCount.setVisibility(false);
                break;
            case _export_localization_1.scaleMode.autoFitToPageWidth.value:
                that.scaleFactor.setVisibility(false);
                that.autoFitPageCount.setVisibility(true);
                break;
        }
        that.visibilityUpdated.fire();
    }
}
exports.scaleModeOptionsGroup = scaleModeOptionsGroup;
class documentOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
    }
    _initialize() {
        this.pageLayout = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayout),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.pageLayout.portrait, _export_localization_1.pageLayout.landscape]
        });
        this.paperKind = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKind),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.paperKind.letter, _export_localization_1.paperKind.legal, _export_localization_1.paperKind.executive, _export_localization_1.paperKind.a5, _export_localization_1.paperKind.a4, _export_localization_1.paperKind.a3],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.captionOptionsGroup = new captionOptionsGroup(this._includeCaptionValue);
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.captionOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.pageLayout.set(documentInfo.pdfExportOptions.PageLayout);
        this.paperKind.set(documentInfo.pdfExportOptions.PaperKind);
        this.captionOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        documentInfo.pdfExportOptions.PageLayout = this.pageLayout.get();
        documentInfo.pdfExportOptions.PaperKind = this.paperKind.get();
        this.captionOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [this.pageLayout, this.paperKind];
        that.captionOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.documentOptionsGroup = documentOptionsGroup;
class textItemOptionsGroup extends optionsGroup {
    constructor(_showCaptionValue) {
        super();
        this._showCaptionValue = _showCaptionValue;
    }
    _initialize() {
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.documentOptionsGroup = new documentOptionsGroup(this._showCaptionValue);
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.documentOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.fileName.set(documentInfo.fileName);
        this.documentOptionsGroup.set(documentInfo);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        documentInfo.fileName = this.fileName.get();
        this.documentOptionsGroup.apply(documentInfo);
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [this.fileName];
        that.documentOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.textItemOptionsGroup = textItemOptionsGroup;
class boundImageItemOptionsGroup extends optionsGroup {
    constructor(_showCaptionValue, _scaleModeValue) {
        super();
        this._showCaptionValue = _showCaptionValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.documentOptionsGroup = new documentOptionsGroup(this._showCaptionValue);
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.documentOptionsGroup.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.fileName.set(documentInfo.fileName);
        this.documentOptionsGroup.set(documentInfo);
        this.scaleModeOptionsGroup.set(documentInfo);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        documentInfo.fileName = this.fileName.get();
        this.documentOptionsGroup.apply(documentInfo);
        this.scaleModeOptionsGroup.apply(documentInfo);
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [that.fileName];
        that.documentOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.boundImageItemOptionsGroup = boundImageItemOptionsGroup;
class imageItemOptionsGroup extends optionsGroup {
    constructor(_showCaptionValue, _scaleModeValue) {
        super();
        this._showCaptionValue = _showCaptionValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        var that = this;
        this.pageLayout = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayout),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.pageLayout.portrait, _export_localization_1.pageLayout.landscape]
        });
        this.paperKind = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKind),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.paperKind.letter, _export_localization_1.paperKind.legal, _export_localization_1.paperKind.executive, _export_localization_1.paperKind.a5, _export_localization_1.paperKind.a4, _export_localization_1.paperKind.a3],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.showCaption = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ShowTitle),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that.caption.setEnabled(args.component.option('value'));
                }
            }
        });
        this.caption = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Title),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        that.caption.setEnabled(this._showCaptionValue);
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.pageLayout.set(documentInfo.pdfExportOptions.PageLayout);
        this.paperKind.set(documentInfo.pdfExportOptions.PaperKind);
        this.showCaption.set(documentInfo.pdfExportOptions.ShowTitle);
        this.caption.set(documentInfo.pdfExportOptions.Title);
        this.fileName.set(documentInfo.fileName);
        this.scaleModeOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        documentInfo.pdfExportOptions.PageLayout = this.pageLayout.get();
        documentInfo.pdfExportOptions.PaperKind = this.paperKind.get();
        documentInfo.pdfExportOptions.ShowTitle = this.showCaption.get();
        documentInfo.pdfExportOptions.Title = this.caption.get();
        documentInfo.fileName = this.fileName.get();
        this.scaleModeOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [this.fileName, this.pageLayout, this.paperKind, this.showCaption, this.caption];
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.imageItemOptionsGroup = imageItemOptionsGroup;
class groupItemOptionsGroup extends optionsGroup {
    constructor(_showCaptionValue, _dashboardAutomaticPageLayoutValue, _scaleModeValue) {
        super();
        this._showCaptionValue = _showCaptionValue;
        this._dashboardAutomaticPageLayoutValue = _dashboardAutomaticPageLayoutValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        this.dashboardOptionsGroup = new dashboardOptionsGroup(this._dashboardAutomaticPageLayoutValue, this._scaleModeValue);
        this.captionOptionsGroup = new captionOptionsGroup(this._showCaptionValue);
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.dashboardOptionsGroup.createEditors(additionalOptions);
        this.captionOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.dashboardOptionsGroup.set(documentInfo);
        this.captionOptionsGroup.set(documentInfo);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        this.dashboardOptionsGroup.apply(documentInfo);
        this.captionOptionsGroup.apply(documentInfo);
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = this.dashboardOptionsGroup.getEditors(that.captionOptionsGroup.getEditors());
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.groupItemOptionsGroup = groupItemOptionsGroup;
class customItemOptionsGroup extends optionsGroup {
    constructor(_showCaptionValue, _dashboardAutomaticPageLayoutValue, _scaleModeValue) {
        super();
        this._showCaptionValue = _showCaptionValue;
        this._dashboardAutomaticPageLayoutValue = _dashboardAutomaticPageLayoutValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        this.dashboardOptionsGroup = new dashboardOptionsGroup(this._dashboardAutomaticPageLayoutValue, this._scaleModeValue);
        this.captionOptionsGroup = new captionOptionsGroup(this._showCaptionValue);
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.dashboardOptionsGroup.createEditors(additionalOptions);
        this.captionOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.dashboardOptionsGroup.set(documentInfo);
        this.captionOptionsGroup.set(documentInfo);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        this.dashboardOptionsGroup.apply(documentInfo);
        this.captionOptionsGroup.apply(documentInfo);
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        return this.dashboardOptionsGroup
            .getEditors(this.captionOptionsGroup.getEditors())
            .concat(this.dashboardStateOptionsGroup.getEditors());
    }
}
exports.customItemOptionsGroup = customItemOptionsGroup;
class entireDashboardOptionsGroup extends optionsGroup {
    constructor(_showTitleValue, _dashboardAutomaticPageLayoutValue, _scaleModeValue) {
        super();
        this._showTitleValue = _showTitleValue;
        this._dashboardAutomaticPageLayoutValue = _dashboardAutomaticPageLayoutValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        var that = this;
        this.dashboardOptionsGroup = new dashboardOptionsGroup(this._dashboardAutomaticPageLayoutValue, this._scaleModeValue);
        this.showTitle = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ShowTitle),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that.title.setEnabled(args.component.option('value'));
                }
            }
        });
        this.title = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Title),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        that.title.setEnabled(this._showTitleValue);
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.dashboardOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.dashboardOptionsGroup.set(documentInfo);
        this.showTitle.set(documentInfo.pdfExportOptions.ShowTitle);
        this.title.set(documentInfo.pdfExportOptions.Title);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        this.dashboardOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.ShowTitle = this.showTitle.get();
        documentInfo.pdfExportOptions.Title = this.title.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = this.dashboardOptionsGroup.getEditors([this.showTitle, this.title]);
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.entireDashboardOptionsGroup = entireDashboardOptionsGroup;
class dashboardOptionsGroup extends optionsGroup {
    constructor(_dashboardAutomaticPageLayoutValue, _scaleModeValue) {
        super();
        this._dashboardAutomaticPageLayoutValue = _dashboardAutomaticPageLayoutValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        var that = this;
        this.pageLayout = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayout),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.pageLayout.portrait, _export_localization_1.pageLayout.landscape, _export_localization_1.pageLayout.auto],
            controlOptions: {
                onValueChanged: function (args) {
                    that._setScaleModeOptionsVisibility(args.value);
                }
            }
        });
        this.paperKind = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKind),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.paperKind.letter, _export_localization_1.paperKind.legal, _export_localization_1.paperKind.executive, _export_localization_1.paperKind.a5, _export_localization_1.paperKind.a4, _export_localization_1.paperKind.a3],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
        if (this._dashboardAutomaticPageLayoutValue)
            this._setScaleModeOptionsVisibility(_export_localization_1.pageLayout.auto.value);
    }
    set(documentInfo) {
        this.pageLayout.set(documentInfo.pdfExportOptions.DashboardAutomaticPageLayout ? _export_localization_1.pageLayout.auto.value : documentInfo.pdfExportOptions.PageLayout);
        this.paperKind.set(documentInfo.pdfExportOptions.PaperKind);
        this.scaleModeOptionsGroup.set(documentInfo);
        this.fileName.set(documentInfo.fileName);
    }
    apply(documentInfo) {
        if (this.pageLayout.get() != _export_localization_1.pageLayout.auto.value)
            documentInfo.pdfExportOptions.PageLayout = this.pageLayout.get();
        documentInfo.pdfExportOptions.DashboardAutomaticPageLayout = this.pageLayout.get() == _export_localization_1.pageLayout.auto.value;
        documentInfo.pdfExportOptions.PaperKind = this.paperKind.get();
        this.scaleModeOptionsGroup.apply(documentInfo);
        documentInfo.fileName = this.fileName.get();
    }
    getEditors(captionEditors) {
        var that = this;
        var editors = [this.fileName, this.pageLayout, this.paperKind];
        captionEditors.forEach(editor => {
            editors.push(editor);
        });
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
    _setScaleModeOptionsVisibility(pageLayoutValue) {
        this.scaleModeOptionsGroup.setEnabled(pageLayoutValue != _export_localization_1.pageLayout.auto.value);
    }
}
exports.dashboardOptionsGroup = dashboardOptionsGroup;
class gridOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue, _fitToPageWidthValue, _scaleModeValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
        this._fitToPageWidthValue = _fitToPageWidthValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        var that = this;
        this.documentOptionsGroup = new documentOptionsGroup(this._includeCaptionValue);
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
        this.printHeadersOnEveryPage = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PrintHeadersOnEveryPage),
            controlCreator: dialogEditorFactory.dxCheckBox
        });
        this.fitToPageWidth = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FitToPageWidth),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that._setScaleModeOptionsVisibility(args.component.option('value'));
                }
            }
        });
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.documentOptionsGroup.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
        this._setScaleModeOptionsVisibility(this._fitToPageWidthValue);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.documentOptionsGroup.set(documentInfo);
        this.dashboardStateOptionsGroup.set(documentInfo);
        this.printHeadersOnEveryPage.set(documentInfo.pdfExportOptions.GridPrintHeadersOnEveryPage);
        this.fitToPageWidth.set(documentInfo.pdfExportOptions.GridFitToPageWidth);
        this.scaleModeOptionsGroup.set(documentInfo);
        this.fileName.set(documentInfo.fileName);
    }
    apply(documentInfo) {
        this.documentOptionsGroup.apply(documentInfo);
        this.dashboardStateOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.GridPrintHeadersOnEveryPage = this.printHeadersOnEveryPage.get();
        documentInfo.pdfExportOptions.GridFitToPageWidth = this.fitToPageWidth.get();
        this.scaleModeOptionsGroup.apply(documentInfo);
        documentInfo.fileName = this.fileName.get();
    }
    getEditors() {
        var that = this;
        var editors = [];
        editors.push(that.fileName);
        that.documentOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.printHeadersOnEveryPage);
        editors.push(that.fitToPageWidth);
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
    _setScaleModeOptionsVisibility(fitToPageWidth) {
        var that = this;
        that.scaleModeOptionsGroup.setEnabled(!fitToPageWidth);
    }
}
exports.gridOptionsGroup = gridOptionsGroup;
class pivotOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue, _scaleModeValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        this.documentOptionsGroup = new documentOptionsGroup(this._includeCaptionValue);
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
        this.printHeadersOnEveryPage = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PrintHeadersOnEveryPage),
            controlCreator: dialogEditorFactory.dxCheckBox
        });
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.documentOptionsGroup.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.documentOptionsGroup.set(documentInfo);
        this.printHeadersOnEveryPage.set(documentInfo.pdfExportOptions.PivotPrintHeadersOnEveryPage);
        this.scaleModeOptionsGroup.set(documentInfo);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        this.documentOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.PivotPrintHeadersOnEveryPage = this.printHeadersOnEveryPage.get();
        this.scaleModeOptionsGroup.apply(documentInfo);
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [];
        editors.push(that.fileName);
        that.documentOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.printHeadersOnEveryPage);
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.pivotOptionsGroup = pivotOptionsGroup;
class chartOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
    }
    _initialize() {
        var that = this;
        this.pageLayout = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayout),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.pageLayout.portrait, _export_localization_1.pageLayout.landscape, _export_localization_1.pageLayout.auto]
        });
        this.paperKind = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKind),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.paperKind.letter, _export_localization_1.paperKind.legal, _export_localization_1.paperKind.executive, _export_localization_1.paperKind.a5, _export_localization_1.paperKind.a4, _export_localization_1.paperKind.a3],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.captionOptionsGroup = new captionOptionsGroup(this._includeCaptionValue);
        this.sizeMode = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SizeMode),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.sizeMode.none, _export_localization_1.sizeMode.stretch, _export_localization_1.sizeMode.zoom]
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.captionOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.pageLayout.set(documentInfo.pdfExportOptions.ChartAutomaticPageLayout ? _export_localization_1.pageLayout.auto.value : documentInfo.pdfExportOptions.PageLayout);
        this.paperKind.set(documentInfo.pdfExportOptions.PaperKind);
        this.captionOptionsGroup.set(documentInfo);
        this.sizeMode.set(documentInfo.pdfExportOptions.ChartSizeMode);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        if (this.pageLayout.get() != _export_localization_1.pageLayout.auto.value)
            documentInfo.pdfExportOptions.PageLayout = this.pageLayout.get();
        documentInfo.pdfExportOptions.ChartAutomaticPageLayout = this.pageLayout.get() == _export_localization_1.pageLayout.auto.value;
        documentInfo.pdfExportOptions.PaperKind = this.paperKind.get();
        this.captionOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.ChartSizeMode = this.sizeMode.get();
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [this.fileName, this.pageLayout, this.paperKind];
        that.captionOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.sizeMode);
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.chartOptionsGroup = chartOptionsGroup;
class mapOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
    }
    _initialize() {
        var that = this;
        this.pageLayout = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayout),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.pageLayout.portrait, _export_localization_1.pageLayout.landscape, _export_localization_1.pageLayout.auto]
        });
        this.paperKind = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKind),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.paperKind.letter, _export_localization_1.paperKind.legal, _export_localization_1.paperKind.executive, _export_localization_1.paperKind.a5, _export_localization_1.paperKind.a4, _export_localization_1.paperKind.a3],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.captionOptionsGroup = new captionOptionsGroup(this._includeCaptionValue);
        this.sizeMode = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SizeMode),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.sizeMode.none, _export_localization_1.sizeMode.zoom]
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.captionOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.pageLayout.set(documentInfo.pdfExportOptions.MapAutomaticPageLayout ? _export_localization_1.pageLayout.auto.value : documentInfo.pdfExportOptions.PageLayout);
        this.paperKind.set(documentInfo.pdfExportOptions.PaperKind);
        this.captionOptionsGroup.set(documentInfo);
        this.sizeMode.set(documentInfo.pdfExportOptions.MapSizeMode);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        if (this.pageLayout.get() != _export_localization_1.pageLayout.auto.value)
            documentInfo.pdfExportOptions.PageLayout = this.pageLayout.get();
        documentInfo.pdfExportOptions.MapAutomaticPageLayout = this.pageLayout.get() == _export_localization_1.pageLayout.auto.value;
        documentInfo.pdfExportOptions.PaperKind = this.paperKind.get();
        this.captionOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.MapSizeMode = this.sizeMode.get();
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [this.fileName, this.pageLayout, this.paperKind];
        that.captionOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.sizeMode);
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.mapOptionsGroup = mapOptionsGroup;
class treemapOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
    }
    _initialize() {
        var that = this;
        this.pageLayout = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayout),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.pageLayout.portrait, _export_localization_1.pageLayout.landscape, _export_localization_1.pageLayout.auto]
        });
        this.paperKind = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKind),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.paperKind.letter, _export_localization_1.paperKind.legal, _export_localization_1.paperKind.executive, _export_localization_1.paperKind.a5, _export_localization_1.paperKind.a4, _export_localization_1.paperKind.a3],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.captionOptionsGroup = new captionOptionsGroup(this._includeCaptionValue);
        this.sizeMode = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SizeMode),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.sizeMode.none, _export_localization_1.sizeMode.zoom]
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.captionOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.pageLayout.set(documentInfo.pdfExportOptions.TreemapAutomaticPageLayout ? _export_localization_1.pageLayout.auto.value : documentInfo.pdfExportOptions.PageLayout);
        this.paperKind.set(documentInfo.pdfExportOptions.PaperKind);
        this.captionOptionsGroup.set(documentInfo);
        this.sizeMode.set(documentInfo.pdfExportOptions.TreemapSizeMode);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        if (this.pageLayout.get() != _export_localization_1.pageLayout.auto.value)
            documentInfo.pdfExportOptions.PageLayout = this.pageLayout.get();
        documentInfo.pdfExportOptions.TreemapAutomaticPageLayout = this.pageLayout.get() == _export_localization_1.pageLayout.auto.value;
        documentInfo.pdfExportOptions.PaperKind = this.paperKind.get();
        this.captionOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.TreemapSizeMode = this.sizeMode.get();
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [this.fileName, this.pageLayout, this.paperKind];
        that.captionOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.sizeMode);
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.treemapOptionsGroup = treemapOptionsGroup;
class rangeFilterOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
    }
    _initialize() {
        var that = this;
        this.pageLayout = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayout),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.pageLayout.portrait, _export_localization_1.pageLayout.landscape, _export_localization_1.pageLayout.auto]
        });
        this.paperKind = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKind),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.paperKind.letter, _export_localization_1.paperKind.legal, _export_localization_1.paperKind.executive, _export_localization_1.paperKind.a5, _export_localization_1.paperKind.a4, _export_localization_1.paperKind.a3],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.captionOptionsGroup = new captionOptionsGroup(this._includeCaptionValue);
        this.sizeMode = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SizeMode),
            controlCreator: dialogEditorFactory.dxRadioGroup,
            values: [_export_localization_1.sizeMode.none, _export_localization_1.sizeMode.stretch, _export_localization_1.sizeMode.zoom]
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.captionOptionsGroup.createEditors(additionalOptions);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.pageLayout.set(documentInfo.pdfExportOptions.RangeFilterAutomaticPageLayout ? _export_localization_1.pageLayout.auto.value : documentInfo.pdfExportOptions.PageLayout);
        this.paperKind.set(documentInfo.pdfExportOptions.PaperKind);
        this.captionOptionsGroup.set(documentInfo);
        this.sizeMode.set(documentInfo.pdfExportOptions.RangeFilterSizeMode);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        if (this.pageLayout.get() != _export_localization_1.pageLayout.auto.value)
            documentInfo.pdfExportOptions.PageLayout = this.pageLayout.get();
        documentInfo.pdfExportOptions.RangeFilterAutomaticPageLayout = this.pageLayout.get() == _export_localization_1.pageLayout.auto.value;
        documentInfo.pdfExportOptions.PaperKind = this.paperKind.get();
        this.captionOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.RangeFilterSizeMode = this.sizeMode.get();
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [this.fileName, this.pageLayout, this.paperKind];
        that.captionOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.sizeMode);
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
}
exports.rangeFilterOptionsGroup = rangeFilterOptionsGroup;
class pieOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue, _autoArrangeContentValue, _scaleModeValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
        this._autoArrangeContentValue = _autoArrangeContentValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        var that = this;
        this.documentOptionsGroup = new documentOptionsGroup(this._includeCaptionValue);
        this.autoArrangeContent = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.AutoArrangeContent),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that._setScaleModeOptionsVisibility(args.component.option('value'));
                }
            }
        });
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.documentOptionsGroup.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
        this._setScaleModeOptionsVisibility(this._autoArrangeContentValue);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.documentOptionsGroup.set(documentInfo);
        this.autoArrangeContent.set(documentInfo.pdfExportOptions.PieAutoArrangeContent);
        this.scaleModeOptionsGroup.set(documentInfo);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        this.documentOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.PieAutoArrangeContent = this.autoArrangeContent.get();
        this.scaleModeOptionsGroup.apply(documentInfo);
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [];
        editors.push(that.fileName);
        that.documentOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.autoArrangeContent);
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
    _setScaleModeOptionsVisibility(autoArrangeContent) {
        var that = this;
        that.scaleModeOptionsGroup.setEnabled(!autoArrangeContent);
    }
}
exports.pieOptionsGroup = pieOptionsGroup;
class gaugeOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue, _autoArrangeContentValue, _scaleModeValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
        this._autoArrangeContentValue = _autoArrangeContentValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        var that = this;
        this.documentOptionsGroup = new documentOptionsGroup(this._includeCaptionValue);
        this.autoArrangeContent = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.AutoArrangeContent),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that._setScaleModeOptionsVisibility(args.component.option('value'));
                }
            }
        });
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.documentOptionsGroup.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
        this._setScaleModeOptionsVisibility(this._autoArrangeContentValue);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.documentOptionsGroup.set(documentInfo);
        this.autoArrangeContent.set(documentInfo.pdfExportOptions.GaugeAutoArrangeContent);
        this.scaleModeOptionsGroup.set(documentInfo);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        this.documentOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.GaugeAutoArrangeContent = this.autoArrangeContent.get();
        this.scaleModeOptionsGroup.apply(documentInfo);
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [];
        editors.push(that.fileName);
        that.documentOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.autoArrangeContent);
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
    _setScaleModeOptionsVisibility(autoArrangeContent) {
        var that = this;
        that.scaleModeOptionsGroup.setEnabled(!autoArrangeContent);
    }
}
exports.gaugeOptionsGroup = gaugeOptionsGroup;
class cardOptionsGroup extends optionsGroup {
    constructor(_includeCaptionValue, _autoArrangeContentValue, _scaleModeValue) {
        super();
        this._includeCaptionValue = _includeCaptionValue;
        this._autoArrangeContentValue = _autoArrangeContentValue;
        this._scaleModeValue = _scaleModeValue;
    }
    _initialize() {
        var that = this;
        this.documentOptionsGroup = new documentOptionsGroup(this._includeCaptionValue);
        this.autoArrangeContent = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.AutoArrangeContent),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that._setScaleModeOptionsVisibility(args.component.option('value'));
                }
            }
        });
        this.scaleModeOptionsGroup = new scaleModeOptionsGroup(this._scaleModeValue);
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.dashboardStateOptionsGroup = new dashboardStateOptionsGroup();
    }
    createEditors(additionalOptions) {
        super.createEditors(additionalOptions);
        this.documentOptionsGroup.createEditors(additionalOptions);
        this.scaleModeOptionsGroup.createEditors(additionalOptions);
        this._setScaleModeOptionsVisibility(this._autoArrangeContentValue);
        this.dashboardStateOptionsGroup.createEditors(additionalOptions);
    }
    set(documentInfo) {
        this.documentOptionsGroup.set(documentInfo);
        this.autoArrangeContent.set(documentInfo.pdfExportOptions.CardAutoArrangeContent);
        this.scaleModeOptionsGroup.set(documentInfo);
        this.fileName.set(documentInfo.fileName);
        this.dashboardStateOptionsGroup.set(documentInfo);
    }
    apply(documentInfo) {
        this.documentOptionsGroup.apply(documentInfo);
        documentInfo.pdfExportOptions.CardAutoArrangeContent = this.autoArrangeContent.get();
        this.scaleModeOptionsGroup.apply(documentInfo);
        documentInfo.fileName = this.fileName.get();
        this.dashboardStateOptionsGroup.apply(documentInfo);
    }
    getEditors() {
        var that = this;
        var editors = [];
        editors.push(that.fileName);
        that.documentOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        editors.push(that.autoArrangeContent);
        that.scaleModeOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        that.dashboardStateOptionsGroup.getEditors().forEach(editor => {
            editors.push(editor);
        });
        return editors;
    }
    _setScaleModeOptionsVisibility(autoArrangeContent) {
        var that = this;
        that.scaleModeOptionsGroup.setEnabled(!autoArrangeContent);
    }
}
exports.cardOptionsGroup = cardOptionsGroup;
class imageOptionsGroup extends optionsGroup {
    constructor(_showTitleValue) {
        super();
        this._showTitleValue = _showTitleValue;
    }
    _initialize() {
        var that = this;
        this.imageFormat = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ImageFormat),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.imageFormat.png, _export_localization_1.imageFormat.gif, _export_localization_1.imageFormat.jpg],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.showTitle = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ShowTitle),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that.title.setEnabled(args.component.option('value'));
                }
            }
        });
        this.title = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Title),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.exportFilters = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.IncludeExportDashboardState),
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Large',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportFilters)
            }
        });
        this.exportParameters = new labeledEditor({
            labelText: ' ',
            customText: true,
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Small',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportParameters)
            }
        });
        this.title.setEnabled(this._showTitleValue);
        this.resolution = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Resolution),
            controlCreator: dialogEditorFactory.dxNumberBox
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    set(documentInfo) {
        this.showTitle.set(documentInfo.imageExportOptions.ShowTitle);
        this.title.set(documentInfo.imageExportOptions.Title);
        this.exportFilters.set(documentInfo.imageExportOptions.ExportFilters);
        this.exportParameters.set(documentInfo.imageExportOptions.ExportParameters);
        this.imageFormat.set(documentInfo.imageExportOptions.Format);
        this.resolution.set(documentInfo.imageExportOptions.Resolution);
        this.fileName.set(documentInfo.fileName);
    }
    apply(documentInfo) {
        documentInfo.imageExportOptions.ShowTitle = this.showTitle.get();
        documentInfo.imageExportOptions.Title = this.title.get();
        documentInfo.imageExportOptions.ExportFilters = this.exportFilters.get();
        documentInfo.imageExportOptions.ExportParameters = this.exportParameters.get();
        documentInfo.imageExportOptions.Format = this.imageFormat.get();
        documentInfo.imageExportOptions.Resolution = this.resolution.get();
        documentInfo.fileName = this.fileName.get();
    }
    getEditors() {
        return [this.fileName, this.showTitle, this.title, this.imageFormat, this.resolution, this.exportFilters, this.exportParameters];
    }
}
exports.imageOptionsGroup = imageOptionsGroup;
class dashboardExcelOptionsGroup extends optionsGroup {
    constructor(_formatValue) {
        super();
        this._formatValue = _formatValue;
    }
    _checkExportFormat(format) {
        return format === _export_localization_1.excelFormat.csv.value;
    }
    _initialize() {
        var that = this;
        this.excelFormat = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExcelFormat),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.excelFormat.xlsx, _export_localization_1.excelFormat.xls],
            controlOptions: {
                onValueChanged: function (args) {
                    var isCsv = that._checkExportFormat(args.component.option('value'));
                    that.dashboardStatePosition.setEnabled(!isCsv && (that.exportFilters.get() || that.exportParameters.get()));
                },
                container: this._additionalOptions.popupContainer
            }
        });
        this.exportFilters = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.IncludeExportDashboardState),
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Large',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportFilters),
                onValueChanged: function (args) {
                    that.dashboardStatePosition.setEnabled((that.exportParameters.get() || args.component.option('value')) && !that._checkExportFormat(that.excelFormat.get()));
                }
            }
        });
        this.exportParameters = new labeledEditor({
            labelText: ' ',
            customText: true,
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Small',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportParameters),
                onValueChanged: function (args) {
                    that.dashboardStatePosition.setEnabled((that.exportFilters.get() || args.component.option('value')) && !that._checkExportFormat(that.excelFormat.get()));
                }
            }
        });
        this.dashboardStatePosition = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.DashboardStatePosition),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.excelDashboardStatePosition.below, _export_localization_1.excelDashboardStatePosition.separateSheet],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.dashboardStatePosition.setEnabled((that.exportParameters.get() || that.exportFilters.get()) && !that._checkExportFormat(this._formatValue));
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    set(documentInfo) {
        this.fileName.set(documentInfo.fileName);
        var format = documentInfo.excelExportOptions.Format === _export_options_1.dashboardExportExcelFormat.csv ? _export_options_1.dashboardExportExcelFormat.xlsx : documentInfo.excelExportOptions.Format;
        this.excelFormat.set(format);
        this.exportFilters.set(documentInfo.excelExportOptions.ExportFilters);
        this.exportParameters.set(documentInfo.excelExportOptions.ExportParameters);
        this.dashboardStatePosition.set(documentInfo.excelExportOptions.DashboardStatePosition);
    }
    apply(documentInfo) {
        documentInfo.fileName = this.fileName.get();
        documentInfo.excelExportOptions.Format = this.excelFormat.get();
        documentInfo.excelExportOptions.ExportFilters = this.exportFilters.get();
        documentInfo.excelExportOptions.ExportParameters = this.exportParameters.get();
        documentInfo.excelExportOptions.DashboardStatePosition = this.dashboardStatePosition.get();
    }
    getEditors() {
        return [this.fileName, this.excelFormat, this.exportFilters, this.exportParameters, this.dashboardStatePosition];
    }
}
exports.dashboardExcelOptionsGroup = dashboardExcelOptionsGroup;
class excelOptionsGroup extends optionsGroup {
    constructor(_formatValue, _enableCsv) {
        super();
        this._formatValue = _formatValue;
        this._enableCsv = _enableCsv;
    }
    _checkExportFormat(format) {
        return format === _export_localization_1.excelFormat.csv.value;
    }
    _initialize() {
        var that = this;
        this.excelFormat = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExcelFormat),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: this._enableCsv ? [_export_localization_1.excelFormat.xlsx, _export_localization_1.excelFormat.xls, _export_localization_1.excelFormat.csv] : [_export_localization_1.excelFormat.xlsx, _export_localization_1.excelFormat.xls],
            controlOptions: {
                onValueChanged: function (args) {
                    var isCsv = that._checkExportFormat(args.component.option('value'));
                    that.separator.setEnabled(isCsv);
                    that.dashboardStatePosition.setEnabled(!isCsv && (that.exportFilters.get() || that.exportParameters.get()));
                },
                container: this._additionalOptions.popupContainer
            }
        });
        this.separator = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.CsvValueSeparator),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.separator.setEnabled(that._checkExportFormat(this._formatValue));
        this.exportFilters = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.IncludeExportDashboardState),
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Large',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportFilters),
                onValueChanged: function (args) {
                    that.dashboardStatePosition.setEnabled((that.exportParameters.get() || args.component.option('value')) && !that._checkExportFormat(that.excelFormat.get()));
                }
            }
        });
        this.exportParameters = new labeledEditor({
            labelText: ' ',
            customText: true,
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Small',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportParameters),
                onValueChanged: function (args) {
                    that.dashboardStatePosition.setEnabled((that.exportFilters.get() || args.component.option('value')) && !that._checkExportFormat(that.excelFormat.get()));
                }
            }
        });
        this.dashboardStatePosition = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.DashboardStatePosition),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.excelDashboardStatePosition.below, _export_localization_1.excelDashboardStatePosition.separateSheet],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.dashboardStatePosition.setEnabled((that.exportParameters.get() || that.exportFilters.get()) && !that._checkExportFormat(this._formatValue));
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    set(documentInfo) {
        this.fileName.set(documentInfo.fileName);
        var format = documentInfo.excelExportOptions.Format === _export_options_1.dashboardExportExcelFormat.csv && !this._enableCsv ? _export_options_1.dashboardExportExcelFormat.xlsx : documentInfo.excelExportOptions.Format;
        this.excelFormat.set(format);
        this.separator.set(documentInfo.excelExportOptions.CsvValueSeparator);
        this.exportFilters.set(documentInfo.excelExportOptions.ExportFilters);
        this.exportParameters.set(documentInfo.excelExportOptions.ExportParameters);
        this.dashboardStatePosition.set(documentInfo.excelExportOptions.DashboardStatePosition);
    }
    apply(documentInfo) {
        documentInfo.fileName = this.fileName.get();
        documentInfo.excelExportOptions.Format = this.excelFormat.get();
        documentInfo.excelExportOptions.CsvValueSeparator = this.separator.get();
        documentInfo.excelExportOptions.ExportFilters = this.exportFilters.get();
        documentInfo.excelExportOptions.ExportParameters = this.exportParameters.get();
        documentInfo.excelExportOptions.DashboardStatePosition = this.dashboardStatePosition.get();
    }
    getEditors() {
        return [this.fileName, this.excelFormat, this.separator, this.exportFilters, this.exportParameters, this.dashboardStatePosition];
    }
}
exports.excelOptionsGroup = excelOptionsGroup;
class simplyImageOptionsGroup extends optionsGroup {
    constructor(_showTitleValue) {
        super();
        this._showTitleValue = _showTitleValue;
    }
    _initialize() {
        var that = this;
        this.imageFormat = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ImageFormat),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.imageFormat.png, _export_localization_1.imageFormat.gif, _export_localization_1.imageFormat.jpg],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.showTitle = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ShowTitle),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that.title.setEnabled(args.component.option('value'));
                }
            }
        });
        this.title = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Title),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.title.setEnabled(this._showTitleValue);
        this.resolution = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Resolution),
            controlCreator: dialogEditorFactory.dxNumberBox
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    set(documentInfo) {
        this.showTitle.set(documentInfo.imageExportOptions.ShowTitle);
        this.title.set(documentInfo.imageExportOptions.Title);
        this.imageFormat.set(documentInfo.imageExportOptions.Format);
        this.resolution.set(documentInfo.imageExportOptions.Resolution);
        this.fileName.set(documentInfo.fileName);
    }
    apply(documentInfo) {
        documentInfo.imageExportOptions.ShowTitle = this.showTitle.get();
        documentInfo.imageExportOptions.Title = this.title.get();
        documentInfo.imageExportOptions.Format = this.imageFormat.get();
        documentInfo.imageExportOptions.Resolution = this.resolution.get();
        documentInfo.fileName = this.fileName.get();
    }
    getEditors() {
        return [this.fileName, this.showTitle, this.title, this.imageFormat, this.resolution];
    }
}
exports.simplyImageOptionsGroup = simplyImageOptionsGroup;
class dashboardImageOptionsGroup extends optionsGroup {
    constructor(_showTitleValue) {
        super();
        this._showTitleValue = _showTitleValue;
    }
    _initialize() {
        var that = this;
        this.imageFormat = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ImageFormat),
            controlCreator: dialogEditorFactory.dxSelectBox,
            values: [_export_localization_1.imageFormat.png, _export_localization_1.imageFormat.gif, _export_localization_1.imageFormat.jpg],
            controlOptions: { container: this._additionalOptions.popupContainer }
        });
        this.showTitle = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ShowTitle),
            controlCreator: dialogEditorFactory.dxCheckBox,
            controlOptions: {
                onValueChanged: function (args) {
                    that.title.setEnabled(args.component.option('value'));
                }
            }
        });
        this.title = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Title),
            controlCreator: dialogEditorFactory.dxTextBox
        });
        this.exportFilters = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.IncludeExportDashboardState),
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Large',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportFilters)
            }
        });
        this.exportParameters = new labeledEditor({
            labelText: ' ',
            customText: true,
            controlCreator: dialogEditorFactory.dxCheckBox,
            margin: 'Small',
            controlOptions: {
                text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ExportParameters)
            }
        });
        this.title.setEnabled(this._showTitleValue);
        this.resolution = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.Resolution),
            controlCreator: dialogEditorFactory.dxNumberBox
        });
        this.fileName = new labeledEditor({
            labelText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FileName),
            controlCreator: dialogEditorFactory.dxTextBox
        });
    }
    set(documentInfo) {
        this.showTitle.set(documentInfo.imageExportOptions.ShowTitle);
        this.title.set(documentInfo.imageExportOptions.Title);
        this.exportFilters.set(documentInfo.imageExportOptions.ExportFilters);
        this.exportParameters.set(documentInfo.imageExportOptions.ExportParameters);
        this.imageFormat.set(documentInfo.imageExportOptions.Format);
        this.resolution.set(documentInfo.imageExportOptions.Resolution);
        this.fileName.set(documentInfo.fileName);
    }
    apply(documentInfo) {
        documentInfo.imageExportOptions.ShowTitle = this.showTitle.get();
        documentInfo.imageExportOptions.Title = this.title.get();
        documentInfo.imageExportOptions.ExportFilters = this.exportFilters.get();
        documentInfo.imageExportOptions.ExportParameters = this.exportParameters.get();
        documentInfo.imageExportOptions.Format = this.imageFormat.get();
        documentInfo.imageExportOptions.Resolution = this.resolution.get();
        documentInfo.fileName = this.fileName.get();
    }
    getEditors() {
        return [this.fileName, this.showTitle, this.title, this.imageFormat, this.resolution, this.exportFilters, this.exportParameters];
    }
}
exports.dashboardImageOptionsGroup = dashboardImageOptionsGroup;
