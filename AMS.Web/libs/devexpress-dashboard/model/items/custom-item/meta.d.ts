/**
* DevExpress Dashboard (meta.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SectionOptions } from '../../../designer';
import { CustomPropertyMetadata } from '../../custom-properties/custom-properties-metadata';
import { ICustomItemBinding } from './binding';
import { ICustomItemProperty } from './property';
export interface ICustomItemMetaData {
    bindings?: Array<ICustomItemBinding>;
    properties?: Array<ICustomItemProperty>;
    optionsPanelSections?: Array<SectionOptions>;
    customProperties?: Array<CustomPropertyMetadata>;
    interactivity?: {
        filter?: boolean;
        drillDown?: boolean;
    };
    index?: number;
    groupName?: string;
    icon: string;
    title: string;
}
