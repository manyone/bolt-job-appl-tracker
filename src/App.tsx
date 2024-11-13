import React, { useState, useEffect } from 'react';
import { JobApplication } from './types';
import { JobCard } from './components/JobCard';
import { JobForm } from './components/JobForm';
import { DataControls } from './components/DataControls';
import { SourceManager } from './components/SourceManager';
import { WeeklyReport } from './components/WeeklyReport';
import { Plus, Search, Building2, BarChart2 } from 'lucide-react';

const DEFAULT_SOURCES = ['LINKEDIN', 'INDEED', 'COMPANY_WEBSITE', 'REFERRAL', 'OTHER'];

function App() {
  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('jobApplications');
    if (!saved) return [];
    
    try {
      const parsedJobs = JSON.parse(saved);
      return parsedJobs.map((job: any) => ({
        ...job,
        contacts: job.contacts || [],
        favorite: typeof job.favorite === 'boolean' ? job.favorite : false,
      }));
    } catch (error) {
      console.error('Error parsing saved jobs:', error);
      return [];
    }
  });

  const [sources, setSources] = useState<string[]>(() => {
    const saved = localStorage.getItem('jobSources');
    return saved ? JSON.parse(saved) : DEFAULT_SOURCES;
  });

  const [showForm, setShowForm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jobSources', JSON.stringify(sources));
  }, [sources]);

  const handleSubmit = (jobData: Omit<JobApplication, 'id'>) => {
    if (editingJob) {
      setJobs(jobs.map(job => 
        job.id === editingJob.id ? { ...jobData, id: job.id } : job
      ));
    } else {
      setJobs([...jobs, { ...jobData, id: crypto.randomUUID() }]);
    }
    setShowForm(false);
    setEditingJob(undefined);
  };

  const handleEdit = (job: JobApplication) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handleToggleFavorite = (id: string) => {
    setJobs(jobs.map(job =>
      job.id === id ? { ...job, favorite: !job.favorite } : job
    ));
  };

  const handleImport = (importedJobs: JobApplication[]) => {
    if (window.confirm('This will replace your current data. Are you sure?')) {
      const validatedJobs = importedJobs.map(job => ({
        ...job,
        contacts: job.contacts || [],
        favorite: typeof job.favorite === 'boolean' ? job.favorite : false,
      }));
      setJobs(validatedJobs);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (a.favorite !== b.favorite) return b.favorite ? 1 : -1;
    return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Job Applications Tracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <DataControls onImport={handleImport} jobs={jobs} />
              <SourceManager sources={sources} onUpdateSources={setSources} />
              <button
                onClick={() => setShowReport(!showReport)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Weekly Report
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Application
              </button>
            </div>
          </div>
          
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showReport && <WeeklyReport jobs={jobs} />}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first job application</p>
          </div>
        )}
      </main>

      {showForm && (
        <JobForm
          job={editingJob}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingJob(undefined);
          }}
          sources={sources}
        />
      )}
    </div>
  );
}

export default App;