import {IconButton} from "@/components";
import {SHAPES} from "@/constants";
import {IAppContext} from "@/contexts";
import {useAppContext} from "@/hooks";
import React from "react";

type ShapeProps = Pick<IAppContext, 'activeTool' | 'setActiveTool'>

const ShapeComponent = React.memo((props: ShapeProps) => {
  console.count('Shapes')
  const {activeTool, setActiveTool} = props

  return (
    <div className="flex justify-center" >
      <div className="p-[4px] rounded-[4px] shadow-main">
        <div className="flex space-x-1">
          {SHAPES.map(shape => (
            <IconButton
              key={shape.value}
              icon={shape.icon}
              active={shape.value === activeTool}
              onClick={() => setActiveTool(shape.value)}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

export const Shapes = () => {
  const {activeTool, setActiveTool} = useAppContext()
  return <ShapeComponent activeTool={activeTool} setActiveTool={setActiveTool} />
}
