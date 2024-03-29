import {CURSOR_TYPE, ShapeOptions, ShapeType} from "@/constants";
import {fabric} from "fabric";
import {nanoid} from "nanoid";
import {FabricCanvas, GenericOptions, IMouseMoveEvent} from "../type";

fabric.Object.prototype.padding = 5
fabric.Object.prototype.cornerSize= 8;
fabric.Object.prototype.cornerStyle= 'circle';
fabric.Object.prototype.cornerColor= '#ffffff';
fabric.Object.prototype.cornerStrokeColor= '#6965db';
fabric.Object.prototype.transparentCorners= false;
fabric.Object.prototype.controls.mtr.offsetY = -20;
fabric.Object.prototype.controls.mtr.cursorStyle = CURSOR_TYPE.GRAB
fabric.Object.prototype.controls.mtr.withConnection = false

export abstract class BaseElement<Type extends fabric.Object = fabric.Object, Option extends GenericOptions = GenericOptions> {
  private readonly MIN_TIME_UPDATED = 3;
  public readonly id = nanoid()

  protected readonly defaultStyles: Partial<GenericOptions> = {
    width: 0,
    height: 0,
    originX: 'left',
    originY: 'top',
  }

  protected instance: Type
  private updatedCount: number = 0;

  abstract create(event: Partial<Option>): void | Promise<void>
  abstract update(event: IMouseMoveEvent): void

  constructor(protected canvas: FabricCanvas, protected option: Partial<Option>) {
    this.startDraw(option)
  }

  getStyles(appState: Partial<ShapeOptions>) {
    return {
      stroke: appState.strokeColor,
      fill: appState.backgroundColor,
      strokeWidth: appState.strokeWidth,
      // strokeDashArray: this.borderDashArray[appState.strokeStyle],
      opacity: appState.opacity / 100,
      rx: appState.roundness,
      ry: appState.roundness,
      fontSize: appState.fontSize,
      fontFamily: appState.fontFamily,
    }
  }

  updateStyles(shapeStyle: Partial<Record<keyof Type, any>>) {
    this.instance.set(shapeStyle)
  }

  public async startDraw(option: Partial<Option>) {
    await this.create(option)
    if(!this.instance) return
    this.instance.id = this.id;
    this.instance.itemType = option.itemType;
  }

  public drawing(event: IMouseMoveEvent) {
    this.update(event)
    this.updatedCount++;
  }

  public endDraw(): boolean {
    if (this.updatedCount < this.MIN_TIME_UPDATED) {
      this.delete();
      return false
    }
    this.canvas.setActiveObject(this.instance);
    return true
  }

  public delete() {
    this.canvas.remove(this.instance);
  }
}
