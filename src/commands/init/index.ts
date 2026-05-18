import type { CliApp } from '../../core/cli';
import { ConfigManager } from '../../core/config/manager';
import { logger } from '../../core/logger/logger';

export function initCommand(app: CliApp): void {
  app.register({
    name: 'init',
    description: 'Initialize serious-man in the current repository',
    action: async () => {
      logger.info('Creating default config...');
      const manager = new ConfigManager();
      await manager.save({ aiProvider: 'openai', defaultModel: 'gpt-5', telemetry: false });
      logger.success('Initialized .serious-man in this repository.');
    }
  });
}
