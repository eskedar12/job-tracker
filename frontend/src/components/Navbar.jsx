import React from 'react';
import { getCurrentUser } from '../services/auth';

function Navbar() {
  const user = getCurrentUser();
  const greeting = user ? `Welcome back, ${user.name}` : 'Welcome back';

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{greeting}</h2>
        <p className="text-sm text-muted-foreground">Here's what's happening with your job hunt</p>
      </div>
    </header>
  );
}

export default Navbar;