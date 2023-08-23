import { RichEditCore } from '../base/rich-edit-core';
import { DocumentFormat } from '../core/document-format';
import { IDocumentImporter } from '../core/formats/i-document-importer';
import { IModelManager } from '../core/model-manager';
import { FieldRequestManager } from '../core/model/fields/field-request-manager';
import { RichOptions } from '../core/model/options/rich-options';
import { ClientCommandManager } from './commands/client-command-manager';
import { ClientShortcutManager } from './commands/shortcut-manager';
import { ClientLoadingPanelManager } from './loading-panel/manager';
export declare class ClientRichEditCore extends RichEditCore {
    private _nonce;
    activeDocumentImporter: IDocumentImporter;
    fileDownloaded: boolean;
    saveDocumentFormat: DocumentFormat | null | undefined;
    protected beforeInitialization(options: RichOptions): void;
    protected registerActiveContextTabManager(): void;
    protected createCommandManager(): ClientCommandManager;
    protected createShortcutManager(): ClientShortcutManager;
    createFieldRequestManager(): FieldRequestManager;
    protected createLoadingPanelManager(): ClientLoadingPanelManager;
    protected registerFontChangesListeners(): void;
    isClientMode(): boolean;
    protected createModelManager(richOptions: RichOptions): IModelManager;
    dispose(): void;
    protected createViewElement(id: string, element: HTMLElement): HTMLDivElement;
}
//# sourceMappingURL=client-rich-edit-core.d.ts.map