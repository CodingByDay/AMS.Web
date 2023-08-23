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
exports.TextToolbox = void 0;
var Toolbox_1 = require("./Toolbox");
var TextToolbox = (function (_super) {
    __extends(TextToolbox, _super);
    function TextToolbox(parent, readOnly, allowDragging, shapeDescriptionManager, shapeTypes, getAllowedShapeTypes) {
        return _super.call(this, parent, readOnly, allowDragging, shapeDescriptionManager, shapeTypes, getAllowedShapeTypes) || this;
    }
    TextToolbox.prototype.createElements = function (element, shapeTypes) {
        var _this = this;
        shapeTypes.forEach(function (shapeType) {
            var description = _this.shapeDescriptionManager.get(shapeType);
            var itemEl = document.createElement("div");
            itemEl.setAttribute("class", "toolbox-text-item");
            itemEl.setAttribute("data-tb-type", shapeType);
            itemEl.textContent = description.getDefaultText() || description.getTitle();
            element.appendChild(itemEl);
        });
    };
    TextToolbox.prototype.createDraggingElement = function (draggingObject) {
        var element = document.createElement("DIV");
        element.setAttribute("class", "dxdi-toolbox-drag-text-item");
        var shapeDescription = this.shapeDescriptionManager.get(draggingObject.evt.data);
        element.textContent = shapeDescription.getDefaultText() || shapeDescription.getTitle();
        document.body.appendChild(element);
        return element;
    };
    return TextToolbox;
}(Toolbox_1.Toolbox));
exports.TextToolbox = TextToolbox;
//# sourceMappingURL=TextToolbox.js.map