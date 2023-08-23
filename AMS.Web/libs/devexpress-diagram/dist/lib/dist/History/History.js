"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
var HistoryItem_1 = require("./HistoryItem");
var Utils_1 = require("../Utils");
var History = (function () {
    function History(modelManipulator, diagram) {
        this.modelManipulator = modelManipulator;
        this.diagram = diagram;
        this.historyItems = [];
        this.currentIndex = -1;
        this.incrementalId = -1;
        this.transactionLevel = -1;
        this.unmodifiedIndex = -1;
        this.currTransactionId = 0;
        this.onChanged = new Utils_1.EventDispatcher();
    }
    History.prototype.isModified = function () {
        if (this.unmodifiedIndex === this.currentIndex)
            return false;
        var startIndex = Math.min(this.unmodifiedIndex, this.currentIndex);
        var endIndex = Math.max(this.unmodifiedIndex, this.currentIndex);
        for (var i = startIndex + 1; i <= endIndex; i++)
            if (this.historyItems[i].changeModified())
                return true;
        return false;
    };
    History.prototype.undo = function () {
        if (!this.canUndo())
            return;
        this.historyItems[this.currentIndex].undo(this.modelManipulator);
        this.currentIndex--;
        this.raiseChanged();
    };
    History.prototype.redo = function () {
        if (!this.canRedo())
            return;
        if (this.startDataSyncItem) {
            this.startDataSyncItem.undo(this.modelManipulator);
            this.startDataSyncItem = undefined;
        }
        this.currentIndex++;
        this.historyItems[this.currentIndex].redo(this.modelManipulator);
        this.raiseChanged();
    };
    History.prototype.canUndo = function () {
        return this.currentIndex >= 0;
    };
    History.prototype.canRedo = function () {
        return this.currentIndex < this.historyItems.length - 1;
    };
    History.prototype.beginTransaction = function () {
        this.transactionLevel++;
        if (this.transactionLevel === 0)
            this.transaction = new HistoryItem_1.CompositionHistoryItem();
        var id = this.currTransactionId++;
        return id;
    };
    History.prototype.endTransaction = function (isDataSyncTransaction) {
        if (--this.transactionLevel >= 0)
            return;
        var transactionLength = this.transaction.historyItems.length;
        if (transactionLength > 0) {
            var historyItem = transactionLength > 1 ? this.transaction : this.transaction.historyItems.pop();
            if (isDataSyncTransaction)
                this.addDataSyncItem(historyItem);
            else
                this.addInternal(historyItem);
        }
        if (transactionLength > 0 && !isDataSyncTransaction)
            this.raiseChanged();
        delete this.transaction;
    };
    History.prototype.addAndRedo = function (historyItem) {
        this.add(historyItem);
        historyItem.redo(this.modelManipulator);
        this.raiseChanged();
    };
    History.prototype.add = function (historyItem) {
        if (this.transactionLevel >= 0)
            this.transaction.add(historyItem);
        else
            this.addInternal(historyItem);
    };
    History.prototype.addInternal = function (historyItem) {
        if (this.currentIndex < this.historyItems.length - 1) {
            this.historyItems.splice(this.currentIndex + 1);
            this.unmodifiedIndex = Math.min(this.unmodifiedIndex, this.currentIndex);
        }
        this.historyItems.push(historyItem);
        this.currentIndex++;
        this.deleteOldItems();
    };
    History.prototype.addDataSyncItem = function (historyItem) {
        var toHistoryItem = this.historyItems[this.currentIndex];
        if (toHistoryItem) {
            var compositionHistoryItem = void 0;
            if (toHistoryItem instanceof HistoryItem_1.CompositionHistoryItem)
                compositionHistoryItem = toHistoryItem;
            else {
                this.historyItems.splice(this.currentIndex, 1);
                compositionHistoryItem = new HistoryItem_1.CompositionHistoryItem();
                this.historyItems.push(compositionHistoryItem);
                compositionHistoryItem.historyItems.push(toHistoryItem);
            }
            compositionHistoryItem.dataSyncItems.push(historyItem);
        }
        else if (this.historyItems.length)
            this.startDataSyncItem = historyItem;
    };
    History.prototype.deleteOldItems = function () {
        var exceedItemsCount = this.historyItems.length - History.MAX_HISTORY_ITEM_COUNT;
        if (exceedItemsCount > 0 && this.currentIndex > exceedItemsCount) {
            this.historyItems.splice(0, exceedItemsCount);
            this.currentIndex -= exceedItemsCount;
        }
    };
    History.prototype.getNextId = function () {
        this.incrementalId++;
        return this.incrementalId;
    };
    History.prototype.clear = function () {
        this.currentIndex = -1;
        this.unmodifiedIndex = -1;
        this.incrementalId = -1;
        this.historyItems = [];
        delete this.transaction;
        this.transactionLevel = -1;
    };
    History.prototype.resetModified = function () {
        this.unmodifiedIndex = this.currentIndex;
    };
    History.prototype.getCurrentItemId = function () {
        if (this.currentIndex === -1)
            return -1;
        var currentItem = this.historyItems[this.currentIndex];
        if (currentItem.uniqueId === -1)
            currentItem.uniqueId = this.getNextId();
        return currentItem.uniqueId;
    };
    History.prototype.undoTransaction = function () {
        this.diagram.beginUpdateCanvas();
        var items = this.transaction.historyItems;
        while (items.length)
            items.pop().undo(this.modelManipulator);
        this.diagram.endUpdateCanvas();
    };
    History.prototype.undoTransactionTo = function (item) {
        this.diagram.beginUpdateCanvas();
        var items = this.transaction.historyItems;
        while (items.length) {
            var ti = items.pop();
            ti.undo(this.modelManipulator);
            if (ti === item)
                break;
        }
        this.diagram.endUpdateCanvas();
    };
    History.prototype.raiseChanged = function () {
        if (this.transactionLevel === -1)
            this.onChanged.raise("notifyHistoryChanged");
    };
    History.MAX_HISTORY_ITEM_COUNT = 100;
    return History;
}());
exports.History = History;
//# sourceMappingURL=History.js.map