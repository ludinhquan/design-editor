import {isEscape} from "@/constants";
import {FabricCanvas} from "../type";
import {BaseHandler} from "./BaseHandler";

export class KeyboardHandler extends BaseHandler {

  constructor(
    canvas: FabricCanvas
  ) {
    super(canvas)
    this.registerHandlers()
  }

  onAppStateChange(): void {}

  private registerHandlers = () => {
    document.addEventListener('keydown', (e) => {
      if (!isEscape(e.key)) return
      const {setActiveTool} = this.state
      setActiveTool('selection')
    })
  }
}
