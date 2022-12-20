import {IAppContext} from "@/contexts";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, FreeDrawElement, LineElement, RectangleElement} from "./Element";
import {TextElement} from "./Element/TextElement";
import {FabricCanvas, FabricEvent} from "./type";

export class CanvasInstance {
  private appContext: IAppContext

  private readonly canvasOptions = {
    backgroundColor: '#eee',
    width: 412,
    height: 711
  }

  constructor(
    private canvas: FabricCanvas
  ) {
    this.initialize()
    this.registerHandlers()
  }

  private setFreeDrawMode(active: boolean){
    this.canvas.isDrawingMode = active
    this.canvas.freeDrawingBrush.color = 'purple'
    this.canvas.freeDrawingBrush.width = 10
  }

  public setAppContext(appContext: IAppContext) {
    this.appContext = appContext
    this.setFreeDrawMode(appContext.activeTool === 'freedraw')
  }

  private initialize() {
    const {backgroundColor, width, height} = this.canvasOptions;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.backgroundColor = backgroundColor;
  }

  private registerHandlers = () => {
    this.canvas.on('mouse:down', this.onMouseDown.bind(this));
    this.canvas.on('mouse:move', this.onMouseMove.bind(this));
    this.canvas.on('mouse:up', this.onMouseUp.bind(this));
  }

  private onMouseMove(event: FabricEvent) {
    if(this.element) this.element.update(event);
  }

  private element: BaseElement 

  get isFreeDrawing(){
    const {activeTool} = this.appContext
    return activeTool === 'freedraw'
  }

  private onMouseDown(event: FabricEvent) {
    const {activeTool, setActiveTool} = this.appContext;

    if (activeTool === 'rectangle') this.element = new RectangleElement(this.canvas);
    if (activeTool === 'diamond') this.element = new DiamondElement(this.canvas);
    if (activeTool === 'ellipse') this.element = new EllipseElement(this.canvas);
    if (activeTool === 'arrow') this.element = new ArrowElement(this.canvas);
    if (activeTool === 'line') this.element = new LineElement(this.canvas);
    if (activeTool === 'text') this.element = new TextElement(this.canvas);

    if (this.element)  this.element.create(event);

    if (!this.isFreeDrawing) setActiveTool('selection')
  }

  private onMouseUp() {
    this.element = null
  }
}
