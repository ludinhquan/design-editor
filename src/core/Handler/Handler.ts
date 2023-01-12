import {Actions} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {FabricCanvas} from "../type";
import {ActionHandler} from "./ActionHandler";
import {BaseHandler} from "./BaseHandler";
import {ElementHandler} from "./ElementHandler";
import {KeyboardHandler} from "./KeyboardHandler";
import {SelectionHandler} from "./SelectionHandler";

export type HandlerState = {
  disableKeyboard: boolean
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

  constructor(canvas: FabricCanvas) {
    this.elementHandler = new ElementHandler(canvas);
    this.selectionHandler = new SelectionHandler(canvas);
    this.actionHandler = new ActionHandler(canvas);
    this.keyboardHandler = new KeyboardHandler(canvas);

    this.handlers = [
      this.elementHandler,
      this.selectionHandler,
      this.actionHandler,
      this.keyboardHandler
    ]

    this.handlers.map(handler => handler.setHandlerState(this.state));
  }

  public enableKeyboardEvent = () => {
    this.state.disableKeyboard = false
  }

  public disableKeyboardEvent = () => {
    this.state.disableKeyboard = true

    this.handlers.map(handler => handler.setHandlerState(this.state));
  }

  public changeAppState(state: IAppContext, keys: StateChangedKey[]) {
    this.handlers.map(handler => handler.setAppState(state, keys));
  }

  public executeAction(action: Actions) {
    this.handlers.map(handler => handler.executeAction(action));
  }
}
