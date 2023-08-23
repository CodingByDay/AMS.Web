import { IEventListener } from '../../base-utils/event-dispatcher';
import { IRichEditUnitConverter } from '../../base-utils/unit-converter';
import { FormatterManager, ILayoutFormatterManagerHolder } from '../../core/layout-formatter/managers/formatter-manager';
import { DocumentLayout } from '../../core/layout/document-layout';
import { IMeasurer } from '../../core/measurer/measurer';
import { IModelManager } from '../../core/model-manager';
import { DocumentModel } from '../../core/model/document-model';
import { FieldRequestManager } from '../../core/model/fields/field-request-manager';
import { IsModified } from '../../core/model/json/enums/json-top-level-enums';
import { IProcessor } from '../../core/processor';
import { InnerClientProperties } from '../../core/rich-utils/inner-client-properties';
import { SpellChecker } from '../../core/spelling/spell-checker';
import { StringResources } from '../../core/string-resources';
import { IBatchUpdatableObject } from '@devexpress/utils/lib/class/batch-updatable';
import { Point } from '@devexpress/utils/lib/geometry/point';
import { PdfHelperFrame } from '@devexpress/utils/lib/pdf/helper-frame';
import { IDisposable } from '@devexpress/utils/lib/types';
import { AutoCorrectService } from '../auto-correct/auto-correct-service';
import { IBarHolder } from '../bars/interfaces';
import { ViewManager } from '../canvas/renderes/view-manager';
import { ClientSideEvents } from '../client-side-events';
import { RichEditClientCommand } from '../commands/client-command';
import { CommandManager } from '../commands/command-manager';
import { ShortcutManager } from '../commands/shortcut-manager';
import { FocusManager } from '../focus-manager';
import { GlobalEventDispatcher } from '../global-event-dispatcher';
import { InputController } from '../input-controller';
import { HitTestManager } from '../layout-engine/hit-test-manager/hit-test-manager';
import { LoadingPanelManagerBase } from '../loading-panel/manager';
import { IBuiltinLoadingPanel, LoadingPanelBase } from '../loading-panel/panel';
import { DocumentInfo } from '../rich-edit-core';
import { InputPosition } from '../selection/input-position';
import { InputPositionModelChangesListener } from '../selection/input-position-model-changes-listener';
import { Selection } from '../selection/selection';
import { SelectionModelChangesListener } from '../selection/selection-model-changes-listener';
import { ServerDispatcher } from '../server-dispatcher';
import { IRulerControl } from '../ui/ruler/ruler';
import { SearchManager } from '../ui/search-manager';
import { IControlOwner } from './i-control-owner';
export interface IBarListener extends IEventListener {
    NotifyBarCommandExecuted(commandID: RichEditClientCommand, parameter: any): any;
    NotifyBarUpdateRequested(): any;
}
export interface IPopupMenuManager {
    showByKey(): any;
    showByMouseClick(p: Point): any;
    showByTouchClick(): any;
    setSelection(selection: Selection): any;
    rejectNextShowContextMenu(): any;
}
export interface IReadOnlyPropertyHolder {
    readonly isReadOnlyPersistent: boolean;
}
export interface IRichEditControl extends IBatchUpdatableObject, IDisposable, IReadOnlyPropertyHolder, ILayoutFormatterManagerHolder, IProcessor {
    modelManager: IModelManager;
    commandManager: CommandManager;
    shortcutManager: ShortcutManager;
    selection: Selection;
    inputPosition: InputPosition;
    inputPositionModelChangesListener: InputPositionModelChangesListener;
    hitTestManager: HitTestManager;
    measurer: IMeasurer;
    uiUnitConverter: IRichEditUnitConverter;
    horizontalRulerControl: IRulerControl;
    spellChecker: SpellChecker;
    autoCorrectService: AutoCorrectService;
    searchManager: SearchManager;
    clientSideEvents: ClientSideEvents;
    innerClientProperties: InnerClientProperties;
    focusManager: FocusManager;
    inputController: InputController;
    globalEventDispatcher: GlobalEventDispatcher;
    isLoadingPictureFromClipboard: boolean;
    lastSavedHistoryItemId: number;
    layout: DocumentLayout;
    viewManager: ViewManager;
    layoutFormatterManager: FormatterManager;
    loadingPanelManager: LoadingPanelManagerBase<LoadingPanelBase<IBuiltinLoadingPanel>, LoadingPanelBase<IBuiltinLoadingPanel>>;
    readOnly: ReadOnlyMode;
    documentInfo: DocumentInfo;
    stringResources: StringResources;
    barHolder: IBarHolder;
    popupMenuManager: IPopupMenuManager;
    serverDispatcher: ServerDispatcher;
    owner: IControlOwner;
    selectionModelChangesListener: SelectionModelChangesListener;
    pdfHelperFrame: PdfHelperFrame;
    isClientMode(): boolean;
    createFieldRequestManager(): FieldRequestManager;
    initialize(sessionGuid: string, documentInfo: DocumentInfo, subDocumentsCounter: number, documentModel: DocumentModel): any;
    setWorkSession(sessionGuid: string, documentInfo: DocumentInfo, lastExecutedCommandId: number): any;
    sendRequest(requestQueryString: string, viaInternalCallback: boolean): any;
    beginLoading(): any;
    endLoading(): any;
    closeDocument(): any;
    importHtml(elements: HTMLElement[]): any;
    onViewTypeChanged(): any;
    getModifiedState(): IsModified;
    getGuidParams(): {
        sguid: string;
        cguid: string;
    };
    isTouchMode(): boolean;
    dispose(): any;
    isRibbon(element: HTMLElement): boolean;
    isClosed(): boolean;
    setModifiedFalse(): void;
}
export declare enum ReadOnlyMode {
    None = 0,
    Persistent = 1,
    Temporary = 2
}
//# sourceMappingURL=i-rich-edit-core.d.ts.map