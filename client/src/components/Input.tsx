import { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { useContactContext } from "../context/useContactContext";

type InputProps = {
  value: string;
  name: string;
  show?: boolean;
  placeholder: string;
  required?: boolean;
  ref?: React.LegacyRef<HTMLInputElement>;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, required=false, show=true, placeholder, ref, name, handleInput }: InputProps) => {
  const { darkMode } = useContactContext()

  return (
    <div className={`w-full rounded-lg h-10 flex items-center ${darkMode === 'dark' ? 'bg-slate-900' : 'bg-slate-100'} transition-colors border border-gray-400 sm:w-[45%] pl-1`}>
      {show ? <CiSearch className="text-gray-400 flex-none text-2xl" /> : null}
      <input 
        type="text"
        ref={ref}
        name={name}
        value={value}
        autoComplete="off"
        required={required}
        placeholder={placeholder}
        onChange={handleInput}
        className="w-full h-full border-0 focus:outline-0 rounded-lg p-1 bg-inherit placeholder:text-gray-400"
      />
    </div>
  )
}