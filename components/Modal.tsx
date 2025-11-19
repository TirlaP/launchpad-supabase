import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = "max-w-lg"
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className={`
        relative w-full ${maxWidth} bg-zinc-950 border border-white/10 rounded-xl shadow-2xl 
        transform transition-all duration-300 scale-100 animate-slide-up overflow-hidden
      `}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors focus:outline-none rounded-md p-1 hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 py-6">
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 bg-zinc-900/50 border-t border-white/5 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};