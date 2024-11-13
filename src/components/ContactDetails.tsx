import React from 'react';
import { Contact } from '../types/contact';
import { X } from 'lucide-react';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Contact Details</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="mt-1 text-lg">{contact.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-lg">{contact.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Mobile</h3>
            <p className="mt-1 text-lg">{contact.mobile}</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};