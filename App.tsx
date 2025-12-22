
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
  CheckCircle2,
  Mail,
  Copy,
  ExternalLink
} from 'lucide-react';

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

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const getManualMailto = () => {
    const subject = encodeURIComponent(`Early Access Request: ${formData.company} - ${formData.firstName}`);
    const body = encodeURIComponent(`
REQUEST DETAILS
---------------
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}
Job Title: ${formData.jobTitle || 'N/A'}
Country: ${formData.country}
Referral: ${formData.referral || 'N/A'}

Sent from Swarm Security Portal
    `.trim());
    return `mailto:${CONTACT_EMAILS}?subject=${subject}&body=${body}`;
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
      let emailClient = (window as any).Email;
      
      if (!emailClient) {
        // Last ditch attempt to load it
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = "https://smtpjs.com/v3/smtp.js";
          script.onload = resolve;
          script.onerror = resolve;
          document.head.appendChild(script);
        });
        emailClient = (window as any).Email;
      }
      
      if (!emailClient) {
        // Intentionally switch to blocked state rather than throwing generic error
        setStatus('blocked');
        return;
      }

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
          <p><strong>Marketing Opt-in:</strong> ${formData.agreed ? 'Yes' : 'No'}</p>
        </div>
      `;

      const result = await emailClient.send({
        Host: SMTP_CONFIG.Host,
        Username: SMTP_CONFIG.Username,
        Password: SMTP_CONFIG.Password,
        To: CONTACT_EMAILS,
        From: SMTP_CONFIG.Username,
        Subject: `Early Access Request: ${formData.company} - ${formData.firstName}`,
        Body: emailBody
      });

      if (result === 'OK' || result === 'ok') {
        setStatus('success');
      } else {
        throw new Error(result);
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus('error');
    }
  };

  const isSubmitDisabled = status === 'sending' || !formData.agreed;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative bg-[#0c0c11] w-full max-w-xl rounded-2xl border border-white/5 shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 text-white min-h-[500px] flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/10 blur-[60px] pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10 flex-grow relative z-10 flex flex-col justify-center">
          {status === 'success' ? (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 py-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center animate-checkmark">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Request Received</h3>
              <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.firstName}</span>. Our team has been notified and we'll be in touch shortly.
              </p>
              <button 
                onClick={onClose}
                className="mt-10 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all"
              >
                Close Window
              </button>
            </div>
          ) : status === 'blocked' ? (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
                  <Shield className="text-amber-500" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Security Protocol Active</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                An automated script blocker was detected. No problem—please use your local email app to finalize your request. We've pre-filled everything for you.
              </p>
              
              <div className="space-y-3">
                <a 
                  href={getManualMailto()}
                  className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] py-4 rounded-xl font-bold text-base transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98]"
                >
                  <Mail size={20} /> Complete via Email App
                </a>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleCopyEmail}
                    className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold transition-all"
                  >
                    {copyFeedback ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {copyFeedback ? "Copied!" : "Copy Address"}
                  </button>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold transition-all"
                  >
                    <X size={14} /> Back to Form
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-5">
                   <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                     <SwarmLogo size={48} />
                   </div>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Secure Early Access</h3>
                <p className="text-sm text-gray-400 mt-2">Join the elite organizations securing their GenAI future.</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Fields marked with <RequiredStar /> are mandatory</p>
              </div>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="First name" 
                      required
                      disabled={status === 'sending'}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 rounded-xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                    />
                    <div className="absolute right-3 top-3 pointer-events-none"><RequiredStar /></div>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="Last name" 
                      required
                      disabled={status === 'sending'}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 rounded-xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                    />
                    <div className="absolute right-3 top-3 pointer-events-none"><RequiredStar /></div>
                  </div>
                </div>

                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email address" 
                    required
                    disabled={status === 'sending'}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 rounded-xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                  />
                  <div className="absolute right-3 top-3 pointer-events-none"><RequiredStar /></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="company"
                      placeholder="Company name" 
                      required
                      disabled={status === 'sending'}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 rounded-xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                    />
                    <div className="absolute right-3 top-3 pointer-events-none"><RequiredStar /></div>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="jobTitle"
                      placeholder="Job title (Optional)" 
                      disabled={status === 'sending'}
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 rounded-xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="relative">
                  <select 
                    name="country"
                    required
                    disabled={status === 'sending'}
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 rounded-xl text-sm outline-none transition-all appearance-none text-gray-400 disabled:opacity-50"
                  >
                    <option value="">Country...</option>
                    <option value="US">United States</option>
                    <option value="IL">Israel</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="CA">Canada</option>
                    <option value="SG">Singapore</option>
                  </select>
                  <div className="absolute right-8 top-3 pointer-events-none"><RequiredStar /></div>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-600 pointer-events-none" size={16} />
                </div>

                <input 
                  type="text" 
                  name="referral"
                  placeholder="How did you hear about Swarm? (Optional)" 
                  disabled={status === 'sending'}
                  value={formData.referral}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#14141d] border border-white/5 focus:border-emerald-500/50 rounded-xl text-sm outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
                />

                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="agreed"
                      required
                      disabled={status === 'sending'}
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      className="mt-1 accent-emerald-500 h-4 w-4 rounded border-white/10 bg-[#14141d]" 
                    />
                    <span className="text-[12px] text-gray-400 group-hover:text-gray-300 transition-colors">
                      I agree to receive communications from Swarm Security. <RequiredStar />
                    </span>
                  </label>
                </div>

                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-red-400 text-[10px] leading-tight">
                      A network error occurred. Please try sending via your email app instead.
                    </p>
                    <button 
                      type="button"
                      onClick={() => setStatus('blocked')}
                      className="text-xs text-white font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                    >
                      Use Email App Fallback
                    </button>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitDisabled}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-all shadow-xl mt-4 active:scale-[0.98] flex items-center justify-center gap-3 
                    ${isSubmitDisabled 
                      ? 'bg-emerald-500/20 text-emerald-500/40 cursor-not-allowed shadow-none border border-emerald-500/10' 
                      : 'bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] shadow-emerald-500/10'
                    }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Negotiating Access...
                    </>
                  ) : (
                    "Contact Now"
                  )}
                </button>
                {!formData.agreed && status === 'idle' && (
                  <p className="text-[10px] text-gray-600 text-center italic">
                    Please agree to the communications check to continue.
                  </p>
                )}
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050b1a]/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SwarmLogo size={36} />
          <span className="text-xl font-extrabold tracking-tighter text-white">swarm <span className="text-emerald-500">security</span></span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={onOpenModal}
            className="bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] px-6 py-2 rounded-full font-bold text-sm transition-all hover:scale-105"
          >
            Get Access
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050b1a] border-b border-white/5 flex flex-col items-center py-10 gap-6 animate-in slide-in-from-top duration-300">
          <button 
            onClick={() => { onOpenModal(); setIsOpen(false); }}
            className="bg-emerald-500 text-[#050b1a] px-8 py-3 rounded-full font-bold text-sm"
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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-swarm-gradient">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Zap size={14} /> The Future of AI Governance
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
            Tame the Swarm. <br />
            <span className="text-emerald-500">Secure the Enterprise.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
            Stop guessing how GenAI is used. Swarm Security provides holistic enablement, 
            E2E visibility, and ironclad security for organizations moving at the speed of AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onOpenModal}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
            >
              Unbox the Future <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-full">
          <div className="relative w-72 h-72 md:w-96 md:h-96 group">
            <div className="absolute -inset-20 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="w-full h-full bg-[#0a1224] rounded-2xl border border-white/10 black-box-glow animate-float flex items-center justify-center overflow-hidden">
                <div className="relative w-3/4 h-3/4 opacity-40">
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-spin [animation-duration:15s]" />
                    <div className="absolute inset-4 border border-emerald-500/10 rounded-full animate-spin [animation-duration:10s] reverse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <SwarmLogo size={120} className="opacity-60" />
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
    <section id="problem" className="py-24 bg-[#050b1a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-emerald-500 font-extrabold uppercase tracking-[0.2em] text-4xl md:text-5xl mb-8">The Challenge</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything between the prompt and the response is currently a <span className="text-white font-semibold">Black Box</span>. 
            No visibility, no control, yet it's part of the compliance space.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle className="text-emerald-500" />
            </div>
            <h4 className="text-xl font-bold mb-4">Compliance Blind Spot</h4>
          </div>

          <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="text-blue-500" />
            </div>
            <h4 className="text-xl font-bold mb-4">Operational Invisibility</h4>
          </div>

          <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Monitor className="text-purple-500" />
            </div>
            <h4 className="text-xl font-bold mb-4">The "Outside-In" Fallacy</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection: React.FC = () => {
  return (
    <section id="solution" className="py-24 bg-[#0a1224] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050b1a] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-emerald-500 font-extrabold uppercase tracking-[0.2em] text-4xl md:text-5xl mb-8">The Solution</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-400">Unboxing the Black Box</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Swarm Security isn't just another firewall. We provide a deep-integrated enablement layer 
              that intercepts, monitors, and enforces policies directly where AI lives—from 
              bare metal to the browser.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Bare Metal to Cloud Discovery", desc: "Unified AI asset behavior monitoring across all levels of infrastructure." },
                { title: "Prompt Analysis & Policy Enforcement", desc: "Real-time inspection of intent and granular access controls." },
                { title: "Automated Data Gathering", desc: "Instant compliance reports (NIS2/DORA/EU AI Act) with full evidence packages." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Zap className="text-emerald-500 w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1">{item.title}</h5>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative group p-4">
              <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative w-full max-w-[480px] animate-float">
                <div className="relative flex items-center justify-center rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#050b1a]/50 backdrop-blur-sm">
                   <div className="p-20 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
                      <div className="relative">
                        <div className="w-48 h-48 bg-[#0a1224] border-2 border-white/10 rounded-xl transform rotate-12 flex items-center justify-center shadow-2xl overflow-hidden group-hover:rotate-0 transition-transform duration-700">
                          <div className="w-full h-2 bg-emerald-500 absolute top-0 rounded-t-lg opacity-20"></div>
                          <SwarmLogo size={80} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="absolute -inset-4 border border-emerald-500/20 rounded-full animate-ping [animation-duration:3s]"></div>
                      </div>
                      <h4 className="text-white font-bold tracking-widest text-xs uppercase opacity-60">Decryption Layer Active</h4>
                   </div>
                </div>
                
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 z-20 pointer-events-none">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_60px_#10b98144]">
                     <SwarmLogo size={100} className="opacity-80" />
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
    { icon: <Cpu />, title: "OS-Level Intercept", desc: "The undeniable foundation for monitoring AI interactions at the system core." },
    { icon: <Monitor />, title: "Browser Enforcement", desc: "DLP and policy control for SaaS and web-based GenAI tools." },
    { icon: <Zap />, title: "Real-Time Enforcement", desc: "Instant actionability to stop data leaks before they reach target systems." },
    { icon: <Shield />, title: "Compliance Certainty", desc: "Automated gathering of incident evidence for regulatory submission." },
    { icon: <Eye />, title: "Unified Visibility", desc: "A single pane of glass for all AI assets, from APIs to on-premise models." },
    { icon: <Lock />, title: "Agent Vector Trace", desc: "Trace the lineage of every autonomous decision made by your AI agents." },
  ];

  return (
    <section id="features" className="py-24 bg-[#050b1a]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="text-center mb-16">
          <h2 className="text-emerald-500 font-extrabold uppercase tracking-[0.2em] text-4xl md:text-5xl mb-8">Key Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-400">Holistic Enablement</h3>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 text-left bg-[#0a1224] rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group">
              <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-[#050b1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SwarmLogo size={32} />
              <span className="text-xl font-extrabold tracking-tighter text-white">swarm <span className="text-emerald-500">security</span></span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Securely enabling the next generation of AI-native organizations with E2E visibility and security.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <ProblemSection />
      <SolutionSection />
      <FeaturesGrid />
      
      <section className="py-24 bg-gradient-to-t from-emerald-500/10 to-transparent border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex justify-center mb-10">
             <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
               <SwarmLogo size={64} />
             </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Enable Your AI Potential</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Stop guessing how GenAI is used. Join the waitlist for design partners. Be the first to unbox the future of AI governance.
          </p>
          <button 
            onClick={openModal}
            className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-emerald-500/30 active:scale-95"
          >
            Request Early Access
          </button>
        </div>
      </section>
      
      <Footer />
      
      <AccessModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
