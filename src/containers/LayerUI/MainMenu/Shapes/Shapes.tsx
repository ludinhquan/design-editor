import {IconButton} from "@/components";
import {SHAPES} from "@/constants";
import {IAppContext} from "@/contexts";
import {useAppContext} from "@/hooks";
import React, {useRef} from "react";

type ShapeProps = Pick<IAppContext, 'activeTool' | 'setActiveTool'>

const ShapeComponent = React.memo((props: ShapeProps) => {
  console.count('Shapes')
  const {activeTool, setActiveTool} = props
  const inputRef = useRef(null);

    
  const pageRefocused = () => {
    setActiveTool('selection');
    window.removeEventListener("focus", pageRefocused);
  };

  const openFile = () => {
    inputRef.current.click()
    window.addEventListener('focus', pageRefocused)
  }

  const onClick = (activeTool: ShapeProps['activeTool']) => {
    if (activeTool === 'image') openFile()
    setActiveTool(activeTool)
  }

  return (
    <div className="flex justify-center" >
      <div className="p-[4px] rounded-[4px] shadow-main">
        <div className="flex space-x-1">
          {SHAPES.map(shape => (
            <IconButton
              key={shape.value}
              icon={shape.icon}
              active={shape.value === activeTool}
              onClick={() => onClick(shape.value)}
            />
          ))}
        </div>
      </div>

      <input type="file" ref={inputRef} className="hidden" accept="image/png, image/gif, image/jpeg" />
    </div>
  )
})

export const Shapes = () => {
  const {activeTool, setActiveTool} = useAppContext()
  return <ShapeComponent activeTool={activeTool} setActiveTool={setActiveTool} />
}
