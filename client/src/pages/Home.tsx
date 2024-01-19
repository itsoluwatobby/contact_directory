import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { initAppState, initUserInfo } from "../utils/constants";
import { getStarted } from "../api/axios";
import { sanitizeEntries } from "../utils/helpers";
import { toast } from "react-toastify";
import { useContactContext } from "../context/useContactContext";
import { FaTimesCircle } from "react-icons/fa";


export default function Home() {
  const navigate = useNavigate()
  const { setUser, canProceed, setCanProceed } = useContactContext() as ContactContextType;
  const [newUser, setNewUser] = useState<Partial<UserObjType>>(initUserInfo);
  const [appState, setAppState] = useState<AppState>(initAppState)

  const { email, username } = newUser;
  const { isLoading } = appState

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUser(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const canSubmit = [email, username].every(Boolean);

  const handleUser = async(event: FormEvent) => {
    event.preventDefault()
    if(!canSubmit || isLoading) return
    setAppState(prev => ({...prev, isLoading: true}))
    const newUserDetails = sanitizeEntries(newUser) as UserObjType;
      await getStarted(newUserDetails)
      .then((res) => {
        setUser(res)
        typeof window !== 'undefined' ? window.localStorage.setItem('contact_userId', (res._id as string)?.toString()) : null
        setCanProceed({proceed: true, openForm: false})
        setNewUser(initUserInfo);
        navigate('/contact_directory');
      })
      .catch((error) => {
        const errors = error as ErrorResponse
        toast.error(errors.response.data.message)
        setAppState(prev => ({...prev, isError: true, error: errors.response.data.message}))
      })
      .finally(() => setAppState(prev => ({...prev, isLoading: false}))) 
  }

  return (
    <main className="home flex flex-col w-full h-full">
      <Navbar />
      <div className="relative flex w-full flex-col justify-around -mt-10 h-full">
        <div className="header px-5 py-2 font-mono">
          <p className="first-letter:text-6xl capitalize text-3xl w-full">Welcome to Contact Directory, Your Very <span className="text-gray-200 fonnt-bold">First Choice</span> for managing your contacts</p>
        </div>
        <div className="aside w-[75%] self-center">
          <button 
          onClick={() => {
            canProceed.proceed ?
            navigate('/contact_directory')
            : setCanProceed(prev => ({...prev, openForm: true}))
          }}
          className={`w-full lg:w-[80%] text-lg font-medium py-4 focus:outline-0 bg-gradient-to-tr from-slate-700 rounded-3xl hover:opacity-90 active:opacity-100 transition-opacity`}>
            Get Started
          </button>
        </div>

        <div className={`absolute bg-slate-800 w-full h-full ${canProceed.openForm ? 'flex' : 'hidden'} items-center justify-center bg-opacity-70`}>

          <form onSubmit={handleUser}
          className="relative bg-gray-500 flex flex-col items-center gap-y-4 w-96 rounded shadow-md p-3 py-4"
          >
            <FaTimesCircle 
            onClick={() => setCanProceed(prev => ({...prev, openForm: false}))}
            className="text-black text-2xl cursor-pointer absolute right-1 top-1 hover:scale-[1.002] active:scale-[1] transition-transform" />

            <legend className='text-xl'>Enter Details</legend>
            <input 
              type="email"
              value={email as string}
              required={true}
              autoComplete="off"
              placeholder="Email*"
              name="email"
              onChange={handleInput}
              className="h-9 rounded-sm w-full focus:outline-0 border-0 p-1 text-black" 
            />
            <input 
              type="text"
              autoComplete="off"
              value={username as string}
              required={true}
              placeholder="Username*"
              name="username"
              onChange={handleInput}
              className="h-9 rounded-sm w-full focus:outline-0 border-0 p-1 text-black" 
              />

            <button
            type="submit"
            disabled={!canSubmit}
            className={`p-2.5 w-40 focus:outline-0 ${canSubmit ? 'bg-green-500' : 'bg-gray-800'} rounded-md`}
            >
              {isLoading ? 'In Progress...' : 'Proceed'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}