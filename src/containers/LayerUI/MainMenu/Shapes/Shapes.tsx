import {ArrowIcon, DiamondIcon, EllipseIcon, EraserIcon, FreedrawIcon, IconButton, ImageIcon, LineIcon, RectangleIcon, TextIcon} from "@/components"

export const Shapes = () => {
  return (
    <div className="flex justify-center" >
      <div className="p-[4px] rounded-[4px] shadow-main">
        <div className="flex space-x-1">
          <IconButton active icon={RectangleIcon} />
          <IconButton icon={DiamondIcon} />
          <IconButton icon={EllipseIcon} />
          <IconButton icon={ArrowIcon} />
          <IconButton icon={LineIcon} />
          <IconButton icon={FreedrawIcon} />
          <IconButton icon={TextIcon} />
          <IconButton icon={ImageIcon} />
          <IconButton icon={EraserIcon} />
        </div>
      </div>
    </div>
  )
}
