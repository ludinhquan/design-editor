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

  onMouseDown() {
    if (this.instance && this.instance.text.length > 0) return
    this.canvas.remove(this.instance)
    this.canvas.off('mouse:down', this.onMouseDown.bind(this))
  }

  create(option: TextOption) {
    const customStyles = {cursorWidth: 1, cursorColor: 'black'}
    const options = Object.assign(customStyles, option, this.defaultStyles)

    this.instance = new fabric.IText('', options)
    this.canvas.add(this.instance);
    this.canvas.setActiveObject(this.instance)
    this.instance.enterEditing()

    this.canvas.on('mouse:down', this.onMouseDown.bind(this))
  }

  // do not anything
  public update() {}

  public endDraw(): boolean {
    return true
  }
}
