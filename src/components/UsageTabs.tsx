import React, { useState } from 'react';
import { Terminal, Layers, Play } from 'lucide-react';

interface Tab {
  id: string;
  num: string;
  title: string;
  badge: string;
  description: string;
  code: string;
  color: string;
}

const tabs: Tab[] = [
  {
    id: 'sandbox',
    num: '01/',
    title: 'Sandbox',
    badge: 'EPHEMERAL · MILLISECONDS TO CREATE',
    description:
      'Spin up a clean V8 isolate for every agent task. No leftover state. No cross-contamination. Destroy it in 1 ms when done.',
    color: 'text-orange-400',
    code: `import { NodeBox } from '@nodebox/sdk';

const box = await NodeBox.create();

// Run untrusted agent code safely
const result = await box.exec(\`
  const data = await fetch('https://api.example.com/data');
  return data.json();
\`);

console.log(result.output);

// Destroyed automatically — or manually:
await box.destroy();`,
  },
  {
    id: 'studio',
    num: '02/',
    title: 'Studio',
    badge: 'INTERACTIVE · LIVE REPL',
    description:
      'NodeBox Studio gives your team a live interactive playground — run code, inspect sandboxes, and iterate on prompts in real-time.',
    color: 'text-cyan-400',
    code: `// Studio API — persistent interactive sessions
const session = await NodeBox.openSession({
  mode: 'interactive',
  persist: true,   // keep state between executions
});

await session.run('let x = 42');
await session.run('x * 2');   // → 84

// Snapshot for resume
const snap = await session.snapshot();
await session.restore(snap);`,
  },
  {
    id: 'runner',
    num: '03/',
    title: 'CI Runner',
    badge: 'PER JOB · CLEAN IMAGE EVERY TIME',
    description:
      'NodeBox makes a pristine isolated sandbox for every CI job. No Docker-in-Docker. No shared state between runs. Just a clean Node.js runtime.',
    color: 'text-emerald-400',
    code: `# .github/workflows/test.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: nodebox-dev/action@v1
        with:
          node-version: '20'
          sandbox: true          # full isolate per job

      - run: npm ci
      - run: npm test
      - run: npm run build`,
  },
];

export const UsageTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section id="usage" className="py-20 border-b border-white/[0.06] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-mono font-semibold tracking-wider text-orange-400 uppercase mb-3">
            Three Runtimes, One Engine
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Sandbox, Studio, and Runner are the{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-200 bg-clip-text text-transparent">
              same isolate engine
            </span>
            <br className="hidden sm:block" /> kept for different lifetimes.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Tab list */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 group
                  ${active === i
                    ? 'border-orange-500/40 bg-orange-500/8 shadow-lg shadow-orange-500/10'
                    : 'border-white/[0.06] hover:border-white/20 hover:bg-white/[0.02]'
                  }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className={`text-xs font-mono font-bold ${active === i ? t.color : 'text-slate-600'}`}>
                    {t.num}
                  </span>
                  {active === i && (
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border
                      ${t.id === 'sandbox' ? 'border-orange-500/40 text-orange-400 bg-orange-500/10'
                        : t.id === 'studio' ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
                        : 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'}`}>
                      {active === i ? '● ACTIVE' : ''}
                    </span>
                  )}
                </div>
                <p className={`text-base font-bold ${active === i ? 'text-slate-100' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {t.title}
                </p>
                <p className="text-[10px] font-mono text-slate-600 mt-0.5">{t.badge}</p>
                {active === i && (
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{t.description}</p>
                )}
              </button>
            ))}
          </div>

          {/* Code panel */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-2xl">
              {/* Terminal top bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0a0a0a]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                  <Terminal className="w-3.5 h-3.5" />
                  nodebox — {tab.id}.{tab.id === 'runner' ? 'yml' : 'ts'}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <Play className="w-3 h-3 fill-current" />
                  RUN
                </div>
              </div>

              {/* Code content */}
              <pre className="p-5 text-[13px] leading-relaxed font-mono text-slate-300 overflow-x-auto scan-wrapper whitespace-pre-wrap">
                <code>{tab.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
