/**
 * DevExtreme (cjs/viz/core/center_template.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugins = void 0;
var _utils = require("../core/utils");
var _common = require("../../core/utils/common");
var pieChartPlugin = {
    name: "center_template_pie_chart",
    init: _common.noop,
    dispose: function() {
        this._centerTemplateGroup.linkOff().dispose()
    },
    extenders: {
        _createHtmlStructure: function() {
            var patchedFontOptions = (0, _utils.patchFontOptions)(this._themeManager._font);
            this._centerTemplateGroup = this._renderer.g().attr({
                class: "dxc-hole-template"
            }).linkOn(this._renderer.root, "center-template").css(patchedFontOptions).linkAppend()
        },
        _renderExtraElements: function() {
            this._requestChange(["CENTER_TEMPLATE"])
        }
    },
    members: {
        _renderCenterTemplate: function() {
            var template = this.option("centerTemplate");
            var centerTemplateGroup = this._centerTemplateGroup.clear();
            if (!template) {
                return
            }
            centerTemplateGroup.attr({
                visibility: "hidden"
            });
            var center = this._getCenter();
            this._getTemplate(template).render({
                model: this,
                container: centerTemplateGroup.element,
                onRendered: function() {
                    var group = centerTemplateGroup;
                    var bBox = group.getBBox();
                    var bBoxCenterX = bBox.x + bBox.width / 2;
                    var bBoxCenterY = bBox.y + bBox.height / 2;
                    group.move(center.x - bBoxCenterX, center.y - bBoxCenterY);
                    group.attr({
                        visibility: "visible"
                    })
                }
            })
        }
    },
    customize: function(constructor) {
        constructor.addChange({
            code: "CENTER_TEMPLATE",
            handler: function() {
                this._renderCenterTemplate()
            },
            option: "centerTemplate"
        })
    }
};
var gaugePlugin = {
    name: "center_template_gauge",
    init: _common.noop,
    dispose: pieChartPlugin.dispose,
    extenders: {
        _initCore: function() {
            this._createCenterTemplateGroup()
        },
        _renderContent: function() {
            var patchedFontOptions = (0, _utils.patchFontOptions)(this._themeManager._font);
            this._centerTemplateGroup.css(patchedFontOptions);
            this._requestChange(["CENTER_TEMPLATE"])
        },
        _updateExtraElements: function() {
            this._requestChange(["CENTER_TEMPLATE"])
        }
    },
    members: {
        _renderCenterTemplate: pieChartPlugin.members._renderCenterTemplate,
        _createCenterTemplateGroup: function() {
            this._centerTemplateGroup = this._renderer.g().attr({
                class: "dxg-hole-template"
            }).linkOn(this._renderer.root, "center-template").linkAppend()
        }
    },
    customize: pieChartPlugin.customize
};
var plugins = {
    pieChart: pieChartPlugin,
    gauge: gaugePlugin
};
exports.plugins = plugins;
