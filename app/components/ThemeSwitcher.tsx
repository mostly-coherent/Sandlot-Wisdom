'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../lib/themes';

export default function ThemeSwitcher() {
  const { theme, setThemeId } = useTheme();
  const [clickCount, setClickCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Reset click count after 3 seconds of inactivity
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setShowPassword(true);
      setClickCount(0);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side password for the easter egg
    // "goodgrief" seems appropriate
    if (password.toLowerCase() === 'goodgrief') {
      setThemeId('peanuts');
      setShowPassword(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setThemeId('sandlot');
  };

  if (theme.id === 'peanuts') {
    return (
      <button 
        onClick={handleLogout}
        className="fixed bottom-4 right-4 text-xs text-white/50 hover:text-white bg-black/20 px-2 py-1 rounded"
      >
        Exit Private Mode
      </button>
    );
  }

  return (
    <>
      {/* Invisible trigger area in footer */}
      <div 
        onClick={handleSecretClick}
        className="w-8 h-8 opacity-0 cursor-default"
        aria-hidden="true"
      />

      {showPassword && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Enter Password</h3>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded p-2 mb-2"
                placeholder="Password"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

