﻿/**
* DevExpress Dashboard (_dialog-form.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialogForm = exports.dialogSizes = exports.dialogClasses = void 0;
const resize_callbacks_1 = require("devextreme/core/utils/resize_callbacks");
const button_1 = require("devextreme/ui/button");
const popup_1 = require("devextreme/ui/popup");
const $ = require("jquery");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const _dashboard_layout_mode_helper_1 = require("../../_dashboard-layout-mode-helper");
const _render_helper_1 = require("../_render-helper");
exports.dialogClasses = {
    form: 'dx-dashboard-form',
    formWrapper: 'dx-dashboard-form-wrapper dx-designer-viewport',
    simpleDialog: 'dx-dashboard-simple-dialog',
    element: 'dx-dashboard-dialog-element',
    elementLargeMarginTop: 'dx-dashboard-dialog-element-large-margin-top',
    elementSmallMarginTop: 'dx-dashboard-dialog-element-small-margin-top',
    name: 'dx-dashboard-dialog-element-name',
    disabledName: 'dx-dashboard-dialog-element-name-disabled',
    box: 'dx-dashboard-dialog-element-box',
    buttons: 'dx-dashboard-dialog-buttons',
    elementTextBox: 'dx-dashboard-dialog-element-text-box',
    elementNumberBox: 'dx-dashboard-dialog-element-number-box',
};
exports.dialogSizes = {
    width: 500,
    height: 500,
    minWidth: 350,
    minHeight: 200,
};
var widgetMargin = 1;
class dialogForm {
    constructor(options) {
        this.controlCreationCallbacks = _jquery_helpers_1.createJQueryCallbacks();
        this.options = options;
        this._initialize();
    }
    showDialog() {
        this.popupInstance.show();
    }
    hideDialog() {
        this.popupInstance.hide();
    }
    dispose() {
        if (this.popupInstance) {
            this.popupInstance.dispose();
        }
        if (this.options && this.options.disposeContent) {
            this.options.disposeContent();
        }
    }
    _initialize() {
        var that = this, options = that.options, getMaxSize = function () {
            var windowHeight = _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile ? window.innerHeight : undefined;
            var height = $.fn.constructor(options.dialogContainer).height();
            return !!windowHeight && (windowHeight > height) ? windowHeight : height;
        }, correctMaxSize = function () {
            that.popupInstance.option('maxHeight', getMaxSize());
            var popupContent = _jquery_helpers_1.$unwrap(that.popupInstance.content());
            var scrollableContent = popupContent.querySelector('.dx-scrollable-container');
            if (scrollableContent) {
                scrollableContent.style.maxHeight = _jquery_helpers_1.$unwrap(that.popupInstance.content()).style.maxHeight;
            }
        }, resizeHandler = function () {
            correctMaxSize();
        };
        var popupOptions = {
            title: options.title,
            showCloseButton: true,
            toolbarItems: [{ toolbar: 'bottom' }],
            animation: {
                show: {
                    type: 'fade',
                    from: 0, to: 1
                },
                hide: {
                    type: 'fade',
                    from: 1, to: 0
                }
            },
            position: {
                my: 'center',
                at: 'center',
                of: _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile ? window : options.dialogContainer
            },
            width: options.width,
            height: options.height,
            maxHeight: getMaxSize(),
            minWidth: exports.dialogSizes.minWidth,
            maxWidth: _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile ? '90vw' : null,
            minHeight: exports.dialogSizes.minHeight,
            resizeEnabled: !options.allowScrolling,
            onInitialized: function (e) {
                resize_callbacks_1.default.add(resizeHandler);
            },
            onDisposing: function (e) {
                resize_callbacks_1.default.remove(resizeHandler);
            },
            onResize: function (e) {
                var dataGrid = e.component.content().children().data('dxDataGrid');
                if (!!dataGrid) {
                    dataGrid.updateDimensions();
                }
            },
            onContentReady: function (args) {
                if (that.options.buttons) {
                    var buttons = document.createElement('div');
                    buttons.classList.add(exports.dialogClasses.buttons);
                    that.options.buttons.forEach(button => {
                        let element = document.createElement('div');
                        element.classList.add(button.className);
                        buttons.appendChild(element);
                        new button_1.default(element, {
                            text: button.name,
                            onClick: function () {
                                button.func();
                                if (button.hide)
                                    that.popupInstance.hide();
                            },
                            type: button.isDefault ? 'default' : 'normal'
                        });
                    });
                    _jquery_helpers_1.$unwrap(that.popupInstance.bottomToolbar()).appendChild(buttons);
                    var buttonsDeltaWidth = -$.fn.constructor(buttons).width();
                    for (let i = 0; i < buttons.children.length; i++) {
                        buttonsDeltaWidth += _render_helper_1.RenderHelper.getElementBoxFloat(buttons.children[i]).width;
                    }
                    if (buttonsDeltaWidth > 0) {
                        this.option('minWidth', this.option('minWidth') + Math.ceil(buttonsDeltaWidth));
                    }
                }
                if (!options.deferredRendering) {
                    that._renderPopupContent(args.component);
                }
            },
            onShowing: function (args) {
                if (options.deferredRendering) {
                    that._renderPopupContent(args.component);
                }
                var formWidth = that._setLabelsWidth();
                that.options.setActualState(formWidth);
                options.onShowing && options.onShowing(args);
            },
            onHidden: options.onHidden,
            onShown: function (args) {
                correctMaxSize();
                options.onShown && options.onShown(args);
            }
        };
        popupOptions['bottomTemplate'] = () => { };
        popupOptions['container'] = options.dialogContainer;
        if (!_dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile) {
            popupOptions.position['boundary'] = options.dialogContainer;
        }
        popupOptions.wrapperAttr = {
            class: (!options.allowScrolling ? exports.dialogClasses.simpleDialog + ' ' : '') + exports.dialogClasses.formWrapper
        };
        let popup = document.createElement('div');
        options.dialogContainer.appendChild(popup);
        that.popupInstance = new popup_1.default(popup, popupOptions);
    }
    _renderPopupContent(component) {
        this.options.disposeContent();
        let content = this.options.renderContent(this.controlCreationCallbacks);
        if (this.scrollableContent) {
            this.scrollableContent.innerHTML = '';
            this.scrollableContent.appendChild(content);
            this.controlCreationCallbacks.fire(component);
        }
        else {
            _jquery_helpers_1.$unwrap(this.popupInstance.content()).appendChild(content);
            this.controlCreationCallbacks.fire(component);
            if (this.options.allowScrolling) {
                this.scrollableContent = _render_helper_1.RenderHelper.wrapScrollable(_jquery_helpers_1.$unwrap(this.popupInstance.content()), 'auto', 'both');
            }
        }
    }
    _setLabelsWidth() {
        var that = this, width = 0, maxWidth = 400, minWidth = 100, leftOffset = 10, $div = undefined, $span = undefined, $label = undefined, $labelsContainer = $.fn.constructor('<div/>', {
            'class': 'dx-dashboard-labels-container'
        }).appendTo($.fn.constructor('.dx-dashboard-container')), $controlContainer, boxWidth = 0;
        $.each(_jquery_helpers_1.$wrap(that.popupInstance.content()).find('.' + exports.dialogClasses.form).children(), function (index, div) {
            $div = $.fn.constructor(div);
            $span = $.fn.constructor('<span/>').append($div.find('.' + exports.dialogClasses.name).text());
            $labelsContainer.append($span).append('<br/>');
            $controlContainer = $div.find('.' + exports.dialogClasses.box);
            boxWidth = Math.max(boxWidth, $controlContainer.outerWidth());
        });
        $.each($labelsContainer.children(), function (index, label) {
            $label = $.fn.constructor(label);
            width = Math.max(width, $label.width());
        });
        width = Math.max(minWidth, Math.min(maxWidth, width)) + leftOffset;
        $labelsContainer.remove();
        $.fn.constructor('.' + exports.dialogClasses.name).css('width', width);
        return width + boxWidth + _utils_1.pxToNumber($.fn.constructor('.' + exports.dialogClasses.name).css('margin-right')) + 2 * widgetMargin;
    }
}
exports.dialogForm = dialogForm;
