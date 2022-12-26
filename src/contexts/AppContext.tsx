import {CANVAS_ID, GenericDefaultOptions, ShapeOptions, ShapeType} from "@/constants"
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
  canvasInstance: React.MutableRefObject<CanvasInstance>
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  activeTool: null,
  setActiveTool: () => null,
  appState: GenericDefaultOptions,
  setAppState: () => null,
  canvasInstance: null
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<IAppContext['isMobile']>(false);
  const [activeTool, setActiveTool] = useState<IAppContext['activeTool']>('selection');
  const [appState, setState] = useState<IAppContext['appState']>(GenericDefaultOptions)

  const setAppState = (state: IAppContext['appState']) => {
    setState(s => ({...s, ...state}))
  }

  const canvasInstance = useRef<CanvasInstance>();

  const context = {
    isMobile,
    setIsMobile,
    activeTool,
    setActiveTool,
    appState, 
    setAppState,
    canvasInstance
  };

  useEffect(() => {
    if (canvasInstance.current) return;
    canvasInstance.current = new CanvasInstance(new fabric.Canvas(CANVAS_ID));

    const jsonData = {
      ...json,
      objects: json.objects.map(item => item.type === 'image' ? {...item, src: 'https://edit.org' + item.src} : item)
    }

    canvasInstance.current.loadFromJSON(jsonData)
  }, [])
  
  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(context);
  }, [activeTool, appState])

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
