import {Actions, CURSOR_TYPE} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {FabricCanvas} from "./type";
import {ActionHandler, BaseHandler, ElementHandler, SelectionHandler} from "./Handler";
import {EditorState} from "./EditorData";

export class CanvasInstance extends EditorState {
  private handlers: BaseHandler[]

  private readonly canvasOptions: fabric.ICanvasOptions = {
    backgroundColor: '#ffffff',
    width: 412,
    height: 712,
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
      new SelectionHandler(canvas),
      new ActionHandler(canvas),
    ]
  }

  public loadFromJSON(json: any) {
    const ratio = json.width / json.height;
    const height = 742;
    const width = height * ratio;
    const zoom = .39
    
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.setZoom(zoom);
    this.canvas.loadFromJSON(json, () => {})
  }


  private timeOut: NodeJS.Timeout = null
  private stateChangedKeys: StateChangedKey[] = []

  public setAppContext(appContext: IAppContext, state: StateChangedKey) {
    if (this.timeOut) {
      this.stateChangedKeys.push(state)
      clearTimeout(this.timeOut)
    }

    this.timeOut = setTimeout(() => {
      console.log("On State Change", this.stateChangedKeys)

      this.setState(appContext, this.stateChangedKeys);

      // update canvas style when change active tool
      this.handlers.map(item => item.setState(appContext, this.stateChangedKeys));

      if (state === 'activeTool') this.updateCanvasStyle();

      this.stateChangedKeys = [];
    })
  }

  public executeAction(action: Actions) {
    this.handlers.map(item => item.executeAction(action));
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

