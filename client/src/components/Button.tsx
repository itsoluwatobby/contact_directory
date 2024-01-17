
type ButtonProps = {
  textValue: string;
  bgColor?: string;
  handleClick: () => void;
  textSize?: string;
  padding: { px: string; py: string; };
}

export const Button = ({ textValue, handleClick, textSize='text-sm', padding, bgColor='bg-blue-600' }: ButtonProps) => {

  return (
    <button 
      onClick={handleClick}
      className={`whitespace-nowrap rounded-[3px] focus:outline-0 hover:opacity-90 active:opacity-100 transition-opacity ${textSize} ${padding.py} ${padding.px} ${bgColor}`}
      >
        {textValue}
    </button>
  )
}