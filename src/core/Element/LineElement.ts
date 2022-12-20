import {fabric} from "fabric";
import {FabricCanvas, FabricEvent, LineOption} from "../type";
import {BaseElement} from "./BaseElement";

export class LineElement extends BaseElement {
  instance: fabric.Line
  options: Partial<LineOption>

  constructor(private canvas: FabricCanvas) {
    super()
  }

  initialize(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.options = {
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'top',
      width: 0,
      height: 0,
      angle: 0,
      fill: 'black',
      stroke: 'black',
      opacity: 0.3
    }

    this.instance = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], this.options);

    this.canvas.add(this.instance);
  }

  update(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);
    const {left, top, originX, originY} = this.options

    this.instance.set({
      x1: left,
      y1: top,
      x2: pointer.x,
      y2: pointer.y,
      originX: left < pointer.x ? originX : 'right',
      originY: top < pointer.y ? originY : 'bottom',
    })

    this.canvas.renderAll();
  }

}

