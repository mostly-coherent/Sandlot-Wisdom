'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-4 sm:p-6">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md border-4 border-amber-600">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4" role="img" aria-label="Baseball emoji">⚾</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">
            Sandlot Wisdom
          </h1>
          <p className="text-amber-700 mt-2 text-sm sm:text-base">
            Enter the password to play ball!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-2 border-amber-300 bg-amber-50 text-amber-900 placeholder-amber-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base sm:text-lg"
              autoFocus
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div 
              className="bg-red-50 border-2 border-red-300 rounded-lg p-3 text-red-700 text-sm text-center font-medium"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg shadow-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 border-2 border-orange-600"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Checking...</span>
              </span>
            ) : (
              "Let's Play! ⚾"
            )}
          </button>
        </form>

        {/* Fun footer */}
        <p className="text-center text-amber-600 text-xs mt-6">
          Good grief! 🥜
        </p>
      </div>
    </div>
  );
}

