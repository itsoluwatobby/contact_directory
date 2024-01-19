import { CiShoppingTag } from "react-icons/ci";
import { Button } from "../Button";
import { reduceTextLength } from "../../utils/helpers";
import { useContactContext } from "../../context/useContactContext";

type ContactCardProps = {
  darkMode: Theme;
  contact: ContactObjType;
}
export const ContactCard = ({ darkMode, contact }: ContactCardProps) => {
  const { firstName, lastName, occupation, imageUrl } = contact;
  const { setEditContact, setAppModal } = useContactContext() as ContactContextType;

  const handleEdit = () => {
    setEditContact({ edit: true, contact })
    setAppModal(prev => ({...prev, addContact: 'OPEN'}))
  }

  return (
    <main title={`View ${firstName}'s contact`} className={`rounded-tr-xl rounded-bl-xl shadow-md hover:scale-[1.001] transition-all min-w-40 h-56 px-2 pt-5 pb-2 flex flex-col items-center justify-between ${darkMode === 'light' ? 'bg-gradient-to-t from-slate-50 to-slate-200 shadow-slate-600' : 'bg-gradient-to-t from-slate-800 to-slate-900'}`}>
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
        <p className="whitespace-nowrap capitalize tracking-wide">{reduceTextLength(firstName + ' ' + lastName, 25)}</p>
        <p className="whitespace-nowrap flex items-center gap-x-1 text-xs text-gray-400">
          <CiShoppingTag />  
          <span>{reduceTextLength(occupation as string, 15) ?? 'Nil'}</span>
        </p>
      </div>

      <div className="self-baseline flex items-center justify-between w-full">
        <Button 
          textValue="Edit" textSize="text-[13px]"
          padding={{ px: 'px-3', py: 'py-0.5' }}
          bgColor={darkMode === 'dark' ? "bg-slate-700" : 'bg-slate-500'}
          handleClick={handleEdit} />

        <Button 
          textValue="view" textSize="text-[13px]"
          padding={{ px: 'px-3', py: 'py-0.5' }}
          bgColor={darkMode === 'dark' ? "bg-slate-700" : 'bg-slate-500'}
          handleClick={() => {}} />
      </div>
    </main>
  )
}  