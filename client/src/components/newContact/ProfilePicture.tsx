import React, { ChangeEvent, useEffect, useState } from "react";
import { LoadingSpinner } from "../Loading";
import { MAX_FILE_SIZE } from "../../utils/constants";
import { imageUpload } from "../../utils/helpers";


type ProfilePictureProps = {
  imageUrl: string;
  // darkMode: Theme;
  isError: boolean;
  isLoading: boolean;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  setNewContact: React.Dispatch<React.SetStateAction<Partial<ContactObjType>>>;
}

export const ProfilePicture = ({ imageUrl, isError, isLoading, setNewContact, setAppState }: ProfilePictureProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files as FileList
    setFile(file[0] as File)
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
  }, [file, setNewContact, setAppState])


  return (
    <>
       {/* <button 
        onClick={() => deleteImage(imageUrl as string)}
        className={`${imageUrl ? '' : 'hidden'} absolute z-10 right-44 focus:outline-0 rounded-[3px] hover:opacity-90 transition-all border-0 px-2 py-1 ${darkMode === 'dark' ? 'bg-slate-800' : ''}`}>
          <FaTimesCircle className='text-gray-400 text-2xl' />
        </button> */}
        <span className='absolute right-32 mobile:right-16 top-24 rounded-sm bg-slate-300 px-1.5 py-0.5 text-xs text-gray-800 z-10'>required*</span>
        <label htmlFor='profileImage' className={`relative cursor-pointer self-center bg-gray-300 border-2 ${isError ? 'border-red-400' : ''} border-r-gray-400 border-l-gray-400 border-t-gray-500 border-b-gray-500 w-28 h-28 rounded-full shadow-sm`}>
          {
            imageUrl ? 
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
    </>
  )
}