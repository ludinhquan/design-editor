import {fabric} from "fabric";
import {EllipseOption, FabricCanvas, IMouseMoveEvent} from "../type";
import {BaseElement} from "./BaseElement";

export class EllipseElement 
  extends BaseElement<fabric.Ellipse, EllipseOption> {
  constructor(
    canvas: FabricCanvas,
    option: EllipseOption
  ) {
    super(canvas, option)
  }

  create(option: EllipseOption) {
    const options = Object.assign(option, this.defaultStyles)
    this.instance = new fabric.Ellipse(options);
    this.canvas.add(this.instance);
  }

  updateStyles(shapeStyle: Partial<Record<keyof fabric.Ellipse, any>>): void {
    const {rx, ry, ...restStyle} = shapeStyle
    this.instance.set(restStyle)
  }

  update(event: IMouseMoveEvent) {
    const {left, top, originX, originY} = this.option

    this.instance.set({
      originX: left < event.x ? originX : 'right',
      originY: top < event.y ? originY : 'bottom',
      rx: Math.abs(left - event.x) / 2,
      ry: Math.abs(top - event.y) / 2,
    })
   
   this.canvas.renderAll();
  }
}
