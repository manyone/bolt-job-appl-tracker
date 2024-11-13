import React, { useState } from 'react';
import { X, Plus, Settings } from 'lucide-react';

interface SourceManagerProps {
  sources: string[];
  onUpdateSources: (sources: string[]) => void;
}

export const SourceManager: React.FC<SourceManagerProps> = ({ sources, onUpdateSources }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSource, setNewSource] = useState('');

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSource.trim() && !sources.includes(newSource.trim())) {
      onUpdateSources([...sources, newSource.trim()]);
      setNewSource('');
    }
  };

  const handleRemoveSource = (source: string) => {
    onUpdateSources(sources.filter(s => s !== source));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Settings className="w-4 h-4 mr-2" />
        Manage Sources
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Manage Job Sources</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAddSource} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              placeholder="Add new source"
              className="flex-1 rounded-md border-gray-300"
            />
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {sources.map((source) => (
            <div
              key={source}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
            >
              <span>{source}</span>
              <button
                onClick={() => handleRemoveSource(source)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};