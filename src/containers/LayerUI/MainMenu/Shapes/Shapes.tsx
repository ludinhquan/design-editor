import {IconButton} from "@/components";
import {SHAPES} from "@/constants";
import {IAppContext} from "@/contexts";
import {useAppContext} from "@/hooks";
import React, {useRef} from "react";

type ShapeProps = Pick<IAppContext, 'activeTool' | 'setActiveTool' | 'setCurrentImage'>

const ShapeComponent = React.memo((props: ShapeProps) => {
  console.count('Shapes')

  const {activeTool, setActiveTool, setCurrentImage} = props
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const hasUploaded = () => fileInputRef.current.files.length > 0;

  const setImage = () => {
    const reader = new FileReader()
    reader.readAsDataURL(fileInputRef.current.files[0])
    reader.onloadend = () => {
      imageRef.current.src = reader.result as string;
      setCurrentImage(imageRef.current)
    }
  }

  const pageRefocused = () => {
    if (!hasUploaded()) setActiveTool('selection');
    else setImage()
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

      <input ref={fileInputRef} type="file" className="hidden" accept="image/png, image/gif, image/jpeg" />
      <img ref={imageRef} className="hidden" />
    </div>
  )
})

export const Shapes = () => {
  const {activeTool, setActiveTool, setCurrentImage} = useAppContext()
  return <ShapeComponent activeTool={activeTool} setActiveTool={setActiveTool} setCurrentImage={setCurrentImage} />
}
