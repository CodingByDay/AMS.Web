import { Point } from "@devexpress/utils/lib/geometry/point";
import { Vector } from "@devexpress/utils/lib/geometry/vector";
import { ChangeConnectorPointsHistoryItem } from "../../History/Common/ChangeConnectorPointsHistoryItem";
import { History } from "../../History/History";
import { Connector } from "../../Model/Connectors/Connector";
import { ConnectorRenderPoint } from "../../Model/Connectors/ConnectorRenderPoint";
import { ConnectorRenderPointsContext } from "../../Model/Connectors/Routing/ConnectorRenderPointsContext";
import { DiagramItem, ItemKey } from "../../Model/DiagramItem";
import { DiagramModel } from "../../Model/Model";
import { ModelUtils } from "../../Model/ModelUtils";
import { Shape } from "../../Model/Shapes/Shape";
import { DiagramModelOperation } from "../../ModelOperationSettings";
import { Selection } from "../../Selection/Selection";
import { DiagramMouseEvent, MouseButton, MouseEventElementType } from "../Event";
import { MouseHandler } from "../MouseHandler";
import { IVisualizerManager } from "../Visualizers/VisualizersManager";
import { MouseHandlerDraggingState } from "./MouseHandlerDraggingState";

export class DraggingConnector {
    readonly startPoints: Point[];
    readonly startRenderContext: ConnectorRenderPointsContext | undefined;
    constructor(readonly connector: Connector) {
        this.startPoints = connector.points.map(x => x.clone());
        this.startRenderContext = connector.tryCreateRenderPointsContext();
    }
}

class DraggingShape {
    readonly startPosition: Point;
    constructor(public readonly shape: Shape) {
        this.startPosition = shape.position.clone();
    }
}

export abstract class MouseHandlerDragDiagramItemStateBase extends MouseHandlerDraggingState {
    private fixedX: boolean;
    private fixedY: boolean;
    private lockInitDrag: boolean;

    startPoint: Point;
    selectedItems : { [key: string] : DiagramItem }
    draggingShapes: DraggingShape[];
    draggingConnectors: DraggingConnector[];
    draggingConnectorsIndexByKey: { [key: string]: number };
    modelConnectorsWithoutBeginItemInfo: { connector: Connector, point: Point }[];
    modelConnectorsWithoutEndItemInfo: { connector: Connector, point: Point }[];
    startScrollLeft = 0;
    startScrollTop = 0;
    shouldClone: boolean;

    protected constructor(handler: MouseHandler, history: History,
        protected model: DiagramModel,
        protected selection: Selection,
        protected visualizerManager: IVisualizerManager) {
        super(handler, history);
    }

    protected abstract get areValidDraggingShapes(): boolean;
    protected abstract get areValidDraggingConnectors(): boolean;

    finish(): void {
        this.visualizerManager.resetExtensionLines();
        this.visualizerManager.resetContainerTarget();
        this.visualizerManager.resetConnectionTarget();
        this.visualizerManager.resetConnectionPoints();
        super.finish();
    }
    onMouseDown(evt: DiagramMouseEvent): void {
        this.handler.addDiagramItemToSelection(evt);
        this.shouldClone = this.handler.canCopySelectedItems(evt);
        this.startPoint = evt.modelPoint;
        this.initDrag();
        this.lockInitDrag = false;
        if(!this.shouldClone)
            this.draggingShapes.forEach(draggingShape => this.handler.addInteractingItem(draggingShape.shape, DiagramModelOperation.MoveShape));
        super.onMouseDown(evt);
    }

    onMouseMove(evt: DiagramMouseEvent): void {
        this.mouseMoveEvent = evt;
        if(evt.button !== MouseButton.Left) {
            this.cancelChanges();
            this.handler.switchToDefaultState();
            return;
        }
        if(!this.canApplyChangesOnMouseMove(this.startPoint, evt.modelPoint))
            return;
        if(this.handler.canCopySelectedItems(evt))
            if(!this.lockInitDrag) {
                this.cancelChanges();
                this.shouldClone = true;
                this.copySelection();
                this.initDrag();
                this.lockInitDrag = true;
            }

        this.onApplyChanges(evt);
        this.onAfterApplyChanges();
        this.updateContainers(evt);
    }
    private updateContainers(evt: DiagramMouseEvent) : void {
        this.visualizerManager.setExtensionLines(this.selection.getSelectedShapes(false, true));
        const container = ModelUtils.findContainerByEventKey(this.model, this.selection, evt.source.key);
        if(container && this.allowInsertToContainer(evt, container))
            this.visualizerManager.setContainerTarget(container, evt.source.type);
        else
            this.visualizerManager.resetContainerTarget();
    }
    onMouseUp(evt: DiagramMouseEvent) : void {
        super.onMouseUp(evt);
        if(this.handler.canRemoveDiagramItemToSelection(evt) && this.handler.canMultipleSelection(evt))
            this.handler.removeDiagramItemFromSelection(evt.button, evt.source.key);
    }
    onApplyChanges(evt: DiagramMouseEvent): void {
        this.calculateFixedPosition(evt);
        if(this.draggingShapes.length) {
            const selectedShapes = this.draggingShapes.map(ds => ds.shape);
            this.draggingShapes.forEach(ds => {
                let shape = ds.shape;
                while(shape.container) {
                    if(selectedShapes.indexOf(shape.container) !== -1) return false;
                    shape = shape.container;
                }
                this.moveShape(ds, evt);
            });
            const firstDraggingShape = this.draggingShapes[0];
            const offset = Vector.fromPoints(firstDraggingShape.startPosition.clone(), firstDraggingShape.shape.position.clone());
            if(offset.x || offset.y)
                this.draggingConnectors.forEach(dc => this.moveConnectorCore(dc.connector, dc.startPoints, dc.startRenderContext, offset));
        }
        else
            this.draggingConnectors.forEach(x => this.moveConnector(x, evt));
        const container = ModelUtils.findContainerByEventKey(this.model, this.selection, evt.source.key);
        if(container && this.allowInsertToContainer(evt, container))
            ModelUtils.insertSelectionToContainer(this.history, this.model, this.selection, container);
        else
            ModelUtils.removeSelectionFromContainer(this.history, this.model, this.selection);
        this.handler.tryUpdateModelSize((offsetLeft, offsetTop) => {
            this.modelConnectorsWithoutBeginItemInfo.forEach(pi => {
                pi.point.x += offsetLeft;
                pi.point.y += offsetTop;
            });
            this.modelConnectorsWithoutEndItemInfo.forEach(pi => {
                pi.point.x += offsetLeft;
                pi.point.y += offsetTop;
            });
        });
    }
    getDraggingElementKeys(): ItemKey[] {
        return this.draggingShapes.map(x => x.shape.key).concat(this.draggingConnectors.map(x => x.connector.key));
    }
    getSnappedPoint(evt: DiagramMouseEvent, point: Point): Point {
        return this.handler.getSnappedPointOnDragDiagramItem(evt, point, this.fixedX, this.fixedY, this.startPoint);
    }

    private initDrag() : void {
        this.selectedItems = ModelUtils.createSelectedItems(this.selection);
        this.initDraggingShapes();

        if(!this.areValidDraggingShapes) {
            this.handler.switchToDefaultState();
            return;
        }
        this.initDraggingConnectors();
        if(!this.areValidDraggingConnectors) {
            this.handler.switchToDefaultState();
            return;
        }
        this.modelConnectorsWithoutBeginItemInfo = this.createModelConnectorsWithoutBeginItemInfo();
        this.modelConnectorsWithoutEndItemInfo = this.createModelConnectorsWithoutEndItemInfo();
    }
    private initDraggingShapes() {
        this.draggingShapes = this.selection.getSelectedShapes(false, true).map(s => new DraggingShape(s));
    }
    private initDraggingConnectors(): void {
        this.draggingConnectors = [];
        this.draggingConnectorsIndexByKey = {};
        this.selection.getSelectedConnectors(false, true).forEach(c => this.registerConnector(c));
        if(this.shouldClone)
            return;
        this.draggingShapes.forEach(x => {
            const attachedConnectors = x.shape.attachedConnectors;
            if(attachedConnectors)
                attachedConnectors.forEach(c => {
                    if(!this.containsDraggingConnectorByKey(c.key))
                        this.registerConnector(c);
                });
        });
    }
    private copySelection() : void {
        ModelUtils.cloneSelectionToOffset(this.history, this.model, (key: ItemKey) => {
            const item = this.model.findItem(key);
            if(item)
                this.handler.addInteractingItem(item, DiagramModelOperation.AddShape);
        }, this.selection, 0, 0);
    }
    private calculateFixedPosition(evt: DiagramMouseEvent) {
        this.fixedX = false;
        this.fixedY = false;
        if(this.handler.canCalculateFixedPosition(evt)) {
            const dx = Math.abs(this.startPoint.x - evt.modelPoint.x);
            const dy = Math.abs(this.startPoint.y - evt.modelPoint.y);
            if(dx < dy)
                this.fixedX = true;
            else
                this.fixedY = true;
        }
    }
    private containsDraggingConnectorByKey(key: string): boolean {
        return this.draggingConnectorsIndexByKey[key] !== undefined;
    }
    private allowInsertToContainer(evt: DiagramMouseEvent, container: Shape): boolean {
        if(this.handler.canMultipleSelection(evt))
            return false;
        return container && container.expanded && ModelUtils.canInsertSelectionToContainer(this.model, this.selection, container);
    }
    private registerConnector(connector: Connector) {
        this.draggingConnectorsIndexByKey[connector.key] = this.draggingConnectors.push(new DraggingConnector(connector)) - 1;
    }
    private createModelConnectorsWithoutBeginItemInfo(): { connector: Connector, point: Point }[] {
        const connectors = this.model.findConnectorsCore(c => !c.beginItem && !this.containsDraggingConnectorByKey(c.key));
        return connectors.map(c => {
            return {
                connector: c,
                point: c.points[0].clone()
            };
        });
    }
    private createModelConnectorsWithoutEndItemInfo(): { connector: Connector, point: Point }[] {
        const connectors = this.model.findConnectorsCore(c => !c.endItem && !this.containsDraggingConnectorByKey(c.key));
        return connectors.map(c => {
            return {
                connector: c,
                point: c.points[c.points.length - 1].clone()
            };
        });
    }
    private moveConnector(dc: DraggingConnector, evt: DiagramMouseEvent) {
        const startPoints = dc.startPoints;
        const offset = Vector.fromPoints(startPoints[0].clone(), this.getSnappedPoint(evt, startPoints[0]).clone());
        if(offset.x || offset.y)
            this.moveConnectorCore(dc.connector, startPoints, dc.startRenderContext, offset);
    }
    private moveConnectorCore(connector: Connector, startPoints: Point[], startRenderContext: ConnectorRenderPointsContext | undefined, offset: Vector) : void {
        if(this.shouldClone || ModelUtils.canMoveConnector(this.selectedItems, connector))
            this.offsetConnector(connector, startPoints, startRenderContext, offset);
        else
            this.changeConnector(connector);
    }
    private moveShape(ds: DraggingShape, evt: DiagramMouseEvent) {
        const shape = ds.shape;
        const position = this.getSnappedPoint(evt, ds.startPosition);
        ModelUtils.setShapePosition(this.history, this.model, shape, position);
        ModelUtils.updateMovingShapeConnections(this.history, shape,
            this.modelConnectorsWithoutBeginItemInfo, this.modelConnectorsWithoutEndItemInfo,
            () => {
                this.visualizerManager.resetConnectionTarget();
                this.visualizerManager.resetConnectionPoints();
            },
            (shape, connectionPointIndex) => {
                this.visualizerManager.setConnectionTarget(shape, MouseEventElementType.Shape);
                this.visualizerManager.setConnectionPoints(shape, MouseEventElementType.Shape, connectionPointIndex, true);
            },
            (connector) => this.handler.addInteractingItem(connector)
        );
        if(!this.draggingConnectors.filter(dc => !!this.selectedItems[dc.connector.key]).length)
            ModelUtils.updateShapeAttachedConnectors(this.history, this.model, shape);
    }
    private offsetConnector(connector: Connector, startPoints: Point[], startRenderContext: ConnectorRenderPointsContext | undefined, offset: Vector) {
        const newPoints = startPoints.map(p => this.offsetPoint(p, offset));
        if(!newPoints[0].equals(connector.points[0]))
            this.history.addAndRedo(
                new ChangeConnectorPointsHistoryItem(
                    connector.key, newPoints,
                    this.offsetRenderContext(startRenderContext, offset)
                )
            );
    }
    private offsetRenderContext(context: ConnectorRenderPointsContext | undefined, offset: Vector) : ConnectorRenderPointsContext {
        if(context === undefined)
            return undefined;
        return new ConnectorRenderPointsContext(context.renderPoints.map(p => {
            const newPoint = this.offsetPoint(p, offset);
            return new ConnectorRenderPoint(newPoint.x, newPoint.y, p.pointIndex, p.skipped);
        }), true, context.actualRoutingMode);
    }
    private offsetPoint(point: Point, offset: Vector): Point {
        const pointOffset = Vector.fromPoints(point, this.startPoint);
        return this.startPoint.clone().offset(offset.x - pointOffset.x, offset.y - pointOffset.y);
    }
    private changeConnector(connector: Connector) {
        ModelUtils.tryRemoveConnectorIntermediatePoints(this.history, connector);
        ModelUtils.updateConnectorAttachedPoints(this.history, this.model, connector);
    }
}
