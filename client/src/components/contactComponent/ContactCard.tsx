import { CiShoppingTag } from "react-icons/ci";
import { Button } from "../Button";
import { checkCount, reduceTextLength } from "../../utils/helpers";
import { useContactContext } from "../../context/useContactContext";

type ContactCardProps = {
  darkMode: Theme;
  contact: ContactObjType;
}
export const ContactCard = ({ darkMode, contact }: ContactCardProps) => {
  const { firstName, lastName, occupation, imageUrl } = contact;
  const { setEditContact, setAppModal, setContactId } = useContactContext() as ContactContextType;

  const handleEdit = () => {
    setEditContact({ edit: true, contact })
    setAppModal(prev => ({...prev, addContact: 'OPEN'}))
  }
  
  const handleContactView = () => {
    setContactId(contact._id as string)
    setAppModal(prev => ({...prev, viewContact: 'OPEN'}))
  }

  return (
    <main title={`View ${firstName}'s contact`} className={`relative rounded-tr-xl rounded-bl-xl shadow-sm hover:skew-x-1 transition-all min-w-40 h-56 px-2 pt-5 pb-2 flex flex-col items-center justify-between ${darkMode === 'light' ? 'bg-gradient-to-t from-[#d1e0ef] to-[#eff9f8] shadow-slate-500' : 'bg-gradient-to-t from-[#2b2848] to-[#222322]'}`}>
      <div
        title={`${checkCount(contact.viewsCount)} visits`}
         className={`absolute top-0 left-0 font-medium cursor-default rounded-md border shadow-sm w-fit p-2 ${darkMode === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          {checkCount(contact.viewsCount)}
        </div>
      <figure className="bg-gray-300 border-2 border-r-gray-400 border-l-gray-400 border-t-gray-500 border-b-gray-500 w-20 h-20 rounded-full shadow-sm">
        {
          imageUrl ? 
          <img src={imageUrl as string} alt={`${contact.firstName}-profile`} 
          className="rounded-full object-cover h-full w-full"
          />
          : null
        }
      </figure>

      <div className="flex flex-col w-full items-center gap-y-0.5">
        <p className="whitespace-nowrap capitalize tracking-wide font-medium">{reduceTextLength(firstName + ' ' + lastName, 25)}</p>
        <p className={`whitespace-nowrap flex items-center gap-x-1 text-xs ${darkMode === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
          <CiShoppingTag />  
          <span>{reduceTextLength(occupation as string, 20) ?? 'Nil'}</span>
        </p>
      </div>

      <div className="self-baseline flex items-center justify-between w-full">
        <Button 
          textValue="Edit" textSize="text-[13px]" 
          color={darkMode === 'dark' ? 'text-white' : 'text-black'}
          padding={{ px: 'px-3', py: 'py-0.5' }}
          bgColor={darkMode === 'dark' ? "bg-slate-700" : 'bg-slate-300'}
          handleClick={handleEdit} />

        <Button 
          textValue="view" textSize="text-[13px]"
          padding={{ px: 'px-3', py: 'py-0.5' }}
          color={darkMode === 'dark' ? 'text-white' : 'text-black'}
          bgColor={darkMode === 'dark' ? "bg-slate-700" : 'bg-slate-300'}
          handleClick={handleContactView} />
      </div>
    </main>
  )
}  