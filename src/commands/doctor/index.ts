import { access } from 'node:fs/promises';
import type { CliApp } from '../../core/cli';
import { env } from '../../core/config/env';
import { logger } from '../../core/logger/logger';
import { getAppRoot } from '../../core/config/constants';

function checkTool(command: string, args: string[]): boolean {
  try {
    const result = Bun.spawnSync([command, ...args], { stdout: 'pipe', stderr: 'pipe' });
    return result.exitCode === 0;
  } catch {
    return false;
  }
}

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
    description: 'Run Prompt to Claude environment diagnostics',
    action: async () => {
      logger.success('PTC diagnostics');

      const checks = [
        ['git', checkTool('git', ['--version'])],
        ['bun', checkTool('bun', ['--version'])],
        ['node', checkTool('node', ['--version'])],
        ['claude', checkTool('claude', ['--version'])]
      ] as const;

      for (const [name, ok] of checks) {
        if (ok) logger.success(`${name}: detected`);
        else logger.warn(`${name}: missing`);
      }

      if (env.anthropicApiKey) logger.success('ANTHROPIC_API_KEY: present');
      else logger.warn('ANTHROPIC_API_KEY: missing');

      logger.info(`Default provider: ${env.aiProvider}`);
      logger.info(`Log level: ${env.logLevel}`);

      const appRoot = getAppRoot();
      if (await pathExists(appRoot)) logger.success(`PTC state directory found at ${appRoot}`);
      else logger.warn(`PTC state directory not found at ${appRoot}. Run: ptc init`);
    }
  });
}
