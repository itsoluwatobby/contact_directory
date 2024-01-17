import { ChangeEvent, useState } from "react"
import { Input } from "./Input"
import { ContactCard } from "./contactComponent/ContactCard"
import { Button } from "./Button";
// import { Contacts } from "./contactComponent/Contacts";


type ContactManagerProps = {
  theme: Theme;
}
export const ContactManager = ({ theme }: ContactManagerProps) => {
  const [search, setSearch] = useState<string>('')
  const [addContact, setAddContact] = useState<Toggle>('CLOSE')

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

  return (
    <main className="w-full h-full flex flex-col pb-4 px-3 gap-y-5 overflow-y-scroll">
      <section className={`sticky top-0 py-2 z-10 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'} transition-colors`}>
        <div className="flex items-center flex-wrap sm:justify-between maxscreen:gap-2">
          <Input 
            value={search}
            placeholder="Search contact"
            name="search"
            handleInput={handleSearch}          
          />
          <Button 
            textValue="+ Add contact" 
            padding={{ px: 'px-3', py: 'py-2' }}
            handleClick={() => setAddContact('OPEN')} />
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-5 justify-center maxmobile:gap-8">
      {
        [...Array(10).keys()].map(cont => (
          <ContactCard key={cont} theme={theme} />
        ))
      }
      </section>
    </main>
  )
}   