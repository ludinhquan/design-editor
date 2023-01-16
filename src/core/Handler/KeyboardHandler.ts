import {Actions, ShapeType} from "@/constants";
import {fabric} from "fabric";
import {BaseHandler} from "./BaseHandler";
import {Handler} from "./Handler";

const combineKeys = ["alt", "ctrl", "meta", "shift"];

const tools: [string[], ShapeType][] = [
  [['v', '1'], 'selection'],
  [['r', '2'], 'rectangle'],
  [['d', '3'], 'diamond'],
  [['o', '4'], 'ellipse'],
  [['a', '5'], 'arrow'],
  [['l', '6'], 'line'],
  [['p', '7'], 'freedraw'],
  [['t', '8'], 'text'],
  [['i', '9'], 'image'],
];

export class KeyboardHandler extends BaseHandler {
  constructor(handler: Handler) {
    super(handler)
    this.registerHandlers()
  }

  private registerHandlers = () => {
    document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
  }

  private readonly tools: Record<string, ShapeType> = tools.reduce(
    (prev: Record<string, ShapeType>, item) => {
      const [keys, shape] = item
      keys.map(k => prev[k] = shape)
      return prev
    }, {});

  private preventCombinedKeys = new Set([
    // 'ctrl-shift-i'
  ])

  private changeActiveTool(combineKey: string) {
    const activeTool = this.tools[combineKey];
    if (activeTool) this.appContext.setActiveTool(activeTool);
  }

  private selectAll(){
    const objects = this.canvas.getObjects();
    this.canvas.discardActiveObject();

    const activeSelection: fabric.ActiveSelection = new fabric.ActiveSelection(objects, {canvas: this.canvas});
    this.canvas.setActiveObject(activeSelection);
    this.canvas.requestRenderAll();
  }

  private handleKeyboardEvent(e: KeyboardEvent) {
    if (!this.isSelectionMode || this.isTyping) return

    const combineActions: Record<string, Function> = {
      'ctrl-a': () => this.handler.actionHandler.executeAction(Actions.SelectAll),
      'delete': () => this.handler.actionHandler.executeAction(Actions.Trash)
    }

    const keys = combineKeys.reduce(
      (prev: string[], key: string) => (e as any)[`${key}Key`] ? prev.concat(key) : prev,
      []
    );

    const combineKey = keys.concat(e.key).join('-').toLowerCase();
    if (combineKey in combineActions) {
      combineActions[combineKey]()
      e.preventDefault()
    }
    this.changeActiveTool(combineKey);

    if (this.preventCombinedKeys.has(combineKey)) e.preventDefault()
  }
}
