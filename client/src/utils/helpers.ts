/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { nanoid } from 'nanoid';
import { imageStorage } from './firebase';

export const reduceTextLength = (content: string, maxLength=20, option:('letter'|'word')='letter') => {
  let responseOutput = '';
  if(option === 'letter'){
    responseOutput = content?.length > maxLength ? content?.substring(0, maxLength) +'...' : content
  }
  else if(option === 'word'){
    responseOutput = content?.split(' ')?.length > maxLength ? content?.substring(0, maxLength * 4) +'...' : content
  }
  return responseOutput
}

export const checkCount = <T>(content: T[] | T): string => {
  let count = ''; 
  const length = Array.isArray(content) ? content?.length : content as number;
  if(length <= 999){
    if(Array.isArray(content)){
      if(length == 1 && content[0] == '') count = '0'
      else count = length.toString()
    }
    else count = length.toString()
  }
  else if(length > 999 && length <= 999_999)
    count = ((length / 1000).toFixed(1)).toString() + 'K'
  else if(length > 999_999 && length <= 999_999_999)
    count = ((length / 1000_000).toFixed(1)).toString() + 'M'
  else if(length > 999_999_999)
    count = ((length / 1000_000_000).toFixed(1)).toString() + 'B'
  return count
}

export function sanitizeString(entry: string) {
  const val =  entry.trim()
  val.replace(/</g, '&lt;') // Replace less-than sign
    .replace(/>/g, '&gt;') // Replace greater-than sign
    .replace(/"/g, '&quot;') // Replace double quote
    .replace(/'/g, '&#39;'); // Replace single quote
  return val
}

/**
 * @description sanitizeEntries - sanitizes object entries
 * @param entries - object to sanitize
 * 
 * @returns the sanitized object
 */
export function sanitizeEntries<T extends object>(entries: T): T {
  const sanitizedValues = Object.entries(entries).map(([key, value]) => {
    if (typeof value === 'string') return [key, sanitizeString(value)]
    else return [key, value]
  })
  return Object.fromEntries(sanitizedValues)
}

export const imageUpload = (image: File): Promise<ImageReturnType> => {
  return new Promise((resolve, reject) => {
    const photoName = `${image.name}-${nanoid(5)}`
    const storageRef = ref(imageStorage, `contact_photos/${photoName}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed', (snap: any) => {
      void(snap)
    },(error: any) => {
        void(error)
        reject({status: "failed", url: ''})
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl: string) => {
          return resolve({status: 'success', url: downloadUrl})
        })
        .catch((error: any) => {
          void(error)
          return reject({status: 'failed', url: ''})
        })
      }
    )
  })
}

export function toggleAttributes(parsedObj: Partial<AppModalType>, toggleValue: Toggle): Partial<AppModalType> {
  const res = Object.fromEntries(Object.keys(parsedObj).map((key) => {
    return [key, toggleValue]
  }))
  return res
}

export const switchModals: Record<Modals, (arg: AppModalType) => AppModalType> = {
  'addContact'(prev: AppModalType) {
    const { addContact, ...rest } = prev;
    return { addContact, ...toggleAttributes(rest, 'CLOSE') } as AppModalType;
  },
  'viewContact'(prev: AppModalType) {
    const { viewContact, ...rest } = prev;
    return { viewContact, ...toggleAttributes(rest, 'CLOSE') } as AppModalType;
  },
  'sideBar'(prev: AppModalType) {
    const { sideBar, ...rest } = prev;
    return { sideBar, ...toggleAttributes(rest, 'CLOSE') } as AppModalType;
  }
}

// const formatDate = (date: string) => {
//   return new Intl.RelativeTimeFormat('en-us', {
    
//   })
// }