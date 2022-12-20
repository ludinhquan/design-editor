import {IAppContext} from "@/contexts";
import {ArrowElement, BaseElement, DiamondElement, EllipseElement, RectangleElement} from "./Element";
import {LineElement} from "./Element/LineElement";
import {FabricCanvas, FabricEvent} from "./type";

export class CanvasInstance {
  private appContext: IAppContext

  private eventState: {
    drawing: false
  }

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

  public setAppContext(appContext: IAppContext) {
    this.appContext = appContext
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
    const {activeTool} = this.appContext
    if (this.element) this.element.update(event);
  }

  private element: BaseElement 

  private onMouseDown(event: FabricEvent) {
    const {activeTool, setActiveTool} = this.appContext;

    if (activeTool === 'rectangle') this.element = new RectangleElement(this.canvas);
    if (activeTool === 'diamond') this.element = new DiamondElement(this.canvas);
    if (activeTool === 'ellipse') this.element = new EllipseElement(this.canvas);
    if (activeTool === 'arrow') this.element = new ArrowElement(this.canvas);
    if (activeTool === 'line') this.element = new LineElement(this.canvas);

    if (this.element) {
      this.element.initialize(event);
      setActiveTool('selection')
    }
  }

  private onMouseUp(event: FabricEvent) {
    const {activeTool} = this.appContext
    this.element = null
  }
}
