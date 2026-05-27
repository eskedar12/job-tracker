import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const statusColors = {
  Applied: 'bg-blue-100 text-blue-800',
  Interview: 'bg-yellow-100 text-yellow-800',
  Offer: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Accepted: 'bg-purple-100 text-purple-800'
};

function JobTable({ jobs, onEdit, onDelete }) {
  // Helper to format salary with Birr
  const formatSalary = (salary) => {
    if (!salary) return '—';
    // If already contains 'Birr' (case‑insensitive), return as is
    if (salary.toLowerCase().includes('birr')) return salary;
    // Otherwise append ' Birr'
    return `${salary} Birr`;
  };

  return (
    <div className="overflow-x-auto bg-card rounded-lg shadow border border-border">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {jobs.map(job => (
            <tr key={job._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{job.company}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{job.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{job.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{formatSalary(job.salary)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[job.status]}`}>{job.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(job)} className="text-primary hover:text-primary/80 mr-3">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(job._id)} className="text-destructive hover:text-destructive/80">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;