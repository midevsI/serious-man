import type { CliApp } from '../../core/cli';
import { ConfigManager } from '../../core/config/manager';
import { logger } from '../../core/logger/logger';

export function initCommand(app: CliApp): void {
  app.register({
    name: 'init',
    description: 'Initialize Prompt to Claude in the current repository',
    action: async () => {
      logger.info('Creating PTC config...');
      const manager = new ConfigManager();
      await manager.save({ compressionLevel: 'balanced', includeGitDiff: true, includeDependencies: true });
      logger.success('Initialized .ptc workspace for deterministic Claude workflows.');
    }
  });
}
