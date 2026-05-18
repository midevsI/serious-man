import type { CliApp } from '../../core/cli';
import { ContextService } from '../../services/context-service';
import { logger } from '../../core/logger/logger';

export function contextCommand(app: CliApp): void {
  app.register({
    name: 'context',
    description: 'Show repository and workflow context summary',
    action: () => {
      const service = new ContextService();
      logger.info(service.summarizeCurrentContext());
    }
  });
}
