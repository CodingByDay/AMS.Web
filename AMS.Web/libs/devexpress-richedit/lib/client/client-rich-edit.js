import { formatMessage } from 'devextreme/localization';
import { currentTheme } from 'devextreme/viz/themes';
import { RichEditClientCommand } from '../base/commands/client-command';
import { DocumentInfo } from '../base/rich-edit-core';
import { IsModified } from '../core/model/json/enums/json-top-level-enums';
import { RichOptions } from '../core/model/options/rich-options';
import { StylesManager } from '../core/model/styles-manager';
import { StringResources } from '../core/string-resources';
import { Browser } from '@devexpress/utils/lib/browser';
import { DomEventHandlersHolder } from '@devexpress/utils/lib/class/event-handlers-holder';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { EncodeUtils } from '@devexpress/utils/lib/utils/encode';
import { DxtThemeCssClasses } from '../dxt-utils/dxt-utils/dxt-theme-css-classes';
import { HyperlinkApi } from '../model-api/field';
import { Constants } from './_constants';
import { ActiveContextTabManager } from './bars/active-context-tab-manager';
import { ClientBarHolder } from './bars/bar-holder';
import { ClientContextMenuBar } from './bars/context-menu';
import { ClientRibbonBar } from './bars/ribbon';
import { ClientRichEditCore } from './client-rich-edit-core';
import { DataSourceHelper } from './data-source-helper';
import { loadDefaultMessages } from './default-localization';
import { DialogManager } from './dialogs/dialog-manager';
import { ClientFormattersOptions } from './formatters-options';
import { LosingChangesWatcher } from './losing-changes-watcher';
import { Events } from './public/client-events';
import { AutoCorrectEventArgs, CommandStateChangedEventArgs, ContentChangedEventArgs, ContentRemovedEventArgs, CustomCommandExecutedEventArgs, DocumentFormattedEventArgs, DocumentLinkType, EventArgs, HyperlinkClickEventArgs, KeyboardEventArgs, ParagraphPropertiesChangedEventArgs, PdfExportedEventArgs, PdfExportingEventArgs, PointerEventArgs, SavedEventArgs, SavingEventArgs } from './public/events';
import { Interval } from './public/rich-edit';
import { Settings } from './settings';
import { ClientQuickSearchPanel } from './ui/client-quick-search-panel';
import { RulerVisibility } from '../base/ui/ruler/settings';
import { FullScreenHelper } from './ui/full-screen-helper';
export class ClientRichEdit {
    constructor(element, options, publicRichEdit) {
        var _a;
        this.evtHandlersHolder = new DomEventHandlersHolder();
        this.isInitialized = false;
        this.isInFullScreenMode = false;
        this.hasWorkDirectory = false;
        this.allowDocumentLoadedEventCall = true;
        loadDefaultMessages();
        this.internalApi = options.internalApi;
        if (!this.internalApi)
            this.internalApi = {};
        const settings = Settings.parse(options, (id) => publicRichEdit.document.subDocuments.getById(id));
        this.rulerSettings = this.getRulerSettings(settings.view);
        this.name = element.id;
        this.publicRichEdit = publicRichEdit;
        this.exportUrl = settings.exportUrl;
        this.dataSource = settings.dataSource;
        this.rawDataSource = settings.rawDataSource;
        this.contextMenuSettings = settings.contextMenuSettings;
        this.fullScreenHelper = new FullScreenHelper(element);
        this.prepareElement(element, settings);
        this.initDefaultFontsAndStyles();
        this.initBars(settings.ribbon, settings.fonts);
        this.initEvents(settings);
        this.createCore(settings);
        this.initCore();
        this.initDialogManager();
        this.initLosingChangesWatcher(settings.confirmOnLosingChanges);
        this.attachEvents();
        this.adjustControl();
        this.onInit = (_a = options.events) === null || _a === void 0 ? void 0 : _a.init;
        this.document = options.document;
    }
    get clientQuickSearchPanel() {
        if (!this._clientQuickSearchPanel)
            this._clientQuickSearchPanel = new ClientQuickSearchPanel(this, this.core.searchManager);
        return this._clientQuickSearchPanel;
    }
    getPublicRichEdit() {
        return this.publicRichEdit;
    }
    getRulerSettings(viewSettings) {
        const settings = Constants.ruler;
        settings.visibility = viewSettings.showHorizontalRuler ? RulerVisibility.Visible : RulerVisibility.Hidden;
        return settings;
    }
    disposeDataSource() {
        if (this.dataSource)
            this.dataSource.dispose();
        this.dataSource = null;
        this.rawDataSource = null;
    }
    dispose() {
        this.evtHandlersHolder.removeAllListeners();
        this.barHolder.dispose();
        this.dialogManager.dispose();
        if (this._clientQuickSearchPanel)
            this._clientQuickSearchPanel.dispose();
        this.events.clear();
        this.disposeDataSource();
        this.core.dispose();
        DomUtils.clearInnerHtml(this.element);
        this.losingChangesWatcher.dispose();
        this.publicRichEdit = null;
        DomUtils.hideNode(this.element);
        this.core = null;
        this.barHolder = null;
        this.dialogManager = null;
        this._clientQuickSearchPanel = null;
        this.publicRichEdit = null;
        this.losingChangesWatcher = null;
        this.evtHandlersHolder = null;
    }
    setNewRawDataSource(rawDataSource, callback) {
        this.disposeDataSource();
        this.core.modelManager.richOptions.mailMerge.isEnabled = false;
        this.core.modelManager.richOptions.mailMerge.allowInsertFields = false;
        this.rawDataSource = rawDataSource;
        if (rawDataSource === null || rawDataSource === undefined) {
            this.core.barHolder.updateItemsState();
            this.core.horizontalRulerControl.update();
            callback(true);
            return;
        }
        this.dataSource = DataSourceHelper.getDxDataSource(rawDataSource);
        this.dataSource.paginate(false);
        this.dataSource.requireTotalCount(true);
        this.core.loadingPanelManager.loadingPanel.setVisible(true);
        this.dataSource.load()
            .then(() => {
            const options = this.core.modelManager.richOptions.mailMerge;
            options.isEnabled = true;
            options.allowInsertFields = true;
            options.recordCount = this.dataSource.totalCount();
            options.activeRecordIndex = 0;
            if (this.core.modelManager.richOptions.mailMerge.viewMergedData)
                this.core.commandManager.getCommand(RichEditClientCommand.GoToDataRecord).execute(true, options.activeRecordIndex);
            this.core.loadingPanelManager.loadingPanel.setVisible(false);
            this.core.barHolder.updateItemsState();
            this.core.horizontalRulerControl.update();
            callback(true);
        })
            .catch((e) => {
            console.error(e.message);
            this.core.loadingPanelManager.loadingPanel.setVisible(false);
            callback(false);
        });
    }
    prepareElement(element, settings) {
        this.element = element;
        this.element.style.width = settings.width;
        this.element.style.height = settings.height;
        if (getComputedStyle(this.element).display != 'block')
            this.element.style.display = 'block';
        this.element.classList.add('dxreControl');
        this.element.classList.add(DxtThemeCssClasses.BorderColor);
        this.element.classList.add(currentTheme());
    }
    createCore(settings) {
        const options = new RichOptions(new ClientFormattersOptions());
        options.bookmarks = settings.bookmarks;
        options.fields = settings.fields;
        options.mailMerge = settings.mailMerge;
        options.autoCorrect = settings.autoCorrect;
        options.documentProtection = settings.documentProtection;
        options.printing = settings.printing;
        options.pdf = settings.pdf;
        options.search = settings.search;
        options.fonts = settings.fonts;
        options.spellChecker = settings.spellCheck;
        options.nonce = settings.nonce;
        this.core = new ClientRichEditCore(this, this.name, this.element, Math.random().toString(), settings.readOnly, this.barHolder, settings.unit, this.rulerSettings, options, settings.view, this.getStringResources());
    }
    initCore() {
        const documentInfo = new DocumentInfo("", false);
        this.core.initialize("", documentInfo, 1);
    }
    initEvents(settings) {
        this.events = new Events();
        if (settings.onSelectionChanged)
            this.events.selectionChanged.addHandler(settings.onSelectionChanged, this.publicRichEdit);
        if (settings.onDocumentLoaded)
            this.events.documentLoaded.addHandler(settings.onDocumentLoaded, this.publicRichEdit);
        if (settings.onDocumentFormatted)
            this.events.documentFormatted.addHandler(settings.onDocumentFormatted, this.publicRichEdit);
        if (settings.onDocumentChanged)
            this.events.documentChanged.addHandler(settings.onDocumentChanged, this.publicRichEdit);
        if (settings.onActiveSubDocumentChanged)
            this.events.activeSubDocumentChanged.addHandler(settings.onActiveSubDocumentChanged, this.publicRichEdit);
        if (settings.onGotFocus)
            this.events.gotFocus.addHandler(settings.onGotFocus, this.publicRichEdit);
        if (settings.onLostFocus)
            this.events.lostFocus.addHandler(settings.onLostFocus, this.publicRichEdit);
        if (settings.onHyperlinkClick)
            this.events.hyperlinkClick.addHandler(settings.onHyperlinkClick, this.publicRichEdit);
        if (settings.onPointerDown)
            this.events.pointerDown.addHandler(settings.onPointerDown, this.publicRichEdit);
        if (settings.onPointerUp)
            this.events.pointerUp.addHandler(settings.onPointerUp, this.publicRichEdit);
        if (settings.onKeyDown)
            this.events.keyDown.addHandler(settings.onKeyDown, this.publicRichEdit);
        if (settings.onKeyUp)
            this.events.keyUp.addHandler(settings.onKeyUp, this.publicRichEdit);
        if (settings.onCalculateDocumentVariable)
            this.events.calculateDocumentVariable.addHandler(settings.onCalculateDocumentVariable, this.publicRichEdit);
        if (settings.onContentInserted)
            this.events.contentInserted.addHandler(settings.onContentInserted, this.publicRichEdit);
        if (settings.onContentRemoved)
            this.events.contentRemoved.addHandler(settings.onContentRemoved, this.publicRichEdit);
        if (settings.onCharacterPropertiesChanged)
            this.events.characterPropertiesChanged.addHandler(settings.onCharacterPropertiesChanged, this.publicRichEdit);
        if (settings.onParagraphPropertiesChanged)
            this.events.paragraphPropertiesChanged.addHandler(settings.onParagraphPropertiesChanged, this.publicRichEdit);
        if (settings.onAutoCorrect)
            this.events.autoCorrect.addHandler(settings.onAutoCorrect, this.publicRichEdit);
        if (settings.onSaving)
            this.events.saving.addHandler(settings.onSaving, this.publicRichEdit);
        if (settings.onSaved)
            this.events.saved.addHandler(settings.onSaved, this.publicRichEdit);
        if (settings.onCustomCommandExecuted)
            this.events.customCommandExecuted.addHandler(settings.onCustomCommandExecuted, this.publicRichEdit);
        if (settings.onPdfExporting)
            this.events.pdfExporting.addHandler(settings.onPdfExporting, this.publicRichEdit);
        if (settings.onPdfExported)
            this.events.pdfExported.addHandler(settings.onPdfExported, this.publicRichEdit);
        if (settings.onCommandStateChanged)
            this.events.commandStateChanged.addHandler(settings.onCommandStateChanged, this.publicRichEdit);
        if (settings.onCalculateDocumentVariableAsync)
            this.events.calculateDocumentVariableAsync.addHandler(settings.onCalculateDocumentVariableAsync, this.publicRichEdit);
        if (settings.onContextMenuShowing)
            this.events.contextMenuShowing.addHandler(settings.onContextMenuShowing, this.publicRichEdit);
    }
    initDefaultFontsAndStyles() {
        StylesManager.populatePresetStyles(Constants.getLocalizedDefaultPresetStyles());
    }
    initBars(ribbon, fonts) {
        this.barHolder = new ClientBarHolder(undefined, new ClientContextMenuBar(this, this.element, this.contextMenuSettings.items), c => this.raiseCommandStateChanged(c));
        this.initRibbon(ribbon, fonts);
    }
    initRibbon(ribbon, fonts) {
        if (this.core) {
            this.core.modelManager.modelManipulator.removeModelListener(this.barHolder.ribbon);
            this.core.selection.onChanged.remove(this.barHolder.ribbon);
        }
        this.lastRibbonSettings = ribbon;
        this.barHolder.removeRibbonBar();
        if (ribbon.visible) {
            const ribbonBar = new ClientRibbonBar(this, this.element, ribbon, fonts);
            this.barHolder.ribbon = ribbonBar;
            if (this.core) {
                this.core.modelManager.modelManipulator.modelListeners.push(this.barHolder.ribbon);
                this.core.selection.onChanged.add(this.barHolder.ribbon);
                ribbonBar.initialize(this.core);
            }
        }
        if (!this.activeContextTabManager)
            this.activeContextTabManager = new ActiveContextTabManager(this.barHolder);
        this.activeContextTabManager.init(ribbon);
        this.activeContextTabManager.forbidChangeActiveTabIndex = true;
    }
    initDialogManager() {
        this.dialogManager = new DialogManager(this.element, this.core);
    }
    getStringResources() {
        const sr = new StringResources();
        sr.headerFooter.evenPageFooter = formatMessage('XtraRichEditStringId.Caption_EvenPageFooter');
        sr.headerFooter.evenPageHeader = formatMessage('XtraRichEditStringId.Caption_EvenPageHeader');
        sr.headerFooter.firstPageFooter = formatMessage('XtraRichEditStringId.Caption_FirstPageFooter');
        sr.headerFooter.firstPageHeader = formatMessage('XtraRichEditStringId.Caption_FirstPageHeader');
        sr.headerFooter.footer = formatMessage('XtraRichEditStringId.Caption_PageFooter');
        sr.headerFooter.header = formatMessage('XtraRichEditStringId.Caption_PageHeader');
        sr.headerFooter.oddPageFooter = formatMessage('XtraRichEditStringId.Caption_OddPageFooter');
        sr.headerFooter.oddPageHeader = formatMessage('XtraRichEditStringId.Caption_OddPageHeader');
        sr.headerFooter.sameAsPrevious = formatMessage('XtraRichEditStringId.Caption_SameAsPrevious');
        sr.seqCaptionPrefixes.figurePrefix = formatMessage('XtraRichEditStringId.Caption_CaptionPrefixFigure');
        sr.seqCaptionPrefixes.tablePrefix = formatMessage('XtraRichEditStringId.Caption_CaptionPrefixTable');
        sr.seqCaptionPrefixes.equationPrefix = formatMessage('XtraRichEditStringId.Caption_CaptionPrefixEquation');
        sr.commonLabels.noTocEntriesFound = formatMessage('XtraRichEditStringId.Msg_NoTocEntriesFound');
        sr.commonLabels.clickToFollowHyperlink = formatMessage('XtraRichEditStringId.Msg_ClickToFollowHyperlink');
        sr.commonLabels.currentDocumentHyperlinkTooltip = formatMessage('XtraRichEditStringId.Caption_CurrentDocumentHyperlinkTooltip');
        sr.quickSearchPanel.of = formatMessage('ASPxRichEditStringId.FindReplace_Of');
        sr.quickSearchPanel.items = formatMessage('ASPxRichEditStringId.FindReplace_Items');
        sr.quickSearchPanel.noMatches = formatMessage('ASPxRichEditStringId.FindReplace_NoMatches');
        return sr;
    }
    initLosingChangesWatcher(settings) {
        this.losingChangesWatcher = new LosingChangesWatcher(settings.enabled ?
            () => this.core.getModifiedState() == IsModified.True :
            () => false, settings.message);
    }
    attachEvents() {
        if (this.canUseResizeObserver() && window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.target === this.element && !this.isInFullScreenMode)
                        this.adjustControl();
                }
            });
            this.resizeObserver.observe(this.element);
            this.evtHandlersHolder.addListenerToWindow('resize', () => {
                if (this.isInFullScreenMode)
                    this.adjustControlInFullScreenMode();
            });
        }
        else {
            this.evtHandlersHolder.addListenerToWindow('resize', () => {
                if (this.isInFullScreenMode)
                    this.adjustControlInFullScreenMode();
                else
                    this.adjustControl();
            });
        }
        this.evtHandlersHolder.addListenerToDocument('fullscreenchange', () => this.onFullScreenChange(document));
        this.evtHandlersHolder.addListenerToDocument('webkitfullscreenchange', () => this.onFullScreenChange(document));
        this.evtHandlersHolder.addListenerToDocument('mozfullscreenchange', () => this.onFullScreenChange(document));
        this.evtHandlersHolder.addListenerToDocument('msfullscreenchange', () => this.onFullScreenChange(document));
    }
    canUseResizeObserver() {
        return !Browser.IE && ((Browser.Chrome && Browser.Version >= 64) ||
            (Browser.Edge && Browser.Version >= 79) ||
            (Browser.Firefox && ((Browser.AndroidMobilePlatform && Browser.Version >= 79) || (!Browser.AndroidMobilePlatform && Browser.Version >= 69))) ||
            (Browser.Opera && ((Browser.AndroidMobilePlatform && Browser.Version >= 47) || (!Browser.AndroidMobilePlatform && Browser.Version >= 51))) ||
            (Browser.Safari && ((Browser.MacOSMobilePlatform && Browser.Version >= 13.4) || (!Browser.MacOSMobilePlatform && Browser.Version >= 13.1))));
    }
    syncSessionGuid(_sessionGuid) { }
    sendRequest(_content, _viaInternalCallback) { }
    canCaptureFocus() { return true; }
    Focus() {
        this.core.focusManager.captureFocus();
    }
    adjustControl() {
        if (this.core) {
            const ribbonBar = this.barHolder.ribbon;
            let ribbonHeight = 0;
            if (ribbonBar) {
                ribbonHeight = ribbonBar.getHeight();
                ribbonBar.adjustControl();
            }
            this.core.horizontalRulerControl.adjust();
            const rulerHeight = this.core.horizontalRulerControl.getHeight();
            this.core.viewManager.canvas.style.height = this.element.clientHeight - rulerHeight - ribbonHeight + "px";
            this.core.viewManager.adjust(true);
        }
    }
    toggleFullScreenMode() {
        this.isInFullScreenMode = !this.isInFullScreenMode;
        if (this.isInFullScreenMode)
            this.setFullScreenMode();
        else
            this.setNormalMode();
        const ribbonBar = this.barHolder.ribbon;
        if (ribbonBar)
            ribbonBar.adjustControl();
    }
    sendDownloadRequest(_downloadRequestType, _parameters) { }
    confirmOnLosingChanges() {
        return this.losingChangesWatcher.confirm();
    }
    sendExportRequest(base64, fileName, format, reason) {
        if (this.exportUrl) {
            base64 = EncodeUtils.prepareTextForRequest(base64);
            fileName = EncodeUtils.prepareTextForRequest(fileName);
            reason = EncodeUtils.prepareTextForRequest(reason);
            const postdata = `base64=${base64}&fileName=${fileName}&format=${format}&reason=${reason}`;
            this.sendPostRequest(this.exportUrl, postdata, () => {
                this.documentSaved = true;
                this.raiseSaved(true, reason);
            }, () => this.raiseSaved(false, reason));
        }
    }
    get documentSaved() {
        return this.core.lastSavedHistoryItemId === this.core.modelManager.history.getCurrentItemId();
    }
    set documentSaved(state) {
        if (state) {
            this.core.lastSavedHistoryItemId = this.core.modelManager.history.getCurrentItemId();
            this.core.barHolder.updateItemsState({ [RichEditClientCommand.ExportDocument]: true });
        }
        else {
            if (this.core.lastSavedHistoryItemId == this.core.modelManager.history.getCurrentItemId()) {
                this.core.lastSavedHistoryItemId = this.core.modelManager.history.getCurrentItemId() - 1;
                this.core.barHolder.updateItemsState({ [RichEditClientCommand.ExportDocument]: true });
            }
        }
    }
    sendExportPdfRequest(base64, fileName, pdfExportUrl) {
        base64 = EncodeUtils.prepareTextForRequest(base64);
        fileName = EncodeUtils.prepareTextForRequest(fileName);
        const postdata = `base64=${base64}&fileName=${fileName}`;
        this.sendPostRequest(pdfExportUrl, postdata, () => this.raisePdfExported(true), () => this.raisePdfExported(false));
    }
    sendPostRequest(url, postdata, onSuccess, onError) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", url, true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200)
                    onSuccess();
                else
                    onError();
            }
        };
        xmlHttp.onerror = onError;
        xmlHttp.send(postdata);
    }
    showDialog(name, parameters, callback, afterClosing, isModal) {
        const dialog = this.dialogManager.getDialog(name);
        if (dialog != null)
            dialog.show(parameters, callback, afterClosing, isModal);
        else
            console.log(`Dialog '${name}' not found`);
    }
    raiseBeginSynchronization() { }
    raiseDocumentLoaded() {
        if (this.allowDocumentLoadedEventCall)
            this.events.documentLoaded._fireEvent(this.publicRichEdit, new EventArgs());
    }
    raiseDocumentChanged() {
        this.events.documentChanged._fireEvent(this.publicRichEdit, new EventArgs());
    }
    raiseDocumentFormatted(pageCount) {
        this.events.documentFormatted._fireEvent(this.publicRichEdit, new DocumentFormattedEventArgs(pageCount));
    }
    raiseActiveSubDocumentChanged() {
        this.events.activeSubDocumentChanged._fireEvent(this.publicRichEdit, new EventArgs());
    }
    onCaptureFocus() {
        if (this.barHolder.ribbon)
            this.barHolder.ribbon.closeActiveItem();
    }
    raiseGotFocus() {
        if (this.publicRichEdit.nusaSettings.registered)
            window.NUSA_customContainerFocussed(this.element);
        this.events.gotFocus._fireEvent(this.publicRichEdit, new EventArgs());
    }
    raiseLostFocus() {
        this.events.lostFocus._fireEvent(this.publicRichEdit, new EventArgs());
    }
    raiseHyperlinkClick(evt, field) {
        let handled = false;
        const hyperlinkInfo = field.getHyperlinkInfo();
        if (hyperlinkInfo) {
            const url = hyperlinkInfo.uri || hyperlinkInfo.anchor;
            const hyperlinkType = this.getLinkType(hyperlinkInfo);
            const args = new HyperlinkClickEventArgs(evt, handled, url, hyperlinkType, new HyperlinkApi(this.core, this.core.selection.activeSubDocument, field));
            this.events.hyperlinkClick._fireEvent(this.publicRichEdit, args);
            handled = args.handled;
        }
        return handled;
    }
    raisePointerDown(evt) {
        let handled = false;
        if (!this.events.pointerDown.isEmpty()) {
            const args = new PointerEventArgs(evt);
            this.events.pointerDown._fireEvent(this.publicRichEdit, args);
            handled = args.handled;
        }
        return handled;
    }
    raisePointerUp(evt) {
        let handled = false;
        if (!this.events.pointerUp.isEmpty()) {
            const args = new PointerEventArgs(evt);
            this.events.pointerUp._fireEvent(this.publicRichEdit, args);
            handled = args.handled;
        }
        return handled;
    }
    raiseKeyDown(evt) {
        let handled = false;
        if (!this.events.keyDown.isEmpty()) {
            const args = new KeyboardEventArgs(evt);
            this.events.keyDown._fireEvent(this.publicRichEdit, args);
            handled = args.handled;
        }
        return handled;
    }
    raiseKeyUp(evt) {
        const args = new KeyboardEventArgs(evt);
        this.events.keyUp._fireEvent(this.publicRichEdit, args);
    }
    raiseCalculateDocumentVariable(args) {
        this.events.calculateDocumentVariable._fireEvent(this.publicRichEdit, args);
    }
    raiseContentInserted(subDocumentId, interval) {
        const args = new ContentChangedEventArgs(subDocumentId, new Interval(interval.start, interval.length));
        this.events.contentInserted._fireEvent(this.publicRichEdit, args);
    }
    raiseContentRemoved(subDocumentId, interval, removedText) {
        const args = new ContentRemovedEventArgs(subDocumentId, new Interval(interval.start, interval.length), removedText);
        this.events.contentRemoved._fireEvent(this.publicRichEdit, args);
    }
    raiseCharacterPropertiesChanged(subDocumentId, interval) {
        const args = new ContentChangedEventArgs(subDocumentId, new Interval(interval.start, interval.length));
        this.events.characterPropertiesChanged._fireEvent(this.publicRichEdit, args);
    }
    raiseParagraphPropertiesChanged(subDocumentId, paragraphIndex) {
        const args = new ParagraphPropertiesChangedEventArgs(subDocumentId, paragraphIndex);
        this.events.paragraphPropertiesChanged._fireEvent(this.publicRichEdit, args);
    }
    raiseAutoCorrect(text, interval) {
        let handled = false;
        if (!this.events.autoCorrect.isEmpty()) {
            let args = new AutoCorrectEventArgs(text, new Interval(interval.start, interval.length));
            this.events.autoCorrect._fireEvent(this.publicRichEdit, args);
            handled = args.handled;
        }
        return handled;
    }
    raiseSelectionChanged() {
        this.events.selectionChanged._fireEvent(this.publicRichEdit, new EventArgs());
    }
    raiseSaving(base64, fileName, format, reason) {
        let handled = false;
        if (!this.events.saving.isEmpty()) {
            const args = new SavingEventArgs(base64, fileName, format, reason);
            this.events.saving._fireEvent(this.publicRichEdit, args);
            handled = args.handled;
        }
        if (handled)
            this.documentSaved = true;
        return handled;
    }
    raiseSaved(success, reason) {
        const args = new SavedEventArgs(success, reason);
        this.events.saved._fireEvent(this.publicRichEdit, args);
    }
    raiseCustomCommandExecuted(command, parameter) {
        const args = new CustomCommandExecutedEventArgs(command, parameter);
        this.events.customCommandExecuted._fireEvent(this.publicRichEdit, args);
    }
    raiseFloatingObjectMovedObject(_arg) {
    }
    raisePdfExported(success) {
        const args = new PdfExportedEventArgs(success);
        this.events.pdfExported._fireEvent(this.publicRichEdit, args);
    }
    raisePdfExporting(base64, blob, blobStream, handled) {
        const args = new PdfExportingEventArgs(base64, blob, blobStream, handled);
        this.events.pdfExporting._fireEvent(this.publicRichEdit, args);
        return args.handled;
    }
    raiseCommandStateChanged(commands) {
        const args = new CommandStateChangedEventArgs(commands);
        this.events.commandStateChanged._fireEvent(this.publicRichEdit, args);
    }
    raiseCalculateDocumentVariableAsync(args) {
        this.events.calculateDocumentVariableAsync._fireEvent(this.publicRichEdit, args);
    }
    useAsyncVersionOfCalculateDocvariable() {
        return !this.events.calculateDocumentVariableAsync.isEmpty();
    }
    raiseContextMenuShowing(args) {
        this.events.contextMenuShowing._fireEvent(this.publicRichEdit, args);
    }
    showPopupMenu(getPoint) {
        this.barHolder.contextMenu.show(getPoint);
    }
    hidePopupMenu() {
        this.barHolder.contextMenu.hide();
    }
    showQuickSearchPanel() {
        this.clientQuickSearchPanel.show();
    }
    hideQuickSearchPanel() {
        this.clientQuickSearchPanel.hide(true);
    }
    isRibbon(element) {
        const ribbon = this.barHolder.ribbon;
        return ribbon ? ribbon.containsChild(element) : false;
    }
    isTouchMode() { return false; }
    getChildElement(postfix) {
        if (postfix.charAt(0) !== "_")
            postfix = "_" + postfix;
        return this.element.querySelector('#' + this.name + postfix);
    }
    getMainElement() {
        return this.element;
    }
    hasActiveDialog() {
        return false;
    }
    getContextMenuBar() {
        return this.barHolder.contextMenu;
    }
    getRibbonBar() {
        return this.barHolder.ribbon;
    }
    getLinkType(hyperlinkInfo) {
        if (hyperlinkInfo.anchor)
            return DocumentLinkType.Bookmark;
        if (hyperlinkInfo.uri && hyperlinkInfo.uri.substr(0, 7) === "mailto:")
            return DocumentLinkType.EmailAddress;
        return DocumentLinkType.Hyperlink;
    }
    setFullScreenMode() {
        this.fullScreenHelper.prepareFullScreenMode();
        this.adjustControlInFullScreenMode();
    }
    setNormalMode() {
        this.fullScreenHelper.setNormalMode();
        this.adjustControl();
    }
    onFullScreenChange(document) {
        if (this.isInFullScreenMode && this.documentIsNotFullScreen(document))
            this.core.commandManager.getCommand(RichEditClientCommand.FullScreen).execute(this.core.commandManager.isPublicApiCall);
    }
    documentIsNotFullScreen(document) {
        return document.webkitIsFullScreen === false || document.mozFullScreen === false || (Browser.IE && !window.screenTop && !window.screenY);
    }
    adjustControlInFullScreenMode() {
        const documentWidth = document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
        const documentHeight = document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
        this.fullScreenHelper.setWidth(documentWidth);
        this.fullScreenHelper.setHeight(documentHeight);
        this.adjustControl();
    }
    savingEventIsEmpty() {
        return this.events.saving.isEmpty();
    }
}
