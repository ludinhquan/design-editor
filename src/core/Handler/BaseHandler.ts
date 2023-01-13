import {Actions} from "@/constants";
import {IAppContext, StateChangedKey} from "@/contexts";
import {Handler} from "./Handler";

export class BaseHandler {
  get canvas() {return this.handler.canvasInstance.canvas}

  get appContext() {return this.handler.canvasInstance.appContext}

  constructor(protected handler: Handler) {}

  public executeAction(_: Actions) {}

  public onUpdateAppContext(keys: StateChangedKey[], oldContext: IAppContext) {}
}
