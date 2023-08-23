"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnostics = void 0;
var LoggerDisplayMode;
(function (LoggerDisplayMode) {
    LoggerDisplayMode[LoggerDisplayMode["Disabled"] = 0] = "Disabled";
    LoggerDisplayMode[LoggerDisplayMode["Console"] = 1] = "Console";
    LoggerDisplayMode[LoggerDisplayMode["Document"] = 2] = "Document";
})(LoggerDisplayMode || (LoggerDisplayMode = {}));
var Diagnostics = (function () {
    function Diagnostics() {
    }
    Diagnostics.beginAverage = function (groupName) {
        if (!this.enableLogsAndTimers)
            return;
        this.lastAverageGroupName = groupName;
    };
    Diagnostics.endAverage = function () {
        if (!this.enableLogsAndTimers)
            return;
        this.lastAverageGroupName = null;
    };
    Diagnostics.tryLogAverage = function (groupName) {
        var _this = this;
        if (this.lastAverageGroupName === groupName)
            return;
        var sameGroupTimers = Object.keys(this.timers)
            .map(function (t) { return _this.timers[t]; })
            .filter(function (t) { return t.groupName === groupName; });
        if (!sameGroupTimers.filter(function (t) { return !t.endTime; }).length) {
            var average = sameGroupTimers.reduce(function (acc, t) { return acc + (t.endTime - t.startTime); }, 0) / sameGroupTimers.length;
            this.log("average: " + average);
        }
    };
    Diagnostics.timer = function (message) {
        if (!this.enableLogsAndTimers)
            return;
        this.lastCreatedTimer = {
            message: message,
            startTime: performance.now(),
            groupName: this.lastAverageGroupName
        };
    };
    Diagnostics.endTimer = function () {
        var _this = this;
        if (!this.enableLogsAndTimers)
            return;
        var timer = this.lastCreatedTimer;
        var timeoutID = setTimeout(function () {
            timer.endTime = performance.now();
            _this.showMessage("timer \"" + timer.message + "\": " + (timer.endTime - timer.startTime));
            timer.groupName && _this.tryLogAverage(timer.groupName);
        }, 0);
        this.timers[timeoutID] = timer;
        this.lastCreatedTimer = null;
    };
    Diagnostics.logPerfInfo = function () {
        var nodesCount = document.querySelector(".dxdi-control > svg").querySelectorAll("*").length;
        var memory = performance["memory"];
        this.log("nodes: " + nodesCount.toLocaleString() + (memory ? " memory: " : "") + (memory ? memory["usedJSHeapSize"].toLocaleString() : ""));
    };
    Diagnostics.log = function (message) {
        this.showMessage(message);
    };
    Diagnostics.showMessage = function (message) {
        switch (Diagnostics.mode) {
            case LoggerDisplayMode.Console:
                console.log(message);
                break;
            case LoggerDisplayMode.Document: {
                var existText = this.getElement().value;
                if (this.lastMessage === message) {
                    var lastLineLength = existText.indexOf("\r\n");
                    if (lastLineLength < 0)
                        lastLineLength = existText.indexOf("\n");
                    var lastLine = existText.substr(0, lastLineLength);
                    var regex = /( \()([0-9]+)(\))$/;
                    if (regex.test(lastLine))
                        lastLine = lastLine.replace(/( \()([0-9]+)(\))$/, function (str, before, val, after) { return before + (++val) + after; });
                    else
                        lastLine += " (1)";
                    this.getElement().value = lastLine + existText.substr(lastLineLength);
                }
                else {
                    this.getElement().value = message + "\r\n" + existText;
                    this.lastMessage = message;
                }
            }
        }
    };
    Diagnostics.getElement = function () {
        var _this = this;
        if (!this.el) {
            this.el = document.createElement("textarea");
            this.el.style.top = "0px";
            this.el.style.right = "0px";
            this.el.style.position = "fixed";
            this.el.style.background = "transparent";
            this.el.style.fontSize = "11px";
            this.el.style.fontFamily = "monospace";
            this.el.style.overflow = "auto";
            this.el.style.width = "400px";
            document.body.appendChild(this.el);
            var clr = document.createElement("button");
            clr.innerHTML = "x";
            clr.addEventListener("click", function () { _this.el.value = ""; _this.lastMessage = ""; });
            clr.style.top = "0px";
            clr.style.right = "400px";
            clr.style.position = "fixed";
            clr.style.opacity = "0.1";
            document.body.appendChild(clr);
        }
        return this.el;
    };
    Diagnostics.mode = LoggerDisplayMode.Document;
    Diagnostics.optimizeUsingRAF = true;
    Diagnostics.optimizeLayers = true;
    Diagnostics.timers = {};
    Diagnostics.enableLogsAndTimers = false;
    return Diagnostics;
}());
exports.Diagnostics = Diagnostics;
//# sourceMappingURL=Diagnostics.js.map