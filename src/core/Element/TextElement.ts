import {fabric} from "fabric";
import {FabricCanvas, FabricEvent, TextOption} from "../type";
import {BaseElement} from "./BaseElement";

export class TextElement extends BaseElement<fabric.IText, TextOption> {
  constructor(
    canvas: FabricCanvas,
  ) {
    super(canvas)
  }

  create(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.option = {
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'top',
      editable: true
    }

    this.instance = new fabric.IText('', this.option)
    this.canvas.add(this.instance);
    this.canvas.setActiveObject(this.instance);
    this.instance.enterEditing();
  }

  update(event: FabricEvent) {}
}
