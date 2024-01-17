// import { useState } from 'react'

import { useEffect, useState } from "react"
import { ContactManager } from "./components/ContactManager"
import { Navbar } from "./components/Navbar"
// import { IoIosMoon, IoIosSunny } from "react-icons/io"


function App() {
  const [darkMode, setDarkMode] = useState<Theme>('light')

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setDarkMode((typeof window !== "undefined" && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light' )
    }
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className={`${darkMode === 'dark' ? 'dark:bg-slate-900 text-white' : ''} transition-colors w-full flex items-start h-screen text-sm mobile:h-[100svh]`}>
      <aside className="relative flex flex-col gap-y-20 items-center min-w-44 px-2 h-full border-r border-gray-400">
        <h1 className="first-letter:font-semibold font-mono first-letter:text-3xl text-lg py-1 rounded-md shadow-md px-2 text-orange-900">ContactManager</h1>

        <div className="flex flex-col w-full gap-y-3">
          <button className="w-full py-3 focus:outline-0 bg-slate-700 rounded-sm hover:opacity-90 active:opacity-100 transition-opacity">
            Contacts
          </button>
          <button className="w-full py-3 focus:outline-0 bg-slate-700 rounded-sm hover:opacity-90 active:opacity-100 transition-opacity">
            Add Contacts
          </button>
        </div>

        <button className="absolute flex w-20 h-10 bottom-2 rounded-[30px] p-0.5 cursor-default bg-blue-600">
          {
            // darkMode === 'dark' ?
            // <IoIosMoon className='text-lg self-center text-slate-800' />
            // :
            // <IoIosSunny className='text-lg translate-x-14 self-center text-white' />
          }
          <div 
          onClick={() => setDarkMode(prev => prev === 'light' ? 'dark' : 'light')}
          className={`z-10 ${darkMode === 'light' ? '' : 'translate-x-10'} hover:opacity-90 active:opacity-100 transition-all duration-300 rounded-full h-full w-[48%] cursor-pointer bg-slate-100`}/>
        </button>
      </aside>
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <ContactManager theme={darkMode} />
      </div>
    </main>
  )
}

export default App
