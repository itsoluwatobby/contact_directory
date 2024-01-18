// @types.d.ts

type Theme = 'light' | 'dark';
type Toggle = 'OPEN' | 'CLOSE';

type ChildrenProps = {
  children: React.ReactNode;
}

type Modals = 'addContact' | 'viewContact' | 'sideBar';
type AppModalType = Record<Modals, Toggle>;

type ContactContextType = {
  darkMode: Theme;
  appModal: AppModalType;
  setDarkMode: React.Dispatch<React.SetStateAction<Theme>>;
  setAppModal: React.Dispatch<React.SetStateAction<AppModalType>>;
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