import React, { useEffect, useState, useRef } from 'react';
import { Search, Command, Box, Settings, FileText, ArrowRight } from 'lucide-react';
import { View } from '../types';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeView: (view: View) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose, onChangeView }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Mock results filtering
  const options = [
    { id: 'deployments', label: 'Go to Dashboard', icon: <Box size={16} />, action: () => onChangeView(View.DASHBOARD) },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} />, action: () => onChangeView(View.SETTINGS) },
    { id: 'docs', label: 'Documentation', icon: <FileText size={16} />, action: () => {} },
  ];

  const filtered = options.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh] px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="flex items-center px-4 py-3 border-b border-white/5">
          <Search className="text-zinc-500 mr-3" size={20} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, or commands..."
            className="flex-1 bg-transparent text-zinc-200 placeholder-zinc-600 focus:outline-none text-lg"
          />
          <div className="flex items-center gap-1 text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded">
            <span className="text-[10px]">ESC</span>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-zinc-500 text-sm">
              No results found for "{query}"
            </div>
          )}
          
          {filtered.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => {
                opt.action();
                onClose();
              }}
              className={`
                w-full flex items-center justify-between px-4 py-3 text-left text-sm text-zinc-400 
                hover:bg-indigo-600/10 hover:text-indigo-400 hover:border-l-2 hover:border-indigo-500
                focus:outline-none transition-all duration-150 group
              `}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-white/5 group-hover:bg-indigo-500/20 text-zinc-500 group-hover:text-indigo-400">
                  {opt.icon}
                </div>
                <span className="font-medium text-zinc-300 group-hover:text-white">{opt.label}</span>
              </div>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </button>
          ))}
        </div>
        
        <div className="bg-zinc-900/50 px-4 py-2 text-[10px] text-zinc-500 flex justify-between border-t border-white/5">
          <span>LaunchPad Command</span>
          <span>Select &crarr;</span>
        </div>
      </div>
    </div>
  );
};