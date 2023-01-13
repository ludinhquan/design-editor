import {ShapeType} from "@/constants";
import {FabricCanvas} from "../type";
import {BaseHandler} from "./BaseHandler";
import {HandlerAction} from "./Handler";

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
  constructor(
    canvas: FabricCanvas,
    actions: HandlerAction
  ) {
    super(canvas,actions)
    this.registerHandlers()
  }

  onAppStateChange(): void {}

  private registerHandlers = () => {
    document.addEventListener('keydown', this.handleKeyboardEvent);
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
    if (activeTool) this.state.setActiveTool(activeTool);
  }

  private handleKeyboardEvent(e: KeyboardEvent) {
    const keys = combineKeys.reduce(
      (prev: string[], key: string) => (e as any)[`${key}Key`] ? prev.concat(key) : prev,
      []
    );

    const combineKey = keys.concat(e.key).join('-').toLowerCase();
    this.changeActiveTool(combineKey);

    if (this.preventCombinedKeys.has(combineKey)) e.preventDefault()
  }
}
