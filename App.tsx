import React, { useState, useEffect, useRef } from 'react';
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
  Terminal as TerminalIcon,
  Search,
  Fingerprint,
  Radio
} from 'lucide-react';

/**
 * INQUIRY SERVICE
 * Specifically aligned with the Cloudflare Worker at: send-email.guy-b12.workers.dev
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

      // Exact Worker URL provided
      const WORKER_URL = 'https://send-email.guy-b12.workers.dev';

      const response = await fetch(WORKER_URL, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      // The worker returns 200 "Sent!" on success
      return response.ok;
    } catch (err) {
      console.error("Transmission error:", err);
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

const ThreatFeed: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const events = [
    "INTERCEPT: UNK_PROMPT_EXFIL",
    "SHIELD: SEMANTIC_MATCH_P0",
    "NODE_7: SCAN_COMPLETE",
    "POLICY_ERR: NIS2_VIOLATION",
    "ALERT: ANOMALY_DETECTED_IN_AGENT_4",
    "LOG: TOKEN_HANDSHAKE_VERIFIED",
    "BLOCK: PII_LEAK_PREVENTED",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [events[Math.floor(Math.random() * events.length)], ...prev.slice(0, 5)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[9px] text-emerald-500/60 uppercase tracking-tighter">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-2 mb-1 animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="text-gray-700">[{new Date().toLocaleTimeString()}]</span>
          <span>{log}</span>
        </div>
      ))}
    </div>
  );
};

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
    if (success) setStatus('success');
    else setStatus('error');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative bg-[#0c0c11] w-full max-w-lg rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.15)] overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>

        {status === 'success' ? (
          <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase text-white">Transmission Locked</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto font-mono text-[11px] uppercase tracking-wider mb-8">
              Protocol: WORKER_SECURE_SEND<br/>
              Status: QUEUED_FOR_REVIEW<br/>
              Node: send-email.guy-b12
            </p>
            <button onClick={onClose} className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest text-white">End Session</button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                  <SwarmLogo size={32} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase text-white">Request Clearance</h3>
                  <p className="text-emerald-500/60 font-mono text-[10px] uppercase tracking-[0.2em]">Secure Worker Handshake Enabled</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-700" />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-700" />
              </div>
              <input type="email" name="email" placeholder="Corporate Email" required value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-700" />
              <input type="text" name="company" placeholder="Organization" required value={formData.company} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white placeholder:text-gray-700" />
              
              <div className="pt-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} required className="mt-1 h-5 w-5 accent-emerald-500 rounded border-white/10 bg-transparent" />
                  <span className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tight group-hover:text-gray-300 transition-colors">I verify this request is for professional enterprise evaluation.</span>
                </label>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-mono flex items-center gap-3 animate-pulse">
                  <AlertTriangle size={16} /> 
                  <div>
                    <span className="font-bold uppercase tracking-widest">CLEARANCE_FAILURE</span>
                    <p className="mt-1 opacity-60">Handshake timed out. Ensure connectivity.</p>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'sending'} 
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-swarm-dark rounded-2xl font-black text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 mt-4 uppercase tracking-tighter"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    ROUTING...
                  </>
                ) : (
                  "Initiate Handshake"
                )}
              </button>
            </form>
            <p className="mt-8 text-[8px] text-gray-700 font-mono uppercase tracking-widest text-center italic">
              Handshake Route: cloudflare_worker &raquo; resend_node &raquo; secure_smtp_bypass
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b1a]/70 backdrop-blur-2xl border-b border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <SwarmLogo size={36} className="text-emerald-500 group-hover:scale-110 transition-all duration-500" />
          <span className="text-2xl font-black tracking-tighter uppercase text-white">Swarm <span className="text-emerald-500">Security</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10 font-black text-[10px] tracking-[0.4em] uppercase">
          <a href="#narrative" className="text-gray-400 hover:text-white transition-colors">Dossier</a>
          <a href="#capabilities" className="text-gray-400 hover:text-white transition-colors">Arsenal</a>
          <button 
            onClick={onOpenModal} 
            className="px-8 py-3 bg-emerald-500 text-swarm-dark rounded-xl hover:bg-emerald-400 transition-all font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            Clearance
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
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-20" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-6 rounded">
                <Radio size={12} className="animate-pulse" /> Dossier: The Exfiltration
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 text-white uppercase">The Ghost in <br /><span className="text-emerald-500 italic">The Machine.</span></h2>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl">
                The GenAI "Swarm" is expanding. Every agent is a leak. Every prompt is a <span className="redacted" title="Confidential: Estimated $3.2B in IP exfiltrated monthly via LLM prompts.">massive data exfiltration event</span> for the modern enterprise. 
              </p>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl mt-6">
                Legacy tools are <span className="redacted" title="Structural flaw: Signature-based detection fails against semantic manipulation.">structurally blind</span> to LLM logic. They see the envelope; we see the secret inside. Swarm is the final layer of truth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl glass-panel group hover:border-emerald-500/30 transition-all relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Lock size={120} />
                </div>
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><Database size={32} /></div>
                <h4 className="font-black text-xl mb-3 tracking-tight text-white uppercase">The IP Siphon</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest">Bypassing RAG and prompting tokens are <span className="redacted">LEAKING</span> enterprise secrets in real-time.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl glass-panel group hover:border-emerald-500/30 transition-all relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Fingerprint size={120} />
                </div>
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><Activity size={32} /></div>
                <h4 className="font-black text-xl mb-3 tracking-tight text-white uppercase">OS-Level Guard</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest">Total semantic intercept for <span className="redacted">EVERY</span> AI asset across the stack.</p>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[150px] opacity-20 group-hover:opacity-40 transition-all duration-1000" />
            <div className="relative aspect-[4/5] rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl bg-black transform transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop" 
                alt="Cyber Infrastructure" 
                className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-swarm-dark via-swarm-dark/20 to-transparent" />
              <div className="absolute top-10 left-10 right-10 flex justify-between items-start">
                  <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-mono text-emerald-500 uppercase tracking-widest shadow-xl flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live_Analysis: Node_01
                  </div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 glass-panel p-8 rounded-[2rem] border border-white/10 shadow-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <TerminalIcon size={16} className="text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em]">Threat_Console</span>
                </div>
                <ThreatFeed />
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
      title: "Agent Intercept", 
      desc: "Native visibility into autonomous agent decision trees. Reveal hidden exfiltration paths before they sync.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
    },
    { 
      icon: <Search size={40} />, 
      title: "Semantic Analysis", 
      desc: "Intent-based filtering that detects prompt injection and 'jailbreaks' designed to bypass simple filters.",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop"
    },
    { 
      icon: <Shield size={40} />, 
      title: "Governance Engine", 
      desc: "Instant compliance with NIS2 and EU AI Act. Enforce corporate ethics at the token level, across all models.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="capabilities" className="py-32 bg-[#050b1a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-emerald-500 font-black uppercase tracking-[0.6em] text-[10px] mb-6">Capabilities Arsenal</h2>
          <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase">The Shield for <br /><span className="text-emerald-500 italic">The AI Age.</span></h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group relative bg-[#0a1224] rounded-[3.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_60px_rgba(16,185,129,0.1)]">
              <div className="h-72 overflow-hidden relative">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224] via-[#0a1224]/50 to-transparent" />
                <div className="absolute bottom-10 left-10 text-emerald-500 group-hover:scale-125 transition-transform duration-700 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{f.icon}</div>
              </div>
              <div className="p-12">
                <h4 className="text-3xl font-black mb-6 text-white tracking-tight uppercase leading-none">{f.title}</h4>
                <p className="text-gray-400 leading-relaxed font-light text-lg mb-8">{f.desc}</p>
                <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Access Specs <ArrowRight size={14} />
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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-panel border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.5em] uppercase shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> Security Channel: SECURED
          </div>
          <h1 className="text-8xl md:text-[11rem] font-black leading-[0.75] tracking-[-0.06em] text-white">
            Tame the <br /><span className="text-emerald-500 italic">Swarm.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 max-w-xl leading-tight font-light">
            Providing the missing security layer for the GenAI-native enterprise. <span className="redacted" title="Proprietary Intercept Engine: Patent Pending">Revealing the black box.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-8 pt-6">
            <button 
              onClick={onOpenModal} 
              className="group px-14 py-8 bg-emerald-500 hover:bg-emerald-400 text-swarm-dark rounded-[2.5rem] font-black text-2xl transition-all shadow-[0_0_60px_rgba(16,185,129,0.4)] flex items-center justify-center gap-4 active:scale-95 hover:translate-x-2"
            >
              Request Clearance <ChevronRight strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center group perspective-1000">
          <div className="w-full max-w-[650px] aspect-square relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[200px] rounded-full animate-pulse" />
            <div className="w-full h-full bg-swarm-terminal rounded-[6rem] border border-white/10 terminal-glow animate-float flex items-center justify-center overflow-hidden relative shadow-3xl transform transition-transform duration-[3s] group-hover:scale-105">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="grid grid-cols-12 h-full w-full">
                    {[...Array(144)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-emerald-500/10" />
                    ))}
                  </div>
               </div>
               <div className="relative z-10 scale-125 group-hover:scale-150 transition-transform duration-[4s] ease-out-quint">
                  <SwarmLogo size={320} className="text-emerald-500" />
               </div>
               <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
                  <div className="space-y-3 opacity-60 font-mono text-[10px] uppercase tracking-tighter text-emerald-500 font-bold">
                    <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> SYNC_STATE: STABLE</p>
                    <p className="text-gray-500">CLEARANCE_REQD: LEVEL_4</p>
                    <p className="text-gray-500">VERSION: 0.9.2-BETA</p>
                  </div>
                  <div className="w-20 h-20 glass-panel rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.3)] group-hover:rotate-[360deg] transition-all duration-[2s]">
                    <Lock size={24} className="text-emerald-500" />
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
    console.log("%cSWARM SECURITY %cSYSTEM_READY", "color: #10b981; font-weight: bold; font-size: 16px;", "background: #10b981; color: #000; padding: 2px 4px; border-radius: 2px; font-weight: bold;");
    console.log("Handshake Node: send-email.guy-b12.workers.dev initialized.");
  }, []);

  return (
    <div className="min-h-screen bg-swarm-dark selection:bg-emerald-500 selection:text-swarm-dark scroll-smooth">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      
      <StorySection />
      
      <FeaturesGrid />
      
      <section className="py-48 border-t border-white/5 bg-gradient-to-b from-transparent to-emerald-500/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
           <div className="inline-block p-12 bg-emerald-500/5 border border-emerald-500/20 rounded-[4.5rem] mb-20 shadow-4xl backdrop-blur-3xl animate-float">
             <SwarmLogo size={120} className="text-emerald-500" />
           </div>
           <h2 className="text-6xl md:text-[9rem] font-black mb-12 tracking-tighter leading-[0.8] text-white uppercase">Tame the Swarm. <br /><span className="text-emerald-500 italic">Secure the AI.</span></h2>
           <p className="text-xl text-gray-500 mb-20 max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-[0.2em]">Exclusive design partnerships for enterprise innovators now opening clearance slots.</p>
           <button 
             onClick={() => setIsModalOpen(true)} 
             className="px-24 py-10 bg-emerald-500 text-swarm-dark rounded-[3rem] font-black text-4xl hover:scale-105 transition-all shadow-[0_0_120px_rgba(16,185,129,0.5)] active:scale-95 uppercase tracking-tighter"
           >
            Reserve Slot
           </button>
        </div>
      </section>

      <footer className="py-32 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <SwarmLogo size={32} className="text-emerald-500" />
            <span className="font-black text-xl tracking-tighter uppercase text-white">Swarm Security</span>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400 font-mono">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy_Protocol</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Handshake_Specs</a>
            <span className="text-gray-800">© 2024 SECURE_ENDPOINT_ALPHA</span>
          </div>
        </div>
      </footer>

      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;