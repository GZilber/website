import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  Loader2, 
  CheckCircle2,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Cpu,
  Network,
  ClipboardList,
  Fingerprint,
  Globe,
  Settings,
  Database,
  Monitor,
  Share2,
  Lock,
  FileSearch,
  User,
  Box
} from 'lucide-react';

/**
 * BRAND ASSETS
 */
const SWARM_LOGO_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAEaCAYAAACM8OstAAAQAElEQVR4AexdB0AVx9Y+W27n0ruoqNgQKypiRUEUOyr23kss6T0x1VSTaCyxxd6wNxRRsSCiYkHFhoqKSK+33y3/GUzen5dnoyWWXfbc3Z2d+s3MN+fM7C40SJuEgISAhMArgoBEeK9IRUvFlBCQEACQCE9qBRICEgKvDAIS4ZWiqiWvEgISAi82AhLhvdj1J+VeQkBCoBQISIRXCrAkrxICEgIvNgIS4b3Y9ff85l7KmYTAc4iARHjPYaVIWZIQkBCoHAQkwqscXKVYJQQkBJ5DBCTCew4rRcrSq4aAVN5/CgGJ8P4ppKV0JAQkBP51BCTC+9erQMqAhICEwD+FgER4/xTSUjoSAhICFYFAueKQCK9c8EmBJQQkBF4kBCTCe5FqS8qrhICEQLkQkAivXPBJgSUEJAReJAReNcJ7kepGyquEgIRABSMgEV4FAypFJyEgIfD8IiAR3vNbN1LOJAQkBCoYAYnwKhjQlyk6qSwSAi8bAhLhvWw1KpVHQkBC4LEISIT3WGikGxICEgIvGwIS4b1sNSV/Fx8p";
const BLACKBOX_IMAGE_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJ0lEQVR4nO2dS0hUURjHf+fOODmOlj6IIDCI7E0XvSAtpE0S9VpE0CIX7YIWRYvYInrQKmqlm0S0ChK6SIsitIuonmAtpE8IIX3UvI6O49ybe06LIDRHzp07d879f+ByuXDO+f8fM/fcc+85I0REJCKK7A6I/A8mIskwEUmGiUgyTESSEVvXfHByG8v9L+S9G0K90Y0x90m889/IrVvEunKEx9vI7XvP/PZTPK9HULXNmLpW3N7P6FrrN96X87BfDCHOfBvj09X9v3Uv9/pY6vYItrYNo7YNo7YNi7c9RPrW9+S/fEButvdfI1q7f4V860v6Lp/EvPwS6fHh8XWyVO+vkm99S+fFc7ReOIvR0pG7n7K74f9mEunL8m78O/VfPo77f989f0v8YfH8E8qD91AOfNAtG0Y8/wSltf85pS9P6u6L8uA90qff6N0YpB49p397iN7NwfTrEOnbY+YvnyLXWf99iE67u+p9L69G78YgffI1Yv0D8zI+mInIMkxEkmEikgwTkWSYiCTDRCSZpMaI7Asr6M44Yv0D+ncM6P0Y9A8N07sxSJ87S+3mIPXoeerRc9Sj5/RvD+nfHtLnzv7f7xXv8jlyvYfS7/W97507R66zPvc4pW/6fKdv+nyf79yZe/z8L6vV3Bf5u8937Yv08Sny998Tf1hXvU/l2hfp+yOm777Iv36P6c/fMe78C6P+/i3y1x7z795j3H+McfevGPf8HeXhL5SOf1A69Unp9Cfmz8yfmD/f6TM6/Rmlnz6mXz+nfvmYeumD+uUTM9c+6fOnf7N89sYIbe0mN9v7rxGt7ZunL8u78S6fI9dZn3uc0jd9vtd37su9vvd97/Pz87+sVnNf9O843/V9vj9/i/TJKfL33xI/WFe9T+XaF+n7I6bvxsi/fo/pz98x7vwLo/7+LfLXHvPv3mPcf4xx968Y9/wd5eEvlI5/UDr1Sen0J+bPzJ+Y9yMiIn8BJ6eYCq0V/EAAAAASUVORK5CYII=";

type Page = 'home' | 'platform' | 'solutions';

const SwarmLogo: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = "" }) => (
  <div 
    className={`flex-none ${className}`}
    style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}
  >
    <img src={SWARM_LOGO_B64} alt="Swarm" className="w-full h-full object-contain block" draggable={false} />
  </div>
);

/**
 * ANIMATED ASSET GRAPH VISUAL
 * Corrected connectivity: Center node logically branches to corner nodes via a rectilinear path.
 * Smaller and more compact as requested.
 */
const AssetGraphVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[280px] flex items-center justify-center p-4 bg-black/40 rounded-[1.5rem] border border-white/5 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 600 280">
        <defs>
          <filter id="mazeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Connection Paths: Hub is at (300, 140) */}
        {[
          // Center horizontal spine connecting left/right brackets
          { d: "M 240 140 H 360" },
          // Left bracket vertical
          { d: "M 240 100 V 180" },
          // Right bracket vertical
          { d: "M 360 100 V 180" },
          // Connections to peripheral nodes
          { d: "M 240 100 H 140 V 80" }, // To Top Left
          { d: "M 360 100 H 460 V 80" }, // To Top Right
          { d: "M 240 180 H 140 V 200" }, // To Bottom Left
          { d: "M 360 180 H 460 V 200" }, // To Bottom Right
          // Decorative maze accents
          { d: "M 140 80 H 100" },
          { d: "M 460 80 H 500" },
          { d: "M 140 200 H 100" },
          { d: "M 460 200 H 500" }
        ].map((path, i) => (
          <React.Fragment key={i}>
            <path 
              d={path.d} 
              fill="none" 
              stroke="rgba(16, 185, 129, 0.1)" 
              strokeWidth="2" 
            />
            <path 
              d={path.d} 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              strokeDasharray="10 30"
              filter="url(#mazeGlow)"
              className="animate-[graphDash_10s_infinite_linear]"
            />
          </React.Fragment>
        ))}
      </svg>

      <div className="relative z-10 w-full h-full">
        {/* Hub */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-8 h-8 bg-swarm-emerald rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20 border border-white/20 animate-pulse" />
        </div>

        {/* Peripheral Nodes at (140, 80), (460, 80), (140, 200), (460, 200) */}
        <div className="absolute top-[28.5%] left-[23.3%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 border-white/10"><User size={16} /></div>
        </div>
        <div className="absolute top-[28.5%] left-[76.6%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 border-white/10"><Database size={16} /></div>
        </div>
        <div className="absolute top-[71.4%] left-[23.3%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 border-white/10"><Box size={16} /></div>
        </div>
        <div className="absolute top-[71.4%] left-[76.6%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 border-white/10"><Globe size={16} /></div>
        </div>
      </div>

      <style>{`
        @keyframes graphDash {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

const InquiryService = {
  submit: async function (data: { firstName: string; lastName: string; email: string; company: string }): Promise<boolean> {
    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: `Demo Request from ${data.company}. Focus: Swarm Security Infrastructure.`
      };
      const response = await fetch('https://send-email.guy-b12.workers.dev', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return response.ok;
    } catch (err) {
      console.error("Submission failed:", err);
      return false;
    }
  }
};

/**
 * SHARED COMPONENTS
 */
const NavItem: React.FC<{ label: string; active?: boolean; onClick?: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-medium transition-all ${active ? 'text-swarm-emerald' : 'text-slate-400 hover:text-white'}`}
  >
    {label}
  </button>
);

const Footer: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => (
  <footer className="bg-swarm-dark border-t border-white/5 pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <SwarmLogo size={36} />
            <span className="text-xl font-bold tracking-tight">Swarm <span className="text-swarm-emerald">Security</span></span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-sm font-medium">
            High-performance AI visibility and governance. Built for organizations moving from experimental GenAI to secure, production-grade AI systems.
          </p>
        </div>
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-white uppercase tracking-wider">Features</h5>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('platform')}>Asset Inventory</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('platform')}>Asset Graph</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('platform')}>Policies</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('platform')}>Audit Log</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h5>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('home')}>Home</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('solutions')}>Solutions</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs text-slate-500">
          © 2024 Swarm Security Systems, Inc. Secure Sovereignty.
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-swarm-emerald animate-pulse" /> Operational Status: Stable</span>
        </div>
      </div>
    </div>
  </footer>
);

/**
 * HOME VIEW
 */
const HomePage: React.FC<{ onOpenModal: () => void, onNavigate: (p: Page) => void }> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-mesh">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swarm-emerald/10 border border-swarm-emerald/20 text-swarm-emerald text-xs font-bold uppercase tracking-widest">
              AI Security Infrastructure
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
              Visibility for the <br /><span className="text-swarm-emerald">Agentic Era.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl font-medium leading-relaxed">
              GenAI is a visibility vacuum. Swarm provides the high-performance proxy and discovery tools needed to unbox the black box and secure your AI stack.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                onClick={onOpenModal} 
                className="w-full sm:w-auto px-10 py-4 bg-swarm-emerald text-swarm-dark rounded-xl font-bold text-sm hover:bg-white transition-all shadow-lg active:scale-95"
              >
                Book a Demo
              </button>
              <button 
                onClick={() => handleNavigateToSection('black-box-narrative')}
                className="w-full sm:w-auto px-10 py-4 glass text-white rounded-xl font-bold text-sm hover:bg-white/5 transition-all"
              >
                See the Impact
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-swarm-emerald/5 blur-[140px] rounded-full" />
            <div className="relative w-full max-w-md aspect-square glass rounded-[3rem] p-12 border-white/10 flex items-center justify-center shadow-2xl animate-in zoom-in duration-1000">
              <img 
                src={BLACKBOX_IMAGE_B64} 
                alt="AI Black Box" 
                className="w-full h-full object-contain opacity-80 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Black Box Narrative - EXPOSING THE BLACK BOX */}
      <section id="black-box-narrative" className="py-32 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
           <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-swarm-emerald/5 blur-[100px] rounded-full" />
              <div className="relative glass p-10 rounded-[3rem] border-white/5 overflow-hidden flex items-center justify-center aspect-square shadow-2xl">
                 <img 
                  src={BLACKBOX_IMAGE_B64} 
                  alt="The AI Black Box Unboxed" 
                  className="w-3/4 h-3/4 object-contain opacity-90 drop-shadow-[0_0_80px_rgba(16,185,129,0.25)]"
                />
              </div>
           </div>
           <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Unbox the <span className="text-swarm-emerald italic">Black Box.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                Modern AI operations often exist in a visibility vacuum. Organizations lose sight of how data flows, what users access, and how agents behave. Swarm provides literal visibility into every token, exposing the black box for complete governance.
              </p>
              <div className="space-y-6">
                 {[
                   { title: "Shadow AI Shield", desc: "Instantly discover every unauthorized AI tool and endpoint used within your network." },
                   { title: "Governance Controls", desc: "Fine-grained behavioral constraints for autonomous agent workflows." },
                   { title: "Enterprise Sovereignty", desc: "Maintain absolute ownership of your interaction data and intellectual property." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-5 items-start">
                      <div className="w-10 h-10 rounded-xl bg-swarm-emerald/10 flex-none flex items-center justify-center text-swarm-emerald">
                         <ShieldCheck size={20} />
                      </div>
                      <div className="space-y-1">
                         <h4 className="font-bold text-white">{item.title}</h4>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* INSPECTION STREAM SECTION */}
      <section id="inspection-stream" className="py-32 relative bg-black/20 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swarm-emerald/10 border border-swarm-emerald/20 text-swarm-emerald text-xs font-bold uppercase tracking-widest">
                Real-Time Monitoring
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
                Inspection <span className="text-swarm-emerald">at the Edge.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                Our high-performance proxy performs deep semantic analysis on every stream. Detect prompt injections, redact PII, and enforce safety policies with sub-10ms latency.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">8.4ms</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Avg Latency</div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Stream Capture</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-swarm-emerald/5 blur-[100px] rounded-full" />
              <div className="relative glass p-10 rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl">
                 <div className="space-y-6 relative z-10">
                    <div className="h-1 bg-swarm-emerald/20 rounded-full overflow-hidden">
                       <div className="h-full bg-swarm-emerald w-1/3 animate-[loading_3s_infinite_linear]" />
                    </div>
                    <div className="flex justify-between items-center font-mono text-xs text-slate-500">
                       <span>INSPECTING_STREAM...</span>
                       <span className="text-swarm-emerald font-black">ACTIVE</span>
                    </div>
                    <div className="p-4 bg-black/60 rounded-xl border border-white/5 font-mono text-xs text-slate-300 leading-relaxed">
                       <span className="text-slate-600">INPUT_PROMPT:</span> "Extract quarterly revenue numbers for client X..." <br />
                       <span className="text-swarm-emerald">ACTION: REDACTED_REVENUE_SOURCE_ENFORCED</span> <br />
                       <span className="text-slate-600">RESPONSE_SANITY:</span> <span className="text-swarm-emerald font-bold">PASSED</span>
                    </div>
                    <div className="p-4 glass rounded-xl border-white/5 space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                          <span>Security Checksums</span>
                          <CheckCircle2 size={12} className="text-swarm-emerald" />
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-swarm-emerald w-full animate-pulse" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Preview */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">The Security Stack for AI</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">Four integrated pillars designed to give you total command over your GenAI environment.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Database />, title: "Asset Inventory", desc: "Continuous discovery of all AI assets, users, and applications across your cloud and on-prem network." },
              { icon: <Network />, title: "Asset Graph", desc: "Interactive visualization of relationships between data sources, agents, and identities." },
              { icon: <Settings />, title: "Policies", desc: "Dynamic, semantic-aware rules for real-time redaction, filtering, and behavior control." },
              { icon: <ClipboardList />, title: "Audit Log", desc: "Immutable, enterprise-wide trail of every semantic interaction for forensics and GRC." }
            ].map((f, i) => (
              <div key={i} className="glass p-10 rounded-[2rem] card-hover space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-swarm-emerald/10 flex items-center justify-center text-swarm-emerald shadow-sm">{f.icon}</div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Deploy Sovereignty.</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Establish a robust governance framework for your AI operations today. Deployment takes minutes, protection lasts forever.</p>
          <div className="pt-6">
             <button onClick={onOpenModal} className="px-14 py-6 bg-white text-swarm-dark rounded-2xl font-bold text-sm shadow-2xl hover:bg-swarm-emerald transition-all active:scale-95">Book Your Demo</button>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * PLATFORM VIEW
 */
const PlatformPage: React.FC = () => (
  <div className="pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mb-24 space-y-6">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-xs font-bold uppercase tracking-widest">Platform Deep Dive</div>
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">The Governance <br />Infrastructure.</h2>
        <p className="text-xl text-slate-400 font-medium">Built on a sub-10ms high-performance proxy layer for seamless security.</p>
      </div>

      <div className="space-y-24 mb-40">
        <div id="asset-inventory" className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-swarm-emerald/10 rounded-xl text-swarm-emerald"><Database size={32} /></div>
                 <h3 className="text-3xl font-bold">Asset Inventory</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Automated discovery is the foundation of AI security. Swarm continuously scans your environment to index every LLM endpoint, wrapper application, and connected data source.</p>
              <ul className="space-y-4 text-slate-200 font-medium">
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Discovery of internal and third-party LLM providers</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Identity-linked asset mapping for user behavior tracking</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Real-time status and health monitoring for AI nodes</li>
              </ul>
           </div>
           <div className="glass p-12 rounded-[3rem] border-white/5 flex items-center justify-center bg-black/40 shadow-2xl">
              <div className="w-full space-y-4 font-mono text-xs">
                 <div className="flex justify-between border-b border-white/5 pb-2 text-slate-500"><span>ASSET_ID</span><span>TYPE</span><span>RISK</span></div>
                 <div className="flex justify-between py-1"><span className="text-white">internal-dev-llama-3</span><span>LOCAL_LLM</span><span className="text-swarm-emerald font-bold">LOW</span></div>
                 <div className="flex justify-between py-1"><span className="text-white">marketing-openai-v4</span><span>WRAPPER_APP</span><span className="text-amber-500 font-bold">MEDIUM</span></div>
                 <div className="flex justify-between py-1"><span className="text-white">unknown-extension-api</span><span>SHADOW_AI</span><span className="text-rose-500 font-black">CRITICAL</span></div>
              </div>
           </div>
        </div>

        {/* Asset Graph: Re-aligned to match the "Audit Log" pattern (Visual Left, Text Right) */}
        <div id="asset-graph" className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="lg:order-2 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-swarm-emerald/10 rounded-xl text-swarm-emerald"><Network size={32} /></div>
                 <h3 className="text-3xl font-bold">Asset Graph</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Visibility isn't just about assets; it's about relationships. Swarm builds a semantic maze-like graph where nodes are physically connected to show exactly how data flows between identities and intelligence layers.</p>
              <ul className="space-y-4 text-slate-200 font-medium">
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Map complex agent orchestrations</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Detect unauthorized exfiltration paths</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Real-time graph-based risk scoring</li>
              </ul>
           </div>
           <div className="lg:order-1 glass rounded-[3rem] border-white/5 overflow-hidden shadow-2xl">
              <AssetGraphVisual />
           </div>
        </div>

        <div id="policies" className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-swarm-emerald/10 rounded-xl text-swarm-emerald"><Settings size={32} /></div>
                 <h3 className="text-3xl font-bold">Policies</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Enforce granular control at the semantic level. Swarm's policy engine allows you to define exactly what tokens are permitted, redacted, or blocked.</p>
              <ul className="space-y-4 text-slate-200 font-medium">
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Dynamic PII and secret redaction for all prompt streams</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Behavioral constraints for autonomous agent workflows</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Intent-based sentiment and safety filtering</li>
              </ul>
           </div>
           <div className="glass p-12 rounded-[3rem] border-white/5 bg-black/40 shadow-2xl">
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500"><span>Policy_Name</span><span>Status</span></div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-medium text-sm text-white">
                       <Lock className="text-swarm-emerald" size={16} /> Global_PII_Scrub
                    </div>
                    <div className="px-2 py-0.5 rounded bg-swarm-emerald/20 text-swarm-emerald text-[10px] font-black uppercase">Enforced</div>
                 </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-medium text-sm text-white">
                       <Share2 className="text-swarm-emerald" size={16} /> Finance_Policy_Strict
                    </div>
                    <div className="px-2 py-0.5 rounded bg-swarm-emerald/20 text-swarm-emerald text-[10px] font-black uppercase">Enforced</div>
                 </div>
              </div>
           </div>
        </div>

        <div id="audit-log" className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="lg:order-2 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-swarm-emerald/10 rounded-xl text-swarm-emerald"><ClipboardList size={32} /></div>
                 <h3 className="text-3xl font-bold">Audit Log</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Complete, immutable records for GRC and incident response. Swarm logs interactions without compromising sensitive data privacy.</p>
              <ul className="space-y-4 text-slate-200 font-medium">
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Full semantic session replay (minus redacted tokens)</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> HIPAA, SOC2, and GDPR compliant audit trails</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-swarm-emerald" size={20} /> Real-time alerting for high-risk interaction anomalies</li>
              </ul>
           </div>
           <div className="lg:order-1 glass p-10 rounded-[3rem] border-white/5 bg-black/40 h-64 overflow-hidden flex flex-col justify-end shadow-2xl">
              <div className="space-y-3 font-mono text-[10px] text-slate-400">
                 <div>[2024-05-12 14:02:11] USER_ID:42 -> APP:INTERNAL_GENAI -> TOKEN_EVENT:CLEAN</div>
                 <div>[2024-05-12 14:02:15] USER_ID:09 -> APP:EXTERNAL_CLAUDE -> TOKEN_EVENT:REDACTED</div>
                 <div className="text-rose-500 font-bold">[2024-05-12 14:02:18] CRITICAL: SHADOW_AI_DETECTED -> HOST:192.168.1.42</div>
                 <div className="animate-pulse">_</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * SOLUTIONS VIEW
 */
const SolutionsPage: React.FC = () => (
  <div className="pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mb-24 space-y-6">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-xs font-bold uppercase tracking-widest">Industry Solutions</div>
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">Mission Critical <br />Governance.</h2>
        <p className="text-xl text-slate-400 font-medium">Securing AI adoption across every department and use case.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-40">
        {[
          { 
            title: "Information Security", 
            icon: <ShieldCheck />,
            desc: "Stop the bleed of organizational secrets. Discover Shadow AI tools and enforce immediate token redaction policies."
          },
          { 
            title: "ML Engineering", 
            icon: <Cpu />,
            desc: "Build autonomous swarms with confidence. Prevent agent injection cycles and maintain semantic sovereignty."
          },
          { 
            title: "Compliance & GRC", 
            icon: <FileSearch />,
            desc: "Maintain verifiable audit trails. Automatically map AI interactions to regulatory frameworks like SOC2 and GDPR."
          }
        ].map((sol, i) => (
          <div key={i} className="glass p-12 rounded-[2.5rem] card-hover space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-swarm-emerald/10 flex items-center justify-center text-swarm-emerald shadow-md">{sol.icon}</div>
            <h3 className="text-2xl font-bold text-white">{sol.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{sol.desc}</p>
            <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-swarm-emerald group">
               Read Solution Brief <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const handleNavigateToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * MAIN APP
 */
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (p: Page) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-swarm-dark">
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-swarm-dark/95 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavigation('home')}>
            <SwarmLogo size={32} />
            <span className="text-xl font-bold tracking-tight text-white">Swarm <span className="text-swarm-emerald">Security</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <NavItem label="Solutions" active={currentPage === 'solutions'} onClick={() => handleNavigation('solutions')} />
            <NavItem label="Platform" active={currentPage === 'platform'} onClick={() => handleNavigation('platform')} />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-swarm-emerald text-swarm-dark rounded-lg font-bold text-sm hover:bg-white transition-all shadow-xl active:scale-95"
            >
              Book a Demo
            </button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setIsModalOpen(true)}><Terminal size={24} /></button>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <HomePage onOpenModal={() => setIsModalOpen(true)} onNavigate={handleNavigation} />}
        {currentPage === 'platform' && <PlatformPage />}
        {currentPage === 'solutions' && <SolutionsPage />}
      </main>
      
      <Footer onNavigate={handleNavigation} />
      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const AccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', agreed: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.company || !formData.agreed) return;
    setStatus('sending');
    const success = await InquiryService.submit(formData);
    setStatus(success ? 'success' : 'error');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-swarm-dark/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass w-full max-w-lg rounded-[2.5rem] p-8 md:p-14 shadow-2xl border-white/10">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
        
        {status === 'success' ? (
          <div className="text-center py-10 space-y-8">
             <div className="w-20 h-20 bg-swarm-emerald/10 rounded-full flex items-center justify-center mx-auto border border-swarm-emerald/20">
               <CheckCircle2 size={40} className="text-swarm-emerald" />
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white leading-none">Request Sent</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                   Thank you for your interest in Swarm Security. Our team will contact you shortly to schedule a 1:1 demo.
                </p>
             </div>
             <button onClick={onClose} className="px-12 py-4 bg-white text-swarm-dark rounded-xl text-xs font-black uppercase tracking-widest hover:bg-swarm-emerald transition-all shadow-lg">Close</button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">Book a Demo</h3>
              <p className="text-slate-500 text-sm font-medium">Schedule a consultation with our platform engineering team.</p>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                  <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium placeholder:text-slate-800" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                  <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium placeholder:text-slate-800" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium placeholder:text-slate-800" placeholder="jane@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Organization</label>
                <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium placeholder:text-slate-800" placeholder="Company Name" />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input type="checkbox" required checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} className="mt-1 h-5 w-5 rounded border-white/10 bg-transparent accent-swarm-emerald" />
                  <span className="text-[10px] text-slate-500 leading-snug font-bold uppercase tracking-widest transition-colors group-hover:text-slate-400">
                    I agree to receive communications regarding my demo request and future platform updates.
                  </span>
                </label>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                  <AlertTriangle size={20} /> Submission failed. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'sending'} 
                className="w-full py-5 bg-swarm-emerald hover:bg-white text-swarm-dark rounded-xl font-bold text-xs uppercase tracking-[0.3em] transition-all shadow-xl disabled:opacity-30 flex items-center justify-center gap-4 mt-2"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Processing...
                  </>
                ) : "Request Demo Access"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;