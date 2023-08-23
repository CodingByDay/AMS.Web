/**
 * DevExtreme (esm/__internal/grids/grid_core/filter/m_filter_sync.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isDefined
} from "../../../../core/utils/type";
import {
    addItem,
    filterHasField,
    getDefaultOperation,
    getFilterExpression,
    getMatchedConditions,
    getNormalizedFilter,
    removeFieldConditionsFromFilter,
    syncFilters
} from "../../../../ui/filter_builder/utils";
import filterUtils from "../../../../ui/shared/filtering";
import errors from "../../../../ui/widget/ui.errors";
import modules from "../m_modules";
import gridCoreUtils from "../m_utils";
import {
    anyOf,
    noneOf
} from "./m_filter_custom_operations";
var FILTER_ROW_OPERATIONS = ["=", "<>", "<", "<=", ">", ">=", "notcontains", "contains", "startswith", "endswith", "between"];
var FILTER_TYPES_INCLUDE = "include";
var FILTER_TYPES_EXCLUDE = "exclude";

function getColumnIdentifier(column) {
    return column.name || column.dataField
}

function checkForErrors(columns) {
    columns.forEach(column => {
        var identifier = getColumnIdentifier(column);
        if (!isDefined(identifier) && column.allowFiltering) {
            throw new errors.Error("E1049", column.caption)
        }
    })
}
var FilterSyncController = modules.Controller.inherit(function() {
    var getEmptyFilterValues = function() {
        return {
            filterType: FILTER_TYPES_INCLUDE,
            filterValues: void 0
        }
    };
    var canSyncHeaderFilterWithFilterRow = function(column) {
        var filterValues = column.filterValues || [];
        return !filterUtils.getGroupInterval(column) && !(column.headerFilter && column.headerFilter.dataSource) || 1 === filterValues.length && null === filterValues[0]
    };
    var getConditionFromFilterRow = function(column) {
        var value = column.filterValue;
        if (isDefined(value)) {
            var operation = column.selectedFilterOperation || column.defaultFilterOperation || getDefaultOperation(column);
            var filter = [getColumnIdentifier(column), operation, column.filterValue];
            return filter
        }
        return null
    };
    var getConditionFromHeaderFilter = function(column) {
        var selectedOperation;
        var value;
        var {
            filterValues: filterValues
        } = column;
        if (!filterValues) {
            return null
        }
        if (1 === filterValues.length && canSyncHeaderFilterWithFilterRow(column) && !Array.isArray(filterValues[0])) {
            column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = "<>" : selectedOperation = "=";
            value = filterValues[0]
        } else {
            column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = "noneof" : selectedOperation = "anyof";
            value = filterValues
        }
        return [getColumnIdentifier(column), selectedOperation, value]
    };
    var updateHeaderFilterCondition = function(columnsController, column, headerFilterCondition) {
        var headerFilter = function(headerFilterCondition, column) {
            if (!headerFilterCondition) {
                return getEmptyFilterValues()
            }
            var filterType;
            var selectedFilterOperation = headerFilterCondition[1];
            var value = headerFilterCondition[2];
            var hasArrayValue = Array.isArray(value);
            if (!hasArrayValue) {
                if (!canSyncHeaderFilterWithFilterRow(column)) {
                    return getEmptyFilterValues()
                }
            }
            switch (selectedFilterOperation) {
                case "anyof":
                case "=":
                    filterType = FILTER_TYPES_INCLUDE;
                    break;
                case "noneof":
                case "<>":
                    filterType = FILTER_TYPES_EXCLUDE;
                    break;
                default:
                    return getEmptyFilterValues()
            }
            return {
                filterType: filterType,
                filterValues: hasArrayValue ? value : [value]
            }
        }(headerFilterCondition, column);
        columnsController.columnOption(getColumnIdentifier(column), headerFilter)
    };
    var updateFilterRowCondition = function(columnsController, column, condition) {
        var filterRowOptions;
        var selectedFilterOperation = null === condition || void 0 === condition ? void 0 : condition[1];
        var filterValue = null === condition || void 0 === condition ? void 0 : condition[2];
        var filterOperations = column.filterOperations || column.defaultFilterOperations;
        if ((!filterOperations || filterOperations.indexOf(selectedFilterOperation) >= 0 || selectedFilterOperation === column.defaultFilterOperation) && FILTER_ROW_OPERATIONS.includes(selectedFilterOperation) && null !== filterValue) {
            if (selectedFilterOperation === column.defaultFilterOperation && !isDefined(column.selectedFilterOperation)) {
                selectedFilterOperation = column.selectedFilterOperation
            }
            filterRowOptions = {
                filterValue: filterValue,
                selectedFilterOperation: selectedFilterOperation
            }
        } else {
            filterRowOptions = {
                filterValue: void 0,
                selectedFilterOperation: void 0
            }
        }
        columnsController.columnOption(getColumnIdentifier(column), filterRowOptions)
    };
    return {
        syncFilterValue() {
            var that = this;
            var columnsController = that.getController("columns");
            var columns = columnsController.getFilteringColumns();
            this._skipSyncColumnOptions = true;
            columns.forEach(column => {
                var filterConditions = getMatchedConditions(that.option("filterValue"), getColumnIdentifier(column));
                if (1 === filterConditions.length) {
                    var filterCondition = filterConditions[0];
                    updateHeaderFilterCondition(columnsController, column, filterCondition);
                    updateFilterRowCondition(columnsController, column, filterCondition)
                } else {
                    isDefined(column.filterValues) && updateHeaderFilterCondition(columnsController, column, null);
                    isDefined(column.filterValue) && updateFilterRowCondition(columnsController, column, null)
                }
            });
            this._skipSyncColumnOptions = false
        },
        _initSync() {
            var columns = this.getController("columns").getColumns();
            var dataController = this.getController("data");
            var pageIndex = dataController.pageIndex();
            checkForErrors(columns);
            if (!this.option("filterValue")) {
                var filteringColumns = this.getController("columns").getFilteringColumns();
                var filterValue = this.getFilterValueFromColumns(filteringColumns);
                this.option("filterValue", filterValue)
            }
            this.syncFilterValue();
            dataController.pageIndex(pageIndex)
        },
        init() {
            var dataController = this.getController("data");
            if (dataController.isFilterSyncActive()) {
                if (this.getController("columns").isAllDataTypesDefined()) {
                    this._initSync()
                } else {
                    dataController.dataSourceChanged.add(() => this._initSync())
                }
            }
        },
        _getSyncFilterRow(filterValue, column) {
            var filter = getConditionFromFilterRow(column);
            if (isDefined(filter)) {
                return syncFilters(filterValue, filter)
            }
            return removeFieldConditionsFromFilter(filterValue, getColumnIdentifier(column))
        },
        _getSyncHeaderFilter(filterValue, column) {
            var filter = getConditionFromHeaderFilter(column);
            if (filter) {
                return syncFilters(filterValue, filter)
            }
            return removeFieldConditionsFromFilter(filterValue, getColumnIdentifier(column))
        },
        getFilterValueFromColumns(columns) {
            if (!this.getController("data").isFilterSyncActive()) {
                return null
            }
            var filterValue = ["and"];
            columns && columns.forEach(column => {
                var headerFilter = getConditionFromHeaderFilter(column);
                var filterRow = getConditionFromFilterRow(column);
                headerFilter && addItem(headerFilter, filterValue);
                filterRow && addItem(filterRow, filterValue)
            });
            return getNormalizedFilter(filterValue)
        },
        syncFilterRow(column) {
            this.option("filterValue", this._getSyncFilterRow(this.option("filterValue"), column))
        },
        syncHeaderFilter(column) {
            this.option("filterValue", this._getSyncHeaderFilter(this.option("filterValue"), column))
        },
        getCustomFilterOperations() {
            var filterBuilderCustomOperations = this.option("filterBuilder.customOperations") || [];
            return [anyOf(this.component), noneOf(this.component)].concat(filterBuilderCustomOperations)
        },
        publicMethods: () => ["getCustomFilterOperations"]
    }
}());
var DataControllerFilterSyncExtender = {
    isFilterSyncActive() {
        var filterSyncEnabledValue = this.option("filterSyncEnabled");
        return "auto" === filterSyncEnabledValue ? this.option("filterPanel.visible") : filterSyncEnabledValue
    },
    skipCalculateColumnFilters() {
        var filterSyncController = this.getController("filterSync");
        return (isDefined(this.option("filterValue")) || filterSyncController._skipSyncColumnOptions) && this.isFilterSyncActive()
    },
    _calculateAdditionalFilter() {
        if (false === this.option("filterPanel.filterEnabled")) {
            return this.callBase()
        }
        var filters = [this.callBase()];
        var columns = this.getController("columns").getFilteringColumns();
        var filterValue = this.option("filterValue");
        if (this.isFilterSyncActive()) {
            var currentColumn = this.getController("headerFilter").getCurrentColumn();
            if (currentColumn && filterValue) {
                filterValue = removeFieldConditionsFromFilter(filterValue, getColumnIdentifier(currentColumn))
            }
        }
        var customOperations = this.getController("filterSync").getCustomFilterOperations();
        var calculatedFilterValue = getFilterExpression(filterValue, columns, customOperations, "filterBuilder");
        if (calculatedFilterValue) {
            filters.push(calculatedFilterValue)
        }
        return gridCoreUtils.combineFilters(filters)
    },
    _parseColumnPropertyName(fullName) {
        var matched = fullName.match(/.*\.(.*)/);
        if (matched) {
            return matched[1]
        }
        return null
    },
    clearFilter(filterName) {
        this.component.beginUpdate();
        if (arguments.length > 0) {
            if ("filterValue" === filterName) {
                this.option("filterValue", null)
            }
            this.callBase(filterName)
        } else {
            this.option("filterValue", null);
            this.callBase()
        }
        this.component.endUpdate()
    },
    optionChanged(args) {
        switch (args.name) {
            case "filterValue":
                this._applyFilter();
                this.isFilterSyncActive() && this.getController("filterSync").syncFilterValue();
                args.handled = true;
                break;
            case "filterSyncEnabled":
                args.handled = true;
                break;
            case "columns":
                if (this.isFilterSyncActive()) {
                    var column = this.getController("columns").getColumnByPath(args.fullName);
                    var filterSyncController = this.getController("filterSync");
                    if (column && !filterSyncController._skipSyncColumnOptions) {
                        var propertyName = this._parseColumnPropertyName(args.fullName);
                        filterSyncController._skipSyncColumnOptions = true;
                        if ("filterType" === propertyName) {
                            if (FILTER_TYPES_EXCLUDE === args.value || FILTER_TYPES_EXCLUDE === args.previousValue) {
                                filterSyncController.syncHeaderFilter(column)
                            }
                        } else if ("filterValues" === propertyName) {
                            filterSyncController.syncHeaderFilter(column)
                        } else if (["filterValue", "selectedFilterOperation"].includes(propertyName)) {
                            filterSyncController.syncFilterRow(column, column.filterValue)
                        }
                        filterSyncController._skipSyncColumnOptions = false
                    }
                }
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
};
var ColumnHeadersViewFilterSyncExtender = {
    _isHeaderFilterEmpty(column) {
        if (this.getController("data").isFilterSyncActive()) {
            return !filterHasField(this.option("filterValue"), getColumnIdentifier(column))
        }
        return this.callBase(column)
    },
    _needUpdateFilterIndicators() {
        return !this.getController("data").isFilterSyncActive()
    },
    optionChanged(args) {
        if ("filterValue" === args.name) {
            this._updateHeaderFilterIndicators()
        } else {
            this.callBase(args)
        }
    }
};
export var filterSyncModule = {
    defaultOptions: () => ({
        filterValue: null,
        filterSyncEnabled: "auto"
    }),
    controllers: {
        filterSync: FilterSyncController
    },
    extenders: {
        controllers: {
            data: DataControllerFilterSyncExtender
        },
        views: {
            columnHeadersView: ColumnHeadersViewFilterSyncExtender
        }
    }
};
