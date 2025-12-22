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
  Monitor, 
  Loader2, 
  CheckCircle2
} from 'lucide-react';

// --- Improved SMTP Fetch Utility ---
const EmailService = {
  send: async function (config: any): Promise<string> {
    const body = new URLSearchParams();
    body.append("Host", config.Host);
    body.append("Username", config.Username);
    body.append("Password", config.Password);
    body.append("To", config.To);
    body.append("From", config.From);
    body.append("Subject", config.Subject);
    body.append("Body", config.Body);
    body.append("Action", "Send");

    try {
      const response = await fetch("https://smtpjs.com/v1/send.aspx", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
      });
      return await response.text();
    } catch (err) {
      throw new Error("Network connection blocked by security firewall.");
    }
  }
};

const SMTP_CONFIG = {
  Host: "smtp.gmail.com",
  Username: "info@swarm-security.com",
  Password: "txjctqwiefcabamv" 
};

const CONTACT_EMAILS = "roy@swarm-security.com, guy@swarm-security.com";

// --- Components ---

const SwarmLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g stroke="white" strokeWidth="1.5" strokeOpacity="0.2">
      <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" />
      <path d="M50 20 L50 35 M75 35 L62 42 M75 65 L62 58 M50 80 L50 65 M25 65 L38 58 M25 35 L38 42" />
      <circle cx="50" cy="50" r="18" strokeDasharray="2 2" />
    </g>
    <circle cx="50" cy="18" r="5" fill="#10b981" /> 
    <circle cx="78" cy="34" r="5" fill="#10b981" /> 
    <circle cx="78" cy="66" r="5" fill="#d1d5db" /> 
    <circle cx="50" cy="82" r="5" fill="#10b981" /> 
    <circle cx="22" cy="66" r="5" fill="#10b981" /> 
    <circle cx="22" cy="34" r="5" fill="#10b981" /> 
    <circle cx="72" cy="74" r="6" fill="#84cc16" className="animate-pulse" /> 
    <circle cx="50" cy="50" r="2" fill="white" fillOpacity="0.5" />
  </svg>
);

const AccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    agreed: false
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setStatus('sending');

    try {
      const emailBody = `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; padding: 20px;">
          <h2 style="color: #10b981;">New Swarm Security Inquiry</h2>
          <hr />
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Country:</strong> ${formData.country}</p>
        </div>
      `;

      const result = await EmailService.send({
        ...SMTP_CONFIG,
        To: CONTACT_EMAILS,
        From: SMTP_CONFIG.Username,
        Subject: `Access Request: ${formData.company}`,
        Body: emailBody
      });

      if (result === 'OK' || result === 'ok') {
        setStatus('success');
      } else {
        throw new Error(result);
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-[#0c0c11] w-full max-w-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={24} /></button>

        {status === 'success' ? (
          <div className="text-center py-12">
            <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Request Logged</h3>
            <p className="text-gray-400">Our analysts will verify your organization's credentials and contact you shortly.</p>
            <button onClick={onClose} className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">Close Portal</button>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <SwarmLogo size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Secure Access Portal</h3>
              <p className="text-gray-500 text-sm">Enterprise verification required for early access.</p>
            </div>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} className="w-full px-5 py-4 bg-[#14141d] border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all" />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} className="w-full px-5 py-4 bg-[#14141d] border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all" />
              </div>
              <input type="email" name="email" placeholder="Business Email" required value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-[#14141d] border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all" />
              <input type="text" name="company" placeholder="Organization" required value={formData.company} onChange={handleInputChange} className="w-full px-5 py-4 bg-[#14141d] border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all" />
              
              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} required className="mt-1 h-5 w-5 accent-emerald-500" />
                  <span className="text-xs text-gray-500 leading-relaxed">I confirm that I am requesting access on behalf of a registered legal entity.</span>
                </label>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle size={14} /> Security handshake failed. Please check your connection or contact info@swarm-security.com directly.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3">
                {status === 'sending' ? <Loader2 className="animate-spin" /> : "Initialize Secure Request"}
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b1a]/80 backdrop-blur-xl border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SwarmLogo size={32} />
          <span className="text-2xl font-extrabold tracking-tighter">swarm <span className="text-emerald-500">security</span></span>
        </div>
        <button onClick={onOpenModal} className="bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] px-6 py-2 rounded-xl font-bold text-sm transition-all">Get Access</button>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-swarm-gradient">
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            <Lock size={14} /> End-to-End Governance
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter">
            Tame the <br /><span className="text-emerald-500 text-glow">Swarm.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed font-light">
            Visibility where others see shadows. Ironclad security for the Generative AI era.
          </p>
          <button onClick={onOpenModal} className="group px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3">
            Unbox the Future <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative flex justify-center">
          <div className="w-full max-w-[500px] aspect-square relative group">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-1000" />
            <div className="w-full h-full bg-[#0a1224] rounded-[3rem] border border-white/10 black-box-glow animate-float flex items-center justify-center overflow-hidden">
               <div className="scanline" />
               <div className="relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                  <SwarmLogo size={180} />
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" 
                 alt="tech background" 
                 className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid: React.FC = () => {
  const features = [
    { icon: <Cpu />, title: "OS-Level Intercept", desc: "Monitor interactions at the system core before they reach the cloud.", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&q=80" },
    { icon: <Eye />, title: "Semantic Analysis", desc: "Identify data exfiltration through intent, not just keyword matching.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=600&q=80" },
    { icon: <Shield />, title: "EU AI Act Compliance", desc: "Automated risk assessment and logging for total regulatory alignment.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <section className="py-32 bg-[#050b1a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold">Defense in Depth.</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group relative bg-[#0a1224] rounded-[2.5rem] border border-white/5 overflow-hidden transition-all hover:-translate-y-2 hover:border-emerald-500/30">
              <div className="h-48 overflow-hidden relative">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224] to-transparent" />
                <div className="absolute bottom-6 left-8 text-emerald-500">{f.icon}</div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-3">{f.title}</h4>
                <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050b1a]">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <FeaturesGrid />
      
      <section className="py-32 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-6">
           <div className="inline-block p-4 bg-emerald-500/10 rounded-2xl mb-8">
             <SwarmLogo size={48} />
           </div>
           <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter">Secure the Swarm.</h2>
           <p className="text-xl text-gray-500 mb-12">The black box is open. Do you have visibility?</p>
           <button onClick={() => setIsModalOpen(true)} className="px-12 py-5 bg-emerald-500 text-[#050b1a] rounded-2xl font-bold text-xl hover:scale-105 transition-all">Request Design Partnership</button>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-xs text-gray-600 uppercase tracking-widest">
        &copy; 2024 Swarm Security. Classified.
      </footer>

      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;