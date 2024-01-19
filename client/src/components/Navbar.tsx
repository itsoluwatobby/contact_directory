import { HiMenuAlt2 } from "react-icons/hi"
import { useContactContext } from "../context/useContactContext"
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation()
  const { setAppModal } = useContactContext() as ContactContextType;

  return (
    <main className="w-full flex items-center justify-between sticky top-0 shadow-sm px-4 pt-3 pb-2">
      <div className="flex items-center gap-x-8">
        <HiMenuAlt2 
          onClick={() => setAppModal(prev => ({ ...prev, sideBar: 'OPEN' }))}
        className="hidden midscreen:block text-3xl cursor-pointer hover:scale-[1.002] active:scale-[1] transition-transform"/>
        {
          pathname === '/' ?
          <h3 className="font-medium text-lg cursor-default text-center">Built with React & Nodejs</h3>
          :
          <h3 className="font-medium text-lg cursor-default">Contacts</h3>
        }
      </div>
    </main>
  )
}  