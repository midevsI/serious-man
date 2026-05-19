import type { CliApp } from '../../core/cli';
import { MEMORY_FILE } from '../../core/config/constants';
import { LocalStore } from '../../core/storage/local-store';
import { logger } from '../../core/logger/logger';

export function memoryCommand(app: CliApp): void {
  app.register({
    name: 'memory',
    description: 'Manage developer memory for Claude Code sessions',
    action: async () => {
      const store = new LocalStore();
      const memoryItems = await store.readJson<string[]>(MEMORY_FILE, []);
      logger.info(`Memory placeholder. Entries stored: ${memoryItems.length}`);
    }
  });
}
