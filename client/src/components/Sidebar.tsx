import { MdMenuOpen } from "react-icons/md";
import { useContactContext } from "../context/useContactContext"


export const Sidebar = () => {
  const { darkMode, setDarkMode, appModal, setAppModal } = useContactContext() as ContactContextType;

  return (
    <aside className={`${appModal.sideBar === 'OPEN' ? 'midscreen:w-full fixed md:relative z-20 bg-opacity-95 md:items-center' : 'midscreen:hidden relative items-center'} ${darkMode === 'light' ? 'bg-white text-white' : 'bg-slate-900'}  transition-all flex flex-col gap-y-20 md:min-w-56 px-2 h-full border-r border-gray-400`}>
      <div className="flex items-center justify-between">
        <h1 className="first-letter:font-semibold font-mono midscreen:w-fit first-letter:text-3xl text-lg py-1 rounded-md shadow-md px-2 text-orange-600">ContactDirectory</h1>
      <MdMenuOpen 
         onClick={() => setAppModal(prev => ({ ...prev, sideBar: 'CLOSE' }))}
         className="hidden midscreen:block text-3xl cursor-pointer hover:scale-[1.002] active:scale-[1] transition-transform"
         />
      </div>

      <div className="flex flex-col w-full midscreen:w-48 gap-y-3">
        <button 
         onClick={() => setAppModal(prev => ({ ...prev, sideBar: 'CLOSE' }))}
         className={`w-full py-3 focus:outline-0 bg-slate-700 rounded-sm hover:opacity-90 active:opacity-100 transition-opacity`}>
          Contacts
        </button>
        <button 
        onClick={() => setAppModal(prev => ({ ...prev, addContact: 'OPEN' }))}
        className={`w-full py-3 focus:outline-0 bg-slate-700 rounded-sm hover:opacity-90 active:opacity-100 transition-opacity`}>
          Add Contacts
        </button>
      </div>

      <button className={`absolute flex w-20 h-10 bottom-2 rounded-[30px] p-0.5 cursor-default ${darkMode === 'dark' ? 'bg-blue-950' : 'bg-blue-600'} transition-colors`}>
        <div 
        onClick={() => setDarkMode(prev => prev === 'light' ? 'dark' : 'light')}
        className={`z-10 ${darkMode === 'light' ? 'bg-slate-100' : 'translate-x-10 bg-slate-300'} hover:opacity-90 active:opacity-100 transition-all duration-300 rounded-full h-full w-[48%] cursor-pointer`}/>
      </button>
    </aside>
  )
}