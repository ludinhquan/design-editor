import {fabric} from "fabric";
import {ArrowOption, FabricCanvas, IMouseMoveEvent} from "../type";
import {BaseElement} from "./BaseElement";

const Arrow = fabric.util.createClass(fabric.Line, {
  type: 'arrow',
  superType: 'drawing',
  initialize(points: any, options: any) {
    if (!points) {
      const {x1, x2, y1, y2} = options;
      points = [x1, y1, x2, y2];
    }
    options = options || {};
    this.callSuper('initialize', points, options);
  },
  _render(ctx: CanvasRenderingContext2D) {
    this.callSuper('_render', ctx);
    ctx.save();
    const xDiff = this.x2 - this.x1;
    const yDiff = this.y2 - this.y1;
    const angle = Math.atan2(yDiff, xDiff);
    ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    // Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    ctx.moveTo(5, 0);
    ctx.lineTo(-5, 5);
    ctx.lineTo(-5, -5);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();
    ctx.restore();
  },
});

export class ArrowElement 
  extends BaseElement<typeof Arrow, ArrowOption> {
  constructor(
    canvas: FabricCanvas,
    option: ArrowOption
  ) {
    super(canvas, option)
  }

  create(option: ArrowOption) {
    const options = Object.assign(option, this.defaultStyles)

    this.instance = new Arrow([option.left, option.top, option.left, option.top], options);
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
    });
    this.canvas.renderAll();
  }
}

