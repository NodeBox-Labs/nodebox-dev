/**
 * NodeBox CLI tool implementation
 * Command: nodebox <action> [args]
 */
export const CLI_COMMANDS = {
  run: {
    usage: 'nodebox run <file.js> [--mem 128] [--egress true]',
    description: 'Execute a script in an ephemeral V8 micro-isolate sandbox'
  },
  spawn: {
    usage: 'nodebox spawn --name my-agent-box --port 8080',
    description: 'Start a daemonized NodeBox sandbox process'
  },
  inspect: {
    usage: 'nodebox inspect <sandbox-id>',
    description: 'View real-time RAM, CPU, memfs, and syscall activity'
  },
  serve: {
    usage: 'nodebox serve --mcp',
    description: 'Launch local MCP (Model Context Protocol) tool server'
  },
  bench: {
    usage: 'nodebox bench --concurrency 500',
    description: 'Run benchmark suite against Docker / ArcBox / NodeBox'
  }
};
