import {CURSOR_TYPE, isEscape, ShapeType} from "@/constants";
import {IAppContext} from "@/contexts";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, ImageElement, LineElement, RectangleElement, TextElement} from "../Element";
import {FabricCanvas, FabricEvent, GenericOptions, IMouseMoveEvent} from "../type";
import {BaseHandler} from "./BaseHandler";

export class ElementHandler extends BaseHandler {
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

  constructor(
    canvas: FabricCanvas
  ) {
    super(canvas)
    this.registerHandlers()
  }

  setState(appContext: IAppContext): void {
    super.setState(appContext)

    this.canvas.getActiveObjects().map(item => {
      const element = this.elements.get(item.id);
      if (!element) return;
      element.updateStyles(this.getShapeStyles())
    });

    this.canvas.requestRenderAll()
  }

  getShapeStyles() {
    const {appState} = this.state
    return {
      stroke: appState.strokeColor,
      fill: appState.backgroundColor,
      strokeWidth: appState.strokeWidth,
      opacity: appState.opacity / 100,
      rx: appState.roughness,
      ry: appState.roughness
    }
  }

  private getElementOption(event: IMouseMoveEvent) {
    const {currentImage} = this.state;
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

    document.addEventListener('keydown', (e) => {
      if (!isEscape(e.key)) return
      const {setActiveTool} = this.state
      setActiveTool('selection')
    })
  }

  private onMouseDown(event: FabricEvent) {
    const Element = this.shapes[this.activeTool];
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
    console.log(endDrawing)
    if (!endDrawing) return

    const {setActiveTool} = this.state
    setActiveTool('selection');
    this.elements.set(this.drawingElement.id, this.drawingElement);
    this.drawingElement = null
  }
}
