import {IAppContext} from "@/contexts";
import {BaseHandler} from "./Handler/BaseHandler";
import {ElementHandler} from "./Handler/ElementHandler";
import {FabricCanvas} from "./type";

export class CanvasInstance {
  private appContext: IAppContext
  private handlers: BaseHandler[]

  private readonly canvasOptions = {
    backgroundColor: '#eee',
    width: 412,
    height: 711
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
    this.appContext = appContext
    this.handlers.map(item => item.setAppContext(appContext));

    this.setFreeDrawMode(appContext.activeTool === 'freedraw');
  }

  private setFreeDrawMode(active: boolean) {
    this.canvas.isDrawingMode = active
  }

  private initOptions() {
    const {backgroundColor, width, height} = this.canvasOptions;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.backgroundColor = backgroundColor;
  }

  // private registerHandlers = () => {
  //   this.canvas.on('mouse:down', this.onMouseDown.bind(this));
  //   this.canvas.on('mouse:move', this.onMouseMove.bind(this));
  //   this.canvas.on('mouse:up', this.onMouseUp.bind(this));
  // }
  //
  // private onMouseDown(event: FabricEvent) {
  //   console.log(this.constructor.name, 'onMouseDown')
  // }
  //
  // private onMouseMove(event: FabricEvent) {
  //   console.log(this.constructor.name, 'onMouseMove')
  // }
  //
  // private onMouseUp(event: FabricEvent) {
  //   console.log(this.constructor.name, 'onMouseUp')
  // }
}
