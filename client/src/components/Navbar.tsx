import { HiMenuAlt2 } from "react-icons/hi"
import { useContactContext } from "../context/useContactContext"

export const Navbar = () => {
  const { appModal, setAppModal } = useContactContext() as ContactContextType;

  return (
    <main className="w-full flex items-center justify-between sticky top-0 shadow-sm px-4 pt-3 pb-2">
      <div className="flex items-center gap-x-8">
        <HiMenuAlt2 
          onClick={() => setAppModal(prev => ({ ...prev, sideBar: 'OPEN' }))}
        className="hidden midscreen:block text-3xl cursor-pointer hover:scale-[1.002] active:scale-[1] transition-transform"/>
        <h3 className="font-medium text-lg">Contacts</h3>
      </div>
    </main>
  )
}  