import {fabric} from "fabric";
import {useEffect} from "react";
import {LayerUI} from "@/containers";

export const App = () => {
  useEffect(() => {
    const options = {
      backgroundColor: '#eee',
      width: 600,
      height: 800,
    }
    const canvas = new fabric.Canvas(`canvas`, options);

    console.log(canvas)
  }, []);

  return (
    <div className="w-screen h-screen bg-[#fefefe]">
      <LayerUI />
    </div>
  )
}
