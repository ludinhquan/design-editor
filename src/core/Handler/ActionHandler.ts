import {Actions} from "@/constants";
import {IAppContext} from "@/contexts";
import {FabricCanvas} from "../type";
import {BaseHandler} from "./BaseHandler";

export class ActionHandler extends BaseHandler {
  private actions: Partial<Record<Actions, Function>> = {
    [Actions.SendToBack]: this.sendToBack.bind(this),
    [Actions.SendBackward]: this.sendBackward.bind(this),
    [Actions.BringToFront]: this.bringToFront.bind(this),
    [Actions.BringForward]: this.bringForward.bind(this),
    [Actions.Trash]: this.delete.bind(this),
    [Actions.Duplicate]: this.duplicate.bind(this),
    [Actions.Group]: this.group.bind(this),
    [Actions.UnGroup]: this.ungroup.bind(this),
  }

  constructor(canvas: FabricCanvas) {super(canvas)}

  onAppStateChange(_: IAppContext, __: IAppContext): void {}

  executeAction(action: Actions) {
    const hanlder = this.actions[action]
    if (typeof hanlder === 'function') hanlder();
  }

  private sendToBack() {
    const activeObject = this.canvas.getActiveObject()
    if (!activeObject) return
    activeObject.sendToBack()
  }

  private sendBackward() {
    const activeObject = this.canvas.getActiveObject()
    if (!activeObject) return
    activeObject.sendBackwards()
  }

  private bringToFront() {
    const activeObject = this.canvas.getActiveObject()
    if (!activeObject) return
    activeObject.bringToFront()
  }

  private bringForward() {
    const activeObject = this.canvas.getActiveObject()
    if (!activeObject) return
    activeObject.bringForward()
  }

  private duplicate() {
    let clonedObj: fabric.Object;
    const activeObject = this.canvas.getActiveObject()
    if (!activeObject) return

    activeObject.clone((obj: fabric.Object) => clonedObj = obj);

    this.canvas.discardActiveObject();

    clonedObj.set({
      left: clonedObj.left + 20,
      top: clonedObj.top + 20,
      evented: true
    });

    if (clonedObj.type === 'activeSelection') {
      clonedObj.canvas = this.canvas;
      (clonedObj as fabric.ActiveSelection).forEachObject((obj: fabric.Object) => {
        this.canvas.add(obj);
      });
      clonedObj.setCoords();
    } else this.canvas.add(clonedObj);

    this.canvas.setActiveObject(clonedObj);
    this.canvas.requestRenderAll();
  }

  private delete() {
    this.canvas.remove(...this.canvas.getActiveObjects())
    this.canvas.discardActiveObject()
    this.canvas.requestRenderAll()
  }

  private group() {
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection;
    if (!activeObject || activeObject.type !== 'activeSelection') return;

    const group = activeObject.toGroup();
    group.borderDashArray = [8, 4]
    group.borderColor = '#3d3d3d'
    this.canvas.requestRenderAll();
  }

  private ungroup() {
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection;
    if (!activeObject || activeObject.type !== 'group') return;

    activeObject.toActiveSelection();
    this.canvas.requestRenderAll();
  }
}
