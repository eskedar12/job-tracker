import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/auth';
import { getJobs } from '../services/jobService';
import { Calendar, Mail } from 'lucide-react';

function Profile() {
  const user = getCurrentUser();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ total: 0, interviews: 0, offers: 0, responseRate: 0 });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
    const total = data.length;
    const interviews = data.filter(j => j.status === 'Interview').length;
    const offers = data.filter(j => j.status === 'Offer').length;
    const responseRate = total ? Math.round((interviews + offers) / total * 100) : 0;
    setStats({ total, interviews, offers, responseRate });
  };

  const recentJobs = jobs.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {user?.email}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Total Applications</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">{stats.interviews}</p>
            <p className="text-sm text-gray-500">Interviews</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">{stats.offers}</p>
            <p className="text-sm text-gray-500">Offers</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">{stats.responseRate}%</p>
            <p className="text-sm text-gray-500">Response Rate</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentJobs.map(job => (
            <div key={job._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{job.position}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(job.appliedDate).toLocaleDateString()} · {job.company}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                job.status === 'Interview' ? 'bg-yellow-100 text-yellow-800' :
                job.status === 'Offer' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>{job.status}</span>
            </div>
          ))}
          {recentJobs.length === 0 && (
            <p className="text-gray-400 text-center">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;