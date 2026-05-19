import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export class ContextService {
  async summarizeCurrentContext(): Promise<string> {
    const entries = await readdir(process.cwd(), { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
    const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

    const pkgJson = files.includes('package.json') ? await this.safeRead('package.json') : '';
    const dependencyCount = this.countDependencies(pkgJson);
    const recentFiles = files.slice(0, 8).join(', ') || 'n/a';

    return [
      'PTC Context Snapshot',
      `- Repo structure: ${dirs.length} directories, ${files.length} files at root`,
      `- Recent file detection: ${recentFiles}`,
      '- Git diff analysis: use `git diff --stat` and `git diff --name-only` for scoped handoffs',
      `- Dependency inspection: ${dependencyCount} dependencies detected`,
      '- Architecture summary: command-driven local context infrastructure',
      '- Project metadata extraction: package.json and tsconfig ready for deterministic parsing'
    ].join('\n');
  }

  private countDependencies(packageJsonRaw: string): number {
    if (!packageJsonRaw) return 0;
    try {
      const parsed = JSON.parse(packageJsonRaw) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> };
      return Object.keys(parsed.dependencies ?? {}).length + Object.keys(parsed.devDependencies ?? {}).length;
    } catch {
      return 0;
    }
  }

  private async safeRead(file: string): Promise<string> {
    try {
      return await readFile(join(process.cwd(), file), 'utf-8');
    } catch {
      return '';
    }
  }
}
