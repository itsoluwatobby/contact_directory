import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";


export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="home flex flex-col w-full h-full">
      <Navbar />
      <div className="flex w-full flex-col justify-evenly h-full">
        <div className="header px-5 py-2 font-mono">
          <p className="first-letter:text-6xl capitalize text-3xl w-full">Welcome to Contact Directory, Your Very <span className="text-gray-200 fonnt-bold">First Choice</span> for managing your contacts</p>
        </div>
        <div className="aside w-[75%] self-center">
          <button 
          onClick={() => navigate('/contact_directory')}
          className={`w-full text-lg font-medium py-4 focus:outline-0 bg-gradient-to-tr from-slate-700 rounded-3xl hover:opacity-90 active:opacity-100 transition-opacity`}>
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}