/**
 * DevExtreme (esm/__internal/grids/data_grid/m_aggregate_calculator.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Class from "../../../core/class";
import {
    compileGetter
} from "../../../core/utils/data";
import {
    isFunction
} from "../../../core/utils/type";
import {
    errors
} from "../../../data/errors";
import {
    aggregators
} from "../../../data/utils";

function depthFirstSearch(i, depth, root, callback) {
    var j = 0;
    if (i < depth) {
        for (; j < root.items.length; j++) {
            depthFirstSearch(i + 1, depth, root.items[j], callback)
        }
    }
    if (i === depth) {
        callback(root)
    }
}

function map(array, callback) {
    var i;
    if ("map" in array) {
        return array.map(callback)
    }
    var result = new Array(array.length);
    for (i in array) {
        result[i] = callback(array[i], i)
    }
    return result
}

function isEmpty(x) {
    return x !== x || "" === x || null === x || void 0 === x
}

function isCount(aggregator) {
    return aggregator === aggregators.count
}

function normalizeAggregate(aggregate) {
    var selector = compileGetter(aggregate.selector);
    var skipEmptyValues = "skipEmptyValues" in aggregate ? aggregate.skipEmptyValues : true;
    var {
        aggregator: aggregator
    } = aggregate;
    if ("string" === typeof aggregator) {
        aggregator = aggregators[aggregator];
        if (!aggregator) {
            throw errors.Error("E4001", aggregate.aggregator)
        }
    }
    return {
        selector: selector,
        aggregator: aggregator,
        skipEmptyValues: skipEmptyValues
    }
}
export default Class.inherit({
    ctor(options) {
        this._data = options.data;
        this._groupLevel = options.groupLevel || 0;
        this._totalAggregates = map(options.totalAggregates || [], normalizeAggregate);
        this._groupAggregates = map(options.groupAggregates || [], normalizeAggregate);
        this._totals = []
    },
    calculate() {
        if (this._totalAggregates.length) {
            this._calculateTotals(0, {
                items: this._data
            })
        }
        if (this._groupAggregates.length && this._groupLevel > 0) {
            this._calculateGroups({
                items: this._data
            })
        }
    },
    totalAggregates() {
        return this._totals
    },
    _aggregate(aggregates, data, container) {
        var length = data.items ? data.items.length : 0;
        for (var i = 0; i < aggregates.length; i++) {
            if (isCount(aggregates[i].aggregator)) {
                container[i] = (container[i] || 0) + length;
                continue
            }
            for (var j = 0; j < length; j++) {
                this._accumulate(i, aggregates[i], container, data.items[j])
            }
        }
    },
    _calculateTotals(level, data) {
        if (0 === level) {
            this._totals = this._seed(this._totalAggregates)
        }
        if (level === this._groupLevel) {
            this._aggregate(this._totalAggregates, data, this._totals)
        } else {
            for (var i = 0; i < data.items.length; i++) {
                this._calculateTotals(level + 1, data.items[i])
            }
        }
        if (0 === level) {
            this._totals = this._finalize(this._totalAggregates, this._totals)
        }
    },
    _calculateGroups(root) {
        var maxLevel = this._groupLevel;
        var currentLevel = maxLevel + 1;
        var seedFn = this._seed.bind(this, this._groupAggregates);
        var stepFn = this._aggregate.bind(this, this._groupAggregates);
        var finalizeFn = this._finalize.bind(this, this._groupAggregates);

        function aggregator(node) {
            node.aggregates = seedFn(currentLevel - 1);
            if (currentLevel === maxLevel) {
                stepFn(node, node.aggregates)
            } else {
                depthFirstSearch(currentLevel, maxLevel, node, innerNode => {
                    stepFn(innerNode, node.aggregates)
                })
            }
            node.aggregates = finalizeFn(node.aggregates)
        }
        while (--currentLevel > 0) {
            depthFirstSearch(0, currentLevel, root, aggregator)
        }
    },
    _seed: (aggregates, groupIndex) => map(aggregates, aggregate => {
        var {
            aggregator: aggregator
        } = aggregate;
        var seed = "seed" in aggregator ? isFunction(aggregator.seed) ? aggregator.seed(groupIndex) : aggregator.seed : NaN;
        return seed
    }),
    _accumulate(aggregateIndex, aggregate, results, item) {
        var value = aggregate.selector(item);
        var {
            aggregator: aggregator
        } = aggregate;
        var {
            skipEmptyValues: skipEmptyValues
        } = aggregate;
        if (skipEmptyValues && isEmpty(value)) {
            return
        }
        if (results[aggregateIndex] !== results[aggregateIndex]) {
            results[aggregateIndex] = value
        } else {
            results[aggregateIndex] = aggregator.step(results[aggregateIndex], value)
        }
    },
    _finalize: (aggregates, results) => map(aggregates, (aggregate, index) => {
        var fin = aggregate.aggregator.finalize;
        return fin ? fin(results[index]) : results[index]
    })
});
