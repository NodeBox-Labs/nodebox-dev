import React from 'react';

const metrics = [
  { value: '12 ms',   label: 'COLD START',          desc: 'V8 snapshot isolate warm pool' },
  { value: '1 ms',    label: 'SANDBOX DESTROY',     desc: 'Instant process kill & RAM wipe' },
  { value: '6 MB',    label: 'MEMORY PER SANDBOX',  desc: 'Zero-overhead lightweight isolate' },
  { value: '1 200',   label: 'SANDBOXES / 8GB',     desc: 'High-density concurrent execution' },
];

export const MetricsBanner: React.FC = () => (
  <div className="border-y border-white/[0.06] bg-[#080808]">
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
        {metrics.map(({ value, label, desc }) => (
          <div
            key={label}
            className="py-5 px-6 flex flex-col gap-1 group hover:bg-white/[0.02] transition-colors relative overflow-hidden"
          >
            <span className="text-2xl sm:text-3xl font-black font-mono text-orange-400 group-hover:text-orange-300 transition-colors">
              {value}
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-slate-500 uppercase">
              {label}
            </span>
            <span className="text-[11px] text-slate-600 group-hover:text-slate-400 transition-colors font-mono mt-0.5">
              {desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
