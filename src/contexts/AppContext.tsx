import type {ShapeType} from "@/constants"
import React, {createContext, useState} from "react"

export interface IAppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  activeTool: null | ShapeType,
  setActiveTool: (option: ShapeType) => void
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  activeTool: null,
  setActiveTool: () => null,
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [activeTool, setActiveTool] = useState<null | ShapeType>('selection');

  const context = {
    isMobile,
    setIsMobile,
    activeTool,
    setActiveTool,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
