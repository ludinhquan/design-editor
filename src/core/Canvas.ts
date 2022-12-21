import {CURSOR_TYPE} from "@/constants";
import {IAppContext} from "@/contexts";
import {BaseHandler} from "./Handler/BaseHandler";
import {ElementHandler} from "./Handler/ElementHandler";
import {FabricCanvas} from "./type";

export class CanvasInstance {
  private handlers: BaseHandler[]

  private readonly canvasOptions: fabric.ICanvasOptions = {
    backgroundColor: '#ffffff',
    width: 412,
    height: 711,
    selectionColor: '#6965db1a',
    selectionBorderColor: '#6965db',
    selectionLineWidth: 0.5,
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
    this.canvas.setWidth(this.canvasOptions.width)
    this.canvas.setHeight(this.canvasOptions.height);
    this.canvas.backgroundColor = this.canvasOptions.backgroundColor;
    this.canvas.selectionColor = this.canvasOptions.selectionColor;
    this.canvas.selectionBorderColor = this.canvasOptions.selectionBorderColor;
    this.canvas.selectionLineWidth = this.canvasOptions.selectionLineWidth;
  }
}
