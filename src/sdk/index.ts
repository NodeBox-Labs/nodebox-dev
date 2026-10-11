import { NodeBoxRuntime } from '../core/NodeBoxRuntime';
import { SandboxOptions, ExecutionResult } from '../core/types';

export class NodeBox {
  private runtime: NodeBoxRuntime;

  constructor(runtime: NodeBoxRuntime) {
    this.runtime = runtime;
  }

  /**
   * Spawn a new NodeBox isolate sandbox instance
   * Cold start: < 20ms
   */
  public static async spawn(options: SandboxOptions = {}): Promise<NodeBox> {
    const runtime = await NodeBoxRuntime.create(options);
    return new NodeBox(runtime);
  }

  /**
   * Run code snippet inside NodeBox sandbox
   */
  public async run(code: string): Promise<ExecutionResult> {
    return this.runtime.execute(code);
  }

  /**
   * Get virtual file system reference
   */
  public get fs() {
    const vfs = this.runtime.getVfs();
    return {
      readFile: (path: string) => vfs.readFile(path),
      writeFile: (path: string, content: string) => vfs.writeFile(path, content),
      exists: (path: string) => vfs.exists(path),
      listFiles: () => vfs.listFiles()
    };
  }

  /**
   * Execute Model Context Protocol (MCP) Tool
   */
  public async callTool(name: string, args: Record<string, any>) {
    return this.runtime.executeMCPTool(name, args);
  }
}

export default NodeBox;
