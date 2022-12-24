import {AppContext, IAppContext} from "@/contexts"
import {useContext} from "react"

export const useAppContext = () => {
  const appContext = useContext<IAppContext>(AppContext)
  return appContext
}
