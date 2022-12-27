import {fabric} from "fabric";
import {FabricCanvas, IMouseMoveEvent, LineOption} from "../type";
import {BaseElement} from "./BaseElement";

export class LineElement 
  extends BaseElement<fabric.Line, LineOption> {
  constructor(
    canvas: FabricCanvas,
    option: LineOption
  ) {
    super(canvas, option)
  }

  create(option: LineOption) {
    const options = Object.assign(option, this.defaultStyles)
    this.instance = new fabric.Line([option.left, option.top, option.left, option.top], options);
    this.canvas.add(this.instance);
  }

  update(event: IMouseMoveEvent) {
    const {left, top, originX, originY} = this.option

    this.instance.set({
      x1: left,
      y1: top,
      x2: event.x,
      y2: event.y,
      originX: left < event.x ? originX : 'right',
      originY: top < event.y ? originY : 'bottom',
    })

    this.canvas.renderAll();
  }
}

