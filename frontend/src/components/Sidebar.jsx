import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, PlusCircle, User, LogOut, X, Compass } from 'lucide-react';
import { logout } from '../services/auth';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/my-jobs', icon: Briefcase, label: 'My Jobs' },
  { to: '/add-job', icon: PlusCircle, label: 'Add Job' },
  { to: '/profile', icon: User, label: 'Profile' }
];

function Sidebar({ onClose }) {
  return (
    <aside className="w-64 lg:w-64 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {/* Header with professional name and icon */}
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-sidebar-foreground" />
          <h1 className="text-xl font-bold text-sidebar-foreground">Career Compass</h1>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          className="flex items-center gap-3 px-3 py-2 w-full text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;