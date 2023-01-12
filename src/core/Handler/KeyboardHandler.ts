import {ShapeType} from "@/constants";
import {FabricCanvas} from "../type";
import {BaseHandler} from "./BaseHandler";
import {HandlerAction} from "./Handler";

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

  private readonly combineKeys = [
    "alt",
    "ctrl",
    "meta",
    "shift",
  ]

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

  private registerHandlers = () => {
    document.addEventListener('keydown', (e) => {
      const keys = this.combineKeys.reduce(
        (prev: string[], key: string) => (e as any)[`${key}Key`] ? prev.concat(key) : prev,
        []
      );

      const combineKey = keys.concat(e.key).join('-').toLowerCase();

      this.changeActiveTool(combineKey);

      if (this.preventCombinedKeys.has(combineKey))
        e.preventDefault()
    });
  }
}
