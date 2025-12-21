
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
  Monitor, 
  Globe, 
  Loader2, 
  CheckCircle2,
  Mail,
  Terminal as TerminalIcon,
  Search,
  Activity
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Security Configuration ---
const SMTP_CONFIG = {
  Host: "smtp.gmail.com",
  Username: "info@swarm-security.com",
  Password: "txjctqwiefcabamv" 
};

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

const SimulatorSection: React.FC = () => {
  const [input, setInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runSimulation = async () => {
    if (!input.trim() || isScanning) return;
    setIsScanning(true);
    setResults(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this GenAI prompt from a security perspective: "${input}"`,
        config: {
          systemInstruction: `You are the Swarm Security Intercept Engine. 
          When a user submits a prompt, perform a simulated high-tech "Black Box" unboxing.
          Provide the output in valid JSON format with these fields:
          - riskLevel: (Low/Medium/High/Critical)
          - detectedEntities: (Array of items like 'PII', 'Database Schema', 'Credential Pattern', etc.)
          - intentAnalysis: (A short teasy sentence about what the user is actually trying to do)
          - swarmAction: (A technical action name like 'OS-Layer Intercept', 'Vector Sanitization', etc.)
          - visibilityInsight: (A sentence describing a hidden risk that regular security tools would miss).
          Keep it professional, high-tech, and slightly cryptic/teasing.`,
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults({ error: "Intercept interrupted. System remains secure." });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section className="py-24 bg-[#0a1224] relative overflow-hidden border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4">
            <Activity size={14} className="animate-pulse" /> Live System Demo
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Experience the Visibility</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Test a prompt. See how Swarm unboxes the hidden intent and protects your organization from the inside out.
          </p>
        </div>

        <div className="bg-[#050b1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
          {/* Left: Input */}
          <div className="md:w-1/2 p-8 border-r border-white/5 flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-gray-500">
              <TerminalIcon size={18} />
              <span className="text-xs font-mono uppercase tracking-widest">User Prompt Entry</span>
            </div>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'Extract all customer email addresses for marketing purposes...'"
              className="flex-grow bg-transparent border-none outline-none text-white placeholder-gray-700 font-mono text-sm leading-relaxed resize-none"
            />
            <button 
              onClick={runSimulation}
              disabled={isScanning || !input}
              className="mt-6 w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#050b1a] font-bold rounded-xl transition-all flex items-center justify-center gap-3"
            >
              {isScanning ? <Loader2 className="animate-spin" /> : <Search size={18} />}
              {isScanning ? "Decrypting Intent..." : "Run Intercept Scan"}
            </button>
          </div>

          {/* Right: Output */}
          <div className="md:w-1/2 p-8 bg-[#0c0c11] relative">
            <div className="flex items-center gap-2 mb-6 text-emerald-500/50">
              <Activity size={18} />
              <span className="text-xs font-mono uppercase tracking-widest">Swarm Visibility Layer</span>
            </div>

            {isScanning && (
              <div className="absolute inset-0 z-20 bg-[#0c0c11]/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <span className="text-emerald-500 font-mono text-xs animate-pulse">UNBOXING BLACK BOX...</span>
              </div>
            )}

            {!results && !isScanning && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                <Shield size={64} className="mb-4" />
                <p className="text-sm">Awaiting intercept target.</p>
              </div>
            )}

            {results && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase font-mono">Risk Level</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    results.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    results.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {results.riskLevel || 'Analyzed'}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-mono mb-2 block tracking-wider">Intercept Analysis</label>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm text-gray-300 leading-relaxed italic">
                    "{results.intentAnalysis}"
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-mono mb-2 block tracking-wider">Detected Patterns</label>
                    <div className="flex flex-wrap gap-1">
                      {results.detectedEntities?.map((e: string, i: number) => (
                        <span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/10">{e}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-mono mb-2 block tracking-wider">Swarm Action</label>
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/5 px-2 py-1 rounded block border border-blue-500/10">
                      {results.swarmAction}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <label className="text-[10px] text-emerald-500 uppercase font-mono mb-2 block tracking-widest">Visibility Insight (Unboxed)</label>
                  <p className="text-xs text-emerald-400/80 leading-relaxed font-mono">
                    <span className="text-emerald-500 mr-2">>>></span> {results.visibilityInsight}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

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
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'blocked'>('idle');

  useEffect(() => {
    if (isOpen && !(window as any).Email) {
      const script = document.createElement('script');
      script.src = `https://smtpjs.com/v3/smtp.js?t=${Date.now()}`;
      script.async = true;
      script.onerror = () => setStatus('blocked');
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const getManualMailto = () => {
    const subject = encodeURIComponent(`Early Access Request: ${formData.company} - ${formData.firstName}`);
    const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}
Job Title: ${formData.jobTitle}
Country: ${formData.country}
Referral: ${formData.referral}
    `.trim());
    return `mailto:roy@swarm-security.com,guy@swarm-security.com?subject=${subject}&body=${body}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          <p><strong>Marketing Opt-in:</strong> ${formData.agreed ? 'Yes' : 'No'}</p>
        </div>
      `;

      let emailClient = (window as any).Email;
      let retries = 0;
      
      while (!emailClient && retries < 15) {
        await new Promise(r => setTimeout(r, 200));
        emailClient = (window as any).Email;
        retries++;
      }
      
      if (!emailClient) {
        setStatus('blocked');
        return;
      }

      const result = await emailClient.send({
        Host: SMTP_CONFIG.Host,
        Username: SMTP_CONFIG.Username,
        Password: SMTP_CONFIG.Password,
        To: "roy@swarm-security.com, guy@swarm-security.com",
        From: SMTP_CONFIG.Username,
        Subject: `Early Access Request: ${formData.company} - ${formData.firstName}`,
        Body: emailBody
      });

      if (result === 'OK' || result === 'ok') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err: any) {
      setStatus('blocked');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#0c0c11] w-full max-w-xl rounded-2xl border border-white/5 shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 text-white min-h-[500px] flex flex-col">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-20">
          <X size={24} />
        </button>

        <div className="p-8 md:p-10 flex-grow relative z-10 flex flex-col justify-center">
          {status === 'success' ? (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 py-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Request Received</h3>
              <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.firstName}</span>. Our team has been notified.
              </p>
              <button onClick={onClose} className="mt-10 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all">
                Close Window
              </button>
            </div>
          ) : status === 'blocked' ? (
            <div className="text-center py-10">
              <AlertTriangle size={40} className="text-amber-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Browser Block Detected</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Please use the direct link below to send your request.
              </p>
              <a href={getManualMailto()} className="inline-flex items-center gap-3 bg-white text-[#050b1a] px-10 py-4 rounded-xl font-bold text-lg">
                <Mail size={20} /> Send Request Manually
              </a>
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
              </div>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First name" required value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#14141d] border border-white/5 rounded-xl text-sm outline-none text-white" />
                  <input type="text" name="lastName" placeholder="Last name" required value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#14141d] border border-white/5 rounded-xl text-sm outline-none text-white" />
                </div>
                <input type="email" name="email" placeholder="Email address" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#14141d] border border-white/5 rounded-xl text-sm outline-none text-white" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="company" placeholder="Company name" required value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#14141d] border border-white/5 rounded-xl text-sm outline-none text-white" />
                  <input type="text" name="jobTitle" placeholder="Job title" required value={formData.jobTitle} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#14141d] border border-white/5 rounded-xl text-sm outline-none text-white" />
                </div>
                <button type="submit" disabled={status === 'sending'} className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] py-4 rounded-xl font-bold text-base transition-all">
                  {status === 'sending' ? <Loader2 className="animate-spin mx-auto" /> : "Contact Now"}
                </button>
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
        <button onClick={onOpenModal} className="bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] px-6 py-2 rounded-full font-bold text-sm transition-all hover:scale-105">Get Access</button>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-swarm-gradient">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <Zap size={14} /> The Future of AI Governance
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">Tame the Swarm. <br /><span className="text-emerald-500">Secure the Enterprise.</span></h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">Stop guessing how GenAI is used. Swarm Security provides holistic enablement, E2E visibility, and ironclad security.</p>
        <button onClick={onOpenModal} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-xl font-bold text-lg flex items-center gap-2 group transition-all">
          Unbox the Future <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="relative flex justify-center items-center h-full">
        <div className="relative w-72 h-72 md:w-96 md:h-96 group">
          <div className="w-full h-full bg-[#0a1224] rounded-2xl border border-white/10 animate-float flex items-center justify-center overflow-hidden black-box-glow">
            <SwarmLogo size={120} className="opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      
      {/* Problem Section */}
      <section className="py-24 bg-[#050b1a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-emerald-500 font-extrabold uppercase tracking-[0.2em] text-4xl mb-8">The Challenge</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything between the prompt and the response is currently a <span className="text-white font-semibold">Black Box</span>. 
          </p>
        </div>
      </section>

      {/* Simulator Demo */}
      <SimulatorSection />

      {/* Footer-like CTA */}
      <section className="py-24 bg-gradient-to-t from-emerald-500/10 to-transparent border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Enable Your AI Potential</h2>
          <button onClick={() => setIsModalOpen(true)} className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-[#050b1a] rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-emerald-500/30">Request Early Access</button>
        </div>
      </section>

      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
