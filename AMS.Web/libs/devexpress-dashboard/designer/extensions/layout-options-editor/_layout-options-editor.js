﻿/**
* DevExpress Dashboard (_layout-options-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDimensionToolbarItems = void 0;
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const string_1 = require("devextreme/core/utils/string");
const number_box_1 = require("devextreme/ui/number_box");
const validator_1 = require("devextreme/ui/validator");
const _default_1 = require("../../../data/localization/_default");
const _formatter_1 = require("../../../data/_formatter");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const _toolbar_extension_1 = require("../../toolbar-extension/_toolbar-extension");
function getDimensionToolbarItems(caption, namePrefix) {
    const minDimensionValue = 100;
    const maxDimensionValue = 10000;
    const dimensionRangeRuleMessage = function () {
        const formatViewModel = {
            FormatType: 'Number',
            IncludeGroupSeparator: true,
        };
        const maxFormattedDimensionValue = _formatter_1.formatNumeric(maxDimensionValue, formatViewModel);
        const minFormattedDimensionValue = _formatter_1.formatNumeric(minDimensionValue, formatViewModel);
        return string_1.format(_default_1.getLocalizationById('DashboardWebStringId.DesignerToolbar.LayoutDimensionValidationError'), minFormattedDimensionValue, maxFormattedDimensionValue);
    }();
    let dimensionOptions;
    let numberBox;
    let numberBoxValidator;
    let buttonGroup;
    let dimensionNameElement = document.createElement('div');
    dimensionNameElement.innerText = caption;
    let pixelElement = document.createElement('div');
    pixelElement.innerText = _default_1.getLocalizationById('DashboardWebStringId.DesignerToolbar.Pixels');
    let valueSubscription;
    let buttonGroupModeSubscription;
    let textBoxModeSubscription;
    let pixelElementModeSubscription;
    let updateNumberBox = () => {
        if (numberBox) {
            if (dimensionOptions) {
                let updateNumberBoxText = (value) => {
                    if (numberBox.option('disabled') || !_utils_1.type.isDefined(value))
                        numberBox.option('value', null);
                    else
                        numberBox.option('value', value);
                };
                let updateNumberBoxDisability = (mode) => {
                    numberBox.option('disabled', mode !== 'Fixed');
                    updateNumberBoxText(dimensionOptions.value());
                };
                updateNumberBoxDisability(dimensionOptions.mode());
                valueSubscription && valueSubscription.dispose();
                valueSubscription = dimensionOptions.value.subscribe(newValue => updateNumberBoxText(newValue));
                textBoxModeSubscription && textBoxModeSubscription.dispose();
                textBoxModeSubscription = dimensionOptions.mode.subscribe(newMode => updateNumberBoxDisability(newMode));
                numberBox.option('onValueChanged', (args) => {
                    if (dimensionOptions && dimensionOptions.mode() === 'Fixed' && numberBox.option('isValid'))
                        dimensionOptions.value(args.value && parseInt(args.value));
                });
            }
            else {
                numberBox.option('value', null);
                numberBox.option('disabled', true);
                numberBox.option('onValueChanged', (args) => { });
            }
        }
    };
    let updateButtonGroup = () => {
        buttonGroupModeSubscription && buttonGroupModeSubscription.dispose();
        if (buttonGroup) {
            if (dimensionOptions) {
                buttonGroup.option('disabled', false);
                let updateButtonGroupSelection = (value) => buttonGroup && buttonGroup.option('selectedItemKeys', value ? [value] : []);
                buttonGroupModeSubscription = dimensionOptions.mode.subscribe(newValue => updateButtonGroupSelection(newValue));
                buttonGroup.option('onSelectionChanged', (args) => {
                    if (args.addedItems && args.addedItems.length === 1 && dimensionOptions) {
                        let buttonType = args.addedItems[0].key;
                        dimensionOptions.mode(buttonType);
                    }
                });
                updateButtonGroupSelection(dimensionOptions.mode());
            }
            else {
                buttonGroup.option('disabled', true);
                buttonGroup.option('onSelectionChanged', (args) => { });
            }
        }
    };
    let updatePixelElement = () => {
        pixelElementModeSubscription && pixelElementModeSubscription.dispose();
        let updatePixelElementDisability = (mode) => {
            if (mode === 'Fixed')
                pixelElement.classList.remove('dx-dashboard-toolbar-disabled-label');
            else
                pixelElement.classList.add('dx-dashboard-toolbar-disabled-label');
        };
        if (dimensionOptions) {
            updatePixelElementDisability(dimensionOptions.mode());
            pixelElementModeSubscription = dimensionOptions.mode.subscribe(newMode => updatePixelElementDisability(newMode));
        }
        else {
            updatePixelElementDisability(null);
        }
    };
    let updateDimensionNameElement = () => {
        if (dimensionOptions)
            dimensionNameElement.classList.remove('dx-dashboard-toolbar-disabled-label');
        else
            dimensionNameElement.classList.add('dx-dashboard-toolbar-disabled-label');
    };
    let validateDimensionValue = (option) => {
        if (dimensionOptions && dimensionOptions.mode() === 'Fixed') {
            const newValue = option.value ? parseInt(option.value.toString()) : 0;
            const currentDimensionValue = dimensionOptions.value();
            const currentValue = currentDimensionValue ? parseInt(currentDimensionValue.toString()) : 0;
            if (currentValue !== newValue)
                return newValue >= minDimensionValue && newValue <= maxDimensionValue;
        }
        return true;
    };
    let items = [
        {
            name: namePrefix + 'Label',
            location: 'before',
            cssClass: 'dx-dashboard-toolbar-label',
            template: (data, index, element) => {
                updateDimensionNameElement();
                _jquery_helpers_1.$unwrap(element).appendChild(dimensionNameElement);
            }
        },
        {
            name: namePrefix + 'ButtonGroup',
            location: 'before',
            cssClass: 'dx-dashboard-toolbar-button-group',
            widget: 'dxButtonGroup',
            options: {
                items: [
                    {
                        text: _default_1.getLocalizationById('DashboardStringId.LayoutDimensionModeAuto'),
                        key: 'Auto'
                    },
                    {
                        text: _default_1.getLocalizationById('DashboardStringId.LayoutDimensionModeFixed'),
                        key: 'Fixed'
                    }
                ],
                keyExpr: 'key',
                onInitialized: (args) => {
                    buttonGroup = args.component;
                    updateButtonGroup();
                },
                width: '100%',
                disabled: true
            }
        },
        {
            name: namePrefix + 'NumberBox',
            location: 'before',
            cssClass: 'dx-dashboard-toolbar-spinedit',
            template: (data, index, element) => {
                const widgetContainer = document.createElement('div');
                _jquery_helpers_1.$unwrap(element).appendChild(widgetContainer);
                numberBox = new number_box_1.default(widgetContainer, {
                    disabled: true,
                    showSpinButtons: true,
                    width: '100%',
                    min: 1,
                    step: 10,
                });
                numberBoxValidator = new validator_1.default(widgetContainer, {
                    validationRules: [{
                            type: 'custom',
                            validationCallback: validateDimensionValue,
                            message: dimensionRangeRuleMessage,
                        }],
                });
                updateNumberBox();
            }
        },
        {
            name: namePrefix + 'PixelLabel',
            location: 'before',
            cssClass: 'dx-dashboard-toolbar-pixel-label',
            template: (data, index, element) => {
                updatePixelElement();
                _jquery_helpers_1.$unwrap(element).appendChild(pixelElement);
            }
        },
        Object.assign({ name: namePrefix + 'Separator', location: 'before' }, _toolbar_extension_1.createToolbarSeparator())
    ];
    return {
        items,
        assignModel: (options) => {
            dimensionOptions = options;
            updateDimensionNameElement();
            updateButtonGroup();
            updateNumberBox();
            updatePixelElement();
        },
        dispose: () => {
            numberBoxValidator && numberBoxValidator.dispose();
            valueSubscription && valueSubscription.dispose();
            buttonGroupModeSubscription && buttonGroupModeSubscription.dispose();
            textBoxModeSubscription && textBoxModeSubscription.dispose();
            pixelElementModeSubscription && pixelElementModeSubscription.dispose();
        }
    };
}
exports.getDimensionToolbarItems = getDimensionToolbarItems;
analytics_widgets_internal_1.registerBaseBinding('dxButtonGroup', 'options');
