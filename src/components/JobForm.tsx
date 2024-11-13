import React, { useState } from 'react';
import { JobApplication, JobStatus, Contact } from '../types';
import { X, Plus } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface JobFormProps {
  job?: JobApplication;
  onSubmit: (job: Omit<JobApplication, 'id'>) => void;
  onClose: () => void;
  sources: string[];
}

const initialJob: Omit<JobApplication, 'id'> = {
  company: '',
  position: '',
  location: '',
  status: 'APPLIED',
  source: 'OTHER',
  appliedDate: new Date().toISOString().split('T')[0],
  notes: '',
  contacts: [],
  favorite: false,
};

export const JobForm: React.FC<JobFormProps> = ({ job, onSubmit, onClose, sources }) => {
  const [formData, setFormData] = useState(job || initialJob);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddContact = () => {
    setFormData({
      ...formData,
      contacts: [...formData.contacts, { name: '' }],
    });
  };

  const handleContactChange = (index: number, contact: Contact) => {
    const newContacts = [...formData.contacts];
    newContacts[index] = contact;
    setFormData({ ...formData, contacts: newContacts });
  };

  const handleRemoveContact = (index: number) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">
          {job ? 'Edit Application' : 'New Application'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                required
                className="mt-1 block w-full"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                required
                className="mt-1 block w-full"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                required
                className="mt-1 block w-full"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Source</label>
              <select
                className="mt-1 block w-full"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as JobStatus })}
              >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEWING">Interviewing</option>
                <option value="OFFERED">Offered</option>
                <option value="REJECTED">Rejected</option>
                <option value="ACCEPTED">Accepted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Applied Date</label>
              <input
                type="date"
                required
                className="mt-1 block w-full"
                value={formData.appliedDate}
                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job URL</label>
              <input
                type="url"
                className="mt-1 block w-full"
                value={formData.jobUrl || ''}
                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Salary (Optional)</label>
              <input
                type="text"
                className="mt-1 block w-full"
                value={formData.salary || ''}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              className="mt-1 block w-full"
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Contacts</h3>
              <button
                type="button"
                onClick={handleAddContact}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Contact
              </button>
            </div>
            <div className="space-y-4">
              {formData.contacts.map((contact, index) => (
                <ContactForm
                  key={index}
                  contact={contact}
                  onChange={(updated) => handleContactChange(index, updated)}
                  onRemove={() => handleRemoveContact(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {job ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};