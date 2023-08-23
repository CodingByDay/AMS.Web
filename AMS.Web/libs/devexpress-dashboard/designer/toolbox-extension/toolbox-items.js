﻿/**
* DevExpress Dashboard (toolbox-items.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardToolbarGroup = exports.DashboardToolboxGroup = exports.DashboardToolbarItem = exports.DashboardToolboxItem = exports.DashboardMenuItem = void 0;
const ko = require("knockout");
var leftPanelWidth = 81;
class DashboardMenuItem {
    constructor(id, title, index, hotKey, click) {
        this.id = id;
        this.title = title;
        this.click = click;
        this.hotKey = hotKey;
        this.index = index;
        this.selected = ko.observable(false);
        this.disabled = ko.observable(false);
    }
}
exports.DashboardMenuItem = DashboardMenuItem;
class DashboardToolboxItem {
    constructor(name, click, icon, title, type) {
        this.name = name;
        this.click = click;
        this.icon = icon;
        this.title = title;
        this.type = type;
        this.disabled = ko.observable(false);
    }
}
exports.DashboardToolboxItem = DashboardToolboxItem;
class DashboardToolbarItem {
    constructor(name, click, icon, title) {
        this.name = name;
        this.click = click;
        this.icon = icon;
        this.title = title;
        this.disabled = ko.observable(false);
    }
}
exports.DashboardToolbarItem = DashboardToolbarItem;
class DashboardToolboxGroup {
    constructor(name, title, index, ...items) {
        this.name = name;
        this.title = title;
        this.index = index;
        this.items = ko.observableArray(items);
    }
}
exports.DashboardToolboxGroup = DashboardToolboxGroup;
class DashboardToolbarGroup {
    constructor(name, title, index, ...items) {
        this.name = name;
        this.title = title;
        this.index = index;
        this.items = ko.observableArray(items);
    }
}
exports.DashboardToolbarGroup = DashboardToolbarGroup;
