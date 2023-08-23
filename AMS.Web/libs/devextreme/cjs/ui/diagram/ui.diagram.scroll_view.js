/**
 * DevExtreme (cjs/ui/diagram/ui.diagram.scroll_view.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _m_widget_utils = require("../../__internal/grids/pivot_grid/m_widget_utils");
var _diagram = require("./diagram.importer");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var DiagramScrollView = function(_Widget) {
    _inheritsLoose(DiagramScrollView, _Widget);

    function DiagramScrollView() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = DiagramScrollView.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        var _getDiagram = (0, _diagram.getDiagram)(),
            EventDispatcher = _getDiagram.EventDispatcher;
        this.onScroll = new EventDispatcher;
        this._createOnCreateDiagramAction()
    };
    _proto._initMarkup = function() {
        var _this = this;
        _Widget.prototype._initMarkup.call(this);
        var $scrollViewWrapper = (0, _renderer.default)("<div>").appendTo(this.$element());
        var options = {
            direction: "both",
            bounceEnabled: false,
            scrollByContent: false,
            onScroll: function(_ref) {
                var scrollOffset = _ref.scrollOffset;
                _this._raiseOnScroll(scrollOffset.left, scrollOffset.top)
            }
        };
        var useNativeScrolling = this.option("useNativeScrolling");
        if (void 0 !== useNativeScrolling) {
            options.useNative = useNativeScrolling
        }
        this._scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default, options);
        this._onCreateDiagramAction({
            $parent: (0, _renderer.default)(this._scrollView.content()),
            scrollView: this
        })
    };
    _proto.setScroll = function(left, top) {
        this._scrollView.scrollTo({
            left: left,
            top: top
        });
        this._raiseOnScrollWithoutPoint()
    };
    _proto.offsetScroll = function(left, top) {
        this._scrollView.scrollBy({
            left: left,
            top: top
        });
        this._raiseOnScrollWithoutPoint()
    };
    _proto.getSize = function() {
        var _getDiagram2 = (0, _diagram.getDiagram)(),
            Size = _getDiagram2.Size;
        var $element = this._scrollView.$element();
        return new Size(Math.floor((0, _size.getWidth)($element)), Math.floor((0, _size.getHeight)($element)))
    };
    _proto.getScrollContainer = function() {
        return this._scrollView.$element()[0]
    };
    _proto.getScrollBarWidth = function() {
        return this.option("useNativeScrolling") ? (0, _m_widget_utils.calculateScrollbarWidth)() : 0
    };
    _proto.detachEvents = function() {};
    _proto._raiseOnScroll = function(left, top) {
        var _getDiagram3 = (0, _diagram.getDiagram)(),
            Point = _getDiagram3.Point;
        this.onScroll.raise("notifyScrollChanged", (function() {
            return new Point(left, top)
        }))
    };
    _proto._raiseOnScrollWithoutPoint = function() {
        var _this2 = this;
        var _getDiagram4 = (0, _diagram.getDiagram)(),
            Point = _getDiagram4.Point;
        this.onScroll.raise("notifyScrollChanged", (function() {
            return new Point(_this2._scrollView.scrollLeft(), _this2._scrollView.scrollTop())
        }))
    };
    _proto._createOnCreateDiagramAction = function() {
        this._onCreateDiagramAction = this._createActionByOption("onCreateDiagram")
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "onCreateDiagram":
                this._createOnCreateDiagramAction();
                break;
            case "useNativeScrolling":
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    return DiagramScrollView
}(_ui.default);
var _default = DiagramScrollView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
