import {Actions} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {CanvasInstance} from "../Canvas";
import {ActionHandler} from "./ActionHandler";
import {BaseHandler} from "./BaseHandler";
import {ElementHandler} from "./ElementHandler";
import {KeyboardHandler} from "./KeyboardHandler";
import {SelectionHandler} from "./SelectionHandler";

export type HandlerState = {
  disableKeyboard: boolean,
}

export class Handler {
  private readonly elementHandler: ElementHandler;
  private readonly selectionHandler: SelectionHandler;
  private readonly actionHandler: ActionHandler;
  private readonly keyboardHandler: KeyboardHandler;

  private readonly handlers: BaseHandler[]

  private state: HandlerState = {
    disableKeyboard: false
  }

  constructor(public canvasInstance: CanvasInstance) {
    this.elementHandler = new ElementHandler(this);
    this.selectionHandler = new SelectionHandler(this);
    this.actionHandler = new ActionHandler(this);
    this.keyboardHandler = new KeyboardHandler(this);

    this.handlers = [
      this.elementHandler,
      this.selectionHandler,
      this.actionHandler,
      this.keyboardHandler
    ]
  }

  public enableKeyboardEvent = () => {
    this.state.disableKeyboard = false
  }

  public disableKeyboardEvent = () => {
    this.state.disableKeyboard = true
  }

  public onUpdateAppContext(keys: StateChangedKey[], oldContext: IAppContext) {
    this.handlers.map(handler => handler.onUpdateAppContext(keys, oldContext));
  }

  public executeAction(action: Actions) {
    this.handlers.map(handler => handler.executeAction(action));
  }
}
