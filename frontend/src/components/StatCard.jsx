import React from 'react';

function StatCard({ title, value, change, icon: Icon, color }) {
  return (
    <div className="bg-card rounded-lg shadow p-5 border border-border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{value}</p>
          {change && <p className="text-xs text-muted-foreground mt-1">{change}</p>}
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;