import { createContext, useState } from "react";
import { initAppModal } from "../utils/constants";

export const ContactContext = createContext<ContactContextType | null>(null);

export const ContactDataProvider = ({ children }: ChildrenProps) => {
  const [darkMode, setDarkMode] = useState<Theme>('light');
  const [appModal, setAppModal] = useState<AppModalType>(initAppModal);

  const value = {
    darkMode, setDarkMode, appModal, setAppModal
  }
  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  )
}