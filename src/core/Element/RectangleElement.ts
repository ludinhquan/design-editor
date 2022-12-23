import {fabric} from "fabric";
import {FabricCanvas, IMouseMoveEvent, RectangleOption} from "../type";
import {BaseElement} from "./BaseElement";

export class RectangleElement extends BaseElement<fabric.Rect, RectangleOption> {

  constructor(
    canvas: FabricCanvas,
    option: RectangleOption,
  ) {
    super(canvas, option)
  }

  create(option: RectangleOption) {
    this.instance = new fabric.Rect(option);
    this.canvas.add(this.instance);
  }

  update(event: IMouseMoveEvent) {
    const {left, top, originX, originY} = this.option

    this.instance.set({
      width: Math.abs(left - event.x),
      height: Math.abs(top - event.y),
      originX: left < event.x ? originX : 'right',
      originY: top < event.y ? originY : 'bottom',
    })

    this.canvas.renderAll();
  }
}
