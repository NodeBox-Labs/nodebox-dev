import React from 'react';
import { BarChart3, Zap, HardDrive, Layers, ShieldAlert } from 'lucide-react';

export const Benchmarks: React.FC = () => {
  const metrics = [
    {
      title: 'Cold Start Latency (Lower is better)',
      unit: 'ms',
      items: [
        { name: 'NodeBox Isolate Engine', value: 12, color: 'bg-gradient-to-r from-cyan-400 to-teal-400', highlight: true },
        { name: 'ArcBox Labs', value: 48, color: 'bg-indigo-500/70' },
        { name: 'E2B Sandboxes', value: 210, color: 'bg-slate-700' },
        { name: 'Docker Container', value: 850, color: 'bg-slate-800' }
      ]
    },
    {
      title: 'Memory Footprint Per Instance (Lower is better)',
      unit: 'MB',
      items: [
        { name: 'NodeBox Isolate Engine', value: 6.2, color: 'bg-gradient-to-r from-cyan-400 to-teal-400', highlight: true },
        { name: 'ArcBox Labs', value: 28, color: 'bg-indigo-500/70' },
        { name: 'E2B Sandboxes', value: 128, color: 'bg-slate-700' },
        { name: 'Docker Container', value: 256, color: 'bg-slate-800' }
      ]
    },
    {
      title: 'Max Concurrent Sandboxes per 8GB Server (Higher is better)',
      unit: 'instances',
      items: [
        { name: 'NodeBox Isolate Engine', value: 1200, color: 'bg-gradient-to-r from-cyan-400 to-teal-400', highlight: true },
        { name: 'ArcBox Labs', value: 250, color: 'bg-indigo-500/70' },
        { name: 'E2B Sandboxes', value: 60, color: 'bg-slate-700' },
        { name: 'Docker Container', value: 30, color: 'bg-slate-800' }
      ]
    }
  ];

  return (
    <section id="benchmarks" className="py-20 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            Performance Benchmarks
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Empirical Benchmark <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Results</span>
          </p>
          <p className="mt-4 text-slate-400 text-sm">
            Tested on Apple M3 Max & AWS c6i.4xlarge nodes running NodeBox 1.4 vs ArcBox vs E2B vs Docker engine.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {metrics.map((m, idx) => {
            const maxValue = Math.max(...m.items.map(i => i.value));
            return (
              <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 mb-6 flex items-center justify-between">
                    {m.title}
                    <BarChart3 className="w-4 h-4 text-slate-500" />
                  </h3>

                  <div className="space-y-4">
                    {m.items.map((item, itemIdx) => {
                      const percentage = (item.value / maxValue) * 100;
                      return (
                        <div key={itemIdx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className={item.highlight ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                              {item.name}
                            </span>
                            <span className={item.highlight ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                              {item.value} {m.unit}
                            </span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 overflow-hidden border border-slate-800">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${item.color}`}
                              style={{ width: `${Math.max(percentage, 8)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                  {m.items[0].highlight && '✔ NodeBox achieves superior efficiency & density'}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
