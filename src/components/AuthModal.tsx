'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import BrandLogo from './BrandLogo';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle } = useAuth();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={closeAuthModal} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-[#121517] border border-white/15 rounded-3xl p-8 shadow-2xl z-10 flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand Logo */}
        <BrandLogo size="xl" className="mb-4" />

        {/* Title & Description */}
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Sign In to Hit The Road Dude AI
        </h2>
        <p className="text-neutral-400 text-sm mt-2 leading-relaxed max-w-sm">
          Sign in to generate, save, and download your 9:16 viral meme videos with no subscription.
        </p>

        {/* Google Sign In Button */}
        <div className="w-full mt-7 flex flex-col gap-3">
          <button
            onClick={() => signInWithGoogle()}
            className="w-full py-3.5 px-4 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-sm transition flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.99]"
          >
            {/* Authentic Google 4-Color Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-neutral-500 mt-6 leading-relaxed">
          By signing in, you agree to our Terms of Service and Privacy Policy. We only access your basic profile (name and email) to save your videos.
        </p>
      </div>
    </div>
  );
}
