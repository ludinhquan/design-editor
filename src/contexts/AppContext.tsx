import {GenericDefaultOptions, ShapeOptions, ShapeType} from "@/constants"
import {CanvasInstance} from "@/core"
import React, {createContext, useRef, useState} from "react"

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
  const canvasInstance = useRef<CanvasInstance>();
  const [isMobile, setIsMobile] = useState<IAppContext['isMobile']>(false);
  const [activeTool, setActiveTool] = useState<IAppContext['activeTool']>('selection');
  const [shapeStyles, setStyles] = useState<IAppContext['shapeStyles']>(GenericDefaultOptions)

  const setShapeStyles = (styles: IAppContext['shapeStyles']) => {
    setStyles(s => ({...s, ...styles}))
  }

  const context = {
    isMobile,
    setIsMobile,
    activeTool,
    setActiveTool,
    shapeStyles, 
    setShapeStyles,
    canvasInstance
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
