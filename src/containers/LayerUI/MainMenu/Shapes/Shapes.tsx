import {IconButton} from "@/components";
import {SHAPES} from "@/constants";
import {IAppContext} from "@/contexts";
import {useAppContext} from "@/hooks";
import React, {useRef} from "react";

type ShapeProps = Pick<IAppContext, 'activeTool' | 'setActiveTool'>

const ShapeComponent = React.memo((props: ShapeProps) => {
  console.count('Shapes')
  const {activeTool, setActiveTool} = props
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  const setImage = () => {
    const reader = new FileReader()
    const url =reader.readAsDataURL(fileInputRef.current.files[0])
    imageRef.current.src = fileInputRef.current.files[0];
  }

  const hasUploaded = () => fileInputRef.current.files.length > 0;

  const pageRefocused = () => {
    if (!hasUploaded()) setActiveTool('selection');
    setImage()
    window.removeEventListener("focus", pageRefocused);
  };

  const openFile = () => {
    fileInputRef.current.click()
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

      <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/gif, image/jpeg" onChange={e => imageRef.current.src = e.target.value} />
      <img ref={imageRef} width={100} height={100} />
    </div>
  )
})

export const Shapes = () => {
  const {activeTool, setActiveTool} = useAppContext()
  return <ShapeComponent activeTool={activeTool} setActiveTool={setActiveTool} />
}
