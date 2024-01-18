

type EnterTextProps = {
  name: 'description',
  textValue: string,
  placeholder: string,
  title?: string,
  rowSize: number,
  maxTextLength: number,
  setNewContact: React.Dispatch<React.SetStateAction<Partial<ContactObjType>>>
}

export const EnterText = ({ 
  name, title, textValue, maxTextLength, placeholder, rowSize, setNewContact
}: EnterTextProps) => {

  return (
    <div className="w-full flex flex-col gap-y-1">
      <p className="flex items-start gap-x-0.5">{title}</p>
      <textarea 
        name={name} 
        placeholder={placeholder}
        value={textValue}
        cols={10} rows={rowSize}
        maxLength={maxTextLength}
        onChange={event => setNewContact(prev => ({ 
          ...prev, [name]: event.target.value
        }))}
        className={`w-full resize-none text-sm text-black p-2 focus:outline-0 font-sans rounded-md border border-gray-600`}
      />
      <span className={`font-sans tracking-wider self-end font-medium ${textValue?.length === maxTextLength ? 'text-red-600' : ''} transition-colors`}>
        {textValue?.length}/{maxTextLength}
      </span>
    </div>
  )
}