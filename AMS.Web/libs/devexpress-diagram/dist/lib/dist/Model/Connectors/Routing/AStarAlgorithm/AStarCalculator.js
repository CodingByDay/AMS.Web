"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AStarCalculator = void 0;
var AStarCalculator = (function () {
    function AStarCalculator() {
    }
    AStarCalculator.calculate = function (context) {
        if (context) {
            var callBack = this.start(context);
            while (callBack)
                callBack = callBack(context);
        }
    };
    AStarCalculator.start = function (context) {
        context.start();
        return context.shouldStartContinue ? AStarCalculator.startContinue : AStarCalculator.finishWithPath;
    };
    AStarCalculator.startContinue = function (context) {
        context.startContinue();
        return context.shouldFinish ? AStarCalculator.finishWithPath : AStarCalculator.endContinue;
    };
    AStarCalculator.endContinue = function (context) {
        context.endContinue();
        return context.shouldStartContinue ? AStarCalculator.startContinue : AStarCalculator.finishWithoutPath;
    };
    AStarCalculator.finishWithPath = function (context) {
        context.finishWithPath();
    };
    AStarCalculator.finishWithoutPath = function (context) {
        context.finishWithoutPath();
    };
    return AStarCalculator;
}());
exports.AStarCalculator = AStarCalculator;
//# sourceMappingURL=AStarCalculator.js.map