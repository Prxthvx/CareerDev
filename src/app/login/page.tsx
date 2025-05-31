'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just redirect to onboarding
    // In a real app, you would validate credentials here
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden">
      {/* Decorative tealish shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-40 right-0 w-[32rem] h-[32rem] bg-cyan-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <h2 className="mt-10 text-center text-3xl font-extrabold text-teal-700 drop-shadow">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-teal-600">
          Or{' '}
          <Link href="/" className="font-medium text-teal-700 hover:text-teal-500">
            return to home
          </Link>
        </p>
        <div className="bg-white/90 py-10 px-8 shadow-2xl rounded-3xl border border-teal-200 mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-teal-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-2 border-teal-200 bg-white px-4 py-2 text-gray-800 placeholder:text-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none shadow-sm transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-teal-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-2 border-teal-200 bg-white px-4 py-2 text-gray-800 placeholder:text-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none shadow-sm transition-all"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-teal-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-white font-bold shadow-md hover:from-teal-600 hover:to-cyan-600 transition-colors text-lg mt-2"
            >
              Sign in
            </button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-teal-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white/90 px-2 text-teal-400">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-teal-700 shadow-sm border border-teal-200 hover:bg-teal-50 focus-visible:ring-transparent transition-colors"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 2C6.4303 2 2.0003 6.43 2.0003 12C2.0003 17.57 6.4303 22 12.0003 22C17.5703 22 22.0003 17.57 22.0003 12C22.0003 6.43 17.5703 2 12.0003 2ZM18.3603 8.64C18.1303 8.64 17.9003 8.75 17.7403 8.91L12.0003 14.65L6.2603 8.91C6.1003 8.75 5.8703 8.64 5.6403 8.64C5.4103 8.64 5.1803 8.75 5.0203 8.91C4.7003 9.23 4.7003 9.73 5.0203 10.05L11.3303 16.36C11.5103 16.54 11.7503 16.64 12.0003 16.64C12.2503 16.64 12.4903 16.54 12.6703 16.36L19.0003 10.05C19.3203 9.73 19.3203 9.23 19.0003 8.91C18.8403 8.75 18.5903 8.64 18.3603 8.64Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">Google</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-teal-700 shadow-sm border border-teal-200 hover:bg-teal-50 focus-visible:ring-transparent transition-colors"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 