import {fabric} from "fabric";
import {FabricCanvas, FabricEvent, TextOption} from "../type";
import {BaseElement} from "./BaseElement";

export class TextElement
  extends BaseElement<fabric.IText, TextOption> {
  constructor(
    canvas: FabricCanvas,
    event: FabricEvent
  ) {
    super(canvas, event)
  }

  public create(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.option = {
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'top',
    }

    this.instance = new fabric.IText('', this.option)
    this.canvas.add(this.instance);
  }

  // do not anything
  public update() {}

  public endDraw(): boolean {
    this.instance.enterEditing()
    return true
  }
}
