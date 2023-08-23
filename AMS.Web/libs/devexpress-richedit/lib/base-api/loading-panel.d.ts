import { ICustomLoadingPanel } from '../base/loading-panel/panel';
import { RichEditCore } from '../base/rich-edit-core';
export declare class LoadingPanelApi {
    private _core;
    get enabled(): boolean;
    set enabled(value: boolean);
    get customPanel(): undefined | ICustomLoadingPanel;
    set customPanel(value: undefined | ICustomLoadingPanel);
    constructor(core: RichEditCore);
    show(): void;
    hide(): void;
}
//# sourceMappingURL=loading-panel.d.ts.map