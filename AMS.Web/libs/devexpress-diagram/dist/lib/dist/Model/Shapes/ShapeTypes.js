"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeType = exports.ShapeTypes = exports.ShapeCategories = void 0;
var ShapeCategories = (function () {
    function ShapeCategories() {
    }
    ShapeCategories.General = "general";
    ShapeCategories.Flowchart = "flowchart";
    ShapeCategories.OrgChart = "orgChart";
    ShapeCategories.Containers = "containers";
    ShapeCategories.Custom = "custom";
    return ShapeCategories;
}());
exports.ShapeCategories = ShapeCategories;
var ShapeTypes = (function () {
    function ShapeTypes() {
    }
    ShapeTypes.Text = "text";
    ShapeTypes.Rectangle = "rectangle";
    ShapeTypes.Ellipse = "ellipse";
    ShapeTypes.Cross = "cross";
    ShapeTypes.Triangle = "triangle";
    ShapeTypes.Diamond = "diamond";
    ShapeTypes.Heart = "heart";
    ShapeTypes.Pentagon = "pentagon";
    ShapeTypes.Hexagon = "hexagon";
    ShapeTypes.Octagon = "octagon";
    ShapeTypes.Star = "star";
    ShapeTypes.ArrowLeft = "arrowLeft";
    ShapeTypes.ArrowUp = "arrowTop";
    ShapeTypes.ArrowRight = "arrowRight";
    ShapeTypes.ArrowDown = "arrowBottom";
    ShapeTypes.ArrowUpDown = "arrowNorthSouth";
    ShapeTypes.ArrowLeftRight = "arrowEastWest";
    ShapeTypes.Process = "process";
    ShapeTypes.Decision = "decision";
    ShapeTypes.Terminator = "terminator";
    ShapeTypes.PredefinedProcess = "predefinedProcess";
    ShapeTypes.Document = "document";
    ShapeTypes.MultipleDocuments = "multipleDocuments";
    ShapeTypes.ManualInput = "manualInput";
    ShapeTypes.Preparation = "preparation";
    ShapeTypes.Data = "data";
    ShapeTypes.Database = "database";
    ShapeTypes.HardDisk = "hardDisk";
    ShapeTypes.InternalStorage = "internalStorage";
    ShapeTypes.PaperTape = "paperTape";
    ShapeTypes.ManualOperation = "manualOperation";
    ShapeTypes.Delay = "delay";
    ShapeTypes.StoredData = "storedData";
    ShapeTypes.Display = "display";
    ShapeTypes.Merge = "merge";
    ShapeTypes.Connector = "connector";
    ShapeTypes.Or = "or";
    ShapeTypes.SummingJunction = "summingJunction";
    ShapeTypes.Container = "container";
    ShapeTypes.VerticalContainer = "verticalContainer";
    ShapeTypes.HorizontalContainer = "horizontalContainer";
    ShapeTypes.Card = "card";
    ShapeTypes.CardWithImageOnLeft = "cardWithImageOnLeft";
    ShapeTypes.CardWithImageOnTop = "cardWithImageOnTop";
    ShapeTypes.CardWithImageOnRight = "cardWithImageOnRight";
    return ShapeTypes;
}());
exports.ShapeTypes = ShapeTypes;
var ShapeType;
(function (ShapeType) {
    ShapeType[ShapeType["text"] = 0] = "text";
    ShapeType[ShapeType["rectangle"] = 1] = "rectangle";
    ShapeType[ShapeType["ellipse"] = 2] = "ellipse";
    ShapeType[ShapeType["cross"] = 3] = "cross";
    ShapeType[ShapeType["triangle"] = 4] = "triangle";
    ShapeType[ShapeType["diamond"] = 5] = "diamond";
    ShapeType[ShapeType["heart"] = 6] = "heart";
    ShapeType[ShapeType["pentagon"] = 7] = "pentagon";
    ShapeType[ShapeType["hexagon"] = 8] = "hexagon";
    ShapeType[ShapeType["octagon"] = 9] = "octagon";
    ShapeType[ShapeType["star"] = 10] = "star";
    ShapeType[ShapeType["arrowLeft"] = 11] = "arrowLeft";
    ShapeType[ShapeType["arrowTop"] = 12] = "arrowTop";
    ShapeType[ShapeType["arrowRight"] = 13] = "arrowRight";
    ShapeType[ShapeType["arrowBottom"] = 14] = "arrowBottom";
    ShapeType[ShapeType["arrowNorthSouth"] = 15] = "arrowNorthSouth";
    ShapeType[ShapeType["arrowEastWest"] = 16] = "arrowEastWest";
    ShapeType[ShapeType["process"] = 17] = "process";
    ShapeType[ShapeType["decision"] = 18] = "decision";
    ShapeType[ShapeType["terminator"] = 19] = "terminator";
    ShapeType[ShapeType["predefinedProcess"] = 20] = "predefinedProcess";
    ShapeType[ShapeType["document"] = 21] = "document";
    ShapeType[ShapeType["multipleDocuments"] = 22] = "multipleDocuments";
    ShapeType[ShapeType["manualInput"] = 23] = "manualInput";
    ShapeType[ShapeType["preparation"] = 24] = "preparation";
    ShapeType[ShapeType["data"] = 25] = "data";
    ShapeType[ShapeType["database"] = 26] = "database";
    ShapeType[ShapeType["hardDisk"] = 27] = "hardDisk";
    ShapeType[ShapeType["internalStorage"] = 28] = "internalStorage";
    ShapeType[ShapeType["paperTape"] = 29] = "paperTape";
    ShapeType[ShapeType["manualOperation"] = 30] = "manualOperation";
    ShapeType[ShapeType["delay"] = 31] = "delay";
    ShapeType[ShapeType["storedData"] = 32] = "storedData";
    ShapeType[ShapeType["display"] = 33] = "display";
    ShapeType[ShapeType["merge"] = 34] = "merge";
    ShapeType[ShapeType["connector"] = 35] = "connector";
    ShapeType[ShapeType["or"] = 36] = "or";
    ShapeType[ShapeType["summingJunction"] = 37] = "summingJunction";
    ShapeType[ShapeType["verticalContainer"] = 38] = "verticalContainer";
    ShapeType[ShapeType["horizontalContainer"] = 39] = "horizontalContainer";
    ShapeType[ShapeType["cardWithImageOnLeft"] = 40] = "cardWithImageOnLeft";
    ShapeType[ShapeType["cardWithImageOnTop"] = 41] = "cardWithImageOnTop";
    ShapeType[ShapeType["cardWithImageOnRight"] = 42] = "cardWithImageOnRight";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));
//# sourceMappingURL=ShapeTypes.js.map