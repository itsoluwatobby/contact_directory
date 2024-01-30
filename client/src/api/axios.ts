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
type UserResponseType = { 
  DATA : {
    data: UserObjType
  } 
}
export const BASEURL = process.env.NODE_ENV === 'production' ? 'https://contact-directory-api.onrender.com/api/v1' : 'http://localhost:4500/api/v1'

export const contactApi = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json"
  }
})

export const getStarted = async (newUser: UserObjType): Promise<UserObjType> => {
  const response = await contactApi.post('/user/get_started', newUser) as { data: UserResponseType };
  return response.data.DATA.data
}

// contacts
export const getContacts = async (): Promise<ContactObjType[]> => {
  const response = await contactApi.get('/') as { data: ResponseType };
  return response.data.DATA.data
}
export const getConflict = async (email: string): Promise<ConflictType> => {
  const response = await contactApi.get(`/${email}`) as { data: ConflictResponseType };
  return response.data.DATA.status
}
export const addContact = async (newContact: Partial<ContactObjType>, userId: string): Promise<ContactObjType> => {
  const response = await contactApi.post(`/create/${userId}`, newContact) as { data: SingleResponseType };
  return response.data.DATA.data
}
export const viewContact = async (contactId: string): Promise<ContactObjType> => {
  const response = await contactApi.patch(`/view_contact/${contactId}`) as { data: SingleResponseType };
  return response.data.DATA.data
}
export const updateContact = async (updatedContact: ContactObjType, userId: string) => {
  const response = await contactApi.put(`/update_contact/${userId}`, updatedContact) as { data: SingleResponseType };
  return response.data.DATA.data
}
export const deleteContact = async (contactId: string, userId: string) => {
  return await contactApi.delete(`/delete/${contactId}/${userId}`)
  // return response.data
}
