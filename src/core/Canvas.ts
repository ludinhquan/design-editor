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
    height: 742,
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

  public loadFromJSON(json: any) {
    const ratio = json.width / json.height;
    const height = 742;
    const width = height * ratio;
    // const zoom = width / json.width;
    const zoom = .39

    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.setZoom(zoom);

    this.canvas.loadFromJSON(json, () => {})
  }

  public setAppContext(appContext: IAppContext) {
    console.log(this.constructor.name, "setAppContext")

    this.setState(appContext);
    // update canvas style when change active tool

    this.handlers.map(item => item.setState(appContext));

    this.updateCanvasStyle();
  }

  private getCursor(): string {
    const {activeTool, image} = this.state
    if(this.isSelectionMode) return CURSOR_TYPE.AUTO;
    
    const loadingImage = activeTool === 'image' && !!image
    if (loadingImage) return CURSOR_TYPE.WAIT

    return CURSOR_TYPE.CROSSHAIR
  }

  private updateCanvasStyle() {
    const cursor = this.getCursor()
    this.canvas.defaultCursor = cursor
    this.canvas.hoverCursor = cursor
    this.canvas.selectionColor = this.isSelectionMode ? this.canvasOptions.selectionColor : 'transparent'
    this.canvas.selectionBorderColor = this.isSelectionMode ? this.canvasOptions.selectionBorderColor : 'transparent'
    this.canvas.isDrawingMode = this.isFreeDrawMode
  }

  private initOptions() {
    const {width, height, ...options} = this.canvasOptions;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    
    this.canvas.backgroundColor = options.backgroundColor;
    this.canvas.selectionColor = options.selectionColor;
    this.canvas.selectionBorderColor = options.selectionBorderColor;
    this.canvas.selectionLineWidth = options.selectionLineWidth;
    this.canvas.selectionFullyContained = options.selectionFullyContained;
  }
}

