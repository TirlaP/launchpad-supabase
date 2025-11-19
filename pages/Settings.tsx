import React, { useState } from 'react';
import { View } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ArrowLeft, CreditCard, Users, User, Save } from 'lucide-react';

interface SettingsProps {
  navigateTo: (view: View) => void;
}

const Settings: React.FC<SettingsProps> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'team' | 'billing'>('general');
  const [projectName, setProjectName] = useState('dashboard-app');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo(View.DASHBOARD)}
              className="p-2 rounded-md hover:bg-white/5 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-zinc-100">Project Settings</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          {[
            { id: 'general', label: 'General', icon: <User size={16} /> },
            { id: 'team', label: 'Team', icon: <Users size={16} /> },
            { id: 'billing', label: 'Billing', icon: <CreditCard size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id 
                  ? 'border-indigo-500 text-indigo-400' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'}
              `}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 min-h-[400px] animate-fade-in">
          
          {activeTab === 'general' && (
            <div className="max-w-xl space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Project Details</h3>
                <p className="text-sm text-zinc-500">Manage your project configuration.</p>
              </div>
              <Input 
                label="Project Name" 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)} 
              />
              <Input 
                label="Framework Preset" 
                value="Next.js" 
                disabled 
              />
              <div className="pt-4">
                 <Button onClick={handleSave} loading={isSaving} icon={<Save size={16}/>}>Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="text-lg font-medium mb-1">Team Members</h3>
                    <p className="text-sm text-zinc-500">Manage access to your project.</p>
                 </div>
                 <Button size="sm" variant="secondary">Invite Member</Button>
              </div>
              
              <div className="border border-white/5 rounded-lg overflow-hidden">
                 {[1, 2].map(i => (
                   <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                           {i === 1 ? 'JD' : 'AS'}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-200">{i === 1 ? 'John Doe' : 'Alice Smith'}</div>
                          <div className="text-xs text-zinc-500">{i === 1 ? 'Owner' : 'Developer'}</div>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500">Joined 2d ago</span>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
             <div className="max-w-2xl space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-1">Usage</h3>
                  <p className="text-sm text-zinc-500">Your current resource consumption.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">Bandwidth</span>
                    <span className="text-zinc-400">80 GB / 100 GB</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 w-[80%] rounded-full"></div>
                  </div>
                  <p className="text-xs text-zinc-500 text-right">80% used</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">Build Minutes</span>
                    <span className="text-zinc-400">120m / 6,000m</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[2%] rounded-full"></div>
                  </div>
                  <p className="text-xs text-zinc-500 text-right">2% used</p>
                </div>

                <div className="p-4 border border-indigo-500/30 bg-indigo-500/5 rounded-lg flex items-center justify-between">
                   <div>
                     <h4 className="text-sm font-medium text-indigo-200">Upgrade to Pro</h4>
                     <p className="text-xs text-indigo-300/70">Get unlimited bandwidth and build minutes.</p>
                   </div>
                   <Button size="sm">Upgrade</Button>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-zinc-900 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-up">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-sm font-medium">Changes saved successfully.</span>
        </div>
      )}
    </div>
  );
};

export default Settings;