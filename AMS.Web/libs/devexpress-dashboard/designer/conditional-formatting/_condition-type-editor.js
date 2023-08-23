﻿/**
* DevExpress Dashboard (_condition-type-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionTypeEditorSurface = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const index_internal_1 = require("../../data/index.internal");
const _data_field_1 = require("../../model/data-sources/_data-field");
const _format_condition_average_1 = require("../../model/format-rules/conditions/metadata/_format-condition-average");
const _format_condition_top_bottom_1 = require("../../model/format-rules/conditions/metadata/_format-condition-top-bottom");
const _format_condition_value_1 = require("../../model/format-rules/conditions/metadata/_format-condition-value");
const range_converter_1 = require("../../model/format-rules/conditions/range/range-converter");
const range_generator_1 = require("../../model/format-rules/conditions/range/range-generator");
const _dashboard_item_format_rule_1 = require("../../model/format-rules/metadata/_dashboard-item-format-rule");
const _appearance_settings_provider_1 = require("../../viewer-parts/conditional-formatting/_appearance-settings-provider");
const _style_settings_provider_1 = require("../../viewer-parts/conditional-formatting/_style-settings-provider");
const _cssHelper_1 = require("../../viewer-parts/viewer/_cssHelper");
function getConditionTypes(dataType, filters = {}) {
    var filterGradient = (array) => array.filter(displayValue => filters.rangeGradientPredefinedTypeFilter ? filters.rangeGradientPredefinedTypeFilter(displayValue.value) : true);
    var filterRangeSet = (array) => array.filter(displayValue => filters.rangeSetPredefinedTypeFilter ? filters.rangeSetPredefinedTypeFilter(displayValue.value) : true);
    var conditionTypeFilter = filters.conditionTypeFilter || (() => true);
    return [{
            propertyName: 'conditionValue',
            constraint: (dataType) => dataType !== 'Enum',
            specificTypes: Object
                .keys(_format_condition_value_1.conditionInCondition.values)
                .map(key => {
                return {
                    value: key,
                    displayText: _format_condition_value_1.conditionInCondition.values[key],
                    constraint: ['Equal', 'NotEqual', 'ContainsText'].indexOf(key) !== -1 ? () => true : (dataType => dataType !== 'Text')
                };
            })
        }, {
            propertyName: 'conditionTopBottom',
            constraint: (dataType) => _data_field_1.IsNumeric(dataType),
            specificTypes: Object
                .keys(_format_condition_top_bottom_1.topBottom.values)
                .map(key => { return { value: key, displayText: _format_condition_top_bottom_1.topBottom.values[key] }; })
        }, {
            propertyName: 'conditionAverage',
            displayText: 'DashboardStringId.CommandFormatRuleAboveBelowAverage',
            constraint: (dataType) => _data_field_1.IsNumeric(dataType),
            specificTypes: Object
                .keys(_format_condition_average_1.averageType.values)
                .map(key => { return { value: key, displayText: _format_condition_average_1.averageType.values[key] }; })
        }, {
            propertyName: 'conditionDateOccuring',
            constraint: (dataType) => _data_field_1.IsDateTime(dataType)
        }, {
            propertyName: 'conditionExpression',
            constraint: (dataType) => dataType !== 'Enum'
        }, {
            propertyName: 'conditionRangeSet',
            displayText: 'DashboardStringId.CommandFormatRuleRangeIcons',
            rangeStyleType: 'Icon',
            constraint: (dataType) => !_data_field_1.IsTextual(dataType),
            subtype: 'icons',
            specificTypes: [{
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges2'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Arrows2, displayText: 'Arrows 2' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ArrowsGray2, displayText: 'Arrows Gray 2' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Circles2, displayText: 'Circles 2' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Symbols2, displayText: 'Symbols 2' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.SymbolsCircled2, displayText: 'Symbols Circled 2' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges3'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Arrows3, displayText: 'Arrows 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ArrowsGray3, displayText: 'Arrows Gray 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.PositiveNegative3, displayText: 'Positive Negative 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Circles3, displayText: 'Circles 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.TrafficLights3, displayText: 'Traffic Lights 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Signs3, displayText: 'Signs 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Symbols3, displayText: 'Symbols 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.SymbolsCircled3, displayText: 'Symbols Circled 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Stars3, displayText: 'Stars 3' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Flags3, displayText: 'Flags 3' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges4'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Arrows4, displayText: 'Arrows 4' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ArrowsGray4, displayText: 'Arrows Gray 4' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Circles4, displayText: 'Circles 4' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.CirclesRedToBlack4, displayText: 'Circles Red To Black 4' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Bars4, displayText: 'Bars 4' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges5'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Arrows5, displayText: 'Arrows 5' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ArrowsGray5, displayText: 'Arrows Gray 5' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Quarters5, displayText: 'Quarters 5' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Bars5, displayText: 'Bars 5' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.Boxes5, displayText: 'Boxes 5' }
                    ])
                }]
        }, {
            propertyName: 'conditionRangeSet',
            rangeStyleType: 'Color',
            constraint: (dataType) => !_data_field_1.IsTextual(dataType),
            subtype: 'colors',
            specificTypes: [{
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges2'),
                    displayText: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges2'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedGreen, displayText: 'Pale Red Green' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedGreen, displayText: 'Red Green' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges3'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedGreenBlue, displayText: 'Pale Red Green Blue' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedGreenBlue, displayText: 'Red Green Blue' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges4'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedYellowGreenBlue, displayText: 'Pale Red Yellow Green Blue' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedYellowGreenBlue, displayText: 'Red Yellow Green Blue' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges5'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedOrangeYellowGreenBlue, displayText: 'Pale Red Orange Yellow Green Blue' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedOrangeYellowGreenBlue, displayText: 'Red Orange Yellow Green Blue' }
                    ])
                }]
        }, {
            propertyName: 'conditionRangeGradient',
            rangeStyleType: 'Gradient',
            constraint: (dataType) => !_data_field_1.IsTextual(dataType),
            specificTypes: [{
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSet2ColorGradientRanges'),
                    items: filterGradient([
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenWhite, displayText: 'Green White' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.WhiteGreen, displayText: 'White Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedWhite, displayText: 'Red White' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.WhiteRed, displayText: 'White Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenYellow, displayText: 'Green Yellow' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.YellowGreen, displayText: 'Yellow Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedYellow, displayText: 'Red Yellow' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.YellowRed, displayText: 'Yellow Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueWhite, displayText: 'Blue White' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.WhiteBlue, displayText: 'White Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueRed, displayText: 'Blue Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedBlue, displayText: 'Red Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.YellowBlue, displayText: 'Yellow Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueYellow, displayText: 'Blue Yellow' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenBlue, displayText: 'Green Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueGreen, displayText: 'Blue Green' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSet3ColorGradientRanges'),
                    items: filterGradient([
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenWhiteBlue, displayText: 'Green White Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueWhiteGreen, displayText: 'Blue White Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueWhiteRed, displayText: 'Blue White Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedWhiteBlue, displayText: 'Red White Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenWhiteRed, displayText: 'Green White Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedWhiteGreen, displayText: 'Red White Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenYellowRed, displayText: 'Green Yellow Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedYellowGreen, displayText: 'Red Yellow Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueYellowRed, displayText: 'Blue Yellow Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedYellowBlue, displayText: 'Red Yellow Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenYellowBlue, displayText: 'Green Yellow Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueYellowGreen, displayText: 'Blue Yellow Green' }
                    ])
                }]
        }, {
            propertyName: 'conditionBar',
            constraint: (dataType) => !_data_field_1.IsTextual(dataType)
        }, {
            propertyName: 'conditionColorRangeBar',
            displayText: 'DashboardStringId.CommandFormatRuleColorRangeBar',
            rangeStyleType: 'ColorBar',
            constraint: (dataType) => !_data_field_1.IsTextual(dataType),
            specificTypes: [{
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges2'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedGreen, displayText: 'Pale Red Green' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedGreen, displayText: 'Red Green' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges3'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedGreenBlue, displayText: 'Pale Red Green Blue' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedGreenBlue, displayText: 'Red Green Blue' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges4'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedYellowGreenBlue, displayText: 'Pale Red Yellow Green Blue' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedYellowGreenBlue, displayText: 'Red Yellow Green Blue' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSetRanges5'),
                    items: filterRangeSet([
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsPaleRedOrangeYellowGreenBlue, displayText: 'Pale Red Orange Yellow Green Blue' },
                        { value: range_converter_1.FormatConditionRangeSetPredefinedType.ColorsRedOrangeYellowGreenBlue, displayText: 'Red Orange Yellow Green Blue' }
                    ])
                }]
        }, {
            propertyName: 'conditionGradientRangeBar',
            displayText: 'DashboardStringId.CommandFormatRuleGradientRangeBar',
            rangeStyleType: 'GradientBar',
            constraint: (dataType) => !_data_field_1.IsTextual(dataType),
            specificTypes: [{
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSet2ColorGradientRanges'),
                    items: filterGradient([
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenWhite, displayText: 'Green White' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.WhiteGreen, displayText: 'White Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedWhite, displayText: 'Red White' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.WhiteRed, displayText: 'White Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenYellow, displayText: 'Green Yellow' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.YellowGreen, displayText: 'Yellow Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedYellow, displayText: 'Red Yellow' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.YellowRed, displayText: 'Yellow Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueWhite, displayText: 'Blue White' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.WhiteBlue, displayText: 'White Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueRed, displayText: 'Blue Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedBlue, displayText: 'Red Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.YellowBlue, displayText: 'Yellow Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueYellow, displayText: 'Blue Yellow' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenBlue, displayText: 'Green Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueGreen, displayText: 'Blue Green' }
                    ])
                }, {
                    key: index_internal_1.getLocalizationById('DashboardStringId.CommandFormatRuleRangeSet3ColorGradientRanges'),
                    items: filterGradient([
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenWhiteBlue, displayText: 'Green White Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueWhiteGreen, displayText: 'Blue White Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueWhiteRed, displayText: 'Blue White Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedWhiteBlue, displayText: 'Red White Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenWhiteRed, displayText: 'Green White Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedWhiteGreen, displayText: 'Red White Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenYellowRed, displayText: 'Green Yellow Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedYellowGreen, displayText: 'Red Yellow Green' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueYellowRed, displayText: 'Blue Yellow Red' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.RedYellowBlue, displayText: 'Red Yellow Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.GreenYellowBlue, displayText: 'Green Yellow Blue' },
                        { value: range_converter_1.FormatConditionRangeGradientPredefinedType.BlueYellowGreen, displayText: 'Blue Yellow Green' }
                    ])
                }]
        },
    ]
        .map(typeDescr => {
        typeDescr['displayText'] = typeDescr['displayText'] || _dashboard_item_format_rule_1.conditionTypes.filter(t => t.propertyName === typeDescr.propertyName)[0].displayName;
        return typeDescr;
    })
        .filter(ct => conditionTypeFilter(ct.propertyName, ct.subtype))
        .filter(ct => ct.constraint(dataType));
}
function getConditionSpecificTypes(conditionType, dataType, filters) {
    var conditionTypeDesciptor = getConditionTypes(dataType, filters).filter(ct => !!ct.subtype
        ? ct.propertyName + '_' + ct.subtype === conditionType
        : ct.propertyName === conditionType)[0];
    if (conditionTypeDesciptor && conditionTypeDesciptor.specificTypes) {
        let types = conditionTypeDesciptor.specificTypes
            .filter(st => !st.constraint || st.constraint(dataType));
        types['rangeStyleType'] = conditionTypeDesciptor.rangeStyleType || 'None';
        return types;
    }
    else {
        let types = [{ value: conditionType, displayText: '-' }];
        types['rangeStyleType'] = 'None';
        return types;
    }
}
class FormatConditionTypeEditorSurface {
    constructor(options) {
        this.displayMode = ko.observable();
        this.ancestors = ko.observable([]);
        this.backClick = () => {
            this.displayMode('conditionTypes');
        };
        this.updateItemAppearance = (e) => {
            let element = _jquery_helpers_1.$unwrap(e.itemElement);
            e.itemData.hasSpecificTypes ? element.classList.add('dx-dashboard-has-children') : element.classList.remove('dx-dashboard-has-children');
        };
        this.dataType = options.dataType;
        this.conditionType = options.conditionType;
        this.specificType = options.specificType;
        this.displayMode.subscribe(mode => {
            if (mode === 'conditionTypes') {
                this.ancestors(['…']);
            }
            else {
                this.ancestors(['…', this.availableConditionTypes().filter(t => t.value === this.conditionType())[0].displayText]);
            }
        });
        this.availableConditionTypes = ko.computed(() => {
            if (!this.dataType())
                return;
            var types = getConditionTypes(this.dataType(), options.filters)
                .map(ct => ({
                value: ct.propertyName + (ct.subtype ? '_' + ct.subtype : ''),
                displayText: ct.displayText,
                hasSpecificTypes: !!ct.specificTypes
            }));
            return types;
        });
        this.availableConditionTypes.subscribe((types) => {
            if (!types.filter(t => t.value === this.conditionType.peek())[0]) {
                this.conditionType(null);
            }
        });
        this.availableSpecificTypes = ko.computed(() => {
            let conditionType = this.conditionType();
            let dataType = this.dataType();
            let types = dataType && conditionType ? getConditionSpecificTypes(conditionType, dataType, options.filters) : [];
            if (types && (types.length > 1)) {
                this.displayMode('specificTypes');
            }
            else {
                this.displayMode('conditionTypes');
            }
            return types;
        });
        this.availableSpecificTypes.subscribe(types => {
            if (types.length === 1)
                this.specificType(types[0].value);
        });
        this.selectedSpecificTypes = ko.computed(() => {
            if (this.availableSpecificTypes()['rangeStyleType'] === 'None') {
                return this.availableSpecificTypes() && this.availableSpecificTypes().filter((value) => value.value === this.specificType()) || [];
            }
            else {
                var selection = null, key = null;
                this.availableSpecificTypes().forEach((group) => {
                    group.items.forEach(item => {
                        if (item.value === this.specificType()) {
                            key = group.key;
                            selection = item;
                            return false;
                        }
                    });
                    if (selection)
                        return false;
                });
                return selection && [{ key: key, items: [selection] }] || [];
            }
        });
    }
    getStyleList(rangeStyleType) {
        const styleList = range_converter_1.FormatConditionConverter.getStyleList(rangeStyleType).list.reverse();
        return styleList.map(styleType => {
            if (this.availableSpecificTypes()['rangeStyleType'] === 'Icon') {
                return _style_settings_provider_1.styleSettingsProvider.toIconCssClass(styleType);
            }
            return _cssHelper_1.convertCssPropertyWrappersToObject(_appearance_settings_provider_1.appearanceSettingsProvider.toCssProperties(styleType));
        });
    }
    getGradientColorsList(type) {
        return range_generator_1.FormatConditionRangeGenerator.generateGradientColors(type, 6).reverse();
    }
}
exports.FormatConditionTypeEditorSurface = FormatConditionTypeEditorSurface;
