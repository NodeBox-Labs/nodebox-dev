import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, Cpu, Zap, Shield } from 'lucide-react';

interface HeroProps {
  onLaunchStudio: () => void;
  onOpenDocs: () => void;
}

// ── Animated floating cube SVG ──────────────────────────────────────────────
const CubeGraphic: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center select-none">
    {/* Ambient glow rings */}
    <div className="absolute w-80 h-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
    <div className="absolute w-48 h-48 rounded-full bg-amber-400/8 blur-2xl"
      style={{ animation: 'floatA 6s ease-in-out infinite' }} />

    {/* Main cube */}
    <svg
      viewBox="0 0 320 320"
      className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 drop-shadow-2xl"
      style={{ animation: 'floatB 8s ease-in-out infinite', filter: 'drop-shadow(0 0 40px rgba(249,115,22,0.35))' }}
    >
      {/* Top face */}
      <polygon
        points="160,40 280,110 160,180 40,110"
        fill="url(#topFace)"
        stroke="rgba(249,115,22,0.6)"
        strokeWidth="1.5"
      />
      {/* Left face */}
      <polygon
        points="40,110 160,180 160,280 40,210"
        fill="url(#leftFace)"
        stroke="rgba(249,115,22,0.4)"
        strokeWidth="1.5"
      />
      {/* Right face */}
      <polygon
        points="160,180 280,110 280,210 160,280"
        fill="url(#rightFace)"
        stroke="rgba(249,115,22,0.4)"
        strokeWidth="1.5"
      />

      {/* Grid lines — top face */}
      {[0.33, 0.66].map((t, i) => (
        <g key={i} opacity="0.4">
          <line
            x1={40 + t * 120} y1={110 + t * 70}
            x2={160 + t * 120} y2={40 + t * 70}
            stroke="#f97316" strokeWidth="0.8"
          />
          <line
            x1={40 + t * 120} y1={110 + t * 70}
            x2={160 + t * 120} y2={180 + t * 0}
            stroke="#f97316" strokeWidth="0.8"
          />
        </g>
      ))}

      {/* Corner dots */}
      {[
        [160, 40], [280, 110], [160, 180], [40, 110],
        [40, 210], [160, 280], [280, 210],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#f97316" opacity="0.9" />
      ))}

      {/* Center badge */}
      <foreignObject x="110" y="148" width="100" height="28">
        <div
          style={{
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.5)',
            borderRadius: '6px',
            padding: '3px 8px',
            fontFamily: 'monospace',
            fontSize: '9px',
            color: '#fdba74',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          V8 ISOLATE ENGINE
        </div>
      </foreignObject>

      <defs>
        <linearGradient id="topFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="leftFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#431407" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1c0a03" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="rightFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a3412" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#431407" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>

    {/* Floating stat badges */}
    <div className="absolute top-6 right-4 sm:right-0 flex flex-col gap-2">
      {[
        { icon: <Zap className="w-3 h-3" />, label: '12ms cold start', color: 'text-amber-400' },
        { icon: <Cpu className="w-3 h-3" />, label: '6 MB per sandbox', color: 'text-cyan-400' },
        { icon: <Shield className="w-3 h-3" />, label: 'Seccomp-BPF isolated', color: 'text-emerald-400' },
      ].map(({ icon, label, color }, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-[#111]/80 backdrop-blur border border-white/10 rounded-lg px-3 py-1.5 text-[11px] font-mono shadow-lg"
          style={{ animationDelay: `${i * 0.4}s`, animation: 'floatA 5s ease-in-out infinite' }}
        >
          <span className={color}>{icon}</span>
          <span className="text-slate-300">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Hero main component ──────────────────────────────────────────────────────
export const Hero: React.FC<HeroProps> = ({ onLaunchStudio, onOpenDocs }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-orange-500/6 blur-[140px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: Text content ── */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono font-semibold text-orange-300 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Ephemeral Node.js MicroVM Platform
              </span>
              <a
                href="https://github.com/nodebox-dev/nodebox"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:border-white/25 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                ⭐ 1.2k stars
              </a>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-100">
              Give your agent
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-300 bg-clip-text text-transparent">
                a real computer.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg">
              NodeBox runs each AI agent in its own{' '}
              <span className="text-slate-200 font-medium">isolated V8 microVM</span> —
              with a real filesystem, network stack, and Node.js runtime built for it.
              Spin up in <span className="text-orange-300 font-mono font-semibold">12ms</span>.
              Destroy in <span className="text-orange-300 font-mono font-semibold">1ms</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <button
                onClick={onLaunchStudio}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                Launch Sandbox Studio
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDocs}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-semibold text-sm transition-all hover:bg-white/5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Read the docs
              </button>
            </div>

            {/* Platform badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              <span className="text-[11px] text-slate-600 font-mono uppercase tracking-wider">Runs on</span>
              {['Linux', 'macOS', 'Docker', 'Kubernetes', 'CI/CD'].map((p) => (
                <span key={p} className="text-xs text-slate-500 font-mono hover:text-slate-300 transition-colors cursor-default">
                  {p}
                </span>
              ))}
            </div>

            {/* Social proof micro-bar */}
            <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06]">
              <div className="flex -space-x-2">
                {['🧑‍💻', '👩‍💻', '🧑‍🔬', '👨‍💻', '👩‍🔬'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                <span className="text-slate-300 font-semibold">2,400+ engineers</span>{' '}
                already on the waitlist
              </p>
            </div>
          </div>

          {/* ── Right: Cube graphic ── */}
          <div className="relative h-80 sm:h-96 lg:h-[500px]">
            <CubeGraphic />
          </div>

        </div>
      </div>
    </section>
  );
};
