import { ContactManager } from "../components/ContactManager"
import { Navbar } from "../components/Navbar"


export const Contact = () => {

  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      <ContactManager />
    </div>
  )
}

