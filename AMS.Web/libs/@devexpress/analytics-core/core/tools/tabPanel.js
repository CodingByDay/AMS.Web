﻿/**
* DevExpress Analytics (core\tools\tabPanel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { getResizableOptions } from '../utils/_utils';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { extend } from '../../serializer/_utils';
import { accessibilityFontSizeZoomFactor } from '../../accessibility/_internal';
import { RightPanelKeyboardHelper } from '../../accessibility/_rightPanelKeyboardHelper';
export class TabPanel extends Disposable {
    constructor(options) {
        super();
        this.tabs = [];
        this.collapsed = ko.observable(false);
        this.position = ko.observable(TabPanel.Position.Right);
        this.toggleCollapsedText = ko.pureComputed(() => {
            var actionString = this.collapsed() ? 'Open' : 'Collapse';
            return getLocalization(actionString, 'ASPxReportsStringId.SidePanel_' + actionString);
        });
        this.cssClasses = (extendOptions) => {
            return extend({
                'dxrd-tab-panel-left': this.position() === TabPanel.Position.Left,
                'dxrd-tab-panel-right': this.position() === TabPanel.Position.Right,
                'dxrd-tab-panel-empty': this.isEmpty()
            }, extendOptions);
        };
        var tabs = options.tabs;
        var autoSelectTab = options.autoSelectTab;
        if (options.rtl)
            this.position(TabPanel.Position.Left);
        var zoomFactor = accessibilityFontSizeZoomFactor();
        var _self = this;
        this.tabs = tabs;
        if (tabs && tabs.length) {
            this._disposables.push(this.isEmpty = ko.computed(() => this.tabs.every(tab => !tab.visible())));
            this.tabs.forEach(tab => {
                tab.collapsed = this.collapsed;
            });
        }
        else
            this.isEmpty = ko.observable(true);
        this._disposables.push(ko.computed(() => {
            var visibleTabs = tabs.filter((tab) => { return tab.visible(); });
            if (visibleTabs.length !== 0) {
                if (visibleTabs.filter((tab) => { return tab.active.peek(); }).length === 0) {
                    visibleTabs[0].active(true);
                    if (autoSelectTab) {
                        this.collapsed(true);
                    }
                }
            }
            else {
                this.collapsed(true);
            }
        }));
        this._disposables.push(ko.computed(() => {
            var disabledTabs = tabs.filter((tab) => { return tab.disabled(); });
            if (disabledTabs.length !== 0) {
                if (disabledTabs.filter((tab) => { return tab.active.peek(); }).length !== 0) {
                    disabledTabs.forEach(t => t.active(false));
                    var nextSelectedTab = tabs.filter((tab) => { return !tab.disabled.peek() && tab.visible.peek(); })[0];
                    if (nextSelectedTab) {
                        this.selectTab({ model: nextSelectedTab });
                    }
                }
            }
        }));
        if (autoSelectTab) {
            this.tabs.forEach((tab) => {
                this._disposables.push(tab.active.subscribe((newVal) => {
                    if (newVal) {
                        this.selectTab({ model: tab });
                    }
                }));
            });
        }
        this.toggleTabVisibility = (e) => {
            var selectedTab = e.model;
            var activeTab = this.tabs.filter((tab) => tab.active())[0];
            if (selectedTab === activeTab) {
                this.collapsed(!this.collapsed());
            }
            else {
                this.selectTab(e);
            }
        };
        this.selectTab = (e) => {
            var selectedTab = e.model;
            if (!selectedTab.disabled()) {
                this.tabs.forEach(function (tab) {
                    tab.active(tab === selectedTab);
                });
                this.collapsed(false);
            }
        };
        var _width = ko.observable((options.width || 370) * zoomFactor);
        this._disposables.push(this.width = ko.pureComputed({
            read: () => { return this.collapsed() ? 0 : _width(); },
            write: (newWidth) => { _width(newWidth); }
        }));
        this._disposables.push(this.headerWidth = ko.pureComputed(() => { return this.isEmpty() ? 0 : (50 * zoomFactor + (this.collapsed() ? 0 : this.width())); }));
        this.getResizableOptions = ($element, panelOffset, minWidth) => {
            if (!this._resizableOptions || this._resizableOptions.$element !== $element) {
                this._resizableOptions = getResizableOptions($element, zoomFactor * panelOffset, minWidth, _self.position(), TabPanel.Position.Left, _self.width, _self.collapsed);
                _self._disposables.push(_self.position.subscribe((newVal) => {
                    this._resizableOptions.handles(newVal === TabPanel.Position.Left ? 'e' : 'w');
                }));
                _self._disposables.push(_self.collapsed.subscribe((isCollapsed) => {
                    this._resizableOptions.minimumWidth(isCollapsed ? 0 : minWidth);
                }));
            }
            return this._resizableOptions;
        };
        this._disposables.push({
            dispose: () => {
                this._resizableOptions = null;
                this.getResizableOptions = null;
            }
        });
        this._disposables.push(this.toggleCollapsedImage = ko.pureComputed(() => {
            var postfix = this.collapsed() ? '-expand' : '-collapse';
            return { class: 'dxrd-image-propertygrid' + postfix, template: 'dxrd-svg-tabs' + postfix };
        }));
        this.keyboardHelper = new RightPanelKeyboardHelper(this);
        this._disposables.push(this.toggleCollapsedText, this.keyboardHelper);
    }
    dispose() {
        super.dispose();
        this.disposeArray(this.tabs);
    }
    getTabByName(tabName) {
        return this.tabs.filter(x => x.name === tabName)[0];
    }
}
TabPanel.Position = {
    Left: 'Left',
    Right: 'Right'
};
