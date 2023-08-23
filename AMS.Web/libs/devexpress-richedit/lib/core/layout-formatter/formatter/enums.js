export var LayoutFormatterState;
(function (LayoutFormatterState) {
    LayoutFormatterState[LayoutFormatterState["DocumentStart"] = 0] = "DocumentStart";
    LayoutFormatterState[LayoutFormatterState["PageStart"] = 1] = "PageStart";
    LayoutFormatterState[LayoutFormatterState["PageAreaStart"] = 2] = "PageAreaStart";
    LayoutFormatterState[LayoutFormatterState["ColumnStart"] = 3] = "ColumnStart";
    LayoutFormatterState[LayoutFormatterState["RowFormatting"] = 4] = "RowFormatting";
    LayoutFormatterState[LayoutFormatterState["ColumnEnd"] = 5] = "ColumnEnd";
    LayoutFormatterState[LayoutFormatterState["PageAreaEnd"] = 6] = "PageAreaEnd";
    LayoutFormatterState[LayoutFormatterState["PageEnd"] = 7] = "PageEnd";
    LayoutFormatterState[LayoutFormatterState["DocumentEnd"] = 8] = "DocumentEnd";
    LayoutFormatterState[LayoutFormatterState["End"] = 9] = "End";
})(LayoutFormatterState || (LayoutFormatterState = {}));
