
import React, { useState, useEffect, useRef } from 'react';
import { emailService } from './services/emailService';
import { SWARM_LOGO_B64, BLACKBOX_IMAGE_B64, LOGO_VIDEO_B64, WORKER_URL } from './consts';
import { 
  X, 
  Loader2, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Network,
  ClipboardList,
  Database,
  Lock,
  User,
  Box,
  Globe,
  Settings,
  Shield,
  Zap,
  HardDrive,
  Scale,
  Users,
  Server,
  Target,
  Menu,
  FileText,
  Upload
} from 'lucide-react';

type Page = 'home' | 'platform' | 'solutions' | 'careers';

const SwarmLogo: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = "" }) => (
  <div 
    className={`flex-none ${className}`}
    style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}
  >
    <img src={SWARM_LOGO_B64} alt="Swarm" className="w-full h-full object-contain block" draggable={false} />
  </div>
);

const AssetGraphVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center p-3 sm:p-6 bg-black/40 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-60" viewBox="0 0 600 300">
        <defs>
          <filter id="mazeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {[
          { d: "M 220 150 H 380" },
          { d: "M 220 100 V 200" },
          { d: "M 380 100 V 200" },
          { d: "M 220 100 H 120 V 80" },
          { d: "M 380 100 H 480 V 80" },
          { d: "M 220 200 H 120 V 220" },
          { d: "M 380 200 H 480 V 220" }
        ].map((path, i) => (
          <React.Fragment key={i}>
            <path d={path.d} fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="2" />
            <path d={path.d} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="12 28" filter="url(#mazeGlow)" className="animate-[graphDash_10s_infinite_linear]" />
          </React.Fragment>
        ))}
      </svg>
      <div className="relative z-10 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="w-8 h-8 md:w-12 md:h-12 bg-swarm-emerald rounded-full shadow-[0_0_40px_rgba(16,185,129,0.8)] z-20 border border-white/20" />
        </div>
        <div className="absolute top-[26.6%] left-[20%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-7 h-7 md:w-10 md:h-10 glass rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 border-white/10 shadow-lg">
              <User size={14} className="md:hidden" />
              <User size={16} className="hidden md:block" />
           </div>
        </div>
        <div className="absolute top-[26.6%] left-[80%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-7 h-7 md:w-10 md:h-10 glass rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 border-white/10 shadow-lg">
              <Database size={14} className="md:hidden" />
              <Database size={16} className="hidden md:block" />
           </div>
        </div>
        <div className="absolute top-[73.3%] left-[20%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-7 h-7 md:w-10 md:h-10 glass rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 border-white/10 shadow-lg">
              <Box size={14} className="md:hidden" />
              <Box size={16} className="hidden md:block" />
           </div>
        </div>
        <div className="absolute top-[73.3%] left-[80%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-7 h-7 md:w-10 md:h-10 glass rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 border-white/10 shadow-lg">
              <Globe size={14} className="md:hidden" />
              <Globe size={16} className="hidden md:block" />
           </div>
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

const PersonaHubGraphic: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center scale-[0.85] sm:scale-100">
      <div className="absolute w-full h-full rounded-full border border-swarm-emerald/10 animate-pulse" />
      <div className="absolute w-[85%] h-[85%] rounded-full border border-swarm-emerald/5 animate-[pulse_4s_infinite]" />
      <div className="absolute w-[65%] h-[65%] rounded-full border border-swarm-emerald/20" />
      <div className="absolute inset-0 animate-[spin_20s_infinite_linear]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-swarm-emerald/40 via-transparent to-swarm-emerald/40 opacity-10" />
      </div>
      <div className="relative z-20 w-56 h-56 md:w-80 md:h-80 flex items-center justify-center group cursor-default">
        <div className="absolute inset-0 bg-swarm-emerald/10 md:bg-swarm-emerald/20 blur-[80px] md:blur-[140px] rounded-full pointer-events-none" />
        <div className="relative z-10 w-28 h-28 md:w-40 md:h-40 bg-white/5 rounded-full flex items-center justify-center text-white/50 border border-white/20 overflow-hidden backdrop-blur-2xl shadow-2xl">
          <img src={SWARM_LOGO_B64} alt="Swarm" className="w-14 h-14 md:w-24 md:h-24 object-contain block z-30" draggable={false} />
        </div>
      </div>
      {[
        { icon: <ShieldCheck size={18} className="md:size-6" />, pos: "top-[-5%] left-1/2 -translate-x-1/2", label: "CISO", color: "text-swarm-emerald" },
        { icon: <Zap size={18} className="md:size-6" />, pos: "bottom-[-5%] left-1/2 -translate-x-1/2", label: "AI LEAD", color: "text-amber-400" },
        { icon: <Scale size={18} className="md:size-6" />, pos: "left-[-5%] top-1/2 -translate-y-1/2", label: "GRC", color: "text-blue-400" },
        { icon: <Server size={18} className="md:size-6" />, pos: "right-[-5%] top-1/2 -translate-y-1/2", label: "IT INFRA", color: "text-purple-400" }
      ].map((node, i) => (
        <div key={i} className={`absolute ${node.pos} flex flex-col items-center gap-2 group z-30`}>
          <div className="w-10 h-10 md:w-16 md:h-16 glass rounded-xl md:rounded-2xl flex items-center justify-center bg-swarm-dark/80 text-white border-white/10 group-hover:border-swarm-emerald/50 transition-all shadow-xl">
            <div className={node.color}>{node.icon}</div>
          </div>
          <span className="text-[8px] md:text-[11px] font-black tracking-[0.2em] text-slate-400 bg-swarm-dark/50 px-2 py-0.5 rounded backdrop-blur-sm">{node.label}</span>
        </div>
      ))}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const NavItem: React.FC<{ label: string; active: boolean; onClick: () => void; className?: string }> = ({ label, active, onClick, className = "" }) => (
  <button 
    onClick={onClick} 
    className={`text-sm font-bold uppercase tracking-widest transition-all ${className} ${active ? 'text-swarm-emerald' : 'text-slate-400 hover:text-white'}`}
  >
    {label}
  </button>
);

const Footer: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => (
  <footer className="bg-swarm-dark border-t border-white/5 pt-16 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <SwarmLogo size={36} />
            <span className="text-xl font-bold tracking-tight text-white">Swarm <span className="text-swarm-emerald">Security</span></span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
            Enterprise-grade AI visibility and governance infrastructure. Built for performance, security, and the future of autonomous systems.
          </p>
        </div>
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-white uppercase tracking-wider">Platform</h5>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('platform')}>Inventory</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('platform')}>Asset Graph</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('platform')}>Policies</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h5>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('home')}>Home</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('solutions')}>Use Cases</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('careers')}>Careers</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] md:text-xs text-slate-500 text-center md:text-left uppercase tracking-widest">
          © 2024 Swarm Security Systems, Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-swarm-emerald animate-pulse" /> System Active</span>
        </div>
      </div>
    </div>
  </footer>
);

const HomePage: React.FC<{ onOpenModal: () => void, onNavigate: (p: Page) => void }> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative min-h-[90vh] flex items-center py-20 lg:py-0 overflow-hidden bg-mesh">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <div className="space-y-6 md:space-y-10 text-center lg:text-left mt-12 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swarm-emerald/10 border border-swarm-emerald/20 text-swarm-emerald text-[10px] font-black uppercase tracking-[0.2em] mx-auto lg:mx-0">
              Security Infrastructure
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
              Tame the <br /><span className="text-swarm-emerald">Swarm.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 max-w-xl font-medium leading-relaxed px-4 lg:px-0">
              The AI stack is a visibility vacuum. Swarm provides the high-performance proxy and discovery layer to unbox the black box and secure your enterprise data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 px-6 sm:px-0">
              <button 
                onClick={onOpenModal} 
                className="w-full sm:w-auto px-10 py-4 bg-swarm-emerald text-swarm-dark rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95"
              >
                Book Demo
              </button>
              <button 
                onClick={() => onNavigate('solutions')}
                className="w-full sm:w-auto px-10 py-4 glass text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Impact
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center py-10 md:py-20">
            <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform hover:scale-105 group cursor-default">
              <div className="absolute inset-0 bg-swarm-emerald/20 blur-[80px] md:blur-[140px] rounded-full pointer-events-none animate-pulse" />
              <div className="relative z-10 w-40 h-40 md:w-56 md:h-56 bg-white/5 rounded-full flex items-center justify-center border border-white/20 overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.3)] backdrop-blur-2xl">
                <video 
                  className="w-full h-full object-cover block z-30 mix-blend-lighten"
                  autoPlay loop muted playsInline
                >
                  <source src={LOGO_VIDEO_B64} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none z-40" />
              </div>
              <div className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border border-swarm-emerald/50 animate-ping opacity-20 pointer-events-none scale-[1.8]" />
              <div className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border border-swarm-emerald/30 animate-ping opacity-10 pointer-events-none scale-[1.4] [animation-delay:0.5s]" />
            </div>
          </div>
        </div>
      </section>

      <section id="black-box-narrative" className="py-24 md:py-32 relative border-y border-white/5 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
           <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-swarm-emerald/5 blur-[80px] rounded-full" />
              <div className="relative glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-white/5 flex items-center justify-center aspect-square shadow-2xl">
                 <img src={BLACKBOX_IMAGE_B64} alt="Unbox AI" className="w-4/5 h-4/5 object-contain opacity-90 drop-shadow-[0_0_80px_rgba(16,185,129,0.2)]" />
              </div>
           </div>
           <div className="order-1 lg:order-2 space-y-6 md:space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] text-white uppercase">
                Unbox the <br className="hidden md:block"/><span className="text-swarm-emerald">Black Box.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium">
                Organizations lose sight of how data flows and how agents behave. Swarm provides literal visibility into every token, exposing the black box for complete security governance.
              </p>
           </div>
        </div>
      </section>

      <section id="inspection-stream" className="py-24 md:py-32 relative bg-swarm-dark overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swarm-emerald/10 border border-swarm-emerald/20 text-swarm-emerald text-[10px] font-black uppercase tracking-widest">
                Deep Analysis
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1] uppercase text-white">
                Inspection <br className="hidden md:block"/><span className="text-swarm-emerald">at the Edge.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium">
                Our sub-10ms proxy performs deep semantic analysis on every stream. Redact PII and enforce safety policies instantly before data leaves your network.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-swarm-emerald/5 blur-[80px] rounded-full" />
              <div className="relative glass p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl">
                 <div className="space-y-4 md:space-y-6 relative z-10 font-mono text-[9px] md:text-xs">
                    <div className="flex justify-between items-center text-slate-500 border-b border-white/5 pb-4">
                       <span className="uppercase tracking-widest">Token_Inspector</span>
                       <span className="text-swarm-emerald font-black">STABLE</span>
                    </div>
                    <div className="p-4 bg-black/60 rounded-xl border border-white/5 text-slate-300 space-y-2">
                       <p><span className="text-slate-600">INPUT:</span> "Extract financial data for user 492..."</p>
                       <p className="text-swarm-emerald font-bold">ACTION: PII_REDACTED</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlatformPage: React.FC = () => (
  <div className="pt-24 md:pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mb-16 md:mb-24 space-y-6 text-center md:text-left">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-[10px] font-black uppercase tracking-widest">Architecture</div>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">The Governance <br />Infrastructure.</h2>
        <p className="text-lg md:text-xl text-slate-400 font-medium">Built on a sub-10ms high-performance proxy layer.</p>
      </div>

      <div className="space-y-24 md:space-y-40 mb-24 md:mb-40">
        {[
          {
            id: "asset-inventory",
            icon: <Database size={24} />,
            title: "Asset Inventory",
            desc: "Automated discovery indexes every LLM endpoint and connected data source across your organization's entire AI stack.",
            content: (
              <div className="w-full space-y-4 font-mono text-[9px] md:text-xs">
                <div className="grid grid-cols-3 border-b border-white/5 pb-2 text-slate-500 uppercase tracking-widest">
                  <span>ID</span>
                  <span className="text-center">TYPE</span>
                  <span className="text-right">HEALTH</span>
                </div>
                <div className="grid grid-cols-3 py-1"><span className="text-white">llama-3-8b</span><span className="text-center">LOCAL</span><span className="text-right text-swarm-emerald">SAFE</span></div>
                <div className="grid grid-cols-3 py-1"><span className="text-white">gpt-4-pro</span><span className="text-center">EXTERNAL</span><span className="text-right text-amber-500">WARN</span></div>
                <div className="grid grid-cols-3 py-1"><span className="text-white">claude-3-op</span><span className="text-center">EXTERNAL</span><span className="text-right text-swarm-emerald">SAFE</span></div>
              </div>
            )
          },
          {
            id: "asset-graph",
            icon: <Network size={24} />,
            title: "Asset Graph",
            desc: "Visualize the semantic relationships between identities, agents, and data. Map information flow in real-time.",
            visual: <AssetGraphVisual />,
            reverse: true
          },
          {
            id: "policies",
            icon: <Settings size={24} />,
            title: "Policy Engine",
            desc: "Define granular semantic policies. Automatically redact secrets, filter prompt injections, and enforce behavioral constraints.",
            content: (
              <div className="space-y-3 w-full">
                {['secret-redaction-v2', 'injection-guard-active', 'data-residency-lock'].map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center group">
                    <div className="flex items-center gap-3 font-bold text-xs text-white uppercase tracking-widest">
                      <Lock className="text-swarm-emerald" size={14} /> {p}
                    </div>
                    <div className="px-2 py-0.5 rounded bg-swarm-emerald/20 text-swarm-emerald text-[8px] font-black uppercase">Active</div>
                  </div>
                ))}
              </div>
            )
          },
          {
            id: "audit-log",
            icon: <ClipboardList size={24} />,
            title: "Audit Trail",
            desc: "An immutable, high-fidelity trail of every AI interaction. Record semantic context for GRC and forensics without storage overhead.",
            content: (
              <div className="space-y-2 font-mono text-[8px] md:text-[10px] text-slate-400">
                <div>[08:12:01] REQ:882 -> CLAUDE_API -> STATUS:CLEAN</div>
                <div className="text-rose-400">[08:12:05] ALERT:PII_DETECTED -> REDACTED</div>
                <div className="text-amber-400">[08:12:12] WARN:UNAUTHORIZED_ENDPOINT -> LOGGED</div>
                <div className="animate-pulse">_</div>
              </div>
            ),
            reverse: true
          }
        ].map((section, idx) => (
          <div key={idx} id={section.id} className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className={`space-y-6 md:space-y-8 ${section.reverse ? 'lg:order-2' : ''}`}>
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-swarm-emerald/10 rounded-xl text-swarm-emerald">{section.icon}</div>
                 <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">{section.title}</h3>
              </div>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium">{section.desc}</p>
            </div>
            <div className={`${section.reverse ? 'lg:order-1' : ''} glass p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border-white/5 flex items-center justify-center bg-black/40 shadow-2xl min-h-[200px]`}>
              {section.visual || section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const UseCaseCard: React.FC<{ title: string; target: string; desc: string; benefit: string; icon: React.ReactNode }> = ({ title, target, desc, benefit, icon }) => (
  <div className="glass p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] card-hover flex flex-col h-full border-white/5 bg-black/20 group">
    <div className="flex justify-between items-start mb-10">
      <div className="p-3 md:p-4 bg-swarm-emerald/10 rounded-2xl text-swarm-emerald shadow-lg border border-swarm-emerald/10 group-hover:bg-swarm-emerald group-hover:text-swarm-dark transition-all">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
      </div>
      <div className="px-3 py-1 rounded-full bg-swarm-emerald/5 border border-swarm-emerald/20 text-[9px] font-black uppercase tracking-widest text-swarm-emerald">
        {target}
      </div>
    </div>
    <div className="flex-grow space-y-4">
      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed text-sm">{desc}</p>
    </div>
    <div className="mt-8 pt-8 border-t border-white/5">
      <h4 className="text-[9px] font-black uppercase tracking-widest text-swarm-emerald mb-2">Outcome</h4>
      <p className="text-slate-200 text-xs md:text-sm font-bold leading-relaxed">{benefit}</p>
    </div>
  </div>
);

const UseCasesPage: React.FC = () => (
  <div className="pt-24 md:pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mb-16 md:mb-24 space-y-6 text-center md:text-left uppercase">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-[10px] font-black tracking-widest">Applications</div>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-none">Securing AI<br />at Scale.</h2>
        <p className="text-base md:text-xl text-slate-400 font-bold lowercase">From financial services to autonomous agent orchestration.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-40">
        <UseCaseCard title="DLP Control" target="InfoSec" icon={<Shield />} desc="Automated discovery and redaction of PII and internal secrets before they leave your perimeter." benefit="Enable GenAI tools workforce-wide while maintaining strict compliance." />
        <UseCaseCard title="Agent Governance" target="Architects" icon={<Zap />} desc="Prevent 'agentic drift' by enforcing tool-calling constraints and safety policies in real-time." benefit="Deploy autonomous workflows with confidence and semantic security." />
        <UseCaseCard title="Shadow AI Discovery" target="IT Ops" icon={<HardDrive />} desc="Automatically map every AI connection in your network to surface and manage unvetted endpoints." benefit="Consolidate AI spend and eliminate security 'dark spots' immediately." />
        <UseCaseCard title="Audit & Compliance" target="GRC" icon={<Scale />} desc="Immutable, high-fidelity logs for advice-driven AI for forensic review and liability protection." benefit="Meet stringent transparency requirements with verifiable semantic trails." />
      </div>
      <div className="mb-24 md:mb-40 py-20 md:py-32 relative overflow-hidden bg-slate-950 rounded-[3rem] md:rounded-[5rem] border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12 text-center lg:text-left uppercase">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-swarm-emerald/10 border border-swarm-emerald/20 text-swarm-emerald text-[10px] font-black tracking-[0.3em] mx-auto lg:mx-0">
                  <Users size={16} /> Stakeholders
                </div>
                <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[1]">
                  Who is <br /><span className="text-swarm-emerald underline decoration-swarm-emerald/20 decoration-8 underline-offset-8">Swarm for?</span>
                </h3>
                <p className="text-base md:text-xl text-slate-300 font-bold leading-relaxed max-w-lg mx-auto lg:mx-0 lowercase">
                  Bridging the gap between executive risk and engineering velocity.
                </p>
              </div>
              <div className="hidden lg:block"><PersonaHubGraphic /></div>
            </div>
            <div className="grid gap-6 md:gap-8">
              {[
                { role: "The CISO", icon: <ShieldCheck size={32} />, text: "Needs to enable GenAI without risking data breaches or prompt injections." },
                { role: "The AI Lead", icon: <Zap size={32} />, text: "Needs to build robust, multi-agent swarms with production-grade reliability." },
                { role: "The GRC Manager", icon: <Scale size={32} />, text: "Needs verifiable evidence that AI systems operate within corporate policy." },
                { role: "IT Infra", icon: <Server size={32} />, text: "Needs to manage the sprawl of API endpoints and compute costs." }
              ].map((s, i) => (
                <div key={i} className="glass p-6 md:p-10 rounded-3xl border-white/10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-swarm-emerald/10 flex items-center justify-center text-swarm-emerald shadow-lg flex-shrink-0">{s.icon}</div>
                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{s.role}</h4>
                    <p className="text-slate-300 text-sm md:text-base font-medium">{s.text}</p>
                  </div>
                </div>
              ))}
              <div className="lg:hidden pt-8"><PersonaHubGraphic /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CareersPage: React.FC<{ onApply: (role: string) => void }> = ({ onApply }) => (
  <div className="pt-24 md:pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12 mb-24 md:mb-40">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-[10px] font-black uppercase tracking-widest">Join the Collective</div>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white uppercase">
          Securing the <br /><span className="text-swarm-emerald">Agentic Era.</span>
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-lg md:text-2xl text-slate-300 font-bold leading-relaxed">
            Swarm is a collective of engineers, designers, and researchers building the infrastructure for the future of AI Enablement.
          </p>
          <p className="text-base md:text-lg text-slate-500 font-black uppercase tracking-widest italic">
            "Visibility is the first step toward sovereignty."
          </p>
        </div>
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute -inset-1 bg-swarm-emerald/20 blur-3xl opacity-30 transition duration-1000"></div>
          <div className="relative glass p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border-white/5 bg-black/60 space-y-10">
            <div className="flex justify-center">
              <div className="p-6 bg-swarm-emerald/10 rounded-full text-swarm-emerald shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                <Users size={48} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Always Seeking Excellence.</h3>
              <p className="text-slate-400 font-medium px-4">
                We hire for trajectory over pedigree. If you are obsessed with low-level systems and high-performance security, let's talk.
              </p>
            </div>
            <button onClick={() => onApply('General')} className="px-12 py-5 bg-swarm-emerald text-swarm-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl mx-auto flex items-center gap-4">
              Contact Us <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const handleNavigation = (p: Page) => {
    setCurrentPage(p);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-swarm-dark selection:bg-swarm-emerald selection:text-swarm-dark">
      <nav className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${scrolled || currentPage !== 'home' ? 'bg-swarm-dark/95 backdrop-blur-xl py-3 md:py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavigation('home')}>
            <SwarmLogo size={32} className="group-hover:rotate-12 transition-transform" />
            <span className="text-lg md:text-xl font-black tracking-tighter text-white uppercase">Swarm <span className="text-swarm-emerald">Security</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <NavItem label="Home" active={currentPage === 'home'} onClick={() => handleNavigation('home')} />
            <NavItem label="Use Cases" active={currentPage === 'solutions'} onClick={() => handleNavigation('solutions')} />
            <NavItem label="Platform" active={currentPage === 'platform'} onClick={() => handleNavigation('platform')} />
            <NavItem label="Careers" active={currentPage === 'careers'} onClick={() => handleNavigation('careers')} />
            <button onClick={() => setIsDemoModalOpen(true)} className="px-6 py-2.5 bg-swarm-emerald text-swarm-dark rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl">
              Book Demo
            </button>
          </div>
          <button className="lg:hidden text-white p-2 relative z-[120]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div className={`lg:hidden fixed inset-0 bg-swarm-dark/98 backdrop-blur-2xl transition-all duration-300 transform z-[115] ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-10 px-6">
            {['home', 'solutions', 'platform', 'careers'].map((p) => (
              <NavItem 
                key={p} 
                label={p === 'solutions' ? 'Use Cases' : p} 
                active={currentPage === p} 
                onClick={() => handleNavigation(p as Page)} 
                className="text-3xl font-black tracking-tighter"
              />
            ))}
            <div className="w-full h-px bg-white/5 max-w-[200px]" />
            <button onClick={() => { setIsDemoModalOpen(true); setIsMobileMenuOpen(false); }} className="px-12 py-5 bg-swarm-emerald text-swarm-dark rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl">
              Book Demo
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        {currentPage === 'home' && <HomePage onOpenModal={() => setIsDemoModalOpen(true)} onNavigate={handleNavigation} />}
        {currentPage === 'platform' && <PlatformPage />}
        {currentPage === 'solutions' && <UseCasesPage />}
        {currentPage === 'careers' && <CareersPage onApply={(r) => { setActiveRole(r); setIsAppModalOpen(true); }} />}
      </main>
      
      <Footer onNavigate={handleNavigation} />
      <AccessModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <ApplicationModal isOpen={isAppModalOpen} onClose={() => setIsAppModalOpen(false)} role={activeRole} />
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
    const success = await emailService.submit(formData);
    setStatus(success ? 'success' : 'error');
  };
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-swarm-dark/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass w-full max-w-lg rounded-[2rem] p-8 sm:p-12 shadow-2xl border-white/10 overflow-y-auto max-h-[95vh]">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
        {status === 'success' ? (
          <div className="text-center py-10 space-y-6">
             <div className="w-20 h-20 bg-swarm-emerald/10 rounded-full flex items-center justify-center mx-auto border border-swarm-emerald/20"><CheckCircle2 size={40} className="text-swarm-emerald" /></div>
             <h3 className="text-2xl font-black text-white uppercase">Request Received</h3>
             <p className="text-slate-400 text-sm font-medium leading-relaxed">Transmission logged. Our team will contact you shortly.</p>
             <button onClick={onClose} className="w-full py-4 bg-white text-swarm-dark rounded-xl text-xs font-black uppercase tracking-widest">Close</button>
          </div>
        ) : (
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Get in <span className="text-swarm-emerald">Touch</span></h3>
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 text-sm text-white" placeholder="First Name" />
                <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 text-sm text-white" placeholder="Last Name" />
              </div>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 text-sm text-white" placeholder="Work Email" />
              <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 text-sm text-white" placeholder="Company" />
              <label className="flex items-start gap-4 cursor-pointer">
                <input type="checkbox" required checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} className="mt-1 h-5 w-5 rounded border-white/10 bg-transparent accent-swarm-emerald" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">I agree to receive tactical communications.</span>
              </label>
              <button type="submit" disabled={status === 'sending'} className="w-full py-5 bg-swarm-emerald text-swarm-dark rounded-xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-30">
                {status === 'sending' ? <Loader2 className="animate-spin mx-auto" /> : "Send Inquiry"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const ApplicationModal: React.FC<{ isOpen: boolean; onClose: () => void; role: string }> = ({ isOpen, onClose, role }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  if (!isOpen) return null;
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus('uploading');
    const success = await emailService.submit({ firstName: "Career", lastName: "Applicant", email: "guy@swarm-security.com", role, file });
    setStatus(success ? 'success' : 'error');
  };
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-swarm-dark/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass w-full max-w-lg rounded-[2rem] p-8 sm:p-12 shadow-2xl border-white/10">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500"><X size={24} /></button>
        {status === 'success' ? (
          <div className="text-center py-10 space-y-6">
             <div className="w-20 h-20 bg-swarm-emerald/10 rounded-full flex items-center justify-center mx-auto border border-swarm-emerald/20"><CheckCircle2 size={40} className="text-swarm-emerald" /></div>
             <h3 className="text-2xl font-black text-white uppercase">Dossier Received</h3>
             <p className="text-slate-400 text-sm font-medium">Your profile has been indexed. Tactical match pending.</p>
             <button onClick={onClose} className="w-full py-4 bg-white text-swarm-dark rounded-xl text-xs font-black uppercase tracking-widest">Close</button>
          </div>
        ) : (
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Initiate <span className="text-swarm-emerald">Onboarding</span></h3>
            <form className="space-y-6" onSubmit={handleApply}>
              <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer p-12 border-2 border-dashed rounded-3xl border-white/10 bg-white/5 hover:border-swarm-emerald/40 transition-all flex flex-col items-center justify-center gap-4 text-center">
                <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
                {file ? (
                  <div className="space-y-2"><FileText size={40} className="text-swarm-emerald mx-auto" /><p className="text-white font-bold">{file.name}</p></div>
                ) : (
                  <div className="space-y-2"><Upload size={40} className="text-slate-500 mx-auto" /><p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Upload Dossier (PDF/DOCX)</p></div>
                )}
              </div>
              <button type="submit" disabled={!file || status === 'uploading'} className="w-full py-5 bg-swarm-emerald text-swarm-dark rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-30">
                {status === 'uploading' ? <Loader2 className="animate-spin mx-auto" /> : "Submit Transmission"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
