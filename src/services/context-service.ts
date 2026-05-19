import { readdir } from 'node:fs/promises';

export class ContextService {
  async summarizeCurrentContext(): Promise<string> {
    const entries = await readdir(process.cwd(), { withFileTypes: true });
    const sample = entries
      .filter((entry) => entry.isFile())
      .slice(0, 8)
      .map((entry) => entry.name)
      .join(', ');

    return [
      'PTC Context Snapshot',
      '- Repo analysis: scaffold active',
      '- Recent file detection: ready',
      '- Git diff analysis: planned module',
      '- Dependency inspection: planned module',
      `- File sample: ${sample || 'n/a'}`,
      '- Architecture summary: modular command/provider/service layout'
    ].join('\n');
  }
}
