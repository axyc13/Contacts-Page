import ContactListItem from "./ContactListItem";
import AddContactButton from "./AddContactButton";
import { useContacts } from "../context/ContactsContextProvider";
import { useState } from 'react';
/**
 * A sidebar with links to view each contact, or add new contacts.
 *
 * The contacts list can be filtered by name.
 */
export default function Sidebar({onAddButtonClick}) {
  const { contacts, selectedContact, setSelectedContact } = useContacts();
  
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="side-bar">
      {/* Search box */}
      <header>
        <h2>Friends</h2>
        <input type="text" value = {searchTerm} onChange = {handleSearchChange}/>
      </header>

      {/* List of contacts */}
      <section>
        <ul>
          {filteredContacts?.map?.((contact) => (
            <ContactListItem
              key={contact._id}
              contact={contact}
              onClick={setSelectedContact}
              isActive={contact === selectedContact}
            />
          ))}
        </ul>
      </section>

      {/* Add contact button */}
      <footer>
        <AddContactButton onClick={onAddButtonClick} />
      </footer>
    </nav>
  );
}
