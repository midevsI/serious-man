import type { CliApp } from '../../core/cli';
import { PROMPTS_FILE } from '../../core/config/constants';
import { LocalStore } from '../../core/storage/local-store';
import { logger } from '../../core/logger/logger';

export function promptCommand(app: CliApp): void {
  app.register({
    name: 'prompt',
    description: 'Manage reusable prompts (placeholder)',
    action: async () => {
      const store = new LocalStore();
      const prompts = await store.readJson<string[]>(PROMPTS_FILE, []);
      logger.info(`Prompt library placeholder. Saved prompts: ${prompts.length}`);
    }
  });
}
