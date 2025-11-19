import React, { useState } from 'react';
import { View } from '../types';
import { Button } from '../components/Button';
import { ArrowRight, Check, Zap, Shield, Globe, Command } from 'lucide-react';

interface LandingProps {
  navigateTo: (view: View) => void;
}

const Landing: React.FC<LandingProps> = ({ navigateTo }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">LaunchPad</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors font-medium">Features</button>
            <button className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors font-medium">Pricing</button>
            <Button variant="secondary" size="sm" onClick={() => navigateTo(View.AUTH)}>Log In</Button>
            <Button size="sm" onClick={() => navigateTo(View.AUTH)}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8 hover:border-indigo-500/50 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            LaunchPad v2.0 is now public
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Ship faster.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Scale automatically.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The complete developer platform for deploying seamlessly. 
            From localhost to global edge network in seconds.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigateTo(View.AUTH)} icon={<ArrowRight size={18} />}>
              Start Deploying
            </Button>
            <Button variant="secondary" size="lg" icon={<Command size={18} />}>
              Read the Docs
            </Button>
          </div>
        </section>

        {/* Trusted By */}
        <section className="border-y border-white/5 bg-zinc-900/30 py-12 mb-32">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-zinc-500 mb-8 uppercase tracking-wider">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholder Logos using text for simplicity in this demo */}
               {['Acme Corp', 'Globex', 'Soylent', 'Umbrella', 'Initech'].map(brand => (
                 <span key={brand} className="text-xl font-bold text-zinc-300">{brand}</span>
               ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <h2 className="text-3xl font-bold mb-12 text-center">Everything you need to ship.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[600px]">
            
            {/* Large Item */}
            <div className="md:col-span-2 md:row-span-2 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6 text-indigo-400">
                  <Globe size={24} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Global Edge Network</h3>
                <p className="text-zinc-400 max-w-md">Deploy your content to 35+ regions automatically. Low latency for everyone, everywhere.</p>
              </div>
              {/* Decorative visual */}
              <div className="absolute bottom-0 right-0 w-3/4 h-1/2 bg-gradient-to-tl from-indigo-600/20 to-transparent rounded-tl-full translate-y-12 translate-x-12 blur-3xl group-hover:translate-y-8 transition-transform duration-700"></div>
            </div>

            {/* Small Item 1 */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <Shield className="mb-4 text-emerald-400" size={28} />
              <h3 className="text-lg font-semibold mb-2">DDoS Protection</h3>
              <p className="text-sm text-zinc-400">Enterprise-grade security built-in by default.</p>
            </div>

            {/* Small Item 2 */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <Zap className="mb-4 text-amber-400" size={28} />
              <h3 className="text-lg font-semibold mb-2">Instant Rollbacks</h3>
              <p className="text-sm text-zinc-400">Revert to any previous deployment in one click.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Simple, transparent pricing</h2>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="w-12 h-6 rounded-full bg-zinc-800 border border-white/10 relative px-1 transition-colors"
            >
              <div className={`w-4 h-4 rounded-full bg-indigo-500 absolute top-0.5 transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-zinc-500'}`}>Yearly <span className="text-emerald-400 text-xs ml-1">-20%</span></span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8 text-left hover:border-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-2">Hobby</h3>
              <div className="text-3xl font-bold mb-6">$0<span className="text-base font-normal text-zinc-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {['1 User', '3 Projects', 'Community Support', '10GB Bandwidth'].map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check size={16} className="text-zinc-500" /> {feature}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full" onClick={() => navigateTo(View.AUTH)}>Start for Free</Button>
            </div>

            <div className="rounded-2xl border border-indigo-500/50 bg-indigo-900/10 p-8 text-left relative">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-6">{billingCycle === 'monthly' ? '$29' : '$24'}<span className="text-base font-normal text-zinc-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {['Unlimited Users', 'Unlimited Projects', 'Priority Support', '1TB Bandwidth', 'Analytics'].map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check size={16} className="text-indigo-400" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={() => navigateTo(View.AUTH)}>Upgrade to Pro</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;