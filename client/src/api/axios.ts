import axios from 'axios';

type ResponseType = { 
  DATA : {
    data: ContactObjType[]
  } 
}
export const BASEURL = 'http://localhost:5000/api/v1'

export const contactApi = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json"
  }
})

export const contactEndpoint = '/'

export const getContacts = async (): Promise<ContactObjType[]> => {
  const response = await contactApi.get(contactEndpoint) as { data: ResponseType }
  return response.data.DATA.data
}
export const getConflict = async (email: string) => {
  const response = await contactApi.get(`/${email}`)
  return response.data
}
export const addContact = async (newContact: Partial<ContactObjType>) => {
  const response = await contactApi.post('/create', newContact);
  return response.data
}
export const viewContact = async (contactId: string) => {
  const response = await contactApi.patch(`/view_contact/:${contactId}`)
  return response.data
}
export const updateContact = async (updatedContact: ContactObjType) => {
  const response = await contactApi.put(`/update_contact`, updatedContact)
  return response.data
}
export const deleteContact = async (contactId: string) => {
  return await contactApi.delete(`/delete/:${contactId}`)
  // return response.data
}