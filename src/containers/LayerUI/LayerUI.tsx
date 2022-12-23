import {MainMenu} from "./MainMenu"

export const LayerUI = () => {
  console.log('LayerUI')
  return (
    <div className="w-screen h-screen fixed block">
      <div className="p-4">
        <MainMenu />
      </div>
    </div>
  )
}
