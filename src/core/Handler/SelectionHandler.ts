import {CURSOR_TYPE} from "@/constants";
import {fabric} from "fabric";
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
    this.canvas.on('selection:created', this.onSelect.bind(this));
    this.canvas.on('selection:updated', this.onSelect.bind(this));
  }

  private onSelect(obj: any) {
    this.canvas.getActiveObjects().map(item => {
      if (!item.group) return
      item.group.borderDashArray = [3, 3];
    })
    this.canvas.renderAll()
  }
}
