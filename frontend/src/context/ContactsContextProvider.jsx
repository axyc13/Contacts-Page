import { useContext, createContext, useState, useEffect } from "react";
import * as api from "../api/api.js";

const ContactsContext = createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export default function ContactsContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts from server
  async function fetchContacts() {
    const data = await api.retrieveContacts();
    setContacts(data);
    setSelectedContact(null);
  }

  // TODO On initial page mount, fetch contacts.
  useEffect(() => {
    fetchContacts();
  }, []);

  // TODO Function for adding a new contact
  async function addContact(contact) {
    console.log("Adding contact:", contact);
    try {
      const newContact = await api.createContact(contact);
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setSelectedContact(newContact); // Select the newly added contact
    } catch (err) {
      // TODO Proper error handling
      console.error("Error adding contact:", err.response.status);
    }
  }

  // Function for deleting a contact
  async function deleteContact(id) {
    console.log("Deleting contact with id:", id);
    try {
      await api.deleteContact(id);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
      setSelectedContact(null); // Deselect the contact after deletion
    } catch (err) {
      // TODO Proper error handling
      console.error("Error deleting contact:", err.response.status);
    }
  }

  // Function for editing a contact
  async function editContact(contact) {
    console.log("Editing contact:", contact);
    try {
      await api.updateContact(contact);
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === contact._id ? { ...c, ...contact } : c))
      );
      if (selectedContact && selectedContact._id === contact._id) {
        setSelectedContact({ ...selectedContact, ...contact });
      }
    } catch (err) {
      // TODO Proper error handling
      console.error("Error editing contact:", err.response.status);
    }
  }

  const context = {
    contacts,
    selectedContact,
    setSelectedContact,
    deleteContact,
    editContact,
    addContact
  };

  return <ContactsContext.Provider value={context}>{children}</ContactsContext.Provider>;
}