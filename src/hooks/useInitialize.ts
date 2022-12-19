import React from "react"

export const useInitialize = (initializer: Function) => {
  React.useState(initializer)
}
