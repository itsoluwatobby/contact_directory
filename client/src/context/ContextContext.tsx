import { createContext, useEffect, useState } from "react";
import { iniViewDetail, initAppModal, initEditContact } from "../utils/constants";

export const ContactContext = createContext<ContactContextType | null>(null);

export const ContactDataProvider = ({ children }: ChildrenProps) => {
  const [darkMode, setDarkMode] = useState<Theme>('light');
  const [appModal, setAppModal] = useState<AppModalType>(initAppModal);
  const [editContact, setEditContact] = useState<EditContact>(initEditContact);
  const [viewDetail, setViewDetail] = useState<ViewDetailType>(iniViewDetail);

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setDarkMode((typeof window !== "undefined" && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light' )
    }
    return () => {
      isMounted = false
    }
  }, [setDarkMode])

  const value = {
    darkMode, setDarkMode, appModal, setAppModal, viewDetail, setViewDetail, editContact, setEditContact
  }
  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  )
}