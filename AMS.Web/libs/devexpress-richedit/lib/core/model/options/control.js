import { RichUtils } from '../rich-utils';
export class ControlOptions {
    constructor() {
        this.copy = DocumentCapability.Default;
        this.createNew = DocumentCapability.Default;
        this.cut = DocumentCapability.Default;
        this.drag = DocumentCapability.Default;
        this.drop = DocumentCapability.Default;
        this.open = DocumentCapability.Default;
        this.paste = DocumentCapability.Default;
        this.printing = DocumentCapability.Default;
        this.save = DocumentCapability.Default;
        this.saveAs = DocumentCapability.Default;
        this.download = DocumentCapability.Default;
        this.fullScreen = DocumentCapability.Default;
        this.tabMarker = RichUtils.specialCharacters.TabMark;
        this.pageBreakInsertMode = PageBreakInsertMode.NewLine;
        this.characterFormatting = DocumentCapability.Default;
        this.characterStyle = DocumentCapability.Default;
        this.fields = DocumentCapability.Default;
        this.hyperlinks = DocumentCapability.Default;
        this.inlinePictures = DocumentCapability.Default;
        this.paragraphFormatting = DocumentCapability.Default;
        this.paragraphs = DocumentCapability.Default;
        this.paragraphStyle = DocumentCapability.Default;
        this.paragraphTabs = DocumentCapability.Default;
        this.sections = DocumentCapability.Default;
        this.tabSymbol = DocumentCapability.Default;
        this.undo = DocumentCapability.Default;
        this.bookmarks = DocumentCapability.Default;
        this.numberingBulleted = DocumentCapability.Default;
        this.numberingMultiLevel = DocumentCapability.Default;
        this.numberingSimple = DocumentCapability.Default;
        this.headersFooters = DocumentCapability.Default;
        this.tables = DocumentCapability.Default;
        this.tableStyle = DocumentCapability.Default;
        this.floatingObjects = DocumentCapability.Default;
        this.acceptsTab = true;
        this.raiseClientEventsOnModificationsViaAPI = true;
    }
    static isEnabled(capability) {
        return capability === DocumentCapability.Default || capability === DocumentCapability.Enabled;
    }
    static isVisible(capability) {
        return capability !== DocumentCapability.Hidden;
    }
    clone() {
        const result = new ControlOptions();
        result.copy = this.copy;
        result.createNew = this.createNew;
        result.cut = this.cut;
        result.drag = this.drag;
        result.drop = this.drop;
        result.open = this.open;
        result.paste = this.paste;
        result.printing = this.printing;
        result.save = this.save;
        result.saveAs = this.saveAs;
        result.download = this.download;
        result.fullScreen = this.fullScreen;
        result.tabMarker = this.tabMarker;
        result.pageBreakInsertMode = this.pageBreakInsertMode;
        result.characterFormatting = this.characterFormatting;
        result.characterStyle = this.characterStyle;
        result.fields = this.fields;
        result.hyperlinks = this.hyperlinks;
        result.inlinePictures = this.inlinePictures;
        result.paragraphFormatting = this.paragraphFormatting;
        result.paragraphs = this.paragraphs;
        result.paragraphStyle = this.paragraphStyle;
        result.paragraphTabs = this.paragraphTabs;
        result.sections = this.sections;
        result.tabSymbol = this.tabSymbol;
        result.undo = this.undo;
        result.bookmarks = this.bookmarks;
        result.numberingBulleted = this.numberingBulleted;
        result.numberingMultiLevel = this.numberingMultiLevel;
        result.numberingSimple = this.numberingSimple;
        result.headersFooters = this.headersFooters;
        result.tables = this.tables;
        result.tableStyle = this.tableStyle;
        result.floatingObjects = this.floatingObjects;
        result.acceptsTab = this.acceptsTab;
        result.raiseClientEventsOnModificationsViaAPI = this.raiseClientEventsOnModificationsViaAPI;
        return result;
    }
}
export var DocumentCapability;
(function (DocumentCapability) {
    DocumentCapability[DocumentCapability["Default"] = 0] = "Default";
    DocumentCapability[DocumentCapability["Disabled"] = 1] = "Disabled";
    DocumentCapability[DocumentCapability["Enabled"] = 2] = "Enabled";
    DocumentCapability[DocumentCapability["Hidden"] = 3] = "Hidden";
})(DocumentCapability || (DocumentCapability = {}));
export var PageBreakInsertMode;
(function (PageBreakInsertMode) {
    PageBreakInsertMode[PageBreakInsertMode["NewLine"] = 0] = "NewLine";
    PageBreakInsertMode[PageBreakInsertMode["CurrentLine"] = 1] = "CurrentLine";
})(PageBreakInsertMode || (PageBreakInsertMode = {}));
