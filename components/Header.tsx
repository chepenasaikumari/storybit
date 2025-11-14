'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

export default function Header() {
  const [browseOpen, setBrowseOpen] = useState(false)
  const [signinOpen, setSigninOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  return (
    <>
      {/* ---------------- HEADER ---------------- */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-red-500 transition-colors">
              STORYBIT
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-gray-200 hover:text-white transition-colors">Home</Link>

              <button
                onClick={() => setBrowseOpen(true)}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Browse
              </button>

              <button
                onClick={() => setSigninOpen(true)}
                className="px-4 py-1.5 text-sm rounded-lg border border-gray-600 text-white hover:bg-white hover:text-black transition-all"
              >
                Sign in
              </button>

              <button
                onClick={() => setSignupOpen(true)}
                className="px-4 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Sign up
              </button>
            </nav>

            <button className="md:hidden text-white">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

    
      {browseOpen && (
        <Modal onClose={() => setBrowseOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
          <ul className="space-y-2 text-black">
            <li>Adventure</li>
            <li>Romance</li>
            <li>Thriller</li>
            <li>Fantasy</li>
            <li>Horror</li>
          </ul>
        </Modal>
      )}

      
      {signinOpen && (
        <Modal onClose={() => setSigninOpen(false)}>
          <h2 className="text-xl font-semibold mb-4 text-black">Sign In</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Sign In
          </button>
        </Modal>
      )}

      
      {signupOpen && (
        <Modal onClose={() => setSignupOpen(false)}>
          <h2 className="text-xl font-semibold mb-4 text-black">Create Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
            Sign Up
          </button>
        </Modal>
      )}
    </>
  )
}


interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative shadow-xl">
        
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-black text-sm hover:text-red-500"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}
