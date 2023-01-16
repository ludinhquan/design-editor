import {Actions} from "@/constants";
import {fabric} from "fabric";
import {BaseHandler} from "./BaseHandler";
import {Handler} from "./Handler";

export class ActionHandler extends BaseHandler {
  private commands: Partial<Record<Actions, Function>> = {
    [Actions.SendToBack]: this.sendToBack.bind(this),
    [Actions.SendBackward]: this.sendBackward.bind(this),
    [Actions.BringToFront]: this.bringToFront.bind(this),
    [Actions.BringForward]: this.bringForward.bind(this),
    [Actions.Trash]: this.delete.bind(this),
    [Actions.Duplicate]: this.duplicate.bind(this),
    [Actions.Group]: this.group.bind(this),
    [Actions.UnGroup]: this.ungroup.bind(this),
    [Actions.SelectAll]: this.selectAll.bind(this),
  }

  constructor(handler: Handler) {super(handler)}

  public executeAction(action: Actions) {
    const handler = this.commands[action]
    if (typeof handler === 'function') handler();
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
    const activeObject = this.canvas.getActiveObject()
    if (!activeObject) return

    this.canvas.discardActiveObject();
    activeObject.clone((clonedObj: fabric.Object) => {
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
    });
  }

  private delete() {
    this.canvas.getActiveObjects().map(object => {
      this.canvas.remove(object);
    });
    this.canvas.discardActiveObject()
    this.canvas.requestRenderAll()
  }

  private group() {
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection;
    if (!activeObject || activeObject.type !== 'activeSelection') return;

    const group = activeObject.toGroup();
    group.borderDashArray = [8, 4]
    group.borderColor = '#3d3d3d'
    const {type, options} = this.appContext.activeObjects
    this.appContext.setActiveObjects({
      isActiveSelection: false,
      type,
      hasGroup: true,
      options
    });
    this.canvas.requestRenderAll();
  }

  private ungroup() {
    const objects: fabric.Object[] = [];

    const activeObjects = this.canvas.getActiveObjects();
    this.canvas.discardActiveObject();

    let activeSelection: fabric.ActiveSelection

    activeObjects.map(object => {
      if (object.type === 'group') {
        const group = object as fabric.Group
        group.getObjects().map(item => item.setCoords())
        activeSelection = group.toActiveSelection()
      } else {
        objects.push(object)
      }
    })

    objects.map(item => activeSelection.addWithUpdate(item))

    this.canvas.requestRenderAll();
  }


  private selectAll(){
    const objects = this.canvas.getObjects();
    this.canvas.discardActiveObject();

    const activeSelection: fabric.ActiveSelection = new fabric.ActiveSelection(objects, {canvas: this.canvas});
    this.canvas.setActiveObject(activeSelection);
    this.canvas.requestRenderAll();
  }
}
