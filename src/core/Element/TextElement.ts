import {fabric} from "fabric";
import {nanoid} from "nanoid";
import {FabricCanvas, FabricEvent, TextOption} from "../type";
import {BaseElement} from "./BaseElement";

export class TextElement extends BaseElement {
  instance: fabric.IText;
  options: Partial<TextOption>

  constructor(
    canvas: FabricCanvas,
  ) {
    super(canvas)
  }

  create(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.options = {
      id: nanoid(),
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'top',
      editable: true
    }

    this.instance = new fabric.IText('', this.options)
    this.canvas.add(this.instance);
    this.canvas.setActiveObject(this.instance);

    this.instance.enterEditing();
  }

  update(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);
    const {left, top, originX, originY} = this.options

    this.canvas.renderAll();
  }
}
