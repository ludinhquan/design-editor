import {fabric} from "fabric";
import {DiamondOption, FabricCanvas, IMouseMoveEvent} from "../type";
import {BaseElement} from "./BaseElement";

export class DiamondElement extends BaseElement<fabric.Polygon, DiamondOption> {
  constructor(
    canvas: FabricCanvas,
    option: DiamondOption,
  ) {
    super(canvas, option)
  }

  private getPoints(x: number, y: number, width: number, height: number){
    const points = [
      {x: x, y: y - height / 2},
      {x: x + width / 2, y: y},
      {x: x, y: y + height  / 2},
      {x: x - width / 2, y: y},
    ];
    return (points);
  }

  create(option: DiamondOption) {
    const options = Object.assign(option, this.defaultStyles)
    const points = this.getPoints(option.left, option.top, 0, 0);
    this.instance = new fabric.Polygon(points, options);
    this.canvas.add(this.instance);
  }

  update(event: IMouseMoveEvent) {
    const {left, top, originX, originY} = this.option

    const width = Math.abs(left - event.x);
    const height = Math.abs(top - event.y);

    const points = this.getPoints(left, top, width, height);

    this.instance.set({
      width,
      height,
      points: points.map(point => new fabric.Point(point.x, point.y)),
      originX: left < event.x ? originX : 'right',
      originY: top < event.y ? originY : 'bottom',
    });

    this.canvas.renderAll();
  }
}
