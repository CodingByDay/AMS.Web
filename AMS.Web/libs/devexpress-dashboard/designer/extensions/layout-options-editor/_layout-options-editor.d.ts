/**
* DevExpress Dashboard (_layout-options-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { LayoutDimensionOptions } from '../../../model/layout/layout-dimension-options';
import { DesignerToolbarItem } from '../../toolbar-extension/toolbar-extension-common';
export declare function getDimensionToolbarItems(caption: string, namePrefix: string): {
    items: Array<DesignerToolbarItem>;
    assignModel: {
        (dimensionOptions: LayoutDimensionOptions): void;
    };
    dispose: {
        (): void;
    };
};
