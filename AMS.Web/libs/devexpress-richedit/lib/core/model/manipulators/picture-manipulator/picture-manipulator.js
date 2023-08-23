import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { AnchoredPictureInsertedSubDocumentChange } from '../../changes/sub-document/picture/anchored-pictureinserted';
import { InlinePictureInsertedSubDocumentChange } from '../../changes/sub-document/picture/inline-picture-inserted';
import { AnchorInfo } from '../../floating-objects/anchor-info';
import { AnchorInfoPropertyHistoryItem } from '../../history/items/floating-objects/anchor-info-property-history-item';
import { ChangeAnchoredPictureSizeHistoryItem } from '../../history/items/floating-objects/change-anchored-picture-size-history-item';
import { InsertAnchoredPictureHistoryItem } from '../../history/items/floating-objects/insert-anchored-picture-history-item';
import { ShapePropertyHistoryItem } from '../../history/items/floating-objects/shape-property-history-item';
import { InsertInlinePictureHistoryItem } from '../../history/items/insert-inline-picture-history-item';
import { NonVisualDrawingObjectInfoPropertyHistoryItem } from '../../history/items/non-visual-drawing-object-info';
import { HistoryItemIntervalState } from '../../history/states/history-item-state';
import { HistoryItemIntervalStateObject } from '../../history/states/history-item-state-object';
import { RichUtils } from '../../rich-utils';
import { RunType } from '../../runs/run-type';
import { Shape } from '../../shapes/shape';
import { SubDocumentInterval, SubDocumentPosition } from '../../sub-document';
import { BaseManipulator } from '../base-manipulator';
import { RunsBaseManipulator } from '../runs-base-manipulator';
import { AnchorPictureInfo, InlinePictureInfo } from './insert-picture-manipulator-params';
import { ClientPictureLoader } from './loader/client-picture-loader';
import { ImageLoadingOptions } from './loader/image-loading-options';
import { ServerPictureLoader } from './loader/server-picture-loader';
import { ChangeImagePropertyHistoryItem } from '../../history/items/floating-objects/change-image-property-history-item';
export class InsertPictureViaHistoryResult {
    constructor(inserted, insertedInterval) {
        this.inserted = inserted;
        this.insertedInterval = insertedInterval;
    }
}
export class InsertAnchoredPictureViaHistoryResult {
    constructor(inserted, insertedInterval, anchoredObjectID) {
        this.inserted = inserted;
        this.insertedInterval = insertedInterval;
        this.anchoredObjectID = anchoredObjectID;
    }
}
export class PictureManipulator extends RunsBaseManipulator {
    constructor(manipulator) {
        super(manipulator);
        this.loader = this.modelManipulator.modelManager.clientMode ?
            new ClientPictureLoader(manipulator) :
            new ServerPictureLoader(manipulator);
        this.descriptionManipulator = new NonVisualDrawingObjectInfoManipulator(manipulator, (prop, val) => prop.description = val, (prop) => prop.description);
    }
    changeHorizontalPosition(subDocument, position, newValue) {
        this.history.beginTransaction();
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.horizontalPositionAlignment, this.modelManipulator.floatingObject.anchorInfo.horizontalPositionAlignment));
        newValue.offset.x;
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.horizontalPositionType, this.modelManipulator.floatingObject.anchorInfo.horizontalPositionType));
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.offset.x, this.modelManipulator.floatingObject.anchorInfo.offsetX));
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.percentOffset.x, this.modelManipulator.floatingObject.anchorInfo.percentOffsetX));
        this.history.endTransaction();
    }
    changeVerticalPosition(subDocument, position, newValue) {
        this.history.beginTransaction();
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.verticalPositionAlignment, this.modelManipulator.floatingObject.anchorInfo.verticalPositionAlignment));
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.verticalPositionType, this.modelManipulator.floatingObject.anchorInfo.verticalPositionType));
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.offset.y, this.modelManipulator.floatingObject.anchorInfo.offsetY));
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue.percentOffset.y, this.modelManipulator.floatingObject.anchorInfo.percentOffsetY));
        this.history.endTransaction();
    }
    changeDescription(subDocument, position, newValue) {
        this.history.addAndRedo(new NonVisualDrawingObjectInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue, this.modelManipulator.picture.descriptionManipulator));
    }
    changeWrapSide(subDocument, position, newValue) {
        this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue, this.modelManipulator.floatingObject.anchorInfo.wrapSide));
    }
    changeShapeOutlineWidth(subDocument, position, newValue) {
        this.changeNumberedShapeProperty(subDocument, position, newValue, this.modelManipulator.floatingObject.shape.outlineWidth);
    }
    changeShapeOutlineColor(subDocument, position, newColor) {
        this.changeNumberedShapeProperty(subDocument, position, newColor, this.modelManipulator.floatingObject.shape.outlineColor);
    }
    changeShapeFillColor(subDocument, position, newColor) {
        this.changeNumberedShapeProperty(subDocument, position, newColor, this.modelManipulator.floatingObject.shape.fillColor);
    }
    changeNumberedShapeProperty(subDocument, position, newValue, manipulator) {
        this.history.addAndRedo(new ShapePropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), newValue, manipulator));
    }
    changePictureSize(subDocument, position, size) {
        this.history.addAndRedo(new ChangeAnchoredPictureSizeHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), size));
    }
    setFloatingObjectInlineTextWrapType(subDocument, position, charPropsBundle) {
        const run = subDocument.getRunByPosition(position);
        const interval = new FixedInterval(position, 1);
        const pictureRun = run;
        if (run.getType() !== RunType.InlinePictureRun) {
            this.history.addTransaction(() => {
                this.modelManipulator.range.removeInterval(new SubDocumentInterval(subDocument, interval), true, false);
                const newInfo = new InlinePictureInfo(pictureRun.size.clone(), new Shape(), -1, pictureRun.info.containerProperties, pictureRun.info.nonVisualDrawingProperties);
                this.modelManipulator.picture.insertInlinePictureViaHistory(new SubDocumentPosition(subDocument, interval.start), charPropsBundle, newInfo);
            });
        }
    }
    setFloatingObjectTextWrapType(subDocument, position, charPropsBundle, isBehindDoc, anchorObjectTextWrapType) {
        const modelManipulator = this.modelManipulator;
        let run = subDocument.getRunByPosition(position);
        this.history.beginTransaction();
        if (run.getType() === RunType.InlinePictureRun) {
            let interval = new FixedInterval(position, 1);
            let pictureRun = run;
            const anchorInfo = new AnchorInfo();
            anchorInfo.zOrder = this.modelManipulator.floatingObject.zOrder.getNewZOrder(subDocument);
            this.modelManipulator.range.removeInterval(new SubDocumentInterval(subDocument, interval), true, false);
            const newInfo = new AnchorPictureInfo(pictureRun.size.clone(), new Shape(), anchorInfo, pictureRun.info.containerProperties, pictureRun.info.nonVisualDrawingProperties);
            this.modelManipulator.picture.insertAnchoredPictureViaHistory(new SubDocumentPosition(subDocument, interval.start), charPropsBundle, newInfo, new ImageLoadingOptions(false));
            run = subDocument.getRunByPosition(interval.start);
        }
        let anchoredRun = run.getType() == RunType.AnchoredPictureRun ? run : run;
        if (anchoredRun.anchorInfo.wrapType !== anchorObjectTextWrapType || anchoredRun.anchorInfo.isBehindDoc !== isBehindDoc) {
            this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), anchorObjectTextWrapType, modelManipulator.floatingObject.anchorInfo.wrapType));
            this.history.addAndRedo(new AnchorInfoPropertyHistoryItem(modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), isBehindDoc, modelManipulator.floatingObject.anchorInfo.isBehindDoc));
        }
        this.history.endTransaction();
    }
    insertInlinePictureViaHistory(subDocPos, charPropsBundle, picInfo, options) {
        this.history.addAndRedo(new InsertInlinePictureHistoryItem(this.modelManipulator, subDocPos, charPropsBundle, picInfo, options));
        return new InsertPictureViaHistoryResult(true, new FixedInterval(subDocPos.position, 1));
    }
    insertAnchoredPictureViaHistory(subDocPos, charPropsBundle, picInfo, options) {
        this.history.addAndRedo(new InsertAnchoredPictureHistoryItem(this.modelManipulator, subDocPos, charPropsBundle, picInfo, options));
        return new InsertPictureViaHistoryResult(true, new FixedInterval(subDocPos.position, 1));
    }
    reloadPicture(subDocument, position, base64, size) {
        this.history.addAndRedo(new ChangeImagePropertyHistoryItem(this.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(position, 1)), base64, size));
    }
    insertInlinePictureInner(subDocPos, charPropsBundle, picInfo, options = new ImageLoadingOptions(false)) {
        const cacheInfo = picInfo.size.cacheInfo;
        const runPicInfo = picInfo.clone();
        this.loader.load(cacheInfo);
        const insertedRun = this.insertRunInternal(subDocPos, charPropsBundle, RunType.InlinePictureRun, RichUtils.specialCharacters.ObjectMark);
        const pictureRun = subDocPos.subDocument.chunks[insertedRun.chunkIndex].textRuns[insertedRun.runIndex];
        pictureRun.info = runPicInfo;
        subDocPos.subDocument.chunks[insertedRun.chunkIndex].textRuns[insertedRun.runIndex].paragraph.length++;
        this.loader.sizeUpdater.addSizes(subDocPos, options, pictureRun, picInfo.size);
        this.modelManipulator.notifyModelChanged(new InlinePictureInsertedSubDocumentChange(subDocPos.subDocument.id, subDocPos.position, runPicInfo, pictureRun.info.containerProperties));
        if (cacheInfo.isLoaded)
            this.loader.sizeUpdater.update(cacheInfo, true);
        return runPicInfo.publicAPIID;
    }
    insertAnchoredPictureInner(subDocPos, charPropsBundle, picInfo, options = new ImageLoadingOptions(false)) {
        if (subDocPos.subDocument.isTextBox())
            return new InsertAnchoredPictureViaHistoryResult(true, new FixedInterval(subDocPos.position, 1), this.insertInlinePictureInner(subDocPos, charPropsBundle, new InlinePictureInfo(picInfo.size, picInfo.shape, -1, picInfo.containerProperties, picInfo.nonVisualDrawingProperties), options));
        const cacheInfo = picInfo.size.cacheInfo;
        const runPicInfo = picInfo.clone();
        this.loader.load(cacheInfo);
        const insertedRun = this.insertRunInternal(subDocPos, charPropsBundle, RunType.AnchoredPictureRun, RichUtils.specialCharacters.ObjectMark);
        const pictureRun = subDocPos.subDocument.chunks[insertedRun.chunkIndex].textRuns[insertedRun.runIndex];
        pictureRun.info = runPicInfo;
        subDocPos.subDocument.chunks[insertedRun.chunkIndex].textRuns[insertedRun.runIndex].paragraph.length++;
        this.loader.sizeUpdater.addSizes(subDocPos, options, pictureRun, picInfo.size);
        if (cacheInfo.isLoaded)
            this.loader.sizeUpdater.update(cacheInfo, false);
        this.modelManipulator.notifyModelChanged(new AnchoredPictureInsertedSubDocumentChange(subDocPos.subDocument.id, pictureRun.anchoredObjectID, subDocPos.position, cacheInfo.currId, runPicInfo.size, runPicInfo.anchorInfo, runPicInfo.containerProperties));
        const interval = new FixedInterval(subDocPos.position, 1);
        this.modelManipulator.floatingObject.shape.fillColor.setValue(subDocPos.subDocument, interval.clone(), runPicInfo.shape.fillColor);
        this.modelManipulator.floatingObject.shape.outlineColor.setValue(subDocPos.subDocument, interval.clone(), runPicInfo.shape.outlineColor);
        this.modelManipulator.floatingObject.shape.outlineWidth.setValue(subDocPos.subDocument, interval.clone(), runPicInfo.shape.outlineWidth);
        return new InsertAnchoredPictureViaHistoryResult(true, interval, pictureRun.anchoredObjectID);
    }
}
export class NonVisualDrawingObjectInfoManipulator extends BaseManipulator {
    constructor(manipulator, setPropertyValue, getPropertyValue) {
        super(manipulator);
        this.setPropertyValue = setPropertyValue;
        this.getPropertyValue = getPropertyValue;
    }
    setValue(subDocument, interval, newValue) {
        const oldState = new HistoryItemIntervalState();
        const newState = new HistoryItemIntervalState();
        const run = subDocument.getRunByPosition(interval.start);
        const pictureRun = run.getType() == RunType.AnchoredPictureRun ? run : run;
        const containerProperties = pictureRun.info.containerProperties;
        oldState.register(new HistoryItemIntervalStateObject(interval, this.getPropertyValue(containerProperties)));
        this.setPropertyValue(containerProperties, newValue);
        pictureRun.info.containerProperties.copyFrom(containerProperties);
        newState.register(new HistoryItemIntervalStateObject(interval, newValue));
        return oldState;
    }
    restoreValue(subDocument, state) {
        if (state.isEmpty())
            return;
        const stateValue = state.lastObject;
        const run = subDocument.getRunByPosition(stateValue.interval.start);
        const anchoredRun = run.getType() == RunType.AnchoredPictureRun ? run : run;
        this.setPropertyValue(anchoredRun.info.containerProperties, stateValue.value);
    }
}
