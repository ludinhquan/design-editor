import {IconButton} from "@/components";
import {SHAPES} from "@/constants";
import {useAppContext} from "@/hooks";

export const Shapes = () => {
  const {activeTool, setActiveTool} = useAppContext();

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
}
