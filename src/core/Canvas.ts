import {Actions, CURSOR_TYPE} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {Handler} from "./Handler";
import {FabricCanvas} from "./type";

export class CanvasInstance {
  readonly #handler: Handler;
  readonly #canvas: FabricCanvas;

  #appContext: IAppContext;

  readonly #canvasOptions: fabric.ICanvasOptions = {
    backgroundColor: '#ffffff',
    width: 412,
    height: 712,
    selectionColor: '#6965db1a',
    selectionBorderColor: '#6965db',
    selectionLineWidth: 0.5,
    selectionFullyContained: true,
  }
  
  get canvas() {return this.#canvas}

  get appContext() {return this.#appContext}

  get isSelectionMode() {return this.#appContext.activeTool === 'selection'}

  get isFreeDrawMode() {return this.#appContext.activeTool === 'freedraw'}

  constructor(canvas: FabricCanvas) {
    this.#canvas = canvas;
    this.#handler = new Handler(this);
    this.initOptions();
  }

  public loadFromJSON(json: any) {
    const ratio = json.width / json.height;
    const height = 742;
    const width = height * ratio;
    const zoom = .39
    
    this.#canvas.setWidth(width);
    this.#canvas.setHeight(height);
    this.#canvas.setZoom(zoom);
    this.#canvas.loadFromJSON(json, () => {})
  }


  private timeOut: NodeJS.Timeout = null
  private changedKeys: StateChangedKey[] = []

  public setAppContext(appContext: IAppContext, changedKey: StateChangedKey) {
    if (this.timeOut) {
      this.changedKeys.push(changedKey)
      clearTimeout(this.timeOut)
    }

    this.timeOut = setTimeout(() => {
      console.log("StateChangedEvent", this.changedKeys)

      const oldState = {...this.#appContext};

      this.#appContext = appContext;
      this.#handler.onUpdateAppContext(this.changedKeys, oldState)

      if (this.changedKeys.includes("activeTool")) this.updateCanvasStyle();

      this.changedKeys = [];
    })
  }

  public executeAction(action: Actions) {
    this.#handler.executeAction(action);
  }

  private getCursor(): string {
    const {activeTool, image} = this.#appContext
    if(this.isSelectionMode) return CURSOR_TYPE.AUTO;
    
    const loadingImage = activeTool === 'image' && !!image
    if (loadingImage) return CURSOR_TYPE.WAIT

    return CURSOR_TYPE.CROSSHAIR
  }

  private updateCanvasStyle() {
    const cursor = this.getCursor()
    this.#canvas.defaultCursor = cursor
    this.#canvas.hoverCursor = cursor
    this.#canvas.selectionColor = this.isSelectionMode ? this.#canvasOptions.selectionColor : 'transparent'
    this.#canvas.selectionBorderColor = this.isSelectionMode ? this.#canvasOptions.selectionBorderColor : 'transparent'
    this.#canvas.isDrawingMode = this.isFreeDrawMode
  }

  private initOptions() {
    const {width, height, ...options} = this.#canvasOptions;
    this.#canvas.setWidth(width);
    this.#canvas.setHeight(height);
    
    this.#canvas.backgroundColor = options.backgroundColor;
    this.#canvas.selectionColor = options.selectionColor;
    this.#canvas.selectionBorderColor = options.selectionBorderColor;
    this.#canvas.selectionLineWidth = options.selectionLineWidth;
    this.#canvas.selectionFullyContained = options.selectionFullyContained;
  }
}

