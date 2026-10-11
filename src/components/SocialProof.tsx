import React from 'react';

const integrations = [
  { name: 'Claude', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { name: 'Gemini', color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/20' },
  { name: 'OpenAI', color: 'text-slate-300', bg: 'bg-white/5 border-white/10' },
  { name: 'LangChain', color: 'text-orange-300', bg: 'bg-orange-500/10 border-orange-500/20' },
  { name: 'LlamaIndex', color: 'text-slate-300', bg: 'bg-white/5 border-white/10' },
  { name: 'Cursor', color: 'text-slate-300', bg: 'bg-white/5 border-white/10' },
  { name: 'GitHub Actions', color: 'text-slate-300', bg: 'bg-white/5 border-white/10' },
  { name: 'Vercel', color: 'text-slate-100', bg: 'bg-white/10 border-white/20' },
];

const testimonials = [
  {
    quote: "NodeBox eliminated our 600ms Docker cold-start bottleneck. Our AI tool pipeline now runs at 12ms per invocation. It's like replacing a freight train with a bullet.",
    name: 'Rania K.',
    title: 'CTO, Inference Systems',
    avatar: 'RK',
    color: 'bg-orange-500',
  },
  {
    quote: "We run 1,200 concurrent agent sandboxes on a single 8 GB server. With Docker we could barely fit 30. NodeBox changed what's economically possible for us.",
    name: 'Dominik W.',
    title: 'Lead Infra Eng, AgentOps',
    avatar: 'DW',
    color: 'bg-slate-700',
  },
  {
    quote: "The MCP integration is genius. I pointed Claude Desktop at my NodeBox instance and it instantly has file system access, code execution, and tool memory. Zero config.",
    name: 'Priya M.',
    title: 'AI Research Eng, Autonomous Labs',
    avatar: 'PM',
    color: 'bg-amber-500',
  },
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 border-b border-white/[0.08] bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-20">

        {/* Integrations Row */}
        <div className="text-center">
          <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-8">
            Integrates natively with the tools your agents already use
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((item, i) => (
              <div
                key={i}
                className={`px-4 py-2 rounded-full border text-sm font-semibold font-mono ${item.bg} ${item.color} transition-all hover:scale-105`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-3">What builders are saying</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              Trusted by <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-200 bg-clip-text text-transparent">AI infrastructure engineers</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/10 hover:border-orange-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl text-orange-500/40 font-serif leading-none">"</div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-black flex-shrink-0 font-mono`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">{t.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

