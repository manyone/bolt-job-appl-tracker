import React from 'react';
import { Contact } from '../types';
import { X } from 'lucide-react';

interface ContactFormProps {
  contact: Contact;
  onChange: (contact: Contact) => void;
  onRemove: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ contact, onChange, onRemove }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 relative">
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={contact.name}
            onChange={(e) => onChange({ ...contact, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            value={contact.role || ''}
            onChange={(e) => onChange({ ...contact, role: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={contact.email || ''}
            onChange={(e) => onChange({ ...contact, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={contact.phone || ''}
            onChange={(e) => onChange({ ...contact, phone: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={contact.notes || ''}
          onChange={(e) => onChange({ ...contact, notes: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};