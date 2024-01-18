
type LoadingSpinnerProps = {
  width?: string;
  height?: string;
}
export const LoadingSpinner = ({ width='w-14', height='h-14' }: LoadingSpinnerProps) => {

  return (
    <div className={`rounded-full border-[3px] animate-spin ${width} ${height} self-center mt-10 border-l-slate-500 border-r-slate-500 border-t-slate-800 border-b-slate-800`}></div>
  )
}