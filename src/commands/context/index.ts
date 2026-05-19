import type { CliApp } from '../../core/cli';
import { ContextService } from '../../services/context-service';
import { logger } from '../../core/logger/logger';

export function contextCommand(app: CliApp): void {
  app.register({
    name: 'context',
    description: 'Build repo-aware context for Claude prompting',
    action: async () => {
      const service = new ContextService();
      logger.info(await service.summarizeCurrentContext());
    }
  });
}
