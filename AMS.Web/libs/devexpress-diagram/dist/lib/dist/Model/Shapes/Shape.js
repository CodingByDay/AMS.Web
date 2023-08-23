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
exports.Shape = void 0;
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var ShapeDescription_1 = require("./Descriptions/ShapeDescription");
var ShapeParameters_1 = require("./ShapeParameters");
var DiagramItem_1 = require("../DiagramItem");
var ConnectionPoint_1 = require("../ConnectionPoint");
var ImageInfo_1 = require("../../Images/ImageInfo");
var NativeItem_1 = require("../../Api/NativeItem");
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(description, position, forToolbox) {
        var _this = _super.call(this) || this;
        _this.description = description;
        _this.children = [];
        _this.expanded = true;
        _this.expandedSize = undefined;
        if (!description)
            throw Error("Shape type is incorrect");
        _this.position = position.clone();
        var defaultSize = forToolbox ? description.toolboxSize : description.defaultSize;
        _this.size = defaultSize.clone();
        _this.text = description.getDefaultText();
        _this.image = new ImageInfo_1.ImageInfo(description.getDefaultImageUrl());
        _this.parameters = new ShapeParameters_1.ShapeParameters();
        description.createParameters(_this.parameters);
        return _this;
    }
    Shape.prototype.assign = function (item) {
        _super.prototype.assign.call(this, item);
        item.size = this.size.clone();
        item.text = this.text;
        item.image = this.image.clone();
        item.parameters = this.parameters.clone();
        item.children = this.children.slice();
        item.expanded = this.expanded;
        if (this.expandedSize)
            item.expandedSize = this.expandedSize.clone();
    };
    Shape.prototype.clone = function () {
        var clone = new Shape(this.description, this.position.clone());
        this.assign(clone);
        return clone;
    };
    Object.defineProperty(Shape.prototype, "enableText", {
        get: function () { return this.description.enableText; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "allowEditText", {
        get: function () { return this.description.allowEditText; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "hasTemplate", {
        get: function () { return this.description.hasTemplate; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "enableChildren", {
        get: function () { return this.description.enableChildren; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "enableImage", {
        get: function () { return this.description.enableImage; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "allowEditImage", {
        get: function () { return this.description.allowEditImage; },
        enumerable: false,
        configurable: true
    });
    Shape.prototype.getMinWidth = function (settingsMinWidth) {
        return typeof (this.description.minWidth) === "number" ? this.description.minWidth :
            typeof (settingsMinWidth) === "number" ? settingsMinWidth : ShapeDescription_1.ShapeMinDimension;
    };
    Shape.prototype.getMinHeight = function (settingsMinHeight) {
        return typeof (this.description.minHeight) === "number" ? this.description.minHeight :
            typeof (settingsMinHeight) === "number" ? settingsMinHeight : ShapeDescription_1.ShapeMinDimension;
    };
    Shape.prototype.getMaxWidth = function (settingsMaxWidth) {
        return typeof (this.description.maxWidth) === "number" ? this.description.maxWidth :
            typeof (settingsMaxWidth) === "number" ? settingsMaxWidth : undefined;
    };
    Shape.prototype.getMaxHeight = function (settingsMaxHeight) {
        return typeof (this.description.maxHeight) === "number" ? this.description.maxHeight :
            typeof (settingsMaxHeight) === "number" ? settingsMaxHeight : undefined;
    };
    Shape.prototype.createPrimitives = function (instanceId) {
        return this.description.createPrimitives(this, instanceId);
    };
    Shape.prototype.createSelectorPrimitives = function () {
        return this.description.createSelectorPrimitives(this);
    };
    Shape.prototype.normalizeX = function (x) {
        return Math.max(this.position.x, Math.min(x, this.position.x + this.size.width));
    };
    Shape.prototype.normalizeY = function (y) {
        return Math.max(this.position.y, Math.min(y, this.position.y + this.size.height));
    };
    Shape.prototype.getConnectionPoints = function () {
        var _this = this;
        var result = this.description.getConnectionPoints().map(function (pt) {
            var point = new ConnectionPoint_1.ConnectionPoint(_this.position.x + pt.x * _this.size.width, _this.position.y + pt.y * _this.size.height, pt.side);
            _this.description.processConnectionPoint(_this, point);
            return point;
        });
        return result;
    };
    Shape.prototype.getConnectionPointSide = function (point, targetPoint) {
        if (point.side !== DiagramItem_1.ConnectionPointSide.Undefined)
            return point.side;
        return this.getConnectionPointSideByGeometry(point);
    };
    Shape.prototype.getConnectionPointSideByGeometry = function (point) {
        var pt = point.clone().offset(-this.position.x, -this.position.y).multiply(1 / this.size.width, 1 / this.size.height);
        return ShapeDescription_1.ShapeDescription.getConnectionPointSideByGeometry(pt);
    };
    Shape.prototype.getConnectionPointIndexForItem = function (item, connectionPointIndex) {
        return this.description.getConnectionPointIndexForItem(item, connectionPointIndex);
    };
    Shape.prototype.getConnectionPointIndexForSide = function (side) {
        return this.description.getConnectionPointIndexForSide(side);
    };
    Shape.prototype.toggleExpandedSize = function () {
        if (!this.expanded) {
            this.expandedSize = this.size.clone();
            this.size = this.getCollapsedSize();
        }
        else {
            this.size = this.getExpandedSize();
            this.expandedSize = undefined;
        }
    };
    Shape.prototype.getExpandedSize = function () {
        return this.description.getExpandedSize(this);
    };
    Shape.prototype.getCollapsedSize = function () {
        return this.description.getCollapsedSize(this);
    };
    Shape.prototype.getToolboxHeightToWidthRatio = function () {
        return this.description.getToolboxHeightToWidthRatio(this.size.width, this.size.height);
    };
    Object.defineProperty(Shape.prototype, "allowResizeHorizontally", {
        get: function () {
            return this.description.allowResizeHorizontally(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "allowResizeVertically", {
        get: function () {
            return this.description.allowResizeVertically(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "rectangle", {
        get: function () {
            return rectangle_1.Rectangle.fromGeometry(this.position, this.size);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "clientRectangle", {
        get: function () {
            return this.description.getClientRectangle(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "textRectangle", {
        get: function () {
            return this.description.getTextRectangle(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "textEditRectangle", {
        get: function () {
            return this.description.getTextEditRectangle(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "textAngle", {
        get: function () {
            return this.description.getTextAngle();
        },
        enumerable: false,
        configurable: true
    });
    Shape.prototype.toNative = function (units) {
        var item = new NativeItem_1.NativeShape(this.key, this.dataKey);
        item.type = this.description.key;
        item.text = this.text;
        item.position = this.position.clone();
        item.size = this.size.clone();
        item.attachedConnectorIds = this.attachedConnectors.map(function (c) { return c.key; });
        item.applyUnits(units);
        item.containerId = this.container ? this.container.key : null;
        item.containerChildItemIds = this.children.map(function (item) { return item.key; });
        item.containerExpanded = this.expanded;
        return item;
    };
    return Shape;
}(DiagramItem_1.DiagramItem));
exports.Shape = Shape;
//# sourceMappingURL=Shape.js.map