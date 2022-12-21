import {FabricCanvas, FabricEvent} from "../type";
import {BaseElement} from "./BaseElement";

export class FreeDrawElement 
  extends BaseElement {

  constructor(
    canvas: FabricCanvas,
    event: FabricEvent
  ) {
    super(canvas, event)
  }

  create(_: FabricEvent) {
    this.canvas.isDrawingMode = true
    this.canvas.freeDrawingBrush.color = 'purple'
    this.canvas.freeDrawingBrush.width = 10
  }

  update(_: FabricEvent) {}

  disable(): void {
    super.disable()
    this.canvas.isDrawingMode = false
  }
}

