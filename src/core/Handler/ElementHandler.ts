import {ShapeType} from "@/constants";
import {nanoid} from "nanoid";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, LineElement, RectangleElement, TextElement} from "../Element";
import {FabricCanvas, FabricEvent, GenericOptions, IMouseMoveEvent} from "../type";
import {BaseHandler} from "./BaseHandler";

export class ElementHandler extends BaseHandler {
  private readonly elements: Partial<Record<ShapeType, ClassType<BaseElement>>> = {
    'rectangle': RectangleElement,
    // 'diamond': DiamondElement,
    // 'ellipse': EllipseElement,
    // 'arrow': ArrowElement,
    // 'line': LineElement,
    // 'text': TextElement,
  }

  private drawingElement: BaseElement;

  get isSelectionMode() {
    return this.appContext.activeTool === 'selection'
  }

  get activeTool() {
    return this.appContext.activeTool
  }

  constructor(
    canvas: FabricCanvas
  ) {
    super(canvas)
    this.registerHandlers()
  }

  private getElementOption(event: IMouseMoveEvent) {
    const {shapeStyles} = this.appContext;

    const options: Partial<GenericOptions> = {
      id: nanoid(),
      left: event.x,
      top: event.y,
      originX: 'left',
      originY: 'top',
      width: 0,
      height: 0,
      stroke: shapeStyles.strokeColor,
      fill: shapeStyles.backgroundColor,
      strokeWidth: shapeStyles.strokeWidth,
      opacity: shapeStyles.opacity / 100,
      rx: shapeStyles.roughness,
      ry: shapeStyles.roughness
    }
    return options
  }

  private registerHandlers = () => {
    this.canvas.on('mouse:down', this.onMouseDown.bind(this));
    this.canvas.on('mouse:move', this.onMouseMove.bind(this));
    this.canvas.on('mouse:up', this.onMouseUp.bind(this));
    this.canvas.on('selection:created', this.onDblclick.bind(this));
  }

  private onDblclick(event: FabricEvent) {
  }

  private onMouseDown(event: FabricEvent) {
    const Element = this.elements[this.activeTool];
    if (!Element) return;

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
    if (!this.drawingElement) return;
    const endDrawing = this.drawingElement.endDraw();
    if (!endDrawing) return

    const {setActiveTool} = this.appContext
    setActiveTool('selection');
    this.drawingElement = null
  }
}
