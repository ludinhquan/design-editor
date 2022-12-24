import {IAppContext} from "@/contexts";

export class EditorState {
  private appContext: IAppContext

  get state() {
    return this.appContext
  }

  get activeTool() {
    return this.appContext.activeTool
  }

  get isSelectionMode (){
    return this.appContext.activeTool === 'selection'
  }

  get isFreeDrawMode (){
    return this.appContext.activeTool === 'freedraw'
  }

  setState(appContext: IAppContext) {
    this.appContext = appContext
  }
}
