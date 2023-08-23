/**
 * DevExtreme (esm/ui/list/ui.list.edit.search.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import ListEdit from "./ui.list.edit";
import searchBoxMixin from "../widget/ui.search_box_mixin";
var ListSearch = ListEdit.inherit(searchBoxMixin).inherit({
    _addWidgetPrefix: function(className) {
        return "dx-list-" + className
    },
    _getCombinedFilter: function() {
        var dataController = this._dataController;
        var storeLoadOptions = {
            filter: dataController.filter()
        };
        dataController.addSearchFilter(storeLoadOptions);
        var filter = storeLoadOptions.filter;
        return filter
    },
    _initDataSource: function() {
        var value = this.option("searchValue");
        var expr = this.option("searchExpr");
        var mode = this.option("searchMode");
        this.callBase();
        var dataController = this._dataController;
        value && value.length && dataController.searchValue(value);
        mode.length && dataController.searchOperation(searchBoxMixin.getOperationBySearchMode(mode));
        expr && dataController.searchExpr(expr)
    }
});
export default ListSearch;
