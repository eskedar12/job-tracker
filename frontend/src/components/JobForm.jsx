import React, { useState } from 'react';

function JobForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    company: initialData.company || '',
    position: initialData.position || '',
    location: initialData.location || '',
    salary: initialData.salary || '',
    status: initialData.status || 'Applied',
    notes: initialData.notes || '',
    appliedDate: initialData.appliedDate ? initialData.appliedDate.slice(0,10) : new Date().toISOString().slice(0,10)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground">Company Name</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required className="mt-1 block w-full border border-input rounded-md shadow-sm p-2 bg-background text-foreground" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Position</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full border border-input rounded-md shadow-sm p-2 bg-background text-foreground" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full border border-input rounded-md shadow-sm p-2 bg-background text-foreground" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Salary (Birr)</label>
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="mt-1 block w-full border border-input rounded-md shadow-sm p-2 bg-background text-foreground" placeholder="e.g. 120,000 Birr" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-input rounded-md shadow-sm p-2 bg-background text-foreground">
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Accepted</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Applied Date</label>
          <input type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} className="mt-1 block w-full border border-input rounded-md shadow-sm p-2 bg-background text-foreground" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground">Notes</label>
        <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="mt-1 block w-full border border-input rounded-md shadow-sm p-2 bg-background text-foreground"></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Save Job</button>
      </div>
    </form>
  );
}

export default JobForm;