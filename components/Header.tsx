'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-[#2e2e2e] shadow bg-[#1e1e1e] text-white">
      <Link href="/" className="text-xl font-bold text-white hover:text-gray-300">
        HTML/CSS Chatbot
      </Link>
      <nav className="flex gap-4 items-center">
        {!session && (
          <>
            <Link href="/login" className="text-gray-300 hover:text-white transition">
              Login
            </Link>
            <Link href="/signup" className="text-gray-300 hover:text-white transition">
              Sign Up
            </Link>
          </>
        )}
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-red-500 hover:text-red-400 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
