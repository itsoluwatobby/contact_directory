import { createContext, useEffect, useState } from "react";
import { initAppModal, initAppState, initEditContact, initUserInfo } from "../utils/constants";
import { getContacts } from "../api/axios";
import { toast } from "react-toastify";

export const ContactContext = createContext<ContactContextType | null>(null);

export const ContactDataProvider = ({ children }: ChildrenProps) => {
  const [darkMode, setDarkMode] = useState<Theme>('light');
  const [appModal, setAppModal] = useState<AppModalType>(initAppModal);
  const [editContact, setEditContact] = useState<EditContact>(initEditContact);
  const [contactId, setContactId] = useState<string>('');
  const [allContacts, setAllContacts] = useState<ContactObjType[]>([]);
  const [appState, setAppState] = useState<AppState>(initAppState);
  const [revalidate, setRevalidate] = useState<number>(0);
  const [user, setUser] = useState<UserObjType>(initUserInfo as UserObjType);
  const [canProceed, setCanProceed] = useState<CanProceedType>(
    {
      proceed: (typeof window !== 'undefined' && window.localStorage.getItem('contact_userId')) ? true : false,
      openForm: false
    }
  )

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setDarkMode((typeof window !== "undefined" && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light' )
    }
    return () => {
      isMounted = false
    }
  }, [setDarkMode])

  useEffect(() => {
    let isMounted = true;
    const fetchContacts = async() => {
      setAppState(prev => ({...prev, isLoading: true}))
      await getContacts()
      .then((res) => {
        setAllContacts(res)
        setRevalidate(0);
      })
      .catch((error) => {
        const errors = error as ErrorResponse
        const msg = errors.response.data.message ?? error.message
        toast.error(msg)
        setAppState(prev => ({...prev, isError: true, error: msg}))
      })
      .finally(() => setAppState(prev => ({...prev, isLoading: false})))
    }
    if (isMounted && revalidate < 5) fetchContacts()

    return () => {
      isMounted = false;
    }
  }, [revalidate])

  useEffect(() => {
    if(!appState.isError) return
    const timeoutId = setTimeout(() => {
        setAppState(prev => ({...prev, isError: false, error: ''}));
        setRevalidate(prev => prev++);
      }, 4000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [appState.isError, setAppState])

  const value = {
    darkMode, setDarkMode, appModal, setAppModal, allContacts, setAllContacts, contactId, setContactId, editContact, setEditContact, appState, setRevalidate, user, setUser,
    canProceed, setCanProceed
  }
  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  )
}