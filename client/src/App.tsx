// import { useState } from 'react'

import { useEffect } from "react"
import { ContactManager } from "./components/ContactManager"
import { Navbar } from "./components/Navbar"
import { useContactContext } from "./context/useContactContext"
import { Sidebar } from "./components/Sidebar"
import { switchModals } from "./utils/helpers"
import { NewContact } from "./components/NewContact"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  const { darkMode, setDarkMode, appModal, setAppModal } = useContactContext() as ContactContextType;

  const { addContact, sideBar, viewContact } = appModal;

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setDarkMode((typeof window !== "undefined" && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light' )
    }
    return () => {
      isMounted = false
    }
  }, [setDarkMode])

  useEffect(() => {
    // if(pathname !== prevPathname) {
    //   setAppModal(prev => toggleAttributes(prev, 'CLOSE') as AppModalPromptType)
    //   prevPathname = pathname
    // }
    if(addContact === 'OPEN') setAppModal(switchModals['addContact']);
    
    else if(viewContact === 'OPEN') setAppModal(switchModals['viewContact']);
  
    else if(sideBar === 'OPEN') setAppModal(switchModals['sideBar']);

  }, [addContact, viewContact, sideBar, setAppModal])
  

  return (
    <main className={`${darkMode === 'dark' ? 'dark:bg-slate-900 text-white' : ''} transition-colors w-full flex items-start h-screen text-sm mobile:h-[100svh]`}>
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <ContactManager />
      </div>

      <NewContact />

      <ToastContainer />
    
    </main>
  )
}

export default App
