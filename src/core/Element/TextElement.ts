import {fabric} from "fabric";
import {FabricCanvas, TextOption} from "../type";
import {BaseElement} from "./BaseElement";

export class TextElement extends BaseElement<fabric.IText, TextOption> {
  constructor(
    canvas: FabricCanvas,
    option: TextOption
  ) {
    super(canvas, option)
  }

  create(option: TextOption) {

    this.option = {
      left: option.left,
      top: option.top,
      originX: 'left',
      originY: 'top',
    }

    this.instance = new fabric.IText('', this.option)
    this.canvas.add(this.instance);
  }

  // do not anything
  public update() {}

  public endDraw(): boolean {
    this.instance.enterEditing()
    return true
  }
}
