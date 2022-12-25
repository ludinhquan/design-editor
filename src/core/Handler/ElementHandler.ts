import {ShapeType} from "@/constants";
import {IAppContext} from "@/contexts";
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


  constructor(
    canvas: FabricCanvas
  ) {
    super(canvas)
    this.registerHandlers()
  }

  setState(appContext: IAppContext): void {
    super.setState(appContext)

    const {appState} = appContext;
    const styles = {
      stroke: appState.strokeColor,
      fill: appState.backgroundColor,
      strokeWidth: appState.strokeWidth,
      opacity: appState.opacity / 100,
      rx: appState.roughness,
      ry: appState.roughness
    }

    console.log(styles)
    this.canvas.getActiveObjects().map(item => {
      item.set(styles)
    });

    this.canvas.requestRenderAll()
  }

  private getElementOption(event: IMouseMoveEvent) {
    const {appState} = this.state

    const options: Partial<GenericOptions> = {
      left: event.x,
      top: event.y,
      stroke: appState.strokeColor,
      fill: appState.backgroundColor,
      strokeWidth: appState.strokeWidth,
      opacity: appState.opacity / 100,
      rx: appState.roughness,
      ry: appState.roughness
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

    const {setActiveTool} = this.state
    setActiveTool('selection');
    this.drawingElement = null
  }
}
