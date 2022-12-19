import {FabricEvent} from "../type";

export abstract class BaseElement {
  abstract initialize(event: FabricEvent): void
  abstract update(event: FabricEvent): void
}
