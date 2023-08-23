﻿/**
* DevExpress Dashboard (_update-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateController = void 0;
const _utils_1 = require("../../data/_utils");
class UpdateController {
    constructor(_actionMap, _mapActionByState) {
        this._actionMap = _actionMap;
        this._mapActionByState = _mapActionByState;
        this._locker = 0;
        this._actions = [];
    }
    beginUpdate() {
        this._locker++;
    }
    endUpdate() {
        if (this._locker > 0)
            this._locker--;
        this.commitUpdate();
    }
    commitUpdate() {
        if (this._locker === 0 && this._actions.length) {
            this.beginUpdate();
            let actions = this._actions;
            this._actions = [];
            while (actions.length) {
                actions = _utils_1.distinct(actions
                    .map(action => this._mapActionByState(this.getControlState.bind(this), action))
                    .map(action => {
                    var masterAction = (this._actionMap[action].masterActions || []).filter(masterAction => actions.indexOf(masterAction) !== -1).pop();
                    return masterAction || action;
                }));
                const actualAction = actions.shift();
                actualAction && this._actionMap[actualAction].action();
            }
            this.endUpdate();
        }
    }
    addAction(actionName) {
        const actualAction = this._mapActionByState(this.getControlState.bind(this), actionName);
        this._actions.push(actualAction);
    }
    switchControlState(controlState) {
        this._state = controlState;
    }
    getControlState() {
        return this._state;
    }
}
exports.UpdateController = UpdateController;
