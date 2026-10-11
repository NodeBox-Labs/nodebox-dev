import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Layers, Cpu, Lock, Database, Network, Zap } from 'lucide-react';

const ArchitectureDiagram: React.FC = () => (
  <div className="technical-diagram technical-diagram-architecture" role="img" aria-label="NodeBox architecture: V8 isolate, MemFS snapshot, and seccomp-BPF guard">
    <div className="diagram-grid" />
    <div className="diagram-kicker">nodebox / execution stack</div>
    <div className="architecture-layer architecture-layer-top">V8 isolate pool<span>hot snapshot</span></div>
    <div className="architecture-layer architecture-layer-mid">POSIX MemFS<span>zero disk I/O</span></div>
    <div className="architecture-layer architecture-layer-bottom">seccomp-BPF guard<span>12 syscalls</span></div>
    <div className="architecture-rail architecture-rail-left"><span>agent tool</span><i /></div>
    <div className="architecture-rail architecture-rail-right"><i /><span>network policy</span></div>
    <div className="diagram-index">01</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Type definitions
// ─────────────────────────────────────────────────────────────────────────────
interface StackLayer {
  label: string;
  sublabel: string;
  badge?: string;
  badgeColor?: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
}

interface ComparisonMetric {
  label: string;
  nodebox: string | number;
  competitor: string | number;
  unit: string;
  nodeboxWins: boolean;
  icon: React.ReactNode;
}

interface FlowStep {
  step: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  latency: string;
  color: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CollapsibleFaq — expandable FAQ accordion item
// ─────────────────────────────────────────────────────────────────────────────
const CollapsibleFaq: React.FC<FaqItem & { isOpen: boolean; onToggle: () => void }> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => (
  <div className="border border-white/[0.06] rounded-xl overflow-hidden">
    <button
      className="w-full flex items-center justify-between px-5 py-4 text-left
        hover:bg-white/[0.02] transition-colors group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors pr-4">
        {question}
      </span>
      {isOpen
        ? <ChevronUp className="w-4 h-4 text-orange-400 flex-shrink-0" />
        : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 group-hover:text-slate-400 transition-colors" />
      }
    </button>
    {isOpen && (
      <div className="px-5 pb-4 border-t border-white/[0.04]">
        <p className="text-sm text-slate-400 leading-relaxed pt-3">{answer}</p>
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MetricBar — animated horizontal comparison bar
// ─────────────────────────────────────────────────────────────────────────────
interface MetricBarProps {
  metric: ComparisonMetric;
}

const MetricBar: React.FC<MetricBarProps> = ({ metric }) => {
  const nodeboxPct = metric.nodeboxWins ? 100 : 15;
  const competitorPct = metric.nodeboxWins ? 15 : 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-orange-400">{metric.icon}</span>
          {metric.label}
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-orange-400 w-24 text-right flex-shrink-0">NodeBox</span>
          <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full border border-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700"
              style={{ width: `${nodeboxPct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-orange-300 w-16 flex-shrink-0">
            {metric.nodebox} {metric.unit}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-500 w-24 text-right flex-shrink-0">Traditional</span>
          <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full border border-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-slate-600 to-slate-700 transition-all duration-700"
              style={{ width: `${competitorPct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 w-16 flex-shrink-0">
            {metric.competitor} {metric.unit}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// StackCard — renders a layered architecture diagram for one approach
// ─────────────────────────────────────────────────────────────────────────────
interface StackCardProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  headerIcon: React.ReactNode;
  layers: StackLayer[];
  isNodeBox: boolean;
}

const StackCard: React.FC<StackCardProps> = ({
  title, subtitle, badge, badgeColor, headerIcon, layers, isNodeBox,
}) => (
  <div className={`glass-card rounded-2xl p-6 relative shadow-xl
    ${isNodeBox
      ? 'border-orange-500/30 bg-white/[0.03] shadow-orange-500/5'
      : 'border-white/10 bg-white/[0.02]'}`}
  >
    {/* Card header */}
    <div className={`flex items-center justify-between pb-4 mb-5 border-b ${isNodeBox ? 'border-orange-500/20' : 'border-white/10'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center
          ${isNodeBox ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-rose-500/10 border border-rose-500/20'}`}>
          {headerIcon}
        </div>
        <div>
          <h3 className={`font-bold text-sm ${isNodeBox ? 'text-slate-100' : 'text-slate-200'}`}>{title}</h3>
          <p className={`text-[11px] ${isNodeBox ? 'text-orange-300' : 'text-slate-400'}`}>{subtitle}</p>
        </div>
      </div>
      <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded border ${badgeColor}`}>
        {badge}
      </span>
    </div>

    {/* Layer stack visualization */}
    <div className="space-y-2 font-mono text-xs">
      {layers.map((layer, i) => (
        <div
          key={i}
          className={`p-3 ${layer.bgColor} border ${layer.badge ? `border-${layer.badge?.toLowerCase()}-500/30` : 'border-white/10'} rounded-lg flex items-center justify-between transition-all duration-200 hover:brightness-110`}
        >
          <div className="flex items-center gap-2">
            {layer.icon && <span className="opacity-60">{layer.icon}</span>}
            <span className={layer.textColor}>{layer.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {layer.sublabel && (
              <span className={`text-[10px] ${layer.badgeColor || 'text-slate-500'} font-bold`}>
                {layer.sublabel}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* NodeBox "recommended" ribbon */}
    {isNodeBox && (
      <div className="absolute -top-3 -right-3 px-3 py-1 bg-orange-500 rounded-full text-[10px] font-mono font-black text-black shadow-lg shadow-orange-500/30">
        RECOMMENDED
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Architecture section — main export
// ─────────────────────────────────────────────────────────────────────────────
export const Architecture: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const nodeboxLayers: StackLayer[] = [
    {
      label: 'Untrusted AI Tool / JS Execution',
      sublabel: 'Isolate Sandbox',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-200 font-bold',
      badgeColor: 'text-orange-400',
      icon: <Cpu className="w-3 h-3 text-orange-400" />,
    },
    {
      label: 'POSIX Virtual Memory FS (MemFS)',
      sublabel: 'Zero-Disk (< 1ms)',
      bgColor: 'bg-white/[0.03]',
      textColor: 'text-slate-300',
      badgeColor: 'text-slate-300',
      icon: <Database className="w-3 h-3 text-slate-400" />,
    },
    {
      label: 'Seccomp-BPF Guard & Network Policy',
      sublabel: 'Zero-Trust Shield',
      bgColor: 'bg-white/[0.02]',
      textColor: 'text-slate-400',
      badgeColor: 'text-slate-300',
      icon: <Lock className="w-3 h-3 text-slate-500" />,
    },
    {
      label: 'Network Egress Whitelist (Domain-level)',
      sublabel: 'Allowlist',
      bgColor: 'bg-white/[0.015]',
      textColor: 'text-slate-500',
      badgeColor: 'text-slate-400',
      icon: <Network className="w-3 h-3 text-slate-600" />,
    },
    {
      label: 'NodeBox Host Engine & V8 Worker Pool',
      sublabel: 'Ultra-Light (~6MB)',
      bgColor: 'bg-white/[0.01]',
      textColor: 'text-slate-500',
      badgeColor: 'text-orange-400',
      icon: <Layers className="w-3 h-3 text-slate-600" />,
    },
  ];

  const traditionalLayers: StackLayer[] = [
    {
      label: 'User AI Code / Node Process',
      sublabel: 'App Space',
      bgColor: 'bg-white/[0.03]',
      textColor: 'text-slate-300',
      badgeColor: 'text-slate-500',
      icon: <Cpu className="w-3 h-3 text-slate-400" />,
    },
    {
      label: 'Full Linux Kernel + RootFS (glibc)',
      sublabel: 'Heavy (~150MB)',
      bgColor: 'bg-white/[0.02]',
      textColor: 'text-slate-400',
      badgeColor: 'text-rose-400',
      icon: <Database className="w-3 h-3 text-slate-500" />,
    },
    {
      label: 'systemd + init process chain',
      sublabel: 'High Overhead',
      bgColor: 'bg-white/[0.015]',
      textColor: 'text-slate-500',
      badgeColor: 'text-rose-400',
      icon: <Lock className="w-3 h-3 text-slate-600" />,
    },
    {
      label: 'Network NAT + veth bridge (iptables)',
      sublabel: 'Slow Setup',
      bgColor: 'bg-white/[0.01]',
      textColor: 'text-slate-600',
      badgeColor: 'text-rose-500',
      icon: <Network className="w-3 h-3 text-slate-700" />,
    },
    {
      label: 'Hypervisor Layer (QEMU / KVM / Firecracker)',
      sublabel: 'Physical Server',
      bgColor: 'bg-black/40',
      textColor: 'text-slate-600',
      badgeColor: 'text-slate-500',
      icon: <Layers className="w-3 h-3 text-slate-700" />,
    },
  ];

  const metrics: ComparisonMetric[] = [
    { label: 'Cold Start Latency', nodebox: '< 14', competitor: '800+', unit: 'ms', nodeboxWins: true, icon: <Zap className="w-3 h-3" /> },
    { label: 'Memory Footprint', nodebox: 6, competitor: 150, unit: 'MB', nodeboxWins: true, icon: <Database className="w-3 h-3" /> },
    { label: 'Syscall Attack Surface', nodebox: 12, competitor: '900+', unit: 'calls', nodeboxWins: true, icon: <Lock className="w-3 h-3" /> },
    { label: 'Network Setup Time', nodebox: '< 0.5', competitor: 120, unit: 'ms', nodeboxWins: true, icon: <Network className="w-3 h-3" /> },
  ];

  const flowSteps: FlowStep[] = [
    { step: 1, label: 'Agent calls tool', sublabel: 'MCP JSON-RPC request', icon: <Cpu className="w-4 h-4" />, latency: '0ms', color: 'text-slate-400 border-slate-700/50' },
    { step: 2, label: 'NodeBox routes request', sublabel: 'SDK ingestion layer', icon: <Layers className="w-4 h-4" />, latency: '~1ms', color: 'text-slate-300 border-slate-600/50' },
    { step: 3, label: 'Isolate boots from snapshot', sublabel: 'V8 snapshot restore', icon: <Zap className="w-4 h-4" />, latency: '~12ms', color: 'text-orange-400 border-orange-500/30' },
    { step: 4, label: 'Code executes in sandbox', sublabel: 'Seccomp-BPF enforced', icon: <Lock className="w-4 h-4" />, latency: 'runtime', color: 'text-orange-300 border-orange-500/20' },
    { step: 5, label: 'Result returned to agent', sublabel: 'stdout + exitCode + fs diff', icon: <Network className="w-4 h-4" />, latency: '~0ms', color: 'text-amber-400 border-amber-500/20' },
  ];

  const faqs: FaqItem[] = [
    {
      question: 'How is NodeBox different from Docker or Firecracker?',
      answer: 'NodeBox uses the V8 JavaScript engine\'s built-in isolate mechanism — the same technology that powers Chrome\'s tab separation. Unlike Docker or Firecracker, there\'s no hypervisor, no kernel to boot, and no RootFS to mount. NodeBox boots from a pre-warmed V8 snapshot in under 14ms.',
    },
    {
      question: 'Can I run arbitrary code beyond JavaScript?',
      answer: 'Yes. NodeBox can run Python, Bash, and other runtimes via WASM compilation or native subprocess isolation. The MemFS layer provides a POSIX-compatible interface so most Node.js-compatible runtimes work out of the box.',
    },
    {
      question: 'What is the Seccomp-BPF guard?',
      answer: 'Seccomp-BPF (Berkeley Packet Filter) is a Linux kernel feature that allows fine-grained filtering of system calls. NodeBox applies a strict allowlist of only 12 syscalls needed for safe execution, physically preventing AI-generated code from accessing hardware, files outside the sandbox, or unauthorized network endpoints.',
    },
    {
      question: 'How does the POSIX MemFS work?',
      answer: 'MemFS is an in-memory virtual filesystem that presents a POSIX-compatible path tree. All file I/O is intercepted and redirected to RAM-allocated buffers. You can snapshot the entire filesystem state as a JSON object, restore it, or branch it (copy-on-write) for parallel execution — all in under 0.1ms.',
    },
    {
      question: 'Is NodeBox production-ready?',
      answer: 'NodeBox is currently in private beta. The core engine is production-grade and runs on multiple platforms. Join the waitlist to get early access, SLA guarantees, and dedicated onboarding support.',
    },
  ];

  return (
    <section
      id="architecture"
      className="py-20 border-b border-white/[0.08] bg-[#050505] relative overflow-hidden"
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute top-1/4 left-1/2 w-[500px] h-[300px] bg-orange-500/4 blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-slate-500/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* ─── Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-wider text-orange-400 uppercase mb-3">
            System Architecture
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Why NodeBox is{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-200 bg-clip-text text-transparent">
              10× Faster & Lighter
            </span>
          </p>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Comparison between traditional container hypervisors (Docker / QEMU / ArcBox) vs NodeBox
            V8 Isolate snapshot pools. No kernel to boot. No RootFS to mount. No hypervisor tax.
          </p>
        </div>

        {/* ─── 3D Visual Banner ─── */}
        <div className="mb-12 overflow-hidden border border-white/10 relative group max-w-5xl mx-auto">
          <ArchitectureDiagram />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-orange-300">
            <span className="bg-[#0a0a0a]/90 px-3 py-1.5 rounded-lg border border-orange-500/30 text-[11px]">
              Layer 1: V8 Isolate Execution Pool &bull; Layer 2: MemFS Snapshot &bull; Layer 3: Seccomp-BPF Guard
            </span>
            <span className="text-slate-300 font-bold bg-[#0a0a0a]/90 px-3 py-1.5 rounded-lg border border-white/10 hidden sm:block">
              Zero-Disk I/O Overhead
            </span>
          </div>
        </div>

        {/* ─── Architecture Comparison Cards ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          <StackCard
            title="Traditional MicroVM / Docker"
            subtitle="QEMU, Firecracker, Containerd"
            badge="100ms – 800ms boot"
            badgeColor="text-rose-400 bg-rose-500/10 border-rose-500/20"
            headerIcon={<XCircle className="w-5 h-5 text-rose-400" />}
            layers={traditionalLayers}
            isNodeBox={false}
          />
          <StackCard
            title="NodeBox V8 Isolate Architecture"
            subtitle="Local-first Isolate Snapshot Pool"
            badge="< 14ms boot"
            badgeColor="text-slate-200 bg-white/10 border-white/15 font-bold"
            headerIcon={<CheckCircle2 className="w-5 h-5 text-orange-400" />}
            layers={nodeboxLayers}
            isNodeBox={true}
          />
        </div>

        {/* ─── Metric Comparison Bars ─── */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h3 className="text-center text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-8">
            Head-to-Head Metrics
          </h3>
          <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-5">
            {metrics.map((m, i) => (
              <MetricBar key={i} metric={m} />
            ))}
            <p className="text-[10px] text-slate-600 font-mono text-right pt-2">
              * Benchmarked on Apple M3 Max, Node.js v20, Ubuntu 22.04 LTS
            </p>
          </div>
        </div>

        {/* ─── Execution Flow Diagram ─── */}
        <div className="mb-16">
          <h3 className="text-center text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-8">
            Request Execution Flow
          </h3>
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-0 max-w-4xl mx-auto">
            {flowSteps.map((step, i) => (
              <React.Fragment key={step.step}>
                <div className={`flex-1 p-4 rounded-xl border ${step.color.split(' ')[1]} bg-white/[0.02] text-center hover:bg-white/[0.04] transition-colors`}>
                  <div className={`w-7 h-7 rounded-full border ${step.color.split(' ')[1]} flex items-center justify-center mx-auto mb-2 ${step.color.split(' ')[0]}`}>
                    {step.icon}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 mb-1">Step {step.step}</div>
                  <div className={`text-xs font-bold ${step.color.split(' ')[0]} mb-0.5`}>{step.label}</div>
                  <div className="text-[10px] text-slate-600">{step.sublabel}</div>
                  <div className="text-[10px] font-mono text-orange-500/70 mt-1.5">{step.latency}</div>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="hidden sm:flex items-center px-1">
                    <div className="w-4 h-px bg-gradient-to-r from-slate-700 to-slate-600" />
                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-slate-600" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ─── Architecture FAQ ─── */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">
            Architecture FAQ
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <CollapsibleFaq
                key={i}
                {...faq}
                isOpen={openFaqIndex === i}
                onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
