export const MAX_FILE_SIZE = 1_000_000;
export const MAX_TEXT = 150;

export const initAppModal: AppModalType = {
  addContact: 'CLOSE', viewContact: 'CLOSE', sideBar: 'CLOSE'
}

export const initContactObj: Partial<ContactObjType> = {
  firstName: '', lastName: '', gender: 'Undecided', email: '',
  occupation: '', description: '', imageUrl: '',
  address: '', socialMediaAccounts: [], country: ''
}

export const initEditContact: EditContact = {
  edit: false, contact: {} as ContactObjType
};

export const initAppState: AppState = {
  isLoading: false, isError: false, error: '', success: false
}