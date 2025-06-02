import { useState } from "react";
import ContactDisplay from "./components/ContactDisplay";
import Sidebar from "./components/Sidebar";
import AddContactModal from "./components/AddContactModal";
import EditContactModal from "./components/EditContactModal";
import { useContacts } from "./context/ContactsContextProvider";

export default function App() {
  const [isAddContactVisible, setAddContactVisible] = useState(false);
  const [isEditContactVisible, setEditContactVisible] = useState(false);
  const { selectedContact, deleteContact } = useContacts();

  return (
    <>
      {/* Sidebar (nav) */}
      <Sidebar onAddButtonClick={() => setAddContactVisible(true)} />

      <main className="main-area">
        {/* TODO Contact display goes here */}
        <ContactDisplay />

        {/* Buttons for editing / deleting selected contact */}
        <section style={{ display: "flex", gap: "1rem" }}>
          <button className="button" onClick={() => setEditContactVisible(true)}>
            Edit
          </button>
          <button className="button red" onClick={() => deleteContact(selectedContact._id)}>
            Delete
          </button>
        </section>
      </main>

      {/* Modal for adding new contacts */}
      <AddContactModal visible={isAddContactVisible} onClose={() => setAddContactVisible(false)} />

      {/* Modal for editing existing contacts */}
      <EditContactModal
        visible={isEditContactVisible}
        onClose={() => setEditContactVisible(false)}
      />
    </>
  );
}