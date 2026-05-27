import api from './api';

export const getJobs = async () => {
  const res = await api.get('/saved-jobs');
  return res.data;
};

export const addJob = async (jobData) => {
  const res = await api.post('/saved-jobs', jobData);
  return res.data;
};

export const updateJob = async (id, updates) => {
  const res = await api.put(`/saved-jobs/${id}`, updates);
  return res.data;
};

export const deleteJob = async (id) => {
  await api.delete(`/saved-jobs/${id}`);
};

export const searchExternalJobs = async (query) => {
  const res = await api.get(`/jobs/search?query=${query}`);
  return res.data;
};