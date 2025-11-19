import React, { useState, useEffect } from 'react';
import { View } from './types';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import { CommandMenu } from './components/CommandMenu';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Handle keyboard shortcuts (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.LANDING:
        return <Landing navigateTo={(view) => setCurrentView(view)} />;
      case View.AUTH:
        return <Auth navigateTo={(view) => setCurrentView(view)} />;
      case View.DASHBOARD:
        return <Dashboard navigateTo={(view) => setCurrentView(view)} />;
      case View.SETTINGS:
        return <Settings navigateTo={(view) => setCurrentView(view)} />;
      default:
        return <Landing navigateTo={(view) => setCurrentView(view)} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {renderView()}
      
      <CommandMenu 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
        onChangeView={setCurrentView}
      />
    </div>
  );
};

export default App;