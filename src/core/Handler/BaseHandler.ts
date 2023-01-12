import {Actions} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {EditorState} from "../EditorData";
import {FabricCanvas} from "../type";
import {HandlerState} from "./Handler";

export abstract class BaseHandler extends EditorState {
  abstract onAppStateChange(appContext: IAppContext, oldContext: IAppContext, states: StateChangedKey[]): void
  
  protected handlerState: HandlerState

  constructor(protected canvas: FabricCanvas) {super()}

  executeAction(action: Actions){}

  setHandlerState(state: HandlerState) {
    this.handlerState = state
  }

  setAppState(appContext: IAppContext, states: StateChangedKey[]): void {
    const oldContext = {...this.state}
    super.setAppState(appContext, states)
    this.onAppStateChange(appContext, oldContext, states)
  }
}
