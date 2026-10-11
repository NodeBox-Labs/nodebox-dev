import { VirtualFile } from './types';

export class VirtualFileSystem {
  private files: Map<string, VirtualFile> = new Map();

  constructor(initialFiles: Record<string, string> = {}) {
    // Populate default system structure
    this.writeFile('/etc/nodebox.conf', JSON.stringify({
      version: '1.4.2',
      engine: 'V8-Isolate-MemFS',
      securityLevel: 'strict',
      isolation: 'microvm-process-sandbox'
    }, null, 2));

    this.writeFile('/etc/hosts', '127.0.0.1 localhost nodebox-node\n');
    this.writeFile('/tmp/.nodebox-keepalive', 'active');

    // Populate user initial files
    Object.entries(initialFiles).forEach(([path, content]) => {
      const normalized = this.normalizePath(path);
      this.writeFile(normalized, content);
    });
  }

  private normalizePath(path: string): string {
    if (!path.startsWith('/')) {
      path = '/workspace/' + path;
    }
    return path.replace(/\/+/g, '/');
  }

  public writeFile(path: string, content: string): void {
    const norm = this.normalizePath(path);
    this.files.set(norm, {
      path: norm,
      content,
      updatedAt: Date.now()
    });
  }

  public readFile(path: string): string | null {
    const norm = this.normalizePath(path);
    const file = this.files.get(norm);
    return file ? file.content : null;
  }

  public exists(path: string): boolean {
    return this.files.has(this.normalizePath(path));
  }

  public removeFile(path: string): boolean {
    return this.files.delete(this.normalizePath(path));
  }

  public listFiles(): VirtualFile[] {
    return Array.from(this.files.values());
  }

  public getSnapshot(): Record<string, string> {
    const snapshot: Record<string, string> = {};
    this.files.forEach((file, path) => {
      snapshot[path] = file.content;
    });
    return snapshot;
  }

  public clone(): VirtualFileSystem {
    const cloned = new VirtualFileSystem();
    cloned.files = new Map(JSON.parse(JSON.stringify(Array.from(this.files.entries()))));
    return cloned;
  }
}
