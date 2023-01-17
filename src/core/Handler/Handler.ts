import {Actions} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {CanvasInstance} from "../Canvas";
import {ActionHandler} from "./ActionHandler";
import {BaseHandler} from "./BaseHandler";
import {ElementHandler} from "./ElementHandler";
import {KeyboardHandler} from "./KeyboardHandler";
import {EventHandler} from "./EventHandler";

export class Handler {
  public readonly elementHandler: ElementHandler;
  public readonly eventHandler: EventHandler;
  public readonly actionHandler: ActionHandler;
  public readonly keyboardHandler: KeyboardHandler;

  private readonly handlers: BaseHandler[]

  constructor(public canvasInstance: CanvasInstance) {
    this.elementHandler = new ElementHandler(this);
    this.eventHandler = new EventHandler(this);
    this.actionHandler = new ActionHandler(this);
    this.keyboardHandler = new KeyboardHandler(this);

    this.handlers = [
      this.elementHandler,
      this.eventHandler,
      this.actionHandler,
      this.keyboardHandler
    ]
  }

  public onAppContextUpdated(keys: StateChangedKey[], oldContext: IAppContext) {
    this.handlers.map(handler => handler.onUpdateAppContext(keys, oldContext));
  }

  public executeAction(action: Actions) {
    this.handlers.map(handler => handler.executeAction(action));
  }
}
