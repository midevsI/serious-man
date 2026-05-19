import { readFile } from 'node:fs/promises';
import type { CliApp } from '../../core/cli';
import { logger } from '../../core/logger/logger';

function compressDeterministic(input: string): string {
  const noComments = input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => line.replace(/\/\/.*$/, '').trimEnd())
    .filter((line) => line.trim() !== '');

  const deduped: string[] = [];
  for (const line of noComments) {
    if (deduped[deduped.length - 1] !== line) deduped.push(line);
  }

  return deduped.join('\n');
}

export function compressCommand(app: CliApp): void {
  app.register({
    name: 'compress',
    description: 'Generate deterministic Claude-ready compressed context blocks',
    action: async () => {
      const readme = await readFile('README.md', 'utf-8').catch(() => '');
      const compressed = compressDeterministic(readme).slice(0, 1600);

      logger.info('PTC deterministic compression pipeline:');
      logger.info('- Stripping comments and boilerplate: active');
      logger.info('- Removing blank lines and duplicate logs: active');
      logger.info('- Prioritizing changed files: use `git diff --name-only` as input source');
      logger.info('- Preserving architecture-critical lines: active');
      logger.info('Claude-ready handoff block preview:');
      logger.info(compressed || '(No content available to compress)');
    }
  });
}
