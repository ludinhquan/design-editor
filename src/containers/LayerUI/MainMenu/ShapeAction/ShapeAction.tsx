import {DiamondIcon, EllipseIcon, IconButton, RectangleIcon} from "@/components"

export const ShapeAction = () => {
  return (
    <div className="flex justify-start" >
      <div className="p-[12px] rounded-[4px] shadow-main">
        <div className="flex flex-col space-y-1">
          <div> Stroke </div>
          <div className="flex space-x-2">
            <IconButton size="middle" border icon={RectangleIcon} />
            <IconButton size="middle" border icon={DiamondIcon} />
            <IconButton size="middle" border icon={EllipseIcon} />
          </div>
        </div>
      </div>
    </div>
  )
}
