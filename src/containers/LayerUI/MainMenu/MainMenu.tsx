import {HamburgerMenuIcon, IconButton} from "@/components"
import {DownloadOutlined} from "@ant-design/icons"
import {Button} from "antd"
import {ShapeAction} from "./ShapeAction"
import {Shapes} from "./Shapes"

export const MainMenu = () => {
  return (
    <div className="flex flex-col space-y-10">
      <div className="flex justify-between">
        <div>
          <IconButton border icon={HamburgerMenuIcon} />
        </div>
        <div>
          <Shapes />
        </div>
        <div>
          <Button icon={<DownloadOutlined />} />
        </div>
      </div>
      <ShapeAction />
    </div>
  )
}

