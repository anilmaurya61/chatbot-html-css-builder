'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e1e] p-6 rounded-xl w-96 shadow border border-[#2e2e2e]"
      >
        <h1 className="text-2xl font-semibold mb-4 text-gray-100">Login</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          className="w-full p-2 mb-4 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 mb-4 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
          Login
        </button>
      </form>
    </main>
  );
}
