import { Navigate, Outlet } from "react-router-dom";
import { useContactContext } from "../context/useContactContext"


export const ProtectedRoute = () => {
  const { canProceed } = useContactContext() as ContactContextType;

  return (
    <>
      {
        canProceed.proceed ? <Outlet /> : <Navigate to={'/'} />
      }
    </>
  )
}