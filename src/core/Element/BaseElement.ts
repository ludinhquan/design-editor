import {FabricCanvas, FabricEvent} from "../type";

export abstract class BaseElement {
  private state = {
    isDrawing: false
  }

  constructor(protected canvas: FabricCanvas) {}

  abstract create(event: FabricEvent): void
  abstract update(event: FabricEvent): void

  get isDrawingMode() {
    return this.state.isDrawing
  }

  enable() {
    this.state.isDrawing = true
  }

  disable() {
    this.state.isDrawing = false
  }
}
