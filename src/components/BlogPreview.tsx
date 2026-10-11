import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Article {
  tag: string;
  tagColor: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
}

const articles: Article[] = [
  {
    tag: 'Engineering',
    tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    date: 'Sep 2026',
    title: 'How We Achieved 12ms Cold Start With V8 Snapshot Serialization',
    excerpt:
      `We replaced Docker container spin-up with pre-warmed V8 snapshot pools. Here's the deep dive into heap serialization, isolate forking, and the 50× improvement that followed.`,
    readTime: '8 min read',
  },
  {
    tag: 'Security',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    date: 'Aug 2026',
    title: 'Seccomp-BPF, MemFS, and the Anatomy of a Safe Node.js Sandbox',
    excerpt:
      `Running untrusted AI-generated code requires more than \`vm.runInContext\`. We walk through every layer of the NodeBox security model and why each one matters.`,
    readTime: '12 min read',
  },
  {
    tag: 'Product',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    date: 'Jul 2026',
    title: 'NodeBox Studio: Building a Real-Time Sandbox REPL for AI Agents',
    excerpt:
      `NodeBox Studio is an interactive playground built on the same isolate engine. This post covers the WebSocket protocol, hot-reload sandboxes, and state snapshot/restore.`,
    readTime: '6 min read',
  },
];

export const BlogPreview: React.FC = () => (
  <section id="blog" className="py-20 border-b border-white/[0.06] bg-[#080808]">
    <div className="max-w-7xl mx-auto px-4 lg:px-8">

      {/* Header row */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-xs font-mono font-semibold tracking-wider text-orange-400 uppercase mb-3">
            Latest from the blog
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Engineering deep-dives &{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              product updates
            </span>
          </p>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-orange-300 transition-colors border border-white/10 hover:border-orange-500/30 px-4 py-2 rounded-lg">
          All posts <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Article grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a, i) => (
          <article
            key={i}
            className="glass-card rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group"
          >
            {/* Tag + date */}
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${a.tagColor}`}>
                {a.tag}
              </span>
              <span className="text-[11px] font-mono text-slate-600">{a.date}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-slate-100 leading-snug group-hover:text-orange-300 transition-colors line-clamp-3">
              {a.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-4">
              {a.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-slate-600">{a.readTime}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
