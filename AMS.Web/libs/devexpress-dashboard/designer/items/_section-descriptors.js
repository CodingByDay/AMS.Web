﻿/**
* DevExpress Dashboard (_section-descriptors.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surfaceItemsFactory = exports.SurfaceItemsFactory = exports.SectionDescriptors = void 0;
const _filter_element_item_base_1 = require("../../model/items/filter-items/metadata/_filter-element-item-base");
const _chorolpeth_map_item_1 = require("../../model/items/map/metadata/_chorolpeth-map-item");
const _geo_point_map_item_base_1 = require("../../model/items/map/metadata/_geo-point-map-item-base");
const _map_item_1 = require("../../model/items/map/metadata/_map-item");
const _data_dashboard_item_1 = require("../../model/items/metadata/_data-dashboard-item");
const _series_item_1 = require("../../model/items/metadata/_series-item");
const _scatter_chart_item_1 = require("../../model/items/scatter-chart/metadata/_scatter-chart-item");
const _base_metadata_1 = require("../../model/metadata/_base-metadata");
exports.SectionDescriptors = {
    HiddenDimensions: {
        title: 'DashboardWebStringId.Binding.HiddenDimensions',
        bindingProperty: {
            propertyName: _data_dashboard_item_1.hiddenDimensions.propertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddDimension',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureDimension'
        }
    },
    HiddenMeasures: {
        title: 'DashboardWebStringId.Binding.HiddenMeasures',
        bindingProperty: {
            propertyName: _data_dashboard_item_1.hiddenMeasures.propertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddMeasure',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureMeasure'
        }
    },
    SeriesDimension: {
        title: _base_metadata_1.BindingSectionTitles.SeriesDimension,
        bindingProperty: {
            propertyName: _series_item_1.seriesDimensions.propertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddSeries',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureSeries'
        }
    },
    Arguments: {
        title: _base_metadata_1.BindingSectionTitles.Arguments,
        bindingProperty: {
            propertyName: _base_metadata_1.argumentsPropertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddArgument',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureArgument'
        }
    },
    Values: {
        title: 'DashboardStringId.DescriptionValues',
        bindingProperty: {
            propertyName: _base_metadata_1.valuesPropertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddValue',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureValue'
        }
    },
    FilterDimensions: {
        title: 'DashboardStringId.DescriptionDimensions',
        bindingProperty: {
            propertyName: _filter_element_item_base_1.filterDimensions.propertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddDimension',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureDimension'
        }
    },
    SparklineArgument: {
        title: 'DashboardWebStringId.Binding.Sparkline',
        bindingProperty: {
            propertyName: _base_metadata_1.sparklineArgumentPropertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetArgument',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureArgument'
        }
    },
    SingleArgument: {
        title: _base_metadata_1.BindingSectionTitles.SingleArgument,
        bindingProperty: {
            propertyName: _base_metadata_1.argumentPropertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetArgument',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureArgument'
        }
    },
    Value: {
        title: 'DashboardStringId.ValueCaption',
        bindingProperty: {
            propertyName: _base_metadata_1.valuePropertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetValue',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureValue'
        }
    },
    Latitude: {
        title: 'DashboardStringId.Latitude',
        bindingProperty: {
            propertyName: _geo_point_map_item_base_1.latitude.propertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetLatitude',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureLatitude'
        }
    },
    Longitude: {
        title: 'DashboardStringId.Longitude',
        bindingProperty: {
            propertyName: _geo_point_map_item_base_1.longitude.propertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetLongitude',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureLongitude'
        }
    },
    TooltipDimensions: {
        title: 'DashboardWebStringId.Binding.TooltipDimensions',
        bindingProperty: {
            propertyName: _geo_point_map_item_base_1.tooltipDimensions.propertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddDimension',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureDimension'
        }
    },
    TooltipMeasures: {
        title: 'DashboardWebStringId.Binding.TooltipMeasures',
        bindingProperty: {
            propertyName: _map_item_1.tooltipMeasures.propertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddMeasure',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureMeasure'
        }
    },
    Columns: {
        title: 'DashboardStringId.DescriptionColumns',
        bindingProperty: {
            propertyName: _base_metadata_1.columnsPropertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddColumn',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureColumn'
        }
    },
    Rows: {
        title: 'DashboardStringId.DescriptionRows',
        bindingProperty: {
            propertyName: _base_metadata_1.rowsPropertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.AddRow',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureRow'
        }
    },
    Weight: {
        title: 'DashboardStringId.WeightCaption',
        bindingProperty: {
            propertyName: _base_metadata_1.weightPropertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetWeight',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureWeight'
        }
    },
    Color: {
        title: 'DashboardStringId.DescriptionItemColor',
        bindingProperty: {
            propertyName: _base_metadata_1.colorPropertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetColor',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureColor'
        }
    },
    AttributeDimension: {
        title: 'DashboardWebStringId.Binding.Attribute',
        bindingProperty: {
            propertyName: _chorolpeth_map_item_1.attributeDimension.propertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetAttribute',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureAttribute'
        }
    },
    Argument: {
        title: _base_metadata_1.BindingSectionTitles.SingleArgument,
        bindingProperty: {
            propertyName: _base_metadata_1.argumentPropertyName,
            dataItemType: 'Dimension',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetArgument',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureArgument'
        }
    },
    AxisXMeasure: {
        title: 'DashboardWebStringId.Binding.XAxis',
        bindingProperty: {
            propertyName: _scatter_chart_item_1.axisXMeasure.propertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetValue',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureValue'
        }
    },
    AxisYMeasure: {
        title: 'DashboardWebStringId.Binding.YAxis',
        bindingProperty: {
            propertyName: _scatter_chart_item_1.axisYMeasure.propertyName,
            dataItemType: 'Measure',
            emptyPlaceholder: 'DashboardWebStringId.Binding.SetValue',
            selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureValue'
        }
    }
};
class SurfaceItemsFactory {
    constructor() {
        this._itemsMap = {};
    }
    register(dashboardItemType, surfaceTypeConstructor) {
        this._itemsMap[dashboardItemType] = surfaceTypeConstructor;
    }
    createSurfaceItem(dashboardItem, dashboardModel, dataSourceBrowser, notificationController, findExtension) {
        if (dashboardItem && dashboardItem.itemType && dashboardItem.itemType()) {
            var surfaceTypeConstructor = this._itemsMap[dashboardItem.itemType()];
            if (surfaceTypeConstructor) {
                return new surfaceTypeConstructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController, findExtension);
            }
        }
        return null;
    }
}
exports.SurfaceItemsFactory = SurfaceItemsFactory;
exports.surfaceItemsFactory = new SurfaceItemsFactory();
