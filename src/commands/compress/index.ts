import type { CliApp } from '../../core/cli';
import { logger } from '../../core/logger/logger';

export function compressCommand(app: CliApp): void {
  app.register({
    name: 'compress',
    description: 'Compress prompt/context payloads for LLM workflows (placeholder)',
    action: () => {
      logger.info('Compression pipeline placeholder: tokenizer and strategy modules come next.');
    }
  });
}
