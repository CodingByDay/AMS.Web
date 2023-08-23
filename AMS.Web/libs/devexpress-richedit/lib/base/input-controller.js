import { LayoutPositionCreatorConflictFlags, LayoutPositionMainSubDocumentCreator, LayoutPositionOtherSubDocumentCreator } from '../core/layout-engine/layout-position-creator';
import { DocumentLayoutDetailsLevel } from '../core/layout/document-layout-details-level';
import { LayoutPoint } from '../core/layout/layout-point';
import { RangeCopy } from '../core/model/manipulators/range/create-range-copy-operation';
import { ControlOptions } from '../core/model/options/control';
import { ParagraphAlignment } from '../core/model/paragraph/paragraph-properties';
import { RichUtils } from '../core/model/rich-utils';
import { HtmlConverter } from '../core/rich-utils/html-converter';
import { Browser } from '@devexpress/utils/lib/browser';
import { DomEventHandlersHolder } from '@devexpress/utils/lib/class/event-handlers-holder';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { EvtUtils } from '@devexpress/utils/lib/utils/evt';
import { KeyCode, KeyUtils, ModifierKey } from '@devexpress/utils/lib/utils/key';
import { PopupUtils } from '@devexpress/utils/lib/utils/popup';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { ClipboardContentInserter } from './clipboard-content-inserter';
import { RichEditClientCommand } from './commands/client-command';
import { HtmlBuilder, HtmlExporter } from './html-export';
import { ReadOnlyMode } from './interfaces/i-rich-edit-core';
export const INPUT_CLASS_NAME = "dxreInputTarget";
const EMPTY_KEYCODE = 229;
const TAB_KEYCODE = 9;
const IDEOGRAPHIC_SPACE_CHARCODE = 12288;
export class InputEditorBase {
    constructor(control, eventManager, parent) {
        this.evtHandlersHolder = new DomEventHandlersHolder();
        this.control = control;
        this.eventManager = eventManager;
        this.canInsertTextOnInputEvent = this.canUseInputEvent();
        this.createHierarchy(parent);
        this.initialize();
        this.isIME = false;
        this.inputWithAlt = false;
    }
    dispose() {
        this.evtHandlersHolder.removeAllListeners();
        clearTimeout(this.keyPressTimerId);
        clearTimeout(this.imeTimerId);
        clearTimeout(this.onInputTimerId);
        clearTimeout(this.onBlurTimerId);
        clearTimeout(this.onKeyUpTimerId);
    }
    initialize() {
        this.initializeIfNotReadOnly();
        this.initEvents();
        this.prevKeyCode = EMPTY_KEYCODE;
    }
    initializeIfNotReadOnly() {
        if ((this.control.readOnly !== ReadOnlyMode.Persistent || this.control.modelManager.clientMode) && !this.initializedIfNotReadOnly) {
            this.initializedIfNotReadOnly = true;
            this.initializeIfNotReadOnlyCore();
        }
    }
    initializeIfNotReadOnlyCore() {
    }
    initEvents() {
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "keydown", this.onKeyDown.bind(this));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "keyup", (evt) => this.onKeyUpTimerId = setTimeout(() => this.onKeyUp(evt), 0));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "keypress", this.onKeyPress.bind(this));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "focus", this.onFocus.bind(this));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "blur", (evt) => this.onBlurTimerId = setTimeout(() => this.onBlur(evt), 10));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "contextmenu", this.onContextMenu.bind(this));
        if (this.canInsertTextOnInputEvent)
            this.evtHandlersHolder.addListener(this.getEditableDocument(), "input", (evt) => this.onInput(evt));
    }
    createHierarchy(parent) {
        this.inputElement = this.createInputElement();
        this.inputElement.classList.add(INPUT_CLASS_NAME);
        parent.appendChild(this.inputElement);
        this.createHierarchyCore();
        this.inputElement.addEventListener("load", () => this.recreateIfNeeded(), true);
    }
    createHierarchyCore() { }
    createInputElement() {
        return null;
    }
    onInput(evt) {
        if (this.canInsertTextOnInputEvent)
            this.onInputTimerId = setTimeout(() => this.onTextInput(evt.data), 0);
    }
    onBlur(_evt) {
        const targetElement = document.activeElement;
        if (!targetElement || !this.control.isRibbon(targetElement) || DomUtils.isInteractiveControl(targetElement))
            this.eventManager.onFocusOut();
        this.clearInputElement();
    }
    onFocus() {
        this.selectEditableDocumentContent();
        this.eventManager.onFocusIn();
    }
    onKeyDown(evt) {
        if (!this.control.clientSideEvents.raiseKeyDown(evt)) {
            if (!this.isIME) {
                evt = this.getNormalizedEvent(evt);
                const keyCode = KeyUtils.getEventKeyCode(evt);
                this.needProcessShortcut = !keyCode || keyCode == EMPTY_KEYCODE;
                this.canInsertTextOnInputEvent = this.canUseInputEvent();
                if (evt.altKey || evt.ctrlKey || evt.metaKey)
                    this.canInsertTextOnInputEvent = false;
                if (evt.altKey)
                    if (keyCode >= KeyCode.Numpad_0 && keyCode <= KeyCode.Numpad_9)
                        this.inputWithAlt = true;
                    else if (keyCode != 18)
                        this.inputWithAlt = false;
                if (!this.needProcessShortcut) {
                    let isShortcut = this.isProcessShortcut(keyCode) && this.onShortcut(evt);
                    if (isShortcut || (keyCode === TAB_KEYCODE && !this.control.modelManager.richOptions.control.acceptsTab)) {
                        this.prevKeyCode = keyCode;
                        return;
                    }
                }
                if (!this.canInsertTextOnInputEvent && !this.control.isTouchMode())
                    this.imeTimerId = setTimeout(() => {
                        if (!this.isIME)
                            this.onTextInput(undefined);
                    }, 0);
                this.prevKeyCode = keyCode;
            }
        }
        else
            EvtUtils.preventEvent(evt);
    }
    isProcessShortcut(keyCode) {
        return !(keyCode == KeyCode.Space && this.prevKeyCode == KeyCode.SingleQuote && !Browser.MacOSPlatform);
    }
    onKeyUp(evt) {
        this.control.clientSideEvents.raiseKeyUp(evt);
        if (this.needProcessShortcut) {
            this.onShortcut(evt);
        }
    }
    onKeyPress(evt) {
        if (!evt.altKey) {
            if (this.inputWithAlt)
                this.keyPressTimerId = setTimeout(() => this.onTextInput(undefined), 0);
            this.inputWithAlt = false;
        }
    }
    onContextMenu(evt) {
        PopupUtils.preventContextMenu(evt);
        evt.preventDefault();
        this.control.popupMenuManager.showByKey();
    }
    onShortcut(evt) {
        const shortcutCode = this.getShortcutCode(evt);
        if (!this.control.shortcutManager.isKnownShortcut(shortcutCode))
            return false;
        this.onShortcutCore(evt, shortcutCode);
        return true;
    }
    onShortcutCore(evt, shortcutCode) {
        if (!Browser.WebKitTouchUI)
            this.clearInputElement();
        this.selectEditableDocumentContent();
        if (!this.control.shortcutManager.isClipboardCommandShortcut(shortcutCode) && !Browser.MacOSMobilePlatform)
            EvtUtils.preventEvent(evt);
        this.eventManager.onShortcut(shortcutCode);
    }
    onText(text, currentText, isUpdated) {
        if (!this.canInsertTextOnInputEvent)
            this.needProcessShortcut = false;
        this.eventManager.onText(text, isUpdated);
        this.previousText = currentText;
    }
    onTextReplace(_text, currentText) {
        this.previousText = currentText;
    }
    onTextInput(_data) {
        const text = this.getEditableDocumentText();
        if (text) {
            if (this.previousText) {
                const previousText = this.previousText;
                const previousTextLastIndex = previousText.length - 1;
                if (text[previousTextLastIndex] && text[previousTextLastIndex] != previousText[previousTextLastIndex])
                    this.onText(text[previousTextLastIndex], text, true);
                const insertedCharacterCount = text.length - previousText.length;
                if (insertedCharacterCount > 0) {
                    for (let i = text.length - insertedCharacterCount; i < text.length; i++)
                        this.onText(text[i], text, false);
                }
            }
            else
                this.onText(text, text, false);
        }
    }
    tryObtainCodeFromChar(char) {
        if (char == "\n")
            return KeyCode.Enter;
        return EMPTY_KEYCODE;
    }
    captureFocus() {
    }
    canUseInputEvent() {
        return Browser.Firefox && Browser.MajorVersion >= 14 || Browser.WebKitTouchUI;
    }
    getEditableDocumentText() {
        return DomUtils.getInnerText(this.getEditableTextOwner()).replace(/(\r\n|\n|\r)/gm, "");
    }
    getEditableTextOwner() {
        return null;
    }
    setPosition(left, top) {
        this.inputElement.style.left = left + "px";
        this.inputElement.style.top = top + "px";
    }
    clearInputElement() {
        this.previousText = "";
    }
    setEditableDocumentContent(_content) {
        this.previousText = "";
    }
    setEditableDocumentCursorPosition(_cursorPosition) { }
    selectEditableDocumentContent() {
        this.control.barHolder.updateItemsState({
            [RichEditClientCommand.CopySelection]: true,
            [RichEditClientCommand.PasteSelection]: true,
            [RichEditClientCommand.CutSelection]: true,
        });
    }
    getEditableDocumentContent() {
        return "";
    }
    getNormalizedEvent(evt) {
        if (Browser.IE && Browser.MajorVersion < 9) {
            const eventCopy = {};
            for (let i in evt)
                eventCopy[i] = evt[i];
            return eventCopy;
        }
        return evt;
    }
    recreateIfNeeded() { }
    getShortcutCode(evt) {
        const keyCode = KeyUtils.getEventKeyCode(evt);
        let modifiers = 0;
        if (evt.altKey)
            modifiers |= ModifierKey.Alt;
        if (evt.ctrlKey)
            modifiers |= ModifierKey.Ctrl;
        if (evt.shiftKey)
            modifiers |= ModifierKey.Shift;
        if (evt.metaKey && Browser.MacOSPlatform)
            modifiers |= ModifierKey.Meta;
        return modifiers | keyCode;
    }
}
export class DivInputEditor extends InputEditorBase {
    constructor(control, eventManager, parent) {
        super(control, eventManager, parent);
    }
    dispose() {
        super.dispose();
        clearTimeout(this.clearInputTimerId);
    }
    initializeIfNotReadOnlyCore() {
        this.inputElement.contentEditable = "true";
        this.clearInputElement();
    }
    setPosition(left, top) {
        super.setPosition(left, top);
    }
    createInputElement() {
        const element = document.createElement("DIV");
        if (Browser.Safari)
            element.autocapitalize = "off";
        if (Browser.MacOSMobilePlatform && (Number(Browser.PlaformMajorVersion) >= 16
            || Browser.Safari && Browser.MajorVersion >= 16)) {
            element.classList.add('dxreiOS16');
        }
        return element;
    }
    onKeyDown(evt) {
        this.handled = false;
        if (!window.getSelection().anchorNode) {
            if (this.getEditableDocumentContent().length)
                this.setEditableDocumentCursorPosition(this.lastCursorPosition);
            else
                this.selectEditableDocumentContent();
        }
        super.onKeyDown(evt);
        this.canSkipInputEvent = true;
    }
    onKeyUp(evt) {
        super.onKeyUp(evt);
        this.control.owner.hidePopupMenu();
        this.onTextInput(undefined);
        this.lastCursorPosition = window.getSelection().anchorOffset;
    }
    onInput(evt) {
        if (!this.canSkipInputEvent) {
            this.handled = false;
            super.onInput(evt);
        }
        this.control.owner.hidePopupMenu();
        this.canSkipInputEvent = false;
    }
    onFocus() {
        if (!this.canSkipFocusAndBlur)
            super.onFocus();
        this.canSkipFocusAndBlur = false;
    }
    onBlur(evt) {
        if (!this.canSkipFocusAndBlur)
            super.onBlur(evt);
    }
    onShortcutCore(evt, shortcutCode) {
        if (shortcutCode !== KeyCode.Space || !Browser.MacOSMobilePlatform) {
            this.handled = true;
            this.clearInputTimerId = setTimeout(() => this.clearInputElement(), 0);
            super.onShortcutCore(evt, shortcutCode);
        }
    }
    onTextReplace(text, currentText) {
        this.eventManager.onTextReplace(text);
        super.onTextReplace(text, currentText);
    }
    onTextInput(data) {
        let text = this.getEditableDocumentText();
        if (!this.handled) {
            const isShortcutHandled = Browser.AndroidMobilePlatform && this.needProcessShortcut && this.tryHandleShortcutByInputString(data);
            if (!isShortcutHandled) {
                let isTextReplaced = !this.cursorWasSetOnLastPosition && this.getEditableDocumentCursorPosition() === this.getEditableDocumentFullText().length;
                let lastWordStartIndex = 0;
                if (!isTextReplaced && this.previousText) {
                    let previousText = this.previousText;
                    let lastSpaceIndex = previousText.lastIndexOf(" ");
                    if (lastSpaceIndex >= 0)
                        lastWordStartIndex = lastSpaceIndex + 1;
                    let lengthToReplaceCheck = (text.length > previousText.length ? previousText.length : text.length) - lastWordStartIndex - 1;
                    let currentWordPart = text.substr(lastWordStartIndex, lengthToReplaceCheck);
                    let previousWordPart = previousText.substr(lastWordStartIndex, lengthToReplaceCheck);
                    if (currentWordPart !== previousWordPart)
                        isTextReplaced = true;
                }
                if (isTextReplaced)
                    this.onTextReplace(text.substr(lastWordStartIndex), text);
                else
                    super.onTextInput(data);
                if (this.previousText && text.length < this.previousText.length || !text.length) {
                    let deletedCharacterCount = this.previousText ? this.previousText.length - text.length : 1;
                    for (let i = 0; i < deletedCharacterCount; i++)
                        this.eventManager.onShortcut(KeyCode.Backspace);
                    this.previousText = text;
                }
                this.cursorWasSetOnLastPosition = true;
            }
            this.handled = true;
            if (Browser.MacOSMobilePlatform && text[text.length - 1] == " ")
                this.clearInputElement();
        }
    }
    tryHandleShortcutByInputString(data) {
        if (data && !this.isIME) {
            let enteredChar = data.charAt(data.length - 1);
            const keyCode = this.tryObtainCodeFromChar(enteredChar);
            if (keyCode != EMPTY_KEYCODE) {
                if (this.isProcessShortcut(keyCode) && this.control.shortcutManager.isKnownShortcut(keyCode)) {
                    this.eventManager.onShortcut(keyCode);
                    if (keyCode !== KeyCode.Space || !Browser.MacOSMobilePlatform)
                        this.clearInputElement();
                    return true;
                }
            }
        }
        return false;
    }
    getEditableTextOwner() {
        return this.inputElement;
    }
    captureFocus() {
        this.inputElement.focus();
    }
    getEditableDocument() {
        return this.inputElement;
    }
    clearInputElement() {
        super.clearInputElement();
        DomUtils.clearInnerHtml(this.inputElement);
        this.cursorWasSetOnLastPosition = true;
    }
    setEditableDocumentContent(content) {
        if (typeof content === "string")
            this.inputElement.innerHTML = content;
        else if (content) {
            this.inputElement.innerHTML = "";
            for (let i = 0; i < content.length; i++)
                this.inputElement.appendChild(content[i]);
        }
        else
            this.clearInputElement();
    }
    setEditableDocumentCursorPosition(cursorPosition) {
        let textLength = this.getEditableDocumentFullText().length;
        if (cursorPosition > textLength)
            cursorPosition = textLength;
        if (this.inputElement.childNodes.length > 0) {
            let range = document.createRange();
            let selection = window.getSelection();
            let lastChild = this.inputElement.childNodes[this.inputElement.childNodes.length - 1];
            if (cursorPosition <= lastChild.textContent.length) {
                range.setStart(lastChild, cursorPosition);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                this.previousText = this.getEditableDocumentText();
                this.cursorWasSetOnLastPosition = cursorPosition === textLength;
            }
        }
    }
    getEditableDocumentText() {
        return this.getEditableDocumentFullText().substring(0, this.getEditableDocumentCursorPosition());
    }
    getEditableDocumentFullText() {
        return super.getEditableDocumentText().replace(/\s/g, " ");
    }
    getEditableDocumentContent() {
        return this.inputElement.cloneNode(true).children;
    }
    getEditableDocumentCursorPosition() {
        let selection = window.getSelection();
        let cursorPosition = selection.focusOffset;
        if (Browser.MacOSMobilePlatform) {
            let fullText = this.getEditableDocumentFullText();
            if (fullText[fullText.length - 1] === " " && fullText.length > 1)
                cursorPosition++;
        }
        return cursorPosition;
    }
    selectEditableDocumentContent() {
        const selection = window.getSelection();
        let firstChildNode = null;
        if (this.inputElement.childNodes.length) {
            firstChildNode = this.inputElement.childNodes[0];
            if (!firstChildNode.childNodes.length)
                return;
        }
        selection.removeAllRanges();
        selection.selectAllChildren(this.inputElement);
        super.selectEditableDocumentContent();
    }
}
export class IFrameInputEditor extends InputEditorBase {
    constructor(control, eventManager, parent) {
        super(control, eventManager, parent);
    }
    dispose() {
        super.dispose();
        clearTimeout(this.onTextInputTimerId);
        clearTimeout(this.composUpdateTimerId);
        clearTimeout(this.composEndTimerId);
    }
    createHierarchyCore() {
        let frameHtml = "<!DOCTYPE html>";
        frameHtml += "<html>";
        frameHtml += "<head>";
        frameHtml += "</head>";
        frameHtml += "<body loaded=\"true\">";
        frameHtml += "</body>";
        frameHtml += "</html>";
        this.editableDocument = this.inputElement.contentDocument || this.inputElement.contentWindow.document;
        if (Browser.Firefox) {
            this.editableDocument.open();
            this.editableDocument.write(frameHtml);
            this.editableDocument.close();
        }
        else
            this.editableDocument.documentElement.innerHTML = frameHtml;
        const body = this.editableDocument.documentElement.querySelector('body');
        body.style.padding = "0px";
        body.style.margin = "0px";
        body.style.overflow = "hidden";
    }
    initializeIfNotReadOnlyCore() {
        if (Browser.WebKitFamily)
            this.editableDocument.body.setAttribute("contenteditable", "true");
        else
            this.editableDocument.designMode = "on";
    }
    createInputElement() {
        const element = document.createElement("IFRAME");
        element.src = "about:blank";
        if (Browser.Safari) {
            element.style.width = "100%";
            element.style.minWidth = "100%";
            element.style.overflow = "hidden";
        }
        return element;
    }
    initEvents() {
        super.initEvents();
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "compositionstart", this.onCompositionStart.bind(this));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "compositionupdate", (evt) => Browser.IE || Browser.Edge ?
            this.onCompositionUpdate(evt) : this.composUpdateTimerId = setTimeout(() => this.onCompositionUpdate(evt), 0));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "compositionend", (evt) => !Browser.Safari ?
            this.onCompositionEnd(evt) : this.composEndTimerId = setTimeout(() => this.onCompositionEnd(evt), 0));
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "copy", (evt) => {
            if (!ControlOptions.isEnabled(this.control.modelManager.richOptions.control.copy))
                return EvtUtils.preventEvent(evt);
            else
                this.control.commandManager.getCommand(RichEditClientCommand.CopySelection).copyEventRaised();
        });
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "cut", (evt) => {
            if (!this.isModifyEnabled(this.control.modelManager.richOptions.control.cut))
                return EvtUtils.preventEvent(evt);
        });
        this.evtHandlersHolder.addListener(this.getEditableDocument(), "paste", (evt) => {
            if (!this.isModifyEnabled(this.control.modelManager.richOptions.control.paste) || this.control.isClosed())
                return EvtUtils.preventEvent(evt);
            if (evt && evt.clipboardData && evt.clipboardData.items) {
                const clipboardContentInserter = new ClipboardContentInserter(this.control);
                const success = clipboardContentInserter.insert(evt);
                if (success)
                    return;
            }
            this.control.commandManager.getCommand(RichEditClientCommand.PasteSelection).pasteEventRaised();
        });
    }
    isModifyEnabled(capability) {
        const selection = this.control.selection;
        return ControlOptions.isEnabled(capability) && this.control.readOnly != ReadOnlyMode.Persistent && selection.activeSubDocument.isEditable(selection.intervals);
    }
    captureFocus() {
        if ((Browser.Opera && Browser.MajorVersion <= 12) ||
            Browser.Chrome && this.inputElement === document.activeElement ||
            ((Browser.IE || Browser.Edge) && this.control.readOnly == ReadOnlyMode.Persistent) ||
            Browser.Firefox)
            this.inputElement.contentWindow.focus();
        else
            DomUtils.setFocus(this.control.readOnly == ReadOnlyMode.Persistent ? this.inputElement : this.editableDocument.body);
    }
    setPosition(left, top) {
        super.setPosition(left, top);
        if (left && top)
            this.selectEditableDocumentContent();
    }
    clearInputElement() {
        if (this.previousText != this.getEditableDocumentText())
            super.onTextInput("");
        super.clearInputElement();
        DomUtils.clearInnerHtml(this.editableDocument.body);
    }
    setEditableDocumentContent(content) {
        super.setEditableDocumentContent(content);
        this.isIME = false;
        this.editableDocument.body.innerHTML = "";
        if (typeof content === "string")
            this.editableDocument.body.innerHTML = content;
        else if (content) {
            for (let i = 0; i < content.length; i++) {
                this.editableDocument.body.appendChild(content[i]);
            }
        }
    }
    getEditableDocumentContent() {
        return this.editableDocument.body.cloneNode(true).children;
    }
    selectEditableDocumentContent() {
        const firstChildNode = this.editableDocument.body.childNodes[0];
        if (firstChildNode && !firstChildNode.childNodes.length && !(firstChildNode.nodeType === 3 && firstChildNode.nodeValue === ""))
            return;
        const selection = this.editableDocument.getSelection ? this.editableDocument.getSelection() : this.editableDocument["selection"];
        if (selection) {
            if (selection.removeAllRanges)
                selection.removeAllRanges();
            else if (selection.empty)
                selection.empty();
            if (selection.selectAllChildren)
                selection.selectAllChildren(this.editableDocument.body);
            else if (selection.createRange) {
                const range = selection.createRange();
                try {
                    range.moveToElementText(this.editableDocument.body);
                }
                catch (e) { }
                range.select();
            }
        }
        super.selectEditableDocumentContent();
    }
    getEditableDocument() {
        return this.editableDocument;
    }
    getEditableTextOwner() {
        return this.editableDocument.body;
    }
    onBlur(evt) {
        super.onBlur(evt);
        this.isIME = false;
        this.endInputIME();
    }
    onShortcutCore(evt, shortcutCode) {
        const prevSelectedInterval = this.control.selection.lastSelectedInterval;
        super.onShortcutCore(evt, shortcutCode);
        if (this.control.selection.lastSelectedInterval != prevSelectedInterval)
            this.selectEditableDocumentContent();
    }
    onTextInput(data) {
        this.onTextInputTimerId = setTimeout(() => {
            const editableDocumentText = this.getEditableDocumentText();
            if (editableDocumentText.charCodeAt(0) == IDEOGRAPHIC_SPACE_CHARCODE || StringUtils.trim(editableDocumentText))
                super.onTextInput(data);
        }, 0);
    }
    onTextReplace(text, currentText) {
        this.eventManager.onTextReplace(text, this.previousText.length);
        super.onTextReplace(text, currentText);
    }
    recreateIfNeeded() {
        const iframeDocument = this.inputElement.contentDocument || this.inputElement.contentWindow.document;
        if (!iframeDocument.body.hasAttribute("loaded")) {
            this.initializedIfNotReadOnly = false;
            this.createHierarchyCore();
            this.initialize();
        }
    }
    onCompositionStart(_evt) {
        this.isIME = true;
        this.needProcessShortcut = false;
        if (!Browser.IE && !Browser.Edge)
            this.clearInputElement();
        this.startInputIME();
    }
    onCompositionUpdate(_evt) {
        const text = this.getEditableDocumentText();
        if (this.isIME && text.length && this.previousText != text) {
            this.onTextReplace(text, text);
            this.updateInputIME();
        }
    }
    onCompositionEnd(_evt) {
        const text = this.getEditableDocumentText();
        if (text.length && this.previousText != text)
            this.onTextReplace(text, text);
        else if (!Browser.Edge)
            this.clearInputElement();
        if (text.charCodeAt(text.length - 1) == IDEOGRAPHIC_SPACE_CHARCODE)
            this.clearInputElement();
        this.isIME = false;
        this.endInputIME();
    }
    startInputIME() {
        this.inputElement.style.position = "absolute";
        const lastSelectedIntervalStartPosition = this.control.selection.lastSelectedInterval.start;
        const subDocument = this.control.selection.activeSubDocument;
        const layoutPosition = subDocument.isMain() ?
            new LayoutPositionMainSubDocumentCreator(this.control.selection.layout, subDocument, lastSelectedIntervalStartPosition, DocumentLayoutDetailsLevel.Character)
                .create(new LayoutPositionCreatorConflictFlags().setDefault(false), new LayoutPositionCreatorConflictFlags().setDefault(true)) :
            new LayoutPositionOtherSubDocumentCreator(this.control.selection.layout, subDocument, lastSelectedIntervalStartPosition, this.control.selection.pageIndex, DocumentLayoutDetailsLevel.Box)
                .create(new LayoutPositionCreatorConflictFlags().setDefault(false), new LayoutPositionCreatorConflictFlags().setDefault(true));
        if (!layoutPosition)
            return null;
        const currentTextIndent = this.editableDocument.body.style.textIndent;
        const propChar = HtmlConverter.getSizeSignificantRules(this.control.inputPosition.getMergedCharacterPropertiesRaw()).join(";");
        this.editableDocument.body.style.cssText = "padding: 0px; margin: 0px; overflow: hidden; color: transparent; " + propChar;
        this.editableDocument.body.style.textIndent = currentTextIndent;
        let layoutX = layoutPosition.getLayoutX(this.control.measurer, DocumentLayoutDetailsLevel.Row);
        const layoutPoint = new LayoutPoint(layoutPosition.pageIndex, layoutX, layoutPosition.getLayoutY(DocumentLayoutDetailsLevel.Row));
        const pageElement = this.control.viewManager.cache[layoutPoint.pageIndex].page;
        layoutPoint.offset(pageElement.offsetLeft, pageElement.offsetTop);
        this.setPosition(layoutPoint.x, layoutPoint.y);
        this.editableDocument.body.style.textIndent = this.previousText.length ? currentTextIndent :
            layoutPosition.getLayoutX(this.control.measurer, DocumentLayoutDetailsLevel.Box) +
                layoutPosition.box.getCharOffsetXInPixels(this.control.measurer, layoutPosition.charOffset) - layoutX + "px";
        this.inputElement.style.width = layoutPosition.row.width + "px";
        if (Browser.IE || Browser.Edge) {
            this.editableDocument.body.style.width = this.inputElement.style.width;
            this.editableDocument.body.style.height = this.inputElement.style.height = layoutPosition.row.height + "px";
        }
        if (layoutPosition.row.boxes.length > 1) {
            this.editableDocument.body.style.lineHeight = layoutPosition.row.height + "px";
            this.editableDocument.body.style.marginTop = (layoutPosition.box.height - layoutPosition.row.height) / 2 + "px";
        }
    }
    updateInputIME() {
        const lastSelectedIntervalStartPosition = this.control.selection.lastSelectedInterval.start;
        const subDocument = this.control.selection.activeSubDocument;
        const layoutPosition = subDocument.isMain() ?
            new LayoutPositionMainSubDocumentCreator(this.control.selection.layout, subDocument, lastSelectedIntervalStartPosition, DocumentLayoutDetailsLevel.Character)
                .create(new LayoutPositionCreatorConflictFlags().setDefault(false), new LayoutPositionCreatorConflictFlags().setDefault(true)) :
            new LayoutPositionOtherSubDocumentCreator(this.control.selection.layout, subDocument, lastSelectedIntervalStartPosition, this.control.selection.pageIndex, DocumentLayoutDetailsLevel.Box)
                .create(new LayoutPositionCreatorConflictFlags().setDefault(false), new LayoutPositionCreatorConflictFlags().setDefault(true));
        if (!layoutPosition)
            return null;
        const paragraphProperties = this.control.selection.activeSubDocument.getParagraphByPosition(lastSelectedIntervalStartPosition).getParagraphMergedProperties();
        const text = this.getEditableDocumentText();
        if (text.length === 2)
            this.inputElement.style.height = (paragraphProperties.alignment == ParagraphAlignment.Left ? layoutPosition.pageArea.height : 0) + "px";
        const inputWidth = parseInt(this.inputElement.style.width);
        if (inputWidth && inputWidth != layoutPosition.row.width) {
            const widthDiff = layoutPosition.row.width - parseInt(this.inputElement.style.width);
            this.inputElement.style.width = layoutPosition.row.width + "px";
            this.editableDocument.body.style.textIndent = parseInt(this.editableDocument.body.style.textIndent) + widthDiff + "px";
            this.inputElement.style.left = parseInt(this.inputElement.style.left) - widthDiff + "px";
        }
    }
    endInputIME() {
        this.inputElement.style.width = "0px";
        this.inputElement.style.height = "0px";
    }
}
export class InputController {
    constructor(control, eventManager, parent) {
        this.control = control;
        this.inputEditor = this.createInputEditor(parent, eventManager);
        this.exporter = new HtmlExporter(this.control);
    }
    dispose() {
        this.inputEditor.dispose();
    }
    createInputEditor(parent, eventManager) {
        if (this.control.isTouchMode())
            return new DivInputEditor(this.control, eventManager, parent);
        return new IFrameInputEditor(this.control, eventManager, parent);
    }
    getEditableDocument() {
        return this.inputEditor.getEditableDocument();
    }
    getExportedRangeCopy() {
        return this.exporter.rangeCopy;
    }
    captureFocus() {
        this.inputEditor.captureFocus();
    }
    setPosition(left, top) {
        this.inputEditor.setPosition(left, top);
    }
    renderSelectionToEditableDocument() {
        const selection = this.control.selection;
        if (selection.intervals.length === 0 || selection.isCollapsed())
            return;
        const rangeCopy = RangeCopy.create(selection.subDocumentIntervals);
        const model = rangeCopy.model;
        const interval = new FixedInterval(0, model.mainSubDocument.getDocumentEndPosition() - (rangeCopy.addedUselessParagraphMarkInEnd ? 1 : 0));
        const guidLabel = RichUtils.getCopyPasteGuidLabel(this.control.getGuidParams());
        let result = '';
        let html = this.exporter.getHtmlElementsByInterval(model, model.mainSubDocument, interval, guidLabel);
        if (!html.isEmpty()) {
            result = InputController.getCopyPasteHtmlContentForEditable(html, guidLabel);
            this.exporter.rangeCopy = rangeCopy;
        }
        if (typeof result === "string") {
            this.setEditableDocumentContent(result);
        }
        else {
            const _fragment = document.createDocumentFragment();
            _fragment.appendChild(result);
            this.setEditableDocumentContent(_fragment.children);
        }
        this.selectEditableDocumentContent();
    }
    static getCopyPasteHtmlContentForEditable(html, guidLabel) {
        const builder = new HtmlBuilder();
        const id = guidLabel.replace("id=\"", "").replace("\"", "");
        builder
            .startChild('a')
            .configure((el) => {
            el.setAttribute('id', id);
        })
            .startChild('span')
            .configure((el) => {
            el.setAttribute('id', id);
        })
            .startChild('b')
            .configure((el) => {
            el.style.cssText = "font-weight: normal;";
            el.setAttribute('id', id);
            if (typeof html === 'string')
                el.innerHTML = html;
        });
        if (typeof html !== "string") {
            builder.assignFrom(html);
        }
        builder.endChild('b');
        builder.endChild('span');
        builder.endChild('a');
        return builder.childElements[0];
    }
    setEditableDocumentContent(content) {
        this.inputEditor.setEditableDocumentContent(content);
    }
    setEditableDocumentCursorPosition(cursorPosition) {
        this.inputEditor.setEditableDocumentCursorPosition(cursorPosition);
    }
    getEditableDocumentContent() {
        return this.inputEditor.getEditableDocumentContent();
    }
    selectEditableDocumentContent() {
        this.inputEditor.selectEditableDocumentContent();
    }
}
