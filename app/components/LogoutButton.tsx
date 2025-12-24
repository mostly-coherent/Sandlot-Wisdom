'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../lib/themes';

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
      aria-label="Sign out"
      title="Sign out"
    >
      {isLoggingOut ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}

