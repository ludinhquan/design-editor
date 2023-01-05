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

  private onSelection() {
    const activeObjects = this.canvas.getActiveObjects();

    activeObjects.map(item => {
      if (item.group) item.group.borderDashArray = [3, 3];
      if (item.type === 'group') item.borderDashArray = [3, 3];
    });

    this.canvas.renderAll()
  }
}
