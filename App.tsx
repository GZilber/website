
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Lock, 
  ChevronRight, 
  Menu, 
  X, 
  AlertTriangle, 
  Loader2, 
  CheckCircle2,
  Activity,
  Database,
  Workflow,
  Terminal as TerminalIcon,
  Search,
  Fingerprint,
  Layers,
  Eye,
  Box,
  Cpu,
  ArrowRight,
  ShieldAlert,
  Radar,
  Bug,
  Ghost
} from 'lucide-react';

/**
 * LOGO B64 - PRESERVED EXACTLY AS PROVIDED
 */
const SWARM_LOGO_B64 = "data:image/png;base64,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";

/**
 * BLACK BOX IMAGE B64 - PRESERVED EXACTLY AS PROVIDED
 */
const BLACKBOX_IMAGE_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJ0lEQVR4nO2dS0hUURjHf+fOODmOlj6IIDCI7E0XvSAtpE0S9VpE0CIX7YIWRYvYInrQKmqlm0S0ChK6SIsitIuonmAtpE8IIX3UvI6O49ybe06LIDRHzp07d879f+ByuXDO+f8fM/fcc+85I0REJCKK7A6I/A8mIskwEUmGiUgyTESSEVvXfHByG8v9L+S9G0K90Y0x90m889/IrVvEunKEx9vI7XvP/PZTPK9HULXNmLpW3N7P6FrrN96X87BfDCHOfBvj09X9v3Uv9/pY6vYItrYNo7YNo7YNi7c9RPrW9+S/fEButvdfI1q7f4V860v6Lp/EvPwS6fHh8XWyVO+vkm99S+fFc7ReOIvR0pG7n7K74f9mEunL8m78O/VfPo77f989f0v8YfH8E8qD91AOfNAtG0Y8/wSltf85pS9P6u6L8uA90qff6N0YpB49p397iN7NwfTrEOnbY+YvnyLXWf99iE67u+p9L69G78YgffI1Yv0D8zI+mInIMkxEkmEikgwTkWSYiCTDRCSZpMaI7Asr6M44Yv0D+ncM6P0Y9A8N07sxSJ87S+3mIPXoeerRc9Sj5/RvD+nfHtLnzv7f7xXv8jlyvYfS7/W97507R66zPvc4pW/6fKdv+nyf79yZe/z8L6vV3Bf5u8937Yv08Sny998Tf1hXvU/l2hfp+yOm777Iv36P6c/fMe78C6P+/i3y1x7z795j3H+McfevGPf8HeXhL5SOf1A69Unp9Cfmz8yfmD/f6TM6/Rmlnz6mXz+nfvmYeumD+uUTM9c+6fOnf7N89sYIbe0mN9v7rxGt7ZunL8u78S6fI9dZn3uc0jd9vtd37su9vvd97/Pz87+sVnNf9O843/V9vj9/i/TJKfL33xN/WFe9T+XaF+n7I6bvxsi/fo/pz98x7vwLo/7+LfLXHvPv3mPcf4xx968Y9/wd5eEvlI5/UDr1Sen0J+bPzJ+Y9yMiIn8BJ6eYpCq0V/EAAAAASUVORK5CYII=";

/**
 * TRANSMISSION SERVICE - CORS FIXED
 */
const InquiryService = {
  submit: async function (data: { firstName: string; lastName: string; email: string; company: string }): Promise<boolean> {
    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: `Inquiry from ${data.company}.\nRequesting beta access to Swarm Security platform components.`
      };

      // CORS FIX: Removed Authorization header from client. 
      // Cloudflare Workers should use secrets stored in their dashboard.
      const WORKER_URL = 'https://send-email.guy-b12.workers.dev';

      const response = await fetch(WORKER_URL, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
      });
      
      return response.ok;
    } catch (err) {
      console.error("Transmission error:", err);
      return false;
    }
  }
};

/**
 * LOGO COMPONENT - REFACTORED FOR RIGID SIZING
 */
const SwarmLogo: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = "" }) => (
  <div 
    className={`inline-block align-middle flex-none ${className}`}
    style={{ 
      width: `${size}px`, 
      height: `${size}px`,
      minWidth: `${size}px`,
      maxWidth: `${size}px`
    }}
  >
    <img 
      src={SWARM_LOGO_B64} 
      alt="Swarm Logo" 
      width={size}
      height={size}
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'block',
        objectFit: 'contain' 
      }}
    />
  </div>
);

/**
 * ACCESS MODAL
 */
const AccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    agreed: false
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const isFormValid = formData.firstName.trim() !== '' && 
                      formData.lastName.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.company.trim() !== '' && 
                      formData.agreed;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setStatus('sending');

    const success = await InquiryService.submit(formData);
    if (success) setStatus('success');
    else setStatus('error');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0a1224] w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-8 md:p-12">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-tighter">Handshake Complete</h3>
            <p className="text-gray-400 text-sm mb-8 font-mono opacity-60">Still no luck for the bad guys. We'll be in touch.</p>
            <button onClick={onClose} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest text-white">Exit Console</button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <SwarmLogo size={40} />
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Vetting Protocol</h3>
              </div>
              <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">Encryption: Active | No Luck for Leaks</p>
            </div>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-1 font-bold">First Name</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 transition-all text-sm text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-1 font-bold">Last Name</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 transition-all text-sm text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-1 font-bold">Work Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 transition-all text-sm text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-1 font-bold">Organization</label>
                <input type="text" name="company" required value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 transition-all text-sm text-white" />
              </div>
              
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} required className="mt-1 h-4 w-4 accent-emerald-500 rounded border-white/10 bg-transparent" />
                  <span className="text-[10px] text-gray-500 leading-tight uppercase tracking-tight group-hover:text-gray-300 transition-colors">
                    I acknowledge that Swarm Security is currently in private beta and access is not guaranteed.
                  </span>
                </label>
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-mono flex items-center gap-2">
                  <AlertTriangle size={14} /> CONNECTION REFUSED. CHECK LOGS.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'sending' || !isFormValid} 
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale mt-4 uppercase tracking-widest"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Syncing...
                  </>
                ) : (
                  "Request Secure Access"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b1a]/95 backdrop-blur-md border-b border-white/5 py-5">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <SwarmLogo size={42} />
          <span className="text-2xl font-black tracking-tighter uppercase text-white">Swarm <span className="text-emerald-500">Security</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-bold text-[10px] tracking-[0.3em] uppercase">
          <button onClick={() => scrollToId('narrative')} className="text-gray-400 hover:text-white transition-colors">The Swarm</button>
          <button onClick={() => scrollToId('blackbox')} className="text-gray-400 hover:text-white transition-colors">Inside</button>
          <button onClick={() => scrollToId('teasing')} className="text-gray-400 hover:text-white transition-colors">No Luck</button>
          <button 
            onClick={onOpenModal} 
            className="px-6 py-2 bg-emerald-500 text-[#050b1a] rounded-lg hover:bg-emerald-400 transition-all font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            Join Beta
          </button>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-swarm-dark text-white selection:bg-emerald-500 selection:text-swarm-dark font-sans">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-swarm-gradient">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-20">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Channel Established
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase">
              Protect <br />the <span className="text-emerald-500 italic">Swarm.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed font-light">
              Stop data exfiltration in AI-native enterprises. We protect your GenAI stack at the token level, ensuring secrets stay secret.
            </p>
            <div className="flex pt-4">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-4"
              >
                Request Access <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex justify-center relative">
            <div className="w-80 h-80 relative group">
               <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" />
               <div className="w-full h-full bg-swarm-terminal border border-white/10 rounded-[3rem] terminal-glow flex items-center justify-center p-8 relative z-10 animate-float">
                  <SwarmLogo size={160} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section id="narrative" className="py-32 bg-swarm-dark border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl font-black uppercase tracking-tight leading-none">The Problem: <br /><span className="text-emerald-500 italic">Unmanaged Agents.</span></h2>
              <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                <p>
                  As AI agents proliferate, your internal data is being shared across millions of tokens every second. Traditional firewalls don't understand semantic intent. 
                </p>
                <p>
                  Swarm Security is the missing layer—a <span className="redacted" title="Semantic Shield Technology">high-performance semantic proxy</span> that sits between your users and your LLMs, blocking PII, IP, and secrets in real-time.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-8 bg-white/5 border border-white/5 rounded-3xl group hover:border-emerald-500/30 transition-all">
                  <ShieldAlert className="text-emerald-500 mb-4" />
                  <h4 className="font-bold text-white uppercase text-sm mb-2 tracking-tighter">Leak Prevention</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Real-time token scrubbing.</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/5 rounded-3xl group hover:border-emerald-500/30 transition-all">
                  <Radar className="text-emerald-500 mb-4" />
                  <h4 className="font-bold text-white uppercase text-sm mb-2 tracking-tighter">Observability</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Map agent behavior trees.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 p-8 font-mono text-[11px] group">
               <div className="text-emerald-500/50 mb-4 uppercase tracking-[0.2em]">Live Intercept Feed</div>
               <div className="space-y-2">
                  <div className="flex gap-4">
                    <span className="text-gray-700">10:04:12</span>
                    <span className="text-white">Analyzing Agent Loop [Node_042]...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700">10:04:13</span>
                    <span className="text-white">Scanning for Proprietary Assets...</span>
                  </div>
                  <div className="flex gap-4 bg-red-500/10 border border-red-500/20 p-2 rounded">
                    <span className="text-red-500 font-bold">10:04:14</span>
                    <span className="text-red-400 font-bold uppercase tracking-widest animate-pulse">Threat Detected: SQL_SCHEMA_LEAK. Blocking.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700">10:04:15</span>
                    <span className="text-emerald-500 font-bold">Still no luck for the attacker. Scrubbed.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700">10:04:16</span>
                    <span className="text-emerald-400 opacity-50">Resuming nominal agent flow.</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Black Box */}
      <section id="blackbox" className="py-32 bg-[#050b1a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1 flex justify-center">
               <div className="w-72 h-72 relative group cursor-crosshair">
                  <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full group-hover:bg-emerald-500/10 transition-all" />
                  <div className="relative w-full h-full bg-black/60 border border-emerald-500/20 rounded-[2rem] transform rotate-3 group-hover:rotate-0 transition-all duration-700 flex items-center justify-center p-8">
                     <img src={BLACKBOX_IMAGE_B64} alt="The Black Box" className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute top-0 right-0 p-4 bg-emerald-500/10 backdrop-blur rounded-bl-3xl border-l border-b border-emerald-500/20 shadow-2xl">
                     <Lock className="text-emerald-500" size={24} />
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8">
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-[0.9]">Inside the <br /><span className="text-emerald-500 italic">Black Box.</span></h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Enterprise AI deployments are currently a "Black Box". You don't know what's going in, and you don't know what's coming out. 
              </p>
              <div className="space-y-4">
                {[
                  "Deep Token Inspection for PII/Secrets",
                  "Agentic Decision Path Mapping",
                  "Autonomous Response Isolation",
                  "Prompt Injection Shielding"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 text-white font-bold uppercase text-xs tracking-widest border-b border-white/5 pb-4">
                    <CheckCircle2 size={16} className="text-emerald-500" /> {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teasing Section */}
      <section id="teasing" className="py-32 bg-swarm-dark border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
           <div className="inline-flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">
             <AlertTriangle size={14} /> Attack Surface Monitoring
           </div>
           <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-white/10 select-none">Still no luck.</h2>
           
           <div className="grid md:grid-cols-4 gap-4 mt-20">
              {[
                { label: "Injection Attempts", value: "4,192", icon: <Bug size={20}/> },
                { label: "Secret Leaks Prevented", value: "1,029", icon: <Lock size={20}/> },
                { label: "Agent Misbehaviors", value: "88", icon: <Ghost size={20}/> },
                { label: "Successful Breaches", value: "0", icon: <Shield size={20}/> }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center space-y-2 group hover:bg-emerald-500/[0.02] transition-all">
                  <div className="flex justify-center text-gray-600 group-hover:text-emerald-500/50 mb-2">{stat.icon}</div>
                  <div className={`text-4xl font-black tracking-tighter ${stat.value === '0' ? 'text-emerald-500' : 'text-white'}`}>{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold text-gray-500">{stat.label}</div>
                </div>
              ))}
           </div>
           
           <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-12">
             They try every day. We stop them every second.
           </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#050b1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex items-center gap-3">
              <SwarmLogo size={28} />
              <span className="font-black text-xs tracking-tighter uppercase text-gray-400">Swarm Security</span>
           </div>
           <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-600">
             <a href="#" className="hover:text-white transition-colors">Documentation</a>
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <span>© 2024 Secure_Token</span>
           </div>
        </div>
      </footer>

      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
