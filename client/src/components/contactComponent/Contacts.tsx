import { ContactCard } from "./ContactCard"

type ContactsProps = {
  theme: Theme;
}
export const Contacts = ({ theme }: ContactsProps) => {

  return (
    <>
      {
        [...Array(10).keys()].map(cont => (
          <ContactCard key={cont} theme={theme} />
        ))
      }
    </>
  )
}