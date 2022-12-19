import {Canvas, LayerUI} from "@/containers";
import {fabric} from "fabric";
import {useEffect, useRef} from "react";
import {CanvasInstance} from "./core";
import {useAppContext} from "./hooks";

export const App = () => {
  const appContext = useAppContext();

  const canvasInstance = useRef<CanvasInstance>();

  useEffect(() => {
    if (canvasInstance.current) return;
    canvasInstance.current = new CanvasInstance(new fabric.Canvas(`canvas`));
  }, [])

  useEffect(() => {
    if (!canvasInstance.current) return;
    canvasInstance.current.setAppContext(appContext);
  }, [appContext])

  return (
    <div className="w-screen h-screen">
      <LayerUI />
      <Canvas />
    </div>
  )
}
