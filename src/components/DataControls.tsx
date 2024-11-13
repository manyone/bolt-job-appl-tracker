import React from 'react';
import { JobApplication } from '../types';
import { Download, Upload, AlertCircle } from 'lucide-react';

interface DataControlsProps {
  onImport: (data: JobApplication[]) => void;
  jobs: JobApplication[];
}

export const DataControls: React.FC<DataControlsProps> = ({ onImport, jobs }) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        onImport(data);
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleExport}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </button>
      <div className="relative">
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Upload className="w-4 h-4 mr-2" />
          Import Data
        </button>
      </div>
      <div className="relative group">
        <AlertCircle className="w-5 h-5 text-gray-400 cursor-help" />
        <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 w-64 p-2 mb-2 text-sm text-gray-600 bg-white rounded-lg shadow-lg">
          Export your data to save it locally or import previously saved data
        </div>
      </div>
    </div>
  );
};