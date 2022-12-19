import {fabric} from "fabric";
import {FabricCanvas, FabricEvent, RectangleOption} from "../type";
import {BaseElement} from "./BaseElement";

function regularPolygonPoints(sideCount: number, x: number, y: number, x1: number, y1: number) {
  const points = [
    {x: x, y: y},
    {x: x1, y: y1},
    {x: x1 + 10, y: y1 + 10},
    {x: x1 + 30, y: y1 + 30},
  ];
  return (points);
}

export class DiamondElement extends BaseElement {
  instance: fabric.Polygon;
  options: Partial<RectangleOption>

  constructor(
    private canvas: FabricCanvas,
  ) {super()}

  initialize(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);

    this.options = {
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'bottom',
      angle: 0,
      fill: 'black',
      opacity: 0.3
    }
    const points = regularPolygonPoints(4, 0, 0, 0, 0);

    this.instance = new fabric.Polygon(points, this.options);
    this.canvas.add(this.instance);
  }

  update(event: FabricEvent) {
    const pointer = this.canvas.getPointer(event.e);
    const {left, top, originX, originY} = this.options

    const x = pointer.x
    const y = pointer.y

    const points = regularPolygonPoints(4, left, top, x, y);
    console.log(points)

    this.instance.set({
      points: points.map(point => new fabric.Point(point.x, point.y)),
      originX: left < pointer.x ? originX : 'right',
      originY: top < pointer.y ? originY : 'bottom',
    })

    this.canvas.renderAll();
  }
}
