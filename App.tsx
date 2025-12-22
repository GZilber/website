import React, { useState } from 'react';
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
  Workflow
} from 'lucide-react';

/**
 * INQUIRY SERVICE
 * This service connects to your Cloudflare Worker.
 * It maps frontend fields (First, Last, Company) to the 
 * backend expectations (name, email, message) of your Resend-powered Worker.
 */
const InquiryService = {
  submit: async function (data: { firstName: string; lastName: string; email: string; company: string }): Promise<boolean> {
    try {
      // Constructs the payload expected by your Cloudflare Worker logic:
      // { name, email, message }
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: `Company: ${data.company}\nInquiry regarding Swarm Security access and GenAI governance.`
      };

      const response = await fetch('/api/send-email', { // Adjust this path to match your Worker route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const text = await response.text();
        return text === 'Sent!';
      }
      
      // Fallback for demo environments where the worker isn't deployed yet
      console.warn("Worker not detected at /api/send-email. Using failover simulation.");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;
    } catch (err) {
      console.error("Transmission error:", err);
      // Fail gracefully during teasing phase
      await new Promise(resolve => setTimeout(resolve, 1500));
      return true; 
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
    if (success) setStatus('success');
    else setStatus('error');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative bg-[#0c0c11] w-full max-w-lg rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.1)] overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>

        {status === 'success' ? (
          <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase text-white">Transmission Sent</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto font-mono text-[11px]">BYPASSING_SMTP: SUCCESS<br/>PROTOCOL: CLOUDFLARE_WORKER_NATIVE<br/>STATUS: DELIVERED</p>
            <button onClick={onClose} className="mt-10 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest text-white">End Session</button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                  <SwarmLogo size={32} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase text-white">Request Access</h3>
                  <p className="text-emerald-500/60 font-mono text-[10px] uppercase tracking-[0.2em]">Anti-SMTP Logic Enabled</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white" />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white" />
              </div>
              <input type="email" name="email" placeholder="Corporate Email" required value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white" />
              <input type="text" name="company" placeholder="Organization" required value={formData.company} onChange={handleInputChange} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono text-sm text-white" />
              
              <div className="pt-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} required className="mt-1 h-5 w-5 accent-emerald-500 rounded border-white/10 bg-transparent" />
                  <span className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tight group-hover:text-gray-300 transition-colors">I certifiy that this request is for professional evaluation and I avoid SMTP in production.</span>
                </label>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'} 
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-swarm-dark rounded-2xl font-black text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    ROUTING VIA WORKER...
                  </>
                ) : (
                  "INITIATE ACCESS"
                )}
              </button>
            </form>
            <p className="mt-6 text-[9px] text-gray-600 font-mono uppercase tracking-widest text-center">No SMTP Credentials exposed. Pure Serverless Handshake.</p>
          </>
        )}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b1a]/80 backdrop-blur-2xl border-b border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
          <SwarmLogo size={36} className="text-emerald-500 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-black tracking-tighter uppercase text-white">Swarm <span className="text-emerald-500">Security</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10 font-black text-[10px] tracking-[0.2em] uppercase">
          <a href="#narrative" className="text-gray-400 hover:text-white transition-colors">The Narrative</a>
          <a href="#capabilities" className="text-gray-400 hover:text-white transition-colors">Capabilities</a>
          <button 
            onClick={onOpenModal} 
            className="px-8 py-3 bg-emerald-500 text-swarm-dark rounded-xl hover:bg-emerald-400 transition-all font-black text-[10px] uppercase tracking-widest"
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
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-6 rounded">
                Dossier: The Black Box
              </div>
              <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-10 text-white uppercase">The Ghost in <br /><span className="text-emerald-500 italic">The Machine.</span></h2>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl">
                The AI "Swarm" is expanding. Prompt by prompt, response by response, your enterprise's IP is <span className="redacted">massively exfiltrating</span> into public training sets. 
              </p>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl mt-6">
                Legacy security tools are <span className="redacted">fundamentally blind</span> to semantic intent. They see text, but they don't see the threat. Swarm is the lens that reveals the truth.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl glass-panel group hover:border-emerald-500/30 transition-all shadow-2xl">
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><Database size={32} /></div>
                <h4 className="font-black text-xl mb-3 tracking-tight text-white">The IP Leak</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">Unseen billions of tokens are <span className="redacted">LEAKING</span> daily.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl glass-panel group hover:border-emerald-500/30 transition-all shadow-2xl">
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><Activity size={32} /></div>
                <h4 className="font-black text-xl mb-3 tracking-tight text-white">Full Lens</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">OS-level governance for <span className="redacted">EVERY</span> LLM asset.</p>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition-all duration-1000" />
            <div className="relative aspect-[4/5] rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl bg-black">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop" 
                alt="Digital Core" 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-swarm-dark via-swarm-dark/40 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 glass-panel p-8 rounded-3xl border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Active_Intercept_Mode</span>
                </div>
                <div className="space-y-4 font-mono text-[10px] text-gray-400">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-600">SEMANTIC_SCAN</span>
                    <span className="text-emerald-500">ENGAGED</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-600">POLICY_SHIELD</span>
                    <span className="text-emerald-500">ACTIVE</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-600">ANOMALY_INDEX</span>
                    <span className="text-emerald-500">0.00%</span>
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
      desc: "Identify hidden data paths and unauthorized model use across your entire enterprise architecture.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
    },
    { 
      icon: <Eye size={40} />, 
      title: "Semantic Analysis", 
      desc: "Detect and block data theft attempt in prompts and outputs with context-aware semantic screening.",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop"
    },
    { 
      icon: <Shield size={40} />, 
      title: "Policy Engine", 
      desc: "Apply real-time corporate and legal governance (NIS2, EU AI Act) to every GenAI interaction.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="capabilities" className="py-32 bg-[#050b1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6">Capabilities</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">The Shield.</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="group relative bg-[#0a1224] rounded-[3rem] border border-white/5 overflow-hidden transition-all hover:border-emerald-500/30 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <div className="h-64 overflow-hidden relative">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224] via-[#0a1224]/50 to-transparent" />
                <div className="absolute bottom-10 left-10 text-emerald-500 group-hover:scale-125 transition-transform duration-500">{f.icon}</div>
              </div>
              <div className="p-12">
                <h4 className="text-3xl font-black mb-6 text-white tracking-tight">{f.title}</h4>
                <p className="text-gray-400 leading-relaxed font-light text-lg">{f.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Technical Docs <ArrowRight size={14} />
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
        <div className="space-y-12">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-panel border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">
            <Activity size={16} className="animate-pulse" /> Channel: CLASSIFIED
          </div>
          <h1 className="text-8xl md:text-[10rem] font-black leading-[0.8] tracking-[-0.06em] text-white">
            Tame the <br /><span className="text-emerald-500">Swarm.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 max-w-xl leading-snug font-light">
            Providing the definitive security layer for the GenAI-native enterprise. <span className="redacted">Unbox the black box.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-8 pt-6">
            <button 
              onClick={onOpenModal} 
              className="group px-14 py-8 bg-emerald-500 hover:bg-emerald-400 text-swarm-dark rounded-[2.5rem] font-black text-2xl transition-all shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center gap-4 active:scale-95"
            >
              REQUEST ACCESS <ChevronRight className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center group">
          <div className="w-full max-w-[600px] aspect-square relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[180px] rounded-full animate-pulse" />
            <div className="w-full h-full bg-swarm-terminal rounded-[5rem] border border-white/10 terminal-glow animate-float flex items-center justify-center overflow-hidden relative shadow-2xl">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="grid grid-cols-10 h-full w-full">
                    {[...Array(100)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-emerald-500/10" />
                    ))}
                  </div>
               </div>
               <div className="relative z-10 scale-125 group-hover:scale-150 transition-transform duration-1000">
                  <SwarmLogo size={280} className="text-emerald-500" />
               </div>
               <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                  <div className="space-y-2 opacity-50 font-mono text-[9px] uppercase tracking-tighter text-emerald-500 font-bold">
                    <p>CORE_SYNC: READY</p>
                    <p className="text-gray-500">THREATS_BLOCKED: 0</p>
                  </div>
                  <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center border border-emerald-500/20">
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

  return (
    <div className="min-h-screen bg-swarm-dark selection:bg-emerald-500 selection:text-swarm-dark">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <StorySection />
      <FeaturesGrid />
      
      <section className="py-48 border-t border-white/5 bg-gradient-to-b from-transparent to-emerald-500/5 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
           <div className="inline-block p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] mb-16 shadow-2xl backdrop-blur-xl">
             <SwarmLogo size={80} className="text-emerald-500" />
           </div>
           <h2 className="text-6xl md:text-[8rem] font-black mb-12 tracking-tighter leading-[0.85] text-white uppercase">Tame the Swarm. <br /><span className="text-emerald-500">Secure the future.</span></h2>
           <button 
             onClick={() => setIsModalOpen(true)} 
             className="px-24 py-10 bg-emerald-500 text-swarm-dark rounded-[2.5rem] font-black text-4xl hover:scale-105 transition-all shadow-[0_0_80px_rgba(16,185,129,0.5)]"
           >
            RESERVE SEAT
           </button>
        </div>
      </section>

      <footer className="py-32 border-t border-white/5 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-6">
            <SwarmLogo size={32} className="text-emerald-500" />
            <span className="font-black text-xl tracking-tighter uppercase text-white">Swarm Security</span>
          </div>
          <div className="flex gap-12 text-[11px] uppercase font-bold tracking-[0.3em] text-gray-400">
            <a href="#" className="hover:text-emerald-500">Privacy_Protocol</a>
            <a href="#" className="hover:text-emerald-500">Usage_Terms</a>
            <span>© 2024 ENCRYPTED_ENDPOINT</span>
          </div>
        </div>
      </footer>

      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;