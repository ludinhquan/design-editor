import {Actions} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {EditorState} from "../EditorData";
import {FabricCanvas} from "../type";
import {HandlerAction} from "./Handler";

export abstract class BaseHandler extends EditorState {
  abstract onAppStateChange(appContext: IAppContext, oldContext: IAppContext, states: StateChangedKey[]): void
  
  constructor(protected canvas: FabricCanvas, protected handlerAction: HandlerAction) {super()}

  executeAction(action: Actions){}

  setAppState(appContext: IAppContext, states: StateChangedKey[]): void {
    const oldContext = {...this.state}
    super.setAppState(appContext, states)
    this.onAppStateChange(appContext, oldContext, states)
  }
}
