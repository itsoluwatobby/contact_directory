import { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

type InputProps = {
  value: string;
  name: string;
  placeholder: string;
  ref?: React.LegacyRef<HTMLInputElement>;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, placeholder, ref, name, handleInput }: InputProps) => {

  return (
    <div className="w-full rounded-lg h-10 flex items-center bg-inherit border border-gray-400 sm:w-[40%] pl-1">
      <CiSearch className="text-gray-400 flex-none text-2xl" />
      <input 
        type="text"
        ref={ref}
        name={name}
        value={value}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleInput}
        className="w-full h-full border-0 focus:outline-0 rounded-lg p-1 bg-inherit placeholder:text-gray-400"
      />
    </div>
  )
}