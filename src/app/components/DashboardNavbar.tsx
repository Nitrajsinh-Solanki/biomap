// biomap\src\app\components\DashboardNavbar.tsx



'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
}

interface DashboardNavbarProps {
  user: User | null;
}

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard" className="flex items-center group">
              <span className="text-2xl font-extrabold text-green-600 tracking-tight group-hover:text-green-700 transition-colors duration-300">
                BioMap
                <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-6">
            <Link 
              href="/dashboard/space"
              className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 hover:bg-green-50 rounded-md"
            >
              Space & Tech
            </Link>
            <Link 
              href="/dashboard/education"
              className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 hover:bg-green-50 rounded-md"
            >
              Education
            </Link>
            <Link 
              href="/dashboard/envmonitor"
              className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 hover:bg-green-50 rounded-md"
            >
              Environment
            </Link>
            <Link 
              href="/dashboard/map"
              className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 hover:bg-green-50 rounded-md"
            >
              Map
            </Link>
            <Link 
              href="/dashboard/species"
              className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 hover:bg-green-50 rounded-md"
            >
              Species
            </Link>
            <Link 
              href="/dashboard/chemistry"
              className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 hover:bg-green-50 rounded-md"
            >
              Chemistry
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center">
            <div className="relative ml-3">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 bg-white rounded-full p-1 text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
                <svg
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-inner border-t border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/dashboard/space"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Space & Tech
            </Link>
            <Link
              href="/dashboard/education"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </Link>
            <Link
              href="/dashboard/envmonitor"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Environment Monitoring
            </Link>
            <Link
              href="/dashboard/map"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Interactive Map
            </Link>
            <Link
              href="/dashboard/species"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Species
            </Link>
            <Link
              href="/dashboard/chemistry"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Chemistry
            </Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/dashboard/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
