import React, { useState } from 'react';
import { X, BookOpen, Shield, Cpu, Terminal, Zap } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'quickstart' | 'mcp' | 'security' | 'architecture'>('quickstart');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl bg-[#0a0a0a]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">NodeBox Technical Documentation</h3>
              <p className="text-xs text-slate-400">v1.4.2 — Open-Source V8 Isolate Sandbox Engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Sidebar Navigation */}
          <div className="w-56 bg-black/40 border-r border-white/10 p-4 space-y-1 font-mono text-xs">
            <button
              onClick={() => setActiveSection('quickstart')}
              className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 transition-colors ${
                activeSection === 'quickstart' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Quickstart Guide
            </button>

            <button
              onClick={() => setActiveSection('mcp')}
              className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 transition-colors ${
                activeSection === 'mcp' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              MCP Protocol
            </button>

            <button
              onClick={() => setActiveSection('security')}
              className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 transition-colors ${
                activeSection === 'security' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Security Model
            </button>

            <button
              onClick={() => setActiveSection('architecture')}
              className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 transition-colors ${
                activeSection === 'architecture' ? 'bg-orange-500/10 text-orange-300 font-bold border border-orange-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Isolate Specs
            </button>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed bg-[#050505]">
            {activeSection === 'quickstart' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-400" /> Getting Started with NodeBox
                </h4>
                <p>
                  NodeBox allows developers and AI researchers to safely execute untrusted JavaScript/TypeScript code inside lightweight, sub-30ms V8 isolates.
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="text-slate-400 font-bold">1. Install Package:</div>
                  <pre className="p-3 bg-black border border-white/10 rounded-lg text-orange-300">
                    npm install @nodebox/sdk
                  </pre>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="text-slate-400 font-bold">2. Run Ephemeral Sandbox:</div>
                  <pre className="p-3 bg-black border border-white/10 rounded-lg text-slate-200 overflow-x-auto">
{`import { NodeBox } from '@nodebox/sdk';

const box = await NodeBox.spawn({ policy: { maxMemoryMb: 64 } });
const res = await box.run('console.log("Executed safely in NodeBox");');
console.log(res.stdout);`}
                  </pre>
                </div>
              </div>
            )}

            {activeSection === 'mcp' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-amber-400" /> Model Context Protocol (MCP) Integration
                </h4>
                <p>
                  NodeBox natively implements Anthropic's Model Context Protocol (MCP). AI assistants such as Claude Desktop or custom agents can seamlessly call tools registered inside NodeBox sandboxes.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  <li>Automatic JSON-RPC schema translation for LLM function calling.</li>
                  <li>In-memory file system mounting (`/workspace`) for persistent tool outputs across steps.</li>
                  <li>Zero-latency execution without waiting for container boot times.</li>
                </ul>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-400" /> Zero-Trust Security Architecture
                </h4>
                <p>
                  NodeBox enforces multi-layered isolation to prevent unauthorized host system access:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-black border border-white/10 rounded-lg">
                    <div className="font-bold text-orange-300 text-xs mb-1">Seccomp-BPF Syscall Filter</div>
                    <div className="text-xs text-slate-400">Blocks dangerous kernel calls (execve, ptrace, keyctl).</div>
                  </div>
                  <div className="p-3 bg-black border border-white/10 rounded-lg">
                    <div className="font-bold text-slate-200 text-xs mb-1">Egress Whitelisting</div>
                    <div className="text-xs text-slate-400">Strict network domain filtering to prevent SSRF data leaks.</div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'architecture' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-orange-400" /> V8 Isolate Specifications
                </h4>
                <p>
                  NodeBox utilizes V8 Context snapshots and worker pool memory sharing.
                </p>
                <div className="font-mono text-xs space-y-2">
                  <div className="flex justify-between p-2 bg-black rounded border border-white/10">
                    <span className="text-slate-400">Average Cold Boot:</span>
                    <span className="text-orange-300 font-bold">12.4 ms</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black rounded border border-white/10">
                    <span className="text-slate-400">Base Heap Memory:</span>
                    <span className="text-slate-200 font-bold">6.2 MB</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black rounded border border-white/10">
                    <span className="text-slate-400">Concurrency Density:</span>
                    <span className="text-amber-300 font-bold">150+ / GB RAM</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-end px-6 py-3 bg-black border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};

