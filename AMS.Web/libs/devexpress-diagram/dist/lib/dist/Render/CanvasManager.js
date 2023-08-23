"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasManager = void 0;
var ModelChange_1 = require("../Model/ModelChange");
var CanvasManagerBase_1 = require("./CanvasManagerBase");
var CanvasManager = (function (_super) {
    __extends(CanvasManager, _super);
    function CanvasManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pendingChanges = {};
        _this.pendingRemoveChanges = {};
        _this.updatesLock = 0;
        return _this;
    }
    CanvasManager.prototype.beginUpdate = function () {
        this.updatesLock++;
    };
    CanvasManager.prototype.endUpdate = function () {
        this.updatesLock--;
        if (this.updatesLock === 0)
            this.applyPendingChanges();
    };
    CanvasManager.prototype.getPendingChanges = function () {
        var _this = this;
        return Object.keys(this.pendingChanges).map(function (key) { return _this.pendingChanges[key]; });
    };
    CanvasManager.prototype.getPendingRemoveChanges = function () {
        var _this = this;
        return Object.keys(this.pendingRemoveChanges).map(function (key) { return _this.pendingRemoveChanges[key]; });
    };
    CanvasManager.prototype.applyPendingChanges = function () {
        var removeChanges = this.getPendingRemoveChanges();
        if (removeChanges.length) {
            this.applyChangesCore(removeChanges);
            this.pendingRemoveChanges = {};
        }
        var changes = this.getPendingChanges();
        if (changes.length) {
            this.applyChangesCore(changes);
            this.pendingChanges = {};
        }
    };
    CanvasManager.prototype.applyChangesCore = function (changes) {
        var _this = this;
        var changesToReapply = [];
        changes.forEach(function (change) {
            if (!_this.applyChange(change))
                changesToReapply.push(change);
        });
        if (changesToReapply.length && changesToReapply.length !== changes.length)
            this.applyChangesCore(changesToReapply);
    };
    CanvasManager.prototype.postponeChanges = function (changes) {
        var _this = this;
        changes.forEach(function (change) {
            if (change.type === ModelChange_1.ItemChangeType.Remove) {
                _this.pendingRemoveChanges[change.key] = change;
                delete _this.pendingChanges[change.key];
            }
            else if (!_this.pendingChanges[change.key]) {
                if (_this.pendingRemoveChanges[change.key] && change.type !== ModelChange_1.ItemChangeType.Create)
                    throw new Error("Incorrect model changes sequence.");
                _this.pendingChanges[change.key] = change;
            }
            else if (change.type === ModelChange_1.ItemChangeType.Create)
                _this.pendingChanges[change.key] = change;
            else if (change.type === ModelChange_1.ItemChangeType.UpdateStructure) {
                if (_this.pendingChanges[change.key].type === ModelChange_1.ItemChangeType.UpdateProperties)
                    _this.pendingChanges[change.key] = change;
            }
            else if (change.type === ModelChange_1.ItemChangeType.UpdateProperties) {
                if (_this.pendingChanges[change.key].type === ModelChange_1.ItemChangeType.Update)
                    _this.pendingChanges[change.key] = change;
            }
            else if (change.type === ModelChange_1.ItemChangeType.UpdateClassName)
                if (_this.pendingChanges[change.key].type === ModelChange_1.ItemChangeType.UpdateClassName)
                    _this.pendingChanges[change.key] = change;
        });
    };
    CanvasManager.prototype.applyOrPostponeChanges = function (changes) {
        if (this.updatesLock === 0)
            this.applyChangesCore(changes);
        else
            this.postponeChanges(changes);
    };
    CanvasManager.prototype.notifyModelChanged = function (changes) {
        this.applyOrPostponeChanges(changes);
    };
    CanvasManager.prototype.notifyPageColorChanged = function (color) { };
    CanvasManager.prototype.notifyPageSizeChanged = function (pageSize, pageLandscape) { };
    return CanvasManager;
}(CanvasManagerBase_1.CanvasManagerBase));
exports.CanvasManager = CanvasManager;
//# sourceMappingURL=CanvasManager.js.map