/**
* DevExpress Analytics (bundle\_add-to-context.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _defaultStaticContext } from '../core/utils/_utils';
export function _addToContext(context) {
    _defaultStaticContext(Object.assign(Object.assign({}, _defaultStaticContext()), context));
}
