import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "./Input"
import { ContactCard } from "./contactComponent/ContactCard"
import { Button } from "./Button";
import { useContactContext } from "../context/useContactContext";
import { LoadingSpinner } from "./Loading";
// import { deleteContact } from '../api/axios'
// import { toast } from "react-toastify";


export const ContactManager = () => {
  const [search, setSearch] = useState<string>('')
  const { darkMode, appState, setAppModal, allContacts } = useContactContext()
  const [ filteredContacts, setFilteredContacts ] = useState<ContactObjType[]>([])

  const { isLoading, error } = appState

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

  useEffect(() => {
    if (!allContacts?.length) return
    setFilteredContacts(allContacts.filter(contact => {
      return (
        (contact.firstName.toLowerCase()).includes(search.toLowerCase())
        || (contact.lastName.toLowerCase()).includes(search.toLowerCase())
        || ((contact.email as string).toLowerCase()).includes(search.toLowerCase())
        )
    }))
  }, [search, allContacts])

  // const handleContactDelete = async (contactId: string) => {
  //   try{
  //     await deleteContact(contactId)
  //     toast.success('Contact Removed')
  //   }
  //   catch(error: unknown){
  //     const errors = error as ErrorResponse
      // toast.error(errors.response.data.message)
  //   }
  // }

  const sortedContacts = filteredContacts?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return (
    <main className="w-full h-full flex flex-col pb-4 gap-y-5 overflow-y-scroll">
      <section className={`sticky top-0 py-2 px-3 z-10 w-full ${darkMode === 'light' ? 'bg-gradient-to-b from-slate-200 to-slate-50' : 'bg-slate-900'} transition-colors`}>
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
          sortedContacts?.length ? 
            sortedContacts?.map(contact => (
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