﻿/**
* DevExpress Analytics (core\elements\paddingModelMetaData.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
export var left = {
    propertyName: 'left', modelName: '@Left', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Left', displayName: 'Left', editor: editorTemplates.getEditor('numeric')
}, right = { propertyName: 'right', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Right', modelName: '@Right', displayName: 'Right', editor: editorTemplates.getEditor('numeric') }, top = { propertyName: 'top', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Top', modelName: '@Top', displayName: 'Top', editor: editorTemplates.getEditor('numeric') }, bottom = { propertyName: 'bottom', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Bottom', modelName: '@Bottom', displayName: 'Bottom', editor: editorTemplates.getEditor('numeric') }, all = { propertyName: 'all', localizationId: 'AnalyticsCoreStringId.PaddingInfo.All', displayName: 'All', editor: editorTemplates.getEditor('numeric') };
export var paddingSerializationsInfo = [all, left, right, top, bottom];
