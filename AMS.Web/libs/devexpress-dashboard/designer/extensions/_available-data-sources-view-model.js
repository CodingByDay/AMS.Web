/**
* DevExpress Dashboard (_available-data-sources-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableDataSourcesViewModel = void 0;
class AvailableDataSourcesViewModel {
    constructor(_dataSources, selectedDataSources, uiState, errorState, _showCreateDataSourceWizardDelegate) {
        this._dataSources = _dataSources;
        this.selectedDataSources = selectedDataSources;
        this.uiState = uiState;
        this.errorState = errorState;
        this._showCreateDataSourceWizardDelegate = _showCreateDataSourceWizardDelegate;
        this.showCreateDataSourceWizard = (federationSources) => {
            if (this.canCreateDataSourceWizard) {
                this._showCreateDataSourceWizardDelegate()(federationSources);
            }
        };
    }
    getDataSources(dataSourcesFilter = (() => true)) {
        return this._dataSources().filter(dataSourcesFilter);
    }
    get canCreateDataSourceWizard() {
        return !!this._showCreateDataSourceWizardDelegate();
    }
}
exports.AvailableDataSourcesViewModel = AvailableDataSourcesViewModel;
