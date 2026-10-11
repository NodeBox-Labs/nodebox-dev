import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Zap, Shield, Cpu, Terminal, BarChart3, Package } from 'lucide-react';

interface NavbarProps {
  onOpenDocs: () => void;
  onScrollToStudio: () => void;
}

const productLinks = [
  {
    icon: <Zap className="w-4 h-4 text-orange-400" />,
    label: 'Sandbox Engine',
    sub: 'V8 Isolate runtime — 12ms cold start',
    href: '#features',
  },
  {
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
    label: 'Security Model',
    sub: 'Seccomp-BPF, MemFS, zero-kernel attack surface',
    href: '#architecture',
  },
  {
    icon: <Cpu className="w-4 h-4 text-cyan-400" />,
    label: 'Architecture',
    sub: 'V8 snapshot pools vs Docker deep-dive',
    href: '#architecture',
  },
  {
    icon: <Terminal className="w-4 h-4 text-violet-400" />,
    label: 'Studio REPL',
    sub: 'Interactive live sandbox playground',
    href: '#studio',
  },
  {
    icon: <BarChart3 className="w-4 h-4 text-amber-400" />,
    label: 'Benchmarks',
    sub: 'Cold start, memory, concurrency data',
    href: '#benchmarks',
  },
  {
    icon: <Package className="w-4 h-4 text-pink-400" />,
    label: 'SDK & CLI',
    sub: 'TypeScript SDK + nodebox CLI',
    href: '#api',
  },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenDocs, onScrollToStudio }) => {
  const [productOpen, setProductOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06] px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand + Nav */}
        <div className="flex items-center gap-8">
          <a href="https://nodebox.dev/" className="flex items-center gap-2.5 group" aria-label="NodeBox.dev">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow">
              <img src="/nodebox-mark.svg" alt="NodeBox.dev" className="w-full h-full" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">NodeBox</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">

            {/* Product dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductOpen(v => !v)}
                aria-expanded={productOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 transition-colors ${productOpen ? 'text-white' : 'hover:text-white'}`}
              >
                Product
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`} />
              </button>

              {productOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] rounded-2xl border border-white/10 bg-[#0e0e0e]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Dropdown header */}
                  <div className="px-5 pt-4 pb-3 border-b border-white/[0.06]">
                    <p className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
                      NodeBox Platform
                    </p>
                  </div>
                  {/* Links grid */}
                  <div className="grid grid-cols-2 gap-px p-1">
                    {productLinks.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setProductOpen(false)}
                        className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                      >
                        <div className="mt-0.5 w-8 h-8 flex-shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-white/10">
                          {link.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {link.label}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{link.sub}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  {/* Footer CTA */}
                  <div className="px-5 py-3 border-t border-white/[0.06] bg-orange-500/5">
                    <button
                      onClick={() => { setProductOpen(false); onScrollToStudio(); }}
                      className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      → Try the Studio Playground live
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button onClick={onOpenDocs} className="hover:text-white transition-colors">Docs</button>
            <button onClick={onOpenDocs} className="hover:text-white transition-colors">Blog</button>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/nodebox-dev/nodebox"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <button
            onClick={onOpenDocs}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Sign in
          </button>

          <button
            onClick={onScrollToStudio}
            className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            Join the waitlist →
          </button>
        </div>
      </div>
    </header>
  );
};
