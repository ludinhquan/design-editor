import {fabric} from "fabric";
import {EllipseOption, FabricCanvas, FabricEvent} from "../type";
import {BaseElement} from "./BaseElement";
import { nanoid } from "nanoid";

export class EllipseElement extends BaseElement {
  instance: fabric.Ellipse;
  options: Partial<EllipseOption>


  constructor(
    canvas: FabricCanvas,
  ) {
    super(canvas)
  }

  create(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.options = {
      id: nanoid(),
      originX: 'left',
      originY: 'top',
      left: pointer.x,
      top: pointer.y,
      rx: 0,
      ry: 0,
      angle: 0,
      fill: 'black',
      opacity: 0.3
    }
    this.instance = new fabric.Ellipse(this.options);

    this.canvas.add(this.instance);
  }

  update(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);
    const {left, top, originX, originY} = this.options

    this.instance.set({
      originX: left < pointer.x ? originX : 'right',
      originY: top < pointer.y ? originY : 'bottom',
      rx: Math.abs(left - pointer.x) / 2,
      ry: Math.abs(top - pointer.y) / 2 
    })

   this.canvas.renderAll();
  }
}