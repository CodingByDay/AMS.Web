/**
* DevExpress Dashboard (resource-manager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import '../resources/_bindings';
export declare class ResourceManager {
    static _resourceManagerKeys: Array<Element | 'callFromApi'>;
    static embedBundledResources(): void;
    static removeEmbeddedResources(): void;
    static _embedBundledResourcesCore(keyElement: Element | 'callFromApi'): void;
    static _removeEmbeddedResourcesCore(keyElement: Element | 'callFromApi'): void;
    static setLocalizationMessages(localizationMessages: {
        [localizationStringId: string]: string;
    }): void;
    static registerIcon(icon: string | HTMLElement): void;
}
