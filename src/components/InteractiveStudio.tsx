import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Cpu, FileCode, Folder, Sparkles } from 'lucide-react';
import { NodeBoxRuntime } from '../core/NodeBoxRuntime';
import { ExecutionResult } from '../core/types';

const PRESETS = [
  {
    id: 'ai-tool',
    name: '🤖 AI Agent Tool Execution',
    description: 'Autonomous LLM tool writing code, creating virtual files, and returning JSON data.',
    code: `// AI Agent executing isolated data harvesting task
const fs = require('fs');

console.log('[agent] Fetching financial data payload...');
const marketData = {
  ticker: 'NODE',
  price: 482.50,
  volume: 1205000,
  signals: ['BULLISH_BREAKOUT', 'V8_ISOLATE_HOT'],
  timestamp: new Date().toISOString()
};

// Save to POSIX virtual memory filesystem
const filepath = '/workspace/market_analysis.json';
fs.writeFileSync(filepath, JSON.stringify(marketData, null, 2));

console.log('[agent] Successfully created POSIX MemFS snapshot:', filepath);
console.log('[agent] Analysis completed cleanly.');`
  },
  {
    id: 'mcp-server',
    name: '🔌 MCP (Model Context Protocol)',
    description: 'Register and execute sandboxed tools for Claude / Gemini AI assistants.',
    code: `// MCP Tool Registration & Execution
console.log('[mcp:server] Initializing Model Context Protocol endpoint...');

const toolDefinition = {
  name: "query_database_sandbox",
  description: "Execute read-only SQL query inside NodeBox memory isolate",
  parameters: { query: "SELECT * FROM agent_logs WHERE status='SUCCESS'" }
};

console.log('[mcp:tool] Registered tool:', toolDefinition.name);
console.log('[mcp:exec] Executing query across POSIX MemFS...');

console.log('[mcp:result] Output payload: { rows: 42, latency: "0.4ms" }');`
  },
  {
    id: 'security-test',
    name: '🛡️ Security Guardrail & Syscall Filter',
    description: 'Test zero-trust seccomp syscall filtering when malicious code attempts forbidden access.',
    code: `// Security test: Attempt forbidden system call
console.log('[security:audit] Testing seccomp-bpf syscall guardrails...');

try {
  // Direct process spawns are blocked by NodeBox kernel policy
  process.exit(139); 
} catch (err) {
  console.log('[security:blocked]', err.message);
}`
  },
  {
    id: 'memfs-pipeline',
    name: '⚡ MemFS Data Pipeline',
    description: 'Sub-millisecond data transformation without physical disk I/O bottlenecks.',
    code: `// MemFS Data Pipeline
const fs = require('fs');

console.log('[memfs] Generating 5,000 synthetic logs in virtual memory...');
const logs = Array.from({ length: 5 }, (_, i) => \`log_\${i + 1}: STATUS_OK\`).join('\\n');

fs.writeFileSync('/workspace/logs.txt', logs);
const readBack = fs.readFileSync('/workspace/logs.txt');

console.log('[memfs] Readback verified. File length:', readBack.length, 'bytes');`
  }
];

export const InteractiveStudio: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [code, setCode] = useState(PRESETS[0].code);
  const [memoryCap, setMemoryCap] = useState(128);
  const [allowEgress, setAllowEgress] = useState(true);
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'files' | 'mcp' | 'stats'>('console');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setSelectedPreset(preset);
    setCode(preset.code);
    setExecutionResult(null);
  };

  const handleRunSandbox = async () => {
    setIsExecuting(true);
    setActiveTab('console');
    setExecutionResult(null);

    // Instantiate NodeBox runtime
    const runtime = await NodeBoxRuntime.create({
      policy: {
        maxMemoryMb: memoryCap,
        allowNetworkEgress: allowEgress
      }
    });

    // Execute code
    const result = await runtime.execute(code);
    setExecutionResult(result);
    setIsExecuting(false);
  };

  return (
    <section id="studio" className="py-20 border-b border-white/[0.08] bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            NodeBox Agent <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-slate-200 bg-clip-text text-transparent">Playground</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Experience sub-30ms isolate execution live in your browser. Select a preset or customize script and guardrails.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PRESETS.map((p) => {
            const isSelected = selectedPreset.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-white/[0.05] border-orange-500/60 shadow-lg shadow-orange-500/10'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="font-bold text-sm text-slate-200 mb-1">{p.name}</div>
                <div className="text-xs text-slate-400 line-clamp-2">{p.description}</div>
              </button>
            );
          })}
        </div>

        {/* Main Studio Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Code Editor & Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              
              {/* Editor Header */}
              <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10 gap-3">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <FileCode className="w-4 h-4 text-orange-400" />
                  <span>/workspace/sandbox_script.js</span>
                </div>
                
                {/* Control Parameters */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span>RAM Cap:</span>
                    <select
                      value={memoryCap}
                      onChange={(e) => setMemoryCap(Number(e.target.value))}
                      className="bg-white/5 border border-white/10 text-slate-200 rounded px-2 py-0.5 focus:outline-none focus:border-orange-500"
                    >
                      <option value={32} className="bg-black">32 MB</option>
                      <option value={64} className="bg-black">64 MB</option>
                      <option value={128} className="bg-black">128 MB</option>
                      <option value={256} className="bg-black">256 MB</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowEgress}
                      onChange={(e) => setAllowEgress(e.target.checked)}
                      className="rounded bg-white/5 border-white/10 text-orange-500 focus:ring-0"
                    />
                    <span>Egress</span>
                  </label>
                </div>
              </div>

              {/* Code Editor Textarea */}
              <div className="relative bg-[#080808] p-4 font-mono text-xs text-slate-200 leading-relaxed">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={14}
                  className="w-full bg-transparent resize-none outline-none font-mono text-slate-200 selection:bg-orange-500/30 leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Editor Footer Action Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-black border-t border-white/10">
                <button
                  onClick={() => setCode(selectedPreset.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Code
                </button>

                <button
                  onClick={handleRunSandbox}
                  disabled={isExecuting}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-black font-extrabold text-xs shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Booting Isolate...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Execute NodeBox Isolate
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Console & Inspection Tabs (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[#050505] h-full flex flex-col min-h-[440px]">
              
              {/* Output Tabs Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-black border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('console')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                      activeTab === 'console'
                        ? 'bg-white/10 text-orange-400 font-bold border border-white/15'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-orange-400" />
                    Console Output
                  </button>

                  <button
                    onClick={() => setActiveTab('files')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                      activeTab === 'files'
                        ? 'bg-white/10 text-orange-400 font-bold border border-white/15'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 text-orange-400" />
                    MemFS
                  </button>

                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                      activeTab === 'stats'
                        ? 'bg-white/10 text-amber-400 font-bold border border-white/15'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    Metrics
                  </button>
                </div>

                {executionResult && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    executionResult.status === 'completed'
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {executionResult.status.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Tab Content Display */}
              <div className="p-4 font-mono text-xs flex-1 overflow-y-auto max-h-[380px]">
                
                {/* Console Tab */}
                {activeTab === 'console' && (
                  <div className="space-y-1 text-slate-300">
                    {!executionResult && !isExecuting && (
                      <div className="text-slate-500 italic flex items-center gap-2 pt-8 justify-center">
                        <Terminal className="w-5 h-5 text-slate-600" />
                        Click "Execute NodeBox Isolate" to run script...
                      </div>
                    )}

                    {isExecuting && (
                      <div className="text-orange-400 animate-pulse py-4">
                        [nodebox:kernel] Spawning pre-warmed V8 snapshot isolate...
                      </div>
                    )}

                    {executionResult && (
                      <>
                        {executionResult.stdout.map((line, i) => (
                          <div key={i} className="leading-relaxed">
                            {line.startsWith('[nodebox') ? (
                              <span className="text-orange-400">{line}</span>
                            ) : line.startsWith('[agent') ? (
                              <span className="text-slate-200 font-bold">{line}</span>
                            ) : line.startsWith('[security') ? (
                              <span className="text-amber-400">{line}</span>
                            ) : (
                              <span>{line}</span>
                            )}
                          </div>
                        ))}

                        {executionResult.stderr.map((line, i) => (
                          <div key={i} className="text-rose-400 leading-relaxed font-bold">
                            {line}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}

                {/* MemFS Tab */}
                {activeTab === 'files' && (
                  <div className="space-y-3">
                    <div className="text-slate-400 text-[11px] mb-2">
                      POSIX In-Memory Virtual File System (MemFS) Tree:
                    </div>
                    {executionResult?.fileChanges ? (
                      <div className="space-y-2">
                        {Object.entries(executionResult.fileChanges).map(([filePath, fileContent]) => (
                          <div
                            key={filePath}
                            onClick={() => setSelectedFile(filePath === selectedFile ? null : filePath)}
                            className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-orange-500/40 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between text-orange-300 font-bold">
                              <span className="flex items-center gap-1.5">
                                <FileCode className="w-3.5 h-3.5 text-slate-300" />
                                {filePath}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {fileContent.length} bytes
                              </span>
                            </div>
                            {selectedFile === filePath && (
                              <pre className="mt-2 p-2 bg-black rounded text-[11px] text-slate-300 overflow-x-auto border border-white/10">
                                {fileContent}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-slate-500 text-center py-6">
                        No files modified yet. Run an AI agent tool script to view MemFS snapshots.
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics Tab */}
                {activeTab === 'stats' && (
                  <div className="space-y-4">
                    {executionResult ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                          <div className="text-[10px] text-slate-500 uppercase">Cold Start</div>
                          <div className="text-lg font-bold text-orange-400 font-mono">
                            {executionResult.stats.coldStartMs} ms
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                          <div className="text-[10px] text-slate-500 uppercase">RAM Peak</div>
                          <div className="text-lg font-bold text-slate-200 font-mono">
                            {executionResult.stats.memoryPeakMb} MB
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                          <div className="text-[10px] text-slate-500 uppercase">Total Execution</div>
                          <div className="text-lg font-bold text-amber-400 font-mono">
                            {executionResult.stats.executionTimeMs} ms
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                          <div className="text-[10px] text-slate-500 uppercase">Syscalls</div>
                          <div className="text-lg font-bold text-slate-200 font-mono">
                            {executionResult.stats.syscallCount}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-center py-6">
                        Run sandbox to generate real-time execution statistics.
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

