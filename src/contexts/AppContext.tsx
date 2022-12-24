import {CANVAS_ID, GenericDefaultOptions, ShapeOptions, ShapeType} from "@/constants"
import {CanvasInstance} from "@/core"
import React, {createContext, useEffect, useRef, useState} from "react"
import { fabric } from "fabric"

export interface IAppContext {
  isMobile: boolean
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  activeTool: null | ShapeType,
  setActiveTool: (option: ShapeType) => void
  shapeStyles: Partial<ShapeOptions>,
  setShapeStyles: (option: Partial<ShapeOptions>) => void,
  canvasInstance: React.MutableRefObject<CanvasInstance>
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  activeTool: null,
  setActiveTool: () => null,
  shapeStyles: GenericDefaultOptions,
  setShapeStyles: () => null,
  canvasInstance: null
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<IAppContext['isMobile']>(false);
  const [activeTool, setActiveTool] = useState<IAppContext['activeTool']>('selection');
  const [shapeStyles, setStyles] = useState<IAppContext['shapeStyles']>(GenericDefaultOptions)

  const setShapeStyles = (styles: IAppContext['shapeStyles']) => {
    setStyles(s => ({...s, ...styles}))
  }

  const canvasInstance = useRef<CanvasInstance>();

  const context = {
    isMobile,
    setIsMobile,
    activeTool,
    setActiveTool,
    shapeStyles, 
    setShapeStyles,
    canvasInstance
  };

  useEffect(() => {
    if (canvasInstance.current) return;
    canvasInstance.current = new CanvasInstance(new fabric.Canvas(CANVAS_ID));
  }, [])
  
  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(context);
  }, [activeTool, shapeStyles])

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
