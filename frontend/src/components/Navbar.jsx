import React from 'react';
import { Menu } from 'lucide-react';
import { getCurrentUser } from '../services/auth';

function Navbar({ onMenuClick }) {
  const user = getCurrentUser();
  const greeting = user ? `Welcome back, ${user.name}` : 'Welcome back';

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-4 flex items-center gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-foreground hover:text-primary"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div>
        <h2 className="text-xl font-semibold text-foreground">{greeting}</h2>
        <p className="text-sm text-muted-foreground">Here's what's happening with your job hunt</p>
      </div>
    </header>
  );
}

export default Navbar;