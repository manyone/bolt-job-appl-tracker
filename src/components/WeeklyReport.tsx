import React, { useMemo } from 'react';
import { JobApplication, WeeklyReportData } from '../types';
import { Calendar, ChevronDown } from 'lucide-react';

interface WeeklyReportProps {
  jobs: JobApplication[];
}

export const WeeklyReport: React.FC<WeeklyReportProps> = ({ jobs }) => {
  const weeklyReports = useMemo(() => {
    const reports: WeeklyReportData[] = [];
    if (jobs.length === 0) return reports;

    // Sort jobs by date in descending order
    const sortedJobs = [...jobs].sort((a, b) => 
      new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );

    // Group jobs by week
    let currentWeekStart = new Date(sortedJobs[0].appliedDate);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Set to Sunday
    currentWeekStart.setHours(0, 0, 0, 0);

    let currentWeekJobs: JobApplication[] = [];

    sortedJobs.forEach(job => {
      const jobDate = new Date(job.appliedDate);
      const weekStart = new Date(jobDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Set to Sunday
      weekStart.setHours(0, 0, 0, 0);

      if (weekStart.getTime() !== currentWeekStart.getTime()) {
        if (currentWeekJobs.length > 0) {
          const weekEnd = new Date(currentWeekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          reports.push({
            startDate: currentWeekStart.toISOString().split('T')[0],
            endDate: weekEnd.toISOString().split('T')[0],
            applications: currentWeekJobs
          });
        }
        currentWeekStart = weekStart;
        currentWeekJobs = [job];
      } else {
        currentWeekJobs.push(job);
      }
    });

    // Add the last week
    if (currentWeekJobs.length > 0) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      reports.push({
        startDate: currentWeekStart.toISOString().split('T')[0],
        endDate: weekEnd.toISOString().split('T')[0],
        applications: currentWeekJobs
      });
    }

    return reports;
  }, [jobs]);

  if (weeklyReports.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Weekly Application Report
      </h2>
      
      <div className="space-y-4">
        {weeklyReports.map((report) => (
          <details key={report.startDate} className="bg-white rounded-lg shadow">
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {report.applications.length} applications
                </span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </summary>
            <div className="p-4 border-t border-gray-100">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Company</th>
                    <th className="pb-2">Position</th>
                    <th className="pb-2">Source</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.applications.map((job) => (
                    <tr key={job.id} className="text-sm">
                      <td className="py-2">{new Date(job.appliedDate).toLocaleDateString()}</td>
                      <td className="py-2">{job.company}</td>
                      <td className="py-2">{job.position}</td>
                      <td className="py-2">{job.source}</td>
                      <td className="py-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                          ${job.status === 'APPLIED' ? 'bg-blue-100 text-blue-800' :
                            job.status === 'INTERVIEWING' ? 'bg-yellow-100 text-yellow-800' :
                            job.status === 'OFFERED' ? 'bg-green-100 text-green-800' :
                            job.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};