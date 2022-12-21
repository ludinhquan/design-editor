import {fabric} from "fabric";
import {FabricCanvas, FabricEvent, RectangleOption} from "../type";
import {BaseElement} from "./BaseElement";

export class RectangleElement 
  extends BaseElement<fabric.Rect, RectangleOption> {

  constructor(
    canvas: FabricCanvas,
    event: FabricEvent,
  ) {
    super(canvas, event)
  }

  create(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.option = {
      originX: 'left',
      originY: 'top',
      left: pointer.x,
      top: pointer.y,
      width: 0,
      height: 0,
      angle: 0,
      fill: 'black',
      opacity: 0.3,
    }

    this.instance = new fabric.Rect(this.option);
    this.canvas.add(this.instance);
  }

  update(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);
    const {left, top, originX, originY} = this.option

    this.instance.set({
      width: Math.abs(left - pointer.x),
      height: Math.abs(top - pointer.y),
      originX: left < pointer.x ? originX : 'right',
      originY: top < pointer.y ? originY : 'bottom',
    })

    this.canvas.renderAll();
  }
}
