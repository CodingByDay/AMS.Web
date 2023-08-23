import { IControlOwner } from '../interfaces/i-control-owner';
import { SearchManager } from './search-manager';
export declare class QuickSearchPanel {
    static shortcuts: {
        showPanel: number;
        showDialog: number;
    };
    protected static containerPostfix: string;
    protected static wrapperPostfix: string;
    protected static prevBtnPostfix: string;
    protected static nextBtnPostfix: string;
    protected static collapseBtnPostfix: string;
    protected static closeBtnPostfix: string;
    private get core();
    private resultLabel;
    private searchManager;
    protected owner: IControlOwner;
    private timerId;
    private height;
    private searchField;
    constructor(owner: IControlOwner, searchManager: SearchManager);
    dispose(): void;
    initialize(): void;
    initializeFields(): void;
    createElements(): void;
    attachEvents(): void;
    findNext(): void;
    findPrev(): void;
    findAll(): void;
    updateSearchInfo(index: any): void;
    setResult(text: string): void;
    clearResult(): void;
    getQuickSearchPanelWrapper(): HTMLElement;
    getSearchField(): HTMLInputElement;
    getPrevButton(): HTMLElement;
    getNextButton(): HTMLElement;
    getCollapseButton(): HTMLElement;
    getCloseButton(): HTMLElement;
    getResultLabel(): HTMLElement;
    NotifySearchReset(): void;
    showFindReplaceDialog(): void;
    show(): void;
    hide(resetSearch: boolean): void;
    onClose(resetSearch: any): void;
    isVisible(): boolean;
}
//# sourceMappingURL=quick-search-panel.d.ts.map