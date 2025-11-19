import React, { useState } from 'react';
import { View, Deployment, DeploymentStatus } from '../types';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { 
  LayoutGrid, Settings, LogOut, Bell, Search, Plus, 
  GitBranch, Clock, MoreHorizontal, RefreshCw, Trash2, 
  ExternalLink, FileText, Terminal, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  navigateTo: (view: View) => void;
}

// Mock Data
const mockDeployments: Deployment[] = [
  { id: 'd-10f9a2', project: 'marketing-site', commit: 'Fix header alignment', branch: 'main', status: 'Live', time: '2m ago', author: 'alex' },
  { id: 'd-8b2c1d', project: 'dashboard-app', commit: 'Update api keys', branch: 'dev', status: 'Building', time: '15s ago', author: 'sarah' },
  { id: 'd-7c3e4f', project: 'marketing-site', commit: 'Revert color changes', branch: 'main', status: 'Live', time: '1h ago', author: 'alex' },
  { id: 'd-6d5e5g', project: 'api-gateway', commit: 'Refactor auth middleware', branch: 'feat/auth', status: 'Failed', time: '3h ago', author: 'mike' },
  { id: 'd-5e6f6h', project: 'dashboard-app', commit: 'Init project', branch: 'main', status: 'Live', time: '1d ago', author: 'sarah' },
];

const sparklineData = [
  { data: [10, 25, 15, 30, 45, 35, 50, 40, 60, 55, 70] },
  { data: [50, 40, 30, 45, 35, 25, 40, 30, 20, 35, 30] },
  { data: [20, 30, 40, 35, 50, 60, 55, 70, 65, 80, 90] },
];

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [createStep, setCreateStep] = useState(1);

  // Toggle Row Selection
  const toggleRow = (id: string) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  // Status Badge Component
  const StatusBadge = ({ status }: { status: DeploymentStatus }) => {
    const styles = {
      Live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      Building: 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse',
      Failed: 'bg-red-500/10 text-red-400 border-red-500/20',
      Queued: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    };
    
    const icons = {
      Live: <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />,
      Building: <RefreshCw size={10} className="animate-spin mr-1.5" />,
      Failed: <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5" />,
      Queued: <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mr-1.5" />,
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex bg-zinc-950">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-zinc-950 flex-shrink-0 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/5 flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
            <span className="font-bold text-xs text-white">L</span>
          </div>
          <span className="font-semibold">LaunchPad</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-white/5 text-zinc-100 border border-white/5">
            <LayoutGrid size={18} />
            Overview
          </button>
          <button 
            onClick={() => navigateTo(View.SETTINGS)}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
           <div className="flex items-center gap-3 px-3 py-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border border-white/10"></div>
             <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-200">Demo User</span>
                <span className="text-xs text-zinc-500">Pro Plan</span>
             </div>
           </div>
           <button 
              onClick={() => navigateTo(View.LANDING)}
              className="mt-2 w-full flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 hover:text-red-400 transition-colors"
           >
             <LogOut size={14} /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md px-8 h-16 flex items-center justify-between">
          <div className="flex items-center text-sm text-zinc-500">
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">acme-corp</span>
            <span className="mx-2">/</span>
            <span className="text-zinc-100 font-medium">dashboard-app</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-300" size={16} />
              <button className="pl-9 pr-3 py-1.5 rounded-md bg-zinc-900/50 border border-white/10 text-sm text-zinc-500 w-64 text-left hover:border-zinc-700 transition-colors">
                Search... <kbd className="ml-2 text-xs border border-zinc-700 rounded px-1 py-0.5">⌘K</kbd>
              </button>
            </div>
            <button className="text-zinc-400 hover:text-zinc-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border border-zinc-950"></span>
            </button>
            <Button size="sm" icon={<Plus size={16} />} onClick={() => setIsCreateOpen(true)}>New Project</Button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Deployments', value: '1,284', change: '+12%', data: sparklineData[0].data },
              { label: 'Avg. Build Time', value: '45s', change: '-5%', data: sparklineData[1].data },
              { label: 'Success Rate', value: '99.9%', change: '+0.1%', data: sparklineData[2].data },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/10 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    stat.change.startsWith('+') 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="h-12 opacity-50 group-hover:opacity-100 transition-opacity">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stat.data.map(val => ({ val }))}>
                      <defs>
                        <linearGradient id={`color${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="val" stroke="#6366f1" fillOpacity={1} fill={`url(#color${i})`} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>

          {/* Data Table */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/20">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-semibold text-zinc-200">Recent Deployments</h3>
              <div className="flex gap-2">
                <button className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded">
                   <RefreshCw size={16} />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-500 uppercase bg-white/5 font-medium">
                  <tr>
                    <th className="px-6 py-3 w-10">
                      <input type="checkbox" className="rounded bg-zinc-800 border-zinc-600 text-indigo-600 focus:ring-indigo-500/20" />
                    </th>
                    <th className="px-6 py-3">Project</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Commit</th>
                    <th className="px-6 py-3">Branch</th>
                    <th className="px-6 py-3 text-right">Age</th>
                    <th className="px-6 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockDeployments.map((dep) => (
                    <tr key={dep.id} className={`group hover:bg-white/[0.02] transition-colors ${selectedRows.has(dep.id) ? 'bg-indigo-500/5' : ''}`}>
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.has(dep.id)}
                          onChange={() => toggleRow(dep.id)}
                          className="rounded bg-zinc-800 border-zinc-600 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer" 
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-200">
                        {dep.project}
                        <div className="text-[10px] text-zinc-500 font-mono">{dep.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={dep.status} />
                      </td>
                      <td className="px-6 py-4 text-zinc-400">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold uppercase">
                            {dep.author[0]}
                          </div>
                          <span className="truncate max-w-[150px]">{dep.commit}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 font-mono text-xs">
                        <div className="flex items-center gap-1.5">
                          <GitBranch size={12} /> {dep.branch}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-zinc-500">
                        {dep.time}
                      </td>
                      <td className="px-6 py-4 relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === dep.id ? null : dep.id)}
                          className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        
                        {/* Row Actions Dropdown */}
                        {activeDropdown === dep.id && (
                          <div className="absolute right-8 top-8 w-48 bg-zinc-950 border border-white/10 rounded-lg shadow-xl z-20 py-1 animate-fade-in">
                            <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                              <ExternalLink size={14} /> Visit Preview
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                              <Terminal size={14} /> View Logs
                            </button>
                            <div className="h-px bg-white/5 my-1"></div>
                            <button 
                              onClick={() => { setIsDeleteOpen(true); setActiveDropdown(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                            >
                              <Trash2 size={14} /> Delete Deployment
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Overlay to close dropdown when clicking outside */}
            {activeDropdown && (
              <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      
      {/* Create Project Modal */}
      <Modal 
        isOpen={isCreateOpen} 
        onClose={() => { setIsCreateOpen(false); setCreateStep(1); }} 
        title="Create New Project"
        footer={
          <>
            <Button variant="ghost" onClick={() => { setIsCreateOpen(false); setCreateStep(1); }}>Cancel</Button>
            {createStep < 3 ? (
              <Button onClick={() => setCreateStep(s => s + 1)}>Next Step</Button>
            ) : (
               <Button onClick={() => { setIsCreateOpen(false); setCreateStep(1); }}>Deploy Project</Button>
            )}
          </>
        }
      >
        <div className="space-y-6">
          {/* Stepper */}
          <div className="flex items-center gap-4 text-sm mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border
                  ${createStep >= step ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}
                `}>
                  {step}
                </div>
                <span className={createStep >= step ? 'text-zinc-200' : 'text-zinc-600'}>
                  {step === 1 ? 'Details' : step === 2 ? 'Framework' : 'Deploy'}
                </span>
                {step !== 3 && <div className="w-8 h-px bg-zinc-800 mx-2" />}
              </div>
            ))}
          </div>

          {createStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <Input label="Project Name" placeholder="my-awesome-project" autoFocus />
              <Input label="Slug" placeholder="my-awesome-project" disabled value="my-awesome-project" />
            </div>
          )}

          {createStep === 2 && (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              {['Next.js', 'React', 'Vue', 'Svelte'].map(fw => (
                <button key={fw} className="p-4 border border-white/10 rounded-lg hover:border-indigo-500 hover:bg-indigo-500/5 transition-all text-left">
                  <div className="font-medium text-zinc-200">{fw}</div>
                  <div className="text-xs text-zinc-500 mt-1">Web Framework</div>
                </button>
              ))}
            </div>
          )}

           {createStep === 3 && (
            <div className="space-y-4 animate-fade-in text-center py-4">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <Terminal size={24} className="text-indigo-400" />
              </div>
              <h4 className="text-lg font-medium">Ready to ship?</h4>
              <p className="text-zinc-400 text-sm">Your project will be deployed to the edge network immediately.</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        title="Delete Deployment?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setIsDeleteOpen(false)}>Delete Permanently</Button>
          </>
        }
      >
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="text-red-500" size={20} />
          </div>
          <div>
            <p className="text-sm text-zinc-300 mb-2">
              Are you sure you want to delete the deployment <span className="font-mono text-zinc-100 bg-zinc-800 px-1 rounded">d-6d5e5g</span>? 
            </p>
            <p className="text-sm text-zinc-500">
              This action cannot be undone. This will permanently delete the deployment and remove all associated data.
            </p>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Dashboard;