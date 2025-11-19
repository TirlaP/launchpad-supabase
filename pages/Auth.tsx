import React, { useState } from 'react';
import { View } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Mail, Lock, Github, ArrowLeft } from 'lucide-react';

interface AuthProps {
  navigateTo: (view: View) => void;
}

const Auth: React.FC<AuthProps> = ({ navigateTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigateTo(View.DASHBOARD);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-8 md:p-12 lg:p-20 relative">
        <button 
          onClick={() => navigateTo(View.LANDING)}
          className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isLogin ? 'Enter your credentials to access your account.' : 'Start deploying your projects in seconds.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" icon={<Github size={18} />}>GitHub</Button>
            <Button variant="secondary" icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-2.14-.22-2.65z"/></svg>
            }>Google</Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Email" 
              type="email" 
              placeholder="name@example.com" 
              icon={<Mail size={16} />} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={<Lock size={16} />} 
            />
            
            <Button type="submit" className="w-full" loading={isLoading}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-indigo-400 hover:text-indigo-300 hover:underline transition-all"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex bg-zinc-900 relative items-center justify-center overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        
        {/* Abstract glowing shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        
        <div className="relative z-10 bg-zinc-950/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl max-w-md">
          <div className="flex gap-2 mb-6">
             <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
          </div>
          <div className="space-y-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">✔</span> 
              <span>Building frontend... <span className="text-zinc-600">240ms</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">✔</span> 
              <span>Optimizing assets... <span className="text-zinc-600">120ms</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">✔</span> 
              <span>Deploying to Edge... <span className="text-zinc-600">850ms</span></span>
            </div>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="text-zinc-100">
              > Deployment <span className="text-indigo-400">xd-92f-2a</span> complete.<br/>
              > Available at <span className="underline decoration-indigo-500/50">launchpad.app/preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;