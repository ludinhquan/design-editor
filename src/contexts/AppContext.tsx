import {ShapeType} from "@/constants"
import {CanvasInstance} from "@/core"
import {GenericStyles} from "@/core/type"
import React, {createContext, useRef, useState} from "react"

export interface IAppContext {
  isMobile: boolean
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  activeTool: null | ShapeType,
  setActiveTool: (option: ShapeType) => void
  shapeStyles: Partial<GenericStyles>,
  setShapeStyles: (option: GenericStyles) => void,
  canvasInstance: React.MutableRefObject<CanvasInstance>
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  activeTool: null,
  setActiveTool: () => null,
  shapeStyles: {},
  setShapeStyles: () => null,
  canvasInstance: null
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const canvasInstance = useRef<CanvasInstance>();
  const [isMobile, setIsMobile] = useState<IAppContext['isMobile']>(false);
  const [activeTool, setActiveTool] = useState<IAppContext['activeTool']>('selection');
  const [shapeStyles, setShapeStyles] = useState<IAppContext['shapeStyles']>({})

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
