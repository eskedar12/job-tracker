import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob, updateJob } from '../services/jobService';
import JobTable from '../components/JobTable';
import JobForm from '../components/JobForm';
import { Search } from 'lucide-react';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredJobs(jobs.filter(job => job.company.toLowerCase().includes(searchTerm.toLowerCase()) || job.position.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs]);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
    setFilteredJobs(data);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  const handleUpdate = async (updatedData) => {
    await updateJob(editingJob._id, updatedData);
    setEditingJob(null);
    loadJobs();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Jobs</h2>
        <p className="text-gray-500">{filteredJobs.length} applications</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by company or position..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <JobTable jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} />
      {editingJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Job</h3>
            <JobForm initialData={editingJob} onSubmit={handleUpdate} onCancel={() => setEditingJob(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobs;