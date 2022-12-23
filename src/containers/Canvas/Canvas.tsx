import {CANVAS_ID} from "@/constants";

export const Canvas = () => {
  console.log('Canvas')

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="rounded shadow-main">
        <canvas id={CANVAS_ID} className="rounded"></canvas>
      </div>
    </div>
  )
}
