import { Polygon } from '@devexpress/utils/lib/geometry/polygon';
import { LayoutBox } from './layout-box';
export var AnchoredObjectLevelType;
(function (AnchoredObjectLevelType) {
    AnchoredObjectLevelType[AnchoredObjectLevelType["BehindText"] = 0] = "BehindText";
    AnchoredObjectLevelType[AnchoredObjectLevelType["InText"] = 1] = "InText";
    AnchoredObjectLevelType[AnchoredObjectLevelType["BeforeText"] = 2] = "BeforeText";
})(AnchoredObjectLevelType || (AnchoredObjectLevelType = {}));
export class LayoutAnchoredObjectBox extends LayoutBox {
    constructor(characterProperties, colorInfo, belongsToSubDocId, anchorInfo, shape, objectId, rotationInRadians) {
        super(characterProperties, colorInfo);
        this.parentCell = null;
        this.yShift = 0;
        this.belongsToSubDocId = belongsToSubDocId;
        this.anchorInfo = anchorInfo;
        this.shape = shape;
        this.objectId = objectId;
        this.rotationInRadians = rotationInRadians;
    }
    equals(obj) {
        return super.equals(obj) &&
            this.anchorInfo.equals(obj.anchorInfo) &&
            this.shape.equals(obj.shape) &&
            this.rotationInRadians == obj.rotationInRadians &&
            this.belongsToSubDocId == obj.belongsToSubDocId &&
            this.objectId == obj.objectId;
    }
    isInText() {
        return this.levelType == AnchoredObjectLevelType.InText;
    }
    get levelType() {
        return this.anchorInfo.levelType;
    }
    copyFrom(obj) {
        super.copyFrom(obj);
        this.belongsToSubDocId = obj.belongsToSubDocId;
        this.rotationInRadians = obj.rotationInRadians;
        this.anchorInfo = obj.anchorInfo;
        this.shape = obj.shape;
        this.objectId = obj.objectId;
    }
    getContentBounds() {
        const bounds = this.createRectangle();
        const outlineWidth = this.shape.outlineWidth;
        bounds.x += outlineWidth / 2;
        bounds.y += outlineWidth / 2;
        bounds.width -= outlineWidth;
        bounds.height -= outlineWidth;
        return bounds;
    }
    getExtendedBounds() {
        const bounds = this.createRectangle();
        const outlineWidth = this.shape.outlineWidth;
        bounds.x -= outlineWidth / 2;
        bounds.y -= outlineWidth / 2;
        bounds.width += outlineWidth;
        bounds.height += outlineWidth;
        return bounds;
    }
    setContentSize(size) {
        const outlineWidth = this.shape.outlineWidth;
        this.width = size.width + outlineWidth;
        this.height = size.height + outlineWidth;
    }
    pushInfoForMeasure(_info, _showHiddenSymbols) { }
    popInfoForMeasure(_info, _showHiddenSymbols) { }
    isWhitespace() {
        return true;
    }
    isLineBreak() {
        return false;
    }
    getRotatedPolygon() {
        const center = this.center;
        const polygon = Polygon.fromRectangle(this);
        return this.rotationInRadians != 0 ? polygon.rotateAround(center, this.rotationInRadians, false, true) : polygon;
    }
    getOuterBounds(applyMargins) {
        const polygon = this.getRotatedPolygon();
        return applyMargins ? polygon.bounds.applyOffsetsOutside(this.anchorInfo.getDistanceMargins()) : polygon.bounds;
    }
}
