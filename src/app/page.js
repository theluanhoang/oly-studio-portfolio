'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 500);

    const redirectTimer = setTimeout(() => {
      router.push('/projects');
    }, 2000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            className={`text-white uppercase text-sm tracking-wider transition-all duration-800 ease-out ${
              isExpanded ? 'translate-x-[-200px] opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            ARCHITECTURE
          </div>
          <div
            className={`text-white uppercase text-sm tracking-wider transition-all duration-800 ease-out ${
              isExpanded ? 'translate-x-[-200px] opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            CONSTRUCTION
          </div>
        </div>

        <div className="shrink-0">
          <img
            src="/assets/logo.png"
            alt="OLY Logo"
            className={`h-auto transition-all duration-800 ${
              isExpanded ? 'scale-110 opacity-80' : 'scale-100 opacity-100'
            }`}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <div className="flex items-center gap-8">
          <div
            className={`text-white uppercase text-sm tracking-wider transition-all duration-800 ease-out ${
              isExpanded ? 'translate-x-[200px] opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            INTERIOR
          </div>
          <div
            className={`text-white uppercase text-sm tracking-wider transition-all duration-800 ease-out ${
              isExpanded ? 'translate-x-[200px] opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            FURNITURE
          </div>
        </div>
      </div>
    </div>
  );
}
