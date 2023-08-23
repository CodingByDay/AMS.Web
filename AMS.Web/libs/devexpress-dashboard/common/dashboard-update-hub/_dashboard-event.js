/**
* DevExpress Dashboard (_dashboard-event.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardEvent = void 0;
class DashboardEvent {
    constructor() {
        this.handlers = [];
    }
    add(handler) {
        this.handlers.push(handler);
        return {
            dispose: () => this.remove(handler)
        };
    }
    remove(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    fire(args) {
        this.handlers.forEach(h => h(args));
    }
}
exports.DashboardEvent = DashboardEvent;
