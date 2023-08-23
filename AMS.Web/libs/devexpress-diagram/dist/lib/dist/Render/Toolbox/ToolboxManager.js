"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolboxManager = void 0;
var TextToolbox_1 = require("./TextToolbox");
var IconToolbox_1 = require("./IconToolbox");
var TextMeasurer_1 = require("../Measurer/TextMeasurer");
var math_1 = require("@devexpress/utils/lib/utils/math");
var ToolboxManager = (function () {
    function ToolboxManager(shapeDescriptionManager) {
        this.shapeDescriptionManager = shapeDescriptionManager;
        this.toolboxes = [];
        this.measurers = {};
    }
    ToolboxManager.prototype.create = function (parent, readOnly, allowDragging, renderAsText, shapes, getAllowedShapeTypes, instanceId, options) {
        var shapeTypes = Array.isArray(shapes) ? shapes : this.shapeDescriptionManager.getTypesByCategory(shapes);
        var toolbox = renderAsText ?
            new TextToolbox_1.TextToolbox(parent, readOnly, allowDragging, this.shapeDescriptionManager, shapeTypes, getAllowedShapeTypes) :
            new IconToolbox_1.IconToolbox(parent, readOnly, allowDragging, this.shapeDescriptionManager, shapeTypes, getAllowedShapeTypes, options, this.getOrCreateMeasurer(parent), instanceId);
        toolbox.render();
        this.toolboxes.push(toolbox);
        return toolbox;
    };
    ToolboxManager.prototype.clean = function (removeElement, toolbox) {
        var _this = this;
        if (toolbox) {
            toolbox.clean(removeElement);
            this.toolboxes.splice(this.toolboxes.indexOf(toolbox), 1);
            Object.keys(this.measurers).forEach(function (key) {
                if (_this.measurers[key] === toolbox.measurer)
                    delete _this.measurers[key];
            });
        }
        else {
            for (var i = 0; i < this.toolboxes.length; i++)
                this.toolboxes[i].clean(removeElement);
            this.toolboxes = [];
            this.measurers = {};
        }
    };
    ToolboxManager.prototype.refresh = function (toolboxes) {
        this.toolboxes.forEach(function (toolbox, index) {
            if (!toolboxes || (Array.isArray(toolboxes) && toolboxes.indexOf(index) > -1) || index === toolboxes)
                toolbox.render();
        });
    };
    ToolboxManager.prototype.applyFilter = function (str, toolboxes) {
        var _this = this;
        return this.toolboxes.reduce(function (aggr, toolbox, index) {
            if (!toolboxes || (Array.isArray(toolboxes) && toolboxes.indexOf(index) > -1) || index === toolboxes)
                toolbox.render(function (shapeType) { return _this.searchFilter(shapeType, str, index); }) && aggr.push(index);
            return aggr;
        }, []);
    };
    ToolboxManager.prototype.searchFilter = function (shapeType, str, toolboxIndex, filteringToolboxes) {
        if (!str || (filteringToolboxes && filteringToolboxes.indexOf(toolboxIndex) === -1))
            return true;
        str = str.toLowerCase();
        var shapeDescription = this.shapeDescriptionManager.get(shapeType);
        return shapeDescription.getTitle().toLowerCase().indexOf(str) > -1 ||
            shapeDescription.getDefaultText().toLowerCase().indexOf(str) > -1;
    };
    ToolboxManager.prototype.getOrCreateMeasurer = function (parent) {
        var id = parent.getAttribute("data-dxdiMeasurerID");
        if (!id || !this.measurers[id]) {
            id = math_1.MathUtils.generateGuid();
            this.measurers[id] = new TextMeasurer_1.TextMeasurer(parent);
            parent.setAttribute("data-dxdiMeasurerID", id);
        }
        return this.measurers[id];
    };
    return ToolboxManager;
}());
exports.ToolboxManager = ToolboxManager;
//# sourceMappingURL=ToolboxManager.js.map