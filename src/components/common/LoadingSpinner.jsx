import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', className = '', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#090909]/80 backdrop-blur-md flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className={`${sizes.lg} text-cherry-500 animate-spin mx-auto`} />
          <p className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mt-4">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizes[size]} text-cherry-500 animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;
