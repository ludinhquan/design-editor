import {CURSOR_TYPE} from "@/constants";
import {IAppContext} from "@/contexts";
import {FabricCanvas} from "./type";
import {BaseHandler, ElementHandler} from "./Handler";

export class CanvasInstance {
  private handlers: BaseHandler[]

  private readonly canvasOptions: fabric.ICanvasOptions = {
    backgroundColor: '#ffffff',
    width: 412,
    height: 711,
    selectionColor: '#6965db1a',
    selectionBorderColor: '#6965db',
    selectionLineWidth: 0.5,
    selectionFullyContained: true,
  }

  constructor(
    private canvas: FabricCanvas
  ) {
    this.initOptions()
    this.handlers = [
      new ElementHandler(canvas),
    ]
  }

  public setAppContext(appContext: IAppContext) {
    this.handlers.map(item => item.setAppContext(appContext));
    this.setFreeDrawMode(appContext.activeTool === 'freedraw');
    this.setCursor(appContext)
  }

  private setCursor(appContext: IAppContext) {
    const cursorType = appContext.activeTool === 'selection'
      ? CURSOR_TYPE.AUTO
      : CURSOR_TYPE.CROSSHAIR
    this.canvas.defaultCursor = cursorType;
  }

  private setFreeDrawMode(active: boolean) {
    this.canvas.isDrawingMode = active
  }

  private initOptions() {
    const {width, height, ...options} = this.canvasOptions;
    this.canvas.setWidth(width)
    this.canvas.setHeight(height);
    
    this.canvas.backgroundColor = options.backgroundColor;
    this.canvas.selectionColor = options.selectionColor;
    this.canvas.selectionBorderColor = options.selectionBorderColor;
    this.canvas.selectionLineWidth = options.selectionLineWidth;
    this.canvas.selectionFullyContained = options.selectionFullyContained;
  }
}
