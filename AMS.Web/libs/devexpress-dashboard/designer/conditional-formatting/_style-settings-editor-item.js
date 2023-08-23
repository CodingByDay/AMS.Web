/**
* DevExpress Dashboard (_style-settings-editor-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleSettingsEditorItem = void 0;
const ko = require("knockout");
const model_1 = require("../../model");
const index_metadata_1 = require("../../model/index.metadata");
const _undo_engine_helper_1 = require("../../model/internal/_undo-engine-helper");
const _custom_appearance_dialog_1 = require("./custom-style-settings/_custom-appearance-dialog");
const _popover_color_picker_1 = require("./custom-style-settings/_popover-color-picker");
const _style_settings_adapters_1 = require("./_style-settings-adapters");
class StyleSettingsEditorItem {
    constructor(args) {
        this._item = args.item;
        this._itemAdapter = _style_settings_adapters_1.styleSettingsAdapter(this._item);
        this._editorClickHandler = args.clickHandler;
        this._isSelected = args.isSelected;
        this._initialize({ isEmptyAllowed: args.isEmptyAllowed, isRange: args.isRange, isGradient: args.isGradient, restrictToColor: args.restrictToColor });
        this.colorPicker = new _popover_color_picker_1.PopoverColorPicker((style) => {
            if (style) {
                this._itemAdapter.setCustomColor(style);
                this._editorClickHandler('SaveColor');
            }
        });
        if (!args.getAvailableFontFamilies) {
            args.getAvailableFontFamilies = () => ko.computed(() => []);
        }
        this.customizeAppearanceDialog = new _custom_appearance_dialog_1.CustomAppearanceDialog((style) => {
            if (style) {
                _undo_engine_helper_1.callFuncWithUndoRedo(() => {
                    this._itemAdapter.setCustomAppearance(style);
                    this._editorClickHandler('SaveAppearance');
                });
            }
        }, args.getAvailableFontFamilies());
    }
    clickHandlerCore(isRestrictToColor) {
        if (this._itemAdapter.hasCustomStyle() && (this._itemAdapter.isEmptyCustomStyle() || this._isSelected())) {
            this._showCustomStyleEditor(isRestrictToColor);
        }
        else {
            this._editorClickHandler('None');
        }
    }
    _showCustomStyleEditor(isRestrictToColor) {
        if (isRestrictToColor) {
            const color = this._itemAdapter.getCustomColor();
            this.colorPicker.show(color ? color : 'rgba(255,255,255,1)');
        }
        else {
            const appearance = this._itemAdapter.getCustomAppearance();
            this.customizeAppearanceDialog.show(appearance);
        }
        return {};
    }
    _initialize({ isEmptyAllowed, isRange, isGradient, restrictToColor }) {
        this.title = ko.pureComputed(() => this._itemAdapter.getLocalizedCaption());
        this.cssStyles = ko.pureComputed(() => this._itemAdapter.getCssStyles());
        this.cssClasses = ko.pureComputed(() => {
            const classes = this._itemAdapter.getCssClasses(isEmptyAllowed, isRange, isGradient);
            if (this._isSelected() && !isRange)
                classes.push('dx-state-selected');
            return classes.join(' ');
        });
        this.dataLabel = ko.pureComputed(() => {
            const isColor = this._item instanceof model_1.ColorStyleSettings || this._item instanceof model_1.AppearanceSettings && restrictToColor;
            const isColorNone = this._item instanceof model_1.ColorStyleSettings && this._item.predefinedColor() === index_metadata_1.emptyStyleType
                || this._item instanceof model_1.AppearanceSettings && this._item.appearanceType() === index_metadata_1.emptyStyleType;
            if (isColorNone || !isColor) {
                return this._itemAdapter.getLabelText(isRange, isGradient, restrictToColor);
            }
            return '';
        });
        this.isRangeStop = ko.pureComputed(() => isRange && isGradient && this._itemAdapter.getPredefinedStyle() !== index_metadata_1.emptyStyleType);
        this.clickHandler = isRange ? undefined : () => this.clickHandlerCore(restrictToColor);
    }
}
exports.StyleSettingsEditorItem = StyleSettingsEditorItem;
ko.components.register('dx-dashboard-style-settings-editor-item', {
    viewModel: {
        createViewModel: ({ args }) => {
            return new StyleSettingsEditorItem(ko.unwrap(args));
        }
    },
    template: { element: 'dx-dashboard-style-settings-editor-item' }
});
