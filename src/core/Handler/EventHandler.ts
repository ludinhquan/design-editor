import {FabricCanvas} from "../type";
import {BaseHandler} from "./BaseHandler";

export class SelectionHandler extends BaseHandler {

  constructor(
    canvas: FabricCanvas
  ) {
    super(canvas)
    this.registerHandlers()
  }

  onAppStateChange(): void {}

  private registerHandlers = () => {
    this.canvas.on('selection:created', this.onSelection.bind(this));
    this.canvas.on('selection:updated', this.onSelection.bind(this));
  }

  private getActiveObjectTypes(activeObjects: fabric.Object[]) {
    console.log('=============================================')
    console.log(this.canvas.getActiveObject().type)
    console.log(activeObjects.map(item => ({
      type: item.type,
      stroke: item.stroke,
      fill: item.backgroundColor,
      strokeWidth: item.strokeWidth,
      strokeStyle: item.strokeDashArray,
      opacity: item.opacity,
      // @ts-ignore
      fontSize: item.fontSize,
      // @ts-ignore
      fontFamily: item.fontFamily,
    })));
  }

  private onSelection() {
    const activeObjects = this.canvas.getActiveObjects();
    this.getActiveObjectTypes(activeObjects)

    activeObjects.map(item => {
      if (item.group && !item.group.borderDashArray) item.group.borderDashArray = [3, 3];
      if (item.type === 'group' && !item.borderDashArray) item.borderDashArray = [3, 3];
    });

    this.canvas.renderAll()
  }
}
