﻿/**
* DevExpress Dashboard (_custom-appearance-dialog.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IAppearanceWrapper, ICustomAppearance } from './_conditional-formatting-custom-color-storage';
export declare class CustomAppearanceDialog {
    private setAppearance;
    private availableFontFamilies;
    visible: ko.Observable<boolean>;
    isMaterial: boolean;
    appearancePreview: ko.Observable<IAppearanceWrapper>;
    colorBox: (dataField: any, labelLocaleId: any) => {
        dataField: any;
        label: {
            text: any;
        };
        cssClass: string;
        editorType: string;
        editorOptions: {
            editAlphaChannel: boolean;
        };
    };
    buttonGroup: (args: any) => HTMLDivElement;
    styleButtons: () => {
        dataField: string;
        cssClass: string;
        label: {
            visible: boolean;
        };
        template: (args: any) => HTMLDivElement;
    };
    fontStyle: (type: string, labelLocaleId: any) => {
        icon: string;
        hint: any;
        dataField: string;
        elementAttr: {
            class: string;
        };
    };
    fontStyles: {
        icon: string;
        hint: any;
        dataField: string;
        elementAttr: {
            class: string;
        };
    }[];
    appearanceSettingsGroup: () => {
        itemType: string;
        colCount: number;
        cssClass: string;
        items: ({
            dataField: any;
            label: {
                text: any;
            };
            cssClass: string;
            editorType: string;
            editorOptions: {
                editAlphaChannel: boolean;
            };
        } | {
            dataField: string;
            cssClass: string;
            label: {
                visible: boolean;
            };
            template: (args: any) => HTMLDivElement;
        })[];
    };
    fontFamilyEditor: (fontFamilies: any) => (args: any) => HTMLDivElement;
    fontFamily: (fontFamilies: any) => {
        dataField: string;
        label: {
            visible: boolean;
        };
        template: (args: any) => HTMLDivElement;
    };
    styledTextPreviewEditor: () => HTMLDivElement;
    preview: {
        dataField: string;
        label: {
            visible: boolean;
        };
        template: () => HTMLDivElement;
    };
    buttonItems: ko.ObservableArray<{
        toolbar: string;
        location: string;
        widget: string;
        options: {
            type: string;
            text: any;
            onClick: () => void;
        };
    } | {
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            onClick: () => any;
            type?: undefined;
        };
    }>;
    popupOptions: {
        toolbarItems: ko.ObservableArray<{
            toolbar: string;
            location: string;
            widget: string;
            options: {
                type: string;
                text: any;
                onClick: () => void;
            };
        } | {
            toolbar: string;
            location: string;
            widget: string;
            options: {
                text: any;
                onClick: () => any;
                type?: undefined;
            };
        }>;
        visible: ko.Observable<boolean>;
        height: string;
        width: string;
        minWidth: string;
        maxWidth: string;
        showCloseButton: boolean;
        wrapperAttr: {
            class: string;
        };
        title: any;
    };
    items: ({
        itemType: string;
        colCount: number;
        cssClass: string;
        items: ({
            dataField: any;
            label: {
                text: any;
            };
            cssClass: string;
            editorType: string;
            editorOptions: {
                editAlphaChannel: boolean;
            };
        } | {
            dataField: string;
            cssClass: string;
            label: {
                visible: boolean;
            };
            template: (args: any) => HTMLDivElement;
        })[];
    } | {
        itemType: string;
        cssClass: string;
        items: {
            dataField: string;
            label: {
                visible: boolean;
            };
            template: (args: any) => HTMLDivElement;
        }[];
    } | {
        itemType: string;
        items: {
            dataField: string;
            label: {
                visible: boolean;
            };
            template: () => HTMLDivElement;
        }[];
        cssClass?: undefined;
    })[];
    formOptions: {
        formData: ko.Observable<IAppearanceWrapper>;
        items: ({
            itemType: string;
            colCount: number;
            cssClass: string;
            items: ({
                dataField: any;
                label: {
                    text: any;
                };
                cssClass: string;
                editorType: string;
                editorOptions: {
                    editAlphaChannel: boolean;
                };
            } | {
                dataField: string;
                cssClass: string;
                label: {
                    visible: boolean;
                };
                template: (args: any) => HTMLDivElement;
            })[];
        } | {
            itemType: string;
            cssClass: string;
            items: {
                dataField: string;
                label: {
                    visible: boolean;
                };
                template: (args: any) => HTMLDivElement;
            }[];
        } | {
            itemType: string;
            items: {
                dataField: string;
                label: {
                    visible: boolean;
                };
                template: () => HTMLDivElement;
            }[];
            cssClass?: undefined;
        })[];
        height: string;
        labelLocation: string;
        showColonAfterLabel: boolean;
        onFieldDataChanged: (e: any) => void;
    };
    constructor(setAppearance: (appearance: ICustomAppearance) => void, availableFontFamilies: ko.Subscribable<string[]>);
    show(appearance: ICustomAppearance): void;
    getValue(): ICustomAppearance;
}
