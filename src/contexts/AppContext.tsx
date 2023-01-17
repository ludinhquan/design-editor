import {Actions, ActiveObjects, CANVAS_ID, DefaultShapeOptions, ShapeOptions, ShapeType} from "@/constants"
import {CanvasInstance} from "@/core"
import React, {createContext, useEffect, useRef, useState} from "react"
import { fabric } from "fabric"
import json from '@/data/data.json'

export interface IAppContext {
  image: string
  activeTool: null | ShapeType
  shapeOptions: Partial<ShapeOptions>
  activeObjects: ActiveObjects
  isLocked: boolean

  setActiveTool: (option: ShapeType) => void
  setImage: (data: string) => void
  setShapeOptions: (option: Partial<ShapeOptions>) => void
  setActiveObjects: (activeObjects: ActiveObjects) => void
  lockMode: (lock: boolean) => void

  executeAction: (action: Actions) => void
  canvasInstance: React.MutableRefObject<CanvasInstance>
}

const emptyFunc = () => {}
const defaultContext: IAppContext = {
  image: null,
  activeTool: 'selection',
  shapeOptions: DefaultShapeOptions,
  activeObjects: {isActiveSelection: false, type: [], hasGroup: false, options: {}},
  isLocked: false,

  setActiveTool: () => null,
  setImage: emptyFunc,
  setShapeOptions: () => null,
  setActiveObjects: emptyFunc,
  lockMode: emptyFunc,

  canvasInstance: null,
  executeAction: emptyFunc
}

export type StateChangedKey = 'image' | 'activeTool' | 'shapeOptions' | 'activeObjects' | 'lockMode'

export const AppContext = createContext<IAppContext>(defaultContext)


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTool, setActiveTool] = useState<IAppContext['activeTool']>(defaultContext.activeTool);
  const [shapeOptions, setState] = useState<IAppContext['shapeOptions']>(defaultContext.shapeOptions)
  const [image, setImage] = useState<IAppContext['image']>(defaultContext.image);
  const [activeObjects, setActiveObjects] = useState<IAppContext['activeObjects']>(defaultContext.activeObjects);
  const [isLocked, lockMode] = useState<IAppContext['isLocked']>(defaultContext.isLocked);

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
    isLocked,
    lockMode
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
    if (!isLocked) setActiveTool('selection')
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(context, 'lockMode');
  }, [isLocked])

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
