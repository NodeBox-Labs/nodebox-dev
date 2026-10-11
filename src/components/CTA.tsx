import React, { useState } from 'react';
import { ArrowRight, Terminal, CheckCircle2 } from 'lucide-react';

interface CTAProps {
  onLaunchStudio: () => void;
  onOpenDocs: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onLaunchStudio, onOpenDocs }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 bg-[#090d16] border-b border-slate-800/60 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-indigo-600/15 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 -ml-3.5" />
          Early Access Now Open
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Give your agent{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            a real computer.
          </span>
        </h2>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join the waitlist and be first to run production AI agents on NodeBox — the fastest, most secure open-source sandbox runtime ever built.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>You're on the waitlist! We'll notify you as soon as early access opens.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Join waitlist
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onLaunchStudio}
            className="px-6 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Try Playground Free
          </button>
        </div>

        <p className="text-xs text-slate-500 font-mono">
          No credit card required. MIT Licensed. Open-source forever.
        </p>
      </div>
    </section>
  );
};
