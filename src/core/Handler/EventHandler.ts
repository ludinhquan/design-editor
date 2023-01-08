import {ShapeOptions} from "@/constants";
import {fabric} from "fabric";
import {FabricCanvas} from "../type";
import {BaseHandler} from "./BaseHandler";

export class SelectionHandler extends BaseHandler {

  constructor(
    canvas: FabricCanvas
  ) {
    super(canvas)
    this.registerHandlers()
  }

  onAppStateChange(): void {}

  private registerHandlers = () => {
    this.canvas.on('selection:created', this.onSelection.bind(this));
    this.canvas.on('selection:updated', this.onSelection.bind(this));
  }

  private getActiveObjectTypes(activeObjects: fabric.Object[]) {
    console.log('=============================================')
    console.log(this.canvas.getActiveObject().type)
    
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

    const activeOptions = activeObjects.reduce(
      (prev: Options, item) => ({
        fontFamily: getValue<'fontFamily'>(prev.fontFamily, (item as fabric.IText).fontFamily),
        fontSize: getValue<'fontSize'>(prev.fontSize, (item as fabric.IText).fontSize),
        opacity: getValue<'opacity'>(prev.opacity, item.opacity),
        strokeColor: getValue<'strokeColor'>(prev.strokeColor, item.stroke),
        backgroundColor: getValue<'backgroundColor'>(prev.backgroundColor, item.backgroundColor),
        roundness: getValue<'roundness'>(prev.roundness, (item as fabric.Rect).rx),
        strokeWidth: getValue<'strokeWidth'>(prev.strokeWidth, item.strokeWidth),
      }), {});

    const activeOption = Object.keys(activeOptions)
      .reduce(
        (prev: Partial<ShapeOptions>, key) => {
          const tmpKey = key as keyof ShapeOptions
          const current = activeOptions[tmpKey];
          if (!current || current.size !== 1) return prev
          // @ts-ignore
          prev[tmpKey] = [...current][0]
          return prev
        },
        {}
      );

    // @ts-ignore
    this.state.setActiveObjects(activeOption)
  }

  private onSelection() {
    const activeObjects = this.canvas.getActiveObjects();
    this.getActiveObjectTypes(activeObjects)

    activeObjects.map(item => {
      if (item.group && !item.group.borderDashArray) item.group.borderDashArray = [3, 3];
      if (item.type === 'group' && !item.borderDashArray) item.borderDashArray = [3, 3];
    });

    this.canvas.renderAll()
  }
}
