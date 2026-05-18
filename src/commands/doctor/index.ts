import { access } from 'node:fs/promises';
import type { CliApp } from '../../core/cli';
import { env } from '../../core/config/env';
import { logger } from '../../core/logger/logger';
import { getAppRoot } from '../../core/config/constants';

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export function doctorCommand(app: CliApp): void {
  app.register({
    name: 'doctor',
    description: 'Run environment diagnostics for serious-man',
    action: async () => {
      logger.success('serious-man diagnostics');
      logger.info(`Bun: ${Bun.version}`);
      logger.info(`AI provider: ${env.aiProvider}`);
      logger.info(`Log level: ${env.logLevel}`);

      const appRoot = getAppRoot();
      if (await pathExists(appRoot)) {
        logger.success(`State directory found at ${appRoot}`);
      } else {
        logger.warn(`State directory not found at ${appRoot}. Run: sm init`);
      }
    }
  });
}
