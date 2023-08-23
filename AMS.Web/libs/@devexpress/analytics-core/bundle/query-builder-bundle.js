/**
* DevExpress Analytics (bundle\query-builder-bundle.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _addQueryBuilderToBundle } from './_add-querybuilder-to-bundle';
const DevExpress = window.DevExpress || {};
_addQueryBuilderToBundle(DevExpress);
export default {
    QueryBuilder: DevExpress['QueryBuilder'],
    Analytics: DevExpress['Analytics'],
};
