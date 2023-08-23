/**
 * DevExtreme (esm/__internal/grids/data_grid/grouping/m_grouping_expanded.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    toComparable
} from "../../../../core/utils/data";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import dataQuery from "../../../../data/query";
import storeHelper from "../../../../data/store_helper";
import {
    keysEqual
} from "../../../../data/utils";
import dataGridCore from "../m_core";
import {
    createGroupFilter
} from "../m_utils";
import {
    createOffsetFilter,
    GroupingHelper as GroupingHelperCore
} from "./m_grouping_core";
var loadTotalCount = function(dataSource, options) {
    var d = new Deferred;
    var loadOptions = extend({
        skip: 0,
        take: 1,
        requireTotalCount: true
    }, options);
    dataSource.load(loadOptions).done((data, extra) => {
        d.resolve(extra && extra.totalCount)
    }).fail(d.reject.bind(d));
    return d
};
export var GroupingHelper = GroupingHelperCore.inherit(function() {
    var foreachCollapsedGroups = function(that, callback, updateOffsets) {
        return that.foreachGroups(groupInfo => {
            if (!groupInfo.isExpanded) {
                return callback(groupInfo)
            }
        }, false, false, updateOffsets, true)
    };
    var correctSkipLoadOption = function(that, skip) {
        var skipCorrection = 0;
        var resultSkip = skip || 0;
        if (skip) {
            foreachCollapsedGroups(that, groupInfo => {
                if (groupInfo.offset - skipCorrection >= skip) {
                    return false
                }
                skipCorrection += groupInfo.count - 1
            });
            resultSkip += skipCorrection
        }
        return resultSkip
    };
    var pathEquals = function(path1, path2) {
        if (path1.length !== path2.length) {
            return false
        }
        for (var i = 0; i < path1.length; i++) {
            if (!keysEqual(null, path1[i], path2[i])) {
                return false
            }
        }
        return true
    };
    var updateGroupOffsets = function updateGroupOffsets(that, items, path, offset, additionalGroupInfo) {
        if (!items) {
            return
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if ("key" in item && void 0 !== item.items) {
                path.push(item.key);
                if (additionalGroupInfo && pathEquals(additionalGroupInfo.path, path) && !item.isContinuation) {
                    additionalGroupInfo.offset = offset
                }
                var groupInfo = that.findGroupInfo(path);
                if (groupInfo && !item.isContinuation) {
                    groupInfo.offset = offset
                }
                if (groupInfo && !groupInfo.isExpanded) {
                    offset += groupInfo.count
                } else {
                    offset = updateGroupOffsets(that, item.items, path, offset, additionalGroupInfo)
                }
                path.pop()
            } else {
                offset++
            }
        }
        return offset
    };
    var getGroupCount = function getGroupCount(item, groupCount) {
        var count = item.count || item.items.length;
        if (!item.count && groupCount > 1) {
            count = 0;
            for (var i = 0; i < item.items.length; i++) {
                count += getGroupCount(item.items[i], groupCount - 1)
            }
        }
        return count
    };
    return {
        handleDataLoading(options) {
            var {
                storeLoadOptions: storeLoadOptions
            } = options;
            var collapsedGroups = [];
            var collapsedItemsCount = 0;
            var skipFirstItem = false;
            var take;
            var {
                group: group
            } = options.loadOptions;
            var skipCorrection = 0;
            ! function(storeLoadOptions, loadOptions) {
                if (loadOptions.group) {
                    var groups = dataGridCore.normalizeSortingInfo(loadOptions.group);
                    var sorts = dataGridCore.normalizeSortingInfo(storeLoadOptions.sort);
                    storeLoadOptions.sort = storeHelper.arrangeSortingInfo(groups, sorts);
                    delete loadOptions.group
                }
            }(storeLoadOptions, options.loadOptions);
            options.group = options.group || group;
            if (options.isCustomLoading) {
                return
            }
            var loadOptions = extend({}, storeLoadOptions);
            loadOptions.skip = correctSkipLoadOption(this, storeLoadOptions.skip);
            if (loadOptions.skip && loadOptions.take && group) {
                loadOptions.skip--;
                loadOptions.take++;
                skipFirstItem = true
            }
            if (loadOptions.take && group) {
                take = loadOptions.take;
                loadOptions.take++
            }
            foreachCollapsedGroups(this, groupInfo => {
                if (groupInfo.offset >= loadOptions.skip + loadOptions.take + skipCorrection) {
                    return false
                }
                if (groupInfo.offset >= loadOptions.skip + skipCorrection && groupInfo.count) {
                    skipCorrection += groupInfo.count - 1;
                    collapsedGroups.push(groupInfo);
                    collapsedItemsCount += groupInfo.count
                }
            });
            each(collapsedGroups, (function() {
                loadOptions.filter = function(path, storeLoadOptions, group) {
                    var groups = dataGridCore.normalizeSortingInfo(group || storeLoadOptions.group);
                    var filter = [];
                    for (var i = 0; i < path.length; i++) {
                        var filterElement = [];
                        for (var j = 0; j <= i; j++) {
                            filterElement.push([groups[j].selector, i === j ? "<>" : "=", path[j]])
                        }
                        filter.push(dataGridCore.combineFilters(filterElement))
                    }
                    filter = dataGridCore.combineFilters(filter, "or");
                    return dataGridCore.combineFilters([filter, storeLoadOptions.filter])
                }(this.path, loadOptions, group)
            }));
            options.storeLoadOptions = loadOptions;
            options.collapsedGroups = collapsedGroups;
            options.collapsedItemsCount = collapsedItemsCount;
            options.skip = loadOptions.skip || 0;
            options.skipFirstItem = skipFirstItem;
            options.take = take
        },
        handleDataLoaded(options, callBase) {
            var {
                collapsedGroups: collapsedGroups
            } = options;
            var groups = dataGridCore.normalizeSortingInfo(options.group);
            var groupCount = groups.length;

            function appendCollapsedPath(data, path, groups, collapsedGroup, offset) {
                if (!data || !path.length || !groups.length) {
                    return
                }
                var keyValue;
                var i;
                var pathValue = toComparable(path[0], true);
                for (i = 0; i < data.length; i++) {
                    keyValue = toComparable(data[i].key, true);
                    if (offset >= collapsedGroup.offset || pathValue === keyValue) {
                        break
                    } else {
                        offset += getGroupCount(data[i], groups.length)
                    }
                }
                if (!data.length || pathValue !== keyValue) {
                    data.splice(i, 0, {
                        key: path[0],
                        items: [],
                        count: 1 === path.length ? collapsedGroup.count : void 0
                    })
                }
                appendCollapsedPath(data[i].items, path.slice(1), groups.slice(1), collapsedGroup, offset)
            }
            if (options.collapsedItemsCount && options.extra && options.extra.totalCount >= 0) {
                if (!options.extra._totalCountWasIncreasedByCollapsedItems) {
                    options.extra.totalCount += options.collapsedItemsCount;
                    options.extra._totalCountWasIncreasedByCollapsedItems = true
                }
            }
            callBase(options);
            if (groupCount) {
                var {
                    data: data
                } = options;
                var query = dataQuery(data);
                storeHelper.multiLevelGroup(query, groups).enumerate().done(groupedData => {
                    data = groupedData
                });
                if (collapsedGroups) {
                    for (var pathIndex = 0; pathIndex < collapsedGroups.length; pathIndex++) {
                        appendCollapsedPath(data, collapsedGroups[pathIndex].path, groups, collapsedGroups[pathIndex], options.skip)
                    }
                }
                if (!options.isCustomLoading) {
                    ! function processGroupItems(that, items, path, offset, skipFirstItem, take) {
                        var removeLastItemsCount = 0;
                        var needRemoveFirstItem = false;
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            if (void 0 !== item.items) {
                                path.push(item.key);
                                var groupInfo = that.findGroupInfo(path);
                                if (groupInfo && !groupInfo.isExpanded) {
                                    item.collapsedItems = item.items;
                                    item.items = null;
                                    offset += groupInfo.count;
                                    take--;
                                    if (take < 0) {
                                        removeLastItemsCount++
                                    }
                                    if (skipFirstItem) {
                                        needRemoveFirstItem = true
                                    }
                                } else if (item.items) {
                                    var offsetInfo = processGroupItems(that, item.items, path, offset, skipFirstItem, take);
                                    if (skipFirstItem) {
                                        if (offsetInfo.offset - offset > 1) {
                                            item.isContinuation = true
                                        } else {
                                            needRemoveFirstItem = true
                                        }
                                    }
                                    offset = offsetInfo.offset;
                                    take = offsetInfo.take;
                                    if (take < 0) {
                                        if (item.items.length) {
                                            item.isContinuationOnNextPage = true
                                        } else {
                                            removeLastItemsCount++
                                        }
                                    }
                                }
                                path.pop()
                            } else {
                                if (skipFirstItem) {
                                    needRemoveFirstItem = true
                                }
                                offset++;
                                take--;
                                if (take < 0) {
                                    removeLastItemsCount++
                                }
                            }
                            skipFirstItem = false
                        }
                        if (needRemoveFirstItem) {
                            items.splice(0, 1)
                        }
                        if (removeLastItemsCount) {
                            items.splice(-removeLastItemsCount, removeLastItemsCount)
                        }
                        return {
                            offset: offset,
                            take: take
                        }
                    }(this, data, [], options.skip, options.skipFirstItem, options.take)
                }
                options.data = data
            }
        },
        isGroupItemCountable: item => null === item.items,
        updateTotalItemsCount() {
            var itemsCountCorrection = 0;
            foreachCollapsedGroups(this, groupInfo => {
                if (groupInfo.count) {
                    itemsCountCorrection -= groupInfo.count - 1
                }
            });
            this.callBase(itemsCountCorrection)
        },
        changeRowExpand(path) {
            var that = this;
            var dataSource = that._dataSource;
            var beginPageIndex = dataSource.beginPageIndex ? dataSource.beginPageIndex() : dataSource.pageIndex();
            var dataSourceItems = dataSource.items();
            var offset = correctSkipLoadOption(that, beginPageIndex * dataSource.pageSize());
            var groupInfo = that.findGroupInfo(path);
            var groupCountQuery;
            if (groupInfo && !groupInfo.isExpanded) {
                groupCountQuery = (new Deferred).resolve(groupInfo.count)
            } else {
                groupCountQuery = loadTotalCount(dataSource, {
                    filter: createGroupFilter(path, {
                        filter: dataSource.filter(),
                        group: dataSource.group()
                    })
                })
            }
            return when(groupCountQuery).done(count => {
                count = parseInt(count.length ? count[0] : count);
                if (groupInfo) {
                    updateGroupOffsets(that, dataSourceItems, [], offset);
                    groupInfo.isExpanded = !groupInfo.isExpanded;
                    groupInfo.count = count
                } else {
                    groupInfo = {
                        offset: -1,
                        count: count,
                        path: path,
                        isExpanded: false
                    };
                    updateGroupOffsets(that, dataSourceItems, [], offset, groupInfo);
                    if (groupInfo.offset >= 0) {
                        that.addGroupInfo(groupInfo)
                    }
                }
                that.updateTotalItemsCount()
            }).fail((function() {
                dataSource._eventsStrategy.fireEvent("loadError", arguments)
            }))
        },
        allowCollapseAll: () => false,
        refresh(options, operationTypes) {
            var that = this;
            var {
                storeLoadOptions: storeLoadOptions
            } = options;
            var dataSource = that._dataSource;
            this.callBase.apply(this, arguments);
            if (operationTypes.reload) {
                return foreachCollapsedGroups(that, groupInfo => {
                    var groupCountQuery = loadTotalCount(dataSource, {
                        filter: createGroupFilter(groupInfo.path, storeLoadOptions)
                    });
                    var groupOffsetQuery = loadTotalCount(dataSource, {
                        filter: createOffsetFilter(groupInfo.path, storeLoadOptions)
                    });
                    return when(groupOffsetQuery, groupCountQuery).done((offset, count) => {
                        offset = parseInt(offset.length ? offset[0] : offset);
                        count = parseInt(count.length ? count[0] : count);
                        groupInfo.offset = offset;
                        if (groupInfo.count !== count) {
                            groupInfo.count = count;
                            that.updateTotalItemsCount()
                        }
                    })
                }, true)
            }
        }
    }
}());
