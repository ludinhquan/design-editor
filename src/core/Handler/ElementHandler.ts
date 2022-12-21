import {ShapeType} from "@/constants";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, FreeDrawElement, LineElement, RectangleElement, TextElement} from "../Element";
import {FabricCanvas, FabricEvent} from "../type";
import {BaseHandler} from "./BaseHandler";

export class ElementHandler extends BaseHandler {
  private readonly elements: Partial<Record<ShapeType, ClassType<BaseElement>>> = {
    'rectangle': RectangleElement,
    'diamond': DiamondElement,
    'ellipse': EllipseElement,
    'arrow': ArrowElement,
    'line': LineElement,
    'freedraw': FreeDrawElement,
    'text': TextElement,
  }

  private drawingElement: BaseElement;

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
    this.canvas.on('selection:created', this.selectionCreated.bind(this));
    this.canvas.on('selection:updated', this.selectionUpdated.bind(this));
  }

  private onMouseDown(event: FabricEvent) {
    const {activeTool, setActiveTool} = this.appContext;

    const element = this.elements[activeTool];
    if (!element) return;

    this.drawingElement = new element(this.canvas, event);
    setActiveTool('selection');
  }

  private onMouseMove(event: FabricEvent) {
    if (!this.drawingElement) return;

    this.drawingElement.update(event);
  }

  private onMouseUp() {
    this.drawingElement = null;
    // this.drawingElement.delete()
  }

  private selectionCreated(objects: any) {
    console.log(objects)
    console.log('selectionCreated')
  }

  private selectionUpdated(){
    console.log('selectionUpdated')
  }
}
