import {Actions, CANVAS_ID, DefaultShapeOptions, ShapeOptions, ShapeType} from "@/constants"
import {CanvasInstance} from "@/core"
import React, {createContext, useEffect, useRef, useState} from "react"
import { fabric } from "fabric"
import json from '@/data/data.json'

export interface IAppContext {
  isMobile: boolean
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  activeTool: null | ShapeType,
  setActiveTool: (option: ShapeType) => void
  appState: Partial<ShapeOptions>,
  setAppState: (option: Partial<ShapeOptions>) => void,
  image: string,
  setImage: (data: string) => void

  executeAction: (action: Actions) => void

  // refs
  canvasInstance: React.MutableRefObject<CanvasInstance>
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  activeTool: null,
  setActiveTool: () => null,
  appState: DefaultShapeOptions,
  setAppState: () => null,
  canvasInstance: null,
  image: null,
  setImage: () => {},
  executeAction: () => {}
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<IAppContext['isMobile']>(false);
  const [activeTool, setActiveTool] = useState<IAppContext['activeTool']>('selection');
  const [appState, setState] = useState<IAppContext['appState']>(DefaultShapeOptions)
  const [image, setImage] = useState<IAppContext['image']>();

  const canvasInstance = useRef<CanvasInstance>();

  const setAppState = (state: IAppContext['appState']) => {
    setState(s => ({...s, ...state}))
  }

  const executeAction = (action: Actions) => {
    canvasInstance.current.executeAction(action);
  }

  const context: IAppContext = {
    isMobile,
    setIsMobile,
    activeTool,
    setActiveTool,
    appState, 
    setAppState,
    image,
    setImage,
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
    canvasInstance.current.setAppContext(context);
  }, [activeTool, appState, image])

  return (
    <AppContext.Provider value={context}>
      {children} /
    </AppContext.Provider>
  )
}
