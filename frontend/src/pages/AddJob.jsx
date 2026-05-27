import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addJob } from '../services/jobService';
import JobForm from '../components/JobForm';

function AddJob() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await addJob(data);
    navigate('/my-jobs');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add a New Job</h2>
      <JobForm onSubmit={handleSubmit} onCancel={() => navigate('/my-jobs')} />
    </div>
  );
}

export default AddJob;