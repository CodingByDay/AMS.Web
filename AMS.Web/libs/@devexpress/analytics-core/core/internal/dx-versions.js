/**
* DevExpress Analytics (core\internal\dx-versions.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as devextremeVersion from 'devextreme/core/version';
import { version as clientVersions } from '../../analytics-version';
export var dxversions = {
    analytics: clientVersions,
    devextreme: devextremeVersion.version || devextremeVersion
};
