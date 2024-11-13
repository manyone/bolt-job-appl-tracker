export type JobStatus = 'APPLIED' | 'INTERVIEWING' | 'OFFERED' | 'REJECTED' | 'ACCEPTED';
export type JobSource = string;

export interface Contact {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  status: JobStatus;
  source: JobSource;
  jobUrl?: string;
  salary?: string;
  appliedDate: string;
  lastContact?: string;
  nextSteps?: string;
  notes: string;
  companyUrl?: string;
  contacts: Contact[];
  favorite: boolean;
}

export interface WeeklyReportData {
  startDate: string;
  endDate: string;
  applications: JobApplication[];
}