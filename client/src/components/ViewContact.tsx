import { useEffect, useState } from "react";
import { useContactContext } from "../context/useContactContext"
import { LoadingSpinner } from "./Loading";
import { checkCount, reduceTextLength } from "../utils/helpers";
import { CiShoppingTag } from "react-icons/ci";
import { initAppState, initContactObj } from "../utils/constants";
import { viewContact } from "../api/axios";
import { format } from "timeago.js";
import { toast } from "react-toastify";


export const ViewContact = () => {
  const { darkMode, contactId, setContactId, appModal, setAppModal } = useContactContext() as ContactContextType;
  const [appState, setAppState] = useState<AppState>(initAppState);
  const [contact, setContact] = useState<ContactObjType>(initContactObj as ContactObjType)
  
  const { isLoading, isError } = appState;

  useEffect(() => {
    let isMounted = true;
    const fetchContact = async() => {
      if (!contactId) return
      setAppState(prev => ({...prev, isLoading: true}))
      await viewContact(contactId)
      .then((res) => {
        setContact(res)
      })
      .catch((error) => {
        const errors = error as ErrorResponse
        toast.error(errors.response.data.message)
        setAppState(prev => ({...prev, isError: true}))
      })
      .finally(() => setAppState(prev => ({...prev, isLoading: false})))
    }
    if (isMounted) fetchContact()
    
    return () => {
      isMounted = false;
    }
  }, [contactId])
  
  const { firstName, lastName, imageUrl, email, occupation, description, country, address, gender, createdAt, viewsCount } = contact as ContactObjType;
  
  useEffect(() => {
    if(!isError) return
    const timeoutId = setTimeout(() => {
      setAppState(prev => ({...prev, isError: false}))
      setAppModal(prev => ({...prev, viewContact: 'CLOSE'}))
      }, 4000)
      return () => {
      clearTimeout(timeoutId)
    }
  }, [isError, setAppModal])
  
  const closeModal = () => {
    setContactId('')
    setAppModal(prev => ({...prev, viewContact: 'CLOSE'}))
    setContact(initContactObj as ContactObjType)
  }

  return (
    <section className={`z-20 ${appModal.viewContact === 'OPEN' ? 'fixed' : 'hidden'} ${darkMode === 'dark' ? 'bg-gradient-to-t from-slate-900 to-slate-800' : 'bg-gradient-to-tr from-purple-100 to-slate-50'} h-full w-full rounded-lg inset-0 flex items-center justify-center transition-colors`}>
      <button 
      onClick={closeModal}
      className={`absolute top-5 right-5 focus:outline-0 rounded-[3px] hover:opacity-90 transition-all border-0 px-2 py-1 ${darkMode === 'dark' ? 'bg-slate-900' : 'bg-slate-400'}`}>
        Close
      </button>

      {
        isLoading ?   
         <LoadingSpinner />
        :
        isError ? 
          <p className="text-3xl mt-5 text-red-400 capitalize text-center">{'Error fetching Contact'}</p>
        :
        <article className={`z-10 ${darkMode === 'dark' ? 'bg-gradient-to-tr from-slate-800 to-slate-900' : 'bg-gradient-to-b from-slate-100 to-slate-300 shadow-slate-300'} border-1 w-[30rem] maxscreen:w-[87%] h-[88%] rounded-lg shadow-lg absolute bottom-5 flex flex-col gap-y-5 p-5`}>
        <div
        title={`${checkCount(viewsCount)} visits`}
         className="absolute top-0 left-0 rounded-md border shadow w-fit p-2 border-slate-700">
          {checkCount(viewsCount)}
        </div>
        
          <div className="flex gap-x-6 justify-between pl-4">
            <figure className={`flex-none cursor-default bg-gray-300 border-[4px] border-r-gray-400 border-l-gray-400 border-t-gray-500 border-b-gray-500 w-28 h-28 rounded-full shadow-sm`}>
              {
                imageUrl ? 
                <img src={imageUrl} alt="user profile" 
                className="rounded-full object-cover h-full w-full"
                />
                : null
              }
            </figure>

            <div className="w-full flex flex-col gap-y-2">
              <p className="capitalize font-mono text-base">{firstName} {lastName}</p>

              <div className="flex items-center gap-x-1">
                <CiShoppingTag />  
                <span className="font-normal text-[12px] tracking-wide">{occupation}</span>
              </div>
              <p className="text-gray-300 text-sm">
               {reduceTextLength(description as string, 150)}
              </p>
            </div>
          </div>

          <hr />

          <DataEntry title="Created: " content={format(createdAt)} />


          <DataEntry title="Email Address: " content={email as string} />
    
          <div className="flex items-center justify-between w-full">
            <DataEntry 
              title="Gender"
              content={gender}
            />

            <DataEntry 
              title="Country"
              content={country as string}
            />
          </div>

          <DataEntry title="Address: " content={reduceTextLength(address as string, 50)} />

          <DataEntry title="Updated: " content={format(createdAt)} />
          <button 
            onClick={closeModal}
            className={`self-end w-[35%] absolute bottom-5 focus:outline-0 mt-3 rounded-[3px] hover:opacity-90 transition-all border-0 px-5 py-3 text-white ${darkMode === 'dark' ? 'bg-slate-700' : 'bg-slate-700'}`}>
            Close
          </button>
        </article>
      }
    </section>
  )
}


type DataEntryProps = {
  title: string;
  content: string;
}
const DataEntry = ({ title, content }: DataEntryProps) => {

  return (
    <div className="flex flex-col items-start gap-y-1">
      <span className="font-medium text-[15px]">{title}</span>
      <p>{content}</p>
    </div>
  )
}