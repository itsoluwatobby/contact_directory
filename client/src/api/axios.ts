import axios from 'axios';

type ResponseType = { 
  DATA : {
    data: ContactObjType[];
  } 
}
type SingleResponseType = { 
  DATA : {
    data: ContactObjType;
  } 
}
type ConflictResponseType = { 
  DATA : {
    status: ConflictType
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
  const response = await contactApi.get(contactEndpoint) as { data: ResponseType };
  return response.data.DATA.data
}
export const getConflict = async (email: string): Promise<ConflictType> => {
  const response = await contactApi.get(`/${email}`) as { data: ConflictResponseType };
  return response.data.DATA.status
}
export const addContact = async (newContact: Partial<ContactObjType>): Promise<ContactObjType> => {
  const response = await contactApi.post('/create', newContact) as { data: SingleResponseType };
  return response.data.DATA.data
}
export const viewContact = async (contactId: string): Promise<ContactObjType> => {
  const response = await contactApi.patch(`/view_contact/:${contactId}`) as { data: SingleResponseType };
  return response.data.DATA.data
}
export const updateContact = async (updatedContact: ContactObjType) => {
  const response = await contactApi.put(`/update_contact`, updatedContact) as { data: SingleResponseType };
  return response.data.DATA.data
}
export const deleteContact = async (contactId: string) => {
  return await contactApi.delete(`/delete/:${contactId}`)
  // return response.data
}