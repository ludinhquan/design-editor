import {CURSOR_TYPE} from "@/constants";
import {FabricCanvas, GenericOptions, IMouseMoveEvent} from "../type";

export abstract class BaseElement<Type extends fabric.Object = fabric.Object, Option extends GenericOptions = GenericOptions> {
  private readonly MIN_TIME_UPDATED = 3;

  protected readonly defaultStyles: Partial<GenericOptions> = {
    width: 0,
    height: 0,
    originX: 'left',
    originY: 'top',
    padding: 5,
    cornerSize: 8,
    cornerStyle: 'circle',
    cornerColor: '#ffffff',
    cornerStrokeColor: '#6965db',
    transparentCorners: false,
  }

  protected instance: Type & {id?: string}
  private updatedCount: number = 0;

  constructor(protected canvas: FabricCanvas, protected option: Partial<Option>) {
    this.startDraw(option)
  }

  abstract create(event: Partial<Option>): void
  abstract update(event: IMouseMoveEvent): void

  public startDraw(event: Partial<Option>) {
    this.create(event)
    this.instance.controls.mtr.offsetY = -20;
    this.instance.controls.mtr.cursorStyle = CURSOR_TYPE.GRAB
    this.instance.controls.mtr.withConnection = false
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
