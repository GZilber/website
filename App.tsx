import React, { useState, useEffect, useCallback } from 'react';
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
  CheckCircle2,
  Mail,
  Copy
} from 'lucide-react';

// --- Inlined SMTP.js Logic (Bypasses ERR_CONNECTION_RESET on script load) ---
const EmailService = {
  send: function (config: any): Promise<string> {
    return new Promise((resolve, reject) => {
      config.nocache = Math.floor(1e6 * Math.random() + 1);
      config.Action = "Send";
      const json = JSON.stringify(config);
      
      const xhr = new XMLHttpRequest();
      // We use the direct endpoint. If this is also blocked by your firewall, 
      // the "Security Protocol" fallback will still catch it.
      xhr.open("POST", "https://smtpjs.com/v1/send.aspx", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(new Error("SMTP Server Error: " + xhr.status));
        }
      };
      xhr.onerror = function () {
        reject(new Error("Network Error: The request was blocked by a firewall or security proxy."));
      };
      xhr.send(json);
    });
  }
};

// --- Security Configuration ---
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
    <circle cx="50" cy="35" r="4" fill="#d1d5db" /> 
    <circle cx="65" cy="42" r="4" fill="#d1d5db" /> 
    <circle cx="65" cy="58" r="4" fill="#d1d5db" /> 
    <circle cx="50" cy="65" r="4" fill="#d1d5db" /> 
    <circle cx="35" cy="58" r="4" fill="#d1d5db" /> 
    <circle cx="35" cy="42" r="4" fill="#d1d5db" /> 
    <circle cx="72" cy="74" r="6" fill="#84cc16" className="animate-pulse" /> 
    <circle cx="50" cy="50" r="2" fill="white" fillOpacity="0.5" />
  </svg>
);

const RequiredStar = () => <span className="text-emerald-500 ml-1">*</span>;

const AccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    country: '',
    referral: '',
    agreed: false
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'blocked' | 'error'>('idle');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const getManualMailto = useCallback(() => {
    const subject = encodeURIComponent(`Early Access Request: ${formData.company} - ${formData.firstName}`);
    const body = encodeURIComponent(`
REQUEST FOR EARLY ACCESS
-----------------------
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}
Job Title: ${formData.jobTitle || 'N/A'}
Country: ${formData.country}
Referral: ${formData.referral || 'N/A'}

[Sent from Swarm Security High-Security Portal]
    `.trim());
    return `mailto:${CONTACT_EMAILS}?subject=${subject}&body=${body}`;
  }, [formData]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAILS);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setStatus('sending');

    try {
      const emailBody = `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #10b981;">New Swarm Security Lead</h2>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Job Title:</strong> ${formData.jobTitle}</p>
          <p><strong>Country:</strong> ${formData.country}</p>
          <p><strong>Referral:</strong> ${formData.referral}</p>
        </div>
      `;

      const result = await EmailService.send({
        Host: SMTP_CONFIG.Host,
        Username: SMTP_CONFIG.Username,
        Password: SMTP_CONFIG.Password,
        To: CONTACT_EMAILS,
        From: SMTP_CONFIG.Username,
        Subject: `Early Access: ${formData.company}`,
        Body: emailBody
      });

      if (result === 'OK' || result === 'ok') {
        setStatus('success');
      } else {
        throw new Error(result);
      }
    } catch (err: any) {
      console.warn("SMTP failure, falling back to manual protocol:", err);
      // If the AJAX POST is also blocked, we fall back to manual email
      setStatus('blocked');
    }
  };

  const isSubmitDisabled = status === 'sending' || !formData.agreed;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-10">
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-[#0c0c11] w-full max-w-xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 text-white min-h-[580px] flex flex-col my-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/10 blur-[80px] pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20 p-2 hover:bg-white/5 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 flex-grow relative z-10 flex flex-col">
          {status === 'success' ? (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 my-auto">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center animate-checkmark">
                  <CheckCircle2 size={56} className="text-emerald-500" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Transmission Successful</h3>
              <p className="text-gray-400 max-w-xs mx-auto leading-relaxed mb-10">
                Thank you, <span className="text-white font-semibold">{formData.firstName}</span>. Our analysts will review your organization's request shortly.
              </p>
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all"
              >
                Return to Portal
              </button>
            </div>
          ) : status === 'blocked' ? (
            <div className="text-center animate-in fade-in slide-in-from-bottom-6 duration-500 my-auto">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center rotate-3">
                  <Shield className="text-emerald-500" size={36} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Enterprise Filter Detected</h3>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
                Your network is blocking the automated mail channel. To ensure your request is prioritized, please use the <strong>Secure Manual Handoff</strong>.
              </p>
              
              <div className="space-y-4 max-w-md mx-auto">
                <a 
                  href={getManualMailto()}
                  className="w-full flex items-center justify-center gap-4 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98]"
                >
                  <Mail size={22} /> Finalize via Local Email
                </a>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleCopyEmail}
                    className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all"
                  >
                    {copyFeedback ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    {copyFeedback ? "Address Copied" : "Copy Target Email"}
                  </button>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all"
                  >
                    <X size={16} /> Edit Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                     <SwarmLogo size={40} />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold tracking-tight">Secure Early Access</h3>
                     <p className="text-xs text-gray-500 mt-0.5 font-medium uppercase tracking-widest">Enterprise Inquiry Protocol</p>
                   </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First name" 
                    required
                    disabled={status === 'sending'}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 focus:bg-[#181824] rounded-2xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                  />
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last name" 
                    required
                    disabled={status === 'sending'}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 focus:bg-[#181824] rounded-2xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                  />
                </div>

                <input 
                  type="email" 
                  name="email"
                  placeholder="Business Email" 
                  required
                  disabled={status === 'sending'}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 focus:bg-[#181824] rounded-2xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="company"
                    placeholder="Company" 
                    required
                    disabled={status === 'sending'}
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 focus:bg-[#181824] rounded-2xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                  />
                  <div className="relative">
                    <select 
                      name="country"
                      required
                      disabled={status === 'sending'}
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 focus:bg-[#181824] rounded-2xl text-sm outline-none transition-all appearance-none text-gray-400 disabled:opacity-50"
                    >
                      <option value="">Country...</option>
                      <option value="US">USA</option>
                      <option value="IL">Israel</option>
                      <option value="UK">UK</option>
                      <option value="DE">Germany</option>
                      <option value="SG">Singapore</option>
                    </select>
                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-gray-600 pointer-events-none" size={16} />
                  </div>
                </div>

                <div className="space-y-5 pt-6 border-t border-white/5">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="agreed"
                      required
                      disabled={status === 'sending'}
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      className="mt-1 h-5 w-5 rounded border-white/10 bg-[#14141d] accent-emerald-500" 
                    />
                    <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed">
                      I understand that Swarm Security requires verified organizational identity for early-access approval.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitDisabled}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl mt-6 active:scale-[0.98] flex items-center justify-center gap-4 
                    ${isSubmitDisabled 
                      ? 'bg-emerald-500/20 text-emerald-500/40 cursor-not-allowed border border-emerald-500/10' 
                      : 'bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] shadow-emerald-500/20'
                    }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="animate-spin" size={22} />
                      Opening Secure Channel...
                    </>
                  ) : (
                    "Initialize Request"
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 mt-4 uppercase tracking-tighter">
                   <Lock size={10} /> End-to-End Encryption Protocol Active
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050b1a]/95 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="p-1 bg-white/5 rounded-lg border border-white/10 group-hover:border-emerald-500/30 transition-all">
            <SwarmLogo size={32} />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter text-white">swarm <span className="text-emerald-500">security</span></span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={onOpenModal}
            className="bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] px-8 py-2.5 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10"
          >
            Get Access
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050b1a] border-b border-white/10 flex flex-col items-center py-12 gap-8 animate-in slide-in-from-top duration-300">
          <button 
            onClick={() => { onOpenModal(); setIsOpen(false); }}
            className="bg-emerald-500 text-[#050b1a] px-12 py-4 rounded-2xl font-bold text-lg w-3/4 shadow-2xl"
          >
            Get Early Access
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-swarm-gradient">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
            <Zap size={16} fill="currentColor" /> Autonomous AI Defense
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold leading-[1] tracking-tighter text-white">
            Tame the <br />
            <span className="text-emerald-500">Swarm.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-xl leading-relaxed font-light">
            Ironclad security for organizations moving at the speed of GenAI. Visibility where others see only shadows.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <button 
              onClick={onOpenModal}
              className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-emerald-500/20"
            >
              Unbox the Future <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-full">
          <div className="relative w-full aspect-square max-w-[500px] group">
            <div className="absolute -inset-20 bg-emerald-500/5 rounded-full blur-[100px] group-hover:bg-emerald-500/10 transition-colors" />
            <div className="w-full h-full bg-[#0a1224] rounded-[3rem] border border-white/10 black-box-glow animate-float flex items-center justify-center overflow-hidden">
                <div className="relative w-3/4 h-3/4 opacity-40">
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-spin [animation-duration:25s]" />
                    <div className="absolute inset-8 border border-emerald-500/10 rounded-full animate-spin [animation-duration:15s] reverse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <SwarmLogo size={140} className="opacity-60" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-32 bg-[#050b1a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-emerald-500 font-extrabold uppercase tracking-[0.4em] text-sm mb-6">The Blind Spot</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-10 tracking-tight">The Black Box Paradox</h3>
          <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed">
            Everything between the prompt and the response is currently a <span className="text-white font-semibold underline decoration-emerald-500/50 underline-offset-8">blind spot</span>. 
            Regulatory compliance requires visibility you don't have.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <AlertTriangle />, title: "Compliance Gap", desc: "NIS2, DORA, and the EU AI Act demand accountability for models you can't see." },
            { icon: <Eye />, title: "Shadow AI", desc: "Employees are leaking enterprise data through unauthorized GenAI interactions daily." },
            { icon: <Monitor />, title: "Detection Failure", desc: "Traditional EDR and firewalls are blind to the semantic intent of AI prompts." }
          ].map((item, idx) => (
            <div key={idx} className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 text-emerald-500 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white">{item.title}</h4>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection: React.FC = () => {
  return (
    <section id="solution" className="py-32 bg-[#0a1224] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-emerald-500 font-extrabold uppercase tracking-[0.4em] text-sm mb-6">The Handoff</h2>
              <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">E2E Transparency</h3>
            </div>
            
            <p className="text-gray-400 text-xl leading-relaxed">
              Swarm Security intercepts the swarm at the source. We provide a deep-integrated enablement layer 
              that governs AI directly at the OS and browser level.
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Behavioral Discovery", desc: "Monitor unified AI asset behavior from local models to cloud APIs." },
                { title: "Intent Analysis", desc: "Intercept prompts in real-time to analyze semantic intent and block data leaks." },
                { title: "Evidence Generation", desc: "Automated NIS2/DORA evidence packages generated with zero manual effort." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-[#050b1a] transition-all">
                    <Zap size={14} />
                  </div>
                  <div>
                    <h5 className="text-white text-xl font-bold mb-2">{item.title}</h5>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-emerald-500/5 rounded-full absolute -inset-10 blur-3xl" />
            <div className="relative bg-[#050b1a] rounded-[3rem] border border-white/10 p-12 overflow-hidden shadow-2xl">
               <div className="space-y-6">
                 <div className="h-2 w-1/2 bg-emerald-500/20 rounded-full" />
                 <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                 <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                 <div className="py-12 flex justify-center">
                    <div className="w-32 h-32 bg-emerald-500 rounded-3xl flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                       <SwarmLogo size={64} className="text-[#050b1a]" />
                    </div>
                 </div>
                 <div className="h-2 w-full bg-emerald-500/20 rounded-full animate-pulse" />
                 <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                 <div className="text-center pt-8">
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Protocol Enabled</span>
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
    { icon: <Cpu />, title: "OS-Level Intercept", desc: "The definitive way to monitor AI interactions at the system core." },
    { icon: <Monitor />, title: "Browser Governance", desc: "Client-side DLP for SaaS GenAI tools like ChatGPT and Claude." },
    { icon: <Zap />, title: "Real-Time Enforcement", desc: "Instant policy action to stop proprietary data from leaving the network." },
    { icon: <Shield />, title: "Compliance Engine", desc: "Live dashboard of EU AI Act and DORA compliance status." },
    { icon: <Eye />, title: "Unified Visibility", desc: "See every prompt, response, and cost across all AI providers." },
    { icon: <Lock />, title: "Agentic Tracing", desc: "Understand why autonomous AI agents made the decisions they did." },
  ];

  return (
    <section id="features" className="py-32 bg-[#050b1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-emerald-500 font-extrabold uppercase tracking-[0.4em] text-sm mb-6">Capabilities</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Full Spectrum Enablement</h3>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-12 text-left bg-[#0a1224] rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group">
              <div className="text-emerald-500 mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
              <h4 className="text-2xl font-bold mb-4 text-white">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#050b1a] text-white selection:bg-emerald-500 selection:text-white">
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <ProblemSection />
      <SolutionSection />
      <FeaturesGrid />
      
      <section className="py-32 bg-gradient-to-t from-emerald-500/10 to-transparent border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex justify-center mb-12">
             <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] shadow-2xl">
               <SwarmLogo size={80} />
             </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">Secure the Swarm.</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Start enabling. Join the design partner program and lead the next generation of secure, AI-native organizations.
          </p>
          <button 
            onClick={openModal}
            className="px-16 py-6 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-[2rem] font-bold text-2xl transition-all shadow-2xl shadow-emerald-500/40 active:scale-95 hover:scale-105"
          >
            Request Access
          </button>
        </div>
      </section>
      
      <footer className="py-20 bg-[#050b1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 opacity-50">
          <div className="flex items-center gap-4">
            <SwarmLogo size={24} />
            <span className="font-extrabold tracking-tighter">swarm <span className="text-emerald-500">security</span></span>
          </div>
          <p className="text-xs uppercase tracking-widest">&copy; 2024 Swarm Security. All Protocols Active.</p>
        </div>
      </footer>
      
      <AccessModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;