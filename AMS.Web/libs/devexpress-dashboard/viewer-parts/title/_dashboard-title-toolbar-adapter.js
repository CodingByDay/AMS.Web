﻿/**
* DevExpress Dashboard (_dashboard-title-toolbar-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTitleToolbarAdapter = void 0;
const $ = require("jquery");
const _formatter_1 = require("../../data/_formatter");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _localization_ids_1 = require("../../data/_localization-ids");
const _localizer_1 = require("../../data/_localizer");
const caption_toolbar_options_1 = require("../widgets/caption-toolbar/caption-toolbar-options");
const _caption_toolbar_css_classes_1 = require("../widgets/caption-toolbar/_caption-toolbar-css-classes");
const _dashboard_title_view_constants_1 = require("./_dashboard-title-view-constants");
const _filter_icon_tooptip_1 = require("./_filter-icon-tooptip");
class DashboardTitleToolbarAdapter {
    static getTitleOptions(titleViewModel, masterFilterValues, showExportDialog, showParametersDialog, allowExport) {
        let contentItems = [];
        let actionItems = [];
        if (titleViewModel) {
            let imageViewModel = titleViewModel.LayoutModel.ImageViewModel;
            let exportMenu = {
                title: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportTo),
                items: [],
                itemClick: (itemData, itemElement, index) => { showExportDialog(_caption_toolbar_css_classes_1._convertToExportFormat(itemData)); },
                type: 'icons'
            };
            exportMenu.items.push(_caption_toolbar_css_classes_1.cssClasses.iconExportToPDF);
            if (_caption_toolbar_css_classes_1.Settings.allowExportToImage)
                exportMenu.items.push(_caption_toolbar_css_classes_1.cssClasses.iconExportToImage);
            exportMenu.items.push(_caption_toolbar_css_classes_1.cssClasses.iconExportToExcel);
            if (imageViewModel) {
                contentItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.dashboardTitleImage,
                    template: () => {
                        let imageSrs = (imageViewModel.Url ? imageViewModel.Url : 'data:' + imageViewModel.MimeType + ';base64,' + imageViewModel.SourceBase64String);
                        let $image = $.fn.constructor('<img>').attr('src', imageSrs).height(_dashboard_title_view_constants_1.titleHeight + 'px');
                        $image.on('load', () => {
                            let imageHeight = $image.height();
                            if (imageHeight > _dashboard_title_view_constants_1.titleHeight) {
                                $image.width(Math.floor($image.width() * (_dashboard_title_view_constants_1.titleHeight / imageHeight)));
                                $image.height(_dashboard_title_view_constants_1.titleHeight);
                            }
                            else {
                                $image.css('margin-top', Math.ceil((_dashboard_title_view_constants_1.titleHeight - imageHeight) / 2));
                            }
                            $image.css({ visibility: 'visible' });
                        });
                        return $image;
                    }
                });
            }
            if (titleViewModel.Text) {
                contentItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.dashboardTitle,
                    type: 'text',
                    text: titleViewModel.Text
                });
            }
            if (titleViewModel.IncludeMasterFilterValues && masterFilterValues && masterFilterValues.length == 1 && masterFilterValues[0].Values.length == 1)
                contentItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.titleFilterText,
                    template: () => {
                        return $.fn.constructor('<div/>').text(this._getMasterFilterText(masterFilterValues)).addClass([_caption_toolbar_css_classes_1.cssClasses.filterText, _caption_toolbar_css_classes_1.cssClasses.ellipsisText].join(' '));
                    }
                });
            if (titleViewModel.IncludeMasterFilterValues && masterFilterValues && (masterFilterValues.length > 1 || (masterFilterValues.length > 0 && masterFilterValues[0].Values.length > 1)))
                contentItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.titleFilterIcon,
                    icon: _caption_toolbar_css_classes_1.cssClasses.iconFilter,
                    type: 'button',
                    tooltip: {
                        template: (contentElement) => {
                            return _filter_icon_tooptip_1.FilterIconTooltip.getTooltipContent(_jquery_helpers_1.$wrap(contentElement), masterFilterValues);
                        },
                    }
                });
            if (allowExport)
                actionItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.exportMenu,
                    menu: exportMenu,
                    icon: _caption_toolbar_css_classes_1.cssClasses.iconItemExport,
                    type: 'menu',
                    hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportTo)
                });
            if (titleViewModel.ShowParametersButton)
                actionItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.parameters,
                    click: (element) => { showParametersDialog(); },
                    icon: _caption_toolbar_css_classes_1.cssClasses.iconParameters,
                    type: 'button',
                    hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ParametersFormCaption)
                });
        }
        return {
            contentItems: contentItems,
            actionItems: actionItems,
            navigationItems: []
        };
    }
    static _getMasterFilterText(masterFilterValues) {
        if (masterFilterValues) {
            masterFilterValues.forEach(dimFilterValue => {
                dimFilterValue.Values.forEach((val) => {
                    val.Format = val.Format || {};
                });
            });
            if (masterFilterValues.length == 1 && masterFilterValues[0].Values.length == 1) {
                return _formatter_1.formatFilterValue(masterFilterValues[0].Values[0]);
            }
        }
        return undefined;
    }
}
exports.DashboardTitleToolbarAdapter = DashboardTitleToolbarAdapter;
