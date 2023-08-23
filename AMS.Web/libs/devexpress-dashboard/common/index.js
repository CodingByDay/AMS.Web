﻿/**
* DevExpress Dashboard (index.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("devextreme/color");
require("devextreme/core/class");
require("devextreme/core/component_registrator");
require("devextreme/core/devices");
require("devextreme/core/dom_component");
require("devextreme/core/utils/browser");
require("devextreme/core/utils/console");
require("devextreme/core/utils/data");
require("devextreme/core/utils/date");
require("devextreme/core/utils/resize_callbacks");
require("devextreme/core/utils/string");
require("devextreme/core/utils/support");
require("devextreme/data/array_store");
require("devextreme/data/custom_store");
require("devextreme/data/data_source");
require("devextreme/data/query");
require("devextreme/events/utils");
require("devextreme/format_helper");
require("devextreme/integration/knockout");
require("devextreme/localization");
require("devextreme/localization/date");
require("devextreme/localization/number");
require("devextreme/ui/accordion");
require("devextreme/ui/button");
require("devextreme/ui/check_box");
require("devextreme/ui/collection/ui.collection_widget.base");
require("devextreme/ui/data_grid");
require("devextreme/ui/date_box");
require("devextreme/ui/dialog");
require("devextreme/ui/list");
require("devextreme/ui/overlay/ui.overlay");
require("devextreme/ui/pivot_grid");
require("devextreme/ui/popup");
require("devextreme/ui/scroll_view");
require("devextreme/ui/select_box");
require("devextreme/ui/tag_box");
require("devextreme/ui/text_box");
require("devextreme/ui/themes");
require("devextreme/ui/toast");
require("devextreme/ui/toolbar");
require("devextreme/ui/tree_list");
require("devextreme/ui/tree_view");
require("devextreme/ui/validation_engine");
require("devextreme/ui/widget/ui.widget");
require("devextreme/viz/bullet");
require("devextreme/viz/chart");
require("devextreme/viz/circular_gauge");
require("devextreme/viz/core/renderers/renderer");
require("devextreme/viz/core/utils");
require("devextreme/viz/linear_gauge");
require("devextreme/viz/pie_chart");
require("devextreme/viz/range_selector");
require("devextreme/viz/sparkline");
require("devextreme/viz/themes");
require("devextreme/viz/tree_map");
require("devextreme/viz/vector_map");
require("devextreme/viz/vector_map/projection");
require("jquery");
require("../data");
require("../model");
require("./index.exports");
require("./parameters-definitions");
__exportStar(require("../viewer-parts"), exports);
__exportStar(require("./index.exports"), exports);
