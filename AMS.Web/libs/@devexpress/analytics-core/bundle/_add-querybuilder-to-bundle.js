﻿/**
* DevExpress Analytics (bundle\_add-querybuilder-to-bundle.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as Diagram from '../analytics-diagram';
import * as Data from '../analytics-data';
import * as DataInternal from '../analytics-data-internal';
import * as DataUtils from '../analytics-data-utils';
import * as DataMetadata from '../analytics-data-metadata';
import * as Wizard from '../analytics-wizard';
import * as WizardInternal from '../analytics-wizard-internal';
import * as QueryBuilderWidgets from '../queryBuilder-widgets';
import * as QueryBuilderWidgetsInternal from '../queryBuilder-widgets-internal';
import * as QueryBuilderMetadata from '../queryBuilder-metadata';
import * as QueryBuilderUtils from '../queryBuilder-utils';
import * as QueryBuilderInternal from '../queryBuilder-internal';
import * as QueryBuilderElements from '../queryBuilder-elements';
import * as QueryBuilderElementsMetadata from '../queryBuilder-elements-metadata';
import * as QueryBuilder from '../querybuilder';
export function _addQueryBuilderToBundle(bundle) {
    bundle.Analytics = bundle.Analytics || {};
    bundle.QueryBuilder = QueryBuilder;
    bundle.Analytics.Diagram = Diagram;
    bundle.Analytics.Data = Data;
    bundle.Analytics.Data.Internal = DataInternal;
    bundle.Analytics.Data.Utils = DataUtils;
    bundle.Analytics.Data.Metadata = DataMetadata;
    bundle.Analytics.Wizard = Wizard;
    bundle.Analytics.Wizard.Internal = WizardInternal;
    bundle.QueryBuilder.Widgets = QueryBuilderWidgets;
    bundle.QueryBuilder.Widgets.Internal = QueryBuilderWidgetsInternal;
    bundle.QueryBuilder.Metadata = QueryBuilderMetadata;
    bundle.QueryBuilder.Utils = QueryBuilderUtils;
    bundle.QueryBuilder.Internal = QueryBuilderInternal;
    bundle.QueryBuilder.Elements = QueryBuilderElements;
    bundle.QueryBuilder.Elements.Metadata = QueryBuilderElementsMetadata;
    return bundle;
}
