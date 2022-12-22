import {ShapeType} from "@/constants";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, LineElement, RectangleElement, TextElement} from "../Element";
import {FabricCanvas, FabricEvent} from "../type";
import {BaseHandler} from "./BaseHandler";

export class ElementHandler extends BaseHandler {
  private readonly elements: Partial<Record<ShapeType, ClassType<BaseElement>>> = {
    'rectangle': RectangleElement,
    'diamond': DiamondElement,
    'ellipse': EllipseElement,
    'arrow': ArrowElement,
    'line': LineElement,
    'text': TextElement,
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

  private registerHandlers = () => {
    this.canvas.on('mouse:down', this.onMouseDown.bind(this));
    this.canvas.on('mouse:move', this.onMouseMove.bind(this));
    this.canvas.on('mouse:up', this.onMouseUp.bind(this));
    this.canvas.on('selection:created', this.onDblclick.bind(this));
  }

  private onDblclick(event: FabricEvent) {
  }

  private onMouseDown(event: FabricEvent) {
    const element = this.elements[this.activeTool];
    if (!element) return;
    this.drawingElement = new element(this.canvas, event);
  }

  private onMouseMove(event: FabricEvent) {
    if (!this.drawingElement) return;

    this.drawingElement.drawing(event);
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
