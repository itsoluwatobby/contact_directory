// import { useState } from 'react'

import { useEffect } from "react"
import { useContactContext } from "./context/useContactContext"
import { Sidebar } from "./components/Sidebar"
import { switchModals, toggleAttributes } from "./utils/helpers"
import { NewContact } from "./components/NewContact"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home"
import { Contact } from "./pages/Contact"
import { ViewContact } from "./components/ViewContact"


let prevPathname = '';
function App() {
  const { darkMode, appModal, setAppModal } = useContactContext() as ContactContextType;
  const { pathname } = useLocation()

  const { addContact, sideBar, viewContact } = appModal;

  useEffect(() => {
    if(pathname !== prevPathname) {
      setAppModal(prev => toggleAttributes(prev, 'CLOSE') as AppModalType)
      prevPathname = pathname
    }
    if(addContact === 'OPEN') setAppModal(switchModals['addContact']);
    
    else if(viewContact === 'OPEN') setAppModal(switchModals['viewContact']);
  
    else if(sideBar === 'OPEN') setAppModal(switchModals['sideBar']);

  }, [addContact, viewContact, sideBar, setAppModal, pathname])
  

  return (
    <main className={`${darkMode === 'dark' ? 'dark:bg-slate-900 text-white' : 'bg-gradient-to-tr from-slate-200 to-slate-50'} transition-colors w-full flex items-start h-screen text-sm mobile:h-[100svh]`}>
      <Sidebar />
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='/contact_directory' element={<Contact />} />
        </Route>
      </Routes>

      <NewContact />
      <ViewContact />

      <ToastContainer />    
    </main>
  )
}

export default App
