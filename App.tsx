import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Eye, 
  Lock, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  AlertTriangle, 
  Cpu, 
  Loader2, 
  CheckCircle2,
  Activity,
  Database,
  ArrowRight,
  Workflow,
  EyeOff,
  Terminal as TerminalIcon
} from 'lucide-react';

/**
 * INQUIRY SERVICE
 * Specifically aligned with the Cloudflare Worker: send-email.guy-b12.workers.dev
 * Expects: { name: string, email: string, message: string }
 */
const InquiryService = {
  submit: async function (data: { firstName: string; lastName: string; email: string; company: string }): Promise<boolean> {
    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: `Inquiry from ${data.company}. 
Requester: ${data.firstName} ${data.lastName}
Email: ${data.email}
Subject: Access Request to Swarm Security Platform.`
      };

      // Using the specific Worker URL provided
      const WORKER_URL = 'https://send-email.guy-b12.workers.dev';

      const response = await fetch(WORKER_URL, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        // The worker returns "Sent!" on success
        const text = await response.text();
        return text.includes('Sent');
      }
      
      return false;
    } catch (err) {
      console.error("Transmission error:", err);
      // Fail explicitly so the UI can show the error state
      return false; 
    }
  }
};

const SwarmLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4">
      <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" />
      <path d="M50 20 L50 80 M75 35 L25 65 M75 65 L25 35" />
    </g>
    <circle cx="50" cy="50" r="10" fill="#10b981" className="animate-pulse" />
    <circle cx="50" cy="18" r="4" fill="#10b981" /> 
    <circle cx="78" cy="34" r="4" fill="#10b981" /> 
    <circle cx="78" cy="66" r="4" fill="#10b981" /> 
    <circle cx="50" cy="82" r="4" fill="#10b981" /> 
    <circle cx="22" cy="66" r="4" fill="#10b981" /> 
    <circle cx="22" cy="34" r="4" fill="#10b981" /> 
  </svg>
);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setStatus('sending');

    const success = await InquiryService.submit(formData);
    if (success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-[#0c0c11] w-full max-w-lg rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.1)] overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>

        {status === 'success' ? (
          <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase text-white">Transmission Sent</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto font-mono text-[11px] uppercase tracking-wider">
              Bypassing_Public_Channels: SUCCESS<br/>
              Worker_Endpoint: VERIFIED<br/>
              Status: DELIVERED
            </p>
            <button onClick={onClose} className="mt-10 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-black text-xs uppercase tracking-[0.2em] text-white">Close Terminal</button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                  <SwarmLogo size={32} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase text-white">Access Protocol</h3>
                  <p className="text-emerald-500/60 font-mono text-[10px] uppercase tracking-[0.2em]">Requesting Design Partnership</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-600" />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-600" />
              </div>
              <input type="email" name="email" placeholder="Corporate Email" required value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-600" />
              <input type="text" name="company" placeholder="Organization Identity" required value={formData.company} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-600" />
              
              <div className="pt-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} required className="mt-1 h-5 w-5 accent-emerald-500 rounded border-white/10 bg-transparent cursor-pointer" />
                  <span className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tight group-hover:text-gray-300 transition-colors">I acknowledge that this transmission uses a secure non-SMTP handshake.</span>
                </label>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-mono flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertTriangle size={16} /> 
                  <div className="flex flex-col">
                    <span className="font-bold">TRANSMISSION_FAILED</span>
                    <span>Verify your connection and retry.</span>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'sending'} 
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-swarm-dark rounded-2xl font-black text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    INITIALIZING HANDSHAKE...
                  </>
                ) : (
                  "INITIATE ACCESS"
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
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b1a]/60 backdrop-blur-2xl border-b border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <SwarmLogo size={36} className="text-emerald-500 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-black tracking-tighter uppercase text-white group-hover:tracking-normal transition-all duration-500">Swarm <span className="text-emerald-500">Security</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10 font-black text-[10px] tracking-[0.3em] uppercase">
          <a href="#narrative" className="text-gray-400 hover:text-white transition-colors">The Narrative</a>
          <a href="#capabilities" className="text-gray-400 hover:text-white transition-colors">Capabilities</a>
          <button 
            onClick={onOpenModal} 
            className="px-8 py-3 bg-emerald-500 text-swarm-dark rounded-xl hover:bg-emerald-400 transition-all font-black text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            Get Access
          </button>
        </div>
        <button className="md:hidden text-white" onClick={onOpenModal}><Menu size={24} /></button>
      </div>
    </nav>
  );
};

const StorySection: React.FC = () => {
  return (
    <section id="narrative" className="py-32 bg-swarm-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-20" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-6 rounded">
                Dossier: Classified
              </div>
              <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-10 text-white uppercase">The Ghost in <br /><span className="text-emerald-500 italic">The Machine.</span></h2>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl">
                The GenAI "Swarm" is expanding. Every prompt, every agent, every response is a potential <span className="redacted" title="Hover to reveal secret info">massive IP breach</span> for the modern enterprise. 
              </p>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl mt-6">
                Legacy tools are <span className="redacted" title="Hidden truth">structurally blind</span> to semantic intent. They see bytes; we see the threat. Swarm is the lens that reveals the black box.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl glass-panel group hover:border-emerald-500/30 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Lock size={40} />
                </div>
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><Database size={32} /></div>
                <h4 className="font-black text-xl mb-3 tracking-tight text-white">The IP Drain</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">Unseen billions of corporate tokens are <span className="redacted">LEAKING</span> daily.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl glass-panel group hover:border-emerald-500/30 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Eye size={40} />
                </div>
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><Activity size={32} /></div>
                <h4 className="font-black text-xl mb-3 tracking-tight text-white">Zero Blindspots</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">OS-level intercept for <span className="redacted">TOTAL</span> asset governance.</p>
              </div>
            </div>
          </div>
          
          <div className="relative group perspective-1000">
            <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[120px] opacity-30 group-hover:opacity-60 transition-all duration-1000" />
            <div className="relative aspect-[4/5] rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl bg-black transform group-hover:rotate-y-2 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop" 
                alt="Cyber Infrastructure" 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-swarm-dark via-swarm-dark/30 to-transparent" />
              <div className="absolute top-10 left-10 right-10 flex justify-between items-start">
                  <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                    Live_Feed: Node_01
                  </div>
                  <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
                  </div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <TerminalIcon size={16} className="text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Secure_Intercept_Active</span>
                </div>
                <div className="space-y-4 font-mono text-[10px] text-gray-400">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-600">SEMANTIC_SCAN</span>
                    <span className="text-emerald-500">READY</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-600">GOVERNANCE_LOCK</span>
                    <span className="text-emerald-500">ENGAGED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">THREAT_VECTOR</span>
                    <span className="text-emerald-500">NULL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid: React.FC = () => {
  const features = [
    { 
      icon: <Workflow size={40} />, 
      title: "Flow Intercept", 
      desc: "Native visibility into the deepest layers of AI agents, revealing hidden data paths and unauthorized model use.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
    },
    { 
      icon: <EyeOff size={40} />, 
      title: "Semantic Shield", 
      desc: "We don't just see words; we see intent. Automatically block prompt-injection and sensitive data exfiltration.",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop"
    },
    { 
      icon: <Shield size={40} />, 
      title: "Policy Engine", 
      desc: "Real-time enforcement of NIS2, DORA, and your own corporate ethics across all GenAI platforms instantly.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="capabilities" className="py-32 bg-[#050b1a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6">Security Capabilities</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">The Shield for <br /><span className="text-emerald-500">GenAI Native.</span></h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="group relative bg-[#0a1224] rounded-[3rem] border border-white/5 overflow-hidden transition-all hover:border-emerald-500/30 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <div className="h-72 overflow-hidden relative">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224] via-[#0a1224]/50 to-transparent" />
                <div className="absolute bottom-10 left-10 text-emerald-500 group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{f.icon}</div>
              </div>
              <div className="p-12">
                <h4 className="text-3xl font-black mb-6 text-white tracking-tight">{f.title}</h4>
                <p className="text-gray-400 leading-relaxed font-light text-lg">{f.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Read Protocol <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-swarm-gradient">
      <div className="scanline" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-20">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-panel border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Activity size={16} className="animate-pulse" /> Status: DESIGN_PARTNER_PROGRAM
          </div>
          <h1 className="text-8xl md:text-[10rem] font-black leading-[0.8] tracking-[-0.06em] text-white">
            Tame the <br /><span className="text-emerald-500 italic">Swarm.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 max-w-xl leading-snug font-light">
            Defining the security layer for the AI-native enterprise. <span className="redacted" title="Proprietary info">Unbox the black box.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-8 pt-6">
            <button 
              onClick={onOpenModal} 
              className="group px-14 py-8 bg-emerald-500 hover:bg-emerald-400 text-swarm-dark rounded-[2.5rem] font-black text-2xl transition-all shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center gap-4 active:scale-95 hover:translate-x-2"
            >
              REQUEST ACCESS <ChevronRight strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center group perspective-1000">
          <div className="w-full max-w-[600px] aspect-square relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[180px] rounded-full animate-pulse" />
            <div className="w-full h-full bg-swarm-terminal rounded-[6rem] border border-white/10 terminal-glow animate-float flex items-center justify-center overflow-hidden relative shadow-2xl transform group-hover:scale-105 transition-transform duration-1000">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="grid grid-cols-10 h-full w-full">
                    {[...Array(100)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-emerald-500/10" />
                    ))}
                  </div>
               </div>
               <div className="relative z-10 scale-125 group-hover:scale-150 transition-transform duration-[2s] ease-out">
                  <SwarmLogo size={280} className="text-emerald-500" />
               </div>
               <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                  <div className="space-y-2 opacity-60 font-mono text-[9px] uppercase tracking-tighter text-emerald-500 font-bold">
                    <p className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> CORE_SYNC: ESTABLISHED</p>
                    <p className="text-gray-500">THREAT_BUFFER: NOMINAL</p>
                    <p className="text-gray-500">ACTIVE_NODES: 12</p>
                  </div>
                  <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <Lock size={20} className="text-emerald-500" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Add console 'tease'
    console.log("%cSwarm Security %c[CLASSIFIED]", "color: #10b981; font-size: 20px; font-weight: bold;", "color: #666; font-size: 14px;");
    console.log("Transmission node initialized. Listening for secure handshakes...");
  }, []);

  return (
    <div className="min-h-screen bg-swarm-dark selection:bg-emerald-500 selection:text-swarm-dark scroll-smooth">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      
      <StorySection />
      
      <FeaturesGrid />
      
      <section className="py-48 border-t border-white/5 bg-gradient-to-b from-transparent to-emerald-500/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
           <div className="inline-block p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[4rem] mb-16 shadow-2xl backdrop-blur-3xl animate-float">
             <SwarmLogo size={100} className="text-emerald-500" />
           </div>
           <h2 className="text-6xl md:text-[8rem] font-black mb-12 tracking-tighter leading-[0.85] text-white uppercase">Tame the Swarm. <br /><span className="text-emerald-500">Before it tames you.</span></h2>
           <p className="text-xl text-gray-500 mb-20 max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-[0.1em]">Exclusive design partnerships are now opening for selected enterprise innovators.</p>
           <button 
             onClick={() => setIsModalOpen(true)} 
             className="px-24 py-10 bg-emerald-500 text-swarm-dark rounded-[2.5rem] font-black text-4xl hover:scale-105 transition-all shadow-[0_0_100px_rgba(16,185,129,0.5)] active:scale-95 uppercase tracking-tighter"
           >
            RESERVE ACCESS
           </button>
        </div>
      </section>

      <footer className="py-32 border-t border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <SwarmLogo size={32} className="text-emerald-500" />
            <span className="font-black text-xl tracking-tighter uppercase text-white">Swarm Security</span>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[11px] uppercase font-bold tracking-[0.3em] text-gray-400 font-mono">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy_Protocol</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Compliance_Log</a>
            <span className="text-gray-700">© 2024 CLASSIFIED_SYSTEM</span>
          </div>
        </div>
      </footer>

      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;