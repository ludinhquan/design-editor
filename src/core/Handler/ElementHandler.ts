import {ShapeType, StrokeStyle} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {fabric} from "fabric";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, ImageElement, LineElement, RectangleElement, TextElement} from "../Element";
import {FabricCanvas, FabricEvent, GenericOptions, IMouseMoveEvent} from "../type";
import {BaseHandler} from "./BaseHandler";
import {HandlerAction} from "./Handler";

export class ElementHandler extends BaseHandler {
  private readonly borderDashArray: Record<StrokeStyle, [number, number]> = {
    solid: [0,0],
    dashed: [20, 10],
    dotted: [8, 10],
  }
  private readonly elements: Map<string, BaseElement> = new Map()

  private readonly shapes: Partial<Record<ShapeType, ClassType<BaseElement>>> = {
    'rectangle': RectangleElement,
    'diamond': DiamondElement,
    'ellipse': EllipseElement,
    'arrow': ArrowElement,
    'line': LineElement,
    'text': TextElement,
    'image': ImageElement,
  }

  private drawingElement: BaseElement;
  private targetElement: fabric.Object;

  constructor(
    canvas: FabricCanvas,
    actions: HandlerAction
  ) {
    super(canvas,actions)
    this.registerHandlers()
  }

  updateObjectStyles() {
    const styles = this.getShapeStyles()
    const objects = this.canvas.getActiveObjects();
    objects.map(object => {
      if (object.type === 'group') {
        (object as fabric.Group).getObjects().map(ele => ele.set(styles));
        return;
      }
      object.set(styles)
    });
    this.canvas.requestRenderAll()
  }

  onAppStateChange(_: IAppContext, __: IAppContext, keys: StateChangedKey[]): void {
    if (!keys.includes('shapeOptions')) return
    this.updateObjectStyles();
  }

  getShapeStyles() {
    const {shapeOptions} = this.state
    return {
      stroke: shapeOptions.strokeColor,
      fill: shapeOptions.backgroundColor,
      strokeWidth: shapeOptions.strokeWidth,
      strokeDashArray: this.borderDashArray[shapeOptions.strokeStyle],
      opacity: shapeOptions.opacity / 100,
      rx: shapeOptions.roundness,
      ry: shapeOptions.roundness,
      fontSize: shapeOptions.fontSize,
      fontFamily: shapeOptions.fontFamily,
      textAlign: shapeOptions.textAlign,
    }
  }

  private getElementOption(event: IMouseMoveEvent) {
    const {image: currentImage} = this.state;
    const styles = this.getShapeStyles();

    const options: Partial<GenericOptions> = {
      image: currentImage,
      left: event.x,
      top: event.y,
      ...styles
    }

    return options
  }

  private registerHandlers = () => {
    this.canvas.on('mouse:down', this.onMouseDown.bind(this));
    this.canvas.on('mouse:move', this.onMouseMove.bind(this));
    this.canvas.on('mouse:up', this.onMouseUp.bind(this));
  }

  private lockMovement(lock: boolean){
    if (!this.targetElement) return;
    this.targetElement.lockMovementX = lock;
    this.targetElement.lockMovementY = lock;
  }

  private onMouseDown(event: FabricEvent) {
    const Element = this.shapes[this.activeTool];

    if (!Element) return;

    this.canvas.discardActiveObject();
    this.targetElement = event.target;
    this.lockMovement(true)
    this.handlerAction.disableKeyboardEvent()

    const pointer: IMouseMoveEvent = this.canvas.getPointer(event.e);
    const options = this.getElementOption(pointer)
    this.drawingElement = new Element(this.canvas, options);
  }

  private onMouseMove(event: FabricEvent) {
    if (!this.drawingElement) return;
    const pointer: IMouseMoveEvent = this.canvas.getPointer(event.e);

    this.drawingElement.drawing(pointer);
  }

  private onMouseUp() {
    this.lockMovement(false)
    this.handlerAction.enableKeyboardEvent()
    if (!this.drawingElement) return;
    const endDrawing = this.drawingElement.endDraw();
    if (!endDrawing) return

    const {activeTool, setActiveTool, setImage} = this.state
    if (activeTool === 'image') {
      setImage(null);
      setActiveTool('selection');
    }
    this.elements.set(this.drawingElement.id, this.drawingElement);
    this.drawingElement = null
  }
}
