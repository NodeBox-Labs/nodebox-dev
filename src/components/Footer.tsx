import React from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
  onScrollToStudio: () => void;
}

const GhIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface LinkItem {
  label: string;
  href?: string;
  action?: string;
  external?: boolean;
}

const columns: { heading: string; color: string; links: LinkItem[] }[] = [
  {
    heading: 'Product',
    color: 'text-orange-400',
    links: [
      { label: 'Sandbox Engine', href: '#features' },
      { label: 'V8 Architecture', href: '#architecture' },
      { label: 'Benchmarks', href: '#benchmarks' },
      { label: 'Studio Playground', action: 'studio' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    heading: 'Developers',
    color: 'text-cyan-400',
    links: [
      { label: 'SDK Reference', action: 'docs' },
      { label: 'MCP Tool Spec', action: 'docs' },
      { label: 'CLI Manual', action: 'docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Changelog', action: 'docs' },
    ],
  },
  {
    heading: 'Company',
    color: 'text-emerald-400',
    links: [
      { label: 'About NodeBox Labs', action: 'docs' },
      { label: 'Blog', action: 'docs' },
      { label: 'Careers', action: 'docs' },
      { label: 'Security', action: 'docs' },
      { label: 'Contact', action: 'docs' },
    ],
  },
  {
    heading: 'Legal',
    color: 'text-slate-500',
    links: [
      { label: 'MIT License', href: 'https://github.com/nodebox-dev/nodebox/blob/main/LICENSE', external: true },
      { label: 'Privacy Policy', action: 'docs' },
      { label: 'Terms of Service', action: 'docs' },
      { label: 'Cookie Policy', action: 'docs' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onScrollToStudio }) => {
  const [newsEmail, setNewsEmail] = React.useState('');
  const [newsSubscribed, setNewsSubscribed] = React.useState(false);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setNewsSubscribed(true);
    }
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#030303]">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="https://nodebox.dev/" className="flex items-center gap-2.5" aria-label="NodeBox.dev">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-orange-500/30">
                <img src="/nodebox-mark.svg" alt="NodeBox.dev" className="w-full h-full" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">NodeBox</span>
              <span className="text-xs font-mono text-slate-600 mt-0.5">Labs</span>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Open-source V8 isolate sandbox runtime for autonomous AI agents,
              dynamic tool execution, and local-first microVM environments.
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400">
                MIT License
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] font-mono text-orange-400">
                v1.5.0
              </span>
              <a
                href="https://github.com/nodebox-dev/nodebox"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <GhIcon /> GitHub
              </a>
            </div>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-mono text-slate-400 mb-2">Subscribe to release notes:</p>
              {newsSubscribed ? (
                <p className="text-xs font-mono text-emerald-400">✓ Subscribed to updates!</p>
              ) : (
                <form onSubmit={handleNewsSubmit} className="flex gap-2 max-w-xs">
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 flex-1"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-mono text-xs font-semibold transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { label: 'Twitter / X', href: 'https://x.com/nodeboxdev' },
                { label: 'Discord', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-300 transition-colors"
                >
                  {s.label} <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns (8 cols = 4×2) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map(col => (
              <div key={col.heading}>
                <h4 className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-4 ${col.color}`}>
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link.label}>
                      {link.href && !link.external ? (
                        <a href={link.href} className="text-xs text-slate-500 hover:text-slate-200 transition-colors">
                          {link.label}
                        </a>
                      ) : link.href && link.external ? (
                        <a href={link.href} target="_blank" rel="noreferrer"
                          className="text-xs text-slate-500 hover:text-slate-200 transition-colors flex items-center gap-1">
                          {link.label} <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <button
                          onClick={link.action === 'studio' ? onScrollToStudio : onOpenDocs}
                          className="text-xs text-slate-500 hover:text-slate-200 transition-colors text-left"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-600">
          <span>© {new Date().getFullYear()} NodeBox Labs (nodebox-dev). Published under MIT License.</span>
          <span className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-orange-500 fill-current" /> for AI Agents
          </span>
        </div>
      </div>
    </footer>
  );
};
