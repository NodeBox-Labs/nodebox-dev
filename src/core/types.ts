/**
 * Core type definitions for NodeBox Sandbox Engine
 */

export interface VirtualFile {
  path: string;
  content: string;
  isExecutable?: boolean;
  updatedAt: number;
}

export interface SecurityPolicy {
  maxMemoryMb: number;
  cpuTimeLimitMs: number;
  allowNetworkEgress: boolean;
  allowedDomains: string[];
  readOnlyFilesystem: boolean;
  allowSyscalls: string[];
}

export interface SandboxOptions {
  id?: string;
  name?: string;
  policy?: Partial<SecurityPolicy>;
  initialFiles?: Record<string, string>;
  env?: Record<string, string>;
  mcpEnabled?: boolean;
}

export interface ExecutionStats {
  coldStartMs: number;
  executionTimeMs: number;
  memoryPeakMb: number;
  cpuUtilizationPct: number;
  syscallCount: number;
  networkRequestsCount: number;
}

export interface ExecutionResult {
  sandboxId: string;
  status: 'completed' | 'timeout' | 'security_violation' | 'error';
  exitCode: number;
  stdout: string[];
  stderr: string[];
  stats: ExecutionStats;
  fileChanges?: Record<string, string>;
  error?: string;
}

export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface MCPToolCallRequest {
  tool: string;
  args: Record<string, any>;
}

export interface MCPToolCallResult {
  tool: string;
  success: boolean;
  output: any;
  executionTimeMs: number;
}
