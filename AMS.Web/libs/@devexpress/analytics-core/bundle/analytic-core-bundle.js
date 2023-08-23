/**
* DevExpress Analytics (bundle\analytic-core-bundle.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _addAnalyticsToBundle } from './_add-analytics-to-bundle';
import { checkIncludedScripts, checkVersions } from './_validator';
checkIncludedScripts();
const DevExpress = window.DevExpress || {};
_addAnalyticsToBundle(DevExpress);
checkVersions();
export default DevExpress['Analytics'];
