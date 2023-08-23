/**
 * DevExtreme (cjs/ui/gantt/ui.gantt.treelist.nodes_state.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GanttTreeListNodesState = exports.GanttTreeListNodeState = void 0;
var GanttTreeListNodeState = function() {
    function GanttTreeListNodeState(treeListNode) {
        var _treeListNode$parent;
        this.collapsed = false;
        this.key = treeListNode.key;
        this.children = treeListNode.children.map((function(node) {
            return node.key
        }));
        this.parentKey = null === (_treeListNode$parent = treeListNode.parent) || void 0 === _treeListNode$parent ? void 0 : _treeListNode$parent.key
    }
    var _proto = GanttTreeListNodeState.prototype;
    _proto.hasChildren = function() {
        return this.children.length > 0
    };
    _proto.removeChild = function(state) {
        var index = this.children.indexOf(state.key);
        if (index > -1) {
            this.children = this.children.splice(index, 1)
        }
    };
    _proto.equal = function(state) {
        if (!state || state.key !== this.key || state.parentKey !== this.parentKey) {
            return false
        }
        if (this.children.length !== state.children.length || this.children.some((function(value, index) {
                return value !== state.children[index]
            }))) {
            return false
        }
        return true
    };
    return GanttTreeListNodeState
}();
exports.GanttTreeListNodeState = GanttTreeListNodeState;
var GanttTreeListNodesState = function() {
    function GanttTreeListNodesState() {
        this._resetHash()
    }
    var _proto2 = GanttTreeListNodesState.prototype;
    _proto2.clear = function() {
        this._resetHash()
    };
    _proto2.applyNodes = function(nodes, rootValue) {
        var _this = this;
        if (this._rootValue !== rootValue) {
            this._resetHash();
            this._rootValue = rootValue
        }
        this._removeNonExistentNodes(nodes.map((function(node) {
            return node.key
        })));
        nodes.forEach((function(node) {
            return _this._applyNode(node)
        }));
        this._validateHash()
    };
    _proto2.saveExpandedState = function(expandedKeys) {
        var _this2 = this;
        this._hasCollapsed = false;
        this._forEachState((function(state) {
            if (state.hasChildren() && !expandedKeys.includes(state.key)) {
                state.collapsed = true;
                _this2._hasCollapsed = true
            }
        }))
    };
    _proto2.getExpandedKeys = function() {
        if (this._hasCollapsed) {
            var keys = [];
            this._forEachState((function(state) {
                if (state.hasChildren() && !state.collapsed) {
                    keys.push(state.key)
                }
            }));
            return keys
        }
        return null
    };
    _proto2._resetHash = function() {
        this._nodeHash = {};
        this._hasCollapsed = false
    };
    _proto2._getNodeState = function(key) {
        return this._nodeHash[key]
    };
    _proto2._removeNonExistentNodes = function(existingKeys) {
        var _this3 = this;
        if (existingKeys) {
            this._forEachState((function(state) {
                if (!existingKeys.includes(state.key)) {
                    _this3._removeStateWithChildren(state)
                }
            }))
        }
    };
    _proto2._removeStateWithChildren = function(key) {
        var _this4 = this;
        var state = this._getNodeState(key);
        if (state) {
            state.children.forEach((function(child) {
                return _this4._removeStateWithChildren(child)
            }));
            var parent = this._getNodeState(state.parentKey);
            if (parent) {
                parent.removeChild(state)
            }
            delete this._nodeHash[key]
        }
    };
    _proto2._applyNode = function(node) {
        var nodeState = new GanttTreeListNodeState(node);
        var oldState = this._getNodeState(node.key);
        if (!(null !== oldState && void 0 !== oldState && oldState.equal(nodeState))) {
            this._nodeHash[node.key] = nodeState;
            this._expandTreelineToNode(node.key)
        }
    };
    _proto2._expandTreelineToNode = function(key) {
        var state = this._getNodeState(key);
        var parent = this._getNodeState(null === state || void 0 === state ? void 0 : state.parentKey);
        while (parent) {
            parent.collapsed = false;
            parent = this._getNodeState(parent.parentKey)
        }
    };
    _proto2._validateHash = function() {
        var _this5 = this;
        Object.keys(this._nodeHash).forEach((function(key) {
            var state = _this5._getNodeState(key);
            var parentKey = null === state || void 0 === state ? void 0 : state.parentKey;
            if (parentKey !== _this5._rootValue && !_this5._getNodeState(parentKey)) {
                _this5._removeStateWithChildren(key)
            }
        }))
    };
    _proto2._forEachState = function(callback) {
        var _this6 = this;
        Object.keys(this._nodeHash).forEach((function(key) {
            var state = _this6._nodeHash[key];
            if (state) {
                callback(state)
            }
        }))
    };
    return GanttTreeListNodesState
}();
exports.GanttTreeListNodesState = GanttTreeListNodesState;
