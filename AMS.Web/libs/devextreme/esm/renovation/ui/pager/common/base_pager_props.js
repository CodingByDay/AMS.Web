/**
 * DevExtreme (esm/renovation/ui/pager/common/base_pager_props.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import messageLocalization from "../../../../localization/message";
export var BasePagerProps = {
    gridCompatibility: true,
    showInfo: false,
    displayMode: "adaptive",
    maxPagesCount: 10,
    pageCount: 10,
    visible: true,
    hasKnownLastPage: true,
    pagesNavigatorVisible: "auto",
    showPageSizes: true,
    pageSizes: Object.freeze([5, 10]),
    showNavigationButtons: false,
    totalCount: 0,
    get label() {
        return messageLocalization.format("dxPager-ariaLabel")
    }
};
