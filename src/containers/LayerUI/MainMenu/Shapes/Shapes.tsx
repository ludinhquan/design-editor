import {IconButton} from "@/components";
import {SHAPES} from "@/constants";
import {IAppContext} from "@/contexts";
import {useAppContext} from "@/hooks";
import React, {useEffect, useRef} from "react";

type ShapeProps = Pick<IAppContext, 'activeTool' | 'setActiveTool' | 'setImage'>

const ShapeComponent = React.memo((props: ShapeProps) => {
  console.count('Shapes')

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (['i', '9'].includes(e.key)) openFile()
    }

    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  const {activeTool, setActiveTool, setImage: loadImage} = props
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasUploaded = () => fileInputRef.current.files.length > 0;

  const setImage = () => {
    const reader = new FileReader()
    reader.readAsDataURL(fileInputRef.current.files[0])
    reader.onloadend = () => {
      loadImage(reader.result as string)
      fileInputRef.current.value = null
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
    </div>
  )
})

export const Shapes = () => {
  const {activeTool, setActiveTool, setImage} = useAppContext()
  return <ShapeComponent activeTool={activeTool} setActiveTool={setActiveTool} setImage={setImage} />
}
