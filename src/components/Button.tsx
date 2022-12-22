import {Button, ButtonProps} from "antd";

type IconButtonProps = ButtonProps & {
  active?: boolean
  border?: boolean
}


export const IconButton = (props: IconButtonProps) => {
  const {active, border, ...restProps} = props

  const activeClassName = active ? 'bg-[#e3e2fe]' : ''
  const borderClassName = !border ? 'border-0' : ''

  return <Button size="large" {...restProps} className={`flex justify-center items-center ${activeClassName} ${borderClassName}`} />
}
