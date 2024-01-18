import { ChangeEvent, useState } from "react"
import { Input } from "./Input"
import { ContactCard } from "./contactComponent/ContactCard"
import { Button } from "./Button";
import { useContactContext } from "../context/useContactContext";
import useSWR from "swr";
import { getContacts, contactEndpoint } from '../api/axios'
import { LoadingSpinner } from "./Loading";


export const ContactManager = () => {
  const [search, setSearch] = useState<string>('')
  const { darkMode, setAppModal } = useContactContext()
  const { isLoading, error, data: contacts, mutate } = useSWR(contactEndpoint, getContacts, {
    onSuccess: (data) => data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

  return (
    <main className="w-full h-full flex flex-col pb-4 gap-y-5 overflow-y-scroll">
      <section className={`sticky top-0 py-2 px-3 z-10 w-full ${darkMode === 'light' ? 'bg-white' : 'bg-slate-900'} transition-colors`}>
        <div className="flex items-center w-full flex-wrap sm:justify-between maxscreen:gap-2">
          <Input 
            value={search}
            placeholder="Search contact"
            name="search"
            handleInput={handleSearch}          
          />
          <Button 
            textValue="+ Add contact" 
            padding={{ px: 'px-3', py: 'py-2' }}
            handleClick={() => setAppModal(prev => ({ ...prev, addContact: 'OPEN'}))} />
        </div>
      </section>

      {
        isLoading ?   
          <LoadingSpinner />
        :
        error ? 
          <p className="text-3xl mt-5 text-red-400 capitalize text-center">{'An error occured'}</p>
        :
        <section className="grid lg:grid-cols-4 grid-cols-3 maxmobile:grid-cols-2 gap-y-5 gap-x-6 maxmobile:gap-8 px-3">
        { 
          contacts?.length ? 
            contacts?.map(contact => (
              <ContactCard key={contact._id} 
                darkMode={darkMode} 
                contact={contact}
              />
            ))
          : <p className="absolute left-[28%] text-center text-3xl font-mono mt-3 capitalize">Empty contact list</p>
        }
        </section>
      }
    </main>
  )
}   