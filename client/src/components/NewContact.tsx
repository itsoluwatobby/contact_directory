/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react'
import { MAX_TEXT, initAppState, initContactObj, initEditContact } from '../utils/constants'
import { sanitizeEntries } from '../utils/helpers';
import { useContactContext } from '../context/useContactContext';
import { Input } from './Input';
import { EnterText } from './EnterText';
import { toast } from "react-toastify";
import { updateContact, addContact } from '../api/axios';
import { ProfilePicture } from './newContact/ProfilePicture';

export const NewContact = () => {
  const [newContact, setNewContact] = useState<Partial<ContactObjType>>(initContactObj);
  const [loading, setLoading] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppState>(initAppState);
  const { darkMode, setRevalidate, allContacts, setAllContacts, editContact, setEditContact, appModal, setAppModal } = useContactContext() as ContactContextType
  const GENDER = ['Male', 'Female', 'Undecided']
  const userId = typeof window !== 'undefined' ? window.localStorage.getItem('contact_userId') : ''

  const { firstName, lastName, email, description, occupation, imageUrl, country, address, gender } = newContact;

  const { edit, contact } = editContact;

  const { isLoading, isError } = appState;

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setNewContact(prev => ({...prev, [name]: value}))
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted && edit) setNewContact(contact);
    else return
    return () => {
      isMounted = false
    }
  }, [edit, contact])

  useEffect(() => {
    if(!isError) return
    const timeoutId = setTimeout(() => {
        setAppState(prev => ({...prev, isError: false, error: ''}))
      }, 4000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isError, setAppState])

  const canSubmit = [firstName, lastName, imageUrl].every(Boolean)

  const handleSubmit = async () => {
    if(!canSubmit) return
    setLoading(true)
    try{
      const userDetails = sanitizeEntries(newContact) as ContactObjType
      if (!edit) {
        const contactResponse = await addContact(userDetails, userId as string);
        if(!allContacts.length) setRevalidate(1)
        else setAllContacts([...allContacts, contactResponse])
      }
      else {
        await updateContact(userDetails as ContactObjType, userId as string)
        setRevalidate(1)
      }
      setNewContact(initContactObj)
      toast.success(edit ? 'Contact updated' :  'Contact Added')
      setAppModal(prev => ({...prev, addContact: 'CLOSE'}))
    }
    catch(error: any){
      const errors = error as ErrorResponse
      const msg = errors.response.data.message ?? error?.message
      toast.error(msg)
    }
    finally{
      setLoading(false)
    }
  }

  const closeModal = () => {
    setAppModal(prev => ({...prev, addContact: 'CLOSE'}))
    setEditContact(initEditContact)
    setNewContact(initContactObj)
  }

  return (
    <section className={`z-20 ${appModal.addContact === 'OPEN' ? 'fixed' : 'hidden'} ${darkMode === 'dark' ? 'bg-gradient-to-t from-slate-900 to-slate-800' : 'bg-gradient-to-tr from-purple-100 to-slate-50'} h-full w-full rounded-lg inset-0 flex items-center justify-center transition-colors`}>
      <button 
      onClick={closeModal}
      className={`absolute top-5 right-5 focus:outline-0 rounded-[3px] hover:opacity-90 transition-all border-0 px-2 py-1 ${darkMode === 'dark' ? 'bg-slate-900' : 'bg-slate-400'}`}>
        Close
      </button>

      <article className={`z-10 ${darkMode === 'dark' ? 'bg-gradient-to-tr from-slate-800 to-slate-900' : 'bg-gradient-to-t from-[#d1e0ef] to-[#eff9f8] shadow-slate-300'} border w-[30rem] maxscreen:w-[87%] h-[88%] rounded-lg shadow-lg absolute bottom-5 flex flex-col gap-y-3 p-5`}>
        <h4 className='text-base underline underline-offset-4 font-serif absolute left-2 top-2'>{edit ? 'Edit' : 'Create'} Contact</h4>
       
        <ProfilePicture 
          setNewContact={setNewContact} setAppState={setAppState}
          imageUrl={imageUrl as string} isError={isError} isLoading={isLoading} 
        />

        <div className='flex items-center gap-2 sm:justify-between'>
          <Input 
            value={firstName as string}
            required={true}
            placeholder="First Name*"
            name="firstName" show={false}
            handleInput={handleInput}          
          />
          <Input 
            value={lastName as string}
            required={true}
            placeholder="Last Name*"
            name="lastName" show={false}
            handleInput={handleInput}      
          />
        </div>
        
        <EnterText
          name="description" 
          textValue={description as string} 
          rowSize={3} title='About'
          placeholder='About...' 
          maxTextLength={MAX_TEXT}
          setNewContact={setNewContact}
        />

          <div className='flex flex-col gap-y-3'>

            <div className='flex items-center gap-2 sm:justify-between'>
              <Input 
                value={email as string}
                placeholder="Email"
                name="email" show={false}
                handleInput={handleInput}          
              />
              <Input 
                value={occupation as string}
                placeholder="Occupation"
                name="occupation" show={false}
                handleInput={handleInput}          
              />
            </div>

            <div className='flex items-center gap-2 sm:justify-between'>
              <Input 
                value={address as string}
                placeholder="Address"
                name="address" show={false}
                handleInput={handleInput}          
              />
              <Input 
                value={country as string}
                placeholder="Country"
                name="country" show={false}
                handleInput={handleInput}          
              />
            </div>
            
            <div className='flex flex-col'>
              <h4>Gender*</h4>
              <div className={`${darkMode === 'dark' ? '' : 'text-white'} flex items-center gap-3`}>
                {
                  GENDER.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => setNewContact(prev => ({...prev, gender: gen as Gender}))}
                      className={`${gen === (gender as Gender) ? 'bg-slate-500' : 'bg-slate-700'} focus:outline-0 rounded-sm px-2 py-1 border-0`}
                    >{gen}</button>
                  ))
                }
              </div>
            </div>
          </div>
        
        <button 
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={`focus:outline-0 mt-3 rounded-[3px] hover:opacity-90 transition-all border-0 px-5 py-3 text-white ${darkMode === 'dark' ? 'bg-slate-700' : 'bg-slate-700'}`}>
            {loading ? 'In Progress...' : (edit ? 'Update' : 'Create')}
        </button>
      </article>
    </section>
  )
}
