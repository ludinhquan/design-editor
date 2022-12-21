import {IAppContext} from "@/contexts";
import {FabricCanvas} from "../type";

export abstract class BaseHandler {
  protected appContext: IAppContext

  constructor(protected canvas: FabricCanvas) {}

  public setAppContext(appContext: IAppContext) {
    this.appContext = appContext
  }
}
