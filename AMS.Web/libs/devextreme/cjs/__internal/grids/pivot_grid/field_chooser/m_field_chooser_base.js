/**
 * DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/m_field_chooser_base.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.FieldChooserBase = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _array_store = _interopRequireDefault(require("../../../../data/array_store"));
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.widget"));
var _m_column_state_mixin = _interopRequireDefault(require("../../../grids/grid_core/column_state_mixin/m_column_state_mixin"));
var _m_header_filter_core = require("../../../grids/grid_core/header_filter/m_header_filter_core");
var _m_utils = _interopRequireDefault(require("../../../grids/grid_core/m_utils"));
var _m_sorting_mixin = _interopRequireDefault(require("../../../grids/grid_core/sorting/m_sorting_mixin"));
var _m_widget_utils = require("../m_widget_utils");
var _m_sortable = require("../sortable/m_sortable");
var _const = require("./const");
var _dom = require("./dom");
var _utils = require("./utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var DIV = "<div>";
var HeaderFilterView = _m_header_filter_core.HeaderFilterView.inherit({
    _getSearchExpr: function(options, headerFilterOptions) {
        options.useDefaultSearchExpr = true;
        return this.callBase(options, headerFilterOptions)
    }
});
var processItems = function(groupItems, field) {
    var filterValues = [];
    var isTree = !!field.groupName;
    var isExcludeFilterType = "exclude" === field.filterType;
    if (field.filterValues) {
        (0, _iterator.each)(field.filterValues, (function(_, filterValue) {
            filterValues.push(Array.isArray(filterValue) ? filterValue.join("/") : filterValue && filterValue.valueOf())
        }))
    }(0, _m_widget_utils.foreachTree)(groupItems, (function(items) {
        var item = items[0];
        var path = (0, _m_widget_utils.createPath)(items);
        var preparedFilterValueByText = isTree ? (0, _iterator.map)(items, (function(item) {
            return item.text
        })).reverse().join("/") : item.text;
        item.value = isTree ? path.slice(0) : item.key || item.value;
        var preparedFilterValue = isTree ? path.join("/") : item.value && item.value.valueOf();
        if (item.children) {
            item.items = item.children;
            item.children = null
        }(0, _m_header_filter_core.updateHeaderFilterItemSelectionState)(item, item.key && filterValues.includes(preparedFilterValueByText) || filterValues.includes(preparedFilterValue), isExcludeFilterType)
    }))
};

function getMainGroupField(dataSource, sourceField) {
    var field = sourceField;
    if ((0, _type.isDefined)(sourceField.groupIndex)) {
        field = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex]
    }
    return field
}

function getStringState(state) {
    state = state || {};
    return JSON.stringify([state.fields, state.columnExpandedPaths, state.rowExpandedPaths])
}
var FieldChooserBase = _ui.default.inherit(_m_column_state_mixin.default).inherit(_m_sorting_mixin.default).inherit(_m_header_filter_core.headerFilterMixin).inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            allowFieldDragging: true,
            applyChangesMode: "instantly",
            state: null,
            headerFilter: {
                width: 252,
                height: 325,
                allowSelectAll: true,
                showRelevantValues: false,
                search: {
                    enabled: false,
                    timeout: 500,
                    editorOptions: {},
                    mode: "contains"
                },
                texts: {
                    emptyValue: _message.default.format("dxDataGrid-headerFilterEmptyValue"),
                    ok: _message.default.format("dxDataGrid-headerFilterOK"),
                    cancel: _message.default.format("dxDataGrid-headerFilterCancel")
                }
            },
            remoteSort: false
        })
    },
    _init: function() {
        this.callBase();
        this._headerFilterView = new HeaderFilterView(this);
        this._refreshDataSource();
        this.subscribeToEvents();
        _m_utils.default.logHeaderFilterDeprecatedWarningIfNeed(this)
    },
    _refreshDataSource: function() {
        var dataSource = this.option("dataSource");
        if (dataSource && dataSource.fields && dataSource.load) {
            this._dataSource = dataSource
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "dataSource":
                this._refreshDataSource();
                break;
            case "applyChangesMode":
            case "remoteSort":
                break;
            case "state":
                if (this._skipStateChange || !this._dataSource) {
                    break
                }
                if ("instantly" === this.option("applyChangesMode") && getStringState(this._dataSource.state()) !== getStringState(args.value)) {
                    this._dataSource.state(args.value)
                } else {
                    this._clean(true);
                    this._renderComponent()
                }
                break;
            case "headerFilter":
            case "allowFieldDragging":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    renderField: function(field, showColumnLines) {
        var $fieldContent = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldContent).text(field.caption || field.dataField);
        var $fieldElement = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.field).addClass(_const.CLASSES.area.box).data("field", field).append($fieldContent);
        var mainGroupField = getMainGroupField(this._dataSource, field);
        if ("data" !== field.area) {
            if (field.allowSorting) {
                this._applyColumnState({
                    name: "sort",
                    rootElement: $fieldElement,
                    column: {
                        alignment: this.option("rtlEnabled") ? "right" : "left",
                        sortOrder: "desc" === field.sortOrder ? "desc" : "asc",
                        allowSorting: field.allowSorting
                    },
                    showColumnLines: showColumnLines
                })
            }
            this._applyColumnState({
                name: "headerFilter",
                rootElement: $fieldElement,
                column: {
                    alignment: this.option("rtlEnabled") ? "right" : "left",
                    filterValues: mainGroupField.filterValues,
                    allowFiltering: mainGroupField.allowFiltering && !field.groupIndex,
                    allowSorting: field.allowSorting
                },
                showColumnLines: showColumnLines
            })
        }
        if (field.groupName) {
            $fieldElement.attr(_const.ATTRIBUTES.itemGroup, field.groupName)
        }
        return $fieldElement
    },
    _clean: function() {},
    _render: function() {
        this.callBase();
        this._headerFilterView.render(this.$element())
    },
    renderSortable: function() {
        var that = this;
        that._createComponent(that.$element(), _m_sortable.Sortable, (0, _extend.extend)({
            allowDragging: that.option("allowFieldDragging"),
            itemSelector: ".".concat(_const.CLASSES.area.field),
            itemContainerSelector: ".".concat(_const.CLASSES.area.fieldContainer),
            groupSelector: ".".concat(_const.CLASSES.area.fieldList),
            groupFilter: function() {
                var dataSource = that._dataSource;
                var $sortable = (0, _renderer.default)(this).closest(".dx-sortable-old");
                var pivotGrid = $sortable.data("dxPivotGrid");
                var pivotGridFieldChooser = $sortable.data("dxPivotGridFieldChooser");
                if (pivotGrid) {
                    return pivotGrid.getDataSource() === dataSource
                }
                if (pivotGridFieldChooser) {
                    return pivotGridFieldChooser.option("dataSource") === dataSource
                }
                return false
            },
            itemRender: _dom.dragAndDropItemRender,
            onDragging: function(e) {
                var field = e.sourceElement.data("field");
                var targetGroup = e.targetGroup;
                e.cancel = false;
                if (true === field.isMeasure) {
                    if ("column" === targetGroup || "row" === targetGroup || "filter" === targetGroup) {
                        e.cancel = true
                    }
                } else if (false === field.isMeasure && "data" === targetGroup) {
                    e.cancel = true
                }
            },
            useIndicator: true,
            onChanged: function(e) {
                var field = e.sourceElement.data("field");
                e.removeSourceElement = !!e.sourceGroup;
                that._adjustSortableOnChangedArgs(e);
                if (field) {
                    var targetIndex = e.targetIndex;
                    var mainGroupField;
                    var invisibleFieldsIndexOffset = 0;
                    that._processDemandState((function(dataSource) {
                        var fields = dataSource.getAreaFields(field.area, true);
                        mainGroupField = getMainGroupField(dataSource, field);
                        var visibleFields = fields.filter((function(f) {
                            return false !== f.visible
                        }));
                        var fieldBeforeTarget = visibleFields[targetIndex - 1];
                        if (fieldBeforeTarget) {
                            invisibleFieldsIndexOffset = fields.filter((function(f) {
                                return false === f.visible && f.areaIndex <= fieldBeforeTarget.areaIndex
                            })).length
                        }
                    }));
                    that._applyChanges([mainGroupField], {
                        area: e.targetGroup,
                        areaIndex: targetIndex + invisibleFieldsIndexOffset
                    })
                }
            }
        }, that._getSortableOptions()))
    },
    _processDemandState: function(func) {
        var isInstantlyMode = "instantly" === this.option("applyChangesMode");
        var dataSource = this._dataSource;
        if (isInstantlyMode) {
            func(dataSource, isInstantlyMode)
        } else {
            var currentState = dataSource.state();
            var pivotGridState = this.option("state");
            if (pivotGridState) {
                dataSource.state(pivotGridState, true)
            }
            func(dataSource, isInstantlyMode);
            dataSource.state(currentState, true)
        }
    },
    _applyChanges: function(fields, props) {
        var that = this;
        that._processDemandState((function(dataSource, isInstantlyMode) {
            fields.forEach((function(_ref) {
                var index = _ref.index;
                dataSource.field(index, props)
            }));
            if (isInstantlyMode) {
                dataSource.load()
            } else {
                that._changedHandler()
            }
        }))
    },
    _applyLocalSortChanges: function(fieldIdx, sortOrder) {
        this._processDemandState((function(dataSource) {
            dataSource.field(fieldIdx, {
                sortOrder: sortOrder
            });
            dataSource.sortLocal()
        }))
    },
    _adjustSortableOnChangedArgs: function(e) {
        e.removeSourceElement = false;
        e.removeTargetElement = true;
        e.removeSourceClass = false
    },
    _getSortableOptions: function() {
        return {
            direction: "auto"
        }
    },
    subscribeToEvents: function(element) {
        var that = this;
        var func = function(e) {
            var field = (0, _renderer.default)(e.currentTarget).data("field");
            var mainGroupField = (0, _extend.extend)(true, {}, getMainGroupField(that._dataSource, field));
            var isHeaderFilter = (0, _renderer.default)(e.target).hasClass(_const.CLASSES.headerFilter);
            var dataSource = that._dataSource;
            var type = mainGroupField.groupName ? "tree" : "list";
            var paginate = dataSource.paginate() && "list" === type;
            if (isHeaderFilter) {
                that._headerFilterView.showHeaderFilterMenu((0, _renderer.default)(e.currentTarget), (0, _extend.extend)(mainGroupField, {
                    type: type,
                    encodeHtml: that.option("encodeHtml"),
                    dataSource: {
                        useDefaultSearch: !paginate,
                        load: function(options) {
                            var userData = options.userData;
                            if (userData.store) {
                                return userData.store.load(options)
                            }
                            var d = new _deferred.Deferred;
                            dataSource.getFieldValues(mainGroupField.index, that.option("headerFilter.showRelevantValues"), paginate ? options : void 0).done((function(data) {
                                var emptyValue = that.option("headerFilter.texts.emptyValue");
                                data.forEach((function(element) {
                                    if (!element.text) {
                                        element.text = emptyValue
                                    }
                                }));
                                if (paginate) {
                                    d.resolve(data)
                                } else {
                                    userData.store = new _array_store.default(data);
                                    userData.store.load(options).done(d.resolve).fail(d.reject)
                                }
                            })).fail(d.reject);
                            return d
                        },
                        postProcess: function(data) {
                            processItems(data, mainGroupField);
                            return data
                        }
                    },
                    apply: function() {
                        that._applyChanges([mainGroupField], {
                            filterValues: this.filterValues,
                            filterType: this.filterType
                        })
                    }
                }))
            } else if (field.allowSorting && "data" !== field.area) {
                var isRemoteSort = that.option("remoteSort");
                var sortOrder = (0, _utils.reverseSortOrder)(field.sortOrder);
                if (isRemoteSort) {
                    that._applyChanges([field], {
                        sortOrder: sortOrder
                    })
                } else {
                    that._applyLocalSortChanges(field.index, sortOrder)
                }
            }
        };
        if (element) {
            _events_engine.default.on(element, _click.name, ".".concat(_const.CLASSES.area.field, ".").concat(_const.CLASSES.area.box), func);
            return
        }
        _events_engine.default.on(that.$element(), _click.name, ".".concat(_const.CLASSES.area.field, ".").concat(_const.CLASSES.area.box), func)
    },
    _initTemplates: _common.noop,
    addWidgetPrefix: function(className) {
        return "dx-pivotgrid-".concat(className)
    }
});
exports.FieldChooserBase = FieldChooserBase;
(0, _component_registrator.default)("dxPivotGridFieldChooserBase", FieldChooserBase);
var _default = {
    FieldChooserBase: FieldChooserBase
};
exports.default = _default;
