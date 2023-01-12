import {Actions} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {EditorState} from "../EditorData";
import {FabricCanvas} from "../type";

export abstract class BaseHandler extends EditorState {
  abstract onAppStateChange(appContext: IAppContext, oldContext: IAppContext, states: StateChangedKey[]): void
  
  constructor(protected canvas: FabricCanvas) {super()}

  executeAction(action: Actions){}

  setAppState(appContext: IAppContext, states: StateChangedKey[]): void {
    const oldContext = {...this.state}
    super.setAppState(appContext, states)
    this.onAppStateChange(appContext, oldContext, states)
  }
}
