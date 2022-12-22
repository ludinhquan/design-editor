import {Colors} from "@/constants"
import {Button, Popover} from "antd"
import Input from "antd/es/input/Input"
import {useEffect, useState} from "react"

type ColorPickerProps = {
  color: string,
  colors: string[]
}

const removeFirstHash = (str: string) => str.replace(/^#/, '')

export const ColorPicker = (props: ColorPickerProps) => {
  const [state, setState] = useState(removeFirstHash(props.color));
  const [color, setColor] = useState(state);


  useEffect(() => {
    if (CSS.supports('color', state)) setColor(state)
    else if (CSS.supports('color', `#${state}`)) setColor(`#${state}`)
  }, [state])

  const Content = () => (
    <div className="grid grid-cols-5 gap-2">
      {props.colors.map(color => <Button key={color} style={{backgroundColor: color}} onClick={() => setState(removeFirstHash(color))} />)}
    </div>
  );

  return (
    <div className="flex space-x-2">
      <Popover placement="rightTop" trigger="click" content={<Content />}>
        <Button size="middle" style={{backgroundColor: color}} />
      </Popover>
      <Input size="middle" prefix="#" value={state} onChange={(e) => setState(removeFirstHash(e.target.value))} />
    </div>
  )
}

export const ShapeAction = () => {
  return (
    <div className="flex justify-start w-[202px]" >
      <div className="p-[12px] rounded-[4px] shadow-main space-y-3">
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500	"> Stroke </div>
          <div className="flex space-x-2">
            <ColorPicker color={Colors.ElementStroke[0]} colors={Colors.ElementStroke} />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500	">Background</div>
          <div className="flex space-x-2">
            <ColorPicker color={Colors.ElementBackground[0]} colors={Colors.ElementBackground} />
          </div>
        </div>
      </div>
    </div>
  )
}
