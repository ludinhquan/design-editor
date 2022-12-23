import {CANVAS_ID} from "@/constants"
import {AppContext, IAppContext} from "@/contexts"
import {CanvasInstance} from "@/core"
import {useContext, useEffect} from "react"
import { fabric } from "fabric"

export const useAppContext = () => {
  const appContext = useContext<IAppContext>(AppContext)
  const {canvasInstance} = appContext

  useEffect(() => {
    if (canvasInstance.current) return;
    canvasInstance.current = new CanvasInstance(new fabric.Canvas(CANVAS_ID));
  }, [])
  
  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(appContext);
  }, [appContext])

  return appContext
}
