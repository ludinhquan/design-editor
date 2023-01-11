import {HamburgerMenuIcon, IconButton, SaveIcon} from "@/components"
import {ShapeAction} from "./ShapeAction"
import {Shapes} from "./Shapes"

export const MainMenu = () => {
  console.count('MainMenu')
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-between">
        <div>
          <IconButton border icon={HamburgerMenuIcon} />
        </div>
        <div>
          <Shapes />
        </div>
        <div>
          <IconButton border icon={SaveIcon} />
        </div>
      </div>
      <ShapeAction />
    </div>
  )
}

