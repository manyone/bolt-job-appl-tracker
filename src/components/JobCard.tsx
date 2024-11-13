import React from 'react';
import { JobApplication } from '../types';
import { 
  Building2, Calendar, MapPin, DollarSign, Star, StarOff, 
  Trash2, PencilLine, Link, Users 
} from 'lucide-react';

interface JobCardProps {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const statusColors = {
  APPLIED: 'bg-blue-100 text-blue-800',
  INTERVIEWING: 'bg-yellow-100 text-yellow-800',
  OFFERED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  ACCEPTED: 'bg-purple-100 text-purple-800',
};

const sourceLabels = {
  LINKEDIN: 'LinkedIn',
  INDEED: 'Indeed',
  COMPANY_WEBSITE: 'Company Website',
  REFERRAL: 'Referral',
  OTHER: 'Other',
};

export const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{job.position}</h3>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Building2 className="w-4 h-4" />
            <span>{job.company}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleFavorite(job.id)}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
          >
            {job.favorite ? (
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            ) : (
              <StarOff className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onEdit(job)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <PencilLine className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-1 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-1 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
        </div>
        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <Link className="w-4 h-4" />
            <span>Job Post</span>
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
          {job.status}
        </div>
        <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          {sourceLabels[job.source]}
        </div>
        {job.contacts.length > 0 && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <Users className="w-4 h-4 mr-1" />
            {job.contacts.length} {job.contacts.length === 1 ? 'Contact' : 'Contacts'}
          </div>
        )}
      </div>

      {job.notes && (
        <div className="mt-4 text-gray-600 text-sm">
          <p className="line-clamp-2">{job.notes}</p>
        </div>
      )}
    </div>
  );
};