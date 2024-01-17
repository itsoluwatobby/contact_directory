import { CiShoppingTag } from "react-icons/ci";
import { Button } from "../Button";

type ContactCardProps = {
  theme: Theme;
}
export const ContactCard = ({ theme }: ContactCardProps) => {


  return (
    <main className={`rounded-md shadow-sm hover:scale-[1.002] active:scale-[1] transition-all min-w-40 h-48 px-2 pt-5 pb-1 flex flex-col items-center justify-between ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}>
      <figure className="bg-gray-300 w-16 h-16 rounded-full">
        {
          [].length ? 
          <img src="" alt="" 
          className="rounded-full object-cover h-full w-full"
          />
          : null
        }
      </figure>

      <div className="flex flex-col w-full items-center gap-y-0.5">
        <p className="whitespace-nowrap">{'Samuel Gabriel'}</p>
        <p className="whitespace-nowrap flex items-center gap-x-1 text-xs text-gray-400">
          <CiShoppingTag />  
          <span>{'Founder'}</span>
        </p>
      </div>

      <div className="self-baseline flex items-center justify-between w-full">
        <Button 
          textValue="Edit" textSize="text-[13px]"
          padding={{ px: 'px-3', py: 'py-0.5' }}
          bgColor="bg-slate-700"
          handleClick={() => {}} />

        <Button 
          textValue="value" textSize="text-[13px]"
          padding={{ px: 'px-3', py: 'py-0.5' }}
          bgColor="bg-slate-700"
          handleClick={() => {}} />
      </div>
    </main>
  )
}  