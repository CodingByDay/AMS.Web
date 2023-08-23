﻿/**
* DevExpress Dashboard (_notificator-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationControllerViewModel = void 0;
const ko = require("knockout");
class NotificationControllerViewModel {
    constructor() {
        this._visible = false;
        this.visible = ko.observable(false);
        this.type = ko.observable('');
        this.notifications = ko.observableArray([]);
        this.suspended = ko.observable(false);
        this.displayTime = ko.computed(() => {
            if (this.type() !== 'success') {
                return 60 * 1000;
            }
            return 10 * 1000;
        });
        this.onHidden = () => this.reset();
        this.onInitialized = (args) => {
            this._widget = args.component;
        };
    }
    reset() {
        this.visible(false);
        this._visible = false;
    }
    updateNotification(type, title, detail) {
        var notification = { title: title, detail: detail || null };
        if (this.visible() && this.type() === type) {
            this.notifications.push(notification);
            if (this._widget)
                this._widget.repaint();
        }
        else {
            var isFirstLoading = !this.visible();
            this.visible(false);
            this.notifications.removeAll();
            this.notifications.push(notification);
            this.type(type);
            this._visible = true;
            if (isFirstLoading) {
                setTimeout(() => { this.visible(this._visible); }, 300);
            }
            else {
                this.visible(this._visible);
            }
        }
    }
}
exports.NotificationControllerViewModel = NotificationControllerViewModel;
