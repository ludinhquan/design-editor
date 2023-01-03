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

  async create(option: ImageOption) {
    await new Promise((res) => {
      const {width, height, ...options} = Object.assign(option, this.defaultStyles)
      if(!option.image) return res(null)
      fabric.Image.fromURL(option.image, (image) => {
        image.set(options)
        this.instance = image
        this.canvas.add(this.instance);
        res(this.instance)
      });
    })
  }

  update(_: IMouseMoveEvent) {}

  endDraw(): boolean {
    if(!this.instance) return false
    this.canvas.setActiveObject(this.instance)
    return true
  }
}
