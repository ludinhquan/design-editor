import {nanoid} from "nanoid";
import {FabricCanvas, FabricEvent, GenericOptions} from "../type";

export abstract class BaseElement<Type extends fabric.Object = fabric.Object, Option extends GenericOptions = GenericOptions> {
  protected instance: Type & {id?: string}
  protected option: Partial<Option>

  private state = {
    isDrawing: false
  }

  constructor(protected canvas: FabricCanvas, event: FabricEvent) {
    this.create(event)
    this.instance.id = nanoid()
  }

  abstract create(event: FabricEvent): void
  abstract update(event: FabricEvent): void

  public delete() {
    this.canvas.remove(this.instance);
  }

  enable() {
    this.state.isDrawing = true
  }

  disable() {
    this.state.isDrawing = false
  }
}
