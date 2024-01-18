import { Context, useContext } from "react"
import { ContactContext } from "./ContextContext"

export const useContactContext = () => {
  return useContext<ContactContextType>(ContactContext as Context<ContactContextType>);
}