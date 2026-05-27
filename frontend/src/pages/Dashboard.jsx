import React, { useEffect, useState } from 'react';
import { getJobs } from '../services/jobService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { Briefcase, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ applied: 0, interview: 0, offer: 0, rejected: 0 });
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
    
    const applied = data.filter(j => j.status === 'Applied').length;
    const interview = data.filter(j => j.status === 'Interview').length;
    const offer = data.filter(j => j.status === 'Offer').length;
    const rejected = data.filter(j => j.status === 'Rejected').length;
    setStats({ applied, interview, offer, rejected });

    // Monthly applications (last 6 months)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push({
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        index: date.getMonth()
      });
    }

    const monthlyCount = last6Months.map(m => ({ month: m.month, applications: 0 }));
    data.forEach(job => {
      const jobDate = new Date(job.appliedDate);
      const jobMonth = monthNames[jobDate.getMonth()];
      const found = monthlyCount.find(m => m.month === jobMonth);
      if (found) found.applications++;
    });
    setMonthlyData(monthlyCount);
  };

  // Original distinct colors for status pie chart
  const statusColors = {
    Applied: '#3b82f6',   // blue
    Interview: '#eab308', // yellow
    Offer: '#22c55e',     // green
    Rejected: '#ef4444'   // red
  };

  const statusData = [
    { name: 'Applied', value: stats.applied, color: statusColors.Applied },
    { name: 'Interview', value: stats.interview, color: statusColors.Interview },
    { name: 'Offer', value: stats.offer, color: statusColors.Offer },
    { name: 'Rejected', value: stats.rejected, color: statusColors.Rejected }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards with original icon colors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Applied Jobs" value={stats.applied} change="+5 this week" icon={Briefcase} color="bg-blue-500" />
        <StatCard title="Interviews" value={stats.interview} change="2 upcoming" icon={MessageSquare} color="bg-yellow-500" />
        <StatCard title="Offers" value={stats.offer} change="+1 this month" icon={CheckCircle2} color="bg-green-500" />
        <StatCard title="Rejected" value={stats.rejected} change="-2 vs last month" icon={XCircle} color="bg-red-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart – stays brown */}
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Applications per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid stroke="#d4c5a9" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#8b5a2b" />
              <YAxis allowDecimals={false} stroke="#8b5a2b" />
              <Tooltip
                contentStyle={{ backgroundColor: '#f5f0e6', borderColor: '#c4a67a', color: '#4a2c14' }}
                itemStyle={{ color: '#4a2c14' }}
              />
              <Bar dataKey="applications" fill="#b45309" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {monthlyData.every(d => d.applications === 0) && (
            <p className="text-center text-muted-foreground mt-2">No applications yet this year</p>
          )}
        </div>

        {/* Pie Chart with original distinct colors */}
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f5f0e6', borderColor: '#c4a67a', color: '#4a2c14' }}
                itemStyle={{ color: '#4a2c14' }}
              />
            </PieChart>
          </ResponsiveContainer>
          {statusData.length === 0 && (
            <p className="text-center text-muted-foreground mt-2">No status data to display</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;