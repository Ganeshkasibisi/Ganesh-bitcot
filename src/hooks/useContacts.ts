import { useState, useEffect } from 'react';
import { Contact } from '../types/contact';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      // Convert numeric IDs to strings and mobile to string format
      const formattedContacts = data.map((contact: any) => ({
        ...contact,
        id: String(contact.id),
        mobile: String(contact.mobile)
      }));
      setContacts(formattedContacts);
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: crypto.randomUUID(),
    };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts(contacts.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact => {
    if (!searchQuery) return true;
    
    const searchTerm = searchQuery.toLowerCase();
    const name = contact.name.toLowerCase();
    const mobile = contact.mobile;
    const email = contact.email.toLowerCase();

    return (
      name.includes(searchTerm) ||
      mobile.includes(searchTerm) ||
      email.includes(searchTerm)
    );
  });

  return {
    contacts: filteredContacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    searchQuery,
    setSearchQuery,
  };
};