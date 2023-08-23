"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeDescriptionManager = void 0;
var ProcessShapeDescription_1 = require("./Flowchart/ProcessShapeDescription");
var DecisionShapeDescription_1 = require("./Flowchart/DecisionShapeDescription");
var ManualInputShapeDescription_1 = require("./Flowchart/ManualInputShapeDescription");
var DataShapeDescription_1 = require("./Flowchart/DataShapeDescription");
var TerminatorShapeDescription_1 = require("./Flowchart/TerminatorShapeDescription");
var PredefinedProcessShapeDescription_1 = require("./Flowchart/PredefinedProcessShapeDescription");
var ArrowUpDownShapeDescription_1 = require("./General/ArrowUpDownShapeDescription");
var ArrowRightShapeDescription_1 = require("./General/ArrowRightShapeDescription");
var ArrowUpShapeDescription_1 = require("./General/ArrowUpShapeDescription");
var CrossShapeDescription_1 = require("./General/CrossShapeDescription");
var DiamondShapeDescription_1 = require("./General/DiamondShapeDescription");
var EllipseShapeDescription_1 = require("./General/EllipseShapeDescription");
var HeartShapeDescription_1 = require("./General/HeartShapeDescription");
var RectangleShapeDescription_1 = require("./General/RectangleShapeDescription");
var TextShapeDescription_1 = require("./General/TextShapeDescription");
var PentagonShapeDescription_1 = require("./General/PentagonShapeDescription");
var HexagonShapeDescription_1 = require("./General/HexagonShapeDescription");
var OctagonShapeDescription_1 = require("./General/OctagonShapeDescription");
var StarShapeDescription_1 = require("./General/StarShapeDescription");
var ArrowDownShapeDescription_1 = require("./General/ArrowDownShapeDescription");
var ArrowLeftRightShapeDescription_1 = require("./General/ArrowLeftRightShapeDescription");
var ArrowLeftShapeDescription_1 = require("./General/ArrowLeftShapeDescription");
var TriangleShapeDescription_1 = require("./General/TriangleShapeDescription");
var DocumentShapeDescription_1 = require("./Flowchart/DocumentShapeDescription");
var MultipleDocumentsShapeDescription_1 = require("./Flowchart/MultipleDocumentsShapeDescription");
var PreparationShapeDescription_1 = require("./Flowchart/PreparationShapeDescription");
var HardDiskShapeDescription_1 = require("./Flowchart/HardDiskShapeDescription");
var DatabaseShapeDescription_1 = require("./Flowchart/DatabaseShapeDescription");
var InternalStorageShapeDescription_1 = require("./Flowchart/InternalStorageShapeDescription");
var PaperTapeShapeDescription_1 = require("./Flowchart/PaperTapeShapeDescription");
var ManualOperationShapeDescription_1 = require("./Flowchart/ManualOperationShapeDescription");
var DelayShapeDescription_1 = require("./Flowchart/DelayShapeDescription");
var StoredDataShapeDescription_1 = require("./Flowchart/StoredDataShapeDescription");
var MergeShapeDescription_1 = require("./Flowchart/MergeShapeDescription");
var DisplayShapeDescription_1 = require("./Flowchart/DisplayShapeDescription");
var OrShapeDescription_1 = require("./Flowchart/OrShapeDescription");
var SummingJunctionShapeDescription_1 = require("./Flowchart/SummingJunctionShapeDescription");
var CustomShapeDescription_1 = require("./CustomShapeDescription");
var VerticalContainerDescription_1 = require("./Containers/VerticalContainerDescription");
var HorizontalContainerDescription_1 = require("./Containers/HorizontalContainerDescription");
var CardWithImageOnTopDescription_1 = require("./OrgChart/CardWithImageOnTopDescription");
var ShapeTypes_1 = require("../ShapeTypes");
var ConnectorShapeDescription_1 = require("./Flowchart/ConnectorShapeDescription");
var Utils_1 = require("../../../Utils");
var CardWithHorizontalImageDescription_1 = require("./OrgChart/CardWithHorizontalImageDescription");
var ShapeDescriptionManager = (function () {
    function ShapeDescriptionManager() {
        this.descriptions = {};
        this.descriptionTypes = {};
        this.descriptionCategories = {};
        this.onShapeDecriptionChanged = new Utils_1.EventDispatcher();
        this.register(new TextShapeDescription_1.TextShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new RectangleShapeDescription_1.RectangleShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new EllipseShapeDescription_1.EllipseShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new CrossShapeDescription_1.CrossShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new TriangleShapeDescription_1.TriangleShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new DiamondShapeDescription_1.DiamondShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new HeartShapeDescription_1.HeartShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new PentagonShapeDescription_1.PentagonShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new HexagonShapeDescription_1.HexagonShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new OctagonShapeDescription_1.OctagonShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new StarShapeDescription_1.StarShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new ArrowUpShapeDescription_1.ArrowUpShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new ArrowDownShapeDescription_1.ArrowDownShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new ArrowLeftShapeDescription_1.ArrowLeftShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new ArrowRightShapeDescription_1.ArrowRightShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new ArrowUpDownShapeDescription_1.ArrowUpDownShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new ArrowLeftRightShapeDescription_1.ArrowLeftRightShapeDescription(), ShapeTypes_1.ShapeCategories.General);
        this.register(new ProcessShapeDescription_1.ProcessShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new DecisionShapeDescription_1.DecisionShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new TerminatorShapeDescription_1.TerminatorShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new PredefinedProcessShapeDescription_1.PredefinedProcessShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new DocumentShapeDescription_1.DocumentShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new MultipleDocumentsShapeDescription_1.MultipleDocumentsShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new ManualInputShapeDescription_1.ManualInputShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new PreparationShapeDescription_1.PreparationShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new DataShapeDescription_1.DataShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new DatabaseShapeDescription_1.DatabaseShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new HardDiskShapeDescription_1.HardDiskShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new InternalStorageShapeDescription_1.InternalStorageShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new PaperTapeShapeDescription_1.PaperTapeShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new ManualOperationShapeDescription_1.ManualOperationShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new DelayShapeDescription_1.DelayShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new StoredDataShapeDescription_1.StoredDataShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new DisplayShapeDescription_1.DisplayShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new MergeShapeDescription_1.MergeShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new ConnectorShapeDescription_1.ConnectorShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new OrShapeDescription_1.OrShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new SummingJunctionShapeDescription_1.SummingJunctionShapeDescription(), ShapeTypes_1.ShapeCategories.Flowchart);
        this.register(new CardWithHorizontalImageDescription_1.CardWithImageOnLeftDescription(), ShapeTypes_1.ShapeCategories.OrgChart);
        this.register(new CardWithHorizontalImageDescription_1.CardWithImageOnRightDescription(), ShapeTypes_1.ShapeCategories.OrgChart);
        this.register(new CardWithImageOnTopDescription_1.CardWithImageOnTopDescription(), ShapeTypes_1.ShapeCategories.OrgChart);
        this.register(new VerticalContainerDescription_1.VerticalContainerDescription(), ShapeTypes_1.ShapeCategories.Containers);
        this.register(new HorizontalContainerDescription_1.HorizontalContainerDescription(), ShapeTypes_1.ShapeCategories.Containers);
    }
    Object.defineProperty(ShapeDescriptionManager, "default", {
        get: function () {
            return ShapeDescriptionManager.defaultInstance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescriptionManager, "defaultContainer", {
        get: function () {
            return ShapeDescriptionManager.defaultContainerInstance;
        },
        enumerable: false,
        configurable: true
    });
    ShapeDescriptionManager.prototype.get = function (type) {
        return this.descriptions[type];
    };
    ShapeDescriptionManager.prototype.getTypesByCategory = function (category) {
        return this.descriptionTypes[category] || [];
    };
    ShapeDescriptionManager.prototype.getCategoryByType = function (type) {
        return this.descriptionCategories[type];
    };
    ShapeDescriptionManager.prototype.getCategoryByDescription = function (description) {
        return this.getCategoryByType(description.key);
    };
    ShapeDescriptionManager.prototype.register = function (description, category, type) {
        if (type === void 0) { type = description.key; }
        if (this.descriptions[type] !== undefined)
            throw Error("Description key is duplicated");
        this.descriptions[type] = description;
        if (!this.descriptionTypes[category])
            this.descriptionTypes[category] = [];
        this.descriptionTypes[category].push(type);
        this.descriptionCategories[type] = category;
        description.onChanged.add(this);
    };
    ShapeDescriptionManager.prototype.registerCustomShape = function (shape) {
        if (shape.type === undefined)
            throw Error("Custom shape type is not defined");
        if (this.descriptions[shape.type] !== undefined)
            throw Error("Custom shape type is duplicated");
        var baseDescription = shape.baseType && this.descriptions[shape.baseType];
        if (shape.minWidth > shape.maxWidth)
            shape.maxWidth = shape.minWidth;
        if (shape.minHeight > shape.maxHeight)
            shape.maxHeight = shape.minHeight;
        this.register(new CustomShapeDescription_1.CustomShapeDescription(shape, baseDescription), shape.category || ShapeTypes_1.ShapeCategories.Custom);
    };
    ShapeDescriptionManager.prototype.unregisterCustomShape = function (shapeType) {
        var description = this.descriptions[shapeType];
        if (description instanceof CustomShapeDescription_1.CustomShapeDescription) {
            description.onChanged.remove(this);
            var category = this.descriptionCategories[shapeType];
            delete this.descriptions[shapeType];
            delete this.descriptionCategories[shapeType];
            var index = this.descriptionTypes[category].indexOf(shapeType);
            this.descriptionTypes[category].splice(index, 1);
            if (this.descriptionTypes[category].length === 0)
                delete this.descriptionTypes[category];
        }
    };
    ShapeDescriptionManager.prototype.unregisterAllCustomShapes = function () {
        var _this = this;
        Object.keys(this.descriptions).forEach(function (shapeType) {
            _this.unregisterCustomShape(shapeType);
        });
    };
    ShapeDescriptionManager.prototype.notifyShapeDescriptionChanged = function (description) {
        this.onShapeDecriptionChanged.raise1(function (l) { return l.notifyShapeDescriptionChanged(description); });
    };
    ShapeDescriptionManager.defaultInstance = new RectangleShapeDescription_1.RectangleShapeDescription();
    ShapeDescriptionManager.defaultContainerInstance = new VerticalContainerDescription_1.VerticalContainerDescription();
    return ShapeDescriptionManager;
}());
exports.ShapeDescriptionManager = ShapeDescriptionManager;
//# sourceMappingURL=ShapeDescriptionManager.js.map