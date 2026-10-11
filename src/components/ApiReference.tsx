import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const ApiReference: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ts' | 'cli' | 'py' | 'rest'>('ts');
  const [copied, setCopied] = useState(false);

  const snippets = {
    ts: `import { NodeBox } from '@nodebox/sdk';

// 1. Spawn sub-30ms isolate sandbox
const sandbox = await NodeBox.spawn({
  name: 'my-ai-agent',
  policy: {
    maxMemoryMb: 64,
    allowNetworkEgress: true,
    allowedDomains: ['api.github.com']
  }
});

// 2. Run agent tool script
const result = await sandbox.run(\`
  const fs = require('fs');
  fs.writeFileSync('/workspace/summary.txt', 'AI Analysis Complete');
  console.log('Result payload written');
\`);

console.log('Execution stats:', result.stats);`,

    cli: `# 1. Install NodeBox CLI globally
npm install -g @nodebox/cli

# 2. Run script directly in ephemeral V8 isolate
nodebox run ./agent_script.js --mem 128 --egress true

# 3. Spawn daemonized sandbox node
nodebox spawn --name llm-worker-1 --port 8080

# 4. Inspect real-time memory & sys-call activity
nodebox inspect llm-worker-1`,

    py: `from nodebox import NodeBoxClient

# Connect to local NodeBox daemon or cloud cluster
client = NodeBoxClient(endpoint="http://localhost:8080")

# Spawn ephemeral sandbox
box = client.sandboxes.create(
    memory_mb=64,
    allow_egress=True
)

# Run JavaScript tool snippet inside V8 isolate
result = box.run("""
  console.log("Hello from Python client into NodeBox!");
""")

print("Exit Code:", result.exit_code)
print("Stdout:", result.stdout)`,

    rest: `POST /v1/sandboxes/spawn HTTP/1.1
Host: api.nodebox.dev
Authorization: Bearer nb_sec_9f81a7...
Content-Type: application/json

{
  "name": "agent-worker-42",
  "policy": {
    "maxMemoryMb": 128,
    "allowNetworkEgress": true
  },
  "code": "console.log('REST API Execution OK');"
}`
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-20 border-b border-white/[0.08] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-semibold tracking-wider text-orange-400 uppercase mb-3">
            Developer Interfaces
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Simple, Elegant <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-200 bg-clip-text text-transparent">SDK & API</span>
          </p>
          <p className="mt-3 text-slate-400 text-sm">
            Integration ready for TypeScript, CLI workflows, Python AI frameworks (LangChain, LlamaIndex), and REST APIs.
          </p>
        </div>

        {/* Code Box Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
          
          {/* Header Tabs */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-black border-b border-white/10 gap-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveTab('ts')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'ts' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                TypeScript SDK
              </button>
              <button
                onClick={() => setActiveTab('cli')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'cli' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NodeBox CLI
              </button>
              <button
                onClick={() => setActiveTab('py')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'py' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Python SDK
              </button>
              <button
                onClick={() => setActiveTab('rest')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'rest' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                REST API
              </button>
            </div>

            <button
              onClick={copySnippet}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-400 hover:text-orange-300 bg-white/5 rounded border border-white/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* Snippet Output */}
          <div className="p-6 bg-[#080808] font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            <pre className="text-slate-300">{snippets[activeTab]}</pre>
          </div>

        </div>

      </div>
    </section>
  );
};

