import {Actions, ShapeType} from "@/constants";
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
    if (!this.isSelectionMode || this.isTyping) return
    const activeTool = this.tools[combineKey];
    if (activeTool) this.appContext.setActiveTool(activeTool);
  }

  private discard(){
    this.appContext.setActiveTool('selection');
    this.canvas.discardActiveObject()
    this.canvas.requestRenderAll()
  }

  private lockMode(){
    this.appContext.lockMode(!this.appContext.isLocked)
  }

  private handleKeyboardEvent(e: KeyboardEvent) {

    const combineActions: Record<string, Function> = {
      'q': this.lockMode.bind(this),
      'escape': this.discard.bind(this),
      'delete': () => this.handler.actionHandler.executeAction(Actions.Trash),
      'ctrl-a': () => this.handler.actionHandler.executeAction(Actions.SelectAll),
      'ctrl-c': () => this.handler.actionHandler.executeAction(Actions.Copy),
      'ctrl-x': () => this.handler.actionHandler.executeAction(Actions.Cut),
      'ctrl-v': () => this.handler.actionHandler.executeAction(Actions.Paste),
      'ctrl-[': () => this.handler.actionHandler.executeAction(Actions.SendBackward),
      'ctrl-]': () => this.handler.actionHandler.executeAction(Actions.BringForward),
      'ctrl-shift-{': () => this.handler.actionHandler.executeAction(Actions.SendToBack),
      'ctrl-shift-}': () => this.handler.actionHandler.executeAction(Actions.BringToFront),
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
