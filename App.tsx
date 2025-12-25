import React, { useState, useEffect, useRef } from 'react';
import { emailService } from './services/emailService';
import { SWARM_LOGO_B64, BLACKBOX_IMAGE_B64, WORKER_URL}from './consts';
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
  Box,
  Briefcase,
  Code2,
  Palette,
  Layout,
  Upload,
  FileText,
  Building2,
  TrendingUp,
  Shield,
  Zap,
  HardDrive,
  Scale,
  Users,
  Eye,
  Server,
  Target,
  BarChart3
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

/**
 * ANIMATED ASSET GRAPH VISUAL
 */
const AssetGraphVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center p-6 bg-black/40 rounded-[2.5rem] border border-white/5 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 600 300">
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
          { d: "M 380 200 H 480 V 220" },
          { d: "M 120 80 H 80" },
          { d: "M 480 80 H 520" },
          { d: "M 120 220 H 80" },
          { d: "M 480 220 H 520" }
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
              strokeDasharray="12 28"
              filter="url(#mazeGlow)"
              className="animate-[graphDash_10s_infinite_linear]"
            />
          </React.Fragment>
        ))}
      </svg>

      <div className="relative z-10 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="w-12 h-12 bg-swarm-emerald rounded-full shadow-[0_0_40px_rgba(16,185,129,0.8)] z-20 border border-white/20" />
        </div>
        <div className="absolute top-[26.6%] left-[20%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 border-white/10 hover:border-swarm-emerald/50 transition-all shadow-lg">
              <User size={18} />
           </div>
        </div>
        <div className="absolute top-[26.6%] left-[80%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 border-white/10 hover:border-swarm-emerald/50 transition-all shadow-lg">
              <Database size={18} />
           </div>
        </div>
        <div className="absolute top-[73.3%] left-[20%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 border-white/10 hover:border-swarm-emerald/50 transition-all shadow-lg">
              <Box size={18} />
           </div>
        </div>
        <div className="absolute top-[73.3%] left-[80%] -translate-x-1/2 -translate-y-1/2">
           <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 border-white/10 hover:border-swarm-emerald/50 transition-all shadow-lg">
              <Globe size={18} />
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

/**
 * PERSONA HUB GRAPHIC
 */
const PersonaHubGraphic: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center">
      {/* Background Pulse Rings */}
      <div className="absolute w-full h-full rounded-full border border-swarm-emerald/10 animate-pulse" />
      <div className="absolute w-[85%] h-[85%] rounded-full border border-swarm-emerald/5 animate-[pulse_4s_infinite]" />
      <div className="absolute w-[65%] h-[65%] rounded-full border border-swarm-emerald/20" />
      
      {/* Rotating Connection Line */}
      <div className="absolute inset-0 animate-[spin_20s_infinite_linear]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-swarm-emerald/40 via-transparent to-swarm-emerald/40 opacity-20" />
      </div>

      {/* Central Swarm Node - The Hub */}
      <div className="relative z-20 w-32 h-32 bg-swarm-emerald rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.6)] border-4 border-white/30 transition-transform hover:scale-105 group cursor-default">
        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-white/50 border border-white/10 overflow-hidden shadow-inner">
          {SWARM_LOGO_B64 ? (
            <img 
              src={SWARM_LOGO_B64} 
              alt="Swarm" 
              className="w-16 h-16 object-contain block z-30" 
              draggable={false} 
            />
          ) : (
            <Target size={32} className="opacity-40" />
          )}
        </div>
        <div className="absolute -inset-4 rounded-full border border-white/10 animate-ping opacity-20 pointer-events-none" />
      </div>

      {/* Orbiting Role Nodes */}
      {[
        { icon: <ShieldCheck size={24} />, pos: "top-[-5%] left-1/2 -translate-x-1/2", label: "CISO", color: "text-swarm-emerald" },
        { icon: <Zap size={24} />, pos: "bottom-[-5%] left-1/2 -translate-x-1/2", label: "AI LEAD", color: "text-amber-400" },
        { icon: <Scale size={24} />, pos: "left-[-5%] top-1/2 -translate-y-1/2", label: "GRC", color: "text-blue-400" },
        { icon: <Server size={24} />, pos: "right-[-5%] top-1/2 -translate-y-1/2", label: "IT INFRA", color: "text-purple-400" }
      ].map((node, i) => (
        <div key={i} className={`absolute ${node.pos} flex flex-col items-center gap-3 group z-30`}>
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center bg-swarm-dark/80 text-white border-white/10 group-hover:border-swarm-emerald/50 group-hover:scale-110 transition-all shadow-2xl overflow-hidden relative">
            <div className={`absolute inset-0 bg-white/5 group-hover:bg-swarm-emerald/5 transition-colors`} />
            <div className={node.color}>{node.icon}</div>
          </div>
          <span className="text-[11px] font-black tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors bg-swarm-dark/50 px-2 py-0.5 rounded backdrop-blur-sm">{node.label}</span>
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

const NavItem: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`text-sm font-bold uppercase tracking-widest transition-all ${active ? 'text-swarm-emerald' : 'text-slate-400 hover:text-white'}`}
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
            <span className="text-xl font-bold tracking-tight text-white">Swarm <span className="text-swarm-emerald">Security</span></span>
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
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('solutions')}>Use Cases</li>
            <li className="hover:text-swarm-emerald cursor-pointer" onClick={() => onNavigate('careers')}>Careers</li>
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

const HomePage: React.FC<{ onOpenModal: () => void, onNavigate: (p: Page) => void }> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-mesh">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swarm-emerald/10 border border-swarm-emerald/20 text-swarm-emerald text-xs font-bold uppercase tracking-widest">
              AI Security Infrastructure
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
              Tame the <br /><span className="text-swarm-emerald">Swarm.</span>
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
            <div className="relative w-full max-md aspect-square flex items-center justify-center animate-in zoom-in duration-1000">
              <SwarmLogo size={240} className="drop-shadow-[0_0_80px_rgba(16,185,129,0.4)]" />
            </div>
          </div>
        </div>
      </section>

      <section id="black-box-narrative" className="py-32 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
           <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-swarm-emerald/5 blur-[100px] rounded-full" />
              <div className="relative glass p-10 rounded-[3rem] border-white/5 flex items-center justify-center aspect-square shadow-2xl">
                 <img 
                  src={BLACKBOX_IMAGE_B64} 
                  alt="AI Black Box Unboxed" 
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
           </div>
        </div>
      </section>

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
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-swarm-emerald/5 blur-[100px] rounded-full" />
              <div className="relative glass p-10 rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl">
                 <div className="space-y-6 relative z-10 font-mono text-xs">
                    <div className="flex justify-between items-center text-slate-500">
                       <span>INSPECTING_STREAM...</span>
                       <span className="text-swarm-emerald font-black">ACTIVE</span>
                    </div>
                    <div className="p-4 bg-black/60 rounded-xl border border-white/5 text-slate-300">
                       <span className="text-slate-600">INPUT_PROMPT:</span> "Extract quarterly revenue numbers..." <br />
                       <span className="text-swarm-emerald">ACTION: REDACTED_PII_SUCCESS</span>
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
  <div className="pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mb-24 space-y-6">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-xs font-bold uppercase tracking-widest">Platform Deep Dive</div>
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">The Governance <br />Infrastructure.</h2>
        <p className="text-xl text-slate-400 font-medium">Built on a sub-10ms high-performance proxy layer.</p>
      </div>

      <div className="space-y-32 mb-40">
        <div id="asset-inventory" className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-swarm-emerald/10 rounded-xl text-swarm-emerald"><Database size={32} /></div>
                 <h3 className="text-3xl font-bold">Asset Inventory</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Automated discovery indexes every LLM endpoint and connected data source across your organization's entire AI stack.</p>
           </div>
           <div className="glass p-12 rounded-[3rem] border-white/5 flex items-center justify-center bg-black/40 shadow-2xl">
              <div className="w-full space-y-4 font-mono text-xs">
                 <div className="grid grid-cols-3 border-b border-white/5 pb-2 text-slate-500 uppercase">
                    <span>ASSET_ID</span>
                    <span className="text-center">TYPE</span>
                    <span className="text-right">RISK</span>
                 </div>
                 <div className="grid grid-cols-3 py-1">
                    <span className="text-white">dev-llama</span>
                    <span className="text-center">LOCAL</span>
                    <span className="text-right text-swarm-emerald">LOW</span>
                 </div>
                 <div className="grid grid-cols-3 py-1">
                    <span className="text-white">openai-v4</span>
                    <span className="text-center">CLOUD</span>
                    <span className="text-right text-amber-500">MED</span>
                 </div>
                 <div className="grid grid-cols-3 py-1">
                    <span className="text-white">anthropic-claude</span>
                    <span className="text-center">CLOUD</span>
                    <span className="text-right text-swarm-emerald">LOW</span>
                 </div>
              </div>
           </div>
        </div>

        <div id="asset-graph" className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="lg:order-2 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-swarm-emerald/10 rounded-xl text-swarm-emerald"><Network size={32} /></div>
                 <h3 className="text-3xl font-bold">Asset Graph</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Visibility into the semantic relationships between identities, agents, and data. Map the flow of sensitive information in real-time.</p>
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
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Define granular semantic policies. Automatically redact secrets, filter injections, and enforce behavioral constraints on every prompt.</p>
           </div>
           <div className="glass p-12 rounded-[3rem] border-white/5 bg-black/40 shadow-2xl">
              <div className="space-y-4">
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-medium text-sm text-white">
                       <Lock className="text-swarm-emerald" size={16} /> global-secret-scrub
                    </div>
                    <div className="px-2 py-0.5 rounded bg-swarm-emerald/20 text-swarm-emerald text-[10px] font-black uppercase">ACTIVE</div>
                 </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-medium text-sm text-white">
                       <ShieldCheck className="text-swarm-emerald" size={16} /> injection-guard-v2
                    </div>
                    <div className="px-2 py-0.5 rounded bg-swarm-emerald/20 text-swarm-emerald text-[10px] font-black uppercase">ACTIVE</div>
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
              <p className="text-lg text-slate-400 leading-relaxed font-medium">An immutable, high-fidelity trail of every AI interaction. Record semantic context without compromising user privacy for GRC and forensics.</p>
           </div>
           <div className="lg:order-1 glass p-10 rounded-[3rem] border-white/5 bg-black/40 h-72 overflow-hidden flex flex-col justify-end shadow-2xl">
              <div className="space-y-3 font-mono text-[10px] text-slate-400">
                 <div>[2024-05-12 14:02:11] REQUEST_ID: 9821_AX -&gt; APP_PROD -&gt; STATUS: CLEAN</div>
                 <div>[2024-05-12 14:02:15] REQUEST_ID: 9822_AX -&gt; CLAUDE_EXT -&gt; STATUS: REDACTED_PII</div>
                 <div className="text-amber-500 font-bold">[2024-05-12 14:02:16] WARNING: DATA_LEAK_PREVENTED -&gt; TARGET: EXTERNAL_API</div>
                 <div className="text-rose-500 font-bold">[2024-05-12 14:02:18] CRITICAL: SHADOW_AI_DETECTED -&gt; ENDPOINT: 192.168.1.42</div>
                 <div>[2024-05-12 14:02:21] AUDIT_LOG_IMMUTABLE_SYNC -&gt; SUCCESS</div>
                 <div className="animate-pulse">_</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const UseCaseCard: React.FC<{ 
  title: string; 
  target: string; 
  desc: string; 
  benefit: string; 
  icon: React.ReactNode 
}> = ({ title, target, desc, benefit, icon }) => (
  <div className="glass p-10 rounded-[2.5rem] card-hover flex flex-col h-full border-white/5 bg-black/20">
    <div className="flex justify-between items-start mb-10">
      <div className="p-4 bg-swarm-emerald/10 rounded-2xl text-swarm-emerald shadow-lg border border-swarm-emerald/10">
        {icon}
      </div>
      <div className="px-3 py-1 rounded-full bg-swarm-emerald/5 border border-swarm-emerald/20 text-[10px] font-black uppercase tracking-widest text-swarm-emerald">
        {target}
      </div>
    </div>
    <div className="flex-grow space-y-4">
      <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed text-sm">{desc}</p>
    </div>
    <div className="mt-8 pt-8 border-t border-white/5">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-swarm-emerald mb-3">Key Outcome</h4>
      <p className="text-slate-200 text-sm font-bold leading-relaxed">{benefit}</p>
    </div>
  </div>
);

const StakeholderCard: React.FC<{
  role: string;
  icon: React.ReactNode;
  desc: string;
}> = ({ role, icon, desc }) => (
  <div className="glass p-10 rounded-[2.5rem] border-white/10 bg-slate-900/40 hover:bg-slate-800/60 transition-all group flex flex-col gap-6 shadow-xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-swarm-emerald/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-swarm-emerald/10 transition-all" />
    <div className="flex items-center gap-5 relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-swarm-emerald/10 flex items-center justify-center text-swarm-emerald group-hover:bg-swarm-emerald group-hover:text-swarm-dark transition-all shadow-lg border border-swarm-emerald/20">
        {icon}
      </div>
      <h4 className="text-2xl font-extrabold text-white tracking-tight">{role}</h4>
    </div>
    <p className="text-slate-200 text-base font-semibold leading-relaxed relative z-10 group-hover:text-white transition-colors">
      {desc}
    </p>
  </div>
);

const UseCasesPage: React.FC = () => (
  <div className="pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mb-24 space-y-6">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-xs font-bold uppercase tracking-widest">Enterprise Use Cases</div>
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">Securing AI<br />at Scale.</h2>
        <p className="text-xl text-slate-400 font-medium">From financial services to autonomous agent orchestration, Swarm provides the visibility layer for the modern AI stack.</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-40">
        <UseCaseCard 
          title="Data Leak Prevention (DLP)"
          target="InfoSec & CISO"
          icon={<Shield size={28} />}
          desc="Automated discovery and redaction of PII, PHI, and internal secrets before they leave your perimeter. Our sub-10ms proxy ensures security doesn't break the user experience."
          benefit="Enable tools like ChatGPT/Claude across the workforce while maintaining strict GDPR, SOC2, and HIPAA compliance."
        />
        <UseCaseCard 
          title="Autonomous Agent Governance"
          target="AI Architects"
          icon={<Zap size={28} />}
          desc="Autonomous swarms often experience 'agentic drift.' Swarm enforces tool-calling constraints and prevents prompt injections that could lead to unauthorized system actions."
          benefit="Deploy agentic workflows with confidence, knowing every system interaction is gated by semantic security policies."
        />
        <UseCaseCard 
          title="Shadow AI Discovery"
          target="IT Operations"
          icon={<HardDrive size={28} />}
          desc="Teams often bypass centralized IT to use unmanaged LLM providers. Swarm automatically maps every AI connection in your network to surface unvetted endpoints."
          benefit="Consolidate AI spend and eliminate security 'dark spots' by bringing all GenAI activity under a single management plane."
        />
        <UseCaseCard 
          title="Compliance & Audit Trails"
          target="GRC & Legal"
          icon={<Scale size={28} />}
          desc="Regulated industries require verifiable logs for advice-driven AI. Swarm records high-fidelity, immutable semantic context for every interaction for forensic review."
          benefit="Meet stringent transparency requirements and protect against liability by proving what an AI said—and why it said it."
        />
      </div>

      {/* Persona Section */}
      <div className="mb-40 py-32 relative overflow-hidden bg-slate-950 rounded-[5rem] border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-swarm-emerald/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Left Column: Header & Graphic */}
            <div className="space-y-16 text-center lg:text-left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-swarm-emerald/10 border border-swarm-emerald/20 text-swarm-emerald text-xs font-black uppercase tracking-[0.3em] mx-auto lg:mx-0">
                  <Users size={16} /> Organizational Hub
                </div>
                <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[1.05]">
                  Who is <br /><span className="text-swarm-emerald underline decoration-swarm-emerald/20 decoration-8 underline-offset-8">Swarm for?</span>
                </h3>
                <p className="text-xl text-slate-300 font-bold leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Swarm creates a unified visibility layer that bridges the gap between executive risk management and engineering speed.
                </p>
              </div>
              
              <div className="hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
                <PersonaHubGraphic />
              </div>
            </div>

            {/* Right Column: Cards Grid */}
            <div className="grid md:grid-cols-1 gap-8">
              <StakeholderCard 
                role="The CISO"
                icon={<ShieldCheck size={32} />}
                desc="Needs to say 'Yes' to GenAI without losing sleep over the next major data breach or prompt injection exploit."
              />
              <StakeholderCard 
                role="The AI Lead"
                icon={<Zap size={32} />}
                desc="Needs to build complex, multi-agent swarms that are robust enough for production-grade reliability and security."
              />
              <StakeholderCard 
                role="The GRC Manager"
                icon={<Scale size={32} />}
                desc="Needs verifiable evidence that AI systems are operating within the boundaries of law and corporate policy."
              />
              <StakeholderCard 
                role="IT Infrastructure"
                icon={<Server size={32} />}
                desc="Needs to manage the sprawl of API endpoints and compute costs associated with the modern AI-powered enterprise."
              />
              
              {/* Mobile Graphic */}
              <div className="pt-12 lg:hidden flex justify-center">
                <PersonaHubGraphic />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SolutionsPage: React.FC = () => (
  <UseCasesPage />
);

/**
 * CAREERS PAGE - Updated Generic Teaser with Requested Text
 */
const CareersPage: React.FC<{ onApply: (role: string) => void }> = ({ onApply }) => (
  <div className="pt-32 animate-in slide-in-from-bottom-12 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12 mb-40">
        <div className="inline-block px-3 py-1 rounded bg-swarm-emerald/10 text-swarm-emerald text-xs font-bold uppercase tracking-widest">Join the Mission</div>
        <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none">
          Securing the <br />
          <span className="text-swarm-emerald">Agentic Era.</span>
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
            Swarm is a collective of engineers, designers, and security researchers building the infrastructure for the future of AI Enablement.
          </p>
          <p className="text-lg text-slate-500 leading-relaxed italic">
            "Visibility is the first step toward sovereignty."
          </p>
        </div>

        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-swarm-emerald/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative glass p-12 md:p-20 rounded-[4rem] border-white/5 bg-black/40 space-y-10">
            <div className="flex justify-center">
              <div className="p-6 bg-swarm-emerald/10 rounded-full text-swarm-emerald shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <Users size={48} />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Always Seeking Excellence.</h3>
              <p className="text-slate-400 font-medium">
                We hire for trajectory, not just pedigree. If you are obsessed with low-level systems, high-performance security, or the intersection of human and machine intelligence, we want to hear from you.
              </p>
            </div>
            
            <button 
              onClick={() => onApply('General Application')} 
              className="px-12 py-5 bg-swarm-emerald text-swarm-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl hover:scale-105 active:scale-95 mx-auto flex items-center gap-4"
            >
              Contact Us <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20">
          {[
            { icon: <Terminal size={24} />, label: "Systems Infra" },
            { icon: <Lock size={24} />, label: "Sec-Ops" },
            { icon: <Code2 size={24} />, label: "Full-Stack" },
            { icon: <Palette size={24} />, label: "Product Design" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-slate-500 hover:text-white transition-colors">
              <div className="p-4 glass rounded-2xl border-white/5">{item.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * APPLICATION MODAL
 */
const ApplicationModal: React.FC<{ isOpen: boolean; onClose: () => void; role: string }> = ({ isOpen, onClose, role }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus('uploading');
    const success = await InquiryService.submit({ role, resume: file.name });
    setStatus(success ? 'success' : 'error');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-swarm-dark/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass w-full max-lg rounded-[2.5rem] p-10 md:p-14 shadow-2xl border-white/10 max-w-lg">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
        
        {status === 'success' ? (
          <div className="text-center py-10 space-y-8">
             <div className="w-20 h-20 bg-swarm-emerald/10 rounded-full flex items-center justify-center mx-auto border border-swarm-emerald/20">
               <CheckCircle2 size={40} className="text-swarm-emerald" />
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white leading-none">Transmission Sent</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                   Your profile has been indexed. We will contact you if there is a semantic match.
                </p>
             </div>
             <button onClick={onClose} className="px-12 py-4 bg-white text-swarm-dark rounded-xl text-xs font-black uppercase tracking-widest hover:bg-swarm-emerald transition-all shadow-lg">Close</button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">Initiate <span className="text-swarm-emerald">Onboarding</span></h3>
              <p className="text-slate-500 text-sm font-medium">Upload your dossier (PDF/DOCX) for evaluation.</p>
            </div>

            <form className="space-y-8" onSubmit={handleApply}>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer group p-12 border-2 border-dashed rounded-[2rem] transition-all flex flex-col items-center justify-center gap-4 bg-white/5 border-white/10 hover:border-swarm-emerald/40 hover:bg-swarm-emerald/5`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden" 
                />
                
                {file ? (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-swarm-emerald/20 flex items-center justify-center mx-auto mb-4">
                       <FileText size={32} className="text-swarm-emerald" />
                    </div>
                    <p className="text-white font-bold text-sm max-w-[200px] truncate">{file.name}</p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Click to change file</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:bg-swarm-emerald/10 transition-colors">
                       <Upload size={32} className="text-slate-400 group-hover:text-swarm-emerald" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-white font-bold text-sm">Select Dossier</p>
                       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Select your Resume / CV</p>
                    </div>
                  </div>
                )}
              </div>

              {status === 'error' && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                  <AlertTriangle size={20} /> Upload failed. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'uploading' || !file} 
                className="w-full py-5 bg-swarm-emerald hover:bg-white text-swarm-dark rounded-xl font-bold text-xs uppercase tracking-[0.3em] transition-all shadow-xl disabled:opacity-30 flex items-center justify-center gap-4"
              >
                {status === 'uploading' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Syncing Data...
                  </>
                ) : "Submit Dossier"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const handleNavigateToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('');
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

  const handleApplyClick = (role: string) => {
    setActiveRole(role);
    setIsAppModalOpen(true);
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
            <NavItem label="Home" active={currentPage === 'home'} onClick={() => handleNavigation('home')} />
            <NavItem label="Use Cases" active={currentPage === 'solutions'} onClick={() => handleNavigation('solutions')} />
            <NavItem label="Platform" active={currentPage === 'platform'} onClick={() => handleNavigation('platform')} />
            <NavItem label="Careers" active={currentPage === 'careers'} onClick={() => handleNavigation('careers')} />
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="px-6 py-2.5 bg-swarm-emerald text-swarm-dark rounded-lg font-bold text-sm hover:bg-white transition-all shadow-xl active:scale-95"
            >
              Book a Demo
            </button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setIsDemoModalOpen(true)}><Terminal size={24} /></button>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <HomePage onOpenModal={() => setIsDemoModalOpen(true)} onNavigate={handleNavigation} />}
        {currentPage === 'platform' && <PlatformPage />}
        {currentPage === 'solutions' && <SolutionsPage />}
        {currentPage === 'careers' && <CareersPage onApply={handleApplyClick} />}
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
  setStatus('sending');

  // Call the external function
  const success = await emailService.sendInquiry(formData);
  
  setStatus(success ? 'success' : 'error');
};

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-swarm-dark/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass w-full max-lg rounded-[2.5rem] p-8 md:p-14 shadow-2xl border-white/10 max-w-lg">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
        
        {status === 'success' ? (
          <div className="text-center py-10 space-y-8">
             <div className="w-20 h-20 bg-swarm-emerald/10 rounded-full flex items-center justify-center mx-auto border border-swarm-emerald/20">
               <CheckCircle2 size={40} className="text-swarm-emerald" />
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white leading-none">Request Sent</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                   Thank you for your interest. Our team will contact you shortly.
                </p>
             </div>
             <button onClick={onClose} className="px-12 py-4 bg-white text-swarm-dark rounded-xl text-xs font-black uppercase tracking-widest hover:bg-swarm-emerald transition-all shadow-lg">Close</button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">Get in Touch</h3>
              <p className="text-slate-500 text-sm font-medium">Schedule a consultation with our platform engineering team.</p>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                  <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                  <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium" placeholder="jane@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Organization</label>
                <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-swarm-emerald/50 transition-all text-sm font-medium" placeholder="Company / University" />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input type="checkbox" required checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} className="mt-1 h-5 w-5 rounded border-white/10 bg-transparent accent-swarm-emerald" />
                  <span className="text-[10px] text-slate-500 leading-snug font-bold uppercase tracking-widest transition-colors group-hover:text-slate-400">
                    I agree to receive communications from Swarm Security.
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
                ) : "Send Inquiry"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
