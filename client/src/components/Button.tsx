
type ButtonProps = {
  textValue: string;
  bgColor?: string;
  color?: string;
  handleClick: () => void;
  textSize?: string;
  padding: { px: string; py: string; };
}

export const Button = ({ textValue, handleClick, textSize='text-sm', padding, bgColor='bg-blue-600', color='text-white' }: ButtonProps) => {

  return (
    <button 
      onClick={handleClick}
      className={`whitespace-nowrap ${color} rounded-[3px] focus:outline-0 hover:opacity-95 active:opacity-100 font-medium transition-opacity ${textSize} ${padding.py} ${padding.px} ${bgColor}`}
      >
        {textValue}
    </button>
  )
}