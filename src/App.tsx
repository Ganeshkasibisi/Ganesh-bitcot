import React, { useState } from 'react';
import { useContacts } from './hooks/useContacts.js';
import { ContactForm } from './components/ContactForm.js';
import { ContactDetails } from './components/ContactDetails.js';
import { SearchBar } from './components/SearchBar.js';
import { ContactList } from './components/ContactList.js';
import { Contact } from './types/contact.js';
import { UserPlus, Loader2 } from 'lucide-react';

function App() {
  const {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    searchQuery,
    setSearchQuery,
  } = useContacts();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add Contact
              </button>
            </div>

            <div className="mt-6">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className="mt-6">
              <ContactList
                contacts={contacts}
                onView={(contact) => {
                  setSelectedContact(contact);
                  setShowViewModal(true);
                }}
                onEdit={(contact) => {
                  setSelectedContact(contact);
                  setShowEditModal(true);
                }}
                onDelete={deleteContact}
              />
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <ContactForm
          onSubmit={(data) => {
            addContact(data);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
          title="Add Contact"
        />
      )}

      {showEditModal && selectedContact && (
        <ContactForm
          initialData={selectedContact}
          onSubmit={(data) => {
            updateContact({ ...data, id: selectedContact.id });
            setShowEditModal(false);
            setSelectedContact(null);
          }}
          onClose={() => {
            setShowEditModal(false);
            setSelectedContact(null);
          }}
          title="Edit Contact"
        />
      )}

      {showViewModal && selectedContact && (
        <ContactDetails
          contact={selectedContact}
          onClose={() => {
            setShowViewModal(false);
            setSelectedContact(null);
          }}
        />
      )}
    </div>
  );
}

export default App;