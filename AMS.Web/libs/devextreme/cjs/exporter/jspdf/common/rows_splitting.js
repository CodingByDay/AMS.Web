/**
 * DevExtreme (cjs/exporter/jspdf/common/rows_splitting.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.splitByPages = splitByPages;
var _type = require("../../../core/utils/type");
var _pdf_utils = require("./pdf_utils");
var _draw_utils = require("./draw_utils");
var _get_multipage_row_pages = require("./rows_spliting_utils/get_multipage_row_pages");
var _create_on_split_multipage_row = require("./rows_spliting_utils/create_on_split_multipage_row");

function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
var COORDINATE_EPSILON = .001;

function convertToCellsArray(rows) {
    return [].concat.apply([], rows.map((function(rowInfo) {
        return rowInfo.cells.filter((function(cell) {
            return !(0, _type.isDefined)(cell.pdfCell.isMerged)
        })).map((function(cellInfo) {
            return _extends({}, cellInfo.pdfCell._rect, {
                sourceCellInfo: _extends({}, cellInfo.pdfCell, {
                    gridCell: cellInfo.gridCell
                })
            })
        }))
    })))
}

function splitByPages(doc, rowsInfo, options, onSeparateRectHorizontally, onSeparateRectVertically) {
    if (0 === rowsInfo.length) {
        return [
            []
        ]
    }
    var maxBottomRight = {
        x: (0, _pdf_utils.getPageWidth)(doc) - options.margin.right,
        y: (0, _pdf_utils.getPageHeight)(doc) - options.margin.bottom
    };
    var headerRows = rowsInfo.filter((function(r) {
        return "header" === r.rowType
    }));
    var headerHeight = headerRows.reduce((function(accumulator, row) {
        return accumulator + row.height
    }), 0);
    var verticallyPages = splitRectsByPages(convertToCellsArray(rowsInfo), options.margin.top, "y", "h", (function(isFirstPage, currentCoordinate) {
        var additionalHeight = !isFirstPage && options.repeatHeaders ? headerHeight : 0;
        return (0, _draw_utils.roundToThreeDecimals)(currentCoordinate + additionalHeight) <= (0, _draw_utils.roundToThreeDecimals)(maxBottomRight.y)
    }), (function(rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) {
        var args = {
            sourceRect: rect,
            topRect: {
                x: rect.x,
                y: rect.y,
                w: rect.w,
                h: currentPageMaxRectCoordinate - rect.y
            },
            bottomRect: {
                x: rect.x,
                y: currentPageMaxRectCoordinate,
                w: rect.w,
                h: rect.h - (currentPageMaxRectCoordinate - rect.y)
            }
        };
        onSeparateRectVertically(args);
        currentPageRects.push(args.topRect);
        rectsToSplit.push(args.bottomRect)
    }), (0, _create_on_split_multipage_row.createOnSplitMultiPageRow)(doc, options, headerHeight, maxBottomRight));
    if (options.repeatHeaders) {
        for (var i = 1; i < verticallyPages.length; i++) {
            verticallyPages[i].forEach((function(rect) {
                return rect.y += headerHeight
            }));
            var headerCells = convertToCellsArray(headerRows);
            headerCells.forEach((function(cell) {
                cell.y -= options.topLeft.y
            }));
            verticallyPages[i] = [].concat(_toConsumableArray(headerCells), _toConsumableArray(verticallyPages[i]))
        }
    }
    var pageIndex = 0;
    while (pageIndex < verticallyPages.length) {
        var horizontallyPages = splitRectsByPages(verticallyPages[pageIndex], options.margin.left, "x", "w", (function(pagesLength, currentCoordinate) {
            return (0, _draw_utils.roundToThreeDecimals)(currentCoordinate) <= (0, _draw_utils.roundToThreeDecimals)(maxBottomRight.x)
        }), (function(rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) {
            var args = {
                sourceRect: rect,
                leftRect: {
                    x: rect.x,
                    y: rect.y,
                    w: currentPageMaxRectCoordinate - rect.x,
                    h: rect.h
                },
                rightRect: {
                    x: currentPageMaxRectCoordinate,
                    y: rect.y,
                    w: rect.w - (currentPageMaxRectCoordinate - rect.x),
                    h: rect.h
                }
            };
            onSeparateRectHorizontally(args);
            currentPageRects.push(args.leftRect);
            rectsToSplit.push(args.rightRect)
        }));
        if (horizontallyPages.length > 1) {
            verticallyPages.splice.apply(verticallyPages, [pageIndex, 1].concat(_toConsumableArray(horizontallyPages)));
            pageIndex += horizontallyPages.length
        } else {
            pageIndex += 1
        }
    }
    return verticallyPages.map((function(rects) {
        return rects.map((function(rect) {
            return _extends({}, rect.sourceCellInfo, {
                _rect: rect
            })
        }))
    }))
}

function splitRectsByPages(rects, marginValue, coordinate, dimension, isFitToPage, onSeparateCallback, onSplitMultiPageRow) {
    var pages = [];
    var rectsToSplit = _toConsumableArray(rects);
    var isFitToPageForMultiPageRow = function(isFirstPage, rectHeight) {
        return isFitToPage(isFirstPage, rectHeight + marginValue)
    };
    var _loop = function() {
        var currentPageMaxRectCoordinate = 0;
        var currentPageRects = rectsToSplit.filter((function(rect) {
            var currentRectCoordinate = rect[coordinate] + rect[dimension];
            if (isFitToPage(0 === pages.length, currentRectCoordinate)) {
                if (currentPageMaxRectCoordinate <= currentRectCoordinate) {
                    currentPageMaxRectCoordinate = currentRectCoordinate
                }
                return true
            } else {
                return false
            }
        }));
        var isCurrentPageContainsOnlyHeader = (0, _get_multipage_row_pages.checkPageContainsOnlyHeader)(currentPageRects, 0 === pages.length);
        var multiPageRowPages = (0, _get_multipage_row_pages.getMultiPageRowPages)(currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, onSplitMultiPageRow, isFitToPageForMultiPageRow);
        var rectsToSeparate = rectsToSplit.filter((function(rect) {
            var currentRectLeft = rect[coordinate];
            var currentRectRight = rect[coordinate] + rect[dimension];
            return currentPageMaxRectCoordinate - currentRectLeft > COORDINATE_EPSILON && currentRectRight - currentPageMaxRectCoordinate > COORDINATE_EPSILON
        }));
        rectsToSeparate.forEach((function(rect) {
            onSeparateCallback(rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit);
            var index = rectsToSplit.indexOf(rect);
            if (-1 !== index) {
                rectsToSplit.splice(index, 1)
            }
        }));
        currentPageRects.forEach((function(rect) {
            var index = rectsToSplit.indexOf(rect);
            if (-1 !== index) {
                rectsToSplit.splice(index, 1)
            }
        }));
        rectsToSplit.forEach((function(rect) {
            rect[coordinate] = (0, _type.isDefined)(currentPageMaxRectCoordinate) ? rect[coordinate] - currentPageMaxRectCoordinate + marginValue : rect[coordinate]
        }));
        var firstPageContainsHeaderAndMultiPageRow = isCurrentPageContainsOnlyHeader && multiPageRowPages.length > 0;
        if (firstPageContainsHeaderAndMultiPageRow) {
            var _multiPageRowPages = _toArray(multiPageRowPages),
                firstPage = _multiPageRowPages[0],
                restOfPages = _multiPageRowPages.slice(1);
            pages.push([].concat(_toConsumableArray(currentPageRects), _toConsumableArray(firstPage)));
            pages.push.apply(pages, _toConsumableArray(restOfPages))
        } else if (currentPageRects.length > 0) {
            pages.push(currentPageRects);
            pages.push.apply(pages, _toConsumableArray(multiPageRowPages))
        } else if (multiPageRowPages.length > 0) {
            pages.push.apply(pages, _toConsumableArray(multiPageRowPages));
            pages.push(rectsToSplit)
        } else {
            pages.push(rectsToSplit);
            return "break"
        }
    };
    while (rectsToSplit.length > 0) {
        var _ret = _loop();
        if ("break" === _ret) {
            break
        }
    }
    return pages
}
