import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-xs font-medium text-zinc-400">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-zinc-900/50 text-zinc-200 placeholder-zinc-600 
            border rounded-md px-3 py-2 text-sm transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 hover:border-white/20'}
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 animate-fade-in">
            <AlertCircle size={16} />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};