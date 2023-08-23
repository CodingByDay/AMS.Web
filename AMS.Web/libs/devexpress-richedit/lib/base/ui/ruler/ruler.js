import { ModelChangeType } from '../../../core/model/changes/enums';
import { BatchUpdatableObject } from '@devexpress/utils/lib/class/batch-updatable';
import { Flag } from '@devexpress/utils/lib/class/flag';
import { RulerControls } from './manager';
import { RulerModelData } from './model-data';
import { RulerVisibility } from './settings';
var HorizontalRulerEventType;
(function (HorizontalRulerEventType) {
    HorizontalRulerEventType[HorizontalRulerEventType["None"] = 0] = "None";
    HorizontalRulerEventType[HorizontalRulerEventType["FullReset"] = 1] = "FullReset";
    HorizontalRulerEventType[HorizontalRulerEventType["CheckSelectionChange"] = 2] = "CheckSelectionChange";
})(HorizontalRulerEventType || (HorizontalRulerEventType = {}));
export class HorizontalRulerControl extends BatchUpdatableObject {
    constructor(core, settings, canvas) {
        super();
        this.controls = null;
        this._innerVisible = true;
        this._visible = true;
        this.isTestMode = false;
        this.selection = null;
        this.updateEnabled = true;
        this.modelData = new RulerModelData(core, settings);
        this.canvas = canvas;
    }
    get initialized() { return !!this.controls; }
    ;
    dispose() {
        if (this.initialized)
            this.controls.dispose();
    }
    initialize(testMode) {
        this.isTestMode = testMode;
        this.initializeCore();
    }
    onUpdateUnlocked(occurredEvents) {
        this.applyEvent(occurredEvents);
    }
    modelChanged(change) {
        const occurredEvents = this.getModelChangeEvent(change);
        if (this.isUpdateLocked())
            this.registerOccurredEvent(occurredEvents);
        else
            this.applyEvent(occurredEvents);
    }
    NotifySelectionChanged(selection) {
        this.selection = selection;
        if (this.isUpdateLocked())
            this.registerOccurredEvent(HorizontalRulerEventType.CheckSelectionChange);
        else
            this.applyEvent(this.getSelectionChangeEvent());
    }
    applyEvent(occurredEvents) {
        const flag = new Flag(occurredEvents);
        if (flag.get(HorizontalRulerEventType.CheckSelectionChange))
            flag.add(this.getSelectionChangeEvent());
        if (flag.get(HorizontalRulerEventType.FullReset))
            this.update();
    }
    getSelectionChangeEvent() {
        return this.selection && !this.selection.shouldResetInputPosition() ?
            HorizontalRulerEventType.None :
            HorizontalRulerEventType.FullReset;
    }
    getModelChangeEvent(change) {
        switch (change.type) {
            case ModelChangeType.DifferentOddAndEvenPages:
            case ModelChangeType.PageColor:
                return HorizontalRulerEventType.None;
            case ModelChangeType.DefaultTabWidth:
                return HorizontalRulerEventType.FullReset;
            case ModelChangeType.HeaderFooterCreated:
            case ModelChangeType.HeaderFooterIndexChanged:
            case ModelChangeType.LoadFontInfo:
            case ModelChangeType.SectionFormattingChanged:
            case ModelChangeType.CreateStyleLink:
            case ModelChangeType.DeleteStyleLink:
                return HorizontalRulerEventType.None;
            case ModelChangeType.AbstractNumberingListAdded:
            case ModelChangeType.AbstractNumberingListDeleted:
            case ModelChangeType.NumberingListAdded:
            case ModelChangeType.NumberingListDeleted:
            case ModelChangeType.ListLevelPropertyChanged:
            case ModelChangeType.ListLevelParagraphPropertyChanged:
            case ModelChangeType.ListLevelCharacterPropertyChanged:
            case ModelChangeType.IOverrideListLevelChanged:
                return HorizontalRulerEventType.None;
            case ModelChangeType.BookmarkCreated:
            case ModelChangeType.BookmarkDeleted:
                return HorizontalRulerEventType.None;
            case ModelChangeType.TabInserted:
            case ModelChangeType.TabDeleted:
                return HorizontalRulerEventType.FullReset;
            case ModelChangeType.LoadPicturesInfo:
            case ModelChangeType.InlinePicturesUpdated:
            case ModelChangeType.InlinePictureInserted:
            case ModelChangeType.AnchoredPictureInserted:
            case ModelChangeType.AnchoredPictureSizeChanged:
            case ModelChangeType.InlineObjectRunPropertyChanged:
                return HorizontalRulerEventType.None;
            case ModelChangeType.FieldInserted:
            case ModelChangeType.FieldDeleted:
            case ModelChangeType.HyperlinkInfoChanged:
            case ModelChangeType.FieldsShowCodeChanged:
                return HorizontalRulerEventType.None;
            case ModelChangeType.SimpleRunInserted:
            case ModelChangeType.TextBufferChanged:
            case ModelChangeType.ParagraphInserted:
            case ModelChangeType.SectionInserted:
            case ModelChangeType.AnchoredTextBoxInserted:
            case ModelChangeType.AnchorObjectRemoved:
            case ModelChangeType.IntervalRemoved:
            case ModelChangeType.ParagraphMerged:
            case ModelChangeType.SectionMerged:
                return HorizontalRulerEventType.FullReset;
            case ModelChangeType.CharacterFormattingChanged:
            case ModelChangeType.CharacterPropertiesChanged:
                return HorizontalRulerEventType.None;
            case ModelChangeType.ParagraphFormattingChanged:
            case ModelChangeType.ParagraphPropertiesChanged:
            case ModelChangeType.ParagraphAndCharacterMergedPropertiesReset:
                return HorizontalRulerEventType.FullReset;
            case ModelChangeType.AnchoredTextBoxSizeChanged:
                return HorizontalRulerEventType.FullReset;
            case ModelChangeType.AnchoredTextBoxPropertiesChanged:
            case ModelChangeType.AnchorInfoPropertyChanged:
            case ModelChangeType.ShapeChanged:
            case ModelChangeType.ShapePropertyChanged:
                return HorizontalRulerEventType.None;
            case ModelChangeType.CharacterStyleApplied:
                return HorizontalRulerEventType.None;
            case ModelChangeType.ParagraphStyleApplied:
            case ModelChangeType.TableStyleChanged:
            case ModelChangeType.ParagraphNumberingListChanged:
                return HorizontalRulerEventType.FullReset;
            case ModelChangeType.TableCreated:
            case ModelChangeType.TableRemoved:
            case ModelChangeType.TableStartPositionShifted:
            case ModelChangeType.TableCellPropertyChanged:
            case ModelChangeType.TablePropertyChanged:
            case ModelChangeType.TableRowPropertyChanged:
            case ModelChangeType.TableCellSplittedHorizontally:
            case ModelChangeType.TableCellMergedHorizontally:
            case ModelChangeType.TableRowInserted:
            case ModelChangeType.TableRowRemoved:
            case ModelChangeType.TableCellRemoved:
            case ModelChangeType.TableCellInserted:
                return HorizontalRulerEventType.FullReset;
            default:
                return HorizontalRulerEventType.None;
        }
    }
    forceUpdate(_queryCommands) {
        if (this.isUpdateLocked())
            this.registerOccurredEvent(HorizontalRulerEventType.FullReset);
        else
            this.update();
    }
    update() {
        if (this.initialized && this.updateEnabled && !this.isUpdateLocked() && !this.modelData.isClosed)
            this.controls.update();
    }
    adjust() {
        if (!this.initialized && this.modelData.inputPosition) {
            this.initializeCore();
            if (this.initialized)
                this.update();
        }
        if (this.initialized)
            this.controls.adjust();
    }
    setEnable(enable) {
        if (this.initialized)
            this.controls.mouseHandler.setEnable(enable);
    }
    setVisible(visible) {
        if (visible != this._innerVisible || visible != this._visible) {
            this._visible = visible;
            this.innerSetVisible(visible);
        }
    }
    innerSetVisible(visible) {
        visible = visible && !this.modelData.innerClientProperties.viewsSettings.isSimpleView;
        if (this.initialized && this._innerVisible != visible) {
            this._innerVisible = visible;
            this.controls.mouseHandler.setVisible(this._innerVisible);
            this.controls.wrapper.setVisible(this._innerVisible);
        }
    }
    getVisible() {
        return this._visible;
    }
    getHeight() {
        return this.initialized ? this.controls.wrapper.rootElement.offsetHeight : 0;
    }
    onViewTypeChanged() {
        this.innerSetVisible(this._visible && !this.modelData.innerClientProperties.viewsSettings.isSimpleView);
    }
    initializeCore() {
        if (this.isTestMode)
            return;
        if (!this.initialized && this.canvas.offsetWidth)
            this.controls = new RulerControls(this.canvas, this.modelData);
        this.setVisible(this.modelData.settings.visibility != RulerVisibility.Hidden);
        this.onViewTypeChanged();
    }
}
