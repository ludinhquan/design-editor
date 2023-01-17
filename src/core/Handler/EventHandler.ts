import {ShapeOptions, ShapeType} from "@/constants";
import {fabric} from "fabric";
import {BaseHandler} from "./BaseHandler";
import {Handler} from "./Handler";

export class EventHandler extends BaseHandler {
  private shapeTypes: Record<string, ShapeType> = {
    'i-text': 'text',
    'textbox': 'text',
    'rect': 'rectangle',
    'path': 'rectangle',
    'group': 'rectangle',
  }

  constructor(handler: Handler) {
    super(handler)
    this.registerHandlers()
  }

  private registerHandlers = () => {
    this.canvas.on('selection:created', this.onSelectionCreated.bind(this));
    this.canvas.on('selection:updated', this.onSelectionUpdated.bind(this));
    this.canvas.on('selection:cleared', this.onSelectionCleared.bind(this));
  }

  private checkHasGroup(activeObjects: fabric.Object[]) {
    const hasGroup = activeObjects.find(object => {
      return object.type === 'group'
    })
    return !!hasGroup;
  }

  private getActiveObjectTypes(activeObjects: fabric.Object[]) {
    const emptyValue = new Set<string | number>([undefined, null, '']);

    function getValue<T extends keyof ShapeOptions>(
      prev: Set<ShapeOptions[T]>,
      value: ShapeOptions[T]
    ): Set<ShapeOptions[T]> {
      if (emptyValue.has(value)) return;
      if (!prev) return new Set<ShapeOptions[T]>([value]);
      return prev.add(value)
    }

    type Options = Partial<{
      [K in keyof ShapeOptions]: Set<ShapeOptions[K]>
    }>

    const type = activeObjects.map(item => this.shapeTypes[item.type] ?? item.itemType) as unknown as ShapeType[];
    const hasGroup = this.checkHasGroup(activeObjects);

    const activeOptionSet = activeObjects.reduce(
      (prev: Options, item) => ({
        fontFamily: getValue<'fontFamily'>(prev.fontFamily, (item as fabric.IText).fontFamily),
        fontSize: getValue<'fontSize'>(prev.fontSize, (item as fabric.IText).fontSize),
        opacity: getValue<'opacity'>(prev.opacity, item.opacity),
        strokeColor: getValue<'strokeColor'>(prev.strokeColor, item.stroke),
        backgroundColor: getValue<'backgroundColor'>(prev.backgroundColor, item.backgroundColor),
        roundness: getValue<'roundness'>(prev.roundness, (item as fabric.Rect).rx),
        strokeWidth: getValue<'strokeWidth'>(prev.strokeWidth, item.strokeWidth),
      }), {});

    const activeOption = Object.keys(activeOptionSet)
      .reduce(
        (prev: Partial<ShapeOptions>, key) => {
          const current = activeOptionSet[key as keyof ShapeOptions];
          if (!current || current.size !== 1) return prev
          const [value] = current;
          return Object.assign(prev, {[key]: value})
        },
        {}
      );

    this.appContext.setActiveObjects({
      isActiveSelection: this.canvas.getActiveObject()?.type === 'activeSelection',
      type,
      hasGroup,
      options: activeOption
    })
  }

  private onSelectionCreated() {
    const activeObjects = this.canvas.getActiveObjects();
    this.getActiveObjectTypes(activeObjects)

    activeObjects.map(item => {
      if (item.group && !item.group.borderDashArray) item.group.borderDashArray = [3, 3];
      if (item.type === 'group' && !item.borderDashArray) item.borderDashArray = [3, 3];
    });

    this.canvas.renderAll()
  }

  private onSelectionUpdated() {
    const activeObjects = this.canvas.getActiveObjects();
    this.getActiveObjectTypes(activeObjects)

    activeObjects.map(item => {
      if (item.group && !item.group.borderDashArray) item.group.borderDashArray = [3, 3];
      if (item.type === 'group' && !item.borderDashArray) item.borderDashArray = [3, 3];
    });

    this.canvas.renderAll()
  }

  private onSelectionCleared() {
    setTimeout(() => {
      const activeObjects = this.canvas.getActiveObjects()
      this.getActiveObjectTypes(activeObjects)
    });
  }
}
