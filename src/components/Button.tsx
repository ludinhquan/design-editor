import {Button, ButtonProps} from "antd";
import styles from './button.module.css'

type IconButtonProps = ButtonProps & {
  active?: boolean
  border?: boolean
  fillable?: boolean
}


export const IconButton = (props: IconButtonProps) => {
  const {active, border, fillable, className, ...restProps} = props

  const activeClassName = active ? 'bg-[#e3e2fe] '.concat(styles.active) : ''
  const borderClassName = !border ? 'border-0' : ''
  const fill = fillable && active ? styles.fillable : ''

  return <Button
    size="large" {...restProps}
    className={`flex justify-center items-center ${activeClassName} ${borderClassName} ${className} ${fill}`}
    style={{outline: 'none'}}
  />
}
