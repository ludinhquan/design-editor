import {IAppContext} from "@/contexts";
import {EditorState} from "../EditorData";
import {FabricCanvas} from "../type";

export abstract class BaseHandler extends EditorState {
  abstract onAppStateChange(appContext: IAppContext, oldContext: IAppContext): void

  constructor(protected canvas: FabricCanvas) {super()}

  setState(appContext: IAppContext): void {
    const oldContext = {...this.state}
    super.setState(appContext)
    this.onAppStateChange(appContext, oldContext)
  }
}
