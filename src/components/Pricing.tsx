import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Open Source',
    price: 'Free',
    description: 'For individuals and side projects.',
    cta: 'Get started free',
    ctaVariant: 'outline' as const,
    features: [
      'Up to 50 sandbox executions/day',
      '64 MB RAM per instance',
      'POSIX MemFS (1 GB virtual)',
      'Community MCP tools',
      'MIT Licensed — self-host freely',
      'GitHub Discussions support',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For production AI agents and teams.',
    cta: 'Join the waitlist',
    ctaVariant: 'primary' as const,
    badge: 'Most Popular',
    features: [
      'Unlimited sandbox executions',
      'Up to 512 MB RAM per instance',
      'Priority warm isolate pool',
      'Full MCP server & tool registry',
      'Persistent /workspace snapshots',
      'Network egress whitelist (10 domains)',
      'Discord & email support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom SLAs, on-prem or cloud deployment.',
    cta: 'Talk to sales',
    ctaVariant: 'outline' as const,
    features: [
      'Unlimited instances & concurrency',
      'Custom RAM & CPU caps',
      'Private cloud or on-prem deployment',
      'Dedicated isolate pool per tenant',
      'SOC 2 / HIPAA compliance',
      'SSO & audit logs',
      'Dedicated support SLA',
    ],
  },
];

export const Pricing: React.FC = () => {
  const [annual, setAnnual] = React.useState(false);

  return (
    <section id="pricing" className="py-24 border-b border-white/[0.08] bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-orange-500/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase mb-3">Pricing</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Start free. Scale when you're ready.
          </p>
          <p className="mt-4 text-slate-400 text-sm">
            No credit card required to get started. Open source core is always free.
          </p>

          {/* Billing cycle toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs font-mono ${!annual ? 'text-white font-bold' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full bg-white/10 border border-white/15 p-0.5 transition-colors focus:outline-none"
              aria-label="Toggle annual billing"
            >
              <div
                className={`w-4 h-4 rounded-full bg-orange-400 transition-transform duration-200 ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-mono flex items-center gap-1.5 ${annual ? 'text-white font-bold' : 'text-slate-400'}`}>
              Annual
              <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-semibold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, i) => {
            const priceDisplay = tier.price === '$29' ? (annual ? '$24' : '$29') : tier.price;
            const periodDisplay = tier.period ? (annual ? '/mo (billed yearly)' : '/mo') : '';

            return (
              <div
                key={i}
                className={`relative rounded-2xl p-6 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                  tier.badge
                    ? 'bg-gradient-to-b from-orange-500/10 via-black to-black border-orange-500/40 shadow-xl shadow-orange-500/10'
                    : 'bg-white/[0.02] border-white/10'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 via-amber-400 to-slate-200 text-black text-xs font-black rounded-full shadow-lg">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">{tier.name}</div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-extrabold text-slate-100">{priceDisplay}</span>
                    {periodDisplay && <span className="text-slate-400 text-xs mb-1 font-mono">{periodDisplay}</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{tier.description}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.badge ? 'text-orange-400' : 'text-slate-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                    tier.ctaVariant === 'primary'
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-black hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02]'
                      : 'bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10 hover:border-orange-500/40'
                  } flex items-center justify-center gap-2`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

