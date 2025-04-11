// biomap\src\app\components\Navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
         
         
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-extrabold text-green-600 tracking-tight group-hover:text-green-700 transition-colors duration-300">
              BioMap
              <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">.</span>
            </span>
          </Link>

         
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-5 py-2.5 text-gray-700 font-medium hover:text-green-600 transition-colors duration-300"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Register
            </Link>
          </div>

        
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none transition-colors duration-300"
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

        
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                className="block px-4 py-3 text-center text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-3 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

