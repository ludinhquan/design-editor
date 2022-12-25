import {BringForwardIcon, BringToFrontIcon, EdgeRoundIcon, EdgeSharpIcon, IconButton, SendBackwardIcon, SendToBackIcon, StrokeWidthBaseIcon, StrokeWidthBoldIcon, StrokeWidthExtraBoldIcon} from "@/components"
import {Colors} from "@/constants"
import {useAppContext} from "@/hooks"
import {getColor, isValidColor} from "@/utils"
import {Button, Popover, Slider} from "antd"
import Input from "antd/es/input/Input"
import {useEffect, useState} from "react"

type ColorPickerProps = {
  type: 'strokeColor' | 'backgroundColor'
  color: string,
  colors: string[]
}

const removeFirstHash = (str: string) => str.replace(/^#/, '')

export const ColorPicker = (props: ColorPickerProps) => {
  const {appState, setAppState} = useAppContext();
  const [state, setState] = useState(removeFirstHash(appState[props.type]));

  useEffect(() => {
    if (!isValidColor(state)) return
    if (getColor(state) === getColor(appState[props.type])) return
    setAppState({[props.type]: getColor(state)})
  }, [state])

  const Content = () => (
    <div className="grid grid-cols-5 gap-2">
      {props.colors.map(color => <Button key={color} style={{backgroundColor: color}} onClick={() => setState(removeFirstHash(color))} />)}
    </div>
  );

  return (
    <div className="flex space-x-2">
      <Popover placement="rightTop" trigger="click" content={<Content />}>
        <Button size="middle" style={{backgroundColor: appState[props.type]}} />
      </Popover>
      <Input size="middle" prefix="#" value={state} onChange={(e) => setState(removeFirstHash(e.target.value))} />
    </div>
  )
}

export const ShapeAction = () => {
  console.count('ShapeAction')
  const {appState, setAppState} = useAppContext();

  return (
    <div className="flex justify-start w-[202px]" >
      <div className="p-[12px] rounded-[4px] shadow-main space-y-3">
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500"> Stroke </div>
          <div className="flex space-x-2">
            <ColorPicker type="strokeColor" color={Colors.ElementStroke[0]} colors={Colors.ElementStroke} />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500">Background</div>
          <div className="flex space-x-2">
            <ColorPicker type="backgroundColor" color={Colors.ElementBackground[0]} colors={Colors.ElementBackground} />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500">Stroke width</div>
          <div className="flex space-x-2">
            {[
              {value: 1, icon: StrokeWidthBaseIcon},
              {value: 2, icon: StrokeWidthBoldIcon},
              {value: 3, icon: StrokeWidthExtraBoldIcon},
            ].map(item => {
              return <IconButton key={item.value} active={appState.strokeWidth === item.value} border size="middle" icon={item.icon} onClick={() => setAppState({strokeWidth: item.value})} />
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500">Edges</div>
          <div className="flex space-x-2">
            {[
              {value: null, icon: EdgeSharpIcon},
              {value: 10, icon: EdgeRoundIcon},
            ].map(item => {
              return <IconButton key={item.value} active={appState.roughness === item.value} border size="middle" icon={item.icon} onClick={() => setAppState({roughness: item.value})} />
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500">Opacity</div>
          <div className="space-x-2">
            <Slider className="m-0" value={appState.opacity} disabled={false} onChange={(value: number) => setAppState({opacity: value})} />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-slate-500">Layers</div>
          <div className="flex space-x-2">
            {[
              {value: 1, icon: SendToBackIcon},
              {value: 2, icon: SendBackwardIcon},
              {value: 3, icon: BringToFrontIcon},
              {value: 4, icon: BringForwardIcon},
            ].map(item => {
              return <IconButton key={item.value} border size="middle" icon={item.icon} onClick={() => setAppState({roughness: item.value})} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
