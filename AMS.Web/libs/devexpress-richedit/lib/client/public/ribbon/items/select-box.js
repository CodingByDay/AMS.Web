import { RibbonItemBase, RibbonItemType } from './base';
import { convertToFunction } from '../../../../base-utils/utils';
import { isDefined } from '@devexpress/utils/lib/utils/common';
export class RibbonSelectBoxItem extends RibbonItemBase {
    constructor(id, dataSource, options = {}) {
        var _a;
        super(id, options.beginGroup);
        this.type = RibbonItemType.SelectBox;
        this.dataSource = dataSource;
        this.width = options.width;
        this.displayExpr = options.displayExpr;
        this.valueExpr = options.valueExpr;
        this.value = options.value;
        this._localizeDataSourceItems = options._localizeDataSourceItems === undefined ? false : options._localizeDataSourceItems;
        this.textOptions = (_a = options.textOptions) !== null && _a !== void 0 ? _a : {};
        this.showClearButton = options.showClearButton === undefined ? false : options.showClearButton;
        this.placeholder = options.placeholder;
        this.acceptCustomValue = isDefined(options.acceptCustomValue) ? options.acceptCustomValue : false;
        this.onCustomItemCreating = options.onCustomItemCreating ? convertToFunction(options.onCustomItemCreating) : undefined;
    }
}
