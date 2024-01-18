import { ChangeEvent, useEffect, useState } from 'react'
import { MAX_FILE_SIZE, MAX_TEXT, initAppState, initContactObj } from '../utils/constants'
import { imageUpload, sanitizeEntries } from '../utils/helpers';
import { imageStorage } from '../utils/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useContactContext } from '../context/useContactContext';
import { Input } from './Input';
import { EnterText } from './EnterText';
import { FaTimesCircle } from 'react-icons/fa';
import { toast } from "react-toastify";
import { LoadingSpinner } from './Loading';


export const NewContact = () => {
  const [newContact, setNewContact] = useState<Partial<ContactObjType>>(initContactObj);
  const [appState, setAppState] = useState<AppState>(initAppState);
  const [file, setFile] = useState<File | null>(null);
  const { darkMode, appModal, setAppModal } = useContactContext() as ContactContextType
  const GENDER = ['Male', 'Female', 'Undecided']

  const { firstName, lastName, email, description, occupation, imageUrl, country, address, gender, socialMediaAccounts } = newContact;

  const { isLoading, success, error, isError } = appState;

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    if (event.target.type === 'file'){
      const file = (event.target as HTMLInputElement).files as FileList
      setFile(file[0] as File)
    }
    else {
      const value = event.target.value
      setNewContact(prev => ({...prev, [name]: value}))
    }
  }

  useEffect(() => {
    let isMounted = true
    if (file === null) return
    const uploadFile = () => {
      if((file as File).size > MAX_FILE_SIZE){
        setAppState(prev => ({...prev, isError: true, error: 'File too large'}))
        setFile(null)
        return alert('MAX ALLOWED FILE SIZE IS 1mb')
      }
      else {
        setAppState(prev => ({...prev, isLoading: true}))
        imageUpload(file as File)
        .then((data: ImageReturnType) => {
          setNewContact(prev => ({...prev, imageUrl: data.url }))
          setAppState(prev => ({...prev, isLoading: false, success: true}))
          setFile(null)
        }).catch(() => {
          setAppState(prev => ({ ...prev, isError: true, error: 'An error occured' }))
        })
        .finally(() => setAppState(prev => ({ ...prev, isLoading: false })))
      }
    }
    isMounted ? uploadFile() : null
    return () => {
      isMounted = false
    }
  }, [file, setNewContact])

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

  const handleSubmit = () => {
    if(!canSubmit) return
    setAppState(prev => ({ ...prev, loading: true }))
    try{
      const userDetails = sanitizeEntries(newContact)
      console.log(userDetails)
      
      setAppState(prev => ({ ...prev, success: true }))
      setNewContact(initContactObj)
      toast.success('Contact Created')
      setAppModal(prev => ({...prev, addContact: 'CLOSE'}))
    }
    catch(error: unknown){
      console.log(error)
      setAppState(prev => ({ ...prev, isError: true }))
      toast.error('error message')
    }
    finally{
      setAppState(prev => ({ ...prev, loading: false }))
    }
  }

  const deleteImage = (image: string) => {
    console.log(image)
    setAppState(prev => ({...prev, isLoading: true}))
    const imageName = image?.split('?alt=')[0]?.split(`contact_photos%2F`)[1]
    return new Promise((resolve, reject) => {
      const deleteRef = ref(imageStorage, `contact_photos/${imageName}`)
      deleteObject(deleteRef)
      .then(() => resolve('successful'))
      .catch(() => reject(
        setAppState(prev => ({...prev, isError: true, error: 'An Error occurred'}))
        ))
      .finally(() => setAppState(prev => ({ ...prev, isLoading: false })))
    })
  }

  return (
    <section className={`z-20 ${appModal.addContact === 'OPEN' ? 'fixed' : 'hidden'} ${darkMode === 'dark' ? 'bg-gradient-to-t from-slate-900 to-slate-800' : 'bg-gradient-to-tr from-slate-200 to-slate-50'} h-full w-full rounded-lg inset-0 flex items-center justify-center transition-colors`}>
      <button 
      onClick={() => setAppModal(prev => ({...prev, addContact: 'CLOSE'}))}
      className={`absolute top-5 right-5 focus:outline-0 rounded-[3px] hover:opacity-90 transition-all border-0 px-2 py-1 ${darkMode === 'dark' ? 'bg-slate-900' : 'bg-slate-400'}`}>
        Close
      </button>

      <article className={`z-10 ${darkMode === 'dark' ? 'bg-gradient-to-tr from-slate-800 to-slate-900' : 'bg-gradient-to-l from-slate-300 to-slate-400 shadow-slate-300'} w-[30rem] maxscreen:w-[87%] h-[88%] rounded-lg shadow-lg absolute bottom-5 flex flex-col gap-y-3 p-5`}>
        <h4 className='text-base underline underline-offset-4 font-serif absolute left-2 top-2'>Create Contact</h4>
        <button 
        onClick={() => deleteImage(imageUrl as string)}
        className={`${success ? '' : 'hidden'} absolute z-10 right-44 focus:outline-0 rounded-[3px] hover:opacity-90 transition-all border-0 px-2 py-1 ${darkMode === 'dark' ? 'bg-slate-800' : ''}`}>
          <FaTimesCircle className='text-gray-400 text-2xl' />
        </button>
        <span className='absolute right-32 top-24 rounded-sm bg-slate-300 px-1.5 py-0.5 text-xs text-gray-800 z-10'>required*</span>
        <label htmlFor='profileImage' className={`relative cursor-pointer self-center bg-gray-300 border-2 ${isError ? 'border-red-400' : ''} border-r-gray-400 border-l-gray-400 border-t-gray-500 border-b-gray-500 w-28 h-28 rounded-full shadow-sm`}>
          {
            typeof imageUrl === 'string' ? 
            <img src={imageUrl} alt="user profile" 
            className="rounded-full object-cover h-full w-full"
            />
            : null
          }
          <div className={`${isLoading ? 'scale-[1]' : 'scale-0'} absolute left-[35%]`}>
            <LoadingSpinner width='w-9' height='h-9' />
          </div>
          <input type="file" id='profileImage' accept='image/*' name='imageUrl' hidden onChange={handleInput} />
        </label>

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
        
        <div>
          <h4>Gender*</h4>
          <div className={`${darkMode === 'dark' ? '' : 'text-white'} flex items-center gap-3`}>
            {
              GENDER.map((gen) => (
                <button
                  key={gen}
                  onClick={() => setNewContact(prev => ({...prev, gender: gen as Gender}))}
                  className={`${gen === gender ? 'bg-slate-600' : ''} focus:outline-0 rounded-sm px-2.5 py-1.5 border-0 bg-slate-700`}
                >{gen}</button>
              ))
            }
          </div>
        </div>

        <button 
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={`focus:outline-0 mt-3 rounded-[3px] hover:opacity-90 transition-all border-0 px-5 py-3 text-white ${darkMode === 'dark' ? 'bg-slate-700' : 'bg-slate-700'}`}>
            Create
        </button>
      </article>
    </section>
  )
}