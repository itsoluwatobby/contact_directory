// @types.d.ts

type Theme = 'light' | 'dark';
type Toggle = 'OPEN' | 'CLOSE';

type ChildrenProps = {
  children: React.ReactNode;
}

type EditContact = {
  edit: boolean;
  contact: ContactObjType;
}

type Modals = 'addContact' | 'viewContact' | 'sideBar';
type AppModalType = Record<Modals, Toggle>;

type ContactContextType = {
  darkMode: Theme;
  appState: AppState;
  appModal: AppModalType;
  editContact: EditContact;
  contactId: string;
  allContacts: ContactObjType[];
  setDarkMode: React.Dispatch<React.SetStateAction<Theme>>;
  setAllContacts: React.Dispatch<React.SetStateAction<ContactObjType[]>>;
  setAppModal: React.Dispatch<React.SetStateAction<AppModalType>>;
  setEditContact: React.Dispatch<React.SetStateAction<EditContact>>;
  setContactId: React.Dispatch<React.SetStateAction<string>>;
  setRevalidate: React.Dispatch<React.SetStateAction<number>>;
}

type ImageReturnType = { status: string, url: string };

type SocialMedia = {
  name: string,
  link: string,
}

type AppState = {
  isLoading: boolean;
  isError: boolean;
  error: string;
  success: boolean;
}

type ConflictType = 'NOT_AVAILABLE' | 'CONFLICT';
type Gender = 'Male' | 'Female' | 'Undecided';
type ContactObjType = {
  _id?: string;
  firstName: string; 
  lastName: string; 
  email?: string;
  occupation?: string;
  ipAddress?: string;
  imageUrl: string;
  address?: string;
  country?: string;
  description?: string;
  gender: Gender;
  viewsCount?: number;
  socialMediaAccounts?: SocialMedia[];
  createdAt: string;
  updatedAt: string;
}

type ErrorResponse = {
  response: {
    data: {
      status: number;
      message: string;
    }
  }
}