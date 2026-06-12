import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#090909]/30 backdrop-blur-sm animate-fade-in pointer-events-none" />

      {/* Modal */}
      <div
        className={`relative w-full ${sizes[size]} max-h-[90vh] flex flex-col animate-fade-in-up border border-gray-200 bg-white shadow-2xl rounded-xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 text-gray-700 text-sm leading-relaxed bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
