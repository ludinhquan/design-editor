import {CURSOR_TYPE} from "@/constants";
import {IAppContext} from "@/contexts";
import {FabricCanvas} from "./type";
import {BaseHandler, ElementHandler} from "./Handler";
import {EditorState} from "./EditorData";

export class CanvasInstance extends EditorState {
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

  constructor(private canvas: FabricCanvas) {
    super()

    this.initOptions()
    this.handlers = [
      new ElementHandler(canvas),
    ]
  }

  public setAppContext(appContext: IAppContext) {
    console.log(this.constructor.name, "setAppContext")

    this.setState(appContext);
    this.handlers.map(item => item.setState(appContext));

    // update canvas style when change active tool
    this.updateCanvasStyle();
  }

  private updateCanvasStyle() {
    this.canvas.defaultCursor = this.isSelectionMode ? CURSOR_TYPE.AUTO : CURSOR_TYPE.CROSSHAIR;
    this.canvas.selectionColor = this.isSelectionMode ? this.canvasOptions.selectionColor : 'transparent'
    this.canvas.selectionBorderColor = this.isSelectionMode ? this.canvasOptions.selectionBorderColor : 'transparent'
    this.canvas.isDrawingMode = this.isFreeDrawMode
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
