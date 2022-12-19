import {fabric} from "fabric";
import {nanoid} from "nanoid";
import {FabricCanvas, FabricEvent, RectangleOption} from "../type";
import {BaseElement} from "./BaseElement";

export class RectangleElement extends BaseElement {
  instance: fabric.Rect;
  options: Partial<RectangleOption>

  constructor(
    private canvas: FabricCanvas,
  ) {super()}

  initialize(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.options = {
      id: nanoid(),
      originX: 'left',
      originY: 'top',
      left: pointer.x,
      top: pointer.y,
      width: 10,
      height: 10,
      angle: 0,
      fill: 'black',
      opacity: 0.3,
    }
    this.instance = new fabric.Rect(this.options);

    this.canvas.add(this.instance);
  }

  update(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);
    const {left, top, originX, originY} = this.options
    this.instance.set({
      originX: left < pointer.x ? originX : 'right',
      originY: top < pointer.y ? originY : 'bottom',
      width: Math.abs(left - pointer.x),
      height: Math.abs(top - pointer.y)
    })

    this.canvas.renderAll();
  }
}
