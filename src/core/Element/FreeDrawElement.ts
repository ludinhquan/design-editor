import {fabric} from "fabric";
import {FabricCanvas, FabricEvent, LineOption} from "../type";
import {BaseElement} from "./BaseElement";

export class FreeDrawElement extends BaseElement {
  instance: fabric.Line
  options: Partial<LineOption>

  constructor(
    canvas: FabricCanvas,
  ) {
    super(canvas)
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

