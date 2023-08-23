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
exports.ConnectorPointsCalculator = void 0;
var ConnectorPointsCalculatorBase_1 = require("./ConnectorPointsCalculatorBase");
var ConnectorRenderPoint_1 = require("../ConnectorRenderPoint");
var ConnectorPointsCalculator = (function (_super) {
    __extends(ConnectorPointsCalculator, _super);
    function ConnectorPointsCalculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorPointsCalculator.prototype.getPoints = function () {
        return this.connector.points.map(function (pt, index) { return new ConnectorRenderPoint_1.ConnectorRenderPoint(pt.x, pt.y, index); });
    };
    return ConnectorPointsCalculator;
}(ConnectorPointsCalculatorBase_1.ConnectorPointsCalculatorBase));
exports.ConnectorPointsCalculator = ConnectorPointsCalculator;
//# sourceMappingURL=ConnectorPointsCalculator.js.map