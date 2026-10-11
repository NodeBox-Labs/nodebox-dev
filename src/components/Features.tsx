import React from 'react';
import { Zap, ShieldCheck, HardDrive, Bot, ArrowUpRight } from 'lucide-react';

type DiagramVariant = 'mcp' | 'security' | 'memfs' | 'benchmark';

const TechnicalDiagram: React.FC<{ variant: DiagramVariant; label: string }> = ({ variant, label }) => {
  const content = {
    mcp: (
      <>
        <div className="diagram-node diagram-node-main"><span>agent</span></div>
        <div className="diagram-line diagram-line-horizontal" />
        <div className="diagram-node diagram-node-accent diagram-node-tool"><span>MCP</span></div>
        <div className="diagram-line diagram-line-vertical" />
        <div className="diagram-stack">
          <span>filesystem</span>
          <span>runtime</span>
          <span>network</span>
        </div>
        <span className="diagram-caption diagram-caption-top">JSON-RPC / tools</span>
        <span className="diagram-caption diagram-caption-bottom">stateful workspace</span>
      </>
    ),
    security: (
      <>
        <div className="diagram-shield"><span>zero trust</span></div>
        <div className="diagram-ring diagram-ring-one" />
        <div className="diagram-ring diagram-ring-two" />
        <div className="diagram-node diagram-node-accent diagram-node-center"><span>V8</span></div>
        <span className="diagram-port diagram-port-top">syscalls</span>
        <span className="diagram-port diagram-port-right">egress</span>
        <span className="diagram-port diagram-port-bottom">memory</span>
        <span className="diagram-port diagram-port-left">fs</span>
      </>
    ),
    memfs: (
      <>
        <div className="diagram-memory-layer diagram-memory-top">/workspace</div>
        <div className="diagram-memory-layer diagram-memory-mid">snapshot · branch</div>
        <div className="diagram-memory-layer diagram-memory-bottom">RAM / MemFS</div>
        <div className="diagram-connector diagram-connector-left" />
        <div className="diagram-connector diagram-connector-right" />
        <span className="diagram-caption diagram-caption-top">copy-on-write</span>
        <span className="diagram-caption diagram-caption-bottom">&lt; 0.1 ms</span>
      </>
    ),
    benchmark: (
      <>
        <div className="diagram-bars">
          <div><span>NodeBox</span><i style={{ width: '88%' }} /></div>
          <div><span>ArcBox</span><i style={{ width: '48%' }} /></div>
          <div><span>E2B</span><i style={{ width: '24%' }} /></div>
          <div><span>Docker</span><i style={{ width: '10%' }} /></div>
        </div>
        <span className="diagram-caption diagram-caption-top">cold start / ms</span>
        <span className="diagram-stat">12<span>ms</span></span>
      </>
    ),
  }[variant];

  return (
    <div className={`technical-diagram technical-diagram-${variant}`} role="img" aria-label={label}>
      <div className="diagram-grid" />
      <div className="diagram-kicker">nodebox / systems</div>
      {content}
      <div className="diagram-index">0{variant === 'mcp' ? 1 : variant === 'security' ? 2 : variant === 'memfs' ? 3 : 4}</div>
    </div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 border-b border-white/[0.08] bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-slate-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-24">

        {/* ── Row 1: MCP Protocol ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 overflow-hidden border border-white/10 group">
            <TechnicalDiagram variant="mcp" label="MCP agent connected to filesystem, runtime, and network tools" />
          </div>
          <div className="order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold">
              <Bot className="w-3.5 h-3.5" />
              Model Context Protocol
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
              Native MCP for{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-200 bg-clip-text text-transparent">
                Claude, Gemini & ChatGPT
              </span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              NodeBox has Anthropic's Model Context Protocol (MCP) built in at the engine level. Expose any tool — file system access, code execution, API calls — directly to your LLM without any middleware layer.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-300 font-mono">
              {[
                'JSON-RPC tool schema auto-discovery',
                'Sub-millisecond tool call routing',
                'Stateful /workspace filesystem across agent steps',
                'Works with Claude Desktop, Cursor, and custom SDKs',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 mt-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#studio" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors mt-2">
              Try MCP Playground <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── Row 2: Zero-Trust Security ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              Zero-Trust Security
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
              Seccomp-BPF{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Syscall Filtering
              </span>{' '}
              by Default
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Every sandbox runs with a strict seccomp-bpf kernel filter that blocks unauthorized syscalls, a per-instance network egress whitelist, and hard memory caps. Untrusted AI-generated code is physically unable to escape.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              {[
                { label: 'Memory Cap', value: '16 – 512 MB', color: 'text-orange-400' },
                { label: 'CPU Timeout', value: 'Configurable', color: 'text-slate-300' },
                { label: 'Egress Control', value: 'Domain Whitelist', color: 'text-orange-400' },
                { label: 'Syscall Guard', value: 'seccomp-bpf', color: 'text-slate-300' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                  <div className="text-slate-500 text-[10px] uppercase mb-1">{item.label}</div>
                  <div className={`font-bold ${item.color}`}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden border border-white/10 group">
            <TechnicalDiagram variant="security" label="Zero trust V8 isolate surrounded by syscall, egress, memory, and filesystem controls" />
          </div>
        </div>

        {/* ── Row 3: POSIX MemFS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 overflow-hidden border border-white/10 group">
            <TechnicalDiagram variant="memfs" label="Layered in-memory filesystem with snapshot and copy-on-write branching" />
          </div>
          <div className="order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold">
              <HardDrive className="w-3.5 h-3.5" />
              POSIX Memory Filesystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
              In-Memory FS with{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Zero Disk I/O
              </span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              NodeBox's MemFS gives every sandbox a full POSIX-compliant virtual filesystem that lives entirely in RAM. No physical SSD access, no I/O bottlenecks, instant file snapshotting, and copy-on-write branching for parallel agent runs.
            </p>
            <div className="p-4 bg-[#050505] rounded-xl border border-white/10 font-mono text-xs space-y-1.5 text-slate-300">
              <div className="text-slate-500 mb-2 font-bold">// MemFS Snapshot Export</div>
              <div><span className="text-orange-400">const</span> snapshot = <span className="text-slate-200">box.fs.snapshot</span>();</div>
              <div className="text-slate-400">// {`{ '/workspace/output.json': '{"ok":true}', ... }`}</div>
              <div><span className="text-orange-400">const</span> branch = <span className="text-slate-200">box.fs.branch</span>(); <span className="text-slate-500">// copy-on-write</span></div>
              <div className="text-orange-400 mt-2 text-[11px]">// Latency: &lt; 0.1ms — no disk access</div>
            </div>
          </div>
        </div>

        {/* ── Row 4: Performance Benchmarks ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              Performance
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-200 bg-clip-text text-transparent">
                10× Faster
              </span>{' '}
              Than Traditional Containers
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Pre-warmed V8 snapshot pools eliminate JIT compilation overhead on every invocation. NodeBox maintains a hot pool of isolates ready to accept your agent's next tool call in microseconds.
            </p>
            <div className="space-y-3">
              {[
                { label: 'NodeBox Isolate', ms: 12, pct: 100, color: 'from-orange-500 to-amber-500', textColor: 'text-orange-300' },
                { label: 'ArcBox Labs', ms: 48, pct: 25, color: 'from-slate-500 to-slate-600', textColor: 'text-slate-300' },
                { label: 'E2B Sandboxes', ms: 210, pct: 6, color: 'from-slate-600 to-slate-700', textColor: 'text-slate-400' },
                { label: 'Docker Container', ms: 850, pct: 1, color: 'from-slate-700 to-slate-800', textColor: 'text-slate-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-mono text-xs">
                    <span className={item.textColor}>{item.label}</span>
                    <span className={item.textColor + ' font-bold'}>{item.ms} ms</span>
                  </div>
                  <div className="w-full bg-white/[0.04] rounded-full h-2 border border-white/10">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                      style={{ width: `${Math.max(item.pct, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-mono">* Cold Start Latency — Benchmarked on Apple M3 Max, Node.js v20</p>
          </div>
          <div className="overflow-hidden border border-white/10 group">
            <TechnicalDiagram variant="benchmark" label="Cold start benchmark comparing NodeBox with other sandbox runtimes" />
          </div>
        </div>

      </div>
    </section>
  );
};


