import {HamburgerMenuIcon} from "@/components"
import {Button} from "antd"

export const Menu = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Button className="flex justify-center align-center w-[40px] h-[40px]" size="large" icon={HamburgerMenuIcon} />
      </div>
      <div>
        2
      </div>
      <div>
        3
      </div>
    </div>
  )
}

