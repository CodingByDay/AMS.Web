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
exports.BPMNNode = exports.BPMNImporter = void 0;
var Graph_1 = require("../Layout/Graph");
var ShapeTypes_1 = require("../Model/Shapes/ShapeTypes");
var Structures_1 = require("../Layout/Structures");
var ImportUtils_1 = require("./ImportUtils");
var BPMNImporter = (function () {
    function BPMNImporter(xml) {
        this.doc = ImportUtils_1.ImportUtils.createDocument(xml);
        this.graph = new Graph_1.Graph([], []);
    }
    BPMNImporter.prototype.import = function () {
        for (var child = void 0, i = 0; child = this.doc.children[i]; i++)
            if (child.nodeName.toUpperCase() === "DEFINITIONS")
                this.onDefinitionsElement(child);
        this.validate();
        return this.graph;
    };
    BPMNImporter.prototype.validate = function () {
        var nodesMap = {};
        this.graph.nodes.forEach(function (n) { return nodesMap[n] = true; });
        for (var i = 0, edge = void 0; edge = this.graph.edges[i]; i++)
            if (!nodesMap[edge.from] || !nodesMap[edge.to]) {
                this.graph.edges.splice(i, 1);
                i--;
            }
    };
    BPMNImporter.prototype.onDefinitionsElement = function (element) {
        this.dataSourceKey = element.getAttribute("id");
        for (var child = void 0, i = 0; child = element.children[i]; i++)
            if (child.nodeName.toUpperCase() === "PROCESS")
                this.onProcessElement(child);
    };
    BPMNImporter.prototype.onProcessElement = function (element) {
        for (var child = void 0, i = 0; child = element.children[i]; i++)
            switch (child.nodeName.toUpperCase()) {
                case "STARTEVENT":
                    this.onStartEventElement(child);
                    break;
                case "SEQUENCEFLOW":
                    this.onSequenceFlowElement(child);
                    break;
                case "SCRIPTTASK":
                    this.onScriptTaskElement(child);
                    break;
                case "USERTASK":
                    this.onUserTaskElement(child);
                    break;
                case "SERVICETASK":
                    this.onServiceTaskElement(child);
                    break;
                case "SENDTASK":
                    this.onSendTaskElement(child);
                    break;
                case "EXCLUSIVEGATEWAY":
                    this.onExclusiveGateway(child);
                    break;
                case "ENDEVENT":
                    this.onEndEventGateway(child);
                    break;
            }
    };
    BPMNImporter.prototype.onStartEventElement = function (element) {
        var node = this.createNode(element);
        node.type = ShapeTypes_1.ShapeTypes.Ellipse;
        node.text = element.getAttribute("name");
        this.graph.addNode(node);
    };
    BPMNImporter.prototype.onSequenceFlowElement = function (element) {
        var fromKey = element.getAttribute("sourceRef");
        var toKey = element.getAttribute("targetRef");
        var edge = this.createEdge(element, fromKey, toKey);
        if (element.hasAttribute("name"))
            edge.text = element.getAttribute("name");
        this.graph.addEdge(edge);
    };
    BPMNImporter.prototype.onScriptTaskElement = function (element) {
        var node = this.createNode(element);
        node.text = element.getAttribute("name");
        this.graph.addNode(node);
    };
    BPMNImporter.prototype.onUserTaskElement = function (element) {
        var node = this.createNode(element);
        node.text = element.getAttribute("name");
        this.graph.addNode(node);
    };
    BPMNImporter.prototype.onServiceTaskElement = function (element) {
        var node = this.createNode(element);
        node.text = element.getAttribute("name");
        this.graph.addNode(node);
    };
    BPMNImporter.prototype.onSendTaskElement = function (element) {
        var node = this.createNode(element);
        node.text = element.getAttribute("name");
        this.graph.addNode(node);
    };
    BPMNImporter.prototype.onExclusiveGateway = function (element) {
        var node = this.createNode(element);
        node.text = element.getAttribute("name");
        node.type = ShapeTypes_1.ShapeTypes.Decision;
        this.graph.addNode(node);
    };
    BPMNImporter.prototype.onEndEventGateway = function (element) {
        var node = this.createNode(element);
        node.text = element.getAttribute("name");
        node.type = ShapeTypes_1.ShapeTypes.Ellipse;
        this.graph.addNode(node);
    };
    BPMNImporter.prototype.createNode = function (element) {
        return new BPMNNode(this.dataSourceKey, element.getAttribute("id"));
    };
    BPMNImporter.prototype.createEdge = function (element, fromKey, toKey) {
        return new BPMNEdge(this.dataSourceKey, element.getAttribute("id"), fromKey, toKey);
    };
    return BPMNImporter;
}());
exports.BPMNImporter = BPMNImporter;
var BPMNNode = (function () {
    function BPMNNode(sourceKey, key) {
        this.sourceKey = sourceKey;
        this.key = key;
        this.type = ShapeTypes_1.ShapeTypes.Rectangle;
    }
    return BPMNNode;
}());
exports.BPMNNode = BPMNNode;
var BPMNEdge = (function (_super) {
    __extends(BPMNEdge, _super);
    function BPMNEdge(sourceKey, key, fromKey, toKey) {
        var _this = _super.call(this, key, fromKey, toKey) || this;
        _this.sourceKey = sourceKey;
        return _this;
    }
    return BPMNEdge;
}(Structures_1.Edge));
//# sourceMappingURL=BPMNImporter.js.map