import {Actions} from "@/constants";
import {fabric} from "fabric";
import {IMouseMoveEvent} from "../type";
import {BaseHandler} from "./BaseHandler";
import {Handler} from "./Handler";
export class ActionHandler extends BaseHandler {
  private readonly DISTANCE_MOVE = 30;
  private readonly INITIAL_PASTE_TIMES = 0;

  private readonly commands: Partial<Record<Actions, Function>> = {
    [Actions.SendToBack]: this.sendToBack.bind(this),
    [Actions.SendBackward]: this.sendBackward.bind(this),
    [Actions.BringToFront]: this.bringToFront.bind(this),
    [Actions.BringForward]: this.bringForward.bind(this),
    [Actions.Trash]: this.delete.bind(this),
    [Actions.Duplicate]: this.duplicate.bind(this),
    [Actions.Group]: this.group.bind(this),
    [Actions.UnGroup]: this.ungroup.bind(this),
    [Actions.SelectAll]: this.selectAll.bind(this),
    [Actions.Copy]: this.copy.bind(this),
    [Actions.Cut]: this.cut.bind(this),
    [Actions.Paste]: this.paste.bind(this),
  }

  private clipboard: fabric.Object
  private latestPointerPosition: {x: number, y: number}
  private pasteTimes = this.INITIAL_PASTE_TIMES;

  constructor(handler: Handler) {
    super(handler);
    this.canvas.on('mouse:down', this.oMouseDown.bind(this))
  }

  public executeAction(action: Actions) {
    const handler = this.commands[action]
    if (typeof handler === 'function') handler();
  }

  private oMouseDown(event: fabric.IEvent) {
    // cache latest pointer position
    if (!this.clipboard) return
    const pointer: IMouseMoveEvent = this.canvas.getPointer(event.e);
    this.latestPointerPosition = {x: pointer.x, y: pointer.y}
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
    activeObject.clone((object: fabric.Object) => {
      this.clone(object)
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

  private copy() {
    this.canvas.getActiveObject().clone((object: fabric.Object) => {
      this.clipboard = object;
      this.pasteTimes = this.INITIAL_PASTE_TIMES;
    })
  }

  private cut() {
    this.canvas.getActiveObject().clone((object: fabric.Object) => {
      this.clipboard = object;
      this.pasteTimes = this.INITIAL_PASTE_TIMES;
      this.canvas.remove(this.canvas.getActiveObject())
    })
  }

  private paste() {
    if (!this.clipboard) return
    this.canvas.discardActiveObject();
    const latestPointerPosition = this.latestPointerPosition;

    this.clipboard.clone((object: fabric.Object) => {

      const position = !latestPointerPosition
        ? {left: object.left, top: object.top}
        : {left: latestPointerPosition.x, top: latestPointerPosition.y, originX: 'center', originY: 'center'}

      object.set(position);
      this.pasteTimes++;
      this.clone(object, this.pasteTimes * this.DISTANCE_MOVE);
    });
  }

  private clone(object: fabric.Object, distance = this.DISTANCE_MOVE) {
    object.set({
      left: object.left + distance,
      top: object.top + distance,
      evented: true
    });

    if (object.type === 'activeSelection') {
      object.canvas = this.canvas;
      (object as fabric.ActiveSelection).forEachObject((obj: fabric.Object) => {
        this.canvas.add(obj);
      });
      object.setCoords();
    } else this.canvas.add(object);

    this.canvas.setActiveObject(object);
    this.canvas.requestRenderAll();
  }
}
