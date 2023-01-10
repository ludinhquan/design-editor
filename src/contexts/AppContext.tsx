import {Actions, ActiveObjects, CANVAS_ID, DefaultShapeOptions, ShapeOptions, ShapeType} from "@/constants"
import {CanvasInstance} from "@/core"
import React, {createContext, useEffect, useRef, useState} from "react"
import { fabric } from "fabric"
import json from '@/data/data.json'

export interface IAppContext {
  activeTool: null | ShapeType
  setActiveTool: (option: ShapeType) => void
  shapeOptions: Partial<ShapeOptions>
  setShapeOptions: (option: Partial<ShapeOptions>) => void
  image: string
  setImage: (data: string) => void
  activeObjects: ActiveObjects
  setActiveObjects: (activeObjects: ActiveObjects) => void
  executeAction: (action: Actions) => void

  // refs
  canvasInstance: React.MutableRefObject<CanvasInstance>
}

const emptyFunc = () => {}

export type StateChangedKey = 'image' | 'activeTool' | 'shapeOptions' | 'activeObjects'

export const AppContext = createContext<IAppContext>({
  image: null,
  activeTool: null,
  shapeOptions: DefaultShapeOptions,
  activeObjects: {type: [], hasGroup: false, options: {}},

  setActiveTool: () => null,
  setImage: emptyFunc,
  setShapeOptions: () => null,
  setActiveObjects: emptyFunc,

  canvasInstance: null,
  executeAction: emptyFunc
})


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTool, setActiveTool] = useState<IAppContext['activeTool']>('selection');
  const [shapeOptions, setState] = useState<IAppContext['shapeOptions']>(DefaultShapeOptions)
  const [image, setImage] = useState<IAppContext['image']>();
  const [activeObjects, setActiveObjects] = useState<ActiveObjects>({type: [], hasGroup: false, options: {}});

  const canvasInstance = useRef<CanvasInstance>();

  const setShapeOptions = (state: IAppContext['shapeOptions']) => {
    setState(s => ({...s, ...state}))
  }

  const executeAction = (action: Actions) => {
    canvasInstance.current.executeAction(action);
  }

  const context: IAppContext = {
    activeTool,
    setActiveTool,
    shapeOptions,
    setShapeOptions,
    image,
    setImage,
    activeObjects,
    setActiveObjects,
    executeAction,
    canvasInstance,
  };

  useEffect(() => {
    if (canvasInstance.current) return;
    canvasInstance.current = new CanvasInstance(new fabric.Canvas(CANVAS_ID, {preserveObjectStacking: true}));

    const jsonData = {
      ...json,
      objects: json.objects.map(item => item.type === 'image' ? {...item, src: 'https://edit.org' + item.src} : item)
    }

    canvasInstance.current.loadFromJSON(jsonData)
  }, [])
  
  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(context, 'activeTool');
  }, [activeTool])

  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(context, 'image');
  }, [image])

  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(context, 'shapeOptions');
  }, [shapeOptions])

  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(context, 'activeObjects');
  }, [activeObjects])

  return (
    <AppContext.Provider value={context}>
      {children} /
    </AppContext.Provider>
  )
}
