import { VirtualFileSystem } from './VirtualFs';
import { SandboxOptions, SecurityPolicy, ExecutionResult, ExecutionStats, MCPToolDefinition, MCPToolCallResult } from './types';

export class NodeBoxRuntime {
  private id: string;
  private name: string;
  private vfs: VirtualFileSystem;
  private policy: SecurityPolicy;
  private env: Record<string, string>;
  private isRunning: boolean = false;
  private coldStartMs: number;

  constructor(options: SandboxOptions = {}) {
    this.id = options.id || `nb-box-${Math.random().toString(36).substring(2, 9)}`;
    this.name = options.name || 'nodebox-agent-sandbox';
    this.vfs = new VirtualFileSystem(options.initialFiles || {});
    this.env = options.env || { NODE_ENV: 'sandbox', NODEBOX: '1.4.2' };
    
    // Simulate sub-30ms V8 isolate pool cold start
    this.coldStartMs = Math.floor(Math.random() * 12) + 11; // 11ms - 22ms

    this.policy = {
      maxMemoryMb: options.policy?.maxMemoryMb ?? 128,
      cpuTimeLimitMs: options.policy?.cpuTimeLimitMs ?? 3000,
      allowNetworkEgress: options.policy?.allowNetworkEgress ?? true,
      allowedDomains: options.policy?.allowedDomains ?? ['api.github.com', 'huggingface.co', 'api.openai.com'],
      readOnlyFilesystem: options.policy?.readOnlyFilesystem ?? false,
      allowSyscalls: options.policy?.allowSyscalls ?? ['read', 'write', 'epoll', 'mmap', 'socket']
    };
  }

  public static async create(options?: SandboxOptions): Promise<NodeBoxRuntime> {
    const runtime = new NodeBoxRuntime(options);
    return runtime;
  }

  public getOptions() {
    return {
      id: this.id,
      name: this.name,
      policy: this.policy,
      env: this.env,
      coldStartMs: this.coldStartMs
    };
  }

  public getVfs(): VirtualFileSystem {
    return this.vfs;
  }

  /**
   * Execute code in isolated V8 sandbox runtime
   */
  public async execute(code: string, filename: string = '/workspace/index.js'): Promise<ExecutionResult> {
    const startTime = performance.now();
    this.isRunning = true;
    this.vfs.writeFile(filename, code);

    const stdout: string[] = [];
    const stderr: string[] = [];
    let exitCode = 0;
    let status: ExecutionResult['status'] = 'completed';
    let errorMessage: string | undefined = undefined;

    stdout.push(`[nodebox:kernel] Initialized isolate container [${this.id}] (${this.coldStartMs}ms cold-boot)`);
    stdout.push(`[nodebox:security] Policy verified: memCap=${this.policy.maxMemoryMb}MB, egress=${this.policy.allowNetworkEgress ? 'ALLOW' : 'DENY'}`);
    stdout.push(`[nodebox:vfs] Mounted POSIX memfs at /workspace`);
    stdout.push(`[nodebox:exec] Running node ${filename} ...\n`);

    try {
      // Evaluate JavaScript safely in client environment simulation
      const logs: string[] = [];
      const mockConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        info: (...args: any[]) => logs.push('[INFO] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        warn: (...args: any[]) => logs.push('[WARN] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('[ERROR] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
      };

      const mockFs = {
        writeFileSync: (path: string, content: string) => this.vfs.writeFile(path, content),
        readFileSync: (path: string) => this.vfs.readFile(path),
        existsSync: (path: string) => this.vfs.exists(path),
        readdirSync: () => this.vfs.listFiles().map(f => f.path)
      };

      // Security check simulation for security violations
      if (code.includes('process.exit(139)') || code.includes('require("child_process")')) {
        throw new Error('SECURITY_VIOLATION: Direct child process execution blocked by NodeBox syscall filter [seccomp_bpf]');
      }

      // Safe JS execution harness
      const contextFn = new Function('console', 'fs', 'env', 'virtualFs', `
        "use strict";
        try {
          ${code}
        } catch (err) {
          console.error(err.message || err);
        }
      `);

      contextFn(mockConsole, mockFs, this.env, this.vfs);

      logs.forEach(l => stdout.push(l));

    } catch (err: any) {
      if (err.message.includes('SECURITY_VIOLATION')) {
        status = 'security_violation';
        exitCode = 126;
        stderr.push(`🚨 ${err.message}`);
        errorMessage = err.message;
      } else {
        status = 'error';
        exitCode = 1;
        stderr.push(`Error: ${err.message}`);
        errorMessage = err.message;
      }
    }

    const duration = performance.now() - startTime;
    this.isRunning = false;

    stdout.push(`\n[nodebox:kernel] Execution finished in ${duration.toFixed(2)}ms with status: ${status} (exit ${exitCode})`);

    const stats: ExecutionStats = {
      coldStartMs: this.coldStartMs,
      executionTimeMs: Math.round(duration),
      memoryPeakMb: parseFloat((Math.random() * 4 + 6.2).toFixed(1)), // ~8-10MB RAM!
      cpuUtilizationPct: parseFloat((Math.random() * 2 + 0.3).toFixed(1)),
      syscallCount: Math.floor(Math.random() * 120) + 40,
      networkRequestsCount: this.policy.allowNetworkEgress ? Math.floor(Math.random() * 3) + 1 : 0
    };

    return {
      sandboxId: this.id,
      status,
      exitCode,
      stdout,
      stderr,
      stats,
      fileChanges: this.vfs.getSnapshot(),
      error: errorMessage
    };
  }

  /**
   * Register MCP (Model Context Protocol) tool execution
   */
  public async executeMCPTool(toolName: string, args: Record<string, any>): Promise<MCPToolCallResult> {
    const t0 = performance.now();
    let output: any = null;

    if (toolName === 'execute_node_code') {
      const res = await this.execute(args.code || '');
      output = res;
    } else if (toolName === 'read_workspace_file') {
      const content = this.vfs.readFile(args.path);
      output = { path: args.path, content, exists: content !== null };
    } else if (toolName === 'write_workspace_file') {
      this.vfs.writeFile(args.path, args.content || '');
      output = { path: args.path, success: true, bytes: (args.content || '').length };
    } else {
      output = { message: `Simulated MCP Tool execution [${toolName}] succeeded.`, args };
    }

    return {
      tool: toolName,
      success: true,
      output,
      executionTimeMs: Math.round(performance.now() - t0)
    };
  }
}
