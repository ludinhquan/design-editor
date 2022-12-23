export const isValidColor = (color: string) => {
  return CSS.supports('color', `#${color}`) || CSS.supports('color', color)
}

export const getColor = (color: string) => {
  if (CSS.supports('color', `#${color}`)) return `#${color}`
  return color
}
