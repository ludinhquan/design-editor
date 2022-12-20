import {fabric} from "fabric";
import {FabricCanvas, FabricEvent, RectangleOption} from "../type";
import {BaseElement} from "./BaseElement";

export class DiamondElement extends BaseElement {
  instance: fabric.Polygon;
  options: Partial<RectangleOption>

  constructor(
    canvas: FabricCanvas,
  ) {
    super(canvas)
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

  create(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.options = {
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'top',
      width: 0,
      height: 0,
      angle: 0,
      fill: 'black',
      opacity: 0.3
    }

    const points = this.getPoints(pointer.x, pointer.y, 0, 0);

    this.instance = new fabric.Polygon(points, this.options);

    this.canvas.add(this.instance);
  }

  update(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);
    const {left, top, originX, originY} = this.options

    const width = Math.abs(left - pointer.x);
    const height = Math.abs(top - pointer.y);

    const points = this.getPoints(left, top, width, height);

    this.instance.set({
      width,
      height,
      points: points.map(point => new fabric.Point(point.x, point.y)),
      originX: left < pointer.x ? originX : 'right',
      originY: top < pointer.y ? originY : 'bottom',
    });

    this.canvas.renderAll();
  }
}
