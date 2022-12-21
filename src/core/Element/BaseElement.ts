import {nanoid} from "nanoid";
import {FabricCanvas, FabricEvent, GenericOptions} from "../type";

export abstract class BaseElement<Type extends fabric.Object = fabric.Object, Option extends GenericOptions = GenericOptions> {
  private readonly MIN_TIME_UPDATED = 3;

  protected instance: Type & {id?: string}
  protected option: Partial<Option>
  private updatedCount: number = 0;

  constructor(protected canvas: FabricCanvas, event: FabricEvent) {
    this.create(event)
    this.instance.id = nanoid()
  }

  abstract create(event: FabricEvent): void
  abstract update(event: FabricEvent): void

  public startDraw(event: FabricEvent) {
    this.create(event)
  }

  public drawing(event: FabricEvent) {
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
