import {IconButton, LockedIcon} from "@/components";
import {SHAPES} from "@/constants";
import {IAppContext} from "@/contexts";
import {useAppContext} from "@/hooks";
import React, {useEffect, useRef} from "react";

type ShapeProps = Pick<IAppContext, 'activeTool' | 'setActiveTool' | 'setImage' | 'canvasInstance' | 'isLocked' | 'lockMode'>

const ShapeComponent = React.memo((props: ShapeProps) => {
  console.count('Shapes')
  const {activeTool, setActiveTool, canvasInstance, isLocked, lockMode, setImage: loadImage} = props

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      const {canvasInstance} = props;
      if (!canvasInstance.current.isSelectionMode || canvasInstance.current.isTyping) return;
      if (['i', '9'].includes(e.key)) openFile()
    }

    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [canvasInstance])

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
          <div className="pr-[12px] mr-[8px] border-r">
            <IconButton
              icon={LockedIcon}
              active={isLocked}
              onClick={() => lockMode(!isLocked)}
            />
          </div>
          {SHAPES.map(shape => (
            <IconButton
              key={shape.value}
              icon={shape.icon}
              active={shape.value === activeTool}
              fillable={shape.fillable}
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
  const {activeTool, setActiveTool, setImage, canvasInstance, isLocked, lockMode} = useAppContext()
  return (
    <ShapeComponent
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      setImage={setImage}
      canvasInstance={canvasInstance}
      isLocked={isLocked}
      lockMode={lockMode}
    />
  )
}
