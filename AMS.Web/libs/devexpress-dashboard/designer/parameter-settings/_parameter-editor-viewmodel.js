﻿/**
* DevExpress Dashboard (_parameter-editor-viewmodel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterEditorViewModel = void 0;
const ko = require("knockout");
const _data_source_browser_1 = require("../../common/_data-source-browser");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _default_1 = require("../../data/localization/_default");
const disposable_object_1 = require("../../model/disposable-object");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _parameters_helper_1 = require("../../model/parameters/_parameters-helper");
const look_up_value_1 = require("../../model/parameters/look-up-value");
const _dynamic_list_lookup_settings_1 = require("../../model/parameters/metadata/_dynamic-list-lookup-settings");
const _parameter_1 = require("../../model/parameters/metadata/_parameter");
const _static_list_lookup_settings_1 = require("../../model/parameters/metadata/_static-list-lookup-settings");
const _form_adapter_editors_1 = require("../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../form-adapter/_object-properties-wrapper");
const _field_picker_1 = require("./_field-picker");
const _lookup_values_editors_1 = require("./_lookup-values-editors");
class ParameterEditorViewModel extends disposable_object_1.DisposableObject {
    constructor(parameter, _dataSourceBrowserGetter, isNameValid) {
        super();
        this.parameter = parameter;
        this._dataSourceBrowserGetter = _dataSourceBrowserGetter;
        this.commonParameterSettings = this._getCommonParameterSettingsWrapper(parameter, isNameValid);
        this.lookUpParameterType = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: parameter,
            properties: [Object.assign(Object.assign({}, _parameter_1.lookUpSourceType), { simpleFormAdapterItem: 'selectBoxEditor' })]
        });
        this.staticListLookUpSettings = _knockout_utils_1.safeComputed({ staticListLookUpSettings: parameter.staticListLookUpSettings, type: this.parameter.type }, (args) => {
            if (args.staticListLookUpSettings) {
                return this._getStaticListLookUpSettingsWrapper(args.staticListLookUpSettings, args.type);
            }
            return null;
        });
        this.dynamicListLookUpSettings = _knockout_utils_1.safeComputed({ dynamicListLookUpSettings: parameter.dynamicListLookUpSettings }, (args) => {
            if (args.dynamicListLookUpSettings) {
                return this._getDynamicListLookUpSettingsWrapper(args.dynamicListLookUpSettings);
            }
            return null;
        });
    }
    get dataSourceBrowser() {
        return this._dataSourceBrowserGetter ? this._dataSourceBrowserGetter() : undefined;
    }
    _getStaticListLookUpSettingsWrapper(staticListLookUpSettings, parameterType) {
        const editorOptions = {
            dataFields: [_static_list_lookup_settings_1.lookUpValue.propertyName],
            noDataText: 'DashboardWebStringId.CollectionEditor.Parameters.NoItems',
            gridColumns: [Object.assign({ dataField: _static_list_lookup_settings_1.lookUpValue.propertyName }, getGridEditorSettings(parameterType))],
            createNewItemHandler: () => {
                var newLookUpValue = new look_up_value_1.LookUpValue({});
                newLookUpValue.valueType(parameterType);
                return newLookUpValue;
            },
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: staticListLookUpSettings,
            properties: [Object.assign(Object.assign({}, _static_list_lookup_settings_1.lookUpvalues), { formAdapterItem: _form_adapter_editors_1.inlineEditCollectionEditor(editorOptions) })]
        });
    }
    _getDynamicListLookUpSettingsWrapper(dynamicListLookUpSettings) {
        var isDataSourceAndDataMemberSet = (model) => {
            if (model) {
                let isDataSourceSet = !!model.dataSource();
                let dataMemberSupported = this.dataSourceBrowser.dataMembersSupported(model);
                let isDataMemberSet = true;
                if (dataMemberSupported) {
                    isDataMemberSet = !!model.dataMember();
                }
                return isDataSourceSet && isDataMemberSet;
            }
            return false;
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dynamicListLookUpSettings,
            properties: [
                Object.assign(Object.assign({}, _dynamic_list_lookup_settings_1._dataSourceNameSerialization), { formAdapterItem: dataSourceChooserEditor(this.dataSourceBrowser) }),
                Object.assign(Object.assign({}, _dynamic_list_lookup_settings_1._dataMemberSerialization), { formAdapterItem: dataMemberChooserEditor({ dataSourceBrowser: this.dataSourceBrowser, dynamicListLookUpSettings }) }),
                Object.assign(Object.assign({}, _dynamic_list_lookup_settings_1.valueMemberSerialization), { formAdapterItem: fieldChooserEditor({ dataSourceBrowser: this.dataSourceBrowser, dynamicListLookUpSettings }) }),
                Object.assign(Object.assign({}, _dynamic_list_lookup_settings_1.displayMemberSerialization), { formAdapterItem: fieldChooserEditor({ dataSourceBrowser: this.dataSourceBrowser, dynamicListLookUpSettings }) }),
                Object.assign(Object.assign({}, _dynamic_list_lookup_settings_1.sortByMember), { formAdapterItem: fieldChooserEditor({ dataSourceBrowser: this.dataSourceBrowser, dynamicListLookUpSettings }) }),
                _dynamic_list_lookup_settings_1.sortOrder
            ],
            disabledFilterRules: {
                [_dynamic_list_lookup_settings_1._dataMemberSerialization.propertyName]: () => !this.dataSourceBrowser.dataMembersSupported(dynamicListLookUpSettings),
                [_dynamic_list_lookup_settings_1.valueMemberSerialization.propertyName]: () => !isDataSourceAndDataMemberSet(dynamicListLookUpSettings),
                [_dynamic_list_lookup_settings_1.displayMemberSerialization.propertyName]: () => !isDataSourceAndDataMemberSet(dynamicListLookUpSettings),
                [_dynamic_list_lookup_settings_1.sortByMember.propertyName]: () => !isDataSourceAndDataMemberSet(dynamicListLookUpSettings)
            }
        });
    }
    _getCommonParameterSettingsWrapper(parameter, isNameValid) {
        var propertyInfos = [
            Object.assign(Object.assign({}, _parameter_1.parameterName), { validateBeforeSet: true, validationRules: [
                    {
                        type: 'custom',
                        validationCallback: (options) => { return isNameValid(options.value); },
                        message: _default_1.getLocalizationById('DashboardWebStringId.Parameters.ParameterNameShouldBeUnique')
                    },
                    ..._parameter_1.parameterName.validationRules
                ] }),
            _parameter_1.description,
            _parameter_1.parameterVisible,
            _parameter_1.allowNull,
            _parameter_1.allowMultiselect,
            _parameter_1.parameterTypePropertyGrid,
            Object.assign(Object.assign({}, _parameter_1.defaultValue), { externalUpdateCallback: updateHandler => _knockout_utils_1.safeSubscribe({
                    lookupSourceType: parameter.lookUpSourceType,
                    allowMultiselect: parameter.allowMultiselect
                }, () => updateHandler({ forceValidate: false })) }),
            Object.assign(Object.assign({}, _parameter_1.defaultValues), { validateBeforeSet: true, formAdapterItem: _lookup_values_editors_1.multipleLookupValueEditor({ parameter, dataSourceBrowser: this.dataSourceBrowser }) }),
            _parameter_1.selectAllValues,
            _parameter_1.lookUpSourceType
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: parameter,
            properties: propertyInfos,
            visibilityFilterRules: {
                [_parameter_1.defaultValue.propertyName]: (model) => !model.allowMultiselect(),
                [_parameter_1.defaultValues.propertyName]: (model) => !!model.allowMultiselect(),
                [_parameter_1.selectAllValues.propertyName]: (model) => !!model.allowMultiselect()
            },
            disabledFilterRules: {
                [_parameter_1.allowMultiselect.propertyName]: ['lookUpSourceType', '=', 'None'],
                [_parameter_1.defaultValues.propertyName]: (model) => !!model.selectAllValues()
            },
            dynamicEditorRules: {
                [_parameter_1.defaultValue.propertyName]: (model) => {
                    if (model.lookUpSourceType() !== 'None') {
                        return { formAdapterItem: _lookup_values_editors_1.singleLookupValueEditor({ parameter, dataSourceBrowser: this.dataSourceBrowser }) };
                    }
                    const { simpleFormAdapterItem, editorOptions } = _parameters_helper_1.ParameterHelper.getEditorType(model.type());
                    return {
                        simpleFormAdapterItem,
                        editorOptions,
                    };
                }
            }
        });
    }
}
exports.ParameterEditorViewModel = ParameterEditorViewModel;
const dataSourceChooserEditor = dataSourceBrowser => {
    return _form_adapter_editors_1.observableSelectBoxEditor({
        observables: {
            dashboardDataSources: dataSourceBrowser._dataSources
        },
        load: (args) => {
            return args.dashboardDataSources.map(ds => {
                return {
                    value: ds.componentName(),
                    displayValue: ds.name()
                };
            });
        },
        additionalOptions: () => {
            return {
                placeholder: _default_1.getLocalizationById('DashboardStringId.ParametersSelectorText'),
                noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay')
            };
        }
    });
};
const dataMemberChooserEditor = options => {
    return _form_adapter_editors_1.observableSelectBoxEditor({
        observables: {
            dashboardDataSources: options.dataSourceBrowser._dataSources,
            selectedDashboardDataSource: options.dynamicListLookUpSettings.dataSource,
        },
        load: (args) => {
            var dataSource = args.dashboardDataSources.filter(ds => ds.componentName() === args.selectedDashboardDataSource)[0];
            if (dataSource && dataSource.supportDataMembers) {
                return _jquery_helpers_1.$promiseAdapter(options.dataSourceBrowser.getDataFieldsArray(args.selectedDashboardDataSource, '', '', _data_source_browser_1.isNonCollectionDataField)
                    .then((members) => {
                    return members.map(member => { return { value: member.dataMember(), displayValue: member.dataMember() }; });
                }));
            }
            else {
                return [];
            }
        },
        additionalOptions: () => {
            return {
                placeholder: _default_1.getLocalizationById('DashboardStringId.ParametersSelectorText'),
                noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
            };
        }
    });
};
const fieldChooserEditor = options => context => {
    return {
        template: (args, itemElement) => {
            const element = _jquery_helpers_1.$unwrap(itemElement);
            element.classList.add('dx-dashboard-field-picker');
            var value = ko.observable(_form_adapter_editors_1.getFieldValue(args));
            value.subscribe(newValue => {
                args.component.updateData(args.dataField, newValue);
            });
            let model = new _field_picker_1.FieldListPicker(options.dataSourceBrowser, value, options.dynamicListLookUpSettings, args.editorOptions.disabled);
            ko.applyBindingsToNode(element, { template: { name: 'dx-dashboard-field-picker', data: model } }, context.bindingContext);
        }
    };
};
function getGridEditorSettings(typeString) {
    switch (typeString) {
        case 'System.Guid':
            return {
                dataType: 'string',
                editorOptions: {
                    mask: 'xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx',
                    maskRules: {
                        'x': /[0-9a-fA-F]/,
                    },
                    useMaskedValue: true,
                },
            };
        case 'System.SByte':
        case 'System.Int64':
        case 'System.Int32':
        case 'System.Int16':
        case 'System.Byte':
        case 'System.UInt16':
        case 'System.UInt32':
        case 'System.UInt64':
            return {
                dataType: 'number',
                editorOptions: {
                    showSpinButtons: true,
                    format: '0#',
                },
            };
        case 'System.Single':
        case 'System.Double':
        case 'System.Decimal':
            return {
                dataType: 'number',
                editorOptions: {
                    showSpinButtons: true,
                },
            };
        case 'System.DateTime':
            return {
                dataType: 'datetime'
            };
        case 'System.Boolean':
            return {
                dataType: 'boolean'
            };
        default:
        case 'System.String':
            return {
                dataType: 'string'
            };
    }
}
