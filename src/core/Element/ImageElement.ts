import {fabric} from "fabric";
import {FabricCanvas, ImageOption, IMouseMoveEvent} from "../type";
import {BaseElement} from "./BaseElement";

export class ImageElement extends BaseElement<fabric.Image, ImageOption> {
  constructor(
    canvas: FabricCanvas,
    option: ImageOption,
  ) {
    super(canvas, option)
  }

  create(option: ImageOption) {
    const {width, height, ...options} = Object.assign(option, this.defaultStyles)
    this.instance = new fabric.Image(option.image, options);
    this.canvas.add(this.instance);
  }

  update(event: IMouseMoveEvent) {}

  endDraw(): boolean {
    this.canvas.setActiveObject(this.instance)
    return true
  }
}
