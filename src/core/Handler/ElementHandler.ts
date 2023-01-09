import {isEscape, ShapeType, StrokeStyle} from "@/constants";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, ImageElement, LineElement, RectangleElement, TextElement} from "../Element";
import {FabricCanvas, FabricEvent, GenericOptions, IMouseMoveEvent} from "../type";
import {BaseHandler} from "./BaseHandler";

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

  constructor(
    canvas: FabricCanvas
  ) {
    super(canvas)
    this.registerHandlers()
  }

  updateObjectStyles(objects: fabric.Object[], styles: object) {
    objects.map(object => {
      if (object.type === 'group') {
        (object as fabric.Group).getObjects().map(ele => ele.set(styles));
        return;
      }
      object.set(styles)
    })
  }

  onAppStateChange(): void {
    const styles = this.getShapeStyles()
    const objects = this.canvas.getActiveObjects();
    this.updateObjectStyles(objects, styles);
    this.canvas.requestRenderAll()
  }

  getShapeStyles() {
    const {appState} = this.state
    return {
      stroke: appState.strokeColor,
      fill: appState.backgroundColor,
      strokeWidth: appState.strokeWidth,
      strokeDashArray: this.borderDashArray[appState.strokeStyle],
      opacity: appState.opacity / 100,
      rx: appState.roundness,
      ry: appState.roundness,
      fontSize: appState.fontSize,
      fontFamily: appState.fontFamily,
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
    if (!endDrawing) return

    const {activeTool, setActiveTool, setImage} = this.state
    if (activeTool === 'image') setImage(null);
    setActiveTool('selection');
    this.elements.set(this.drawingElement.id, this.drawingElement);
    this.drawingElement = null
  }
}
